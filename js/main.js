// // Main JavaScript - Application Entry Point

// // Load footer component
// async function loadFooter() {
//     const footerHTML = `
//     <footer class="footer">
//         <div class="container">
//             <div class="footer-content">
//                 <div class="footer-section">
//                     <h3>Veer Tours & Travels</h3>
//                     <p>Your Trusted Travel Partner Since 1988</p>
//                     <p style="margin-top: 15px;"><i class="fas fa-map-marker-alt"></i> Nashik, Maharashtra, India</p>
//                     <p style="margin-top: 10px;">Creating unforgettable travel memories for over 35 years</p>
//                 </div>
//                 <div class="footer-section">
//                     <h4>Quick Links</h4>
//                     <ul>
//                         <li><a href="/index.html">Home</a></li>
//                         <li><a href="/pages/about.html">About Us</a></li>
//                         <li><a href="/pages/services.html">Services</a></li>
//                         <li><a href="/pages/tours.html">Tours</a></li>
//                         <li><a href="/pages/gallery.html">Gallery</a></li>
//                         <li><a href="/pages/testimonials.html">Testimonials</a></li>
//                         <li><a href="/pages/contact.html">Contact</a></li>
//                     </ul>
//                 </div>
//                 <div class="footer-section">
//                     <h4>Contact Info</h4>
//                     <ul>
//                         <li><i class="fas fa-phone"></i> <a href="tel:+919422733366">+91 94227 33366</a></li>
//                         <li><i class="fas fa-phone"></i> <a href="tel:+919423462111">+91 94234 62111</a></li>
//                         <li><i class="fas fa-map-marker-alt"></i> Barde Complex, Tilak Road</li>
//                         <li><i class="fas fa-map-marker-alt"></i> Shalimar, Nashik 422001</li>
//                     </ul>
//                 </div>
//                 <div class="footer-section">
//                     <h4>Our Services</h4>
//                     <ul>
//                         <li>Domestic Tours</li>
//                         <li>International Tours</li>
//                         <li>Visa & Passport Services</li>
//                         <li>Corporate Travel</li>
//                         <li>Educational Tours</li>
//                         <li>Currency Exchange</li>
//                     </ul>
//                 </div>
//             </div>
//             <div class="footer-bottom">
//                 <p>&copy; 2025 Veer Tours & Travels. All rights reserved. | Your Travel Companion Since 1988</p>
//             </div>
//         </div>
//     </footer>
//     `;

//     const container = document.getElementById('footer-container');
//     if (container) {
//         container.innerHTML = footerHTML;
//     }
// }

// Load services data
async function loadServices() {
    const services = await window.AppHelpers.loadJSON('/data/services.json');
    if (!services) return;

    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;

    const servicesToShow = services.slice(0, 6); // Show first 6 services on home page
    
    servicesGrid.innerHTML = servicesToShow.map(service => `
        <div class="service-card">
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
    `).join('');
}

// Load tours data for preview
async function loadToursPreview() {
    const tours = await window.AppHelpers.loadJSON('/data/tours.json');
    if (!tours) return;

    // Load domestic tours preview
    const domesticContainer = document.getElementById('domestic-tours-preview');
    if (domesticContainer && tours.domestic) {
        const domesticToShow = tours.domestic.slice(0, 6);
        domesticContainer.innerHTML = domesticToShow.map(tour => `
            <div class="tour-card" onclick="window.location.href='/pages/tours.html'">
                <img src="${tour.image}" alt="${tour.name}" loading="lazy">
                <div class="tour-info">
                    <h4>${tour.name}</h4>
                </div>
            </div>
        `).join('');
    }

    // Load international tours preview
    const internationalContainer = document.getElementById('international-tours-preview');
    if (internationalContainer && tours.international) {
        const internationalToShow = tours.international.slice(0, 6);
        internationalContainer.innerHTML = internationalToShow.map(tour => `
            <div class="tour-card" onclick="window.location.href='/pages/tours.html'">
                <img src="${tour.image}" alt="${tour.name}" loading="lazy">
                <div class="tour-info">
                    <h4>${tour.name}</h4>
                </div>
            </div>
        `).join('');
    }
}

// Load testimonials data
async function loadTestimonials() {
    const testimonials = await window.AppHelpers.loadJSON('/data/testimonials.json');
    if (!testimonials) return;

    const testimonialsGrid = document.getElementById('testimonials-grid');
    if (!testimonialsGrid) return;

    const testimonialsToShow = testimonials.slice(0, 3); // Show first 3 testimonials
    
    testimonialsGrid.innerHTML = testimonialsToShow.map(testimonial => `
        <div class="testimonial-card">
            <div class="quote-icon">
                <i class="fas fa-quote-left"></i>
            </div>
            <p>"${testimonial.text}"</p>
            <div class="testimonial-author">
                <h4>${testimonial.author}</h4>
            </div>
        </div>
    `).join('');
}

// Track analytics events
function trackEvent(category, action, label) {
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
    // Add Google Analytics or other analytics tracking here
}

// Handle contact link clicks
function initContactTracking() {
    document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function() {
            const type = this.href.startsWith('tel:') ? 'Phone' : 'Email';
            trackEvent('Contact', 'Click', type);
        });
    });
}

// Handle WhatsApp button tracking
function initWhatsAppTracking() {
    const whatsappButton = document.querySelector('.whatsapp-float');
    if (whatsappButton) {
        whatsappButton.addEventListener('click', () => {
            trackEvent('Contact', 'Click', 'WhatsApp');
        });
    }
}

// Handle Google Reviews button tracking
function initReviewsTracking() {
    const reviewButtons = document.querySelectorAll('.reviews-float, .btn-review');
    reviewButtons.forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('Reviews', 'Click', 'Google Reviews');
        });
    });
}

// Initialize all tracking
function initTracking() {
    initContactTracking();
    initWhatsAppTracking();
    initReviewsTracking();
}

// Update footer year dynamically
function updateFooterYear() {
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        const yearText = footerYear.textContent;
        if (yearText.includes('2025') && currentYear !== 2025) {
            footerYear.textContent = yearText.replace('2025', currentYear);
        }
    }
}

// Main initialization function
async function init() {
    // Load components
    await loadFooter();
    
    // Initialize helpers
    window.AppHelpers.initializePage();
    
    // Initialize scroll features
    window.ScrollUtils.initScrollFeatures();
    
    // Initialize animations
    window.Animations.initAnimations();
    
    // Load dynamic content for home page
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        await loadServices();
        await loadToursPreview();
        await loadTestimonials();
    }
    
    // Initialize tracking
    initTracking();
    
    // Update footer year
    setTimeout(updateFooterYear, 100);
    
    console.log('Veer Tours & Travels - Website Loaded Successfully');
    console.log('Your Trusted Travel Partner Since 1988');
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});