import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Droplet, Layers, Grid, Zap, Square, Github, Linkedin, Mail, Globe, Phone, Coffee, Award, Users, Code, Heart, ChartBar } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const FeatureItem = ({ icon: Icon, title, description }) => (
  <motion.div 
    className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    whileHover={{ scale: 1.05 }}
  >
    <Icon className="text-yellow-400 mb-4" size={32} />
    <h3 className="text-xl font-semibold mb-2 text-gray-100">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

const ContactItem = ({ icon: Icon, href, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-300">
    <Icon size={24} className="mr-2" />
    <span>{label}</span>
  </a>
);

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto text-gray-200 px-4 sm:px-6 py-8 sm:py-12"
    >
      <motion.h1 
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-center bg-gradient-to-r from-yellow-400 to-yellow-200 text-transparent bg-clip-text"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About ColorFusion
      </motion.h1>
      
      <motion.section 
        className="mb-16"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="bg-gray-800 border-yellow-400">
          <CardContent className="p-6 text-gray-300">
            <p className="text-xl mb-6 text-center">
              ColorFusion is a comprehensive and innovative design toolkit meticulously crafted by Ndiaga Ndiaye, a passionate FullStack JavaScript developer and UI/UX designer with over a decade of experience in the field.
            </p>
            <p className="text-lg mb-8 text-center">
              This powerful suite of tools is designed to revolutionize the way creators approach color and design in their projects, offering a seamless blend of functionality and creativity.
            </p>
            <div className="flex justify-center space-x-4 flex-wrap mb-8">
              <ContactItem icon={Github} href="https://github.com/njaga" label="GitHub" />
              <ContactItem icon={Linkedin} href="https://www.linkedin.com/in/ndiagandiaye" label="LinkedIn" />
              <ContactItem icon={Mail} href="mailto:contact@ndiagandiaye.com" label="Email" />
              <ContactItem icon={Globe} href="https://ndiagandiaye.com" label="Website" />
              <ContactItem icon={Phone} href="https://wa.me/221781633419" label="WhatsApp" />
            </div>
          </CardContent>
        </Card>
      </motion.section>

      <section className="mb-16">
        <h2 className="text-4xl font-semibold mb-8 text-center text-yellow-400">Why Choose ColorFusion?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          <FeatureItem 
            icon={Palette} 
            title="All-in-One Solution" 
            description="Streamline your workflow with our comprehensive color and design toolkit."
          />
          <FeatureItem 
            icon={Users} 
            title="User-Friendly Interface" 
            description="Intuitive controls and helpful tooltips for both beginners and professionals."
          />
          <FeatureItem 
            icon={Zap} 
            title="Time-Saving Tools" 
            description="Speed up your design process and focus on creativity."
          />
          <FeatureItem 
            icon={Layers} 
            title="Always Up-to-Date" 
            description="Reflects the latest design trends and color theories."
          />
          <FeatureItem 
            icon={Code} 
            title="Open-Source" 
            description="Welcomes contributions and feedback from the design community."
          />
          <FeatureItem 
            icon={ChartBar} 
            title="Performance Insights" 
            description="Uses analytics to continuously improve user experience."
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-4xl font-semibold mb-6 text-center text-yellow-400">Terms of Use</h2>
        <Card className="bg-gray-800 border-yellow-400">
          <CardContent className="p-6 text-gray-300">
            <p className="text-center mb-4">
              ColorFusion is a free tool available for everyone to use freely. We encourage both personal and commercial use of our toolkit, aiming to support the creative community in their design endeavors.
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <Heart className="text-yellow-400 mr-2" size={18} />
                <span>Free for personal and commercial use</span>
              </li>
              <li className="flex items-center">
                <Heart className="text-yellow-400 mr-2" size={18} />
                <span>No attribution required (although appreciated)</span>
              </li>
              <li className="flex items-center">
                <Heart className="text-yellow-400 mr-2" size={18} />
                <span>Modifications and distributions are allowed under the same license</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-16">
        <h2 className="text-4xl font-semibold mb-6 text-center text-yellow-400">Privacy Policy</h2>
        <Card className="bg-gray-800 border-yellow-400">
          <CardContent className="p-6 text-gray-300">
            <p className="text-center mb-4">
              We value your privacy and are committed to protecting your personal information. ColorFusion operates with the following privacy principles:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <Heart className="text-yellow-400 mr-2" size={18} />
                <span>Minimal data collection: We use Google Analytics and Vercel Analytics to improve our service</span>
              </li>
              <li className="flex items-center">
                <Heart className="text-yellow-400 mr-2" size={18} />
                <span>No personal data storage: All color conversions and generations are performed client-side</span>
              </li>
              <li className="flex items-center">
                <Heart className="text-yellow-400 mr-2" size={18} />
                <span>Transparency: We're clear about our use of analytics for service improvement</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-6 text-yellow-400">Soutenez le Projet</h2>
        <p className="mb-8 text-xl">
          If you find ColorFusion helpful in your design journey, consider supporting the project. Your contribution helps keep the tools free, fuels future developments, and supports ongoing maintenance!
        </p>
        <a 
          href="https://www.buymeacoffee.com/njaga" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center px-8 py-3 bg-yellow-400 text-gray-900 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-colors duration-300"
        >
          <Coffee className="mr-2" size={24} />
          Buy me a coffee
        </a>
      </section>

      <section className="text-center">
        <h2 className="text-4xl font-semibold mb-6 text-yellow-400">Get Involved</h2>
        <p className="mb-8 text-xl">
          ColorFusion is an open-source project, and we welcome contributions from developers, designers, and enthusiasts! Whether you're fixing bugs, adding new features, or improving documentation, your input is valuable.
        </p>
        <a 
          href="https://github.com/njaga/colorfusion" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center px-8 py-3 bg-yellow-400 text-gray-900 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-colors duration-300"
        >
          <Github className="mr-2" size={24} />
          View on GitHub
        </a>
      </section>
    </motion.div>
  );
};

export default About;
