// Load Navbar Component
async function loadNavbar() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (!navbarPlaceholder) return;

    // Determine base URL based on current page location
    const path = window.location.pathname;
    const isProjectPage = path.includes('/projects/');
    const baseUrl = isProjectPage ? '../' : '';

    // Determine which page is active
    const currentPage = path.split('/').pop() || 'index.html';
    const homeActive = (currentPage === 'index.html' || currentPage === '') ? 'active' : '';
    const aboutActive = currentPage === 'about.html' ? 'active' : '';

    try {
        const response = await fetch(`${baseUrl}components/navbar.html`);
        let html = await response.text();
        
        // Replace placeholders
        html = html.replace(/\{\{baseUrl\}\}/g, baseUrl);
        html = html.replace(/\{\{homeActive\}\}/g, homeActive);
        html = html.replace(/\{\{aboutActive\}\}/g, aboutActive);
        
        navbarPlaceholder.innerHTML = html;
        
        // Initialize mobile menu after navbar is loaded
        initializeMobileMenu();
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Mobile Navigation Toggle
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Load navbar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
} else {
    loadNavbar();
}

// Mobile Navigation Toggle (fallback for pages without component loader)

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Set active navigation link based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    }
});

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);
