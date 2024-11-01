import React from 'react';

const ContactUs = () => {
  return (
    <main className="font-sans text-gray-800 bg-gray-100 min-h-screen flex flex-col">
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-20 relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-4 text-shadow">Contact Us</h1>
          <p className="text-2xl font-light mb-8">Get in touch with our team for any questions or support you may need.</p>
          <a href="/" className="inline-block bg-white text-green-500 px-6 py-3 rounded-full font-medium hover:bg-green-500 hover:text-white transition-colors">
            ← Back to Home
          </a>
        </div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
      </div>

      <section id="contacta" className="flex-grow py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-500 mb-4">How Can We Help?</h2>
            <p className="text-lg text-gray-600">Feel free to reach out to us through any of the following channels.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <i className="fas fa-envelope text-4xl text-green-500 mb-4 animate-pulse"></i>
              <h3 className="text-2xl font-bold text-green-500 mb-2">Email</h3>
              <p><a href="mailto:support@phonesale.org" className="text-green-500 font-bold hover:underline">support@phonesale.org</a></p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <i className="fas fa-phone-alt text-4xl text-green-500 mb-4 animate-pulse"></i>
              <h3 className="text-2xl font-bold text-green-500 mb-2">Phone</h3>
              <p><a href="tel:+971566053401" className="text-green-500 font-bold hover:underline">+971 56 605 3401</a></p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <i className="fab fa-whatsapp text-4xl text-green-500 mb-4 animate-pulse"></i>
              <h3 className="text-2xl font-bold text-green-500 mb-2">WhatsApp</h3>
              <p><a href="https://api.whatsapp.com/send?phone=+971566053401&text=Hello,%20I%20have%20an%20enquiry." target="_blank" rel="noopener noreferrer" className="text-green-500 font-bold hover:underline">+971 56 605 3401</a></p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;