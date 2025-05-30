import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center bg-slate-900 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-electric-blue rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-teal-400 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Next-Gen Technology{' '}
              <span className="text-electric-blue">Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              Cutting-edge hardware, expert technical services, and comprehensive cybersecurity solutions for businesses of all sizes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/products"
                className="px-8 py-3 bg-electric-blue text-white font-semibold rounded-md hover:bg-blue-600 transition-all duration-300 flex items-center justify-center"
              >
                Explore Products
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link
                to="/services"
                className="px-8 py-3 bg-transparent border-2 border-electric-blue text-electric-blue font-semibold rounded-md hover:bg-electric-blue hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                Our Services
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="NSTNT Technology"
                className="rounded-lg shadow-2xl relative z-10 max-w-lg mx-auto"
              />
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-teal-400 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;