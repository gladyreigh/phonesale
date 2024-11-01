import React from 'react';
import { Link } from 'react-router-dom';

const Policy = () => {
  return (
    <main className="font-sans text-gray-800 min-h-screen">
      <header className="bg-[#1a2942] text-white py-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">PhoneSale Policies</h1>
        </div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
      </header>

      <nav className="bg-gray-100 py-3 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center space-x-4 sm:space-x-8">
          <a href="#shipping" className="text-gray-600 hover:text-[#1a2942] transition-colors text-sm sm:text-base">
            Shipping and Delivery
          </a>
          <a href="#warranty" className="text-gray-600 hover:text-[#1a2942] transition-colors text-sm sm:text-base">
            Warranty Policy
          </a>
          <a href="#return" className="text-gray-600 hover:text-[#1a2942] transition-colors text-sm sm:text-base">
            Return and Exchange
          </a>
          <a href="#payment" className="text-gray-600 hover:text-[#1a2942] transition-colors text-sm sm:text-base">
            Payment Policy
          </a>
          <a href="#privacy" className="text-gray-600 hover:text-[#1a2942] transition-colors text-sm sm:text-base">
            Privacy Policy
          </a>
          <a href="#disclaimer" className="text-gray-600 hover:text-[#1a2942] transition-colors text-sm sm:text-base">
            Disclaimer Policy
          </a>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section id="shipping" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2942] mb-4">Shipping and Delivery Policies</h2>
          <p className="mb-4">
            At PhoneSale, we are committed to providing a seamless and efficient shopping experience, ensuring reliable shipping and prompt deliveries. Please review our detailed shipping and delivery policies below:
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Delivery Fees:</h3>
          <div className="mb-4">
            <p className="font-bold">Local Delivery:</p>
            <ul className="list-disc pl-6">
              <li>Free</li>
            </ul>
          </div>
          <div className="mb-4">
            <p className="font-bold">International Delivery:</p>
            <ul className="list-disc pl-6">
              <li>AED 50</li>
            </ul>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Delivery Timelines:</h3>
          <div className="mb-4">
            <p className="font-bold">Local Delivery:</p>
            <p>Delivery is typically within 2-5 business days.</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">International Delivery:</p>
            <p>Delivery is typically within 5-14 business days.</p>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Additional Information:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>We will notify you promptly of any unforeseen delays.</li>
            <li>Please note that slight delays may occur during periods of high order volume.</li>
          </ul>
        </section>

        <section id="warranty" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2942] mb-4">Warranty Policy</h2>
          <p className="mb-4">
            PhoneSale's warranty policy ensures coverage for defects in material, design, and workmanship after the purchase of the product.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Warranty Period:</h3>
          <p className="mb-4">
            The main device is covered for 12 months from the date of receipt, free of charge. Accessories and other electronic devices also have a 12-month warranty starting from the purchase date.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Warranty Repairs:</h3>
          <p className="mb-4">
            Warranty repairs are handled by our service centers. If the product was purchased from a third-party seller, the seller's warranty terms apply. The original invoice is required to verify the serial number and validate the warranty period for services.
          </p>
          <p className="mb-4">
            The warranty repair period is twenty-one (21) working days, from the date of picking up the product from the customer until it is dispatched back.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Coverage and Conditions:</h3>
          <p className="mb-4">
            Not all products include warranty benefits; always check the product listing for details. Repair or replacement under warranty does not extend or renew the warranty period, which adheres to the device manufacturer's terms. If a product cannot be repaired and is still under the manufacturer's warranty, a replacement will be issued or, if unavailable, a refund of 85% will be provided after deducting 15% for restocking.
          </p>
          <p className="mb-4">
            To request warranty services for a defect within the warranty period, submit a request through our WhatsApp (+971566053401) or Email (support@phonesale.org). Our warranty team will contact you within 24 hours for claim validation and troubleshooting. You will need to provide pictures of the product from all angles, including the IMEI/Serial number.
          </p>
          <p className="mb-4">
            Ensure the item is packed in its original box or wrapped safely to avoid damage during transit. PhoneSale is not responsible for damages due to unsafe packaging, and such items will be returned without servicing.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Warranty Details:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Seller: PhoneSale</li>
            <li>Warranty Duration: 12 Months (UAE)</li>
            <li>Number of Claims per Issue Type: 3</li>
          </ul>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Service Policy:</h3>
          <p className="mb-4">
            Customers are responsible for backing up personal data and information on devices. Ensure FMI is switched off and lock/passwords are removed before servicing. The time taken to obtain device information or customer approval is not included in the Turn Around Time (TAT) of the repair process.
          </p>
          <p className="mb-4">
            By submitting your item for repair, you consent to the use of your contact details as required in connection with the repair service. Confirm all information provided during the warranty claim is correct. Remove screen protectors to facilitate service.
          </p>
          <p className="mb-4">
            The warranty does not cover defects or damage resulting from misuse, non-adherence to instructions, liquid spills, unauthorized repairs, or items not covered under the warranty conditions.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Delivery Policy:</h3>
          <p className="mb-4">
            Items covered by warranty are shipped at AED 50. PhoneSale is not responsible for damages during shipping to us. Ensure items are packed safely in the original box or appropriate wrapping. Provide all corresponding accessories to the courier during pickup, including earphones, battery, and charge carrier.
          </p>
          <p className="mb-4">
            Contact us via email (support@phonesale.org), or call our call number at (+971) 566053401 (UAE).
          </p>
        </section>

        <section id="return" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2942] mb-4">Return and Exchange Policy</h2>
          <p className="mb-4">
            At PhoneSale, your satisfaction is our priority. If you are not satisfied with your purchase, we will accept the return of sold products within seven (7) days from the date of collection or home delivery. The return and exchange policy is subject to the following terms and conditions.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">For Return and Exchange of Products:</h3>
          <p className="mb-4">
            Contact:
          </p>
          <p className="mb-4">
            WhatsApp / Telephone: +971 566053401<br />
            Email: support@phonesale.org
          </p>
          <p className="mb-4">
            The product(s) should be accompanied by the original sales invoice for return and exchange.
          </p>
          <p className="mb-4">
            The product(s) must be in unused and unopened condition, with all the original packaging material, accessories, manuals, registration cards, free of cost (FOC)/bundled product(s), and promotional vouchers.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">The Return and Exchange Are Not Applicable If:</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>The packaging is incomplete or the product is damaged or scratched.</li>
            <li>The device has an activation/password lock, such as Find My iPhone (FMIP), Find My Mobile (FMM), or Find My Device (FMD).</li>
            <li>The VAT has been refunded against the invoice.</li>
            <li>The packaging has minor soiling or is opened and the product is not defective, unused, with no visible scratches or marks observed on the product or the packaging; the product will be taken back with a restocking fee of a minimum of 15% or as applicable while making the return or exchange.</li>
          </ul>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">For Dead on Arrival (DOA) / Not Functioning Products:</h3>
          <p className="mb-4">
            Products not functioning as per the operational manual or falling short of declared product specifications will be exchanged or returned. The process can take up to seven (7) business days. Return or exchange will be done only after an investigation and technical report.
          </p>
          <p className="mb-4">
            If the returned product has any data or information stored in the memory or storage device, PhoneSale will not be responsible for the transfer of such data or information to another product given to the customer as an exchange or for the loss of any data or information still residing on the returned product.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Refunds:</h3>
          <p className="mb-4">
            Products purchased through credit/debit card will be refunded ONLY to the same credit/debit card used for the transaction. Service, delivery, and installation charges are non-refundable once performed and acknowledged by the customer.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Inspection:</h3>
          <p className="mb-4">
            Customers are to inspect product(s) PRIOR to signing the Proof of Delivery (POD) document and before the delivery agent's departure. Any product(s) delivered, signed, and/or accepted and subsequently reported damaged or broken will not qualify for return and exchange or warranty terms and conditions.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Extended Warranty/Damage Protection Plans:</h3>
          <p className="mb-4">
            Extended warranty and damage protection plans are subject to return if the product(s) is/are returned during the manufacturer warranty period.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Store Management:</h3>
          <p className="mb-4">
            Store management will act as per the above policies and their decision will be treated as final.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Shipping Costs:</h3>
          <p className="mb-4">
            You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
          </p>
          <p className="mb-4">
            For assistance, please contact:
          </p>
          <p className="mb-4">
            WhatsApp / Telephone: +971 566053401<br />
            Email: support@phonesale.org
          </p>
        </section>

        <section id="payment" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2942] mb-4">Payment Policy</h2>
          <p className="mb-4">
            PhoneSale takes the payment process and the treatment of personal information very seriously, ensuring that your financial information will not be used, sent, or sold to third parties for any purposes unrelated to PhoneSale and its business interests. We aim to protect your privacy in the best possible way. The information on this page relates to PhoneSale's payment methods and is used exclusively by PhoneSale. This policy is valid only for PhoneSale's official website: www.phonesale.org.
          </p>
          <p className="mb-4">
            By purchasing one or more items on PhoneSale's website at www.phonesale.org, you acknowledge and agree to the practices and policies outlined in this policy.
          </p>
          <p className="mb-4">
            By visiting PhoneSale's website at www.phonesale.org, you acknowledge and agree to the practices and policies outlined in this policy.
          </p>
          <p className="mb-4">
            If you cannot find the information you are looking for, please do not hesitate to contact us via email or send us a message on WhatsApp. One of our operators will get back to you as soon as possible.
          </p>

          <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Money Transaction</h3>
          <p className="mb-4">
            PhoneSale does not handle money transactions directly. We have entrusted payment services to a third party to offer a better service with all the necessary features. This ensures a safe and professional service that meets all quality standards required by the market.
          </p>
          <p className="mb-4">
            To read more about TAP security, please visit their website.
          </p>

            <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Payment</h3>
            <p className="mb-4">
              Payment is required when you complete the checkout procedure. Once you are sure about your order and have added items to your shopping cart, access the shopping cart and click on the checkout button. Fill in the form with your personal information, select your preferred payment method, and enter the required details. The process may take a few seconds, so please do not close or refresh your browser during the operation to avoid invalidating the process.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Your Information After Payment</h3>
            <p className="mb-4">
              The payment information of your credit/debit card is required only for the money transaction during the payment procedure. It takes place through a secured server, and no one will ever access your payment information. PhoneSale does not have access to or store your credit card information. The service is managed by PayPal to ensure the security and safety of both you and PhoneSale.
            </p>
            <p className="mb-4">
              To read more about PayPal security, please visit their website: Complete Payment Solution | Invoice System.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Payments via Mobile</h3>
            <p className="mb-4">
              PhoneSale's payment method is smartphone-friendly, allowing you to access PhoneSale's services conveniently from your mobile device at any time.
            </p>

            <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Accepted Payment Methods</h3>
            <p className="mb-4">
              PhoneSale accepts popular and professional payment methods, including both credit and debit cards. Please check the following list to see which payment methods are available during the payment process. We are confident that we will be able to meet your needs.
            </p>

            <ul className="list-disc pl-6 mb-4">
              <li>Certified Products: All of our products are certified and tested.</li>
              <li>Guaranteed Return and Exchange: You can return the product within 7 days.</li>
              <li>Purchase Bonuses: Collect bonuses and save with every purchase.</li>
            </ul>
            </section>

