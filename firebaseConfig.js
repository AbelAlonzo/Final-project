// Firebase configuration and initialization
// Using Firebase v8 for better compatibility

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
  console.log('Initializing Firebase...');
  
  // Load Firebase v8 scripts (more stable)
  const scripts = [
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js'
  ];
  
  let loadedScripts = 0;
  
  scripts.forEach((src, index) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      loadedScripts++;
      console.log(`Script ${index + 1} loaded: ${src}`);
      if (loadedScripts === scripts.length) {
        initializeFirebase();
      }
    };
    script.onerror = (error) => {
      console.error(`Error loading script ${src}:`, error);
    };
    document.head.appendChild(script);
  });
});

function initializeFirebase() {
  try {
    console.log('Starting Firebase initialization...');
    
    // Check if Firebase is available
    if (typeof firebase === 'undefined') {
      throw new Error('Firebase is not loaded');
    }
    
    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();
    
    // Configure auth settings to avoid reCAPTCHA issues
    auth.settings.appVerificationDisabledForTesting = false;
    
    // Make Firebase available globally
    window.firebaseApp = app;
    window.firebaseAuth = auth;
    window.firebaseDb = db;
    
    // Also make them available with shorter names
    window.auth = auth;
    window.db = db;
    
    console.log('Firebase initialized successfully');
    console.log('Auth object:', auth);
    console.log('Auth methods available:', Object.getOwnPropertyNames(auth.__proto__));
    
    // Dispatch custom event to notify other scripts
    window.dispatchEvent(new CustomEvent('firebaseReady'));
    
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    console.error('Firebase object:', typeof firebase);
    console.error('Error details:', error.message, error.stack);
  }
}