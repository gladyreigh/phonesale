import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#1a2942] text-white py-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="text-2xl font-bold mb-2">
              <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">PhoneSale</span>
            </div>
            <div className="flex space-x-4">
              <a href="/about" className="text-white hover:text-gray-300 transition-colors">About Us</a>
              <a href="/policy" className="text-white hover:text-gray-300 transition-colors">Policy</a>
              <a href="/contact" className="text-white hover:text-gray-300 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-sm">&copy; 2024 PhoneSale. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;