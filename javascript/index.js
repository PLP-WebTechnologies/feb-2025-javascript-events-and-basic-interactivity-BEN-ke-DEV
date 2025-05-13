document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling ==========
    
    // Button Click
    const clickButton = document.getElementById('click-button');
    const clickOutput = document.getElementById('click-output');
    
    clickButton.addEventListener('click', function() {
        clickOutput.textContent = "You clicked me! Great job! 🎉";
        clickOutput.style.color = "#2ecc71";
    });
    
    // Hover Effect
    const hoverEffect = document.getElementById('hover-effect');
    
    hoverEffect.addEventListener('mouseenter', function() {
        this.style.backgroundColor = "#b3e5fc";
        this.style.transform = "scale(1.02)";
    });
    
    hoverEffect.addEventListener('mouseleave', function() {
        this.style.backgroundColor = "#e1f5fe";
        this.style.transform = "scale(1)";
    });
    
    // Keypress Detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keyup', function() {
        keypressOutput.textContent = this.value || "______";
    });
    
    // Secret Action (Double Click or Long Press)
    const secretButton = document.getElementById('secret-button');
    const secretMessage = document.getElementById('secret-message');
    let pressTimer;
    
    // Double click
    secretButton.addEventListener('dblclick', function() {
        secretMessage.textContent = "You found the double-click secret! 🎊";
    });
    
    // Long press
    secretButton.addEventListener('mousedown', function() {
        pressTimer = setTimeout(function() {
            secretMessage.textContent = "You held the button long enough! 🕵️‍♂️";
        }, 1000);
    });
    
    secretButton.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretButton.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // ========== Interactive Elements ==========
    
    // Color Changing Button
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f', '#9b59b6'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color ${colorIndex + 1}`;
    });
    
    // Image Gallery
    const galleryImages = document.querySelectorAll('.gallery-img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
        currentImageIndex = index;
    }
    
    prevBtn.addEventListener('click', function() {
        let newIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(newIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        let newIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(newIndex);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        let newIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(newIndex);
    }, 3000);
    
    // Accordion
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close all accordion items first
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open current one if it wasn't active
            if (!isActive) {
                content.classList.add('active');
            }
        });
    });
    
    // ========== Form Validation ==========
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const formSuccess = document.getElementById('form-success');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        const errorElement = nameInput.nextElementSibling;
        
        if (nameInput.value.trim() === '') {
            showError(nameInput, errorElement, 'Name is required');
            return false;
        } else {
            showSuccess(nameInput, errorElement);
            return true;
        }
    }
    
    function validateEmail() {
        const errorElement = emailInput.nextElementSibling;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            showError(emailInput, errorElement, 'Email is required');
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, errorElement, 'Please enter a valid email');
            return false;
        } else {
            showSuccess(emailInput, errorElement);
            return true;
        }
    }
    
    function validatePassword() {
        const errorElement = passwordInput.nextElementSibling;
        
        if (passwordInput.value.trim() === '') {
            showError(passwordInput, errorElement, 'Password is required');
            return false;
        } else if (passwordInput.value.length < 8) {
            showError(passwordInput, errorElement, 'Password must be at least 8 characters');
            return false;
        } else {
            showSuccess(passwordInput, errorElement);
            return true;
        }
    }
    
    function showError(input, errorElement, message) {
        input.classList.add('error');
        input.classList.remove('valid');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    function showSuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('valid');
        errorElement.classList.remove('show');
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            formSuccess.classList.add('show');
            form.reset();
            
            // Reset validation states
            document.querySelectorAll('input').forEach(input => {
                input.classList.remove('valid');
            });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);
        }
    });
});