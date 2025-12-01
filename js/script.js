/**
 * 大和鋼業株式会社 - Corporate Website Scripts
 * Enhanced Animation Version
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page loader first
    initPageLoader();

    // Initialize all modules
    initScrollProgress();
    initHeroSlider();
    initHeader();
    initMobileNav();
    initBackToTop();
    initScrollAnimations();
    initSmoothScroll();
    initParallax();
    initTiltEffect();
    initCounterAnimation();
    initParticles();
    initMagneticButtons();
    initTextReveal();
    initImageReveal();
    initCursorEffect();

    // New 2025 trend animations
    initMouseLight();
    initRippleEffect();
    initMorphingShapes();
    initSplitTextAnimation();
    initBlurInAnimation();
    initStaggerGrid();
    initShimmerEffect();
    initHorizontalScroll();
    initSmoothScrollLenis();
});

/**
 * Scroll Progress Bar
 */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', throttle(function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }, 10));
}

/**
 * Hero Slider with Enhanced Animations
 */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');

    if (slides.length === 0) return;

    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 6000;

    function showSlide(index) {
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            // Reset animations
            const content = slide.querySelector('.hero-content');
            if (content) {
                content.querySelectorAll('.hero-catch, .hero-title, .hero-desc').forEach(el => {
                    el.style.animation = 'none';
                    el.offsetHeight; // Trigger reflow
                    el.style.animation = '';
                });
            }
        });
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');

        currentSlide = index;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });

    startAutoSlide();

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
    }
}

/**
 * Header Scroll Effect with Animation
 */
function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const currentScroll = window.pageYOffset;

                if (currentScroll > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                // Hide/Show header on scroll
                if (currentScroll > lastScroll && currentScroll > 200) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }

                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Mobile Navigation
 */
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;

    if (!hamburger) return;

    const mobileNavOverlay = document.createElement('div');
    mobileNavOverlay.className = 'mobile-nav-overlay';

    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';

    const navList = document.querySelector('.nav-list');
    if (navList) {
        const mobileNavList = document.createElement('ul');
        mobileNavList.className = 'mobile-nav-list';

        navList.querySelectorAll('.nav-item').forEach(item => {
            const li = document.createElement('li');
            const link = item.querySelector('a');
            const dropdown = item.querySelector('.dropdown');

            if (link) {
                const a = document.createElement('a');
                a.href = link.getAttribute('href');
                a.textContent = link.textContent;
                li.appendChild(a);

                if (dropdown) {
                    const mobileDropdown = document.createElement('ul');
                    mobileDropdown.className = 'mobile-dropdown';

                    dropdown.querySelectorAll('a').forEach(dropLink => {
                        const dropLi = document.createElement('li');
                        const dropA = document.createElement('a');
                        dropA.href = dropLink.getAttribute('href');
                        dropA.textContent = dropLink.textContent;
                        dropLi.appendChild(dropA);
                        mobileDropdown.appendChild(dropLi);
                    });

                    li.appendChild(mobileDropdown);

                    a.addEventListener('click', function(e) {
                        e.preventDefault();
                        mobileDropdown.classList.toggle('active');
                    });
                }
            }

            mobileNavList.appendChild(li);
        });

        mobileNav.appendChild(mobileNavList);
    }

    body.appendChild(mobileNavOverlay);
    body.appendChild(mobileNav);

    function toggleMobileNav() {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileNav() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMobileNav);
    mobileNavOverlay.addEventListener('click', closeMobileNav);

    mobileNav.querySelectorAll('a:not(.mobile-dropdown ~ a)').forEach(link => {
        if (!link.nextElementSibling || !link.nextElementSibling.classList.contains('mobile-dropdown')) {
            link.addEventListener('click', closeMobileNav);
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileNav();
        }
    });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', throttle(function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, 100));

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Enhanced Scroll Animations
 */
