console.log("JavaScript is connected!");


// Typing animation
const text = "Welcome to teensforlife";
const duration = 100; // Speed of typing
let displayedText = "";
let i = 0;

const typeText = () => {
    if (i < text.length) {
        displayedText += text.charAt(i);
        document.getElementById("type-text").innerText = displayedText;
        i++;
        setTimeout(typeText, duration);
    } else {
        // Optionally, you can add a blinking cursor effect
        document.getElementById("type-text").style.borderRight = "2px solid #333"; // Cursor effect
        setInterval(() => {
            document.getElementById("type-text").style.borderColor = 
                document.getElementById("type-text").style.borderColor === 'transparent' ? '#333' : 'transparent';
        }, 500); // Blink effect
    }
};



// Start the typing effect
typeText();

/*THIS IS THE FAQ ARROW SECTION */

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        faqItem.classList.toggle('active');
    });
});


/*THIS IS FOR THE SERVER AUTHENTICATION DATA SERVER */



function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
}

// After redirect, handle the result
auth.getRedirectResult().then((result) => {
    if (result.user) {
        console.log(result.user); // User info
    }
}).catch((error) => {
    console.error(error);
});
