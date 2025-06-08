// Initialize AOS and Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100,
        delay: 0,
    });
    
    // Image loading handlers
    initializeImageLoading();
    
    // Gallery functionality
    initializeGallery();
    
    // Navigation functionality
    initializeNavigation();
    
    // Form handling
    initializeForm();
    
    // Service cards effects
    initializeServiceCards();
    
    // Technology features animation
    initializeTechFeatures();
    
    // Contact items hover effects
    initializeContactItems();
    
    console.log('Arya Industries website loaded successfully! 🌟');
});

// Image Loading Function
function initializeImageLoading() {
    const images = document.querySelectorAll('.car-image img');
    
    images.forEach(img => {
        const loadingElement = img.parentElement.querySelector('.image-loading');
        
        // Show loading state
        if (loadingElement) {
            loadingElement.style.display = 'block';
        }
        
        // Handle successful image load
        img.addEventListener('load', function() {
            this.classList.add('loaded');
            if (loadingElement) {
                loadingElement.style.opacity = '0';
                setTimeout(() => {
                    loadingElement.style.display = 'none';
                }, 300);
            }
            
            // Add fade-in effect
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
        
        // Handle image load error
        img.addEventListener('error', function() {
            console.log(`Failed to load image: ${this.src}`);
            const placeholder = this.parentElement.querySelector('.placeholder-car');
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
            if (loadingElement) {
                loadingElement.textContent = 'Image not found';
                loadingElement.style.color = 'var(--sage-green)';
            }
        });
        
        // Check if image is already cached
        if (img.complete && img.naturalHeight !== 0) {
            img.dispatchEvent(new Event('load'));
        }
    });
}

// Gallery Functionality
function initializeGallery() {
    const galleryScroll = document.getElementById('galleryScroll');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!galleryScroll || !prevBtn || !nextBtn) return;
    
    const scrollAmount = 370; // Item width + gap
    let autoScrollInterval;
    
    // Button controls
    nextBtn.addEventListener('click', () => {
        stopAutoScroll();
        galleryScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        startAutoScrollDelayed();
    });
    
    prevBtn.addEventListener('click', () => {
        stopAutoScroll();
        galleryScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        startAutoScrollDelayed();
    });
    
    // Auto-scroll functionality
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (galleryScroll.scrollLeft >= galleryScroll.scrollWidth - galleryScroll.clientWidth) {
                galleryScroll.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                galleryScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 4000);
    }
    
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }
    
    function startAutoScrollDelayed() {
        setTimeout(startAutoScroll, 2000);
    }
    
    // Pause auto-scroll on hover
    galleryScroll.addEventListener('mouseenter', stopAutoScroll);
    galleryScroll.addEventListener('mouseleave', startAutoScrollDelayed);
    
    // Touch/swipe support for mobile
    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;
    
    galleryScroll.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
        scrollLeft = galleryScroll.scrollLeft;
        stopAutoScroll();
    });
    
    galleryScroll.addEventListener('touchmove', (e) => {
        if (!startX) return;
        const x = e.touches[0].pageX;
        const walk = (x - startX) * 2;
        galleryScroll.scrollLeft = scrollLeft - walk;
    });
    
    galleryScroll.addEventListener('touchend', () => {
        startX = 0;
        startAutoScrollDelayed();
    });
    
    // Start auto-scroll when gallery comes into view
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAutoScroll();
            } else {
                stopAutoScroll();
            }
        });
    }, { threshold: 0.3 });
    
    galleryObserver.observe(galleryScroll);
    
    // Gallery item click effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
}

// Navigation Functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        updateActiveNavLink();
    });
    
    // Update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Form Handling
function initializeForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    const formInputs = contactForm.querySelectorAll('input, select, textarea');

    // Add focus animations to form inputs
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });

    // Form submission with animation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Button animation
        submitBtn.textContent = 'Sending...';
        submitBtn.style.transform = 'scale(0.95)';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = 'var(--moss-green)';
            
            // Reset form after success animation
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.transform = 'scale(1)';
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// Service Cards Effects
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });
    });
}

// Technology Features Animation
function initializeTechFeatures() {
    const techFeatures = document.querySelectorAll('.tech-feature');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'translateX(0)';
                    entry.target.style.opacity = '1';
                }, index * 200);
            }
        });
    }, observerOptions);

    techFeatures.forEach(feature => {
        feature.style.transform = 'translateX(-50px)';
        feature.style.opacity = '0';
        feature.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
        techObserver.observe(feature);
    });
    
    // Molecular animation enhancement
    const molecules = document.querySelectorAll('.molecule');
    molecules.forEach((molecule) => {
        molecule.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2)';
            this.style.boxShadow = '0 10px 30px rgba(205, 133, 63, 0.4)';
        });
        
        molecule.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Contact Items Hover Effects
function initializeContactItems() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotateY(5deg)';
            this.style.boxShadow = '0 15px 35px rgba(61, 112, 104, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
            this.style.boxShadow = 'none';
        });
    });
}

// Enhanced button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Performance optimization - Lazy loading intersection observer
const lazyImageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                lazyImageObserver.unobserve(img);
            }
        }
    });
});

// Observe images for lazy loading
document.querySelectorAll('img[data-src]').forEach(img => {
    lazyImageObserver.observe(img);
});