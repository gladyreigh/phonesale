import React, { useEffect, useState } from 'react';
import '../App.css'; // Make sure to import your CSS file

const WhatsAppContact = () => {
  const [visible, setVisible] = useState(false);

  const handleVisibility = () => {
    const whatsappContact = document.getElementById('whatsapp-contact');
    const footer = document.querySelector('footer');

    if (whatsappContact && footer) {
      const footerTop = footer.getBoundingClientRect().top;

      if (window.innerWidth <= 768) {
        whatsappContact.style.display = 'block'; // Always show on small screens
      } else {
        if (window.scrollY > 200 && footerTop > window.innerHeight - whatsappContact.clientHeight) {
          whatsappContact.style.display = 'block';
        } else {
          whatsappContact.style.display = 'none';
        }
      }
    }
  };

  useEffect(() => {
    // Attach event listeners for scroll and resize
    window.addEventListener('scroll', handleVisibility);
    window.addEventListener('resize', handleVisibility);

    // Initial visibility check
    handleVisibility();

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('scroll', handleVisibility);
      window.removeEventListener('resize', handleVisibility);
    };
  }, []);

  return (
    <div
      id="whatsapp-contact"
      className="whatsapp-contact"
    >
      <a
        href="https://api.whatsapp.com/send?phone=+971566053401&text=Hello,%20I%20would%20like%20to%20know%20more%20about%20the%20offers%20available."
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp whatsapp-icon"></i> Contact us for offers
      </a>
    </div>
  );
};

export default WhatsAppContact;
