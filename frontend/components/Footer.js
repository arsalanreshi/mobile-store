export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <img src="/ac.png" alt="Atim Communication" />
              <span className="footer-brand-name">Atim Communication</span>
            </div>
            <p className="footer-description">
              Your trusted partner for mobile phones, accessories, and smart gadgets. Quality products at competitive prices.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="YouTube">📺</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <div className="footer-links">
              <a href="/">Home</a>
              <a href="/about">About Us</a>
              <a href="/contact">Contact</a>
              <a href="/category/phones">Phones</a>
              <a href="/category/accessories">Accessories</a>
              <a href="/category/smartwatches">Smartwatches</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Contact Info</h3>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <div className="footer-contact-icon">📧</div>
                <span>support@atim.com</span>
              </div>
              <div className="footer-contact-item">
                <div className="footer-contact-icon">📞</div>
                <span>+91 99999 99999</span>
              </div>
              <div className="footer-contact-item">
                <div className="footer-contact-icon">📍</div>
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Newsletter</h3>
            <p>Stay updated with our latest offers and products.</p>
            <div className="footer-newsletter">
              <div className="footer-newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="footer-newsletter-input"
                />
                <button className="footer-newsletter-btn">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2025 Atim Communication. All Rights Reserved.
          </div>
          <div className="footer-legal">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/returns">Return Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
