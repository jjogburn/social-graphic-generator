'use client';

import { useState, useRef, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { toPng } from 'html-to-image';
import { TemplateConfig, OutputSize } from '@/templates/types';

interface Entry {
  id: string;
  [key: string]: string;
}

interface GraphicEditorProps {
  template: TemplateConfig;
  onBack: () => void;
}

let entryCounter = 0;

function createEmptyEntry(fieldIds: string[]): Entry {
  const entry: Entry = { id: `entry-${++entryCounter}` };
  fieldIds.forEach(id => { entry[id] = ''; });
  return entry;
}

export default function GraphicEditor({ template, onBack }: GraphicEditorProps) {
  const entryFieldIds = template.fields.filter(f => f.perEntry).map(f => f.id);
  const entryFields = template.fields.filter(f => f.perEntry);
  const settingsFields = template.fields.filter(f => !f.perEntry);

  const [settings, setSettings] = useState<Record<string, string>>(template.defaultSettings);
  const [entries, setEntries] = useState<Entry[]>([createEmptyEntry(entryFieldIds)]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<OutputSize>(template.sizes[0]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState('');

  const canvasRef = useRef<HTMLDivElement>(null);
  const activeEntry = entries[activeIndex] || entries[0];

  const updateEntry = useCallback((fieldId: string, value: string) => {
    setEntries(prev => prev.map((e, i) =>
      i === activeIndex ? { ...e, [fieldId]: value } : e
    ));
  }, [activeIndex]);

  const addEntry = () => {
    const newEntry = createEmptyEntry(entryFieldIds);
    setEntries(prev => [...prev, newEntry]);
    setActiveIndex(entries.length);
  };

  const removeEntry = (index: number) => {
    if (entries.length <= 1) return;
    setEntries(prev => prev.filter((_, i) => i !== index));
    if (activeIndex >= entries.length - 1) {
      setActiveIndex(Math.max(0, entries.length - 2));
    } else if (activeIndex > index) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const handleImageUpload = (fieldId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      updateEntry(fieldId, e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const captureCanvas = async (): Promise<string> => {
    if (!canvasRef.current) throw new Error('Canvas not ready');
    return toPng(canvasRef.current, {
      width: selectedSize.width,
      height: selectedSize.height,
      pixelRatio: 1,
      style: { transform: 'none' },
    });
  };

  const exportSingle = async () => {
    setIsExporting(true);
    try {
      const dataUrl = await captureCanvas();
      const link = document.createElement('a');
      link.download = `${sanitizeFilename(activeEntry.name || 'graphic')}-${selectedSize.id}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  const exportAll = async () => {
    setIsExporting(true);
    try {
      const JSZip = (await import('jszip')).default;
      const { saveAs } = await import('file-saver');
      const zip = new JSZip();
      const originalIndex = activeIndex;

      for (let i = 0; i < entries.length; i++) {
        setExportProgress(`Generating ${i + 1} of ${entries.length}...`);
        flushSync(() => setActiveIndex(i));
        await new Promise(r => setTimeout(r, 100));

        const dataUrl = await captureCanvas();
        const base64 = dataUrl.split(',')[1];
        const filename = `${sanitizeFilename(entries[i].name || `speaker-${i + 1}`)}-${selectedSize.id}.png`;
        zip.file(filename, base64, { base64: true });
      }

      flushSync(() => setActiveIndex(originalIndex));
      setExportProgress('Creating ZIP...');

      const blob = await zip.generateAsync({ type: 'blob' });
      saveAs(blob, `social-graphics-${selectedSize.id}.zip`);
    } finally {
      setIsExporting(false);
      setExportProgress('');
    }
  };

  const TemplateComponent = template.component;
  const previewMaxWidth = 520;
  const previewScale = Math.min(
    previewMaxWidth / selectedSize.width,
    previewMaxWidth / selectedSize.height
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            &larr; Templates
          </button>
          <div className="w-px h-5 bg-gray-200" />
          <h1 className="text-lg font-semibold text-gray-900">{template.name}</h1>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1">
          {template.sizes.map(size => (
            <button
              key={size.id}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                selectedSize.id === size.id
                  ? 'bg-white shadow-sm text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="w-[380px] bg-white border-r flex flex-col overflow-y-auto shrink-0">
          <div className="p-5 space-y-6">
            {/* Template settings */}
            {settingsFields.length > 0 && (
              <section>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Event Settings
                </h3>
                {settingsFields.map(field => (
                  <div key={field.id} className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={settings[field.id] || ''}
                      onChange={(e) => setSettings(prev => ({ ...prev, [field.id]: e.target.value }))}
                      placeholder={field.placeholder || field.defaultValue}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    />
                  </div>
                ))}
              </section>
            )}

            {/* Speaker tabs */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Speakers ({entries.length})
                </h3>
                <button
                  onClick={addEntry}
                  className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                >
                  + Add
                </button>
              </div>

              {entries.length > 1 && (
                <div className="flex gap-1.5 mb-4 flex-wrap">
                  {entries.map((entry, i) => (
                    <button
                      key={entry.id}
                      onClick={() => setActiveIndex(i)}
                      className={`flex items-center gap-1 px-2.5 py-1 text-sm rounded-full transition-colors ${
                        i === activeIndex
                          ? 'bg-purple-100 text-purple-700 font-medium'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {entry.name || `#${i + 1}`}
                      <span
                        role="button"
                        onClick={(e) => { e.stopPropagation(); removeEntry(i); }}
                        className="text-gray-400 hover:text-red-500 ml-0.5"
                      >
                        &times;
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Per-entry fields */}
              {entryFields.map(field => (
                <div key={field.id} className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  {field.type === 'image' ? (
                    <div>
                      <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-colors overflow-hidden">
                        {activeEntry[field.id] ? (
                          <img
                            alt="Upload preview"
                            src={activeEntry[field.id]}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="text-center py-4">
                            <div className="text-gray-400 text-sm">Click to upload</div>
                            <div className="text-gray-300 text-xs mt-1">JPG or PNG</div>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(field.id, file);
                          }}
                        />
                      </label>
                      {activeEntry[field.id] && (
                        <button
                          onClick={() => updateEntry(field.id, '')}
                          className="text-xs text-red-500 hover:text-red-700 mt-1"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      value={activeEntry[field.id] || ''}
                      onChange={(e) => updateEntry(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={activeEntry[field.id] || ''}
                      onChange={(e) => updateEntry(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    />
                  )}
                </div>
              ))}
            </section>
          </div>

          {/* Download buttons */}
          <div className="mt-auto p-5 border-t bg-gray-50 space-y-2">
            {isExporting && exportProgress && (
              <div className="text-sm text-gray-500 text-center mb-2">{exportProgress}</div>
            )}
            <button
              onClick={exportSingle}
              disabled={isExporting}
              className="w-full bg-purple-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            >
              {isExporting && !exportProgress ? 'Generating...' : 'Download PNG'}
            </button>
            {entries.length > 1 && (
              <button
                onClick={exportAll}
                disabled={isExporting}
                className="w-full bg-gray-800 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                Download All ({entries.length}) as ZIP
              </button>
            )}
          </div>
        </div>

        {/* Right panel - preview */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gray-100">
          <div
            className="shadow-2xl rounded-lg overflow-hidden"
            style={{
              width: selectedSize.width * previewScale,
              height: selectedSize.height * previewScale,
            }}
          >
            <div
              ref={canvasRef}
              style={{
                width: selectedSize.width,
                height: selectedSize.height,
                transform: `scale(${previewScale})`,
                transformOrigin: 'top left',
              }}
            >
              <TemplateComponent
                data={activeEntry}
                settings={settings}
                size={selectedSize}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9-_ ]/g, '').replace(/\s+/g, '-').toLowerCase() || 'graphic';
}
