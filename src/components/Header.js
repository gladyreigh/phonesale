import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/phonesale.png'

/**
 * Header Component
 * @param {Object} props
 * @param {Array} props.cart - Array of cart items, each item should have a quantity property
 * @returns {JSX.Element} Header component with navigation and cart functionality
 */
const Header = ({ cart }) => {
  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State for header visibility on scroll
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  
  // State to track cart updates - now tracking total items instead of length
  const [prevTotalItems, setPrevTotalItems] = useState(0);

  // Calculate total header height for the spacer div
  const headerHeight = 'calc(2rem + 8rem)'; // 2rem for banner, 8rem for main header

  // Calculate total items in cart including quantities
  const totalCartItems = cart.reduce((total, item) => {
    return total + (item.quantity || 1);
  }, 0);

  /**
   * Handle scroll events to show/hide header
   * Shows header when scrolling up or near top of page
   */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      // Show header if scrolling up or near top
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setPrevScrollPos(currentScrollPos);
      setIsVisible(visible);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  /**
   * Show header when cart is updated
   * Triggers when items are added, removed, or quantities change
   */
  useEffect(() => {
    if (totalCartItems !== prevTotalItems) {
      setIsVisible(true);
      setPrevTotalItems(totalCartItems);
    }
  }, [totalCartItems, prevTotalItems]);

  /**
   * Toggle mobile menu visibility
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Helper component for the UAE flag
  const UAEFlag = () => (
    <div className="flex items-center space-x-1">
      <div className="w-8 h-6 relative">
        <div className="absolute inset-0 bg-green-600 h-1/3"></div>
        <div className="absolute inset-0 top-1/3 bg-white h-1/3"></div>
        <div className="absolute inset-0 top-2/3 bg-black h-1/3"></div>
        <div className="absolute left-0 h-full w-1/4 bg-red-600"></div>
      </div>
      <span className="text-lg font-bold">UAE</span>
    </div>
  );

  // Helper component for cart icon with counter
  const CartIcon = () => (
    <Link to="/cart" className="relative hover:text-gray-300 transition-colors">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {totalCartItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalCartItems}
        </span>
      )}
    </Link>
  );

  // Helper component for mobile menu toggle button
  const MenuToggleButton = () => (
    <button 
      className="md:hidden transition-transform duration-200 ease-in-out" 
      onClick={toggleMenu}
    >
      {isMenuOpen ? (
        // X icon when menu is open
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        // Hamburger icon when menu is closed
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </button>
  );

  return (
    <>
      {/* Spacer div to prevent content from being hidden under fixed header */}
      <div style={{ height: headerHeight }}></div>
      
      {/* Main header container with transition */}
      <div className={`w-full fixed top-0 left-0 z-50 transform transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        {/* Top quote banner */}
        <div className="bg-white text-center py-2 px-4">
          <p className="text-gray-700 text-sm">
            "We provide you with the finest gadgets that you deserve, at reasonable prices."
          </p>
        </div>

        {/* Main header */}
        <header className="bg-[#1a2942] text-white p-2 md:p-4 shadow-lg">
          <div className="max-w-7xl mx-auto relative md:h-25">
            {/* Top Section: Logo and Icons */}
            <div className="flex items-center justify-between">
              {/* Left section - Mobile UAE Flag */}
              <div className="flex items-center space-x-1 md:invisible">
                <UAEFlag />
              </div>

              {/* Center - Logo */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <Link to="/" className="block">
                  <img 
                    src={logo} 
                    alt="PhoneSale Logo" 
                    className="h-20 md:h-28 w-auto object-contain"
                  />
                </Link>
              </div>

              {/* Right section - Mobile Icons */}
              <div className="flex items-center space-x-4 md:invisible">
                <CartIcon />
                <MenuToggleButton />
              </div>
            </div>

            {/* Bottom Section: Navigation with Icons */}
            <nav className="hidden md:flex justify-center mt-4 pb-2">
              <div className="flex items-center space-x-8">
                {/* Desktop UAE Flag */}
                <UAEFlag />

                {/* Navigation Links */}
                <Link to="/" className="text-white hover:text-gray-300 transition-colors font-medium text-lg">
                  Home
                </Link>
                <Link to="/products" className="text-white hover:text-gray-300 transition-colors font-medium text-lg">
                  Products
                </Link>
                <Link to="/about" className="text-white hover:text-gray-300 transition-colors font-medium text-lg">
                  About
                </Link>
                <Link to="/repair" className="text-white hover:text-gray-300 transition-colors font-medium text-lg">
                  Repair
                </Link>
                <Link to="/contact" className="text-white hover:text-gray-300 transition-colors font-medium text-lg">
                  Contact
                </Link>
                <a href="https://greyshop.pages.dev/" className="text-white hover:text-gray-300 transition-colors font-medium text-lg">
                  Policy
                </a>

                {/* Desktop Icons */}
                <button className="hover:text-gray-300 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                <CartIcon />
              </div>
            </nav>
          </div>
        </header>

        {/* Mobile menu with slide transition */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#1a2942] text-white overflow-hidden">
            <nav className="px-4 pt-2 pb-4">
              <ul className="space-y-2">
                <li><Link to="/" className="block py-2 hover:text-gray-300 transition-colors">Home</Link></li>
                <li><Link to="/products" className="block py-2 hover:text-gray-300 transition-colors">Products</Link></li>
                <li><Link to="/about" className="block py-2 hover:text-gray-300 transition-colors">About</Link></li>
                <li><Link to="/repair" className="block py-2 hover:text-gray-300 transition-colors">Repair</Link></li>
                <li><Link to="/contact" className="block py-2 hover:text-gray-300 transition-colors">Contact</Link></li>
                <li><a href="https://greyshop.pages.dev/" className="block py-2 hover:text-gray-300 transition-colors">Policy</a></li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;