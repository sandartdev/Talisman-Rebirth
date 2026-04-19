// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============ CAROUSEL CLASSES ============

class ClassCarousel {
    constructor(carouselId) {
        this.carousel = document.getElementById(carouselId);
        if (!this.carousel) return;
        
        this.items = this.carousel.querySelectorAll('.carousel-item');
        this.indicators = this.carousel.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000;
        
        this.init();
    }

    init() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        this.showSlide(0);
        this.startAutoPlay();
        
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    showSlide(index) {
        if (index < 0) index = this.items.length - 1;
        if (index >= this.items.length) index = 0;
        
        this.items.forEach(item => item.classList.remove('active'));
        this.indicators.forEach(ind => ind.classList.remove('active'));
        
        this.items[index].classList.add('active');
        this.indicators[index].classList.add('active');
        
        this.currentIndex = index;
    }

    next() {
        this.showSlide(this.currentIndex + 1);
    }

    prev() {
        this.showSlide(this.currentIndex - 1);
    }

    goToSlide(index) {
        this.showSlide(index);
        this.stopAutoPlay();
        this.startAutoPlay();
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// Inicializar quando DOM está pronto
document.addEventListener('DOMContentLoaded', () => {
    new ClassCarousel('classCarousel');
    console.log('🎪 Carousel de Classes ativo!');
});

console.log('🎮 Talisman Rebirth carregado com sucesso!');
