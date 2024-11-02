import React, { useState } from 'react';

const RepairForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneModel: '',
    mobileNumber: '',
    address: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const emailMessage = `
      <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
        <tr>
          <td colspan="2" style="background-color: #4CAF50; color: white; padding: 10px; text-align: center;">
            <h2>Repair Request</h2>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px;"><strong>Name:</strong></td>
          <td style="padding: 10px;">${formData.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px;"><strong>Phone Model:</strong></td>
          <td style="padding: 10px;">${formData.phoneModel}</td>
        </tr>
        <tr>
          <td style="padding: 10px;"><strong>Mobile Number:</strong></td>
          <td style="padding: 10px;">${formData.mobileNumber}</td>
        </tr>
        <tr>
          <td style="padding: 10px;"><strong>Address:</strong></td>
          <td style="padding: 10px;">${formData.address}</td>
        </tr>
        <tr>
          <td style="padding: 10px;"><strong>Message:</strong></td>
          <td style="padding: 10px;">${formData.message}</td>
        </tr>
      </table>
    `;

    try {
      const response = await sendEmail(
        formData.email,
        emailMessage,
        formData.phoneModel
      );
      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message:
            'Thank you for reaching out. We have received your request. We will contact you shortly about your repair request.',
        });
        setFormData({
          name: '',
          email: '',
          phoneModel: '',
          mobileNumber: '',
          address: '',
          message: '',
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Failed to send request. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendEmail = async (to, message, phoneModel) => {
    const smtpEndpoint = 'https://api.smtp2go.com/v3/email/send';
    const apiKey = process.env.REACT_APP_SMTP_API_KEY;
    const fromName = 'PhoneSale';
    const fromEmail = 'support@phonesale.org';

    const body = JSON.stringify({
      api_key: apiKey,
      to: [to, 'grey@phonesale.org'],
      sender: `${fromName} <${fromEmail}>`,
      subject: `Contact Request: ${phoneModel}`,
      html_body: message,
    });

    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    };

    const response = await fetch(smtpEndpoint, init);
    return response;
  };

  return (
    <main className="font-sans text-gray-800 px-4 py-8 max-w-2xl mx-auto">
      <div className="bg-green-100 text-green-700 p-4 rounded-lg flex items-center mb-6">
        <i className="fas fa-tools text-2xl mr-4"></i>
        <p>
          At PhoneSale Repair, we ensure high-quality repairs at reasonable and
          affordable prices. Simply fill out the form below, and we will reach
          out to you shortly regarding your device.
        </p>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-green-500 mb-6 text-center">
          Repair Request Form
        </h2>
        {submitStatus && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              submitStatus.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {submitStatus.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block font-semibold mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block font-semibold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="phoneModel" className="block font-semibold mb-2">
              Phone Model:
            </label>
            <input
              type="text"
              id="phoneModel"
              name="phoneModel"
              value={formData.phoneModel}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="mobileNumber" className="block font-semibold mb-2">
              Mobile Number:
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="address" className="block font-semibold mb-2">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block font-semibold mb-2">
              What do you think is the issue of your device? (e.g., Battery, LCD
              Screen):
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-24"
            ></textarea>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Request'}
            </button>
            <button
              type="button"
              onClick={() => (window.location.href = '/')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Back to Shop
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RepairForm;