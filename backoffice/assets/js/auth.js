document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    
    if (loginForm) {
        initLoginForm(loginForm);
    }
    
    if (registerForm) {
        initRegisterForm(registerForm);
    }
    
    if (forgotPasswordForm) {
        initForgotPasswordForm(forgotPasswordForm);
    }
    
    initPasswordToggles();
});

function initLoginForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        console.log('Login:', { email, password, rememberMe });
        
        showToast('successToast');
        
        setTimeout(() => {
            window.location.href = '../../index.html';
        }, 1500);
    });
}

function initRegisterForm(form) {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    confirmPassword.addEventListener('input', function() {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('As palavras-passe não coincidem');
        } else {
            confirmPassword.setCustomValidity('');
        }
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('As palavras-passe não coincidem');
        } else {
            confirmPassword.setCustomValidity('');
        }
        
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const passwordValue = password.value;
        
        console.log('Register:', { name, email, password: passwordValue });
        
        showToast('successToast');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    });
}

function initForgotPasswordForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }
        
        const email = document.getElementById('email').value;
        
        console.log('Forgot password:', { email });
        
        showToast('successToast');
    });
}

function initPasswordToggles() {
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const password = document.getElementById('password');
            const eyeIcon = document.getElementById('eyeIcon');
            
            if (password.type === 'password') {
                password.type = 'text';
                eyeIcon.classList.remove('bi-eye');
                eyeIcon.classList.add('bi-eye-slash');
            } else {
                password.type = 'password';
                eyeIcon.classList.remove('bi-eye-slash');
                eyeIcon.classList.add('bi-eye');
            }
        });
    }
    
    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', function() {
            const confirmPassword = document.getElementById('confirmPassword');
            const eyeIconConfirm = document.getElementById('eyeIconConfirm');
            
            if (confirmPassword.type === 'password') {
                confirmPassword.type = 'text';
                eyeIconConfirm.classList.remove('bi-eye');
                eyeIconConfirm.classList.add('bi-eye-slash');
            } else {
                confirmPassword.type = 'password';
                eyeIconConfirm.classList.remove('bi-eye-slash');
                eyeIconConfirm.classList.add('bi-eye');
            }
        });
    }
}

function showToast(toastId) {
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}
