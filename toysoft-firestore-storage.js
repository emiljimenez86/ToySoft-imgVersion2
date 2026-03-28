/**
 * Sustituye window.localStorage por un almacén en memoria sincronizado con Firestore.
 * Requiere scripts compat de Firebase y firebase-config.js cargados antes que este módulo.
 */

const COLLECTION_NAME = 'toysoft_kv';

/** Referencia al localStorage real del navegador (antes de sustituirlo por el shim). */
const NATIVE_LOCAL_STORAGE = window.localStorage;

let firestoreShimInstalled = false;

function keyToDocId(key) {
  try {
    return btoa(unescape(encodeURIComponent(key)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  } catch (e) {
    return btoa(String(key))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }
}

function docIdToKey(id) {
  try {
    let s = String(id).replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    return decodeURIComponent(escape(atob(s)));
  } catch (e) {
    return id;
  }
}

export async function installToySoftStorage() {
  if (firestoreShimInstalled) {
    return;
  }

  const cfg = window.TOYSOFT_FIREBASE_CONFIG;
  if (!cfg || !cfg.apiKey) {
    console.warn(
      '[ToySoft] Firestore desactivado (sin apiKey en firebase-config.js). Se usa localStorage del navegador.'
    );
    return;
  }

  if (typeof firebase === 'undefined') {
    console.error('[ToySoft] Firebase compat no está cargado. Se mantiene localStorage.');
    return;
  }

  if (typeof firebase.auth !== 'function') {
    console.error('[ToySoft] Falta firebase-auth-compat.js. Se mantiene localStorage.');
    return;
  }

  /* Sin esto, en la pantalla de login nunca se crea la app y signInWithEmailAndPassword falla. */
  const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(cfg);

  try {
    if (cfg.measurementId && typeof firebase.analytics === 'function') {
      firebase.analytics(app);
    }
  } catch (e) {
    /* bloqueadores de anuncios o entorno sin soporte */
  }

  const auth = firebase.auth();
  await new Promise((resolve) => {
    const unsub = auth.onAuthStateChanged(() => {
      unsub();
      resolve();
    });
  });

  if (!auth.currentUser) {
    console.warn('[ToySoft] Sin sesión Firebase: datos en localStorage del navegador hasta que inicies sesión.');
    return;
  }

  const nativeLS = NATIVE_LOCAL_STORAGE;
  const memory = Object.create(null);
  let db = null;
  let flushTimer = null;
  const dirty = new Map();
  let firstSnapshot = true;

  db = firebase.firestore(app);

  try {
    await db.enablePersistence({ synchronizeTabs: true });
  } catch (e) {
    /* modo privado, segundo cliente, etc. */
  }

  let shimRef = null;
  function dispatchStorageEvent(key, newValue) {
    try {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key,
          newValue: newValue === undefined ? null : newValue,
          oldValue: null,
          url: window.location.href || '',
          storageArea: shimRef
        })
      );
    } catch (e) {
      /* ignorar */
    }
  }

  await new Promise((resolve, reject) => {
    db.collection(COLLECTION_NAME).onSnapshot(
      (snapshot) => {
        if (firstSnapshot) {
          firstSnapshot = false;
          if (snapshot.empty) {
            for (let i = 0; i < nativeLS.length; i++) {
              const k = nativeLS.key(i);
              if (k) memory[k] = nativeLS.getItem(k);
            }
            const batches = [];
            let batch = db.batch();
            let n = 0;
            for (const k of Object.keys(memory)) {
              batch.set(db.collection(COLLECTION_NAME).doc(keyToDocId(k)), { v: memory[k] }, { merge: true });
              n++;
              if (n >= 400) {
                batches.push(batch.commit());
                batch = db.batch();
                n = 0;
              }
            }
            if (n > 0) batches.push(batch.commit());
            Promise.all(batches).then(() => resolve()).catch(reject);
          } else {
            snapshot.docs.forEach((doc) => {
              const d = doc.data();
              if (d && typeof d.v === 'string') memory[docIdToKey(doc.id)] = d.v;
            });
            resolve();
          }
          return;
        }

        snapshot.docChanges().forEach((change) => {
          const k = docIdToKey(change.doc.id);
          if (change.type === 'removed') {
            delete memory[k];
            dispatchStorageEvent(k, null);
          } else {
            const d = change.doc.data();
            if (d && typeof d.v === 'string') {
              memory[k] = d.v;
              dispatchStorageEvent(k, d.v);
            }
          }
        });
      },
      (err) => {
        console.error('[ToySoft] Error de Firestore:', err);
        if (firstSnapshot) {
          firstSnapshot = false;
          for (let i = 0; i < nativeLS.length; i++) {
            const k = nativeLS.key(i);
            if (k) memory[k] = nativeLS.getItem(k);
          }
          resolve();
        }
      }
    );
  });

  async function flushDirty() {
    if (!db || dirty.size === 0) return;
    const entries = Array.from(dirty.entries());
    dirty.clear();
    let batch = db.batch();
    let n = 0;
    for (const [key, val] of entries) {
      const ref = db.collection(COLLECTION_NAME).doc(keyToDocId(key));
      if (val === null) batch.delete(ref);
      else batch.set(ref, { v: val }, { merge: true });
      n++;
      if (n >= 400) {
        await batch.commit();
        batch = db.batch();
        n = 0;
      }
    }
    if (n > 0) await batch.commit();
  }

  function scheduleFlush() {
    if (flushTimer) clearTimeout(flushTimer);
    flushTimer = setTimeout(() => {
      flushTimer = null;
      flushDirty().catch((e) => console.error('[ToySoft] Error al persistir:', e));
    }, 350);
  }

  async function clearRemoteCollection() {
    if (!db) return;
    const snap = await db.collection(COLLECTION_NAME).get();
    let batch = db.batch();
    let n = 0;
    for (const doc of snap.docs) {
      batch.delete(doc.ref);
      n++;
      if (n >= 400) {
        await batch.commit();
        batch = db.batch();
        n = 0;
      }
    }
    if (n > 0) await batch.commit();
  }

  const shim = {
    get length() {
      return Object.keys(memory).length;
    },
    key(index) {
      const keys = Object.keys(memory);
      return keys[index] !== undefined ? keys[index] : null;
    },
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null;
    },
    setItem(key, value) {
      const v = String(value);
      memory[key] = v;
      dirty.set(key, v);
      scheduleFlush();
    },
    removeItem(key) {
      delete memory[key];
      dirty.set(key, null);
      scheduleFlush();
    },
    clear() {
      Object.keys(memory).forEach((k) => delete memory[k]);
      dirty.clear();
      clearRemoteCollection().catch((e) => console.error('[ToySoft] Error al vaciar Firestore:', e));
    }
  };

  shimRef = shim;

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushDirty();
  });
  window.addEventListener('pagehide', () => {
    flushDirty();
  });

  Object.defineProperty(window, 'localStorage', { value: shim, configurable: true });
  firestoreShimInstalled = true;
}
