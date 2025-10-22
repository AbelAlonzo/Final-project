// Firebase configuration - Versión simplificada
// Esta versión evita problemas de reCAPTCHA

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbZgio_PqHn58tOpUJ10ySghJaQnjRbOI",
  authDomain: "project-abel-2cc44.firebaseapp.com",
  projectId: "project-abel-2cc44",
  storageBucket: "project-abel-2cc44.firebasestorage.app",
  messagingSenderId: "820374969969",
  appId: "1:820374969969:web:bca5210f4d5a7be9e3c5d0",
  measurementId: "G-W2LVYZKNMT"
};

// Initialize Firebase when the page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('Loading Firebase scripts...');
  
  // Load Firebase v8 scripts one by one
  loadScript('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js')
    .then(() => {
      console.log('Firebase App loaded');
      return loadScript('https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js');
    })
    .then(() => {
      console.log('Firebase Auth loaded');
      return loadScript('https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js');
    })
    .then(() => {
      console.log('Firebase Firestore loaded');
      initializeFirebase();
    })
    .catch(error => {
      console.error('Error loading Firebase scripts:', error);
    });
});

function loadScript(src) {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function initializeFirebase() {
  try {
    console.log('Initializing Firebase...');
    
    // Check if Firebase is available
    if (typeof firebase === 'undefined') {
      throw new Error('Firebase is not loaded');
    }
    
    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();
    
    // Configure auth settings
    auth.settings.appVerificationDisabledForTesting = false;
    
    // Make Firebase available globally
    window.firebaseApp = app;
    window.firebaseAuth = auth;
    window.firebaseDb = db;
    window.auth = auth;
    window.db = db;
    
    // Make auth functions available globally
    window.signInWithEmailAndPassword = auth.signInWithEmailAndPassword.bind(auth);
    window.createUserWithEmailAndPassword = auth.createUserWithEmailAndPassword.bind(auth);
    window.onAuthStateChanged = auth.onAuthStateChanged.bind(auth);
    window.signOut = auth.signOut.bind(auth);
    
    // Function to get user display name
    window.getUserDisplayName = function(user) {
        if (!user) return 'Usuario';
        
        // Try to get display name first
        if (user.displayName) {
            return user.displayName;
        }
        
        // If no display name, try to get from Firestore
        if (typeof window.db !== 'undefined' && user.uid) {
            // This will be handled asynchronously in the pages
            return 'Cargando...';
        }
        
        // Fallback to email username
        if (user.email) {
            return user.email.split('@')[0];
        }
        
        return 'Usuario';
    };
    
    // Function to get user display name from Firestore
    window.getUserDisplayNameFromFirestore = async function(user) {
        if (!user || typeof window.db === 'undefined') {
            return user ? (user.displayName || user.email.split('@')[0]) : 'Usuario';
        }
        
        try {
            const userDoc = await window.db.collection('users').doc(user.uid).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                return userData.displayName || userData.name || user.displayName || user.email.split('@')[0];
            }
        } catch (error) {
            console.warn('Error getting user name from Firestore:', error);
        }
        
        return user.displayName || user.email.split('@')[0];
    };
    
    console.log('Firebase initialized successfully');
    console.log('Auth object:', auth);
    console.log('Auth methods:', {
      signInWithEmailAndPassword: typeof window.signInWithEmailAndPassword,
      createUserWithEmailAndPassword: typeof window.createUserWithEmailAndPassword,
      onAuthStateChanged: typeof window.onAuthStateChanged,
      signOut: typeof window.signOut
    });
    
    // Dispatch custom event to notify other scripts
    window.dispatchEvent(new CustomEvent('firebaseReady'));
    
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
  }
}
