// contact.js
// Form submission with EmailJS and StaticForms
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitText = document.getElementById('submitText');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Animate stats
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const suffix = stat.getAttribute('data-suffix') || '';
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + suffix;
            }, 20);
        });
    }

    // Trigger stats animation when section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.why-contact');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // FAQ toggle functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('show');
            });
            
            // Toggle current FAQ
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('show');
            }
        });
    });

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            submitText.style.display = 'none';
            loadingSpinner.style.display = 'inline';
            
            // Prepare data for EmailJS
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                // Send to EmailJS
                await emailjs.send(
                    'service_x3xv3aw', // Replace with your EmailJS service ID
                    'template_11h5jra', // Replace with your EmailJS template ID
                    {
                        name: `${data.firstName} ${data.lastName}`,
                        topic: data.topic,
                        message: data.message,
                        contact_method: data.contactMethod,
                        email: data.email
                    }
                );
                
                // Send to StaticForms as backup
                const formData = new FormData(contactForm);
formData.append('apiKey', 'sf_b5f3nb2jei5f2bkf9iahll13');
formData.append('subject', 'New Contact Form Submission');

await fetch('https://api.staticforms.dev/submit', {
  method: 'POST',
  body: formData
});
                
                // Show success message
                formStatus.textContent = 'Thank you! Your message has been sent successfully. We\'ll respond within 2 hours.';
                formStatus.className = 'form-status success';
                formStatus.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
            } catch (error) {
                // Show error message
                formStatus.textContent = 'Sorry, there was an error sending your message. Please try again or call us directly.';
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';
                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                submitText.style.display = 'inline';
                loadingSpinner.style.display = 'none';
                
                // Hide status message after 10 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 10000);
            }
        });
    }

    // Duplicate testimonials for seamless scroll
    const testimonialsTrack = document.querySelector('.testimonials-track');
    if (testimonialsTrack) {
        const originalItems = testimonialsTrack.innerHTML;
        testimonialsTrack.innerHTML = originalItems + originalItems;
    }
});

// Pause testimonials on hover
document.querySelector('.testimonials-track')?.addEventListener('mouseenter', function() {
    this.style.animationPlayState = 'paused';
});

document.querySelector('.testimonials-track')?.addEventListener('mouseleave', function() {
    this.style.animationPlayState = 'running';
});