// Scroll Utilities

// Scroll to Top Button
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    if (!scrollTopBtn) return;

    let topBtnTicking = false;

    window.addEventListener('scroll', () => {
        if (!topBtnTicking) {
            window.requestAnimationFrame(() => {
                if (window.pageYOffset > 300) {
                    scrollTopBtn.classList.add('active');
                } else {
                    scrollTopBtn.classList.remove('active');
                }
                topBtnTicking = false;
            });
            topBtnTicking = true;
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#home') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbarHeight = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Highlight navigation based on scroll position
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0) return;

    let navTicking = false;

    function highlightNavigation() {
        if (!navTicking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.pageYOffset;
                const navbarHeight = 80;
                const offset = navbarHeight + 100;

                sections.forEach(section => {
                    const sectionHeight = section.offsetHeight;
                    const sectionTop = section.offsetTop - offset;
                    const sectionId = section.getAttribute('id');
                    const navLink = document.querySelector(`.nav-link[href*="#${sectionId}"]`);

                    if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        navLinks.forEach(link => link.classList.remove('active'));
                        navLink.classList.add('active');
                    }
                });
                navTicking = false;
            });
            navTicking = true;
        }
    }

    window.addEventListener('scroll', highlightNavigation);
}

// Parallax effect for hero section
function initParallax() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const hero = document.querySelector('.hero');
                if (hero) {
                    const scrolled = window.pageYOffset;
                    if (scrolled < window.innerHeight) {
                        const parallaxSpeed = 0.3;
                        hero.style.transform = `translate3d(0, ${scrolled * parallaxSpeed}px, 0)`;
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Scroll indicator click handler
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about-preview') || 
                           document.getElementById('about') ||
                           document.querySelector('.section');
        
        if (aboutSection) {
            const navbarHeight = 80;
            const targetPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Initialize all scroll features
function initScrollFeatures() {
    initScrollToTop();
    initSmoothScrolling();
    initScrollSpy();
    initParallax();
    initScrollIndicator();
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.ScrollUtils = {
        initScrollToTop,
        initSmoothScrolling,
        initScrollSpy,
        initParallax,
        initScrollIndicator,
        initScrollFeatures
    };
}