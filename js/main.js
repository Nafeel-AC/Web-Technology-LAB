/**
 * Main JavaScript file for CodeCollab website
 * Contains shared functionality for all pages including:
 * - Sticky navbar with animations
 * - Smooth transitions and animations
 * - Interactive menu toggle
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sticky Navbar Implementation
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    let lastScrollTop = 0;
    
    // Add sticky-top class to navbar
    if (!navbar.classList.contains('sticky-top')) {
        navbar.classList.add('sticky-top');
    }
    
    // Function to handle navbar appearance on scroll
    function handleNavbarOnScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add box shadow and animation when scrolled
        if (scrollTop > 10) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Hide/show navbar based on scroll direction (for mobile experience)
        if (window.innerWidth < 992) { // Only on mobile/tablet
            if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
                // Scrolling down, hide navbar
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up, show navbar
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.transform = 'translateY(0)'; // Always show on desktop
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleNavbarOnScroll);
    
    // Enhanced Menu Toggle Animation
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler) {
        // Add animation class to navbar toggler
        navbarToggler.classList.add('navbar-toggler-animation');
        
        // Add click event listener for custom animation
        navbarToggler.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Add animation to menu items when opening
            if (navbarCollapse.classList.contains('collapsing') || 
                !navbarCollapse.classList.contains('show')) {
                setTimeout(() => {
                    const navItems = document.querySelectorAll('.navbar-nav .nav-item');
                    navItems.forEach((item, index) => {
                        item.style.animation = `navItemFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                        item.style.opacity = '1';
                    });
                }, 100);
            }
        });
        
        // Reset animations when menu is closed
        navbarCollapse.addEventListener('hidden.bs.collapse', function() {
            const navItems = document.querySelectorAll('.navbar-nav .nav-item');
            navItems.forEach(item => {
                item.style.animation = '';
                item.style.opacity = '';
            });
        });
    }
    
    // Add active class to current page nav link
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Check if the current path includes the link path or if it's the home page
        if (currentLocation.includes(linkPath) && linkPath !== './index.html' && linkPath !== '../index.html') {
            link.classList.add('active');
        } else if ((currentLocation === '/' || currentLocation.endsWith('index.html')) && 
                  (linkPath === './index.html' || linkPath === '../index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Add hover animation to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('btn-pulse');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('btn-pulse');
        });
    });
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(function(element) {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                const animationType = element.dataset.animation || 'fade-in';
                element.classList.add(animationType);
                element.classList.add('animated');
            }
        });
    };
    
    // Add animate-on-scroll class to elements that should animate
    document.querySelectorAll('.card, .feature-card, .testimonial, .accordion-item, section > .container > .row, .hero .row').forEach(element => {
        if (!element.classList.contains('animate-on-scroll')) {
            element.classList.add('animate-on-scroll');
            
            // Assign random animation type if not specified
            if (!element.dataset.animation) {
                const animations = ['fade-in', 'slide-up', 'slide-right', 'slide-left', 'zoom-in'];
                const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
                element.dataset.animation = randomAnimation;
            }
        }
    });
    
    // Run animation check on scroll and on page load
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});
