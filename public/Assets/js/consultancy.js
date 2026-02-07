// consultancy.js
function showToast(message, type = "success", duration = 7000) {
  const container = document.querySelector(".form-status");
  if (!container) return;

  // Enforce max 4 toasts
  const existingToasts = container.querySelectorAll(".toast");
  if (existingToasts.length >= 4) {
    existingToasts[0].remove(); // FIFO
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  // Auto dismiss
  setTimeout(() => {
    toast.style.animation = "toast-out 0.25s ease forwards";
    setTimeout(() => toast.remove(), 250);
  }, duration);
}


function formatVerboseDate(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  const month = date.toLocaleDateString('en-US', { month: 'long' });
  const year = date.getFullYear();

  // Ordinal suffix logic (enterprise-grade, no hacks)
  const suffix =
    day % 10 === 1 && day !== 11 ? 'st' :
    day % 10 === 2 && day !== 12 ? 'nd' :
    day % 10 === 3 && day !== 13 ? 'rd' :
    'th';

  return `${day}${suffix} ${weekday} ${month} ${year}`;
}


document.addEventListener('DOMContentLoaded', function() {
    const consultationForm = document.getElementById('consultationForm');
    const formStatus = document.getElementById('formStatus');
    const submitText = document.getElementById('submitText');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Function to toggle "Other" topic input
    window.toggleOtherTopic = function(selectElement) {
        const otherTopicContainer = document.getElementById('otherTopicContainer');
        const otherTopicInput = document.getElementById('otherTopic');
        
        if (selectElement.value === 'Other') {
            otherTopicContainer.style.display = 'block';
            otherTopicInput.required = true;
        } else {
            otherTopicContainer.style.display = 'none';
            otherTopicInput.required = false;
            otherTopicInput.value = '';
        }
    };


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

    const statsSection = document.querySelector('.why-consult');
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
    if (consultationForm) {
        consultationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate date selection
            const consultationDate = document.getElementById('consultationDate').value;
            if (!consultationDate) {
                showToast("Please select a consultation date using the date picker.", "error");
                return;
            }

            // Show loading state
            submitText.style.display = 'none';
            loadingSpinner.style.display = 'inline';
            
            // Get form data
            const formData = new FormData(consultationForm);
            const data = Object.fromEntries(formData.entries());
            
            // Handle "Other" topic
            if (data.topic === 'Other') {
                data.topic = `Other: ${data.otherTopic}`;
            }
            
            // Format date for display
            const dateObj = new Date(data.consultationDate);
            const formattedDate = formatVerboseDate(data["Consultation-Date"]);;

            try {
                
                // Send to EmailJS
                await emailjs.send(
                    'service_x3xv3aw', // Replace with your EmailJS service ID
                    'template_a3nciap', // Replace with your EmailJS template ID or create a new one
                    {
                        name: `${data.firstName} ${data.lastName}`,
                        email: data.email,
                        phone: data.phone,
                        branch: data.branch,
                        consultation_date: formattedDate,
                        topic: data.topic,
                        comments: data.comments || 'None provided',
                    }
                );
                
                // Send to StaticForms as backup
                const staticFormsData = new FormData(consultationForm);
                staticFormsData.append('apiKey', 'sf_b5f3nb2jei5f2bkf9iahll13'); // Replace with your StaticForms key
                staticFormsData.append('subject', 'New Consultation Booking');
                staticFormsData.append('accessKey', 'consultation-booking'); // Custom identifier
                
                await fetch('https://api.staticforms.dev/submit', {
                    method: 'POST',
                    body: staticFormsData
                });
                
                // Show success message
                showToast(`Thank you, ${data.firstName}! Your consultation has been booked for ${formattedDate}. We'll send confirmation details to ${data.email} within 2 hours.`, 'success');
                
                // Reset form
                consultationForm.reset();
                document.getElementById('cally1').innerHTML = '<i class="fas fa-calendar-alt"></i> Select Date';
                
            } catch (error) {
                // Show error message
                showToast ("Sorry, there was an error booking your consultation. Please try again or call us directly at +254 700 000 000.", "error");
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

    // Initialize date picker
    function initializeDatePicker() {
        const datePicker = document.querySelector('calendar-date');
        if (datePicker) {
            // Set minimum date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            datePicker.min = tomorrow.toISOString().split('T')[0];
            
            // Set maximum date to 3 months from now
            const maxDate = new Date();
            maxDate.setMonth(maxDate.getMonth() + 3);
            datePicker.max = maxDate.toISOString().split('T')[0];
            
            // Disable weekends
            datePicker.addEventListener('select', function(e) {
                const selectedDate = new Date(e.detail);
                const day = selectedDate.getDay();
                
                // 0 = Sunday, 6 = Saturday
                if (day === 0 || day === 6) {
                    showToast("Weekend dates are not available for consultations. Please select a weekday or contact support.", "error");
                    datePicker.value = '';
                    document.getElementById('cally1').innerHTML = '<i class="fas fa-calendar-alt"></i> Select Date';
                    document.getElementById('consultationDate').value = '';
                    
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                }
            });
        }
    }

    // Wait for Cally component to load
    setTimeout(initializeDatePicker, 100000);

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



// active.js
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('cally1');
  const popover = document.getElementById('cally-popover1');
  const hiddenInput = document.getElementById('consultationDate');
  const calendar = popover.querySelector('calendar-date');

  if (!calendar) return;

  // Open / close calendar
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    popover.classList.toggle('active');
  });

  // Capture selected date
  calendar.addEventListener('change', () => {
    const date = calendar.value;
    if (!date) return;

    const selected = new Date(date);
    const day = selected.getDay();

    // Block weekends
    if (day === 0 || day === 6) {
      hiddenInput.value = '';
      button.innerHTML = '<i class="fas fa-calendar-alt"></i> Select Date';
      popover.classList.remove('active');
      showToast("Weekend dates are not available for consultations. Please select a weekday or contact support.", "error");
                    formStatus.style.display = 'block';
      calendar.value = '';

      
      return;
    }

  


    // ✅ Single source of truth
    const formattedDate = formatVerboseDate(date);

 // Internal value stays ISO (backend-friendly)
 hiddenInput.value = date;
 button.innerHTML = `<i class="fas fa-calendar-alt"></i> ${formattedDate}`;
 popover.classList.remove('active');
  });

  calendar.addEventListener('change', () => {
  const date = calendar.value;
  if (!date) return;

  const selected = new Date(date);
  const today = new Date();

  // Normalize both to midnight (enterprise-safe)
  selected.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const day = selected.getDay();

  // ❌ Block today & past dates
  if (selected <= today) {
    hiddenInput.value = '';
    button.innerHTML = '<i class="fas fa-calendar-alt"></i> Select Date';
    popover.classList.remove('active');

    showToast(
      "You cannot book a consultation for today or a past date. Please select a future weekday.",
      "error"
    );
    return;
  }

  // ✅ Valid date (future weekday)
  const formattedDate = formatVerboseDate(date);

  hiddenInput.value = date; // ISO for backend
  button.innerHTML = `<i class="fas fa-calendar-alt"></i> ${formattedDate}`;
  popover.classList.remove('active');
 });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!popover.contains(e.target) && !button.contains(e.target)) {
      popover.classList.remove('active');
    }
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      popover.classList.remove('active');
    }
  });
});



function observeTodayCircle() {
  const calendarDate = document.querySelector('calendar-date');
  if (!calendarDate || !calendarDate.shadowRoot) return;

  const dateRoot = calendarDate.shadowRoot;
  const calendarMonth = dateRoot.querySelector('calendar-month');
  if (!calendarMonth || !calendarMonth.shadowRoot) return;

  const monthRoot = calendarMonth.shadowRoot;

  const apply = () => {
    const todayBtn = monthRoot.querySelector('button[aria-current="date"]');
    if (todayBtn) {
      todayBtn.style.border = '2px solid red';
      todayBtn.style.borderRadius = '50%';
      todayBtn.style.boxSizing = 'border-box';
      todayBtn.style.fontWeight = '800';
    }
  };

  apply();

  new MutationObserver(apply).observe(monthRoot, {
    childList: true,
    subtree: true
  });
}

// Delay slightly to allow first render
setTimeout(observeTodayCircle, 0);


