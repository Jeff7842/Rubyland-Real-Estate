document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled-nav');
        } else {
            navbar.classList.remove('scrolled-nav');
        }
    });
    
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider .flex');
    const testimonialSlides = document.querySelectorAll('.testimonial-slider .w-full');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    let currentTestimonialSlide = 0;
    const testimonialSlideCount = testimonialSlides.length;
    
    function updateTestimonialSlider() {
        testimonialSlider.style.transform = `translateX(-${currentTestimonialSlide * 100}%)`;
    }
    
    testimonialNext.addEventListener('click', function() {
        currentTestimonialSlide = (currentTestimonialSlide + 1) % testimonialSlideCount;
        updateTestimonialSlider();
    });
    
    testimonialPrev.addEventListener('click', function() {
        currentTestimonialSlide = (currentTestimonialSlide - 1 + testimonialSlideCount) % testimonialSlideCount;
        updateTestimonialSlider();
    });
    
    // Auto-advance testimonials
    let testimonialInterval = setInterval(() => {
        if (!document.hidden) {
            currentTestimonialSlide = (currentTestimonialSlide + 1) % testimonialSlideCount;
            updateTestimonialSlider();
        }
    }, 5000);
    
    // Pause on hover
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            if (!document.hidden) {
                currentTestimonialSlide = (currentTestimonialSlide + 1) % testimonialSlideCount;
                updateTestimonialSlider();
            }
        }, 5000);
    });
    
    // Property Slider
    const propertySlider = document.querySelector('.property-slider .flex');
    const propertySlides = document.querySelectorAll('.property-slider .w-full');
    const propertyPrev = document.querySelector('.property-prev');
    const propertyNext = document.querySelector('.property-next');
    let currentPropertySlide = 0;
    const propertySlideCount = Math.ceil(propertySlides.length / 3);
    
    function updatePropertySlider() {
        propertySlider.style.transform = `translateX(-${currentPropertySlide * 100}%)`;
    }
    
    propertyNext.addEventListener('click', function() {
        currentPropertySlide = (currentPropertySlide + 1) % propertySlideCount;
        updatePropertySlider();
    });
    
    propertyPrev.addEventListener('click', function() {
        currentPropertySlide = (currentPropertySlide - 1 + propertySlideCount) % propertySlideCount;
        updatePropertySlider();
    });
    
    // Mobile menu toggle (placeholder - implement as needed)
    document.querySelector('.lg\\:hidden').addEventListener('click', function() {
        // Implement mobile menu toggle functionality here
        console.log('Mobile menu clicked');
    });
    
    // Touch events for mobile sliders
    let touchStartX = 0;
    let touchEndX = 0;
    
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }
    
    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Swipe left
            currentTestimonialSlide = (currentTestimonialSlide + 1) % testimonialSlideCount;
            updateTestimonialSlider();
        }
        
        if (touchEndX > touchStartX) {
            // Swipe right
            currentTestimonialSlide = (currentTestimonialSlide - 1 + testimonialSlideCount) % testimonialSlideCount;
            updateTestimonialSlider();
        }
    }
    
    testimonialSlider.addEventListener('touchstart', handleTouchStart, false);
    testimonialSlider.addEventListener('touchend', handleTouchEnd, false);
    
    // Disable auto-slide on mobile
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            clearInterval(testimonialInterval);
            testimonialPrev.style.display = 'none';
            testimonialNext.style.display = 'none';
        } else {
            testimonialPrev.style.display = 'block';
            testimonialNext.style.display = 'block';
            testimonialInterval = setInterval(() => {
                if (!document.hidden) {
                    currentTestimonialSlide = (currentTestimonialSlide + 1) % testimonialSlideCount;
                    updateTestimonialSlider();
                }
            }, 5000);
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-fade-in-up');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});