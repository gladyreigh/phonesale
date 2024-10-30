// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Products from './components/Products';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import Footer from './components/Footer';
import WhatsAppContact from './components/WhatsAppContact';
import Notification from './components/Notification';
import RepairForm from './components/Repair/RepairForm';
import AboutUs from './components/AboutUs/AboutUs'; 
import ContactUs from './components/Contact/ContactUs'; 

function App() {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState('');

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      // Product already in cart, update quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // New product, add to cart with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    showNotification(`${product.name} added to cart`);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity >= 1) {
      const updatedCart = [...cart];
      updatedCart[index].quantity = newQuantity;
      setCart(updatedCart);
    }
  };

  const handleOrderComplete = () => {
    setCart([]); // Clear cart after successful order
    showNotification('Order completed!');
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 2000); // Hide notification after 2 seconds
  };

  return (
    <Router>
      <div className="App">
        <Header cart={cart} />
        <main>
          <Routes>
            <Route path="/" element={<Products addToCart={addToCart} />} />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cart={cart} 
                  removeFromCart={removeFromCart} 
                  updateQuantity={updateQuantity}
                />
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <CheckoutForm 
                  cart={cart} 
                  onOrderComplete={handleOrderComplete} 
                />
              } 
            />
            <Route path="/repair" element={<RepairForm />} />
            <Route path="/about" element={<AboutUs />} /> 
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to home on 404 */}
          </Routes>
          <WhatsAppContact />
        </main>
        <Footer />
        <Notification message={notification} onClose={() => setNotification('')} />
      </div>
    </Router>
  );
}

export default App;