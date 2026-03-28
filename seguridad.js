// Configuración de credenciales (solo si no usas Firebase Auth)
const credenciales = {
    usuario: 'admin',
    clave: '1234'
};

function usaFirebaseAuth() {
    return !!(
        window.TOYSOFT_FIREBASE_CONFIG &&
        window.TOYSOFT_FIREBASE_CONFIG.apiKey &&
        typeof firebase !== 'undefined' &&
        typeof firebase.auth === 'function'
    );
}

// Verificar si hay una sesión activa
function verificarSesion() {
    const sesionActiva = localStorage.getItem('sesionActiva') === 'true';
    console.log('Verificando sesión:', sesionActiva);
    return sesionActiva;
}

// Verificar si se ha realizado el cierre diario
function verificarCierreDiario() {
    const fechaHoy = new Date().toLocaleDateString();
    const cierresDiarios = JSON.parse(localStorage.getItem('cierresDiarios') || '[]');
    const cierreHoy = cierresDiarios.find(cierre => 
        new Date(cierre.fecha).toLocaleDateString() === fechaHoy
    );
    return !!cierreHoy;
}





// Verificar sesión y cierre diario (devuelve false si redirige al login)
function verificarAcceso() {
    if (usaFirebaseAuth() && !firebase.auth().currentUser) {
        localStorage.removeItem('sesionActiva');
        console.log('Redirigiendo al login (sin sesión Firebase)...');
        window.location.href = 'index.html';
        return false;
    }
    if (!verificarSesion()) {
        console.log('Redirigiendo al login...');
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Iniciar sesión
async function iniciarSesion() {
    const usuario = document.getElementById('usuario').value.trim();
    const clave = document.getElementById('clave').value;

    if (usaFirebaseAuth()) {
        try {
            await firebase.auth().signInWithEmailAndPassword(usuario, clave);
            localStorage.setItem('sesionActiva', 'true');
            if (typeof window.installToySoftStorage === 'function') {
                await window.installToySoftStorage();
            }
            console.log('Login Firebase exitoso');
            mostrarApp();
        } catch (err) {
            console.error(err);
            alert('No se pudo iniciar sesión. Revisa correo, contraseña y que el usuario exista en Firebase.');
        }
        return;
    }

    console.log('Intento de login (local):', usuario);

    if (usuario === credenciales.usuario && clave === credenciales.clave) {
        console.log('Login exitoso');
        localStorage.setItem('sesionActiva', 'true');
        mostrarApp();
    } else {
        console.log('Login fallido');
        alert('Credenciales incorrectas');
    }
}

// Mostrar la aplicación
function mostrarApp() {
    const loginSection = document.getElementById('loginSection');
    const appSection = document.getElementById('appSection');
    
    console.log('Mostrando aplicación...');
    
    if (loginSection && appSection) {
        // Ocultar login con fade out
        loginSection.style.opacity = '0';
        loginSection.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            loginSection.style.display = 'none';
            appSection.style.display = 'block';
            // Mostrar app con fade in
            setTimeout(() => {
                appSection.style.opacity = '1';
                
                // Inicializar sistema de recordatorios después de mostrar la app
                inicializarSistemaRecordatorios();
            }, 50);
        }, 300);
    } else {
        console.error('No se encontraron las secciones necesarias');
    }
}

// Cerrar sesión
async function cerrarSesion() {
    if (usaFirebaseAuth()) {
        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.warn('Error al cerrar sesión Firebase:', e);
        }
    }
    localStorage.removeItem('sesionActiva');
    window.location.href = 'index.html';
}

// Verificar sesión al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const loginSection = document.getElementById('loginSection');
    const appSection = document.getElementById('appSection');

    let sesionOk = localStorage.getItem('sesionActiva') === 'true';
    if (usaFirebaseAuth() && !firebase.auth().currentUser) {
        sesionOk = false;
        localStorage.removeItem('sesionActiva');
    }

    if (loginSection && appSection) {
        if (sesionOk) {
            loginSection.style.display = 'none';
            appSection.style.display = 'block';
            appSection.style.opacity = '1';
        } else {
            loginSection.style.opacity = '1';
        }
    }

    if (sesionOk) {
        setTimeout(inicializarSistemaRecordatorios, 1000);
    }

    if (usaFirebaseAuth()) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                localStorage.removeItem('sesionActiva');
            }
        });
    }

    const btnToggleClave = document.getElementById('toggleClaveLogin');
    const inputClave = document.getElementById('clave');
    const iconoToggleClave = document.getElementById('iconoToggleClave');
    if (btnToggleClave && inputClave && iconoToggleClave) {
        btnToggleClave.addEventListener('click', function () {
            const mostrar = inputClave.type === 'password';
            inputClave.type = mostrar ? 'text' : 'password';
            iconoToggleClave.className = mostrar ? 'fas fa-eye-slash' : 'fas fa-eye';
            btnToggleClave.setAttribute('aria-label', mostrar ? 'Ocultar contraseña' : 'Mostrar contraseña');
            btnToggleClave.setAttribute('title', mostrar ? 'Ocultar' : 'Mostrar');
        });
    }
});

// ===== SISTEMA DE RECORDATORIOS - INTEGRACIÓN =====

// Función para inicializar el sistema de recordatorios
function inicializarSistemaRecordatorios() {
    try {
        console.log('🔔 Inicializando sistema de recordatorios...');
        
        // Verificar si las funciones de recordatorios están disponibles
        if (typeof cargarRecordatorios === 'function') {
            cargarRecordatorios();
            
            // Actualizar badge de recordatorios
            actualizarBadgeRecordatorios();
            
            // Configurar actualización periódica del badge
            setInterval(actualizarBadgeRecordatorios, 30000); // Cada 30 segundos
            
            console.log('✅ Sistema de recordatorios inicializado');
        } else {
            console.log('⚠️ Funciones de recordatorios no disponibles aún');
        }
    } catch (error) {
        console.error('❌ Error al inicializar sistema de recordatorios:', error);
    }
}

// Función para actualizar el badge de recordatorios
function actualizarBadgeRecordatorios() {
    try {
        if (typeof obtenerRecordatoriosUrgentes === 'function') {
            const recordatoriosUrgentes = obtenerRecordatoriosUrgentes();
            const badge = document.getElementById('badgeRecordatorios');
            
            if (badge && recordatoriosUrgentes.length > 0) {
                badge.textContent = recordatoriosUrgentes.length;
                badge.style.display = 'block';
                
                // Cambiar color según cantidad
                if (recordatoriosUrgentes.length >= 5) {
                    badge.className = 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger';
                } else if (recordatoriosUrgentes.length >= 3) {
                    badge.className = 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark';
                } else {
                    badge.className = 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info';
                }
            } else if (badge) {
                badge.style.display = 'none';
            }
        }
    } catch (error) {
        console.error('❌ Error al actualizar badge de recordatorios:', error);
    }
} 