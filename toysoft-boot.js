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

await installToySoftStorage();

for (const src of scripts) {
  await loadScript(src);
}
