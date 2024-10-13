'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Lightbulb, Rocket, Star, Heart, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Modal from './Modal';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    whileHover={{ scale: 1.05 }}
  >
    <div className="flex items-center mb-4">
      <div className="bg-yellow-400 p-3 rounded-full mr-4">
        <Icon className="text-gray-800" size={24} />
      </div>
      <h3 className="text-xl font-semibold text-yellow-400">{title}</h3>
    </div>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

export default function Community() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '', isError: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: "Join ColorFusion Community",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalState({
          isOpen: true,
          title: "Success!",
          message: "Your message has been sent successfully. Welcome to the ColorFusion community!",
          isError: false,
        });
        setFormData({ name: "", email: "", message: "" });
        setIsModalOpen(false);

        // Send confirmation email
        await fetch("/api/send-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      setModalState({
        isOpen: true,
        title: "Error",
        message: `Failed to send message: ${error.message}`,
        isError: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-4"
      >
        <motion.h1 
          className="text-6xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-yellow-200 text-transparent bg-clip-text"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Join the ColorFusion Community
        </motion.h1>
        
        <motion.section 
          className="mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="bg-gray-800 border-yellow-400">
            <CardContent className="p-8 text-gray-300">
              <p className="text-xl mb-6 text-center">
                Dive into a universe of creativity and innovation with the ColorFusion community. Together, we push the boundaries of design and color.
              </p>
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-colors duration-300"
                  onClick={() => setIsModalOpen(true)}
                >
                  Join the community
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-center text-yellow-400">Why join us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Users} 
              title="Creative Network" 
              description="Connect with passionate designers and developers from around the world."
            />
            <FeatureCard 
              icon={MessageSquare} 
              title="Idea Sharing" 
              description="Exchange innovative concepts and get valuable feedback on your projects."
            />
            <FeatureCard 
              icon={Lightbulb} 
              title="Continuous Inspiration" 
              description="Discover new trends and techniques to stimulate your creativity."
            />
            <FeatureCard 
              icon={Rocket} 
              title="Rapid Growth" 
              description="Accelerate your professional development through community resources and challenges."
            />
            <FeatureCard 
              icon={Star} 
              title="Recognition" 
              description="Gain visibility and get noticed for your exceptional contributions."
            />
            <FeatureCard 
              icon={Heart} 
              title="Mutual Support" 
              description="Benefit from a caring environment where mutual help is the norm."
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-center text-yellow-400">How to participate?</h2>
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
            <ol className="space-y-6 text-gray-300">
              <li className="flex items-start">
                <span className="bg-yellow-400 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">1</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-yellow-400">Contact Us</h3>
                  <p>Reach out to us via email, LinkedIn, or WhatsApp to express your interest in joining the community.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-yellow-400 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">2</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-yellow-400">Share Your Ideas</h3>
                  <p>Tell us about your vision for the community and how you'd like to contribute.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-yellow-400 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">3</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-yellow-400">Help Shape the Community</h3>
                  <p>Work with us to establish the foundation and structure of the ColorFusion community.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-yellow-400 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">4</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-yellow-400">Stay Tuned</h3>
                  <p>Keep an eye out for updates as we develop and launch the community platform together.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-4xl font-semibold mb-6 text-yellow-400">Ready to join us?</h2>
          <p className="mb-8 text-xl text-gray-300">
            Be part of a dynamic community that pushes the boundaries of creativity and design.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-gray-900 px-12 py-4 rounded-full text-xl font-bold hover:bg-yellow-300 transition-colors duration-300 shadow-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Start the journey
          </motion.button>
        </section>
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Join the community</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors duration-300"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  className={`inline-flex items-center px-6 py-2 bg-yellow-400 text-gray-900 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-colors duration-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={20} />
                      Send
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        message={modalState.message}
        isError={modalState.isError}
      />
    </div>
  );
}
