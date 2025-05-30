import React, { useState, useEffect } from 'react';
import { testimonials } from '../data/testimonials';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-electric-blue rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400 rounded-full filter blur-3xl opacity-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300">
            Trusted by businesses of all sizes to deliver exceptional technology solutions and services.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-electric-blue rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.95.78-3 .53-.81 1.24-1.52 2.13-2.13L9.44 6.22c-1.09.704-2.01 1.55-2.73 2.54-.82 1.11-1.23 2.2-1.23 3.28 0 1.02.2 1.9.61 2.64.4.73.97 1.3 1.71 1.7.74.42 1.54.63 2.4.63.45 0 .9-.07 1.34-.21.42-.14.8-.35 1.12-.63.45-.33.8-.73 1.06-1.22.25-.48.38-1 .38-1.58zm3 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.695-1.327-.824-.56-.13-1.07-.14-1.54-.03-.16-.95.1-1.95.78-3 .53-.8 1.24-1.51 2.13-2.12l-1.13-1.34c-1.09.7-2.01 1.55-2.73 2.54-.82 1.11-1.23 2.2-1.23 3.28 0 1.02.2 1.9.61 2.64.4.73.97 1.3 1.71 1.7.74.42 1.54.63 2.4.63.45 0 .9-.07 1.34-.21.42-.14.8-.35 1.12-.63.45-.33.8-.73 1.06-1.22.25-.48.38-1.01.38-1.59z" />
                </svg>
              </div>
            </div>

            <div className="pt-6">
              <p className="text-slate-700 dark:text-slate-200 text-lg md:text-xl mb-6 italic">
                "{testimonials[currentIndex].content}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 right-6 flex space-x-2">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-electric-blue hover:text-white transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-electric-blue hover:text-white transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full mx-1 ${
                currentIndex === index ? 'bg-electric-blue' : 'bg-slate-500'
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;