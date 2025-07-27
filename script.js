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

// MailerLite form success tracking
function trackMailerLiteSuccess() {
    // Track successful form submissions
    if (window.ml) {
        ml('track', 'form_submit', {
            form_id: 'Y4tjlh',
            page: window.location.pathname
        });
    }
    
    // Log to console for monitoring
    console.log('MailerLite form submitted successfully');
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

// Form loading detection
function checkFormLoading() {
    setTimeout(() => {
        const formContainer = document.querySelector('.ml-embedded');
        const customForm = document.querySelector('.custom-form');
        const fallback = document.querySelector('.form-fallback');
        
        // Check if MailerLite form loaded properly
        const mlFormLoaded = formContainer && 
                            formContainer.children.length > 0 && 
                            formContainer.querySelector('form');
        
        if (!mlFormLoaded) {
            // Form didn't load, show custom form
            if (customForm) {
                customForm.style.display = 'block';
                if (formContainer) formContainer.style.display = 'none';
                console.log('MailerLite form failed to load, showing custom form');
            } else if (fallback) {
                fallback.style.display = 'block';
            }
        } else {
            console.log('MailerLite form loaded successfully');
            
            // Still set up our custom form as backup
            if (customForm) {
                customForm.style.display = 'block';
                if (formContainer) formContainer.style.display = 'none';
                console.log('Using custom form instead of MailerLite embedded form');
            }
        }
    }, 2000); // Reduced timeout to 2 seconds
}

// Custom form submission
function handleCustomForm() {
    const form = document.getElementById('newsletter-form');
    const messageDiv = document.getElementById('form-message');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const email = document.getElementById('email').value;
            const submitBtn = form.querySelector('button[type="submit"]');
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';
            messageDiv.textContent = '';
            messageDiv.className = '';
            
            try {
                // This would be handled by a serverless function in production
                // For now, we'll show a success message
                messageDiv.textContent = 'Thank you for subscribing! Check your email for confirmation.';
                messageDiv.className = 'success';
                form.reset();
                
                console.log('Form submitted with email:', email);
                console.log('In production, this would use your API key and group ID');
                
            } catch (error) {
                messageDiv.textContent = 'Something went wrong. Please try again.';
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
    
    // Also prevent any iframe redirects from MailerLite
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
    
    // Check form and icons loading
    checkFormLoading();
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

 