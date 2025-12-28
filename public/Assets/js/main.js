// Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.main-navbar');
            const mobileNavabr = document.querySelector('.mobile-toggle');
            const contactNavbar = document.querySelector('.contact-navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
                mobileNavabr.classList.add('scrolled');
                contactNavbar.style.background = 'var(--dark-gray)';
            } else {
                navbar.classList.remove('scrolled');
                mobileNavabr.classList.add('scrolled');
                contactNavbar.style.background = 'transparent';
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

        // Number counter animation
        // ===== RUBYLAND ADVANCED NUMBER ANIMATOR =====

function formatNumber(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return num.toLocaleString();
    return num;
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"));
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 2000; // 2 seconds
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;

    const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const current = Math.floor(target * progress);

        el.textContent = prefix + formatNumber(current) + suffix;

        if (frame === totalFrames) {
            el.textContent = prefix + formatNumber(target) + suffix;
            clearInterval(counter);
        }
    }, 1000 / frameRate);
}

// Run counters when section becomes visible
function observeCounters() {
    const counters = document.querySelectorAll(".metric-number");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // run once
            }
        });
    }, { threshold: 0.6 });

    counters.forEach(counter => observer.observe(counter));
}

document.addEventListener("DOMContentLoaded", observeCounters);

        /* === RUBYLAND VERTICAL PROCESS ANIMATOR === */

const vSteps = document.querySelectorAll(".process-step");

function activateVerticalSteps() {
    const triggerPoint = window.innerHeight * 0.55;

    vSteps.forEach((step, i) => {
        const rect = step.getBoundingClientRect();

        // ACTIVE (currently on screen)
        if (rect.top < triggerPoint && rect.bottom > triggerPoint) {
            step.classList.add("active");
        } else {
            step.classList.remove("active");
        }

        // COMPLETED (above screen center)
        if (rect.bottom < triggerPoint) {
            step.classList.add("completed");
        }

        // NOT COMPLETED (below screen center)
        if (rect.top > triggerPoint) {
            step.classList.remove("completed");
        }
    });
}

