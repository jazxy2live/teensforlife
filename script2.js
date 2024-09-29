import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById('google-login').addEventListener('click', googleLogin);

async function googleLogin() {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('User signed in:', user);

        // Store user data in Firestore
        await storeUserData(user);

        // Redirect to your main page or dashboard after successful login
        window.location.href = 'thankyou.html'; // Change this to your main page URL
    } catch (error) {
        console.error('Error during Google login:', error);
    }
}

async function storeUserData(user) {
    try {
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            displayName: user.displayName,
            lastLogin: new Date()
        }, { merge: true });
        console.log("User data stored successfully");
    } catch (error) {
        console.error("Error storing user data:", error);
    }
}

