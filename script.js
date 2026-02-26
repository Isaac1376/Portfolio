document.addEventListener('DOMContentLoaded', () => {
    // Restore theme from localStorage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Cache DOM elements
    const navbar = document.getElementById('navbar');
    const navLink = document.getElementById('navLink');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuButton = document.querySelector('[aria-label="Open menu"]');
    const contactForm = document.getElementById('contactForm');
    const heroBg = document.querySelector('.hero-parallax');
    const scrollProgressInner = document.querySelector('.scroll-progress-inner');

    // Predefined class lists so we don't recreate arrays on every frame
    const scrollClasses = ['bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm'];
    const darkClasses = ['dark:bg-darkTheme', 'dark:shadow-white/20'];
    const navLinkRemoveClasses = ['bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/30', 'dark:bg-transparent'];

    function openMenu() {
        mobileMenu.style.transform = 'translateX(-16rem)';
        if (menuButton) menuButton.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        mobileMenu.style.transform = 'translateX(0)';
        if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
    }

    function toggleTheme() {
        document.documentElement.classList.toggle('dark');
        localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }

    // Expose functions globally for onclick handlers
    window.openMenu = openMenu;
    window.closeMenu = closeMenu;
    window.toggleTheme = toggleTheme;

    // Form submit handler (prevent default until backend is configured)
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Form action would go here (e.g., Formspree, Netlify Forms, or custom API)
        });
    }

    // ========== SCROLL-DRIVEN EFFECTS (single requestAnimationFrame loop) ==========

    let lastScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let scrollRafId = null;

    function runScrollEffects() {
        const prevScrollY = lastScrollY;
        const scrollY = currentScrollY;
        const scrollingDown = scrollY > prevScrollY;

        // 1) Navbar styling based on scroll position
        if (scrollY > 50) {
            navbar.classList.add(...scrollClasses, ...darkClasses);
            navLink.classList.remove(...navLinkRemoveClasses);
        } else {
            navbar.classList.remove(...scrollClasses, ...darkClasses);
            navLink.classList.add(...navLinkRemoveClasses);
        }

        // 2) Hero parallax background
        if (heroBg) {
            const rate = scrollY * 0.15;
            heroBg.style.transform = `translateY(calc(-80% + ${rate}px))`;
        }

        // 3) Navbar hide on scroll down, show on scroll up
        if (scrollY > 100) {
            if (scrollingDown) {
                navbar.classList.add('navbar-hidden');
            } else {
                navbar.classList.remove('navbar-hidden');
            }
        } else {
            navbar.classList.remove('navbar-hidden');
        }

        // 4) Scroll progress bar
        if (scrollProgressInner) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? Math.min(1, scrollY / docHeight) : 0;
            scrollProgressInner.style.transform = `scaleX(${progress})`;
        }

        lastScrollY = scrollY;
        scrollRafId = null;
    }

    function onScroll() {
        currentScrollY = window.scrollY;
        if (scrollRafId === null) {
            scrollRafId = requestAnimationFrame(runScrollEffects);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on load so initial state matches scroll position
    runScrollEffects();

    // ========== JAVASCRIPT ANIMATIONS ==========

    // 1. Typing effect for hero headline
    const heroText = document.getElementById('heroTyping');
    if (heroText) {
        const fullText = heroText.dataset.text || heroText.textContent;
        heroText.textContent = '';
        heroText.classList.add('typing-cursor');

        let i = 0;
        function typeChar() {
            if (i < fullText.length) {
                heroText.textContent += fullText.charAt(i);
                i++;
                setTimeout(typeChar, 80);
            } else {
                heroText.classList.remove('typing-cursor');
            }
        }
        setTimeout(typeChar, 600);
    }

    // 3. Scroll-triggered reveal (Intersection Observer)
    const revealElements = document.querySelectorAll('.js-reveal, .js-reveal-scale');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Stagger children animation (for lists/cards)
    const staggerContainers = document.querySelectorAll('.js-stagger');
    staggerContainers.forEach(container => {
        const children = container.querySelectorAll('.js-stagger-child');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    children.forEach((child, i) => {
                        setTimeout(() => child.classList.add('is-visible'), i * 80);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(container);
    });

    // 5. Magnetic / hover scale effect on CTA buttons (enhanced)
    document.querySelectorAll('.js-magnetic').forEach(btn => {
        const maxOffset = 18;

        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const offsetX = e.clientX - (rect.left + rect.width / 2);
            const offsetY = e.clientY - (rect.top + rect.height / 2);

            const x = (offsetX / rect.width) * maxOffset;
            const y = (offsetY / rect.height) * maxOffset;

            const distance = Math.min(1, Math.hypot(offsetX, offsetY) / (rect.width / 2));
            const scale = 1.02 + distance * 0.04;

            btn.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'transform 0.15s ease-out, box-shadow 0.2s ease-out';
            btn.style.boxShadow = '0 14px 35px rgba(0,0,0,0.35)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0) scale(1)';
            btn.style.boxShadow = '';
        });
    });

    // 6. Portfolio card tilt on hover
    document.querySelectorAll('.js-tilt').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const tiltX = (y - 0.5) * 8;
            const tiltY = (x - 0.5) * -8;
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});