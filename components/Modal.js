// components/Modal.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, message, isError }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className={`bg-white p-6 rounded-lg shadow-xl max-w-md w-full ${isError ? 'border-red-500' : 'border-green-500'} border-t-4`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-2xl font-bold ${isError ? 'text-red-500' : 'text-green-500'}`}>{title}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-700">{message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;