// DOM Elements
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
        themeSwitch.checked = savedTheme === 'light-mode';
    } else {
        // Default to dark mode
        body.className = 'dark-mode';
        themeSwitch.checked = false;
    }
}

function toggleTheme() {
    if (body.classList.contains('dark-mode')) {
        body.className = 'light-mode';
        localStorage.setItem('theme', 'light-mode');
    } else {
        body.className = 'dark-mode';
        localStorage.setItem('theme', 'dark-mode');
    }
}

// Mobile Navigation
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// Smooth Scrolling
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        closeMobileMenu();
    }
}

// Custom form success tracking
function trackFormSuccess() {
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', function() {
            console.log('Custom form submitted successfully');
        });
    }
}





// Intersection Observer for animations - DISABLED
function initAnimations() {
    // Animation disabled - keeping function for potential future use
    console.log('Scroll animations disabled');
}

// Navbar scroll effect
function initNavbarScroll() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.backgroundColor = 'rgba(var(--bg-primary-rgb), 0.95)';
        } else {
            navbar.style.backgroundColor = 'var(--bg-primary)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Show custom form immediately (MailerLite embedded form disabled)
function showCustomForm() {
    const customForm = document.querySelector('.custom-form');
    if (customForm) {
        customForm.style.display = 'block';
        
        // Set CSRF token
        const csrfTokenInput = document.getElementById('csrf-token');
        if (csrfTokenInput) {
            csrfTokenInput.value = generateCSRFToken();
        }
        
        console.log('Using custom form instead of MailerLite embedded form');
    }
}

// Input sanitization and validation
function sanitizeInput(input) {
    // Remove any HTML tags and dangerous characters
    return input.replace(/<[^>]*>/g, '').trim();
}

function validateEmail(email) {
    // Comprehensive email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!email || email.length === 0) {
        return { valid: false, message: 'Email address is required' };
    }
    
    if (email.length > 254) {
        return { valid: false, message: 'Email address is too long' };
    }
    
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Please enter a valid email address' };
    }
    
    // Check for common disposable email domains
    const disposableDomains = [
        '10minutemail.com', 'guerrillamail.com', 'mailinator.com', 
        'tempmail.org', 'throwaway.email', 'yopmail.com'
    ];
    
    const domain = email.split('@')[1]?.toLowerCase();
    if (disposableDomains.includes(domain)) {
        return { valid: false, message: 'Please use a valid email address' };
    }
    
    return { valid: true, message: '' };
}

// Rate limiting to prevent spam
const submissionAttempts = new Map();
const MAX_ATTEMPTS = 3;
const ATTEMPT_WINDOW = 60000; // 1 minute

// Generate CSRF token
function generateCSRFToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function checkRateLimit(email) {
    const now = Date.now();
    const attempts = submissionAttempts.get(email) || [];
    
    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(time => now - time < ATTEMPT_WINDOW);
    
    if (recentAttempts.length >= MAX_ATTEMPTS) {
        return false;
    }
    
    // Add current attempt
    recentAttempts.push(now);
    submissionAttempts.set(email, recentAttempts);
    
    return true;
}

// Custom form submission with security measures
function handleCustomForm() {
    const form = document.getElementById('newsletter-form');
    const messageDiv = document.getElementById('form-message');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const emailInput = document.getElementById('email');
            const csrfToken = document.getElementById('csrf-token')?.value;
            const email = sanitizeInput(emailInput.value);
            const submitBtn = form.querySelector('button[type="submit"]');
            
            // Validate CSRF token
            if (!csrfToken || csrfToken.length < 20) {
                messageDiv.textContent = 'Security validation failed. Please refresh the page and try again.';
                messageDiv.className = 'error';
                return;
            }
            
            // Validate email
            const validation = validateEmail(email);
            if (!validation.valid) {
                messageDiv.textContent = validation.message;
                messageDiv.className = 'error';
                emailInput.focus();
                return;
            }
            
            // Check rate limiting
            if (!checkRateLimit(email)) {
                messageDiv.textContent = 'Too many attempts. Please wait a moment before trying again.';
                messageDiv.className = 'error';
                return;
            }
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';
            messageDiv.textContent = '';
            messageDiv.className = '';
            
            try {
                // Call our serverless function to subscribe to MailerLite
                const response = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    messageDiv.textContent = data.message || 'Thank you for subscribing! Check your email for confirmation.';
                    messageDiv.className = 'success';
                    form.reset();
                    
                    // Generate new CSRF token for next submission
                    const csrfTokenInput = document.getElementById('csrf-token');
                    if (csrfTokenInput) {
                        csrfTokenInput.value = generateCSRFToken();
                    }
                    
                    console.log('Successfully subscribed:', email);
                } else {
                    // Handle specific error cases
                    if (response.status === 409) {
                        messageDiv.textContent = 'This email is already subscribed to our newsletter.';
                    } else {
                        messageDiv.textContent = data.error || 'Something went wrong. Please try again.';
                    }
                    messageDiv.className = 'error';
                    console.error('Subscription error:', data.error);
                }
                
            } catch (error) {
                messageDiv.textContent = 'Network error. Please check your connection and try again.';
                messageDiv.className = 'error';
                console.error('Form submission error:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Subscribe';
            }
        });
    }
}

// Prevent all form redirects
function preventFormRedirects() {
    // Prevent any form from redirecting
    document.addEventListener('submit', function(e) {
        const form = e.target;
        
        // If it's our custom form, let it handle itself
        if (form.id === 'newsletter-form') {
            return;
        }
        
        // For any other form, prevent default
        e.preventDefault();
        e.stopPropagation();
        console.log('Prevented form redirect for:', form);
    }, true);
    
    // Prevent any iframe redirects
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.addEventListener('load', function() {
            try {
                // Try to prevent iframe navigation
                iframe.contentWindow.location.href = 'about:blank';
            } catch (e) {
                console.log('Could not prevent iframe redirect');
            }
        });
    });
}

// Icon fallback handling
function checkIconsLoaded() {
    setTimeout(() => {
        const icons = document.querySelectorAll('.fas, .fa');
        let iconsLoaded = true;
        
        icons.forEach(icon => {
            const computedStyle = window.getComputedStyle(icon, '::before');
            const content = computedStyle.content;
            
            // If icon shows as placeholder text, it's not loaded
            if (content && (content.includes('F') || content.includes('\\'))) {
                iconsLoaded = false;
            }
        });
        
        if (!iconsLoaded) {
            console.log('Font Awesome icons not loaded');
        } else {
            console.log('Font Awesome icons loaded successfully');
        }
    }, 2000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Event listeners
    themeSwitch.addEventListener('change', toggleTheme);
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Listen for MailerLite form submissions
    document.addEventListener('DOMContentLoaded', () => {
        // Track MailerLite form submissions
        if (window.ml) {
            ml('track', 'page_view', {
                page: window.location.pathname
            });
        }
    });
    
    // Initialize animations
    initAnimations();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Show custom form and set up functionality
    showCustomForm();
    checkIconsLoaded();
    handleCustomForm();
    preventFormRedirects();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.nav-toggle')) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
});

 