// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyYJOpFEKOueJ82rYpH3ViysP9dT93fyg",
    authDomain: "teensforlife-66155.firebaseapp.com",
    projectId: "teensforlife-66155",
    storageBucket: "teensforlife-66155.appspot.com",
    messagingSenderId: "572079189052",
    appId: "1:572079189052:web:d8502932dec58833a1a739",
    measurementId: "G-NEKSRBQZ4D"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to auth and firestore
const auth = firebase.auth();
const db = firebase.firestore();

// DOM elements
const loginForm = document.getElementById('loginForm');
const loginContainer = document.getElementById('loginContainer');
const dashboardContainer = document.getElementById('dashboardContainer');
const userInfo = document.getElementById('userInfo');
const logoutBtn = document.getElementById('logoutBtn');

// Login form submit handler
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('User logged in:', userCredential.user);
            loginForm.reset();
        })
        .catch((error) => {
            console.error('Login error:', error.message);
            alert(error.message);
        });
});

// Logout button handler
logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
        console.log('User signed out');
    }).catch((error) => {
        console.error('Logout error:', error);
    });
});

// Auth state change listener
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        loginContainer.style.display = 'none';
        dashboardContainer.style.display = 'block';
        loadUserData(user);
    } else {
        // User is signed out
        loginContainer.style.display = 'block';
        dashboardContainer.style.display = 'none';
        userInfo.innerHTML = '';
    }
});

// Load user data from Firestore
function loadUserData(user) {
    db.collection('users').doc(user.uid).get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                userInfo.innerHTML = `
                    <h2>Welcome, ${data.name || 'User'}!</h2>
                    <p>Email: ${user.email}</p>
                    <p>Account created: ${user.metadata.creationTime}</p>
                `;
            } else {
                console.log('No user data found');
                userInfo.innerHTML = '<p>Please complete your profile</p>';
            }
        })
        .catch((error) => {
            console.error('Error getting user data:', error);
        });
}

// You can add more functions here for user registration, profile updates, etc.