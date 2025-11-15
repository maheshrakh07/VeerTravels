// Animation Component JavaScript

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fade in animations for cards
                if (entry.target.classList.contains('tour-card') || 
                    entry.target.classList.contains('service-card') ||
                    entry.target.classList.contains('testimonial-card') ||
                    entry.target.classList.contains('team-member') ||
                    entry.target.classList.contains('gallery-item')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe cards for animation
    document.querySelectorAll('.tour-card, .service-card, .testimonial-card, .team-member, .gallery-item').forEach(card => {
        observer.observe(card);
    });
}

// Add stagger animation to cards
function initStaggerAnimation() {
    const tourCards = document.querySelectorAll('.tour-card');
    tourCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Service card hover effect
function initServiceCardHover() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Add loading animation for images
function initImageLoadAnimation() {
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
}

// Reveal sections on scroll
function initSectionReveal() {
    const sections = document.querySelectorAll('.section');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        revealObserver.observe(section);
    });
}

// Handle touch devices
function initTouchDeviceSupport() {
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Improve touch interactions for cards
        document.querySelectorAll('.tour-card, .service-card, .gallery-item').forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
}

// Page load animation
function initPageLoadAnimation() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animate hero content on load
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            setTimeout(() => {
                heroContent.style.transition = 'opacity 1s ease';
                heroContent.style.opacity = '1';
            }, 100);
        }
    });
}

// Performance optimization: Remove animations on low-end devices
function checkPerformance() {
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduce-motion');
    }
}

// Initialize all animations
function initAnimations() {
    initScrollAnimations();
    initStaggerAnimation();
    initServiceCardHover();
    initImageLoadAnimation();
    initSectionReveal();
    initTouchDeviceSupport();
    initPageLoadAnimation();
    checkPerformance();
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.Animations = {
        initScrollAnimations,
        initStaggerAnimation,
        initServiceCardHover,
        initImageLoadAnimation,
        initSectionReveal,
        initTouchDeviceSupport,
        initPageLoadAnimation,
        checkPerformance,
        initAnimations
    };
}