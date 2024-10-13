"use client";

import React, { useState } from 'react';
import Modal from '@/components/Modal';

const NewsletterForm = ({ emailSubject, sendConfirmation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '', isError: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message: 'Newsletter subscription',
          subject: emailSubject,
          formType: 'newsletter'
        }),
      });

      if (response.ok) {
        setModalState({
          isOpen: true,
          title: 'Success!',
          message: 'Thank you for subscribing to our newsletter! Get ready for exclusive design tips and ColorFusion updates.',
          isError: false
        });
        setName('');
        setEmail('');
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      console.error('Error:', error);
      setModalState({
        isOpen: true,
        title: 'Error',
        message: 'Oops! Something went wrong. Please try again or contact our support team.',
        isError: true
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 rounded-full text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-full text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <button
          type="submit"
          className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors duration-300"
        >
          Join the Community
        </button>
      </form>
      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        message={modalState.message}
        isError={modalState.isError}
      />
    </>
  );
};

export default NewsletterForm;
