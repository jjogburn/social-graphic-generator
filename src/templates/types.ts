import { ComponentType } from 'react';

export interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'image';
  placeholder?: string;
  required?: boolean;
  perEntry: boolean;
  defaultValue?: string;
}

export interface OutputSize {
  id: string;
  label: string;
  width: number;
  height: number;
}

export interface TemplateRenderProps {
  data: Record<string, string>;
  settings: Record<string, string>;
  size: OutputSize;
}

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: TemplateField[];
  sizes: OutputSize[];
  defaultSettings: Record<string, string>;
  component: ComponentType<TemplateRenderProps>;
}