<section id="privacy" className="mb-8 sm:mb-12">
  <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2942] mb-4">Privacy Policy</h2>
  <p className="mb-4">
    Welcome to PhoneSale. This Privacy Policy outlines the basis on which any personal data, including but not limited to payment details and other information we collect from you or other sources or that you provide to us ("Information"), will be handled by us in connection with your access and use of www.phonesale.org, and/or the PhoneSale mobile application (collectively, the "Platform"), services, and applications (collectively, the "Services"). We understand the importance you place on your Information, and we are committed to protecting and respecting your privacy. Please read the following carefully to understand our practices regarding your Information. By using our Services, you agree to the handling of your Information in accordance with this Privacy Policy.
  </p>
  <p className="mb-4">
    References in this Privacy Policy to "we", "our" or "us" (or similar) are references to PhoneSale, owned by Gladyreigh Dela Cruz. References to "user" or "you" (or similar) are references to you as an individual or legal entity, as the case may be.
  </p>

  <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">What Information We May Collect from You</h3>
  <p className="mb-4">
    We may collect and process the following Information about you:
  </p>
  <ul className="list-disc pl-6 mb-4">
    <li>Information you provide by filling in forms on our Platform, including during registration, subscribing to our Services, posting material, or requesting further services.</li>
    <li>Information you provide when you enter competitions or promotions, provide reviews, testimonials, or feedback.</li>
    <li>Information when you report a problem with our Platform.</li>
    <li>A record of correspondence if you contact us.</li>
    <li>General, aggregated, demographic, and non-personal Information.</li>
    <li>If you download or use our mobile application, we may access details about your location and your mobile device, including a unique identifier.</li>
    <li>Details of transactions you carry out through our Platform and the fulfillment of your orders.</li>
    <li>Details about your computer, including your IP address, operating system, and browser type, as well as information about your general internet usage (e.g., Cookies).</li>
    <li>Your email address from a third party if you consent to that third party sharing your Information with us.</li>
    <li>Any other Information we consider necessary to enhance your experience on the Platform.</li>
  </ul>

  <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">How We Will Use Your Information</h3>
  <p className="mb-4">
    We may use Information held about you in the following ways:
  </p>
  <ul className="list-disc pl-6 mb-4">
    <li>To provide you with information, products, or services that you request or which may interest you, where you have consented to be contacted.</li>
    <li>To provide location-based services, such as advertising, search results, and other personalized content.</li>
    <li>To carry out our obligations arising from contracts between you and another entity using our Platform or between you and us.</li>
    <li>To improve our Services and deliver a better, more personalized service.</li>
    <li>To ensure that content from our Platform is presented effectively for you and your device.</li>
    <li>To notify you about changes to our Services.</li>
    <li>To administer and manage our incentives programs and fulfill requests for incentives, and/or to allow you to participate in sweepstakes and notify you if you win.</li>
  </ul>

  <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">To Whom We May Disclose Your Information</h3>
  <p className="mb-4">
    Information about our customers is an important part of our business. We share your Information only as described below:
  </p>
  <ul className="list-disc pl-6 mb-4">
    <li><strong>Other Businesses:</strong> To offer our Services, we may engage with businesses that are affiliates or non-affiliated service providers (e.g., logistics businesses, marketing companies, payment processors). These businesses may store your Information in a digital wallet to make your use of our Services more efficient. We ensure that these businesses do not use your Information for other purposes.</li>
    <li><strong>Marketing and Promotional Offers:</strong> We may use your Information to provide you with information about goods and services that may interest you, and to enhance your Platform experience. This may include contact via email, push notifications, web notifications, post, telephone, in-app messages, and news feed cards. We may also provide Information to advertisers to help them target specific audiences.</li>
    <li><strong>Business Transfers:</strong> In the event of a business acquisition or substantial asset transfer, customer information will be one of the transferred assets.</li>
    <li><strong>Protection of Our Platform and Others:</strong> We may release Information when we believe it is appropriate to comply with the law or protect the rights, property, or safety of our users or others, including exchanging information with other companies for fraud protection and credit risk reduction.</li>
  </ul>
  <p className="mb-4">
    Our Platform may contain links to partner networks, advertisers, and affiliates. If you follow a link to these websites, please review their privacy policies as we are not responsible for their practices.
  </p>

  <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">How We Store Your Information</h3>
  <p className="mb-4">
    The Information we collect may be transferred to, and stored at, destinations outside of the UAE and processed by staff operating outside the UAE. We will store your Information for as long as necessary to fulfill the purposes indicated in this Privacy Policy or as otherwise required by law. Your payment details may be transferred to and stored with our affiliated companies to process payments and provide support services.
  </p>

  <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">What Security Measures We Apply</h3>
  <p className="mb-4">
    We maintain reasonable technical, administrative, and physical safeguards to ensure your Information is treated securely and in accordance with this Privacy Policy. This includes using encryption technology, firewalls, and limiting access to authorized employees. However, transmission of information via the internet is not completely secure, and while we strive to protect your Information, any transmission is at your own risk.
  </p>

  <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">How You Can Access and Amend Your Information</h3>
  <p className="mb-4">
    You can access and update your account information and interactions with the Platform, including recent orders, personal information, payment settings, and email notification settings. You can opt-out of marketing communications at any time through customer communication preferences or by adjusting mobile application notification settings. Disabling Cookies may affect Platform functionality. We may retain a copy of your Information for compliance reasons.
  </p>

  <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">What If We Change Our Privacy Policy?</h3>
  <p className="mb-4">
    Our Privacy Policy may change as our business evolves. We will post the current version on the Platform, and changes will be effective upon posting or the date designated by us. We may send reminders, but you should check our Platform frequently for updates. Continued use of the Platform constitutes your agreement to the modified Privacy Policy.
  </p>

  <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">How You Can Contact Us</h3>
  <p className="mb-4">
    If you have any concerns about your Information on the Platform, please contact us at <a href="mailto:support@phonesale.org" className="text-[#1a2942] hover:underline">support@phonesale.org</a> with a thorough description, and we will try to resolve it.
  </p>