function initScrollAnimations() {
    // Different animation types for different elements
    const animationConfig = [
        { selector: '.policy-content', class: 'slide-in-left' },
        { selector: '.policy-image', class: 'slide-in-right image-reveal' },
        { selector: '.section-header', class: 'fade-in' },
        { selector: '.strength-card', class: 'scale-in', stagger: true },
        { selector: '.product-card', class: 'fade-in', stagger: true },
        { selector: '.company-info', class: 'slide-in-left' },
        { selector: '.company-image', class: 'slide-in-right image-reveal' },
        { selector: '.sustainability-content', class: 'fade-in' },
        { selector: '.sustainability-card', class: 'scale-in', stagger: true },
        { selector: '.news-section', class: 'slide-in-left' },
        { selector: '.ir-section', class: 'slide-in-right' },
        { selector: '.recruit-content', class: 'slide-in-left' },
        { selector: '.recruit-image', class: 'slide-in-right image-reveal' },
        { selector: '.section-header-sm', class: 'fade-in' },
        { selector: '.news-item', class: 'fade-in', stagger: true },
    ];

    animationConfig.forEach(config => {
        const elements = document.querySelectorAll(config.selector);
        elements.forEach((el, index) => {
            el.classList.add(config.class);
            if (config.stagger) {
                el.classList.add(`stagger-${Math.min(index + 1, 5)}`);
            }
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '50px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger child animations
                const children = entry.target.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .rotate-in, .image-reveal');

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Function to check and show elements in viewport
    function checkVisibility() {
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
            if (isInViewport) {
                el.classList.add('visible');
            }
        });
    }

    // Wait for page loader to be removed, then trigger visibility
    function waitForLoaderRemoval() {
        const loader = document.querySelector('.page-loader');
        if (!loader || loader.classList.contains('loaded')) {
            // Loader is gone or has loaded class, trigger visibility
            setTimeout(checkVisibility, 100);
        } else {
            // Check again in 100ms
            setTimeout(waitForLoaderRemoval, 100);
        }
    }

    // Start checking after a short delay
    setTimeout(waitForLoaderRemoval, 500);

    // Also check on scroll to handle elements that come into view
    window.addEventListener('scroll', throttle(checkVisibility, 100), { passive: true });

    // Fallback: Force show policy section after 3 seconds if still hidden
    setTimeout(() => {
        const policyContent = document.querySelector('.policy-content');
        const policyImage = document.querySelector('.policy-image');
        if (policyContent && !policyContent.classList.contains('visible')) {
            policyContent.classList.add('visible');
        }
        if (policyImage && !policyImage.classList.contains('visible')) {
            policyImage.classList.add('visible');
        }
    }, 3000);
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Parallax Effect
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-bg, .policy-image img, .company-image img, .recruit-image img');

    if (parallaxElements.length === 0) return;

    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const scrollTop = window.pageYOffset;

                parallaxElements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    const elementTop = rect.top + scrollTop;
                    const elementVisible = elementTop - window.innerHeight;

                    if (scrollTop > elementVisible && scrollTop < elementTop + rect.height) {
                        const speed = 0.3;
                        const yPos = (scrollTop - elementTop) * speed;
                        el.style.transform = `translateY(${yPos}px)`;
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Tilt Effect for Cards
 */
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.strength-card, .product-card, .sustainability-card');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        el.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/**
 * Counter Animation
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');

    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

/**
 * Particles Effect in Hero
 */
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.width = (Math.random() * 10 + 5) + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particlesContainer.appendChild(particle);
    }
}

/**
 * Magnetic Button Effect
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-light, .contact-btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/**
 * Text Reveal Animation
 */
function initTextReveal() {
    const titles = document.querySelectorAll('.policy-title, .section-title');

    titles.forEach(title => {
        const text = title.innerHTML;
        title.innerHTML = '';
        title.classList.add('text-reveal');

        const span = document.createElement('span');
        span.innerHTML = text;
        title.appendChild(span);
    });
}

/**
 * Image Reveal Animation
 */
function initImageReveal() {
    const images = document.querySelectorAll('.policy-image, .company-image, .recruit-image');

    images.forEach(img => {
        if (!img.classList.contains('image-reveal')) {
            img.classList.add('image-reveal');
        }
    });
}

/**
 * Custom Cursor Effect
 */
function initCursorEffect() {
    // Only on desktop
    if (window.innerWidth < 992) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.15s ease, width 0.2s ease, height 0.2s ease, background 0.2s ease;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 5px;
        height: 5px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursorDot);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .product-card, .strength-card, .sustainability-card');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.background = 'rgba(26, 54, 93, 0.1)';
        });

        el.addEventListener('mouseleave', function() {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.background = 'transparent';
        });
    });
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

