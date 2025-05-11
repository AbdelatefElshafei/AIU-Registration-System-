import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us">
      <div className="contact-header">
        <h1>AIU.</h1>
        <p>Alamein International University</p>
        <p>A modern university providing world-class education and research opportunities.</p>
      </div>
      <div className="contact-content">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p><strong>Address:</strong> 123 University Avenue, Alamein, Egypt</p>
          <p><strong>Phone:</strong> +20 123 456 789</p>
          <p><strong>Email:</strong> info@aiu.edu.eg</p>
        </div>
        <div className="contact-form">
          <h2>Get in Touch</h2>
          <form>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;