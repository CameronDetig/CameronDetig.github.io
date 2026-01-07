// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
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

// Handle Hugging Face iframe loading
const hfIframe = document.querySelector('.hf-iframe');
const hfLoading = document.getElementById('hf-loading');
const hfError = document.getElementById('hf-error');

if (hfIframe && hfLoading) {
    // Show iframe when it loads successfully
    hfIframe.addEventListener('load', () => {
        console.log('Hugging Face Space loaded successfully');
        hfLoading.style.display = 'none';
        hfIframe.style.display = 'block';
        hfError.style.display = 'none';
    });
    
    // Handle load errors
    hfIframe.addEventListener('error', () => {
        console.error('Failed to load Hugging Face Space');
        hfLoading.style.display = 'none';
        hfIframe.style.display = 'none';
        if (hfError) {
            hfError.style.display = 'block';
        }
    });
    
    // Show iframe after 3 seconds to allow HF to display its own loading state
    // This handles sleeping Spaces - HF will show a "Building" message
    setTimeout(() => {
        if (hfIframe.style.display === 'none') {
            hfIframe.style.display = 'block';
            hfLoading.style.display = 'none';
        }
    }, 3000);
    
    // Final timeout fallback - if iframe still hasn't loaded after 30 seconds
    // (Sleeping Spaces can take 20-30 seconds to wake up)
    setTimeout(() => {
        // Check if iframe is still hidden (didn't load)
        if (hfIframe.style.display === 'none' || hfIframe.style.display === '') {
            try {
                // Try to check if iframe has content
                const iframeDoc = hfIframe.contentDocument || hfIframe.contentWindow.document;
                // If we can't access it or it's blank, show error
                if (!iframeDoc || iframeDoc.location.href === 'about:blank') {
                    hfLoading.style.display = 'none';
                    hfIframe.style.display = 'none';
                    if (hfError) {
                        hfError.style.display = 'block';
                    }
                }
            } catch (e) {
                // CORS error is expected - iframe is trying to load from different origin
                // This actually means the iframe IS loading, so we're good
                console.log('Iframe is loading from HF (CORS detected, this is normal)');
            }
        }
    }, 30000);
}

