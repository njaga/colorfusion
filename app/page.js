"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Palette,
  Droplet,
  Globe,
  Linkedin,
  Github,
  Layers,
  Grid,
  Zap,
  Square,
  ArrowRight,
  Coffee,
  Users,
  Star,
  LayoutGrid,
} from "lucide-react";
import Modal from "@/components/Modal";
import NewsletterForm from "@/components/NewsletterForm";

// Définition du composant FeatureBox
const FeatureBox = ({ title, description, link, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-900 hover:text-white group">
    <Icon className="w-12 h-12 text-yellow-400 mb-4 group-hover:text-white transition-colors duration-300" />
    <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-300">{title}</h3>
    <p className="text-gray-600 mb-4 group-hover:text-gray-300 transition-colors duration-300">{description}</p>
    <Link
      href={link}
      className="text-yellow-500 hover:text-yellow-400 font-medium inline-flex items-center group-hover:text-yellow-400 transition-colors duration-300"
    >
      En savoir plus <ArrowRight className="ml-2 w-4 h-4" />
    </Link>
  </div>
);

// Définition du composant InfoSection
const InfoSection = ({
  title,
  description,
  imageSrc,
  imageAlt,
  features,
  link,
  linkText,
  imageOnLeft,
}) => (
  <section className="w-full bg-gray-100 py-20">
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className={`flex flex-col ${imageOnLeft ? "lg:flex-row" : "lg:flex-row-reverse"
          } items-center justify-center`}
      >
        <div className="lg:w-1/2 mb-8 lg:mb-0 max-w-2xl">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={600}
            height={400}
            className="rounded-lg shadow-xl w-full h-auto"
          />
        </div>
        <div className="lg:w-1/2 lg:px-12 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{title}</h2>
          <p className="text-gray-600 mb-6">{description}</p>
          <ul className="mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center mb-2">
                <ArrowRight className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Link
            href={link}
            className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-colors duration-300 inline-flex items-center"
          >
            {linkText} <ArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Hero Section */}
      <section className=" bg-gradient-to-b from-gray-900 to-gray-800 text-white py-24">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0 max-w-2xl">
            <motion.h1
              className="text-5xl sm:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-yellow-400"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Design with Ease, Create with Precision
            </motion.h1>
            <motion.p
              className="text-gray-300 mb-8 text-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Unleash your creativity with ColorFusion: vibrant palettes, unique patterns, and gradients. Join thousands of designers who draw daily inspiration from it.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="/trend-palette-generator"
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-colors duration-300 inline-flex items-center"
              >
                Start Creating <ArrowRight className="ml-2" />
              </Link>
            </motion.div>
          </div>
          <div className="lg:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-2xl">
              <Image
                src="/img/bobgeneration.png"
                alt="ColorFusion Preview"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <main className="flex-grow flex flex-col justify-center items-center">
        {/* Feature Grid */}
        <section className="w-full bg-white py-20">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
              Unlock Your Creative Potential
            </h2>
            <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              ColorFusion offers a comprehensive suite of tools designed to
              streamline your workflow and inspire your creativity. Explore our
              features and take your designs to the next level.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              <FeatureBox
                title="Trend Palette Generator"
                description="Create harmonious and trendy color palettes instantly. Stay ahead of design trends with AI-powered suggestions."
                link="/trend-palette-generator"
                icon={Palette}
              />
              <FeatureBox
                title="ChromaSync"
                description="Seamlessly convert colors between formats and sync with Tailwind classes. Perfect for developers and designers alike."
                link="/chroma-sync"
                icon={Droplet}
              />
              <FeatureBox
                title="Tailwind Gradient Generator"
                description="Design stunning gradients with our intuitive Tailwind CSS generator. Enhance your web projects effortlessly."
                link="/tailwind-gradient-generator"
                icon={Layers}
              />
              <FeatureBox
                title="CSS Background Patterns"
                description="Create eye-catching CSS background patterns in seconds. Add depth and interest to your designs with ease."
                link="/css-background-patterns"
                icon={Grid}
              />
              <FeatureBox
                title="Blob Composition"
                description="Design and customize unique blob shapes for your projects. Perfect for creating modern, organic designs."
                link="/blob-composition"
                icon={Zap}
              />
              <FeatureBox
                title="Tailwind Shadow Generator"
                description="Generate custom Tailwind CSS shadow classes with our intuitive tool. Add depth and dimension to your UI elements."
                link="/tailwind-shadow-generator"
                icon={Square}
              />
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/features"
                className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-300 transition-colors duration-300 inline-flex items-center"
              >
                Explore All Features <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Info Sections */}
        <InfoSection
          title="Experience the Power of ColorFusion"
          description="Watch how easily you can create stunning color palettes, generate unique patterns, and design beautiful gradients with ColorFusion. Our intuitive interface makes professional-level design accessible to everyone, from beginners to seasoned pros."
          imageSrc="/img/grid-generator.gif"
          imageAlt="ColorFusion Demo"
          features={[
            "Intuitive tools for rapid prototyping and design",
            "Time-saving features to boost your productivity",
            "Seamless integration with popular design workflows",
          ]}
          link="/about"
          linkText="Discover Our Story"
          imageOnLeft={true}
        />

        <InfoSection
          title="Streamline Your Design Workflow"
          description="ColorFusion's suite of tools is designed to integrate seamlessly into your existing workflow. From concept to implementation, we've got you covered with features that save time and enhance creativity."
          imageSrc="/img/table-generator.gif"
          imageAlt="Design Workflow"
          features={[
            "Easy export options for various design software",
            "Quick copy-paste functionality for code snippets",
            "Collaborative features for team projects",
          ]}
          link="/features"
          linkText="Explore All Features"
          imageOnLeft={false}
        />

        <InfoSection
          title="Stay on Top of Design Trends"
          description="With ColorFusion, you're always ahead of the curve. Our AI-powered trend analysis ensures that your color palettes and designs are always fresh and contemporary."
          imageSrc="/img/color-converter.gif"
          imageAlt="Design Trends"
          features={[
            "AI-curated color palettes based on current trends",
            "Regular updates with new design patterns and gradients",
            "Insights into upcoming color trends in various industries",
          ]}
          link="/trend-palette-generator"
          linkText="Try Trend Palette Generator"
          imageOnLeft={true}
        />

        <InfoSection
          title="Empower Your Creativity"
          description="Whether you're a professional designer or just starting out, ColorFusion provides the tools you need to bring your creative vision to life. Our user-friendly interface and powerful features cater to all skill levels."
          imageSrc="/img/preview patterns.gif"
          imageAlt="Creative Design"
          features={[
            "Customizable tools to fit your unique design style",
            "Inspiration gallery featuring community creations",
            "Tutorials and resources to enhance your design skills",
          ]}
          link="/community"
          linkText="Join Our Creative Community"
          imageOnLeft={false}
        />

        {/* Testimonials Section */}
        <section className="w-full bg-white py-20">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
              What Designers Say
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-100 p-6 rounded-lg shadow">
                <p className="text-gray-600 mb-4">
                  "ColorFusion has revolutionized my design process. The palette
                  generator saves me hours of work!"
                </p>
                <p className="font-semibold text-gray-800">
                  - Sarah J., UX Designer
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow">
                <p className="text-gray-600 mb-4">
                  "As a developer, the Tailwind integration is a game-changer.
                  ColorFusion bridges the gap between design and code."
                </p>
                <p className="font-semibold text-gray-800">
                  - Mike T., Full-Stack Developer
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow">
                <p className="text-gray-600 mb-4">
                  "The CSS pattern generator is my go-to for creating unique
                  backgrounds. It's both powerful and easy to use."
                </p>
                <p className="font-semibold text-gray-800">
                  - Emma L., Graphic Designer
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="w-full bg-white text-white pt-4 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 max-w-xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-yellow-400 text-center">
                Stay Ahead of Design Trends
              </h2>
              <p className="text-gray-300 mb-6 text-center">
                Subscribe to our newsletter for exclusive design tips, ColorFusion updates, and early access to new features. Join our community of designers and developers!
              </p>
              <NewsletterForm emailSubject="Register newsletter ColorFusion" sendConfirmation={true} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;