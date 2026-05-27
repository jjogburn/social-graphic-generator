'use client';

import { useState } from 'react';
import { templates } from '@/templates/registry';
import TemplateSelector from '@/components/TemplateSelector';
import GraphicEditor from '@/components/GraphicEditor';

export default function Home() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const selectedTemplate = selectedTemplateId
    ? templates.find(t => t.id === selectedTemplateId)
    : null;

  if (!selectedTemplate) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Social Graphic Generator</h1>
          <p className="text-gray-500 mb-8">Select a template to start generating speaker cards</p>
          <TemplateSelector templates={templates} onSelect={setSelectedTemplateId} />
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <GraphicEditor
        template={selectedTemplate}
        onBack={() => setSelectedTemplateId(null)}
      />
    </main>
  );
}
