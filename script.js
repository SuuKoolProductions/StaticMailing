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

// Smooth Scrolling - ONLY for navbar navigation
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

// Gallery Modal
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageModal = document.getElementById('imageModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    let currentGalleryIndex = 0;
    
    function openModal(item, index = 0) {
        const image = item.dataset.image;
        const title = item.dataset.title;
        const description = item.dataset.description;
        
        currentGalleryIndex = index;
        modalImage.src = image;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function navigateGallery(direction) {
        if (!imageModal.classList.contains('active')) return;
        
        let newIndex = currentGalleryIndex + direction;
        if (newIndex < 0) newIndex = galleryItems.length - 1;
        if (newIndex >= galleryItems.length) newIndex = 0;
        
        openModal(galleryItems[newIndex], newIndex);
    }
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openModal(item, index));
    });
    
    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!imageModal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            navigateGallery(-1);
        } else if (e.key === 'ArrowRight') {
            navigateGallery(1);
        }
    });
}

// Screenshot Carousel (manual control only)
function initScreenshotCarousel() {
    const carousel = document.getElementById('screenshotCarousel');
    const prevBtn = document.getElementById('prevScreenshotBtn');
    const nextBtn = document.getElementById('nextScreenshotBtn');
    const dots = document.querySelectorAll('#screenshotCarouselDots .carousel-dot');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const slides = carousel.querySelectorAll('.screenshot-slide');
    const totalSlides = slides.length;
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function scrollToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;
        
        const slide = slides[currentIndex];
        if (slide) {
            const slideLeft = slide.offsetLeft;
            const slideWidth = slide.offsetWidth;
            const carouselWidth = carousel.offsetWidth;
            const scrollLeft = slideLeft - (carouselWidth - slideWidth) / 2;
            
            carousel.scrollLeft = scrollLeft;
        }
        updateDots();
    }
    
    prevBtn.addEventListener('click', () => scrollToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => scrollToSlide(currentIndex + 1));
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => scrollToSlide(index));
    });
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections for subtle animations
    const animatedElements = document.querySelectorAll(
        '.feature-card, .security-card, .platform-card, .screenshot-card, .mobile-slide'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Light mode adjustments
        if (body.classList.contains('light-mode')) {
            if (scrollTop > 100) {
                navbar.style.backgroundColor = 'rgba(250, 250, 250, 0.98)';
            } else {
                navbar.style.backgroundColor = 'rgba(250, 250, 250, 0.95)';
            }
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
                console.log('Making API call to /api/subscribe with email:', email);
                
                const response = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email })
                });

                console.log('Response status:', response.status);
                console.log('Response headers:', Object.fromEntries(response.headers.entries()));

                const data = await response.json();
                console.log('Response data:', data);

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
                console.error('Network error details:', error);
                console.error('Error name:', error.name);
                console.error('Error message:', error.message);
                
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

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = hero.querySelector('.hero-preview-img');
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
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
    
    // Initialize gallery modal
    initGalleryModal();
    
    // Initialize screenshot carousel
    initScreenshotCarousel();
    
    // Initialize animations
    initAnimations();
    
    // Initialize parallax
    initParallax();
    
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
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