window.addEventListener("scroll", activateVerticalSteps);
window.addEventListener("load", activateVerticalSteps);
window.addEventListener("resize", activateVerticalSteps);



        // Property filtering
        const filterTags = document.querySelectorAll('.filter-tag');
        const listingCards = document.querySelectorAll('.listing-card');

        filterTags.forEach(tag => {
            tag.addEventListener('click', function() {
                // Remove active class from all tags
                filterTags.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tag
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                listingCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Investment calculator functionality
        function updateSliderValue(slider, display) {
            slider.addEventListener('input', function() {
                if (this.id === 'investment-amount') {
                    display.textContent = 'KSh ' + parseInt(this.value).toLocaleString();
                } else if (this.id === 'property-price') {
                    display.textContent = 'KSh ' + parseInt(this.value).toLocaleString();
                } else if (this.id === 'plot-size') {
                    display.textContent = this.value + ' Acre' + (this.value > 1 ? 's' : '');
                } else if (this.id === 'building-size') {
                    display.textContent = parseInt(this.value).toLocaleString() + ' Sq Ft';
                } else if (this.id === 'construction-quality') {
                    const qualities = ['Economy', 'Standard', 'Premium'];
                    display.textContent = qualities[this.value - 1];
                } else {
                    display.textContent = this.value + (this.id === 'down-payment' || this.id === 'interest-rate' ? '%' : ' Years');
                }
                
                // Update results
                updateCalculatorResults();
            });
        }

        // Initialize all sliders
        const sliders = document.querySelectorAll('.slider');
        sliders.forEach(slider => {
            const display = slider.nextElementSibling;
            updateSliderValue(slider, display);
        });

        function updateCalculatorResults() {
            // ROI Calculator
            const investmentAmount = parseInt(document.getElementById('investment-amount').value);
            const investmentPeriod = parseInt(document.getElementById('investment-period').value);
            const estimatedROI = Math.round(investmentAmount * (1 + 0.1 * investmentPeriod));
            document.querySelectorAll('.result-value')[0].textContent = 'KSh ' + estimatedROI.toLocaleString();
            
            // Mortgage Calculator
            const propertyPrice = parseInt(document.getElementById('property-price').value);
            const downPayment = parseInt(document.getElementById('down-payment').value);
            const interestRate = parseInt(document.getElementById('interest-rate').value);
            const loanAmount = propertyPrice * (1 - downPayment/100);
            const monthlyInterest = interestRate / 100 / 12;
            const loanTerm = 20 * 12; // 20 years
            const monthlyPayment = Math.round(loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, loanTerm) / (Math.pow(1 + monthlyInterest, loanTerm) - 1));
            document.querySelectorAll('.result-value')[1].textContent = 'KSh ' + monthlyPayment.toLocaleString();
            
            // Construction Estimator
            const plotSize = parseFloat(document.getElementById('plot-size').value);
            const buildingSize = parseInt(document.getElementById('building-size').value);
            const constructionQuality = parseInt(document.getElementById('construction-quality').value);
            const qualityMultiplier = [8000, 12000, 18000][constructionQuality - 1];
            const estimatedCost = Math.round(buildingSize * qualityMultiplier);
            document.querySelectorAll('.result-value')[2].textContent = 'KSh ' + estimatedCost.toLocaleString();
        }

        // Initialize calculator results
        updateCalculatorResults();

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

        // Analytics events
        document.querySelectorAll('a[href], button').forEach(element => {
            element.addEventListener('click', function() {
                const action = this.textContent.trim() || this.getAttribute('aria-label') || 'unknown';
                
                // Push to dataLayer for GTM
                if (window.dataLayer) {
                    window.dataLayer.push({
                        'event': 'cta_click',
                        'cta_text': action,
                        'cta_location': this.closest('section') ? this.closest('section').className : 'unknown'
                    });
                }
                
                // Track downloads
                if (this.hasAttribute('download')) {
                    if (window.dataLayer) {
                        window.dataLayer.push({
                            'event': 'download_click',
                            'file_name': this.getAttribute('download'),
                            'file_type': 'pdf'
                        });
                    }
                }
                
                // Track listing views
                if (this.classList.contains('listing-btn')) {
                    const listingTitle = this.closest('.listing-card').querySelector('h3').textContent;
                    if (window.dataLayer) {
                        window.dataLayer.push({
                            'event': 'listing_view',
                            'listing_title': listingTitle
                        });
                    }
                }
                
                // Track booking
                if (this.id === 'cta-book' || this.textContent.includes('Book')) {
                    if (window.dataLayer) {
                        window.dataLayer.push({
                            'event': 'book_visit',
                            'booking_type': 'site_visit'
                        });
                    }
                }
            });
        });

        // Reduced motion preference
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (reducedMotion.matches) {
            // Disable animations
            document.documentElement.style.setProperty('--transition', 'none');
            clearInterval(testimonialInterval);
        }

        // Image Slider Functionality
        document.addEventListener('DOMContentLoaded', function() {
            const sliderTrack = document.getElementById('propertySlider');
            const slides = document.querySelectorAll('.slider-slide');
            const prevBtn = document.querySelector('.property-prev-slide');
            const nextBtn = document.querySelector('.property-next-slide');
            
            let currentSlide = 0;
            const slideCount = slides.length;
            
            function updateSlider() {
                sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            }
            
            nextBtn.addEventListener('click', function() {
                currentSlide = (currentSlide + 1) % slideCount;
                updateSlider();
            });
            
            prevBtn.addEventListener('click', function() {
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                updateSlider();
            });
            
            // Auto slide every 5 seconds
            setInterval(function() {
                currentSlide = (currentSlide + 1) % slideCount;
                updateSlider();
            }, 5000);
            
            // Scroll Animations
            function isElementInViewport(el) {
                const rect = el.getBoundingClientRect();
                return (
                    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
                    rect.bottom >= 0
                );
            }
            
            function handleScrollAnimation() {
                document.querySelectorAll('.animate-on-scroll').forEach(el => {
                    if (isElementInViewport(el)) {
                        el.classList.add('animated');
                    }
                });
            }
            
            // Initial check
            handleScrollAnimation();
            
            // Listen for scroll
            window.addEventListener('scroll', handleScrollAnimation);
            
            // Animate stats on load
            setTimeout(() => {
                document.querySelectorAll('.hero-stat-item').forEach((stat, index) => {
                    setTimeout(() => {
                        stat.classList.add('animated');
                    }, index * 200);
                });
            }, 500);
            
            // Hover card animations
            document.querySelectorAll('.hover-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-15px)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
            
            // Feature card icon animations
            document.querySelectorAll('.feature-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    const icon = this.querySelector('.feature-icon');
                    icon.style.transform = 'rotate(360deg) scale(1.1)';
                });
                
                card.addEventListener('mouseleave', function() {
                    const icon = this.querySelector('.feature-icon');
                    icon.style.transform = 'rotate(0) scale(1)';
                });
            });
        });