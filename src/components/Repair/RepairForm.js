import React, { useState } from 'react';
import styles from './RepairForm.module.css';

const RepairForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneModel: '',
    mobileNumber: '',
    address: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const emailMessage = `
      <h2>Repair Request</h2>
      <p>Dear ${formData.name},</p>
      <p>Thank you for reaching out. We have received your request. We will contact you shortly about your repair request.</p>
      <p><strong>Phone Model:</strong> ${formData.phoneModel}</p>
      <p><strong>Mobile Number:</strong> ${formData.mobileNumber}</p>
      <p><strong>Address:</strong> ${formData.address}</p>
      <p><strong>Message:</strong> ${formData.message}</p>
    `;

    try {
      const response = await sendEmail(formData.email, emailMessage, formData.phoneModel);
      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Thank you for reaching out. We have received your request. We will contact you shortly about your repair request.' });
        setFormData({
          name: '',
          email: '',
          phoneModel: '',
          mobileNumber: '',
          address: '',
          message: ''
        });
      } else {
        setSubmitStatus({ type: 'error', message: 'Failed to send request. Please try again.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendEmail = async (to, message, phoneModel) => {
    const smtpEndpoint = 'https://api.smtp2go.com/v3/email/send';
    const apiKey = 'api-AF4BE98C43FF422EAC600E6C9CF3C5C8';
    const fromName = 'PhoneSale';
    const fromEmail = 'support@phonesale.org';

    const body = JSON.stringify({
      api_key: apiKey,
      to: [to, 'grey@phonesale.org'],
      sender: `${fromName} <${fromEmail}>`,
      subject: 'Contact Request: ' + phoneModel,
      html_body: message,
    });

    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    };

    const response = await fetch(smtpEndpoint, init);
    return response;
  };

  return (
    <main className={styles.main}>
      <div className={styles.notice}>
        <i className={`${styles.icon} fas fa-tools`}></i>
        At PhoneSale Repair, we ensure high-quality repairs at reasonable and affordable prices. Simply fill out the form below, and we will reach out to you shortly regarding your device.
      </div>
      <div className={styles.contactForm}>
        <h2>Repair Request Form</h2>
        {submitStatus && (
          <div className={`${styles.statusMessage} ${styles[submitStatus.type]}`}>
            {submitStatus.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phoneModel">Phone Model:</label>
            <input 
              type="text" 
              id="phoneModel" 
              name="phoneModel"
              value={formData.phoneModel} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input 
              type="tel" 
              id="mobileNumber" 
              name="mobileNumber"
              value={formData.mobileNumber} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Address:</label>
            <input 
              type="text" 
              id="address" 
              name="address"
              value={formData.address} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">What do you think is the issue of your device? (e.g., Battery, LCD Screen):</label>
            <textarea 
              id="message" 
              name="message"
              value={formData.message} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className={styles.buttonContainer}>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Request'}
            </button>
            <button type="button" className={styles.backButton} onClick={() => window.location.href = '/'}>
              Back to Shop
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RepairForm;