/**
 * Arranque sin ES modules: funciona en http(s) y al abrir HTML con file://
 * (los import entre .js fallan en file:// en Chrome/Edge).
 *
 * boot() es async: DOMContentLoaded suele dispararse ANTES de que carguen los .js
 * de la cola. Usa window.__toysoftOnReady(fn) en lugar de DOMContentLoaded para
 * inicializar después de seguridad.js, admon.js, app.js, etc.
 */
(function () {
  window.__toysoftScriptsReady = false;
  window.__toysoftOnReady = function (fn) {
    if (typeof fn !== 'function') return;
    const run = function () {
      try {
        fn();
      } catch (err) {
        console.error('[ToySoft]', err);
      }
    };
    if (window.__toysoftScriptsReady) {
      queueMicrotask(run);
    } else {
      window.addEventListener('toysoft-scripts-ready', run, { once: true });
    }
  };

  function finishBoot() {
    if (window.__toysoftScriptsReady) return;
    window.__toysoftScriptsReady = true;
    queueMicrotask(function () {
      window.dispatchEvent(new CustomEvent('toysoft-scripts-ready', { bubbles: true }));
    });
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = false;
      s.onload = function () {
        resolve();
      };
      s.onerror = function () {
        reject(new Error('No se pudo cargar el script: ' + src));
      };
      document.body.appendChild(s);
    });
  }

  async function boot() {
    if (typeof window.installToySoftStorage !== 'function') {
      await loadScript('toysoft-firestore-storage.js');
    }
    if (typeof window.installToySoftStorage !== 'function') {
      console.error('[ToySoft] Falta installToySoftStorage. ¿Existe toysoft-firestore-storage.js junto al HTML?');
    } else {
      try {
        await window.installToySoftStorage();
      } catch (e) {
        console.error('[ToySoft] No se pudo inicializar Firestore/almacenamiento:', e);
      }
    }

    const el = document.getElementById('toysoft-script-queue');
    const scripts = el ? JSON.parse(el.textContent) : [];
    const bootstrapUrls = scripts.filter(function (s) {
      return /bootstrap.*\.bundle(\.min)?\.js/i.test(s);
    });

    for (const src of bootstrapUrls) {
      await loadScript(src);
    }

    const bootstrapSet = new Set(bootstrapUrls);
    for (const src of scripts) {
      if (bootstrapSet.has(src)) continue;
      await loadScript(src);
    }

    finishBoot();
  }

  boot().catch(function (e) {
    console.error('[ToySoft] Error en arranque:', e);
    finishBoot();
  });
})();
