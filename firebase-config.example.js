/**
 * Copia este archivo como firebase-config.js y rellena con tu proyecto Firebase.
 * Consola Firebase: https://console.firebase.google.com → Configuración del proyecto → Tus apps
 */
window.TOYSOFT_FIREBASE_CONFIG = {
  apiKey: 'TU_API_KEY',
  authDomain: 'tu-proyecto.firebaseapp.com',
  projectId: 'tu-proyecto',
  storageBucket: 'tu-proyecto.appspot.com',
  messagingSenderId: '000000000000',
  appId: '1:000000000000:web:xxxxxxxx',
  measurementId: 'G-XXXXXXXXXX'
};

/*
 * Firestore: crea la base de datos en modo nativo y una colección "toysoft_kv".
 * Reglas de ejemplo SOLO para pruebas (no uses en producción sin autenticación):
 *
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /toysoft_kv/{docId} {
 *       allow read, write: if true;
 *     }
 *   }
 * }
 *
 * En producción usa Firebase Authentication y condiciones como request.auth != null.
 * Cada clave que antes era localStorage es un documento; el campo "v" es el string guardado.
 * Límite ~1 MiB por documento: listas enormes (historial) pueden fallar si superan el tamaño.
 */
