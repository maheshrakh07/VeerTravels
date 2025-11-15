// Contact Page JavaScript

// Track contact method clicks
function initContactTracking() {
    // Track phone clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            const phoneNumber = this.href.replace('tel:', '');
            console.log(`Contact: Phone clicked - ${phoneNumber}`);
        });
    });

    // Track WhatsApp clicks
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('Contact: WhatsApp clicked');
        });
    });

    // Track map interactions
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('click', function() {
            console.log('Contact: Map clicked');
        });
    }
}

// Initialize contact animations
function initContactAnimations() {
    const contactItems = document.querySelectorAll('.contact-item, .action-card');
    
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });
}

// Add click-to-copy functionality for phone numbers
function initCopyToClipboard() {
    const phoneLinks = document.querySelectorAll('.contact-item a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.setAttribute('title', 'Click to call, long press to copy');
        
        let pressTimer;
        
        link.addEventListener('mousedown', function(e) {
            pressTimer = setTimeout(() => {
                e.preventDefault();
                const phoneNumber = this.textContent;
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(phoneNumber).then(() => {
                        showCopyNotification(this);
                    });
                }
            }, 500);
        });
        
        link.addEventListener('mouseup', function() {
            clearTimeout(pressTimer);
        });
        
        link.addEventListener('mouseleave', function() {
            clearTimeout(pressTimer);
        });
    });
}

// Show copy notification
function showCopyNotification(element) {
    const notification = document.createElement('div');
    notification.textContent = 'Copied!';
    notification.style.cssText = `
        position: absolute;
        background: var(--primary-green);
        color: white;
        padding: 8px 15px;
        border-radius: 5px;
        font-size: 0.9rem;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    element.parentElement.style.position = 'relative';
    element.parentElement.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Initialize contact page
function initContactPage() {
    initContactTracking();
    initContactAnimations();
    initCopyToClipboard();
    
    // Initialize animations
    if (window.Animations) {
        window.Animations.initScrollAnimations();
    }
}

// Load when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactPage);
} else {
    initContactPage();
}