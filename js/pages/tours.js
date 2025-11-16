// Tours Page JavaScript

let toursData = null;

// Load all tours
async function loadAllTours() {
    toursData = await window.AppHelpers.loadJSON('/data/tours.json');
    if (!toursData) {
        console.error('Failed to load tours data');
        return;
    }

    loadDomesticTours();
    loadInternationalTours();
    initializeFilters();
}

// Load domestic tours
function loadDomesticTours() {
    const domesticGrid = document.getElementById('domestic-tours-grid');
    if (!domesticGrid || !toursData.domestic) return;

    domesticGrid.innerHTML = toursData.domestic.map(tour => createTourCard(tour, 'domestic')).join('');
}

// Load international tours
function loadInternationalTours() {
    const internationalGrid = document.getElementById('international-tours-grid');
    if (!internationalGrid || !toursData.international) return;

    internationalGrid.innerHTML = toursData.international.map(tour => createTourCard(tour, 'international')).join('');
}

// Create tour card HTML
function createTourCard(tour, category) {
    return `
        <div class="tour-card" data-tour-id="${tour.id}" data-category="${category}">
            <img src="${tour.image}" alt="${tour.name}" loading="lazy">
            <div class="tour-info">
                <h4>${tour.name}</h4>
                <div class="tour-details">
                    ${tour.duration ? `<p class="tour-duration"><i class="fas fa-clock"></i> ${tour.duration}</p>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Initialize filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const domesticSection = document.getElementById('domestic-tours');
    const internationalSection = document.getElementById('international-tours');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            // Show/hide sections based on filter
            if (filter === 'all') {
                domesticSection.classList.remove('hidden');
                internationalSection.classList.remove('hidden');
            } else if (filter === 'domestic') {
                domesticSection.classList.remove('hidden');
                internationalSection.classList.add('hidden');
            } else if (filter === 'international') {
                domesticSection.classList.add('hidden');
                internationalSection.classList.remove('hidden');
            }

            // Smooth scroll to tours
            const target = filter === 'domestic' ? domesticSection : 
                          filter === 'international' ? internationalSection : 
                          domesticSection;
            
            if (target) {
                setTimeout(() => {
                    const navbarHeight = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }, 100);
            }
        });
    });
}

// Initialize tour card click handlers
function initTourCardHandlers() {
    document.querySelectorAll('.tour-card').forEach(card => {
        card.addEventListener('click', function() {
            const tourId = this.dataset.tourId;
            const category = this.dataset.category;
            openTourModal(tourId, category);
        });
    });
}

// Open tour modal with details
function openTourModal(tourId, category) {
    const tour = toursData[category].find(t => t.id === tourId);
    if (!tour) return;

    const modal = document.getElementById('tourModal');
    const modalBody = document.getElementById('modal-body');

    const highlightsHTML = tour.highlights ? 
        `<div class="modal-highlights">
            <h3>Tour Highlights</h3>
            <div class="highlights-list">
                ${tour.highlights.map(h => `<div class="highlight-item"><i class="fas fa-check"></i> ${h}</div>`).join('')}
            </div>
        </div>` : '';

    modalBody.innerHTML = `
        <img src="${tour.image}" alt="${tour.name}" class="modal-image">
        <div class="modal-details">
            <h2>${tour.name}</h2>
            <p>${tour.description}</p>
            
            <div class="modal-info">
                ${tour.duration ? `
                <div class="info-item">
                    <i class="fas fa-clock"></i>
                    <h4>Duration</h4>
                    <p>${tour.duration}</p>
                </div>` : ''}
                <div class="info-item">
                    <i class="fas fa-map-marked-alt"></i>
                    <h4>Category</h4>
                    <p>${category === 'domestic' ? 'Domestic Tour' : 'International Tour'}</p>
                </div>
            </div>

            ${highlightsHTML}

            <div class="modal-cta">
                <h3 style="color: var(--primary-green); margin-bottom: 20px;">Interested in this tour?</h3>
                <p style="margin-bottom: 20px;">Contact us for detailed itinerary, pricing, and customization options</p>
                <div class="cta-buttons">
                    <a href="/contact" class="btn btn-primary">Get Quote</a>
                    <a href="tel:+919422733366" class="btn btn-secondary"><i class="fas fa-phone"></i> Call Now</a>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal functionality
function initModalClose() {
    const modal = document.getElementById('tourModal');
    const closeBtn = document.querySelector('.modal-close');

    // Close on X button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on outside click
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('tourModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Initialize tours page
async function initToursPage() {
    await loadAllTours();
    initTourCardHandlers();
    initModalClose();

    // Initialize animations after loading
    if (window.Animations) {
        window.Animations.initScrollAnimations();
    }
}

// Load tours when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToursPage);
} else {
    initToursPage();
}