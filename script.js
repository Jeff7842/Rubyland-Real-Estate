// Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.main-navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Testimonial slider
        const testimonialTrack = document.querySelector('.testimonial-track');
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const prevArrow = document.querySelector('.prev-arrow');
        const nextArrow = document.querySelector('.next-arrow');
        
        let currentSlide = 0;
        const slideCount = testimonialSlides.length;
        
        function updateSlider() {
            testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        nextArrow.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        });
        
        prevArrow.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateSlider();
        });
        
        // Auto slide for testimonials
        let testimonialInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        }, 5000);
        
        // Pause auto slide on hover
        testimonialTrack.addEventListener('mouseenter', function() {
            clearInterval(testimonialInterval);
        });
        
        testimonialTrack.addEventListener('mouseleave', function() {
            testimonialInterval = setInterval(function() {
                currentSlide = (currentSlide + 1) % slideCount;
                updateSlider();
            }, 5000);
        });
        
        // Listings slider
        const listingsTrack = document.querySelector('.listings-track');
        const listingCards = document.querySelectorAll('.listing-card');
        const listingsPrev = document.querySelector('.listings-prev');
        const listingsNext = document.querySelector('.listings-next');
        
        let currentListing = 0;
        const cardsPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;
        const listingCount = listingCards.length;
        
        function updateListingsSlider() {
            const cardWidth = listingCards[0].offsetWidth + 30; // including gap
            listingsTrack.style.transform = `translateX(-${currentListing * cardWidth}px)`;
        }
        
        listingsNext.addEventListener('click', function() {
            if (currentListing < listingCount - cardsPerView) {
                currentListing++;
                updateListingsSlider();
            }
        });
        
        listingsPrev.addEventListener('click', function() {
            if (currentListing > 0) {
                currentListing--;
                updateListingsSlider();
            }
        });
        
        // Partners slider (automatic)
        const partnersTrack = document.querySelector('.partners-track');
        let partnerPosition = 0;
        
        function movePartners() {
            partnerPosition -= 1;
            if (partnerPosition < -600) {
                partnerPosition = 0;
            }
            partnersTrack.style.transform = `translateX(${partnerPosition}px)`;
            requestAnimationFrame(movePartners);
        }
        
        movePartners();
        
        // Touch swipe for testimonials on mobile
        let startX = 0;
        let endX = 0;
        
        testimonialTrack.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            clearInterval(testimonialInterval);
        });
        
        testimonialTrack.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (startX - endX > 50) {
                // Swipe left
                currentSlide = (currentSlide + 1) % slideCount;
                updateSlider();
            } else if (endX - startX > 50) {
                // Swipe right
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                updateSlider();
            }
        }