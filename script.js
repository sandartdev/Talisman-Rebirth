let currentIndex = 0;

function moveCarousel(direction) {
    const carousel = document.getElementById('classCarousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    
    currentIndex += direction;
    
    if (currentIndex >= items.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = items.length - 1;
    }
    
    showSlide(currentIndex);
}

function currentSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
}

function showSlide(index) {
    const carousel = document.getElementById('classCarousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    
    items.forEach((item, i) => {
        item.classList.remove('active');
        if (i === index) {
            item.classList.add('active');
        }
    });
    
    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

// Auto-play carousel
setInterval(() => {
    moveCarousel(1);
}, 5000);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
