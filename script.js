document.addEventListener("DOMContentLoaded", () => {
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
