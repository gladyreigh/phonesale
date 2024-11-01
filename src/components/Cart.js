import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';

function Cart({ cart, removeFromCart, updateQuantity }) {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(true);

  useEffect(() => {
    calculateTotal();
    setIsCheckoutDisabled(cart.length === 0);
  }, [cart]);

  const calculateTotal = () => {
    const newTotal = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    setTotal(newTotal.toFixed(2));
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(index, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Add items to the cart before proceeding to checkout.');
    } else {
      navigate('/checkout');
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <section className={styles.cartSection}>
      <h2 className={styles.cartTitle}>Your Shopping Cart</h2>
      {cart.length > 0 ? (
        <div className={styles.cartContent}>
          <div className={styles.cartItems}>
            {cart.map((product, index) => (
              <div className={styles.cartItem} key={index}>
                <img src={product.image} alt={product.name} className={styles.productImage} />
                <div className={styles.productInfo}>
                  <h3>{product.name}</h3>
                  <p className={styles.productPrice}>{product.price.toFixed(2)} AED</p>
                </div>
                <div className={styles.quantityControl}>
                  <button onClick={() => handleQuantityChange(index, product.quantity - 1)}>-</button>
                  <input 
                    type="number" 
                    value={product.quantity} 
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                    min="1"
                  />
                  <button onClick={() => handleQuantityChange(index, product.quantity + 1)}>+</button>
                </div>
                <p className={styles.itemTotal}>{(product.price * product.quantity).toFixed(2)} AED</p>
                <button className={styles.removeButton} onClick={() => removeFromCart(index)}>Remove</button>
              </div>
            ))}
          </div>
          <div className={styles.cartSummary}>
            <h3>Order Summary</h3>
            <p className={styles.totalAmount}>Total: {total} AED</p>
            <button 
              className={styles.checkoutButton} 
              onClick={handleCheckout}
              disabled={isCheckoutDisabled}
            >
              Proceed to Checkout
            </button>
            <button className={styles.continueShoppingButton} onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.emptyCart}>
          <p>Your cart is empty</p>
          <button className={styles.continueShoppingButton} onClick={handleContinueShopping}>
            Back To Shopping
          </button>
        </div>
      )}
    </section>
  );
}

export default Cart;