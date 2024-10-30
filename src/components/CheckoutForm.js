import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadPayPalScript } from '../utils/paypal';
import styles from './CheckoutForm.module.css';

const CheckoutForm = ({ cart, onOrderComplete }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_CLIENT_ID;

  useEffect(() => {
    if (paymentMethod === 'paypal' && !paypalLoaded) {
      loadPayPalScript(PAYPAL_CLIENT_ID).then(() => setPaypalLoaded(true));
    }
  }, [paymentMethod, paypalLoaded]);

  useEffect(() => {
    if (paypalLoaded && paymentMethod === 'paypal') {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: convert_aed_usd()
              }
            }]
          });
        },
        onApprove: async (data, actions) => {
          setIsSubmitting(true);
          return actions.order.capture().then(async (details) => {
            await completeCheckout(details, true);
          }).finally(() => setIsSubmitting(false));
        },
        onError: (err) => {
          console.error('PayPal Checkout error:', err);
          alert('There was an error processing the payment. Please try again.');
        }
      }).render('#paypal-button-container');
    }
  }, [paypalLoaded, paymentMethod]);

  const handleCheckout = async (event) => {
    event.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items to the cart before checking out.');
      return;
    }

    // Check if all required fields are filled
    if (!name || !email || !address || !mobile) {
      alert('Please fill out all fields before proceeding.');
      return;
    }

    if (paymentMethod !== 'paypal') {
      setIsSubmitting(true);
      await completeCheckout({ id: 'Cash Payment', payer: { name: { given_name: 'Cash Payment' } } }, false);
      setIsSubmitting(false);
    }
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const completeCheckout = async (details, isPaypal) => {
    if (isPaypal || window.confirm('Proceed with "cash" payment?')) {
      const orderNumber = generateOrderNumber();
      const items = cart.map(item => `${item.name} - ${item.price.toFixed(2)} x ${item.quantity}`).join(', ');
      const message = `
        <html>
        <head><title>Order Confirmation: ${orderNumber}</title></head>
        <body>
          <h1>Order Confirmation</h1>
          <p>Thank you for your order, ${name}.</p>
          <p><strong>Order Number:</strong> ${orderNumber}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Mobile:</strong> ${mobile}</p>
          <p><strong>Items:</strong> ${items}</p>
          <p><strong>Transaction Method:</strong> ${details.id}</p>
        </body>
        </html>
      `;

      try {
        const response = await sendEmail(email, message, orderNumber);
        if (response.ok) {
          alert(`Order placed. Email sent. Your order number is ${orderNumber}.`);
          onOrderComplete(); // Clear cart and navigate back
          navigate('/');
        } else {
          alert('There was an error placing the order.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('There was an error placing the order. Please try again later.');
      }
    }
  };

  const generateOrderNumber = (length = 6) => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const sendEmail = async (to, message, orderNumber) => {
    const smtpEndpoint = 'https://api.smtp2go.com/v3/email/send';
    const apiKey = process.env.REACT_APP_SMTP_API_KEY;
    const fromName = 'PhoneSale';
    const fromEmail = 'support@phonesale.org';

    const body = JSON.stringify({
      api_key: apiKey,
      to: [to, 'grey@phonesale.org'],
      sender: `${fromName} <${fromEmail}>`,
      subject: `Order Confirmation: ${orderNumber}`,
      html_body: message,
    });

    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    };

    return fetch(smtpEndpoint, init);
  };

  const convert_aed_usd = () => {
    return (cart.reduce((total, product) => total + parseFloat(product.price) * product.quantity, 0) / 3.63).toFixed(2);
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Complete Your Order</h2>
        <form onSubmit={handleCheckout} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">Address</label>
            <input 
              type="text" 
              id="address" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="mobile">Mobile</label>
            <input 
              type="text" 
              id="mobile" 
              value={mobile} 
              onChange={(e) => setMobile(e.target.value)} 
              required 
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="paymentMethod">Payment Method</label>
            <select 
              id="paymentMethod"
              value={paymentMethod} 
              onChange={handlePaymentMethodChange}
              className={styles.select}
            >
              <option value="cash">Cash</option>
              <option value="paypal">PayPal / Card</option>
            </select>
          </div>
          {paymentMethod === 'paypal' && (
            <div id="paypal-button-container" className={styles.paypalContainer}></div>
          )}
          {paymentMethod === 'cash' && (
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          )}
        </form>
      </div>
      <div className={styles.orderSummary}>
        <h3>Order Summary</h3>
        {cart.map((item, index) => (
          <div key={index} className={styles.orderItem}>
            <span>{item.name} - {item.quantity} x {item.price.toFixed(2)} AED</span>
            <span>{(item.price * item.quantity).toFixed(2)} AED</span>
          </div>
        ))}
        <div className={styles.totalAmount}>
          <span>Total:</span>
          <span>{cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)} AED</span>
        </div>
      </div>
      <button className={styles.backButton} onClick={() => navigate('/cart')}>
        Back to Cart
      </button>
    </div>
  );
};

export default CheckoutForm;
