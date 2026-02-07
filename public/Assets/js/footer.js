class FooterComponent extends HTMLElement {
connectedCallback(){
    this.innerHTML=`
    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <div class="logo">
                        <img src="https://ewuyalhslafkrlmrpyam.supabase.co/storage/v1/object/public/rubyland/logo%20ONLY.png" alt="Rubyland Limited" style="height: auto;">
                        <span>Rubyland<br>Limited</span>
                    </div>
                    <p>With over 24 years of experience, Rubyland Limited is your trusted partner for all real estate needs in Kenya. We provide expert valuation, consultation, and property services to individuals and businesses.</p>
                    <div class="newsletter-form">
                        <input type="email" placeholder="Your email address" aria-label="Your email address">
                        <button type="submit">Subscribe</button>
                    </div>
                </div>
                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about us.html">About Us</a></li>
                        <li><a href="index.html#services">Services</a></li>
                        <li><a href="Knowledge Center.html">Knowledge Center</a></li>
                        <li><a href="News Hub.html">News Hub</a></li>
                        <li><a href="contact us.html">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="Property managment.html">Property Management & Sales</a></li>
                        <li><a href="Feasibility Study.html">Feasibility Studies</a></li>
                        <li><a href="Due Diligence Services.html">Due Diligence Services</a></li>
                        <li><a href="Real Estate Valuations & Appraisal.html">Real Estate Valuations</a></li>
                        <li><a href="Consultancy Services.html">Consultancy Services</a></li>
                        <li><a href="Training services.html">Investment Training</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>Office Locations</h4>
                    <ul>
                        <li><i class="fas fa-map-marker-alt"></i> Nairobi Headquarters</li>
                        <li><i class="fas fa-map-marker-alt"></i> Mombasa Branch</li>
                        <li><i class="fas fa-map-marker-alt"></i> Kisumu Office</li>
                        <li><i class="fas fa-clock"></i> Mon-Fri: 8:00 AM - 5:00 PM</li>
                        <li><i class="fas fa-clock"></i> Sat: 9:00 AM - 1:00 PM</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Rubyland Limited. All Rights Reserved. | <a href="assets/downloads/rubyland-terms.pdf" download>Terms & Conditions</a> | <a href="#">Privacy Policy</a></p>
            </div>
        </div>
    </footer>`

}
}

customElements.define('footer-component', FooterComponent);