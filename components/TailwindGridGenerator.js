import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check, Smartphone, Tablet, Laptop, Eye } from "lucide-react";
import { motion } from "framer-motion";

const TailwindGridGenerator = () => {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [gap, setGap] = useState(4);
  const [flowDirection, setFlowDirection] = useState('row');
  const [justifyContent, setJustifyContent] = useState('start');
  const [alignItems, setAlignItems] = useState('stretch');
  const [padding, setPadding] = useState(4);
  const [margin, setMargin] = useState(0);
  const [border, setBorder] = useState(0);
  const [itemClasses, setItemClasses] = useState('bg-yellow-100');
  const [customClasses, setCustomClasses] = useState('');
  const [copied, setCopied] = useState(false);
  const [previewMode, setPreviewMode] = useState('mobile');
  const [showSourceCode, setShowSourceCode] = useState({});

  const getRecommendedColumns = (mode) => {
    switch (mode) {
      case 'mobile': return 2;
      case 'tablet-portrait': return 4;
      case 'tablet-landscape': return 6;
      case 'desktop': return columns;
      default: return 2;
    }
  };

  const generateGridClass = () => {
    let gridClass = `grid grid-cols-${columns} grid-rows-${rows} gap-${gap}`;
    if (flowDirection !== 'row') gridClass += ` grid-flow-${flowDirection}`;
    if (justifyContent !== 'start') gridClass += ` justify-${justifyContent}`;
    if (alignItems !== 'stretch') gridClass += ` items-${alignItems}`;
    if (padding > 0) gridClass += ` p-${padding}`;
    if (margin > 0) gridClass += ` m-${margin}`;
    if (border > 0) gridClass += ` border-${border}`;
    if (customClasses) gridClass += ` ${customClasses}`;
    return gridClass.trim();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateGridClass());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyPresetToClipboard = (preset) => {
    navigator.clipboard.writeText(preset.class);
    // Vous pouvez ajouter ici une notification pour indiquer que le code a été copié
  };

  const PreviewContainer = ({ children, previewMode }) => {
    const recommendedColumns = getRecommendedColumns(previewMode);
    const actualColumns = Math.min(columns, recommendedColumns);

    return (
      <div className={`bg-white p-4 rounded-lg shadow-md overflow-hidden ${
        previewMode === 'mobile' ? 'w-full max-w-[256px]' :
        previewMode === 'tablet-portrait' ? 'w-full max-w-[384px]' :
        previewMode === 'tablet-landscape' ? 'w-full max-w-[768px]' :
        'w-full'
      }`}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${actualColumns}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
          className={generateGridClass()}
        >
          {children}
        </div>
      </div>
    );
  };

  const GridItem = ({ index }) => (
    <div className={`p-2 text-center shadow-md rounded-md flex items-center justify-center text-yellow-600 font-medium h-16 ${itemClasses}`}>
      {index + 1}
    </div>
  );

  const presets = [
    {
      name: "Simple Grid",
      class: "grid grid-cols-3 xl:grid-cols-5 gap-4 px-4 py-4",
      items: 12,
      itemClass: "w-full h-24 bg-purple-700 rounded-xl"
    },
    {
      name: "Simple Grid, Small Gaps",
      class: "grid grid-cols-3 xl:grid-cols-5 gap-2 px-4 py-4",
      items: 12,
      itemClass: "w-full h-24 bg-yellow-500 rounded-xl"
    },
    {
      name: "Spanning Columns",
      class: "grid grid-cols-3 xl:grid-cols-3 gap-4 px-4 py-4",
      items: 6,
      itemClass: (index) => `w-full h-24 ${index % 3 === 1 ? 'bg-blue-900 col-span-2' : 'bg-blue-600'} rounded-xl`
    },
    {
      name: "Spanning Rows",
      class: "grid grid-rows-3 grid-flow-col gap-4 px-4 py-4 leading-10",
      items: 3,
      itemClass: (index) => `p-4 w-full ${index === 0 ? 'bg-fuchsia-900 row-span-3' : index === 1 ? 'bg-fuchsia-800 col-span-2' : 'bg-fuchsia-700 row-span-2 col-span-2'} rounded-xl`
    }
  ];

  return (
    <div className="max-w-full mx-auto px-4">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tailwind Grid Generator
      </motion.h1>

      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Grid Structure</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="columns">Columns (1-12)</Label>
                  <Slider
                    id="columns"
                    min={1} max={12} step={1}
                    value={[columns]}
                    onValueChange={([value]) => setColumns(value)}
                  />
                  <span className="ml-2">{columns}</span>
                </div>
                <div>
                  <Label htmlFor="rows">Rows (1-12)</Label>
                  <Slider
                    id="rows"
                    min={1} max={12} step={1}
                    value={[rows]}
                    onValueChange={([value]) => setRows(value)}
                  />
                  <span className="ml-2">{rows}</span>
                </div>
                <div>
                  <Label htmlFor="gap">Gap</Label>
                  <Slider
                    id="gap"
                    min={0} max={16} step={1}
                    value={[gap]}
                    onValueChange={([value]) => setGap(value)}
                  />
                  <span className="ml-2">{gap}</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Alignment</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="flowDirection">Flow Direction</Label>
                  <Select value={flowDirection} onValueChange={setFlowDirection}>
                    <SelectTrigger id="flowDirection">
                      <SelectValue placeholder="Select flow direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="row">Row</SelectItem>
                      <SelectItem value="col">Column</SelectItem>
                      <SelectItem value="dense">Dense</SelectItem>
                      <SelectItem value="row-dense">Row Dense</SelectItem>
                      <SelectItem value="col-dense">Column Dense</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="justifyContent">Justify Content</Label>
                  <Select value={justifyContent} onValueChange={setJustifyContent}>
                    <SelectTrigger id="justifyContent">
                      <SelectValue placeholder="Select justify content" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="start">Start</SelectItem>
                      <SelectItem value="end">End</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="between">Space Between</SelectItem>
                      <SelectItem value="around">Space Around</SelectItem>
                      <SelectItem value="evenly">Space Evenly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="alignItems">Align Items</Label>
                  <Select value={alignItems} onValueChange={setAlignItems}>
                    <SelectTrigger id="alignItems">
                      <SelectValue placeholder="Select align items" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="start">Start</SelectItem>
                      <SelectItem value="end">End</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="stretch">Stretch</SelectItem>
                      <SelectItem value="baseline">Baseline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Spacing & Borders</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="padding">Padding</Label>
                  <Slider
                    id="padding"
                    min={0} max={16} step={1}
                    value={[padding]}
                    onValueChange={([value]) => setPadding(value)}
                  />
                  <span className="ml-2">{padding}</span>
                </div>
                <div>
                  <Label htmlFor="margin">Margin</Label>
                  <Slider
                    id="margin"
                    min={0} max={16} step={1}
                    value={[margin]}
                    onValueChange={([value]) => setMargin(value)}
                  />
                  <span className="ml-2">{margin}</span>
                </div>
                <div>
                  <Label htmlFor="border">Border</Label>
                  <Slider
                    id="border"
                    min={0} max={8} step={1}
                    value={[border]}
                    onValueChange={([value]) => setBorder(value)}
                  />
                  <span className="ml-2">{border}</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Item Classes</h2>
              <Input
                value={itemClasses}
                onChange={(e) => setItemClasses(e.target.value)}
                placeholder="Add Tailwind classes for grid items"
              />
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Custom Classes</h2>
              <Input
                value={customClasses}
                onChange={(e) => setCustomClasses(e.target.value)}
                placeholder="Add custom Tailwind classes"
              />
            </section>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Preview</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <Button onClick={() => setPreviewMode('mobile')} variant={previewMode === 'mobile' ? 'default' : 'outline'} className="flex-grow sm:flex-grow-0">
                <Smartphone className="mr-2 h-4 w-4" />
                Mobile
              </Button>
              <Button onClick={() => setPreviewMode('tablet-portrait')} variant={previewMode === 'tablet-portrait' ? 'default' : 'outline'} className="flex-grow sm:flex-grow-0">
                <Tablet className="mr-2 h-4 w-4" />
                Tablet (Portrait)
              </Button>
              <Button onClick={() => setPreviewMode('tablet-landscape')} variant={previewMode === 'tablet-landscape' ? 'default' : 'outline'} className="flex-grow sm:flex-grow-0">
                <Tablet className="mr-2 h-4 w-4 rotate-90" />
                Tablet (Landscape)
              </Button>
              <Button onClick={() => setPreviewMode('desktop')} variant={previewMode === 'desktop' ? 'default' : 'outline'} className="flex-grow sm:flex-grow-0">
                <Laptop className="mr-2 h-4 w-4" />
                Desktop
              </Button>
            </div>
            <div className="overflow-x-auto">
              <PreviewContainer previewMode={previewMode}>
                {Array.from({ length: columns * rows }).map((_, index) => (
                  <GridItem key={index} index={index} />
                ))}
              </PreviewContainer>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Tailwind Class</h2>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm break-all">
            {generateGridClass()}
          </div>
          <Button onClick={copyToClipboard} className="mt-4">
            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            {copied ? "Copied!" : "Copy Grid Class"}
          </Button>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Presets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {presets.map((preset, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{preset.name}</h3>
                <div className={preset.class}>
                  {Array.from({ length: preset.items }).map((_, itemIndex) => (
                    <div key={itemIndex} className={typeof preset.itemClass === 'function' ? preset.itemClass(itemIndex) : preset.itemClass}></div>
                  ))}
                </div>
                <div className="mt-2 space-x-2">
                  <Button onClick={() => setShowSourceCode(prev => ({ ...prev, [index]: !prev[index] }))}>
                    {showSourceCode[index] ? <Eye className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                    {showSourceCode[index] ? "Hide source code" : "Show source code"}
                  </Button>
                  <Button onClick={() => copyPresetToClipboard(preset)}>
                    {copied[index] ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copied[index] ? "Copied!" : "Copy to clipboard"}
                  </Button>
                </div>
                {showSourceCode[index] && (
                  <pre className="mt-2 bg-gray-100 p-2 rounded overflow-x-auto">
                    <code>{preset.class}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailwindGridGenerator;