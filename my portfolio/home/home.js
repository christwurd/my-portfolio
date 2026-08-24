// STEP 1: Open and close the navigation menu on small screens.
const navToggle = document.querySelector(".nav-toggle");
const homeNav = document.querySelector(".home-nav");

navToggle?.addEventListener("click", () => {
    const isOpen = homeNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

// STEP 2: Move through project slides and keep the dots in sync.
const slides = [...document.querySelectorAll(".hero-slide")];
const dots = [...document.querySelectorAll(".slider-dots button")];
let activeSlide = 0;

function showSlide(index) {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === activeSlide));
    dots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeSlide;
        dot.classList.toggle("active", isActive);
        dot.setAttribute("aria-current", String(isActive));
    });
}

dots.forEach((dot, index) => dot.addEventListener("click", () => showSlide(index)));

if (slides.length > 1) {
    setInterval(() => showSlide(activeSlide + 1), 5000);
}

const revealElements = document.querySelectorAll(".scroll-reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

const scrollProgress = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (scrollTop / documentHeight) * 100;

    scrollProgress.style.width = `${progress}%`;
});