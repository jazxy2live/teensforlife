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
  
  // Get elements from DOM
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const dashboard = document.getElementById('dashboard');
  const userName = document.getElementById('userName');
  const userPic = document.getElementById('userPic');
  
  // Set up Google sign-in method
  const provider = new firebase.auth.GoogleAuthProvider();
  
  // Google Login
  loginBtn.addEventListener('click', () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        displayUserInfo(user); // Call function to display user's information
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  });
  
  // Google Logout
  logoutBtn.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
      dashboard.style.display = 'none';
      loginBtn.style.display = 'block';
      logoutBtn.style.display = 'none';
    }).catch((error) => {
      console.error("Error during logout:", error);
    });
  });
  
  // Function to display user info after login
  function displayUserInfo(user) {
    dashboard.style.display = 'block';
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    userName.textContent = user.displayName;
    userPic.src = user.photoURL;
  }
  
  // Check if a user is already logged in (session persistence)
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      displayUserInfo(user); // If user is already logged in, display their info
    }
  });
