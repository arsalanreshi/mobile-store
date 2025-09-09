import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="about-page">
        <div className="page-header">
          <h1 className="page-title">🏢 About Atim Communication</h1>
          <p className="page-subtitle">Your trusted technology partner since 2020</p>
        </div>

        {/* Hero Section */}
        <div className="about-hero">
          <div className="hero-content">
            <h2>Connecting You to Tomorrow's Technology</h2>
            <p>At Atim Communication, we believe technology should enhance your life, not complicate it. We're passionate about bringing you the latest smartphones, accessories, and smart gadgets that keep you connected to what matters most.</p>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.8★</div>
              <div className="stat-label">Customer Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="story-section">
          <div className="section-header">
            <h2>Our Story</h2>
            <p>From humble beginnings to becoming a trusted name in technology retail</p>
          </div>
          
          <div className="story-timeline">
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h3>🚀 The Beginning</h3>
                <p>Started as a small mobile accessories shop with a vision to make technology accessible to everyone.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2021</div>
              <div className="timeline-content">
                <h3>📱 Expansion</h3>
                <p>Expanded to include smartphones and became an authorized retailer for major brands.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2022</div>
              <div className="timeline-content">
                <h3>🌐 Going Digital</h3>
                <p>Launched our online platform to serve customers across India with seamless shopping experience.</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <h3>🏆 Recognition</h3>
                <p>Received 'Best Customer Service' award and expanded our product range to include smart gadgets.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="values-section">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">🎯</div>
              <h3>Quality First</h3>
              <p>We only sell products that meet our high standards for quality and reliability.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">❤️</div>
              <h3>Customer Centric</h3>
              <p>Your satisfaction is our priority. We go above and beyond to ensure you're happy.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>We stay ahead of technology trends to bring you the latest and greatest products.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">🤝</div>
              <h3>Trust & Transparency</h3>
              <p>Honest pricing, clear policies, and transparent communication in everything we do.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">⚡</div>
              <h3>Fast & Reliable</h3>
              <p>Quick delivery, prompt support, and reliable service you can count on.</p>
            </div>
            
            <div className="value-item">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>Committed to eco-friendly practices and responsible technology consumption.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <p>The passionate people behind Atim Communication</p>
          </div>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💼</div>
              <h3>Rajesh Kumar</h3>
              <p className="member-role">Founder & CEO</p>
              <p className="member-bio">Tech enthusiast with 15+ years in the industry, passionate about making technology accessible.</p>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">👩‍💻</div>
              <h3>Priya Sharma</h3>
              <p className="member-role">Head of Operations</p>
              <p className="member-bio">Operations expert ensuring smooth delivery and customer satisfaction across all channels.</p>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">👨‍🔧</div>
              <h3>Amit Patel</h3>
              <p className="member-role">Technical Support Lead</p>
              <p className="member-bio">Technical wizard helping customers with product selection and troubleshooting.</p>
            </div>
            
            <div className="team-member">
              <div className="member-avatar">👩‍🎨</div>
              <h3>Sneha Reddy</h3>
              <p className="member-role">Customer Experience Manager</p>
              <p className="member-bio">Dedicated to creating exceptional customer experiences and building lasting relationships.</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="why-choose-section">
          <div className="section-header">
            <h2>Why Choose Atim Communication?</h2>
            <p>What sets us apart from the competition</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">✅</div>
              <h3>Authentic Products</h3>
              <p>100% genuine products with manufacturer warranty and official support.</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Same-day delivery in select cities, express shipping nationwide.</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive pricing with regular offers and exclusive deals.</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🔄</div>
              <h3>Easy Returns</h3>
              <p>Hassle-free 30-day return policy with free pickup service.</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🛡️</div>
              <h3>Extended Warranty</h3>
              <p>Optional extended warranty plans for complete peace of mind.</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">📞</div>
              <h3>Expert Support</h3>
              <p>Knowledgeable support team available 24/7 to help you.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <div className="cta-content">
            <h2>Ready to Experience the Difference?</h2>
            <p>Join thousands of satisfied customers who trust Atim Communication for their technology needs.</p>
            <div className="cta-buttons">
              <a href="/" className="btn btn-primary">Shop Now</a>
              <a href="/contact" className="btn btn-secondary">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
