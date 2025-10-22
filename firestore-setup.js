// Firestore setup and user management for MenStyle360
// Este archivo maneja la creación y gestión de perfiles de usuario

// Función para crear perfil de usuario en Firestore
async function createUserProfile(user, additionalData = {}) {
    try {
        const userProfile = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || additionalData.name || '',
            name: additionalData.name || user.displayName || '',
            createdAt: new Date(),
            updatedAt: new Date(),
            // Datos específicos de MenStyle360
            styleProfile: {
                faceShape: '',
                skinTone: '',
                hairType: '',
                beardPreference: '',
                colorPreferences: [],
                styleTraits: []
            },
            preferences: {
                notifications: true,
                newsletter: false,
                theme: 'light'
            },
            // Datos adicionales del registro
            ...additionalData
        };

        // Guardar en Firestore
        await window.db.collection('users').doc(user.uid).set(userProfile);
        console.log('Perfil de usuario creado en Firestore:', userProfile);
        
        return userProfile;
    } catch (error) {
        console.error('Error al crear perfil de usuario:', error);
        throw error;
    }
}

// Función para obtener perfil de usuario
async function getUserProfile(userId) {
    try {
        const doc = await window.db.collection('users').doc(userId).get();
        if (doc.exists) {
            return doc.data();
        } else {
            console.log('No se encontró perfil de usuario');
            return null;
        }
    } catch (error) {
        console.error('Error al obtener perfil de usuario:', error);
        throw error;
    }
}

// Función para actualizar perfil de usuario
async function updateUserProfile(userId, updateData) {
    try {
        const updateObject = {
            ...updateData,
            updatedAt: new Date()
        };
        
        await window.db.collection('users').doc(userId).update(updateObject);
        console.log('Perfil de usuario actualizado:', updateObject);
        
        return true;
    } catch (error) {
        console.error('Error al actualizar perfil de usuario:', error);
        throw error;
    }
}

// Función para guardar resultados del quiz de estilo
async function saveStyleQuizResults(userId, quizResults) {
    try {
        const styleProfile = {
            faceShape: quizResults.faceShape || '',
            skinTone: quizResults.skinTone || '',
            hairType: quizResults.hairType || '',
            beardPreference: quizResults.beardPreference || '',
            colorPreferences: quizResults.colorPreferences || [],
            styleTraits: quizResults.styleTraits || [],
            quizScore: quizResults.score || 0,
            quizDate: new Date()
        };

        await window.db.collection('users').doc(userId).update({
            styleProfile: styleProfile,
            updatedAt: new Date()
        });
        
        console.log('Resultados del quiz guardados:', styleProfile);
        return true;
    } catch (error) {
        console.error('Error al guardar resultados del quiz:', error);
        throw error;
    }
}

// Función para guardar rutinas de usuario
async function saveUserRoutine(userId, routineData) {
    try {
        const routine = {
            ...routineData,
            userId: userId,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const docRef = await window.db.collection('userRoutines').add(routine);
        console.log('Rutina guardada con ID:', docRef.id);
        
        return docRef.id;
    } catch (error) {
        console.error('Error al guardar rutina:', error);
        throw error;
    }
}

// Función para obtener rutinas de usuario
async function getUserRoutines(userId) {
    try {
        const snapshot = await window.db.collection('userRoutines')
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();
        
        const routines = [];
        snapshot.forEach(doc => {
            routines.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return routines;
    } catch (error) {
        console.error('Error al obtener rutinas:', error);
        throw error;
    }
}

// Función para guardar favoritos
async function saveUserFavorite(userId, favoriteData) {
    try {
        const favorite = {
            ...favoriteData,
            userId: userId,
            createdAt: new Date()
        };

        const docRef = await window.db.collection('userFavorites').add(favorite);
        console.log('Favorito guardado con ID:', docRef.id);
        
        return docRef.id;
    } catch (error) {
        console.error('Error al guardar favorito:', error);
        throw error;
    }
}

// Función para obtener favoritos de usuario
async function getUserFavorites(userId) {
    try {
        const snapshot = await window.db.collection('userFavorites')
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();
        
        const favorites = [];
        snapshot.forEach(doc => {
            favorites.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return favorites;
    } catch (error) {
        console.error('Error al obtener favoritos:', error);
        throw error;
    }
}

// Función para eliminar favorito
async function removeUserFavorite(favoriteId) {
    try {
        await window.db.collection('userFavorites').doc(favoriteId).delete();
        console.log('Favorito eliminado:', favoriteId);
        return true;
    } catch (error) {
        console.error('Error al eliminar favorito:', error);
        throw error;
    }
}

// Función para verificar si Firestore está disponible
function isFirestoreAvailable() {
    return typeof window.db !== 'undefined' && window.db !== null;
}

// Función para inicializar datos de usuario después del registro
async function initializeUserData(user, registrationData = {}) {
    if (!isFirestoreAvailable()) {
        console.warn('Firestore no está disponible');
        return;
    }

    try {
        console.log('Inicializando datos de usuario para:', user.uid);
        
        // Crear perfil de usuario
        await createUserProfile(user, registrationData);
        console.log('Perfil de usuario creado exitosamente');
        
        // Crear rutina básica por defecto
        const defaultRoutine = {
            name: 'Rutina Básica',
            type: 'daily',
            steps: [
                { name: 'Limpieza facial', time: 'morning', completed: false },
                { name: 'Hidratación', time: 'morning', completed: false },
                { name: 'Protector solar', time: 'morning', completed: false },
                { name: 'Limpieza nocturna', time: 'evening', completed: false }
            ],
            isDefault: true
        };
        
        try {
            await saveUserRoutine(user.uid, defaultRoutine);
            console.log('Rutina por defecto creada exitosamente');
        } catch (routineError) {
            console.warn('Error creando rutina por defecto:', routineError);
            // No fallar si no se puede crear la rutina
        }
        
        console.log('Datos de usuario inicializados correctamente');
        
    } catch (error) {
        console.error('Error al inicializar datos de usuario:', error);
        
        // Si es un error de permisos, proporcionar información más específica
        if (error.code === 'permission-denied' || 
            (error.message && error.message.includes('permission'))) {
            console.error('Error de permisos en Firestore. Verifica las reglas de seguridad.');
            throw new Error('Error de permisos: Las reglas de Firestore no permiten crear el perfil de usuario. Contacta al administrador.');
        }
        
        throw error;
    }
}

// Hacer funciones disponibles globalmente
window.createUserProfile = createUserProfile;
window.getUserProfile = getUserProfile;
window.updateUserProfile = updateUserProfile;
window.saveStyleQuizResults = saveStyleQuizResults;
window.saveUserRoutine = saveUserRoutine;
window.getUserRoutines = getUserRoutines;
window.saveUserFavorite = saveUserFavorite;
window.getUserFavorites = getUserFavorites;
window.removeUserFavorite = removeUserFavorite;
window.isFirestoreAvailable = isFirestoreAvailable;
window.initializeUserData = initializeUserData;

console.log('Firestore setup functions loaded');
