import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadPayPalScript } from '../utils/paypal';


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

  const isFormValid = () => {
    return name.trim() !== '' && 
           email.trim() !== '' && 
           address.trim() !== '' && 
           mobile.trim() !== '';
  };

  const getMissingFields = () => {
    const fields = [];
    if (!name.trim()) fields.push('Name');
    if (!email.trim()) fields.push('Email');
    if (!address.trim()) fields.push('Address');
    if (!mobile.trim()) fields.push('Mobile');
    return fields;
  };

  const convert_aed_usd = useCallback(() => {
    return (cart.reduce((total, product) => total + parseFloat(product.price) * product.quantity, 0) / 3.63).toFixed(2);
  }, [cart]);

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

  const completeCheckout = async (details, isPaypal) => {
    if (isPaypal || window.confirm('Proceed with cash payment?')) {
      const orderNumber = generateOrderNumber();
      const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
      const items = cart.map(item => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.price.toFixed(2)} AED</td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">${(item.price * item.quantity).toFixed(2)} AED</td>
        </tr>
      `).join('');
  
      const message = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation: ${orderNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4CAF50; color: white; padding: 10px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th { background-color: #f2f2f2; text-align: left; padding: 10px; }
            .footer { background-color: #eee; padding: 10px; text-align: center; font-size: 0.8em; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Confirmation</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Thank you for your order. We're pleased to confirm that it has been received and is being processed.</p>
              <h2>Order Details</h2>
              <p><strong>Order Number:</strong> ${orderNumber}</p>
              <p><strong>Order Date:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Payment Method:</strong> ${isPaypal ? 'PayPal' : 'Cash'}</p>
              <p><strong>Transaction ID:</strong> ${details.id}</p>
              <h3>Items Ordered</h3>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${items}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" style="text-align: right; padding: 10px;"><strong>Total:</strong></td>
                    <td style="padding: 10px;"><strong>${totalAmount} AED</strong></td>
                  </tr>
                </tfoot>
              </table>
              <h3>Shipping Information</h3>
              <p><strong>Address:</strong> ${address}</p>
              <p><strong>Mobile:</strong> ${mobile}</p>
              <p>If you have any questions about your order, please contact our customer service.</p>
            </div>
            <div class="footer">
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
        </html>
      `;
  
      try {
        const response = await sendEmail(email, message, orderNumber);
        if (response.ok) {
          alert(`Order placed successfully. A confirmation email has been sent to ${email}. Your order number is ${orderNumber}.`);
          onOrderComplete();
          navigate('/');
        } else {
          throw new Error('Failed to send email');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('There was an error placing the order. Please try again later or contact customer support.');
        throw error;
      }
    }
  };

  // Load PayPal script only once when needed
  useEffect(() => {
    let mounted = true;

    if (paymentMethod === 'paypal' && !paypalLoaded && isFormValid()) {
      loadPayPalScript(PAYPAL_CLIENT_ID).then(() => {
        if (mounted) {
          setPaypalLoaded(true);
        }
      });
    }

    return () => {
      mounted = false;
    };
  }, [paymentMethod, paypalLoaded, PAYPAL_CLIENT_ID, isFormValid]);

  // Handle PayPal button rendering
  useEffect(() => {
    let paypalButtonsInstance = null;

    const renderPayPalButtons = async () => {
      const paypalContainer = document.getElementById('paypal-button-container');
      
      if (!paypalContainer || !window.paypal) {
        return;
      }

      // Clear existing buttons
      paypalContainer.innerHTML = '';

      if (paypalLoaded && paymentMethod === 'paypal' && isFormValid()) {
        try {
          paypalButtonsInstance = window.paypal.Buttons({
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
              try {
                const details = await actions.order.capture();
                await completeCheckout(details, true);
              } catch (error) {
                console.error('PayPal capture error:', error);
                alert('There was an error processing your payment. Please try again.');
              } finally {
                setIsSubmitting(false);
              }
            },
            onError: (err) => {
              console.error('PayPal Checkout error:', err);
              alert('There was an error processing the payment. Please try again.');
            }
          });

          await paypalButtonsInstance.render(paypalContainer);
        } catch (error) {
          console.error('Error rendering PayPal buttons:', error);
        }
      }
    };

    renderPayPalButtons();

    // Cleanup function
    return () => {
      if (paypalButtonsInstance && typeof paypalButtonsInstance.close === 'function') {
        paypalButtonsInstance.close();
      }
    };
  }, [paypalLoaded, paymentMethod, isFormValid, convert_aed_usd, completeCheckout]);

  const handlePayPalButtonClick = () => {
    if (!isFormValid()) {
      const missingFields = getMissingFields();
      alert(`Please fill out the following required fields before paying:\n${missingFields.join('\n')}`);
    }
  };

  const handleCheckout = async (event) => {
    event.preventDefault();
    
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items to the cart before checking out.');
      return;
    }

    if (!isFormValid()) {
      const missingFields = getMissingFields();
      alert(`Please fill out the following required fields:\n${missingFields.join('\n')}`);
      return;
    }

    if (paymentMethod !== 'paypal') {
      setIsSubmitting(true);
      try {
        await completeCheckout({ id: 'Cash Payment', payer: { name: { given_name: 'Cash Payment' } } }, false);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-10 bg-gradient-to-br from-white to-gray-100 rounded-3xl shadow-2xl font-poppins text-gray-800 animate-fadeIn">
      <div className="bg-white p-10 rounded-2xl shadow-lg transition-transform hover:-translate-y-1">
        <h2 className="text-4xl text-green-600 mb-8 text-center uppercase tracking-wider relative after:content-[''] after:block after:w-15 after:h-1 after:bg-green-600 after:mx-auto after:mt-4">
          Complete Your Order
        </h2>
        <form onSubmit={handleCheckout} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-semibold text-gray-700">Name</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring focus:ring-green-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-semibold text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring focus:ring-green-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="mb-2 font-semibold text-gray-700">Address</label>
            <input 
              type="text" 
              id="address" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              required 
              className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring focus:ring-green-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="mobile" className="mb-2 font-semibold text-gray-700">Mobile</label>
            <input 
              type="text" 
              id="mobile" 
              value={mobile} 
              onChange={(e) => setMobile(e.target.value)} 
              required 
              className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring focus:ring-green-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="paymentMethod" className="mb-2 font-semibold text-gray-700">Payment Method</label>
            <select 
              id="paymentMethod"
              value={paymentMethod} 
              onChange={handlePaymentMethodChange}
              className="p-3 border-2 border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:border-green-600 focus:ring focus:ring-green-200"
            >
              <option value="cash">Cash</option>
              <option value="paypal">PayPal / Card</option>
            </select>
          </div>
          
          {paymentMethod === 'paypal' && (
            <div className="mt-5">
              {!isFormValid() ? (
                <button 
                  type="button" 
                  className="w-full p-4 bg-blue-500 text-white rounded-lg font-semibold uppercase tracking-wide transition-all hover:bg-blue-600 hover:-translate-y-1 hover:shadow-lg"
                  onClick={handlePayPalButtonClick}
                >
                  PayPal / Card Payment
                </button>
              ) : (
                <div id="paypal-button-container"></div>
              )}
            </div>
          )}
          
          {paymentMethod === 'cash' && (
            <button 
              type="submit" 
              className="w-full p-4 bg-green-600 text-white rounded-lg font-semibold uppercase tracking-wide transition-all hover:bg-green-700 hover:-translate-y-1 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Place Order'}
            </button>
          )}
        </form>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-lg mt-10 lg:sticky lg:top-5 lg:self-start">
        <h3 className="text-2xl text-green-600 mb-6 text-center relative after:content-[''] after:block after:w-10 after:h-1 after:bg-green-600 after:mx-auto after:mt-2">
          Order Summary
        </h3>
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between mb-4 pb-4 border-b border-gray-200">
            <span>{item.name} - {item.quantity} x {item.price.toFixed(2)} AED</span>
            <span>{(item.price * item.quantity).toFixed(2)} AED</span>
          </div>
        ))}
        <div className="flex justify-between mt-5 pt-5 border-t-2 border-green-600 font-bold text-lg text-green-600">
          <span>Total:</span>
          <span>{cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)} AED</span>
        </div>
      </div>
      <button 
        className="w-full mt-8 p-4 bg-gray-200 text-gray-800 rounded-lg font-semibold uppercase tracking-wide transition-all hover:bg-gray-300 hover:-translate-y-1 hover:shadow-md"
        onClick={() => navigate('/cart')}
      >
        Back to Cart
      </button>
    </div>
  );
};

export default CheckoutForm;