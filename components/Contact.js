import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, Globe, Phone, Coffee, MapPin } from "lucide-react";
import Modal from "./Modal";

const ContactItem = ({ icon: Icon, href, label, value }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
    >
        <Icon size={24} className="text-yellow-400 mr-4" />
        <div>
            <p className="font-semibold text-gray-200">{label}</p>
            <p className="text-gray-400">{value}</p>
        </div>
    </motion.a>
);

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [modalState, setModalState] = useState({ isOpen: false, title: "", message: "", isError: false });

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
                    formType: 'contact' // Ajout du type de formulaire
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setModalState({
                    isOpen: true,
                    title: "Message Sent!",
                    message: "Thank you for reaching out. We'll get back to you soon!",
                    isError: false,
                });
                setFormData({ name: "", email: "", message: "" });
            } else {
                throw new Error(data.error || "Failed to send message");
            }
        } catch (error) {
            console.error("Error:", error);
            setModalState({
                isOpen: true,
                title: "Error",
                message: `Failed to send the message: ${error.message}`,
                isError: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-gray-200 px-4 py-12"
        >
            <motion.h1
                className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-yellow-200 text-transparent bg-clip-text"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Contact Us
            </motion.h1>

            <motion.p
                className="text-xl mb-12 text-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                Have questions or suggestions about ColorFusion? We'd love to hear from you! Here's how you can reach out:
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <ContactItem
                    icon={Mail}
                    href="mailto:contact@ndiagandiaye.com"
                    label="Email"
                    value="contact@ndiagandiaye.com"
                />
                <ContactItem
                    icon={Phone}
                    href="https://wa.me/221781633419"
                    label="WhatsApp"
                    value="+221 78 163 34 19"
                />
                <ContactItem
                    icon={Globe}
                    href="https://ndiagandiaye.com"
                    label="Website"
                    value="ndiagandiaye.com"
                />
                <ContactItem
                    icon={Linkedin}
                    href="https://www.linkedin.com/in/ndiagandiaye"
                    label="LinkedIn"
                    value="Ndiaga Ndiaye"
                />
            </div>

            <form onSubmit={handleSubmit} className="mb-12 bg-gray-800 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Send us a message</h2>
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
                            Send Message
                        </>
                    )}
                </motion.button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <motion.section
                    className="text-center bg-gray-800 p-6 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Support the Project</h2>
                    <p className="mb-6">
                        If you find ColorFusion helpful, consider supporting its development. Your contribution keeps the project alive!
                    </p>
                    <a
                        href="https://www.buymeacoffee.com/njaga"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-2 bg-yellow-400 text-gray-900 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-colors duration-300"
                    >
                        <Coffee className="mr-2" size={20} />
                        Buy me a coffee
                    </a>
                </motion.section>

                <motion.section
                    className="text-center bg-gray-800 p-6 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Get Involved</h2>
                    <p className="mb-6">
                        ColorFusion is open-source. We welcome contributions, feedback, and suggestions from the community!
                    </p>
                    <a
                        href="https://github.com/njaga/colorfusion"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-2 bg-yellow-400 text-gray-900 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-colors duration-300"
                    >
                        <Github className="mr-2" size={20} />
                        View on GitHub
                    </a>
                </motion.section>
            </div>

            <Modal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ ...modalState, isOpen: false })}
                title={modalState.title}
                message={modalState.message}
                isError={modalState.isError}
            />
        </motion.div>
    );
};

export default Contact;
