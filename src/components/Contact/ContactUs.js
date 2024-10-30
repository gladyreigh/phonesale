import React from 'react';
import styles from './ContactUs.module.css';

const ContactUs = () => {
  return (
    <main className={styles.main}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Contact Us</h1>
          <p>Get in touch with our team for any questions or support you may need.</p>
          <a href="/" className={styles.backButton}>← Back to Home</a>
        </div>
      </div>

      <section id="contacta" className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <h2>How Can We Help?</h2>
            <p>Feel free to reach out to us through any of the following channels.</p>
          </div>

          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <i className={`${styles.icon} fas fa-envelope`}></i>
              <h3>Email</h3>
              <p><a href="mailto:support@phonesale.org">support@phonesale.org</a></p>
            </div>
            <div className={styles.contactItem}>
              <i className={`${styles.icon} fas fa-phone-alt`}></i>
              <h3>Phone</h3>
              <p><a href="tel:+971566053401">+971 56 605 3401</a></p>
            </div>
            <div className={styles.contactItem}>
              <i className={`${styles.icon} fab fa-whatsapp`}></i>
              <h3>WhatsApp</h3>
              <p><a href="https://api.whatsapp.com/send?phone=+971566053401&text=Hello,%20I%20have%20an%20enquiry." target="_blank" rel="noopener noreferrer">+971 56 605 3401</a></p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;