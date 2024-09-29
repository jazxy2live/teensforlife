import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

// Check if user is logged in and load profile data
onAuthStateChanged(auth, async (user) => {
    if (user) {
        document.getElementById('user-name').textContent = user.displayName;
        document.getElementById('user-email').textContent = user.email;
        document.getElementById('profile-pic').src = user.photoURL || 'default-pic.jpg';

        // Fetch user bio from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            document.getElementById('bio').value = userData.bio || '';
        }
    } else {
        // Redirect to login page if not logged in
        window.location.href = 'login.html';
    }
});

// Save profile data (bio) to Firestore
document.getElementById('save-profile').addEventListener('click', async () => {
    const bio = document.getElementById('bio').value;
    const user = auth.currentUser;

    if (user) {
        await setDoc(doc(db, 'users', user.uid), { bio }, { merge: true });
        alert('Profile updated!');
    } else {
        alert('You need to be logged in to update your profile.');
    }
});
