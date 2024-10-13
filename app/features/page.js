import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Palette, Droplet, Layers, Grid, Zap, Square, ArrowRight, ChevronDown, Table, LayoutGrid, Code } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: 'Features | ColorFusion',
  description: 'Discover the powerful features of ColorFusion for color manipulation and design.',
};

const FeatureItem = ({ title, description, icon: Icon, link, usage }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700">
    <Icon className="w-12 h-12 text-yellow-400 mb-4" />
    <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-300 mb-4">{description}</p>
    <div className="mb-4">
      <h4 className="text-lg font-semibold text-yellow-400 mb-2">How to use:</h4>
      <ul className="list-disc list-inside text-gray-300">
        {usage.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
    </div>
    <Link href={link} className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-300">
      Learn more <ArrowRight className="ml-2 w-4 h-4" />
    </Link>
  </div>
);

const FAQItem = ({ question, answer }) => (
  <AccordionItem value={question}>
    <AccordionTrigger className="text-left text-white hover:text-yellow-400">{question}</AccordionTrigger>
    <AccordionContent className="text-gray-300">{answer}</AccordionContent>
  </AccordionItem>
);

export default function Features() {
  return (
    <div className="bg-gray-900 min-h-screen text-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-yellow-400 to-yellow-200 text-transparent bg-clip-text">
          ColorFusion Features
        </h1>
        
        <div className="mb-16 text-center">
          <p className="text-xl mb-8 text-gray-300">
            ColorFusion is a comprehensive and innovative design toolkit, engineered to revolutionize your approach to color and design in your projects.
          </p>
          <Image 
            src="/img/preview colorfusion.gif" 
            alt="ColorFusion Preview" 
            width={800} 
            height={400} 
            className="rounded-lg shadow-lg mx-auto border-4 border-yellow-400"
          />
        </div>

        <div className="mb-16 bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center text-yellow-400">Tool Introduction</h2>
          <p className="text-lg text-gray-300 mb-4">
            ColorFusion is your all-in-one solution for color manipulation and design. Whether you're a seasoned designer or just starting out, our intuitive tools will help you create stunning color palettes, gradients, and more with ease.
          </p>
          <p className="text-lg text-gray-300">
            From generating trendy color schemes to converting between color formats, ColorFusion has everything you need to bring your creative visions to life.
          </p>
        </div>

        <div className="mb-16 bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center text-yellow-400">How to Use ColorFusion</h2>
          <ol className="list-decimal list-inside text-gray-300 space-y-2">
            <li>Choose the tool you want to use from our feature set.</li>
            <li>Follow the specific instructions for each tool (detailed in the feature descriptions below).</li>
            <li>Experiment with different settings and options to achieve your desired result.</li>
            <li>Copy the generated code or export your creation in your preferred format.</li>
            <li>Implement the results in your project or save them for later use.</li>
          </ol>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <FeatureItem
            title="Palette Generator"
            description="Create harmonious and trendy color palettes in an instant."
            icon={Palette}
            link="/trend-palette-generator"
            usage={[
              "Enter a starting color or use a Tailwind class.",
              "The tool automatically generates a harmonious palette.",
              "Copy colors, add to favorites, and export the palette."
            ]}
          />
          <FeatureItem
            title="Color Converter (ChromaSync)"
            description="Convert your colors between different formats with precision."
            icon={Droplet}
            link="/chroma-sync"
            usage={[
              "Enter a color in any format (HEX, RGB, HSL) or a Tailwind class.",
              "Instantly get the conversion in all other formats.",
              "Copy results and manage search history."
            ]}
          />
          <FeatureItem
            title="Tailwind Gradient Generator"
            description="Generate beautiful Tailwind CSS gradients effortlessly."
            icon={Layers}
            link="/tailwind-gradient-generator"
            usage={[
              "Choose start and end colors, gradient direction.",
              "Optionally add an intermediate color.",
              "Copy the generated Tailwind code directly into your project."
            ]}
          />
          <FeatureItem
            title="CSS Background Patterns"
            description="Create stunning CSS background patterns with ease."
            icon={Grid}
            link="/css-background-patterns"
            usage={[
              "Select a predefined pattern.",
              "Customize colors, opacity, and spacing.",
              "View the result in real-time and copy the generated CSS code."
            ]}
          />
          <FeatureItem
            title="Blob Composition"
            description="Design and customize unique blob shapes for your projects."
            icon={Zap}
            link="/blob-composition"
            usage={[
              "Adjust parameters such as size, complexity, and color.",
              "Animate the blob if desired.",
              "Export the result as SVG or GIF and copy the generated code."
            ]}
          />
          <FeatureItem
            title="Tailwind Shadow Generator"
            description="Generate custom Tailwind CSS shadow classes with ease."
            icon={Square}
            link="/tailwind-shadow-generator"
            usage={[
              "Modify shadow parameters (offset, blur, spread, color) using sliders.",
              "View the result in real-time.",
              "Copy the generated Tailwind class and equivalent CSS code."
            ]}
          />
          <FeatureItem
            title="Tailwind Table Generator"
            description="Generate Tailwind CSS tables with ease."
            icon={Table}
            link="/tailwind-table-generator"
            usage={[
              "Customize table properties like width, height, and text alignment.",
              "Set colors for header, body, and text.",
              "Generate the table HTML and Tailwind CSS code."
            ]}
          />
          <FeatureItem
            title="Tailwind Grid Generator"
            description="Generate Tailwind CSS grids with ease."
            icon={LayoutGrid}
            link="/tailwind-grid-generator"
            usage={[
              "Customize grid properties like columns, rows, and gaps.",
              "Set colors for the grid and its cells.",
              "Generate the grid HTML and Tailwind CSS code."
            ]}
          />
          <FeatureItem
            title="Code Visualizer" 
            description="Visualize your code in a colorful and interactive way."
            icon={Code}
            link="/code-visualizer"
            usage={[
              "Enter your code snippet.",
              "The tool will visualize your code in a colorful and interactive way.",
              "Copy the generated code and use it in your project."
            ]}
          />
        </div>
        
        <div className="mb-16 text-center bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold mb-6 text-yellow-400">Export Your Creations</h2>
          <p className="text-xl mb-6 text-gray-300">
            With ColorFusion, you can export your creations in various formats:
          </p>
          <ul className="text-gray-300 mb-8 flex flex-wrap justify-center gap-4">
            <li className="bg-gray-700 px-4 py-2 rounded-full border border-yellow-400">CSS</li>
            <li className="bg-gray-700 px-4 py-2 rounded-full border border-yellow-400">Tailwind</li>
            <li className="bg-gray-700 px-4 py-2 rounded-full border border-yellow-400">Figma</li>
            <li className="bg-gray-700 px-4 py-2 rounded-full border border-yellow-400">SVG</li>
            <li className="bg-gray-700 px-4 py-2 rounded-full border border-yellow-400">GIF</li>
            <li className="bg-gray-700 px-4 py-2 rounded-full border border-yellow-400">PNG</li>
            <li className="bg-gray-700 px-4 py-2 rounded-full border border-yellow-400">JSON</li>
          </ul>
          <p className="text-xl text-gray-300">
            Plus, you can add colors to your favorites, reuse or delete previous color searches.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center text-yellow-400">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            <FAQItem 
              question="Is ColorFusion free to use?"
              answer="Yes, ColorFusion is completely free to use for all its core features. We may introduce premium features in the future, but our goal is to keep the main toolkit accessible to everyone."
            />
            <FAQItem 
              question="Can I use ColorFusion for commercial projects?"
              answer="Absolutely! You're welcome to use ColorFusion for both personal and commercial projects. We'd appreciate a credit or mention, but it's not required."
            />
            <FAQItem 
              question="How often are new features added?"
              answer="We're constantly working on improving ColorFusion and adding new features. We typically release updates every 4-6 weeks, but major features might take longer to develop and test thoroughly."
            />
            <FAQItem 
              question="Is there a limit to how many palettes or designs I can create?"
              answer="There's no limit to the number of palettes, gradients, or designs you can create with ColorFusion. Create to your heart's content!"
            />
            <FAQItem 
              question="Can I integrate ColorFusion tools into my own website or application?"
              answer="While we don't currently offer an API for direct integration, you're welcome to link to our tools from your site. If you're interested in deeper integration options, please contact us to discuss potential solutions."
            />
          </Accordion>
        </div>
      </div>
    </div>
  );
}