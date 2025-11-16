// Services Page JavaScript

async function loadAllServices() {
    const services = await window.AppHelpers.loadJSON('/data/services.json');
    if (!services) {
        console.error('Failed to load services data');
        return;
    }

    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;

    servicesGrid.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-icon">
                <i class="${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            ${service.details ? `<p style="font-size: 0.95rem; color: var(--text-light); margin-top: 10px;">${service.details}</p>` : ''}
        </div>
    `).join('');

    // Initialize animations after loading
    if (window.Animations) {
        window.Animations.initScrollAnimations();
    }
}

// Track service card interactions
function initServiceTracking() {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const serviceName = this.querySelector('h3').textContent;
            console.log(`Service viewed: ${serviceName}`);
        });
    });
}

// Initialize page
async function initServicesPage() {
    await loadAllServices();
    initServiceTracking();
}

// Load services when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServicesPage);
} else {
    initServicesPage();
}