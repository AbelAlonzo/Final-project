// Script específico para la página de recuperación de contraseña
// Variables globales
let isLoading = false;

// Elementos DOM
const resetForm = document.getElementById('resetForm');
const loadingOverlay = document.getElementById('loadingOverlay');
const toastContainer = document.getElementById('toastContainer');
const successMessage = document.getElementById('successMessage');

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('Password reset page loaded');
    setupEventListeners();
});

// Initialize auth script when Firebase is ready
function initializeAuthScript() {
    console.log('Initializing password reset auth script...');
    initializeAuth();
    console.log('Password reset auth script initialized');
}

// Configurar event listeners
function setupEventListeners() {
    console.log('Setting up password reset event listeners...');
    
    if (resetForm) {
        resetForm.addEventListener('submit', handlePasswordReset);
        console.log('Reset form event listener added');
    } else {
        console.error('Reset form not found');
    }

    // Input validations
    setupInputValidation();
    console.log('Password reset event listeners setup complete');
}

// Inicializar autenticación
function initializeAuth() {
    if (typeof window.auth === 'undefined') {
        console.error('Firebase Auth no está disponible');
        showToast('error', 'Error de configuración', 'Firebase no está configurado correctamente');
        return;
    }
    console.log('Password reset auth initialized successfully');
}

// Manejar recuperación de contraseña
async function handlePasswordReset(e) {
    e.preventDefault();
    if (isLoading) return;

    const email = document.getElementById('resetEmail').value.trim();

    // Validación
    if (!validateResetForm(email)) return;

    setLoading(true);

    try {
        console.log('Attempting to send password reset email to:', email);
        
        // Verificar que el email sea un string válido
        if (typeof email !== 'string' || email.trim() === '') {
            throw new Error('Email must be a valid string');
        }
        
        // Verificar que Firebase Auth esté disponible
        if (typeof window.sendPasswordResetEmail !== 'function') {
            throw new Error('Firebase Auth no está disponible');
        }
        
        await window.sendPasswordResetEmail(email.trim());
        console.log('Password reset email sent successfully');
        
        // Mostrar mensaje de éxito
        showSuccessMessage();
        
    } catch (error) {
        console.error('Password reset error:', error);
        handleAuthError(error);
    } finally {
        setLoading(false);
    }
}

// Validar formulario de recuperación
function validateResetForm(email) {
    let isValid = true;

    // Validar email
    if (!email) {
        showFieldError('resetEmail', 'El correo electrónico es requerido');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('resetEmail', 'Ingresa un correo electrónico válido');
        isValid = false;
    } else {
        clearFieldError('resetEmail');
    }

    return isValid;
}

// Configurar validación de inputs
function setupInputValidation() {
    const inputs = document.querySelectorAll('input[type="email"]');
    
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
        case 'resetEmail':
            if (value && !isValidEmail(value)) {
                showFieldError(fieldId, 'Ingresa un correo electrónico válido');
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

// Mostrar mensaje de éxito
function showSuccessMessage() {
    // Ocultar el formulario
    resetForm.style.display = 'none';
    
    // Mostrar el mensaje de éxito
    successMessage.style.display = 'block';
    
    // Scroll al mensaje de éxito
    successMessage.scrollIntoView({ behavior: 'smooth' });
}

// Manejar errores de autenticación
function handleAuthError(error) {
    let message = 'Ha ocurrido un error inesperado';
    let title = 'Error de recuperación';
    
    console.error('Password reset error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack
    });
    
    switch (error.code) {
        case 'auth/user-not-found':
            message = 'No existe una cuenta con este correo electrónico';
            break;
        case 'auth/invalid-email':
            message = 'El correo electrónico no es válido';
            break;
        case 'auth/too-many-requests':
            message = 'Demasiados intentos. Intenta más tarde';
            break;
        case 'auth/network-request-failed':
            message = 'Error de conexión. Verifica tu internet';
            break;
        case 'auth/operation-not-allowed':
            message = 'La operación no está permitida. Contacta al administrador';
            break;
        case 'unavailable':
            message = 'El servicio no está disponible temporalmente. Intenta más tarde';
            break;
        default:
            message = error.message || message;
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

// Wait for Firebase to be ready
window.addEventListener('firebaseReady', function() {
    console.log('Firebase ready event received in password reset page');
    
    // Make Firebase Auth functions available globally
    window.sendPasswordResetEmail = (email) => {
        return firebase.auth().sendPasswordResetEmail(email);
    };
    window.onAuthStateChanged = (callback) => {
        return firebase.auth().onAuthStateChanged(callback);
    };
    
    console.log('Firebase Auth functions loaded for password reset');
    
    // Initialize auth script
    if (typeof initializeAuthScript === 'function') {
        initializeAuthScript();
    }
});
