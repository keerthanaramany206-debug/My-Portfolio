// Enhanced JavaScript for attractive animations and full responsiveness
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize all animations
    initializeParticles();
    initializeClickAnimations();
    initializeResponsiveHandlers();
    
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Dynamic navbar behavior
    setupNavbarEffects();
    
    // Scroll-to-top functionality
    setupScrollToTop();
    
    // Intersection Observer for scroll animations
    setupIntersectionObserver();
    
    // Button ripple effects
    setupButtonEffects();

    // Mobile navigation toggle
    initMobileNav();
    
    console.log('All initializations complete');
});

// Particle System - Optimized for Performance
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Performance-optimized particle count based on device
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
    
    // Remove particles on mobile scroll for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (isMobile) {
            clearTimeout(scrollTimeout);
            particlesContainer.style.opacity = '0.5';
            scrollTimeout = setTimeout(() => {
                particlesContainer.style.opacity = '1';
            }, 100);
        }
    });
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties for variety
    const size = Math.random() * 3 + 2; // 2-5px
    const delay = Math.random() * 20; // 0-20s delay
    
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = delay + 's';
    
    container.appendChild(particle);
}

// Smooth Scrolling Setup
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu after navigation
            const nav = document.querySelector('.nav-menu');
            const btn = document.querySelector('.mobile-menu-btn');
            if (nav && btn && window.innerWidth <= 768 && nav.classList.contains('open')) {
                nav.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// Enhanced Navbar Effects
function setupNavbarEffects() {
    let ticking = false;
    
    function updateNavbar() {
        const navbar = document.querySelector('.navbar');
        const scrolled = window.scrollY > 50;
        
        navbar.style.transform = `translateY(${scrolled ? -5 : 0}px)`;
        navbar.style.background = scrolled ? 
            'rgba(15, 15, 35, 0.98)' : 
            'rgba(15, 15, 35, 0.95)';
        navbar.style.boxShadow = scrolled ? 
            '0 8px 40px rgba(0, 0, 0, 0.4)' : 
            '0 4px 30px rgba(0, 0, 0, 0.3)';
        
        ticking = false;
    }
    
    function requestUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestUpdate);
}

// Scroll-to-Top Functionality
function setupScrollToTop() {
    const scrollButton = document.querySelector('.scroll-to-top');
    
    if (!scrollButton) {
        console.error('Scroll to top button not found');
        return;
    }
    
    function toggleScrollButton() {
        const scrollY = window.scrollY || window.pageYOffset;
        const shouldShow = scrollY > 300;
        
        if (shouldShow) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    }
    
    // Initial check
    toggleScrollButton();
    
    window.addEventListener('scroll', toggleScrollButton);
    
    // Scroll to top function
    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    console.log('Scroll to top functionality initialized');
}

// Enhanced Intersection Observer for Scroll Animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-in');
                }, index * 100); // Staggered animation
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.contact-item, .resume-card, .skill-category, .experience-item, .education-card'
    );
    
    animatableElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(element);
    });
}

// Enhanced Hover Effects
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.contact-item, .resume-card, .skill-category, .experience-item, .education-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
        
        // Touch support for mobile
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
            }, 300);
        });
    });
}

// Click Animations
function initializeClickAnimations() {
    // Animate tags with ripple effect
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            createRipple(e, this);
        });
        
        // Bounce animation on hover
        tag.addEventListener('mouseenter', function() {
            this.style.animation = 'tagPulse 0.6s ease-in-out';
        });
        
        tag.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
}

// Button Effects
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createButtonRipple(e, this);
        });
        
        // Magnetic effect for primary buttons
        if (button.classList.contains('btn-primary')) {
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) * 0.1;
                const moveY = (y - centerY) * 0.1;
                
                this.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
            });
        }
    });
}

// Ripple Effect Functions
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createButtonRipple(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('button-ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

// Responsive Handlers
function initializeResponsiveHandlers() {
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });
    
    // Mobile navigation toggle (for future mobile menu)
    setupMobileMenu();
}

function handleResize() {
    // Re-render particles on significant resize
    if (Math.abs(window.innerWidth - (window.resizeWidth || 0)) > 100) {
        const particles = document.getElementById('particles');
        if (particles) {
            particles.innerHTML = '';
            initializeParticles();
        }
        window.resizeWidth = window.innerWidth;
    }
    
    // Update particle count based on screen size
    updateParticleCount();
}

function updateParticleCount() {
    const particles = document.querySelectorAll('.particle');
    const isMobile = window.innerWidth < 768;
    const currentCount = particles.length;
    const targetCount = isMobile ? 15 : 30;
    
    if (currentCount > targetCount) {
        for (let i = targetCount; i < currentCount; i++) {
            particles[i]?.remove();
        }
    }
}

function setupMobileMenu() {
    // Ensure handlers exist for the static mobile menu button
    const nav = document.querySelector('.nav-menu');
    const btn = document.querySelector('.mobile-menu-btn');
    if (!nav || !btn) return;

    function syncMenuForViewport() {
        if (window.innerWidth > 768) {
            nav.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            nav.style.display = '';
        }
    }

    btn.addEventListener('click', function() {
        const isOpen = nav.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(isOpen));
    });

    window.addEventListener('resize', debounce(syncMenuForViewport, 150));

    // Click outside to close
    document.addEventListener('click', function(e) {
        const clickedInsideMenu = nav.contains(e.target) || btn.contains(e.target);
        if (!clickedInsideMenu && nav.classList.contains('open')) {
            nav.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        }
    });
}

function initMobileNav() {
    setupMobileMenu();
}

// Page Load Animation Sequence
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero elements in sequence
    const heroElements = document.querySelectorAll(
        '.hero-title, .hero-description, .hero-subdescription, .hero-tags, .hero-buttons, .hero-image'
    );
    
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Initialize card animations after load
    initializeCardAnimations();
});

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS for ripple animations
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    .button-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: button-ripple-animation 0.8s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes button-ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .tag {
            animation: none !important;
        }
        
        .btn-primary {
            transform: none !important;
        }
    }
`;
document.head.appendChild(style);

// Footer copyright year update
document.addEventListener('DOMContentLoaded', function() {
    const copyrightYear = document.querySelector('.footer-left p');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.textContent = copyrightYear.textContent.replace('2024', currentYear);
    }
});