import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
let useridenTITY = ""; // Variable to store the email
let useridenTITY2;

document.addEventListener('DOMContentLoaded', () => {
    // Your JavaScript code here


    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAK6-Gd1yhk1Kc9nd0kLWRjjCDUjIOvxbU",
        authDomain: "ruhungry-b58cd.firebaseapp.com",
        projectId: "ruhungry-b58cd",
        storageBucket: "ruhungry-b58cd.appspot.com",
        messagingSenderId: "1056563241971",
        appId: "1:1056563241971:web:2e743e007908f837fd2886"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(); // Get the auth object
    const loginButton=document.getElementById('loginButton');
    const logoutButton=document.getElementById('logoutButton');

    // Function to update UI based on authentication state
    function updateUI(user) {
        if (user) {
            // User is signed in
            console.log('User is signed in:', user.uid);
            // Hide the login section
            document.getElementById('loginSection').style.display = 'none';
            // Show the logout button
            document.getElementById('logoutButton').style.display = 'block';
        } else {
            // User is signed out
            console.log('User is signed out');
            // Show the login section
            document.getElementById('loginSection').style.display = 'block';
            // Hide the logout button
            document.getElementById('logoutButton').style.display = 'none';
        }
    }

    // Function to redirect user after successful login
    function redirectToPage() {
        window.location.href = 'home.html'; // Replace 'abc.html' with the desired URL
    }

    loginButton.addEventListener('click', async () => {
        const email = document.getElementById('loginEmail').value+"@gmail.com";
        const password = document.getElementById('loginPassword').value;

        if (email === '' || password === '') {
            alert('You must enter a valid email and password');
            return;
        }

        try {
            // Attempt to sign in the user
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User signed in:', user.uid);
            
            // Store the email in the variable
            useridenTITY = email;
            useridenTITY2 = useridenTITY.replace('@gmail.com', '');
            function updateOrder() {
                fetch("http://localhost:3000/curstu", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({cur : useridenTITY2}) // Assuming your order structure has an 'items' field
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Order updated successfully');
                    } else {
                        console.error('Failed to update order');
                    }
                })
                .catch(error => {
                    console.error('Error updating order:', error);
                });
            }
            updateOrder();
            
            
            // Redirect user after successful login
            redirectToPage();
        } catch (error) {
            // Handle sign in errors
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/user-not-found') {
                alert('No user exists with this email. Please create a new account.');
            } else {
                console.error('Sign-in failed:', errorMessage);
            }
        }
    });

    // Logout functionality
    logoutButton.addEventListener('click', () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful
                console.log('User signed out');
                // Clear the stored email
                useridenTITY = "";
            })
            .catch((error) => {
                // An error happened
                console.error('Sign-out failed:', error);
            });
    });

    // Listen for authentication state changes
    auth.onAuthStateChanged((user) => {
        // Update UI based on authentication state
        updateUI(user);
    });
});
export { useridenTITY2 };
