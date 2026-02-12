/* ============================================
   DUPA HORA - Gemage Rekso Joyo
   Main JavaScript - Versi Foto Produk Real
   ============================================ */

(function () {
    'use strict';

    /* ============================================
       1. DOM READY & INITIALIZATION
       ============================================ */
    document.addEventListener('DOMContentLoaded', function () {
        initNavbarScroll();
        initMobileNav();
        initActiveLink();
        initSmoothScroll();
        initScrollAnimations();
        initFloatingWhatsApp();
        initScrollToTop();
        initFooterYear();
        initAromaStagger();
        initProductCardEffects();
        initLazyLoadMap();
        initImageFallback();

        console.log('🪔 Dupa Hora website loaded successfully.');
    });


    /* ============================================
       2. NAVBAR SCROLL EFFECT
       ============================================ */
    function initNavbarScroll() {
        var navbar = document.getElementById('navbar');
        if (!navbar) return;

        var scrollThreshold = 80;
        var ticking = false;

        function updateNavbar() {
            if (window.scrollY > scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }, { passive: true });

        updateNavbar();
    }


    /* ============================================
       3. MOBILE NAVIGATION TOGGLE
       ============================================ */
    function initMobileNav() {
        var navToggle = document.getElementById('navToggle');
        var navMenu = document.getElementById('navMenu');
        if (!navToggle || !navMenu) return;

        var overlay = document.createElement('div');
        overlay.className = 'navbar__overlay';
        overlay.id = 'navOverlay';
        document.body.appendChild(overlay);

        function openMenu() {
            navMenu.classList.add('open');
            navToggle.classList.add('active');
            navToggle.setAttribute('aria-expanded', 'true');
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            navMenu.classList.remove('open');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
        }

        function toggleMenu() {
            navMenu.classList.contains('open') ? closeMenu() : openMenu();
        }

        navToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleMenu();
        });

        overlay.addEventListener('click', closeMenu);

        var navLinks = navMenu.querySelectorAll('.navbar__link');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                setTimeout(closeMenu, 150);
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                closeMenu();
            }
        });

        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                if (window.innerWidth >= 992 && navMenu.classList.contains('open')) {
                    closeMenu();
                }
            }, 250);
        });
    }


    /* ============================================
       4. ACTIVE LINK HIGHLIGHT ON SCROLL
       ============================================ */
    function initActiveLink() {
        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('.navbar__link');
        if (sections.length === 0 || navLinks.length === 0) return;

        var ticking = false;

        function updateActiveLink() {
            var scrollPosition = window.scrollY + 180;
            var currentSection = '';

            sections.forEach(function (section) {
                var sectionTop = section.offsetTop;
                var sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                currentSection = sections[sections.length - 1].getAttribute('id');
            }

            navLinks.forEach(function (link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + currentSection) {
                    link.classList.add('active');
                }
            });

            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(updateActiveLink);
                ticking = true;
            }
        }, { passive: true });

        updateActiveLink();
    }


    /* ============================================
       5. SMOOTH SCROLL FOR ANCHOR LINKS
       ============================================ */
    function initSmoothScroll() {
        var anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;

                var targetElement = document.querySelector(targetId);
                if (!targetElement) return;

                e.preventDefault();

                var navbarHeight = document.getElementById('navbar')
                    ? document.getElementById('navbar').offsetHeight
                    : 70;

                var targetPosition = targetElement.getBoundingClientRect().top
                    + window.pageYOffset
                    - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            });
        });
    }


    /* ============================================
       6. SCROLL ANIMATIONS (Intersection Observer)
       ============================================ */
    function initScrollAnimations() {
        var animatedElements = document.querySelectorAll('[data-animate]');
        if (animatedElements.length === 0) return;

        if (!('IntersectionObserver' in window)) {
            animatedElements.forEach(function (el) {
                el.classList.add('animated');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var delay = entry.target.getAttribute('data-delay');
                    if (delay) {
                        setTimeout(function () {
                            entry.target.classList.add('animated');
                        }, parseInt(delay, 10));
                    } else {
                        entry.target.classList.add('animated');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.15
        });

        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    }


    /* ============================================
       7. FLOATING WHATSAPP BUTTON
       ============================================ */
    function initFloatingWhatsApp() {
        var floatingWa = document.getElementById('floatingWa');
        if (!floatingWa) return;

        var ticking = false;

        function updateWaVisibility() {
            if (window.scrollY > 400) {
                floatingWa.classList.add('visible');
            } else {
                floatingWa.classList.remove('visible');
            }
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(updateWaVisibility);
                ticking = true;
            }
        }, { passive: true });

        updateWaVisibility();
    }


    /* ============================================
       8. SCROLL TO TOP BUTTON
       ============================================ */
    function initScrollToTop() {
        var scrollTopBtn = document.getElementById('scrollTop');
        if (!scrollTopBtn) return;

        var ticking = false;

        function updateVisibility() {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(updateVisibility);
                ticking = true;
            }
        }, { passive: true });

        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        updateVisibility();
    }


    /* ============================================
       9. FOOTER YEAR AUTO-UPDATE
       ============================================ */
    function initFooterYear() {
        var yearElement = document.getElementById('footerYear');
        if (!yearElement) return;
        yearElement.textContent = new Date().getFullYear();
    }


    /* ============================================
       10. AROMA CARD STAGGER ANIMATION
       ============================================ */
    function initAromaStagger() {
        var aromaGrid = document.querySelector('.aroma__grid');
        if (!aromaGrid) return;

        var aromaItems = aromaGrid.querySelectorAll('.aroma__item');
        if (aromaItems.length === 0) return;

        if (!('IntersectionObserver' in window)) {
            aromaItems.forEach(function (item) {
                item.style.opacity = '1';
                item.style.transform = 'none';
            });
            return;
        }

        aromaItems.forEach(function (item, index) {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px) scale(0.95)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.transitionDelay = (index * 60) + 'ms';
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    aromaItems.forEach(function (item) {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.1
        });

        observer.observe(aromaGrid);
    }


    /* ============================================
       11. PRODUCT CARD HOVER EFFECTS
       ============================================ */
    function initProductCardEffects() {
        var cards = document.querySelectorAll('.product-card');
        if (cards.length === 0) return;

        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        cards.forEach(function (card) {
            var maxTilt = 3;

            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var mouseX = e.clientX - (rect.left + rect.width / 2);
                var mouseY = e.clientY - (rect.top + rect.height / 2);

                var rotateX = Math.max(-maxTilt, Math.min(maxTilt, (mouseY / (rect.height / 2)) * -maxTilt));
                var rotateY = Math.max(-maxTilt, Math.min(maxTilt, (mouseX / (rect.width / 2)) * maxTilt));

                card.style.transform =
                    'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)';
            });

            card.addEventListener('mouseleave', function () {
                card.style.transform = '';
                card.style.transition = 'transform 0.5s ease';
                setTimeout(function () {
                    card.style.transition = '';
                }, 500);
            });
        });
    }


    /* ============================================
       12. LAZY LOAD GOOGLE MAPS
       ============================================ */
    function initLazyLoadMap() {
        var mapWrapper = document.querySelector('.contact__map-wrapper');
        if (!mapWrapper) return;

        var iframe = mapWrapper.querySelector('iframe');
        if (!iframe) return;

        var originalSrc = iframe.getAttribute('src');

        if (!('IntersectionObserver' in window)) return;

        iframe.setAttribute('data-src', originalSrc);
        iframe.removeAttribute('src');

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var lazySrc = iframe.getAttribute('data-src');
                    if (lazySrc) {
                        iframe.setAttribute('src', lazySrc);
                        iframe.removeAttribute('data-src');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '200px 0px',
            threshold: 0
        });

        observer.observe(mapWrapper);
    }


    /* ============================================
       13. IMAGE FALLBACK & ERROR HANDLING
       ============================================
       Jika gambar gagal dimuat, tampilkan placeholder
       bergaya agar website tetap rapi.
    */
    function initImageFallback() {
        var allImages = document.querySelectorAll('img');

        allImages.forEach(function (img) {
            img.addEventListener('error', function () {
                var parent = this.parentElement;
                var alt = this.getAttribute('alt') || 'Gambar';
                var width = this.getAttribute('width') || 300;
                var height = this.getAttribute('height') || 300;

                // Buat fallback placeholder
                var fallback = document.createElement('div');
                fallback.className = 'img-fallback';
                fallback.setAttribute('role', 'img');
                fallback.setAttribute('aria-label', alt);
                fallback.style.cssText = [
                    'width: 100%',
                    'aspect-ratio: ' + width + ' / ' + height,
                    'max-height: 400px',
                    'background: linear-gradient(135deg, #F5ECD7 0%, #F8F1E8 100%)',
                    'border-radius: 12px',
                    'display: flex',
                    'flex-direction: column',
                    'align-items: center',
                    'justify-content: center',
                    'gap: 8px',
                    'color: #9A8A7A',
                    'font-family: Poppins, sans-serif',
                    'font-size: 0.82rem',
                    'text-align: center',
                    'padding: 20px',
                    'border: 2px dashed rgba(201, 168, 76, 0.25)'
                ].join('; ');

                // Icon placeholder
                var icon = document.createElement('span');
                icon.style.fontSize = '2.5rem';
                icon.textContent = '🪔';

                // Text
                var text = document.createElement('span');
                text.textContent = alt;
                text.style.maxWidth = '200px';
                text.style.lineHeight = '1.4';

                fallback.appendChild(icon);
                fallback.appendChild(text);

                // Ganti img dengan fallback
                this.style.display = 'none';
                parent.insertBefore(fallback, this.nextSibling);
            });
        });
    }

})();