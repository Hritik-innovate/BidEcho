// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 5px and 15px
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration (10s to 20s)
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Random delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Form validation and submission
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    
    let isValid = true;
    
    // Validate username
    if (username.length < 4) {
        document.getElementById('username-error').textContent = 'Username must be at least 4 characters';
        isValid = false;
    }
    
    // Validate email
    if (!validateEmail(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Validate password
    if (password.length < 6) {
        document.getElementById('password-error').textContent = 'Password must be at least 6 characters';
        isValid = false;
    }
    
    // Validate password match
    if (password !== confirmPassword) {
        document.getElementById('confirmPassword-error').textContent = 'Passwords do not match';
        isValid = false;
    }
    
    if (isValid) {
        // Submit to backend (mock implementation)
        mockRegisterApiCall({
            username,
            email,
            password
        }).then(response => {
            if (response.success) {
                alert('Registration successful! Redirecting to login...');
                window.location.href = 'login.html';
            } else {
                document.getElementById('confirmPassword-error').textContent = response.message || 'Registration failed';
            }
        }).catch(error => {
            console.error('Registration error:', error);
            document.getElementById('confirmPassword-error').textContent = 'Registration failed. Please try again.';
        });
    }
});

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Mock API call (replace with actual fetch to your backend)
function mockRegisterApiCall(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate server response
            resolve({ 
                success: true,
                message: 'Registration successful'
            });
        }, 1000);
    });
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
});