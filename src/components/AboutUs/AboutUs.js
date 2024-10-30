// src/components/AboutUs.js

import React, { useEffect } from 'react';
import styles from './AboutUs.module.css';

const AboutUs = () => {
  const teamMembers = [
    { name: "Gladyreigh Dela Cruz", roles: ["Founder & CEO", "Lead Software Engineer", "Customer Support Team Lead", "UX Research Lead", "IT Security Specialist", "Corporate Communications Manager", "SEO Specialist"] },
    { name: "Kenji Visorro", roles: ["Chief Creative Officer", "Digital Content Creator"] },
    { name: "Jiero Jaucian", role: "Chief Technology Officer" },
    { name: "Graceria Fontanilla", role: "Chief Operating Officer" },
    { name: "Kielvey Tayag", roles: ["Head of Product Management", "Business Development Manager", "Quality Assurance Manager", "Inventory Control Specialist"] },
    { name: "Gladys Dela Cruz", roles: ["Chief Marketing Officer", "Public Relations Manager"] },
    { name: "Reignson Dela Cruz", role: "Chief Financial Officer" },
    { name: "Agnes Castro", roles: ["Director of Customer Experience", "Data Analytics Manager"] },
    { name: "Dhang Mora", role: "Content Strategy Manager" },
    { name: "Mercy Tayag", roles: ["Supply Chain Manager", "Customer Insights Analyst"] },
    { name: "Shemareign Valderrama", role: "Social Media Director" },
    { name: "Elena Melita", role: "Legal Counsel" },
    { name: "Froilan Sudweste", roles: ["Technical Support Lead", "Logistics Coordinator"] },
    { name: "Daniel Cuizon", role: "Customer Loyalty Program Manager" },
    { name: "John Seprado", role: "Mobile App Developer" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.animate);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(`.${styles.animateOnScroll}`).forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.aboutUs}>
      <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>About PhoneSale</h1>
        <p className={styles.heroSubtitle}>Bridging Technology and Affordability</p>
      </div>

      <div className={styles.container}>
        <section className={`${styles.intro} ${styles.animateOnScroll}`}>
          <p>Welcome to PhoneSale! Founded in 2023, we are dedicated to offering the finest gadgets at reasonable prices. Our mission is to provide solutions that make owning a high-quality phone accessible and affordable for everyone, ensuring pure satisfaction with each purchase.</p>
        </section>

        <section className={`${styles.founder} ${styles.animateOnScroll}`}>
          <div className={styles.founderImage}>
            <img src="../images/founder.jpg" alt="Gladyreigh Dela Cruz" />
          </div>
          <div className={styles.founderInfo}>
            <h2>Meet the Founder</h2>
            <p>Gladyreigh Dela Cruz envisioned PhoneSale to bridge the gap between high-quality technology and affordability. With a focus on customer satisfaction and innovation, Our team created PhoneSale to help people find the perfect phone without overspending.</p>
          </div>
        </section>

        <section className={styles.team}>
          <h2 className={styles.animateOnScroll}>Meet Our Team</h2>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div key={index} className={`${styles.teamMember} ${styles.animateOnScroll}`}>
                <h3>{member.name}</h3>
                <ul>
                  {Array.isArray(member.roles) 
                    ? member.roles.map((role, roleIndex) => <li key={roleIndex}>{role}</li>) 
                    : <li>{member.role}</li>} 
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id={styles.contact} className={styles.animateOnScroll}>
          <h2>Join Us</h2>
          <p>Are you passionate about making a difference? We are welcoming enthusiastic individuals to join our team. If you want to contribute your skills and be part of something exciting, we invite you to be a part of our growing team.</p>
          <div className={styles.contactInfo}>
            <a href="mailto:support@phonesale.org" className={styles.contactButton}>Email Us</a>
            <a href="tel:+971566053401" className={styles.contactButton}>Call Us</a>
          </div>
        </section>
      </div>

      <div className={styles.buttonWrapper}>
        <a href="/" className={styles.backButton}>Back to Shop</a>
      </div>
    </main>
  );
};

export default AboutUs;