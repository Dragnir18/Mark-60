import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form logic would go here
    console.log(formData);
    alert('Thank you for your message! We will get back to you shortly.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <section className="py-16 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
            Have questions about our products or services? Reach out to our team for expert assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Mail className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Email Us
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">
                      contact@nstnt.tech
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Phone className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Call Us
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">
                      +33 (0)1 23 45 67 89
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Visit Us
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 mt-1">
                      123 Tech Boulevard, 75001 Paris, France
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-600">
                <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                  Business Hours
                </h4>
                <div className="space-y-2">
                  <p className="text-sm text-slate-600 dark:text-slate-300 flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-700 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                Send us a Message
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-electric-blue dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-electric-blue dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-electric-blue dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-electric-blue dark:bg-slate-800 dark:text-white resize-none"
                  />
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-electric-blue text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
                  >
                    Send Message
                    <Send size={16} className="ml-2" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;