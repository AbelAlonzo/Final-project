// Script específico para la página de registro
// Variables globales
let isLoading = false;

// Elementos DOM
const registerForm = document.getElementById('registerForm');
const loadingOverlay = document.getElementById('loadingOverlay');
const toastContainer = document.getElementById('toastContainer');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sign Up page loaded');
    setupEventListeners();
});

// Initialize auth script when Firebase is ready
function initializeAuthScript() {
    console.log('Initializing sign up auth script...');
    initializeAuth();
    checkAuthState();
    console.log('Sign up auth script initialized');
}

// Configurar event listeners
function setupEventListeners() {
    console.log('Setting up sign up event listeners...');
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        console.log('Register form event listener added');
    } else {
        console.error('Register form not found');
    }

    // Input validations
    setupInputValidation();
    console.log('Sign up event listeners setup complete');
}

// Inicializar autenticación
function initializeAuth() {
    if (typeof window.auth === 'undefined') {
        console.error('Firebase Auth no está disponible');
        showToast('error', 'Error de configuración', 'Firebase no está configurado correctamente');
        return;
    }
    console.log('Sign up auth initialized successfully');
}

// Verificar estado de autenticación
function checkAuthState() {
    if (typeof window.onAuthStateChanged !== 'undefined' && typeof window.auth !== 'undefined') {
        window.onAuthStateChanged(window.auth, (user) => {
            if (user) {
                console.log('User already signed in:', user.uid);
                redirectToDashboard();
            }
        });
    }
}

// Manejar registro
async function handleRegister(e) {
    console.log('handleRegister called');
    e.preventDefault();
    if (isLoading) {
        console.log('Already loading, ignoring request');
        return;
    }

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    console.log('Form data:', { name, email, password: password ? '***' : '', confirmPassword: confirmPassword ? '***' : '', agreeTerms });

    // Validación
    if (!validateRegisterForm(name, email, password, confirmPassword, agreeTerms)) {
        console.log('Validation failed');
        return;
    }

    console.log('Validation passed, starting registration...');
    setLoading(true);

    try {
        console.log('Attempting to create user with:', { email, password: password ? '***' : '' });
        
        // Verificar que el email y password sean strings válidos
        if (typeof email !== 'string' || email.trim() === '') {
            throw new Error('Email must be a valid string');
        }
        if (typeof password !== 'string' || password.trim() === '') {
            throw new Error('Password must be a valid string');
        }
        
        // Verificar que Firebase Auth esté disponible
        if (typeof window.createUserWithEmailAndPassword !== 'function') {
            throw new Error('Firebase Auth no está disponible');
        }
        
        const userCredential = await window.createUserWithEmailAndPassword(email.trim(), password);
        console.log('User created successfully:', userCredential.user.uid);
        
        // Actualizar el perfil del usuario con el nombre
        try {
            await userCredential.user.updateProfile({
                displayName: name
            });
            console.log('User display name updated:', name);
        } catch (updateError) {
            console.warn('Could not update display name:', updateError);
        }
        
        // Verificar que Firestore esté disponible antes de intentar guardar datos
        if (typeof window.db === 'undefined' || !window.db) {
            console.warn('Firestore no está disponible, saltando creación de perfil');
            showToast('success', '¡Cuenta creada!', 'Tu cuenta ha sido creada exitosamente (perfil básico)');
        } else {
            try {
                // Guardar información adicional del usuario en Firestore
                if (typeof window.initializeUserData === 'function') {
                    await window.initializeUserData(userCredential.user, { name, email: email.trim() });
                    console.log('User profile created in Firestore');
                }
                showToast('success', '¡Cuenta creada!', 'Tu cuenta ha sido creada exitosamente');
            } catch (firestoreError) {
                console.error('Error creating user profile in Firestore:', firestoreError);
                // No fallar el registro si hay error en Firestore
                showToast('warning', 'Cuenta creada con advertencia', 
                    'Tu cuenta fue creada pero hubo un problema guardando tu perfil. Puedes completarlo más tarde.');
            }
        }
        
        // Redirigir después de un breve delay
        setTimeout(() => {
            redirectToDashboard();
        }, 1500);

    } catch (error) {
        console.error('Registration error:', error);
        handleAuthError(error);
    } finally {
        setLoading(false);
    }
}

// Validar formulario de registro
function validateRegisterForm(name, email, password, confirmPassword, agreeTerms) {
    console.log('Validating register form...');
    let isValid = true;

    // Validar nombre
    if (!name) {
        showFieldError('registerName', 'El nombre es requerido');
        isValid = false;
    } else if (name.length < 2) {
        showFieldError('registerName', 'El nombre debe tener al menos 2 caracteres');
        isValid = false;
    } else {
        clearFieldError('registerName');
    }

    // Validar email
    if (!email) {
        showFieldError('registerEmail', 'El correo electrónico es requerido');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('registerEmail', 'Ingresa un correo electrónico válido');
        isValid = false;
    } else {
        clearFieldError('registerEmail');
    }

    // Validar contraseña
    if (!password) {
        showFieldError('registerPassword', 'La contraseña es requerida');
        isValid = false;
    } else if (password.length < 6) {
        showFieldError('registerPassword', 'La contraseña debe tener al menos 6 caracteres');
        isValid = false;
    } else {
        clearFieldError('registerPassword');
    }

    // Validar confirmación de contraseña
    if (!confirmPassword) {
        showFieldError('confirmPassword', 'Confirma tu contraseña');
        isValid = false;
    } else if (password !== confirmPassword) {
        showFieldError('confirmPassword', 'Las contraseñas no coinciden');
        isValid = false;
    } else {
        clearFieldError('confirmPassword');
    }

    // Validar términos y condiciones
    if (!agreeTerms) {
        showToast('error', 'Términos y condiciones', 'Debes aceptar los términos y condiciones');
        isValid = false;
    }

    return isValid;
}

