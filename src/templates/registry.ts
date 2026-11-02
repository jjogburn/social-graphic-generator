import { TemplateConfig } from './types';
import { empathSummitTemplate } from './empath-summit';
import { createLayeredTemplate } from './layered';
import { LayeredTemplateSpec } from './layered/spec';
import brilliance2025 from '../../public/templates/brilliance-2025/template.json';
import empathSummit2027 from '../../public/templates/empath-summit-2027/template.json';

// Designer templates live in public/templates/<id>/ — see the README there.
export const templates: TemplateConfig[] = [
  createLayeredTemplate(empathSummit2027 as LayeredTemplateSpec),
  empathSummitTemplate,
  createLayeredTemplate(brilliance2025 as LayeredTemplateSpec),
];
