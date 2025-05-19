const loginForm = document.getElementById('loginForm');
const signupToggle = document.getElementById('signupToggle');
const signupForm = document.getElementById('signupForm');
const signupBtn = document.getElementById('signupBtn');
const signupSuccessMsg = document.getElementById('signup-success-msg');
const loginErrorMsg = document.getElementById('login-error-msg');
const clickSound = document.getElementById('click-sound');
const loginButton = document.querySelector('button[type="submit"]');

// Fungsi untuk memutar suara klik
function playClickSound() {
    clickSound.play();
}

// Password Toggle
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('loginPassword');
togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePassword.classList.toggle('fa-eye-slash');
});

// Data login default
const defaultUsername = "admin";
const defaultPassword = "kopi123";

// Proses login
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    playClickSound();
    loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    loginButton.disabled = true;

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const storedUsername = sessionStorage.getItem("username") || defaultUsername;
    const storedPassword = sessionStorage.getItem("password") || defaultPassword;

    document.getElementById('spinner').style.display = 'block';

    setTimeout(() => {
        if (username === storedUsername && password === storedPassword) {
            window.location.href = "index.html";  // Redirect to main page
        } else {
            loginErrorMsg.textContent = "Authentication failed! Please check your username and password.";
            document.getElementById('spinner').style.display = 'none';
            loginButton.innerHTML = '<i class="fas fa-coffee"></i> Login';
            loginButton.disabled = false;
        }
    }, 1500);  // Simulate a delay for login process
});

// Tampilkan form signup saat tombol daftar diklik
signupToggle.addEventListener('click', () => {
    signupForm.classList.toggle('active');
});

// Proses sign up
signupBtn.addEventListener('click', function() {
    playClickSound();

    const signupUsername = document.getElementById('signupUsername').value;
    const signupPassword = document.getElementById('signupPassword').value;

    if (signupUsername && signupPassword) {
        // Simpan data username dan password di sessionStorage
        sessionStorage.setItem("username", signupUsername);
        sessionStorage.setItem("password", signupPassword);

        signupSuccessMsg.textContent = "Successfully registered! Please sign in.";
        setTimeout(() => {
            signupForm.classList.remove('active');  // Hide the sign-up form after a few seconds
        }, 1500);
    } else {
        signupSuccessMsg.textContent = "Every field must be completed!";
    }
});
