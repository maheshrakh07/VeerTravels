// // Navbar Component JavaScript

// async function loadNavbar() {
//     const navbarHTML = `
//     <nav class="navbar" id="navbar">
//         <div class="nav-container">
//             <a href="/" class="logo">
//                 <img src="/assets/images/logo.png" alt="Prashant Tours & Travels" class="logo-img" onerror="this.style.display='none'">
//                 <span>Veer Tours & Travels</span>
//             </a>
//             <ul class="nav-menu" id="navMenu">
//                 <li><a href="/" class="nav-link">Home</a></li>
//                 <li><a href="/about" class="nav-link">About</a></li>
//                 <li><a href="/services" class="nav-link">Services</a></li>
//                 <li><a href="/tours" class="nav-link">Tours</a></li>
//                 <li><a href="/gallery" class="nav-link">Gallery</a></li>
//                 <li><a href="/testimonials" class="nav-link">Testimonials</a></li>
//                 <li><a href="/contact" class="nav-link">Contact</a></li>
//             </ul>
//             <div class="hamburger" id="hamburger">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//             </div>
//         </div>
//     </nav>
//     `;

//     const container = document.getElementById('navbar-container');
//     if (container) {
//         container.innerHTML = navbarHTML;
//         initNavbarFunctionality();
//     }
// }

// function initNavbarFunctionality() {
//     const hamburger = document.getElementById('hamburger');
//     const navMenu = document.getElementById('navMenu');
//     const navLinks = document.querySelectorAll('.nav-link');
//     const navbar = document.getElementById('navbar');

//     // Mobile Navigation Toggle
//     if (hamburger && navMenu) {
//         hamburger.addEventListener('click', () => {
//             navMenu.classList.toggle('active');
//             hamburger.classList.toggle('active');
//         });

//         // Close mobile menu when clicking on a link
//         navLinks.forEach(link => {
//             link.addEventListener('click', () => {
//                 navMenu.classList.remove('active');
//                 hamburger.classList.remove('active');
//             });
//         });

//         // Close mobile menu when clicking outside
//         document.addEventListener('click', (e) => {
//             if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
//                 navMenu.classList.remove('active');
//                 hamburger.classList.remove('active');
//             }
//         });

//         // Close mobile menu on Escape key
//         document.addEventListener('keydown', (e) => {
//             if (e.key === 'Escape') {
//                 navMenu.classList.remove('active');
//                 hamburger.classList.remove('active');
//             }
//         });
//     }

//     // Navbar scroll effect
//     let lastScroll = 0;
//     let scrollTicking = false;

//     window.addEventListener('scroll', () => {
//         if (!scrollTicking) {
//             window.requestAnimationFrame(() => {
//                 const currentScroll = window.pageYOffset;
                
//                 if (navbar) {
//                     if (currentScroll > 50) {
//                         navbar.classList.add('scrolled');
//                     } else {
//                         navbar.classList.remove('scrolled');
//                     }
//                 }
                
//                 lastScroll = currentScroll;
//                 scrollTicking = false;
//             });
//             scrollTicking = true;
//         }
//     });

//     // Handle window resize events
//     let resizeTimer;
//     window.addEventListener('resize', () => {
//         clearTimeout(resizeTimer);
//         resizeTimer = setTimeout(() => {
//             // Close mobile menu on resize to desktop
//             if (window.innerWidth > 968 && navMenu && hamburger) {
//                 navMenu.classList.remove('active');
//                 hamburger.classList.remove('active');
//             }
//         }, 250);
//     });
// }

// // Initialize navbar on page load
// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', loadNavbar);
// } else {
//     loadNavbar();
// }