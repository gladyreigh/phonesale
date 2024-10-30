// src/components/Notification.js
import React, { useState, useEffect } from 'react';
import '../App.css'; // Import the CSS file for styles

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); // Hide the notification after 2 seconds

      return () => clearTimeout(timer); // Cleanup on component unmount
    }
  }, [message, onClose]);

  return (
    <div className={`notification ${message ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Notification;