</section>

<section id="disclaimer" className="mb-8 sm:mb-12">
  <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2942] mb-4">Disclaimer Policy</h2>
  <p className="mb-4">
    If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at <a href="mailto:support@phonesale.org" className="text-[#1a2942] hover:underline">support@phonesale.org</a>.
  </p>

  <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Disclaimers for PhoneSale</h3>
  <p className="mb-4">
    All the information on this website - <a href="https://phonesale.org" className="text-[#1a2942] hover:underline">https://phonesale.org</a> - is published in good faith and for general information purposes only. PhoneSale does not make any warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information you find on this website (PhoneSale), is strictly at your own risk. PhoneSale will not be liable for any losses and/or damages in connection with the use of our website.
  </p>
  <p className="mb-4">
    From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone 'bad'.
  </p>
  <p className="mb-4">
    Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their "Terms of Service" before engaging in any business or uploading any information.
  </p>

  <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Consent</h3>
  <p className="mb-4">
    By using our website, you hereby consent to our disclaimer and agree to its terms.
  </p>

  <h3 className="text-xl sm:text-2xl font-bold text-[#1a2942] mb-2">Update</h3>
  <p className="mb-4">
    Should we update, amend or make any changes to this document, those changes will be prominently posted here.
  </p>
</section>

<div className="text-center py-8">
  <Link to="/" className="inline-block bg-[#1a2942] text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full font-bold transition-all duration-300 hover:bg-[#0e1624] hover:-translate-y-1 hover:shadow-lg">
    Back to Shop
  </Link>
</div>
</div>
</main>
);
};

export default Policy;