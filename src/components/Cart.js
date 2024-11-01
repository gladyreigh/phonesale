import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2 } from 'lucide-react';

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
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

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
          <button
            onClick={handleContinueShopping}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:-translate-y-1"
          >
            Back To Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-green-600 uppercase tracking-wide mb-10 relative">
        Your Shopping Cart
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-green-600 rounded-full" />
      </h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <div className="space-y-4">
            {cart.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain rounded-lg shadow-sm"
                    />
                  </div>

                  <div className="flex-1 flex flex-col sm:flex-row items-center sm:items-start justify-between w-full">
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-green-600 font-semibold">{product.price.toFixed(2)} AED</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(index, product.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors text-lg font-bold"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={product.quantity}
                          onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                          min="1"
                          className="w-16 text-center border-2 border-green-600 rounded-md py-1"
                        />
                        <button
                          onClick={() => handleQuantityChange(index, product.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors text-lg font-bold"
                        >
                          +
                        </button>
                      </div>

                      <p className="font-semibold text-green-600">
                        {(product.price * product.quantity).toFixed(2)} AED
                      </p>

                      <button
                        onClick={() => removeFromCart(index)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
            <h3 className="text-xl font-semibold text-center text-gray-900 mb-6">Order Summary</h3>
            <p className="text-2xl font-bold text-center text-green-600 mb-6">
              Total: {total} AED
            </p>
            <button
              onClick={handleCheckout}
              disabled={isCheckoutDisabled}
              className="w-full px-6 py-3 rounded-full bg-green-600 text-white font-semibold uppercase tracking-wide hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:-translate-y-1"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={handleContinueShopping}
              className="w-full mt-4 px-6 py-3 rounded-full bg-gray-100 text-gray-800 font-semibold uppercase tracking-wide hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 transform hover:-translate-y-1"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;