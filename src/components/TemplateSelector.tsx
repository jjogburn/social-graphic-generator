import { TemplateConfig } from '@/templates/types';

interface TemplateSelectorProps {
  templates: TemplateConfig[];
  onSelect: (id: string) => void;
}

function TemplatePreview({ template }: { template: TemplateConfig }) {
  const Component = template.component;
  const size = template.sizes[0];
  const previewWidth = 280;
  const scale = previewWidth / size.width;
  const previewHeight = size.height * scale;

  const sampleData: Record<string, string> = {};
  template.fields.filter(f => f.perEntry).forEach(f => {
    sampleData[f.id] = f.placeholder || f.defaultValue || '';
  });
  sampleData.name = sampleData.name || 'Dr. Jane Smith';
  sampleData.title = sampleData.title || 'Speaker Title';

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ width: previewWidth, height: previewHeight }}
    >
      <div style={{
        width: size.width,
        height: size.height,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        pointerEvents: 'none',
      }}>
        <Component
          data={sampleData}
          settings={template.defaultSettings}
          size={size}
        />
      </div>
    </div>
  );
}

export default function TemplateSelector({ templates, onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map(template => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className="bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-purple-300 hover:shadow-lg transition-all group"
        >
          <div className="flex justify-center mb-4">
            <TemplatePreview template={template} />
          </div>
          <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
            {template.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{template.description}</p>
          <div className="flex gap-2 mt-3">
            {template.sizes.map(size => (
              <span key={size.id} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                {size.width}×{size.height}
              </span>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}