// Configurar validación de inputs
function setupInputValidation() {
    const inputs = document.querySelectorAll('input[type="email"], input[type="password"], input[type="text"]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            clearFieldError(input.id);
        });
    });
}

// Validar campo individual
function validateField(input) {
    const value = input.value.trim();
    const fieldId = input.id;

    switch (fieldId) {
        case 'registerEmail':
            if (value && !isValidEmail(value)) {
                showFieldError(fieldId, 'Ingresa un correo electrónico válido');
                return false;
            }
            break;
        case 'registerPassword':
            if (value && value.length < 6) {
                showFieldError(fieldId, 'La contraseña debe tener al menos 6 caracteres');
                return false;
            }
            break;
        case 'registerName':
            if (value && value.length < 2) {
                showFieldError(fieldId, 'El nombre debe tener al menos 2 caracteres');
                return false;
            }
            break;
        case 'confirmPassword':
            const password = document.getElementById('registerPassword').value;
            if (value && value !== password) {
                showFieldError(fieldId, 'Las contraseñas no coinciden');
                return false;
            }
            break;
    }

    clearFieldError(fieldId);
    return true;
}

// Mostrar error en campo
function showFieldError(fieldId, message) {
    const inputWrapper = document.querySelector(`#${fieldId}`).closest('.input-wrapper');
    const existingError = inputWrapper.querySelector('.error-message');
    
    if (existingError) {
        existingError.remove();
    }

    inputWrapper.classList.add('error');
    inputWrapper.classList.remove('success');

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    inputWrapper.appendChild(errorDiv);
}

// Limpiar error de campo
function clearFieldError(fieldId) {
    const inputElement = document.querySelector(`#${fieldId}`);
    if (!inputElement) return;
    
    const inputWrapper = inputElement.closest('.input-wrapper');
    if (!inputWrapper) return;
    
    const errorMessage = inputWrapper.querySelector('.error-message');
    
    if (errorMessage) {
        errorMessage.remove();
    }

    inputWrapper.classList.remove('error', 'success');
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Manejar errores de autenticación
function handleAuthError(error) {
    let message = 'Ha ocurrido un error inesperado';
    let title = 'Error de autenticación';
    
    console.error('Auth error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack
    });
    
    switch (error.code) {
        case 'auth/email-already-in-use':
            message = 'Ya existe una cuenta con este correo electrónico';
            break;
        case 'auth/weak-password':
            message = 'La contraseña es muy débil. Usa al menos 6 caracteres';
            break;
        case 'auth/invalid-email':
            message = 'El correo electrónico no es válido';
            break;
        case 'auth/too-many-requests':
            message = 'Demasiados intentos fallidos. Intenta más tarde';
            break;
        case 'auth/network-request-failed':
            message = 'Error de conexión. Verifica tu internet';
            break;
        case 'auth/operation-not-allowed':
            message = 'La operación no está permitida. Contacta al administrador';
            break;
        case 'permission-denied':
            title = 'Error de permisos';
            message = 'No tienes permisos para realizar esta acción. Verifica la configuración de Firestore';
            break;
        case 'unavailable':
            message = 'El servicio no está disponible temporalmente. Intenta más tarde';
            break;
        default:
            if (error.message && error.message.includes('permission')) {
                title = 'Error de permisos';
                message = 'Error de permisos en la base de datos. Verifica la configuración de Firestore';
            } else {
                message = error.message || message;
            }
    }

    showToast('error', title, message);
}

// Mostrar toast
function showToast(type, title, message) {
    console.log('Showing toast:', { type, title, message });
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    
    toast.innerHTML = `
        <i class="fas ${icon} toast-icon"></i>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="removeToast(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            removeToast(toast.querySelector('.toast-close'));
        }
    }, 5000);
}

// Remover toast
function removeToast(button) {
    const toast = button.closest('.toast');
    if (toast) {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Set loading state
function setLoading(loading) {
    console.log('Setting loading state:', loading);
    isLoading = loading;
    
    if (loading) {
        loadingOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        loadingOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Redirigir al dashboard
function redirectToDashboard() {
    window.location.href = 'dashboard.html';
}

// Wait for Firebase to be ready
window.addEventListener('firebaseReady', function() {
    console.log('Firebase ready event received in sign up page');
    
    // Make Firebase Auth functions available globally
    window.createUserWithEmailAndPassword = (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    };
    window.onAuthStateChanged = (callback) => {
        return firebase.auth().onAuthStateChanged(callback);
    };
    window.signOut = () => {
        return firebase.auth().signOut();
    };
    
    console.log('Firebase Auth functions loaded for sign up');
    
    // Initialize auth script
    if (typeof initializeAuthScript === 'function') {
        initializeAuthScript();
    }
});
