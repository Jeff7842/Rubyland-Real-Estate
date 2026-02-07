class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <!-- Contact Navbar -->
    <div class="contact-navbar">
        <div class="container">
            <div class="contact-info">
                <div><i class="fas fa-phone"></i> +254 700 000 000</div>
                <div><i class="fas fa-envelope"></i> info@rubyland.co.ke</div>
            </div>
            <div class="social-icons">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </div>
        </div>
    </div>

    <!-- Main Navbar -->
    <nav class="main-navbar">
        <div class="container navbar-container">
            <a href="index.html" class="logo"><img src="https://ewuyalhslafkrlmrpyam.supabase.co/storage/v1/object/public/rubyland/logo%20ONLY.png" alt="">Ruby<span>land</span></a>
            <div class="mobile-toggle">
                <i class="fas fa-bars"></i>
            </div>
            <ul class="nav-links">
            <button class="mobile-close" aria-label="Close menu">
  <i class="fas fa-times"></i>
</button>

                <li><a href="index.html">Home</a></li>
                <li class="dropdown">
                    <a href="About Us.html" class="dropdown-toggle-title">About Us <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-content">
                        <a href="About Us.html#what-is-rubyland">Who We Are</a>
                        <a href="About Us.html#the-team">The Team</a>
                        <a href="About Us.html#our-story">Our Story</a>
                        <a href="About Us.html#branches">Branches</a>
                    </div>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle-title">Services <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-content services-dropdown">
                        <div class="service-item" onclick="window.location.href='Property managment.html'">
                            <div class="service-icon">
                                <i class="fas fa-home"></i>
                            </div>
                            <div class="service-info">
                                <h4>Property Management & Sales</h4>
                                <p>Informed property management outcomes</p>
                            </div>
                        </div>
                        <div class="service-item" onclick="window.location.href='Feasibility Study.html'">
                            <div class="service-icon">
                                <i class="ti ti-calculator"></i>
                            </div>
                            <div class="service-info">
                                <h4>Feasibility Study</h4>
                                <p>Feasibility grounded in data</p>
                            </div>
                        </div>
                        <div class="service-item" onclick="window.location.href='Due Diligence Services.html'">
                            <div class="service-icon">
                                <i class="fas fa-file-contract"></i>
                            </div>
                            <div class="service-info">
                                <h4>Due Diligence Services</h4>
                                <p>Is this property clean?</p>
                            </div>
                        </div>
                        <div class="service-item" onclick="window.location.href='Real Estate Valuations & Appraisal.html'">
                            <div class="service-icon">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="service-info">
                                <h4>Real Estate Valuations & Appraisal</h4>
                                <p>Professional property valuation services</p>
                            </div>
                        </div>
                        <div class="service-item" onclick="window.location.href='Consultancy Services.html'">
                            <div class="service-icon">
                                <i class="fas fa-handshake"></i>
                            </div>
                            <div class="service-info">
                                <h4>Consultancy Services</h4>
                                <p>Strategic guidance for decisionss</p>
                            </div>
                        </div>
                        <div class="service-item" onclick="window.location.href='Training Services.html'">
                            <div class="service-icon">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                            <div class="service-info">
                                <h4>Training Services</h4>
                                <p>Risk-aware real estate training</p>
                            </div>
                        </div>
                    </div>
                </li>
                <li><a href="News Hub.html">News Hub</a></li>
                <li class="dropdown">
                    <a class="dropdown-toggle-title" href="#">Resources <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-content">
                    <a href="#">Knowledge Center</a>
                        <a href="listing.html">Available Listings</a>
                    </div>
                </li>
                <li><a href="contact us.html">Contact Us</a></li>
            </ul>
        </div>
    </nav>
    `;
  }
}
customElements.define('header-component', HeaderComponent);

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

        document.querySelectorAll('.dropdown > a').forEach(link => {
  link.addEventListener('click', e => {
    if (window.innerWidth > 768) return;

    e.preventDefault();

    const currentDropdown = link.parentElement;
    const isOpen = currentDropdown.classList.contains('open');

    // Close ALL dropdowns first
    document.querySelectorAll('.dropdown.open').forEach(dropdown => {
      dropdown.classList.remove('open');
    });

    // If it was not open before, open it
    if (!isOpen) {
      currentDropdown.classList.add('open');
    }
  });
});
document.querySelectorAll('.nav-links > li > a:not(.dropdown > a)').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth > 768) return;

    // Close all open dropdowns
    document.querySelectorAll('.dropdown.open').forEach(d => {
      d.classList.remove('open');
    });
  });
});
const mobileClose = document.querySelector('.mobile-close');

if (mobileClose) {
  mobileClose.addEventListener('click', () => {
    navLinks.classList.remove('active');

    // Reset dropdown state
    document.querySelectorAll('.dropdown.open').forEach(d => {
      d.classList.remove('open');
    });
  });
}
/*document.querySelectorAll('.nav-links > li > a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth > 768) return;

    navLinks.classList.remove('active');
    document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
  });
});*/

document.addEventListener('click', function (e) {
  const navLinks = document.querySelector('.nav-links');
  const mobileToggle = document.querySelector('.mobile-toggle');

  if (!navLinks || !mobileToggle) return;

  const isClickInsideNav = navLinks.contains(e.target);
  const isClickOnToggle = mobileToggle.contains(e.target);

  // If click is outside nav + not on hamburger
  if (!isClickInsideNav && !isClickOnToggle) {
    // Close mobile menu
    navLinks.classList.remove('active');

    // Close all dropdowns
    document.querySelectorAll('.dropdown.open').forEach(dropdown => {
      dropdown.classList.remove('open');
    });
  }
});

document.querySelector('.nav-links').addEventListener('click', function (e) {
  if (window.innerWidth > 768) return;

  const openDropdown = document.querySelector('.dropdown.open');
  if (!openDropdown) return;

  const dropdownToggle = openDropdown.querySelector('.dropdown-toggle-title');
  const dropdownContent = openDropdown.querySelector('.dropdown-content');

  // If click is NOT on the dropdown toggle or its content → close dropdown
  if (
    !dropdownToggle.contains(e.target) &&
    !dropdownContent.contains(e.target)
  ) {
    openDropdown.classList.remove('open');
  }
});
