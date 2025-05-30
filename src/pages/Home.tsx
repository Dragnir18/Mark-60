import React from 'react';
import Hero from '../components/Hero';
import ProductsSection from '../components/ProductsSection';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <div className="bg-white dark:bg-slate-800 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose NSTNT
            </h2>
            <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-300">
              We deliver top-tier technology solutions with expert support and industry-leading security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-xl text-center transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-50 dark:bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Innovation</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Cutting-edge technology solutions that stay ahead of the curve in a rapidly evolving industry.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-xl text-center transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-50 dark:bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Security</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Enterprise-grade security systems and protocols to protect your valuable data and infrastructure.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-xl text-center transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-50 dark:bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Expert Support</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Dedicated technical support from industry experts who understand your business needs.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ProductsSection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default Home;