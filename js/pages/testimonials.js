// Testimonials Page JavaScript

// Load all testimonials
async function loadAllTestimonials() {
    const testimonials = await window.AppHelpers.loadJSON('/data/testimonials.json');
    if (!testimonials) {
        console.error('Failed to load testimonials data');
        return;
    }

    const testimonialsGrid = document.getElementById('testimonials-grid');
    if (!testimonialsGrid) return;

    testimonialsGrid.innerHTML = testimonials.map(testimonial => createTestimonialCard(testimonial)).join('');

    // Initialize animations after loading
    if (window.Animations) {
        window.Animations.initScrollAnimations();
    }
}

// Create testimonial card HTML
function createTestimonialCard(testimonial) {
    const initials = getInitials(testimonial.author);
    const stars = generateStars(testimonial.rating || 5);
    const formattedDate = formatDate(testimonial.date);

    return `
        <div class="testimonial-card">
            <div class="quote-icon">
                <i class="fas fa-quote-left"></i>
            </div>
            <p>"${testimonial.text}"</p>
            <div class="testimonial-author">
                <div class="author-avatar">${initials}</div>
                <div class="author-info">
                    <h4>${testimonial.author}</h4>
                    <div class="testimonial-rating">
                        ${stars}
                    </div>
                    ${formattedDate ? `<p style="font-size: 0.85rem; color: var(--text-light); margin-top: 3px;">${formattedDate}</p>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Get initials from name
function getInitials(name) {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
        return parts[0][0] + parts[parts.length - 1][0];
    }
    return parts[0][0];
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '';
    
    try {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long' };
        return date.toLocaleDateString('en-US', options);
    } catch (e) {
        return '';
    }
}

// Track review button clicks
function initReviewTracking() {
    document.querySelectorAll('.btn-review').forEach(button => {
        button.addEventListener('click', function() {
            const isWrite = this.classList.contains('btn-review-write');
            console.log(`Reviews: ${isWrite ? 'Write' : 'View'} review clicked`);
        });
    });
}

// Animate stats on scroll
function initStatsAnimation() {
    const statsSection = document.querySelector('.testimonials-stats');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

// Animate numbers counting up
function animateNumbers() {
    const statBoxes = document.querySelectorAll('.stat-box h3');
    
    statBoxes.forEach(box => {
        const text = box.textContent;
        const hasPlus = text.includes('+');
        const hasStar = text.includes('★');
        const hasComma = text.includes(',');
        
        // Extract number
        let targetNum = parseFloat(text.replace(/[^0-9.]/g, ''));
        
        if (isNaN(targetNum)) return;

        let currentNum = 0;
        const increment = targetNum / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            currentNum += increment;
            if (currentNum >= targetNum) {
                currentNum = targetNum;
                clearInterval(timer);
            }

            let displayNum = Math.floor(currentNum);
            
            // Format the number
            if (hasComma && displayNum >= 1000) {
                displayNum = displayNum.toLocaleString();
            } else if (hasStar) {
                displayNum = currentNum.toFixed(1);
            }

            box.textContent = displayNum + (hasPlus ? '+' : '') + (hasStar ? '★' : '');
        }, stepTime);
    });
}

// Add hover effects to testimonial cards
function initCardHoverEffects() {
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize testimonials page
async function initTestimonialsPage() {
    await loadAllTestimonials();
    initReviewTracking();
    initStatsAnimation();
    initCardHoverEffects();
}

// Load when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonialsPage);
} else {
    initTestimonialsPage();
}