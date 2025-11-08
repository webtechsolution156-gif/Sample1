import React, { useState } from 'react';
import contactImage from '../assets/hero.jpg'; // Ensure path is correct

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    const template = `*New Website Inquiry*%0A` +
      `Dear Ravindra Kumar Team,%0A` +
      `A new contact form submission has been received. Please review the details below:%0A` +
      `----------------------------------------%0A`;

    const userData = `*Name*: ${formData.name}%0A` +
      `*Email*: ${formData.email}%0A` +
      `*Subject*: ${formData.subject}%0A` +
      `*Message*: ${formData.message}%0A` +
      `----------------------------------------%0A` +
      `Thank you for your attention!`;

    const whatsappNumber = '+919060804572';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(template + userData)}`;

    window.open(whatsappUrl, '_blank');
    setTimeout(() => {
      alert('Your inquiry has been opened in WhatsApp. Please click "Send" to complete submission.');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 500);
  };

  return (
    <div className="font-sans text-gray-900 bg-gradient-to-br from-white to-teal-50 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-80 md:h-[500px] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url(${contactImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-700/80 to-blue-600/80 hover:from-teal-700/70 hover:to-blue-600/70 transition-all duration-700 ease-in-out"></div>
        <h1 className="relative z-10 text-4xl md:text-6xl font-serif font-extrabold text-white tracking-tight animate-pulse-slow">
          Connect With Us
        </h1>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 py-20 md:py-28 flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
        {/* Left: Contact Info */}
        <div className="lg:w-2/3 space-y-10 animate-slide-in-left">
          <h2
            className="text-3xl md:text-5xl font-serif font-extrabold text-teal-600 relative after:content-[''] after:absolute after:bottom-[-12px] after:left-0 after:w-20 after:h-1.5 after:bg-teal-500 after:transition-all after:duration-500 hover:after:w-32"
            aria-label="Reach Our Team"
          >
            Reach Our Team
          </h2>

          <div className="border-l-4 border-teal-500 pl-6 bg-gradient-to-br from-white to-teal-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            <p className="text-lg leading-relaxed text-gray-600">
              We're here to assist you with your inquiries about our premium{' '}
              <span className="font-bold text-teal-500">Indian agricultural products</span>. Whether it's about exports, partnerships, or product details, our team is ready to help.
            </p>
          </div>

          <div className="space-y-8">
            {/* Email */}
            <div className="transition-transform duration-300 hover:translate-x-3">
              <h4 className="font-semibold text-sm uppercase tracking-widest text-gray-500 mb-2">Email Address</h4>
              <p className="text-lg font-medium">
                <a
                  href="mailto:ravindra906080@gmail.com"
                  className="text-teal-500 hover:text-teal-600 transition-colors duration-300"
                  aria-label="Email us at ravindra906080@gmail.com"
                >
                  ravindra906080@gmail.com
                </a>
              </p>
            </div>

            {/* Phone Numbers */}
            <div className="transition-transform duration-300 hover:translate-x-3">
              <h4 className="font-semibold text-sm uppercase tracking-widest text-gray-500 mb-2">Phone Numbers</h4>
              <p className="text-lg font-medium space-y-2">
                <a
                  href="tel:+919060804572"
                  className="block text-teal-500 hover:text-teal-600 transition-colors duration-300"
                  aria-label="Call us at +91 90608 04572"
                >
                  +91 90608 04572
                </a>
                <a
                  href="tel:+919304912554"
                  className="block text-teal-500 hover:text-teal-600 transition-colors duration-300"
                  aria-label="Call us at +91 93049 12554"
                >
                  +91 93049 12554
                </a>
              </p>
            </div>

            {/* Address */}
            <div className="transition-transform duration-300 hover:translate-x-3">
              <h4 className="font-semibold text-sm uppercase tracking-widest text-gray-500 mb-2">Office Address</h4>
              <p className="text-lg leading-relaxed text-gray-700">
                0, Basobar Road, Hanuman Mandir, DARU, Basobar, Hazaribag, Jharkhand-825313
              </p>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:w-1/3 w-full space-y-10 animate-slide-in-right">
          <div className="bg-gradient-to-br from-gray-800 to-teal-900 text-white p-8 rounded-2xl shadow-lg hover:shadow-[0_0_30px_rgba(45,212,191,0.5)] transition-all duration-500 transform hover:-translate-y-1">
            <h2
              className="text-3xl md:text-4xl font-serif font-bold text-teal-400 mb-6 tracking-tight"
              aria-label="Send Your Inquiry"
            >
              Send Your Inquiry
            </h2>
            <div className="flex flex-col gap-6">
              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full border ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl p-4 text-base text-gray-900 bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:shadow-md`}
                  aria-label="Enter your name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="absolute text-sm text-red-500 mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full border ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl p-4 text-base text-gray-900 bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:shadow-md`}
                  aria-label="Enter your email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="absolute text-sm text-red-500 mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
              {/* Subject */}
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject (e.g., Export Inquiry, Partnership)"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full border ${
                    errors.subject ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl p-4 text-base text-gray-900 bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:shadow-md`}
                  aria-label="Enter the subject of your inquiry"
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {errors.subject && (
                  <p id="subject-error" className="absolute text-sm text-red-500 mt-1">
                    {errors.subject}
                  </p>
                )}
              </div>
              {/* Message */}
              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`w-full border ${
                    errors.message ? 'border-red-500' : 'border-gray-200'
                  } rounded-xl p-4 text-base text-gray-900 bg-white/90 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 hover:shadow-md resize-y`}
                  aria-label="Enter your message"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                ></textarea>
                {errors.message && (
                  <p id="message-error" className="absolute text-sm text-red-500 mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`relative bg-teal-500 text-white px-8 py-4 rounded-full font-semibold uppercase tracking-wider shadow-lg hover:bg-teal-600 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 group ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Send your inquiry"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300"></span>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Map Section */}
      <div className="w-full h-[500px] md:h-[700px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14577.420235884436!2d85.53233093955079!3d24.018541400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f481389e0b154f%3A0x9e74e70fb6ab51db!2sBasobar%20Mandir!5e0!3m2!1sen!2sin!4v1760007599609!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          title="Office Location Map"
          className="rounded-none"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
