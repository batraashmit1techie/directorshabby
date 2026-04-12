document.addEventListener("DOMContentLoaded", () => {
    // Reveal Animations
    const revealItems = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                }
            });
        },
        { threshold: 0.1 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));


    // Header Scroll Effect
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Stats Counter Animation
    const counters = document.querySelectorAll("[data-counter]");
    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute("data-counter"));
                    animateCounter(entry.target, target);
                    counterObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));

    function animateCounter(el, target) {
        let current = 0;
        const duration = 2000;
        const step = (target / duration) * 10;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target + (target >= 1000 ? "M+" : "+");
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current) + (target >= 1000 ? "M+" : "+");
            }
        }, 10);
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
