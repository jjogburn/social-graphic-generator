import { TemplateField } from '../types';

// Shape of public/templates/<id>/template.json — the file a designer's
// export is described by. All coordinates are in output pixels for that size.

export interface FontFace {
  family: string;
  src: string; // relative to the template folder, e.g. "fonts/Brand-Bold.woff2"
  weight?: number;
  style?: 'normal' | 'italic';
}

export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TextStyle {
  family: string;
  size: number;
  weight?: number;
  color: string; // a hex/rgb color, or a CSS linear-gradient(...) for gradient text
  lineHeight?: number;
  letterSpacing?: string;
  transform?: 'none' | 'uppercase' | 'lowercase';
}

export interface TextLayer extends Box {
  type: 'text';
  field: string; // id of an entry field or event setting
  style: TextStyle;
  align?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  maxLines?: number;
  minSize?: number; // text shrinks toward this size before it overflows the box
  fallback?: string; // shown when the field is empty
}

export interface ImageLayer extends Box {
  type: 'image';
  field: string;
  shape?: 'rect' | 'circle';
  radius?: number; // corner radius for shape "rect"
  placeholder?: { color: string; text?: string; textColor?: string };
}

export type Layer = TextLayer | ImageLayer;

export interface LayeredSize {
  id: string;
  label: string;
  width: number;
  height: number;
  background: string; // designer art with the dynamic areas left empty
  overlay?: string; // optional art drawn on top of photos and text (frames, effects)
  layers: Layer[];
}

export interface LayeredTemplateSpec {
  id: string;
  name: string;
  description: string;
  category: string;
  fonts?: FontFace[];
  fields: TemplateField[];
  sizes: LayeredSize[];
}
