import { TemplateConfig } from '../types';
import { LayeredTemplateSpec } from './spec';
import { createLayeredCanvas } from './LayeredCanvas';

// Turns a designer template folder's template.json into a regular TemplateConfig,
// so the editor, previews and export treat it like any other template.
export function createLayeredTemplate(spec: LayeredTemplateSpec): TemplateConfig {
  const defaultSettings: Record<string, string> = {};
  spec.fields
    .filter(f => !f.perEntry && f.defaultValue !== undefined)
    .forEach(f => { defaultSettings[f.id] = f.defaultValue!; });

  return {
    id: spec.id,
    name: spec.name,
    description: spec.description,
    category: spec.category,
    fields: spec.fields,
    sizes: spec.sizes.map(({ id, label, width, height }) => ({ id, label, width, height })),
    defaultSettings,
    component: createLayeredCanvas(spec),
  };
}
