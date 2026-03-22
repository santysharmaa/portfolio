document.addEventListener("DOMContentLoaded", () => {
    // ---- Hamburger Menu ----
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function openMenu() {
        hamburger.classList.add('open');
        navLinks.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) closeMenu();
        else openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Smooth scroll offset for fixed navbar
    document.querySelectorAll('.nav-links a, .logo, .btn-pill').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Scrollspy for Navbar
    const sections = document.querySelectorAll("section");
    const navLinksList = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - sectionHeight / 3) {
                const id = section.getAttribute("id");
                if (id) {
                    current = id;
                }
            }
        });

        navLinksList.forEach((link) => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if (href && current && href.includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // Intersection Observer for smooth sliding reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });

    // Add reveal class dynamically to sections
    document.querySelectorAll('section:not(.hero) .section-container, .marquee-band').forEach(sec => {
        sec.classList.add('reveal');
        observer.observe(sec);
    });
});
