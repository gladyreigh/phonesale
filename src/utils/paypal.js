// src/utils/paypal.js
export const loadPayPalScript = (clientId) => {
  return new Promise((resolve, reject) => {
    if (window.paypal) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;  // Add currency if needed
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('PayPal SDK could not be loaded.'));
    document.body.appendChild(script);
  });
};
