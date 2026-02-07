// Blog Data - Simulating Database Content
        const blogData = {
            mostPopular: [
                {
                    id: 1,
                    title: "2024 Kenyan Real Estate Market Outlook: Opportunities & Challenges",
                    excerpt: "Comprehensive analysis of the Kenyan property market trends, investment hotspots, and regulatory changes shaping the industry in 2024.",
                    category: "Market Trends",
                    author: "Charles Peter Mwangi",
                    date: "March 15, 2024",
                    views: 2845,
                    image: "https://ewuyalhslafkrlmrpyam.supabase.co/storage/v1/object/public/rubyland/ExpertConsultancy-2%20(1).jpg"
                },
                {
                    id: 2,
                    title: "New Land Laws 2024: What Every Property Investor Must Know",
                    excerpt: "Analysis of recent amendments to land registration laws and their implications for property transactions and title verification processes.",
                    category: "Legal",
                    author: "Jonathan Karoki",
                    date: "March 10, 2024",
                    views: 3127,
                    image: "https://ewuyalhslafkrlmrpyam.supabase.co/storage/v1/object/public/rubyland/PropertyDevelopmentPlanning%20(1).jpg"
                },
                {
                    id: 3,
                    title: "Top 5 Emerging Real Estate Markets in Kenya for 2024",
                    excerpt: "Identifying high-potential investment locations with infrastructure development and growth projections based on market data analysis.",
                    category: "Investment",
                    author: "Rosebell Mwaura",
                    date: "March 5, 2024",
                    views: 2543,
                    image: "https://ewuyalhslafkrlmrpyam.supabase.co/storage/v1/object/public/rubyland/RealEstateDueDiligence-1.jpg"
                },
                {
                    id: 4,
                    title: "Affordable Housing Project Update: Progress & Investment Opportunities",
                    excerpt: "Latest developments in government and private sector affordable housing initiatives across Kenya's major urban centers.",
                    category: "Housing",
                    author: "Grace W. Muiruri",
                    date: "February 28, 2024",
                    views: 1987,
                    image: "https://ewuyalhslafkrlmrpyam.supabase.co/storage/v1/object/public/rubyland/valuation-2.jpg"
                },
                {
                    id: 5,
                    title: "Commercial Property Market Analysis: Post-Pandemic Recovery Trends",
                    excerpt: "Examining office, retail, and industrial property performance with data-driven insights for investors and developers.",
                    category: "Market Trends",
                    author: "David Kinuthia",
                    date: "February 22, 2024",
                    views: 2345,
                    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80"
                }
            ],
            newestThisWeek: [
                {
                    id: 6,
                    title: "Digital Land Registries: Kenya's Progress & Remaining Challenges",
                    excerpt: "Evaluating the transition to digital land registration systems and the impact on property transaction efficiency and security.",
                    category: "Legal",
                    author: "Jonathan Karoki",
                    date: "March 18, 2024",
                    views: 1245,
                    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                },
                {
                    id: 7,
                    title: "Industrial Parks Development: Investment Opportunities in Special Economic Zones",
                    excerpt: "Analysis of government-led industrial park developments and the potential for manufacturing and logistics real estate investments.",
                    category: "Investment",
                    author: "Rosebell Mwaura",
                    date: "March 17, 2024",
                    views: 987,
                    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80"
                },
                {
                    id: 8,
                    title: "Real Estate Investment Trusts (REITs) Performance Review Q1 2024",
                    excerpt: "Quarterly analysis of Kenya's REIT market performance, dividend yields, and regulatory developments affecting listed property funds.",
                    category: "Investment",
                    author: "David Kinuthia",
                    date: "March 16, 2024",
                    views: 1532,
                    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80"
                },
                {
                    id: 9,
                    title: "Property Taxation Changes: Implications for Residential & Commercial Owners",
                    excerpt: "Detailed breakdown of recent property tax amendments and strategic planning for optimal tax efficiency.",
                    category: "Policy",
                    author: "Charles Peter Mwangi",
                    date: "March 15, 2024",
                    views: 1876,
                    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                },
                {
                    id: 10,
                    title: "Green Building Standards: Certification Requirements & Market Premiums",
                    excerpt: "Understanding Kenya's green building certification framework and the value premium for sustainable commercial properties.",
                    category: "Market Trends",
                    author: "Grace W. Muiruri",
                    date: "March 14, 2024",
                    views: 1123,
                    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2067&q=80"
                }
            ],
            allNews: [
                // This would be a much larger dataset in production
                // For demonstration, we'll use the combined data from above
            ]
        };

        // Combine all news for the "All News" section
        blogData.allNews = [...blogData.mostPopular, ...blogData.newestThisWeek];


      window.newsFilters = {
  from: null, // ISO string
  to: null    // ISO string
};


        // Generate News Card HTML
        function generateNewsCard(article) {
            return `
                <div class="news-card" data-category="${article.category.toLowerCase().replace(' ', '-')}" data-id="${article.id}">
                    <div class="news-image">
                        <img src="${article.image}" alt="${article.title}" loading="lazy">
                    </div>
                    <div class="news-content">
                    <div class="header-news-meta">
                        <span class="news-category">${article.category}</span>
                        <div class="news-views">
                                <i class="ti ti-eye"></i>
                                <span>${article.views.toLocaleString()}</span>
                            </div>
                            </div>
                        <h3 class="news-title">${article.title}</h3>
                        <p class="news-excerpt">${article.excerpt}</p>
                        <div class="news-meta">
                            <div class="meta-info">
                                <span>${article.author}</span> </div> <div class="meta-info meta-info-date"><span>${article.date}</span>
                            </div>
                            
                        </div>
                        <a href="#" class="btn btn-outline news-button" style="margin-top: auto;">Read More</a>
                    </div>
                </div>
            `;
        }

        // Populate News Sections
        function populateNewsSections() {
            // Most Popular
            const popularGrid = document.getElementById('popularNewsGrid');
            blogData.mostPopular.forEach(article => {
                popularGrid.innerHTML += generateNewsCard(article);
            });

            // Newest This Week
            const newestGrid = document.getElementById('newestNewsGrid');
            blogData.newestThisWeek.forEach(article => {
                newestGrid.innerHTML += generateNewsCard(article);
            });

            // All News
            const allGrid = document.getElementById('allNewsGrid');
            blogData.allNews.forEach(article => {
                allGrid.innerHTML += generateNewsCard(article);
            });

            // Update results counter
            document.getElementById('resultsCount').textContent = blogData.allNews.length;
            document.getElementById('totalCount').textContent = blogData.allNews.length;
        }

        // Hero Slider Functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slider-slide');
        const dots = document.querySelectorAll('.slider-dot');
        const track = document.getElementById('heroSlider');
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        let slideInterval;

        function updateSlider() {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
        }

        // Initialize slider
        function initSlider() {
            // Auto-slide every 10 seconds
            slideInterval = setInterval(nextSlide, 10000);
            
            // Manual navigation
            nextBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                nextSlide();
                slideInterval = setInterval(nextSlide, 10000);
            });
            
            prevBtn.addEventListener('click', () => {
                clearInterval(slideInterval);
                prevSlide();
                slideInterval = setInterval(nextSlide, 10000);
            });
            
            // Dot navigation
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    clearInterval(slideInterval);
                    goToSlide(index);
                    slideInterval = setInterval(nextSlide, 10000);
                });
            });
            
            // Pause on hover
            const slider = document.querySelector('.hero-slider');
            slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
            slider.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 10000));
        }

        // Filter News Functionality
        function filterNews() {
  const searchTerm = document.getElementById('newsSearch').value.toLowerCase();
  const activeFilter = document.querySelector('.filter-tag.active').dataset.filter;

  const fromDate = window.newsFilters.from
    ? new Date(window.newsFilters.from)
    : null;

  const toDate = window.newsFilters.to
    ? new Date(window.newsFilters.to)
    : null;

  const allCards = document.querySelectorAll('#allNewsGrid .news-card');
  let visibleCount = 0;

  allCards.forEach(card => {
    const title = card.querySelector('.news-title').textContent.toLowerCase();
    const excerpt = card.querySelector('.news-excerpt').textContent.toLowerCase();
    const category = card.dataset.category;

    const articleDateText =
      card.querySelector('.meta-info-date span').textContent;

    const articleDate = new Date(articleDateText);

    // --- SEARCH ---
    const matchesSearch =
      !searchTerm ||
      title.includes(searchTerm) ||
      excerpt.includes(searchTerm);

    // --- CATEGORY ---
    const matchesCategory =
      activeFilter === 'all' || category === activeFilter;

    // --- DATE RANGE ---
    let matchesDate = true;

    if (fromDate && articleDate < fromDate) matchesDate = false;
    if (toDate && articleDate > toDate) matchesDate = false;

    // --- FINAL DECISION ---
    if (matchesSearch && matchesCategory && matchesDate) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  document.getElementById('resultsCount').textContent = visibleCount;
}

        // Initialize Blog Page
        document.addEventListener('DOMContentLoaded', function() {
            // Populate news sections
            populateNewsSections();
            
            // Initialize hero slider
            initSlider();
            
            // Navbar scroll effect
            const navbar = document.querySelector('.blog-navbar');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
            
            // Filter tag functionality
            document.querySelectorAll('.filter-tag').forEach(tag => {
                tag.addEventListener('click', function() {
                    document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    filterNews();
                });
            });
            
            // Search functionality
            document.getElementById('searchBtn').addEventListener('click', filterNews);
            document.getElementById('newsSearch').addEventListener('keyup', function(e) {
                if (e.key === 'Enter') filterNews();
            });
            
            // Blog search button
            document.getElementById('blogSearchBtn').addEventListener('click', function() {
                document.getElementById('newsSearch').scrollIntoView({ behavior: 'smooth' });
                document.getElementById('newsSearch').focus();
            });
            
            // Cally calendar integration
            const dateFromBtn = document.getElementById('dateFromBtn');
            const dateToBtn = document.getElementById('dateToBtn');
            
            // Set default dates
            const today = new Date();
            const lastWeek = new Date(today);
            lastWeek.setDate(today.getDate() - 30);
            
            window.newsFilters.from = lastWeek.toISOString().split('T')[0];
window.newsFilters.to = today.toISOString().split('T')[0];

dateFromBtn.innerText = formatDate(lastWeek);
dateToBtn.innerText = formatDate(today);

updateResetVisibility();
filterNews();
            
        });

        


        // Helper function to format dates
        function formatDate(date) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        }

        document.addEventListener('DOMContentLoaded', () => {
  const fromBtn = document.getElementById('dateFromBtn');
  const toBtn   = document.getElementById('dateToBtn');

  const fromPopover = document.getElementById('cally-popover1');
  const toPopover   = document.getElementById('cally-popover2');

  const fromCalendar = fromPopover.querySelector('calendar-date');
  const toCalendar   = toPopover.querySelector('calendar-date');

  if (!fromBtn || !toBtn || !fromCalendar || !toCalendar) return;

  // --- helpers ---
  const closeAll = () => {
    fromPopover.classList.remove('active');
    toPopover.classList.remove('active');
  };

const updateResetVisibility = () => {
  const hasDate =
    window.newsFilters.from !== null ||
    window.newsFilters.to !== null;

  resetBtn.classList.toggle('visible', hasDate);
};

  // --- button clicks ---
  fromBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAll();
    fromPopover.classList.add('active');
  });

  toBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAll();
    toPopover.classList.add('active');
  });

  // --- date selection ---
  fromCalendar.addEventListener('change', () => {
  if (!fromCalendar.value) return;

  window.newsFilters.from = fromCalendar.value;
  fromBtn.innerText = formatDate(new Date(fromCalendar.value));

  closeAll();
  updateResetVisibility();
  filterNews();
});

toCalendar.addEventListener('change', () => {
  if (!toCalendar.value) return;

  window.newsFilters.to = toCalendar.value;
  toBtn.innerText = formatDate(new Date(toCalendar.value));

  closeAll();
  updateResetVisibility();
  filterNews();
});

const resetBtn = document.getElementById('resetDateFilter');

resetBtn.addEventListener('click', () => {
  // Clear internal filter state
  window.newsFilters.from = null;
  window.newsFilters.to = null;

  // Reset button text
  fromBtn.innerText = 'Select start date';
  toBtn.innerText = 'Select end date';

  // Close calendars if open
  closeAll();
  updateResetVisibility();

  // Re-run filter
  filterNews();
});





  // --- click outside closes calendars ---
  document.addEventListener('click', (e) => {
    if (
      !fromPopover.contains(e.target) &&
      !toPopover.contains(e.target) &&
      !fromBtn.contains(e.target) &&
      !toBtn.contains(e.target)
    ) {
      closeAll();
    }
  });

  // --- ESC key ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });

  updateResetVisibility();
});