/**
 * Utility: Request Animation Frame Polyfill
 */
(function() {
    let lastTime = 0;
    const vendors = ['webkit', 'moz'];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            const currTime = new Date().getTime();
            const timeToCall = Math.max(0, 16 - (currTime - lastTime));
            const id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());

/**
 * Page Loader Animation (2025 Trend)
 */
function initPageLoader() {
    // Create loader element
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-logo">Cross株式会社</div>
        <div class="loader-bar"></div>
        <div class="loader-percentage">0%</div>
    `;
    document.body.prepend(loader);

    const percentage = loader.querySelector('.loader-percentage');
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        percentage.textContent = Math.floor(progress) + '%';

        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 100);

    // Remove loader after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('loaded');
            setTimeout(() => {
                loader.remove();
            }, 600);
        }, 500);
    });
}

/**
 * Mouse Follow Light Effect
 */
function initMouseLight() {
    if (window.innerWidth < 992) return;

    const light = document.createElement('div');
    light.className = 'mouse-light';
    document.body.appendChild(light);

    let mouseX = 0, mouseY = 0;
    let lightX = 0, lightY = 0;
    const speed = 0.1;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        light.classList.add('visible');
    });

    document.addEventListener('mouseleave', function() {
        light.classList.remove('visible');
    });

    function animate() {
        lightX += (mouseX - lightX) * speed;
        lightY += (mouseY - lightY) * speed;
        light.style.left = lightX + 'px';
        light.style.top = lightY + 'px';
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * Advanced Ripple Effect
 */
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-light, .contact-btn');

    buttons.forEach(btn => {
        btn.classList.add('ripple-effect');

        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            this.style.setProperty('--ripple-x', x + '%');
            this.style.setProperty('--ripple-y', y + '%');

            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 600);
        });
    });
}

/**
 * Morphing Shapes in Hero
 */
function initMorphingShapes() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create multiple morphing shapes
    for (let i = 0; i < 3; i++) {
        const shape = document.createElement('div');
        shape.className = 'morph-shape';
        shape.style.top = (Math.random() * 80 + 10) + '%';
        shape.style.left = (Math.random() * 80 + 10) + '%';
        shape.style.animationDelay = (i * 2.5) + 's';
        shape.style.opacity = 0.3 - (i * 0.1);
        shape.style.width = (250 + i * 50) + 'px';
        shape.style.height = (250 + i * 50) + 'px';
        hero.appendChild(shape);
    }
}

/**
 * Split Text Animation
 */
function initSplitTextAnimation() {
    const titles = document.querySelectorAll('.hero-title');

    titles.forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';
        title.classList.add('split-text');

        // Split by characters (handle Japanese and line breaks)
        const lines = text.split(/\r?\n|<br>/);
        lines.forEach((line, lineIndex) => {
            [...line].forEach((char, charIndex) => {
                const span = document.createElement('span');
                span.className = 'char';
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.transitionDelay = ((lineIndex * 5 + charIndex) * 0.03) + 's';
                title.appendChild(span);
            });
            if (lineIndex < lines.length - 1) {
                title.appendChild(document.createElement('br'));
            }
        });
    });

    // Trigger animation when hero is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.split-text').forEach(el => observer.observe(el));
}

/**
 * Blur In Animation
 */
function initBlurInAnimation() {
    const elements = document.querySelectorAll('.hero-catch, .hero-desc');

    elements.forEach(el => {
        el.classList.add('blur-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    elements.forEach(el => observer.observe(el));
}

/**
 * Stagger Grid Animation
 */
function initStaggerGrid() {
    const grids = document.querySelectorAll('.strengths-grid, .products-grid, .sustainability-cards');

    grids.forEach(grid => {
        grid.classList.add('stagger-grid');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    grids.forEach(grid => observer.observe(grid));
}

/**
 * Shimmer Effect on Images
 */
function initShimmerEffect() {
    const images = document.querySelectorAll('.product-image, .policy-image, .company-image, .recruit-image');

    images.forEach(img => {
        img.classList.add('shimmer');
    });
}

/**
 * Horizontal Scroll for Product Cards on Mobile
 */
function initHorizontalScroll() {
    if (window.innerWidth > 768) return;

    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    productsGrid.style.overflowX = 'auto';
    productsGrid.style.scrollSnapType = 'x mandatory';
    productsGrid.style.webkitOverflowScrolling = 'touch';

    const cards = productsGrid.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.style.scrollSnapAlign = 'start';
        card.style.flexShrink = '0';
        card.style.minWidth = '280px';
    });
}

/**
 * Smooth Scroll Enhancement (Lenis-like effect)
 */
function initSmoothScrollLenis() {
    // Simple smooth scroll enhancement
    let scrollY = window.pageYOffset;
    let targetY = scrollY;
    let ease = 0.1;
    let isScrolling = false;

    // Only enable on desktop for performance
    if (window.innerWidth < 992) return;

    // Listen for scroll events
    window.addEventListener('scroll', function() {
        targetY = window.pageYOffset;
        if (!isScrolling) {
            isScrolling = true;
            smoothScroll();
        }
    }, { passive: true });

    function smoothScroll() {
        scrollY += (targetY - scrollY) * ease;

        // Apply to parallax elements
        document.querySelectorAll('.parallax').forEach(el => {
            el.style.transform = `translateY(${scrollY * 0.1}px)`;
        });

        if (Math.abs(targetY - scrollY) > 0.5) {
            requestAnimationFrame(smoothScroll);
        } else {
            isScrolling = false;
        }
    }
}

/**
 * Intersection Observer for multiple animation types
 */
function observeElements(selector, callback, options = {}) {
    const defaultOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                if (!options.repeat) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { ...defaultOptions, ...options });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
}

/**
 * Scroll-triggered Number Counter
 */
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.textContent = value.toLocaleString();
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);
}

/**
 * Enhanced Card 3D Hover Effect
 */
function init3DCardEffect() {
    const cards = document.querySelectorAll('.strength-card, .product-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            this.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(10px)
                scale(1.02)
            `;

            // Shine effect
            const shine = this.querySelector('.card-shine');
            if (shine) {
                shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3) 0%, transparent 80%)`;
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/**
 * Scroll Direction Detection
 */
function initScrollDirection() {
    let lastScrollTop = 0;
    let scrollDirection = 'down';

    window.addEventListener('scroll', throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            scrollDirection = 'down';
            document.body.classList.remove('scroll-up');
            document.body.classList.add('scroll-down');
        } else {
            scrollDirection = 'up';
            document.body.classList.remove('scroll-down');
            document.body.classList.add('scroll-up');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, 50));

    return () => scrollDirection;
}

/**
 * Lazy Load Images with Blur Effect
 */
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.filter = 'blur(20px)';
                img.style.transition = 'filter 0.5s ease';

                img.src = img.dataset.src;
                img.onload = () => {
                    img.style.filter = 'blur(0)';
                };

                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '100px' });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * Scroll to hash on page load
 */
function scrollToHash() {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
}

// Call scrollToHash after page load
window.addEventListener('load', scrollToHash);

/**
 * Performance: Use requestIdleCallback for non-critical tasks
 */
function runWhenIdle(callback) {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(callback);
    } else {
        setTimeout(callback, 1);
    }
}

/**
 * Visibility API: Pause animations when tab is not visible
 */
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.body.classList.add('page-hidden');
    } else {
        document.body.classList.remove('page-hidden');
    }
});
