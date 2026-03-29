import { installToySoftStorage } from './toysoft-firestore-storage.js';

window.installToySoftStorage = installToySoftStorage;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('No se pudo cargar el script: ' + src));
    document.body.appendChild(s);
  });
}

const el = document.getElementById('toysoft-script-queue');
const scripts = el ? JSON.parse(el.textContent) : [];
const bootstrapUrls = scripts.filter((s) => /bootstrap.*\.bundle(\.min)?\.js/i.test(s));

for (const src of bootstrapUrls) {
  await loadScript(src);
}

try {
  await installToySoftStorage();
} catch (e) {
  console.error('[ToySoft] No se pudo inicializar Firestore/almacenamiento:', e);
}

const bootstrapSet = new Set(bootstrapUrls);
for (const src of scripts) {
  if (bootstrapSet.has(src)) continue;
  await loadScript(src);
}
