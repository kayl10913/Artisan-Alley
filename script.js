/* ============================================
   Artisan Alley - JavaScript
   Interactive features and animations
   ============================================ */

// ===== Page Load Transition =====
window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
    
    // Add loaded class to page content
    const pageContent = document.querySelector('.page-content');
    if (pageContent) {
        pageContent.classList.add('loaded');
    }
    
    // Trigger section animations
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ===== Page Navigation Transitions =====
document.addEventListener('DOMContentLoaded', function() {
    // Add transition to all internal links
    const internalLinks = document.querySelectorAll('a[href^="index.html"], a[href^="about.html"], a[href^="shop.html"], a[href^="artisans.html"], a[href^="events.html"], a[href^="contact.html"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply transition if it's a different page
            if (href && !href.includes('#')) {
                // Add fade out effect
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease-out';
                
                // Small delay for smooth transition
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
});

// ===== Mobile Navigation Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== Shop Page - Category Filter =====
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (categoryButtons.length > 0 && productCards.length > 0) {
        // Initialize: ensure all cards are visible on load
        productCards.forEach(card => {
            card.classList.remove('hidden');
            card.style.opacity = '';
            card.style.transition = '';
            // Ensure parent column is visible
            const parentCol = card.closest('.col-md-6, .col-lg-4');
            if (parentCol) {
                parentCol.style.display = '';
            }
        });
        
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                let visibleCount = 0;
                
                // Filter products with smooth animation
                productCards.forEach((card, index) => {
                    const cardCategory = card.getAttribute('data-category');
                    const parentCol = card.closest('.col-md-6, .col-lg-4');
                    let shouldShow = false;
                    
                    if (category === 'all') {
                        shouldShow = true;
                    } else {
                        shouldShow = cardCategory === category;
                    }
                    
                    if (shouldShow) {
                        // Show card - remove hidden class first
                        card.classList.remove('hidden');
                        // Show parent column
                        if (parentCol) {
                            parentCol.style.display = '';
                        }
                        // Reset all inline styles
                        card.style.opacity = '';
                        card.style.transform = '';
                        card.style.transition = '';
                        card.style.height = '';
                        card.style.margin = '';
                        card.style.padding = '';
                        card.style.visibility = '';
                        // Fade in animation
                        requestAnimationFrame(() => {
                            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(10px)';
                            requestAnimationFrame(() => {
                                setTimeout(() => {
                                    card.style.opacity = '1';
                                    card.style.transform = 'translateY(0)';
                                }, visibleCount * 30); // Stagger animation based on visible count
                            });
                        });
                        visibleCount++;
                    } else {
                        // Hide card with fade out
                        card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(-10px)';
                        setTimeout(() => {
                            card.classList.add('hidden');
                            // Hide parent column to fix grid alignment
                            if (parentCol) {
                                parentCol.style.display = 'none';
                            }
                            // Reset styles after hiding
                            card.style.opacity = '';
                            card.style.transform = '';
                            card.style.transition = '';
                        }, 200);
                    }
                });
            });
        });
    }
});

// ===== Newsletter Form Submission =====
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('#newsletterForm');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // Show success message
                showNotification('Thank you for subscribing! We\'ll be in touch soon.', 'success');
                emailInput.value = '';
            }
        });
    });
});

// ===== Auto-resize Textarea =====
document.addEventListener('DOMContentLoaded', function() {
    const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        // Set initial height
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        
        // Auto-resize on input
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
        
        // Reset height on form reset
        const form = textarea.closest('form');
        if (form) {
            form.addEventListener('reset', function() {
                setTimeout(() => {
                    textarea.style.height = 'auto';
                    textarea.style.height = textarea.scrollHeight + 'px';
                }, 0);
            });
        }
    });
});

// ===== Contact Form Submission =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                // Show success message
                showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset textarea height after form reset
                const messageTextarea = document.getElementById('message');
                if (messageTextarea) {
                    setTimeout(() => {
                        messageTextarea.style.height = 'auto';
                        messageTextarea.style.height = messageTextarea.scrollHeight + 'px';
                    }, 0);
                }
            }
        });
    }
});

// ===== Notification System =====
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#6B7E5A' : '#8B6F47'};
        color: #FAF8F3;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(92, 74, 55, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        font-family: 'Crimson Text', serif;
    `;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.artisan-card, .feature-card, .product-card, .mission-card, .value-item, .event-card, .artisan-profile-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// ===== Button Click Animations =====
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            // Add ripple animation if not already added
            if (!document.querySelector('#ripple-styles')) {
                const style = document.createElement('style');
                style.id = 'ripple-styles';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(2);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Make button position relative if not already
            if (getComputedStyle(this).position === 'static') {
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
            }
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.addEventListener('DOMContentLoaded', function() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    });
}

// ===== Form Validation Enhancement =====
document.addEventListener('DOMContentLoaded', function() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.style.borderColor = '#d32f2f';
                showFieldError(this, 'Please enter a valid email address');
            } else {
                this.style.borderColor = '';
                removeFieldError(this);
            }
        });
    });
});

function showFieldError(input, message) {
    removeFieldError(input);
    
    const error = document.createElement('span');
    error.className = 'field-error';
    error.textContent = message;
    error.style.cssText = `
        display: block;
        color: #d32f2f;
        font-size: 0.85rem;
        margin-top: 0.25rem;
    `;
    
    input.parentNode.appendChild(error);
}

function removeFieldError(input) {
    const error = input.parentNode.querySelector('.field-error');
    if (error) {
        error.remove();
    }
}

// ===== Back to Top Button (Optional Enhancement) =====
// Uncomment to add a back-to-top button
/*
let backToTopButton = null;

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        if (!backToTopButton) {
            backToTopButton = document.createElement('button');
            backToTopButton.innerHTML = '↑';
            backToTopButton.className = 'back-to-top';
            backToTopButton.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: #6B7E5A;
                color: #FAF8F3;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                box-shadow: 0 4px 16px rgba(92, 74, 55, 0.3);
                z-index: 1000;
                transition: all 0.3s ease;
            `;
            backToTopButton.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            document.body.appendChild(backToTopButton);
        }
        backToTopButton.style.opacity = '1';
        backToTopButton.style.pointerEvents = 'auto';
    } else if (backToTopButton) {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.pointerEvents = 'none';
    }
});
*/

// ===== Console Welcome Message =====
console.log('%c Welcome to Artisan Alley! ', 'background: #6B7E5A; color: #FAF8F3; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Handcrafted with love in Artisan Alley ', 'color: #8B6F47; font-size: 12px; font-style: italic;');

