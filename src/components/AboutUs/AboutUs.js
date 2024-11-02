import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import founder from '../../images/founder.jpg'

const AboutUs = () => {
  const teamMembers = [
    { name: "Gladyreigh Dela Cruz", roles: ["Founder & CEO", "Lead Software Engineer"] },
    { name: "Ashley Quiles", roles: ["UI/UX Research Lead", "Graphics Design Manager"]},
    { name: "Kenji Visorro", roles: ["Chief Creative Officer", "Digital Content Creator"] },
    { name: "Jiero Jaucian", role: "Chief Technology Officer" },
    { name: "Graceria Fontanilla", role: "Chief Operating Officer" },
    { name: "Kielvey Tayag", roles: ["Head of Product Management", "Business Development Manager", "Quality Assurance Manager", "Inventory Control Specialist"] },
    { name: "Gladys Dela Cruz", roles: ["Chief Marketing Officer", "Public Relations Manager"] },
    { name: "Reignson Dela Cruz", role: "Chief Financial Officer" },
    { name: "Agnes Castro", roles: ["Director of Customer Experience", "Data Analytics Manager"] },
    { name: "Dhang Mora", role: "Content Strategy Manager" },
    { name: "Mercy Tayag", roles: ["Supply Chain Manager", "Customer Insights Analyst"] },
    { name: "Shemareign Valderrama", role: "Social Media Director" },
    { name: "Elena Melita", role: "Legal Counsel" },
    { name: "Froilan Sudweste", roles: ["Technical Support Lead", "Logistics Coordinator"] },
    { name: "Daniel Cuizon", role: "Customer Loyalty Program Manager" },
    { name: "John Seprado", role: "Mobile App Developer" }
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="font-poppins text-gray-800 overflow-x-hidden"
    >
      <header className="bg-[#1a2942] text-white text-center py-20 relative overflow-hidden">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-5xl mb-4 font-bold">About PhoneSale</h1>
          <p className="text-2xl font-light">Bridging Technology and Affordability</p>
        </motion.div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-3xl mx-auto text-lg text-center my-16 p-8 bg-white rounded-lg shadow-xl"
        >
          <p>Welcome to PhoneSale! Founded in 2023, we are dedicated to offering the finest gadgets at reasonable prices. Our mission is to provide solutions that make owning a high-quality phone accessible and affordable for everyone, ensuring pure satisfaction with each purchase.</p>
        </motion.section>

        <motion.section
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-10 my-20 bg-gray-50 p-10 rounded-lg shadow-xl"
        >
          <div className="flex-1 text-center">
            <img src={founder} alt="Gladyreigh Dela Cruz" className="rounded-full w-64 h-64 object-cover border-4 border-[#1a2942] shadow-lg hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="flex-2">
            <h2 className="text-4xl mb-4 text-[#1a2942] font-bold">Meet the Founder</h2>
            <p className="text-gray-700 leading-relaxed">Gladyreigh Dela Cruz envisioned PhoneSale to bridge the gap between high-quality technology and affordability. With a focus on customer satisfaction and innovation, Our team created PhoneSale to help people find the perfect phone without overspending.</p>
          </div>
        </motion.section>

        <section className="py-20 bg-gray-100 rounded-xl shadow-inner">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-4xl mb-10 text-center text-[#1a2942] font-bold"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <h3 className="text-xl mb-4 text-[#1a2942] font-semibold">{member.name}</h3>
                <ul className="list-none p-0 m-0">
                  {Array.isArray(member.roles) 
                    ? member.roles.map((role, roleIndex) => <li key={roleIndex} className="text-sm text-gray-600 mb-1">{role}</li>) 
                    : <li className="text-sm text-gray-600 mb-1">{member.role}</li>} 
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="py-20 text-center bg-[#1a2942] text-white rounded-xl shadow-inner mt-20"
        >
          <h2 className="text-4xl mb-4 text-white font-bold">Join Us</h2>
          <p className="mb-8 text-white max-w-2xl mx-auto">Are you passionate about making a difference? We are welcoming enthusiastic individuals to join our team. If you want to contribute your skills and be part of something exciting, we invite you to be a part of our growing team.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a href="mailto:support@phonesale.org" className="bg-[#1a2942] text-white px-8 py-3 rounded-full font-bold transition-all duration-300 hover:bg-[#0e1624] hover:-translate-y-1 hover:shadow-lg">Email Us</a>
            <a href="tel:+971566053401" className="bg-[#1a2942] text-white px-8 py-3 rounded-full font-bold transition-all duration-300 hover:bg-[#0e1624] hover:-translate-y-1 hover:shadow-lg">Call Us</a>
          </div>
        </motion.section>
      </div>

      <div className="text-center py-10">
        <Link to="/" className="inline-block bg-[#1a2942] text-white px-8 py-3 rounded-full font-bold transition-all duration-300 hover:bg-[#0e1624] hover:-translate-y-1 hover:shadow-lg">
          Back to Shop
        </Link>
      </div>
    </motion.main>
  );
};

export default AboutUs;