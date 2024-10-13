import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, FileDown } from "lucide-react";
import { motion } from "framer-motion";

const TailwindTableGenerator = () => {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(2);
  const [lineHeight, setLineHeight] = useState(5);
  const [lineHeightHeader, setLineHeightHeader] = useState(1);
  const [tableWidth, setTableWidth] = useState(7);
  const [border, setBorder] = useState(true);
  const [roundedCorners, setRoundedCorners] = useState(true);
  const [fixedWidth, setFixedWidth] = useState(true);
  const [fontSize, setFontSize] = useState(3);
  const [headerBgColor, setHeaderBgColor] = useState('#6b7280');
  const [headerTextColor, setHeaderTextColor] = useState('#e5e7eb');
  const [bodyBgColor, setBodyBgColor] = useState('#FFFFFF');
  const [bodyTextColor, setBodyTextColor] = useState('#6b7280');
  const [uppercaseHeader, setUppercaseHeader] = useState(true);
  const [centerText, setCenterText] = useState(true);
  const [boldHeader, setBoldHeader] = useState(true);

  const generateTableHTML = useCallback(() => {
    let tableClass = `table-${fixedWidth ? 'fixed' : 'auto'} w-full text-left`;
    if (roundedCorners) tableClass += ' rounded-lg overflow-hidden';
    if (border) tableClass += ' border-collapse';

    let headerClass = `${uppercaseHeader ? 'uppercase' : ''} ${boldHeader ? 'font-bold' : ''}`;
    let cellClass = `py-${lineHeight} ${border ? 'border' : ''} ${centerText ? 'text-center' : ''} p-4`;
    let headerCellClass = `py-${lineHeightHeader} ${border ? 'border' : ''} ${centerText ? 'text-center' : ''} p-4`;

    return `
<div class="relative overflow-hidden shadow-md rounded-lg">
  <table class="${tableClass}">
    <thead class="${headerClass} bg-[${headerBgColor}] text-[${headerTextColor}]" style="background-color: ${headerBgColor}; color: ${headerTextColor};">
      <tr>
        ${Array(columns).fill().map((_, i) => `<td class="${headerCellClass}" contenteditable="true">Header ${i + 1}</td>`).join('')}
      </tr>
    </thead>
    <tbody class="bg-[${bodyBgColor}] text-[${bodyTextColor}]" style="background-color: ${bodyBgColor}; color: ${bodyTextColor};">
      ${Array(rows).fill().map((_, i) => `
      <tr>
        ${Array(columns).fill().map((_, j) => `<td class="${cellClass}" contenteditable="true">Cell ${i + 1}-${j + 1}</td>`).join('')}
      </tr>
      `).join('')}
    </tbody>
  </table>
</div>`;
  }, [columns, rows, lineHeight, lineHeightHeader, tableWidth, border, roundedCorners, fixedWidth, fontSize, headerBgColor, headerTextColor, bodyBgColor, bodyTextColor, uppercaseHeader, centerText, boldHeader]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateTableHTML());
    // Ajouter une notification de succès ici
  };

  const exportCSV = () => {
    // Implémenter l'exportation CSV ici
  };

  return (
    <div className="max-w-full mx-auto px-4 py-8">
      <motion.h1
        className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tailwind Table Generator
      </motion.h1>

      <motion.div 
        className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Table Layout & Size</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="columns" className="text-sm">Column Count: {columns}</Label>
                  <Slider
                    id="columns"
                    min={1} max={10} step={1}
                    value={[columns]}
                    onValueChange={([value]) => setColumns(value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="rows" className="text-sm">Row Count: {rows}</Label>
                  <Slider
                    id="rows"
                    min={1} max={10} step={1}
                    value={[rows]}
                    onValueChange={([value]) => setRows(value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Table Properties</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="border" className="text-sm">Border</Label>
                  <Switch
                    id="border"
                    checked={border}
                    onCheckedChange={setBorder}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="roundedCorners" className="text-sm">Rounded Corners</Label>
                  <Switch
                    id="roundedCorners"
                    checked={roundedCorners}
                    onCheckedChange={setRoundedCorners}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="fixedWidth" className="text-sm">Fixed Width</Label>
                  <Switch
                    id="fixedWidth"
                    checked={fixedWidth}
                    onCheckedChange={setFixedWidth}
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Colors</h2>
              <Tabs defaultValue="header" className="w-full">
                <TabsList className="w-full mb-2">
                  <TabsTrigger value="header" className="w-1/2">Header</TabsTrigger>
                  <TabsTrigger value="body" className="w-1/2">Body</TabsTrigger>
                </TabsList>
                <TabsContent value="header">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="headerBgColor" className="text-sm">Background Color</Label>
                      <div className="flex items-center mt-1">
                        <Input
                          id="headerBgColor"
                          type="color"
                          value={headerBgColor}
                          onChange={(e) => setHeaderBgColor(e.target.value)}
                          className="w-10 h-10 p-0 border-none"
                        />
                        <Input
                          type="text"
                          value={headerBgColor}
                          onChange={(e) => setHeaderBgColor(e.target.value)}
                          className="ml-2 flex-grow text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="headerTextColor" className="text-sm">Text Color</Label>
                      <div className="flex items-center mt-1">
                        <Input
                          id="headerTextColor"
                          type="color"
                          value={headerTextColor}
                          onChange={(e) => setHeaderTextColor(e.target.value)}
                          className="w-10 h-10 p-0 border-none"
                        />
                        <Input
                          type="text"
                          value={headerTextColor}
                          onChange={(e) => setHeaderTextColor(e.target.value)}
                          className="ml-2 flex-grow text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="body">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bodyBgColor">Background Color</Label>
                      <div className="flex items-center mt-1">
                        <Input
                          id="bodyBgColor"
                          type="color"
                          value={bodyBgColor}
                          onChange={(e) => setBodyBgColor(e.target.value)}
                          className="w-12 h-12 p-1 border-none"
                        />
                        <Input
                          type="text"
                          value={bodyBgColor}
                          onChange={(e) => setBodyBgColor(e.target.value)}
                          className="ml-2 flex-grow"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bodyTextColor">Text Color</Label>
                      <div className="flex items-center mt-1">
                        <Input
                          id="bodyTextColor"
                          type="color"
                          value={bodyTextColor}
                          onChange={(e) => setBodyTextColor(e.target.value)}
                          className="w-12 h-12 p-1 border-none"
                        />
                        <Input
                          type="text"
                          value={bodyTextColor}
                          onChange={(e) => setBodyTextColor(e.target.value)}
                          className="ml-2 flex-grow"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Text Properties</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="uppercaseHeader" className="text-sm">Uppercase Header</Label>
                  <Switch
                    id="uppercaseHeader"
                    checked={uppercaseHeader}
                    onCheckedChange={setUppercaseHeader}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="centerText" className="text-sm">Center Text</Label>
                  <Switch
                    id="centerText"
                    checked={centerText}
                    onCheckedChange={setCenterText}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="boldHeader" className="text-sm">Bold Header</Label>
                  <Switch
                    id="boldHeader"
                    checked={boldHeader}
                    onCheckedChange={setBoldHeader}
                  />
                </div>
              </div>
            </section>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Preview</h2>
            <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[300px] sm:max-h-[400px]">
              <div dangerouslySetInnerHTML={{ __html: generateTableHTML() }} />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Generate HTML + Tailwind</h2>
          <pre className="bg-gray-100 p-4 rounded-lg font-mono text-xs overflow-x-auto max-h-[200px] sm:max-h-[300px] whitespace-pre-wrap break-all">
            {generateTableHTML()}
          </pre>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={copyToClipboard} className="w-full sm:w-auto flex-grow">
              <Copy className="mr-2 h-4 w-4" />
              Copy HTML
            </Button>
            <Button onClick={exportCSV} className="w-full sm:w-auto flex-grow">
              <FileDown className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TailwindTableGenerator;
