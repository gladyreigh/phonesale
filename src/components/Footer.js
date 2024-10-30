import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerMain}>
          <div className={styles.footerLogo}>
            <span className={styles.logoText}>PhoneSale</span>
          </div>
          <div className={styles.footerLinks}>
            <a href="/about">About Us</a>
            <a href="/policy">Policy</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2024 PhoneSale. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;