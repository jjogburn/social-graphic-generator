'use client';

import { CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import { TemplateRenderProps } from '../types';
import { ImageLayer, LayeredTemplateSpec, TextLayer, TextStyle } from './spec';

const DEFAULT_LINE_HEIGHT = 1.2;

export function assetUrl(spec: LayeredTemplateSpec, path: string): string {
  return `/templates/${spec.id}/${path}`;
}

function textFill(color: string): CSSProperties {
  if (color.startsWith('linear-gradient')) {
    return {
      background: color,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    };
  }
  return { color };
}

function fontStyle(style: TextStyle, size: number): CSSProperties {
  return {
    fontFamily: style.family,
    fontSize: size,
    fontWeight: style.weight ?? 400,
    lineHeight: style.lineHeight ?? DEFAULT_LINE_HEIGHT,
    letterSpacing: style.letterSpacing,
    textTransform: style.transform,
    ...textFill(style.color),
  };
}

// Renders text inside a fixed box, stepping the font size down until it fits
// the box and maxLines, but never below minSize.
function FitText({ layer, text }: { layer: TextLayer; text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(layer.style.size);
  const minSize = layer.minSize ?? layer.style.size;
  const lineHeight = layer.style.lineHeight ?? DEFAULT_LINE_HEIGHT;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    let next = layer.style.size;
    const overflows = (s: number) => {
      el.style.fontSize = `${s}px`;
      const lines = Math.round(el.scrollHeight / (s * lineHeight));
      return el.scrollHeight > layer.height || (layer.maxLines !== undefined && lines > layer.maxLines);
    };
    while (next > minSize && overflows(next)) next -= 1;
    setSize(next);
  }, [text, layer, minSize, lineHeight]);

  const justify = { top: 'flex-start', middle: 'center', bottom: 'flex-end' }[layer.verticalAlign ?? 'top'];

  return (
    <div style={{
      position: 'absolute',
      left: layer.x,
      top: layer.y,
      width: layer.width,
      height: layer.height,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: justify,
      overflow: 'hidden',
    }}>
      <div ref={ref} style={{
        ...fontStyle(layer.style, size),
        textAlign: layer.align ?? 'left',
        whiteSpace: 'pre-line',
        overflowWrap: 'break-word',
      }}>
        {text}
      </div>
    </div>
  );
}

function PhotoSlot({ layer, src }: { layer: ImageLayer; src: string }) {
  const radius = layer.shape === 'circle' ? '50%' : layer.radius ?? 0;
  const box: CSSProperties = {
    position: 'absolute',
    left: layer.x,
    top: layer.y,
    width: layer.width,
    height: layer.height,
    borderRadius: radius,
    overflow: 'hidden',
  };

  if (src) {
    return <img alt="" src={src} style={{ ...box, objectFit: 'cover' }} />;
  }
  if (!layer.placeholder) return null;
  return (
    <div style={{
      ...box,
      backgroundColor: layer.placeholder.color,
      color: layer.placeholder.textColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      fontSize: Math.max(14, layer.width / 20),
    }}>
      {layer.placeholder.text}
    </div>
  );
}

export function createLayeredCanvas(spec: LayeredTemplateSpec) {
  const fontFaces = (spec.fonts ?? []).map(f => `@font-face {
  font-family: '${f.family}';
  src: url('${assetUrl(spec, f.src)}');
  font-weight: ${f.weight ?? 400};
  font-style: ${f.style ?? 'normal'};
}`).join('\n');

  function LayeredCanvas({ data, settings, size }: TemplateRenderProps) {
    const layout = spec.sizes.find(s => s.id === size.id) ?? spec.sizes[0];
    const valueOf = (field: string) => data[field] || settings[field] || '';

    return (
      <div style={{ width: layout.width, height: layout.height, position: 'relative', overflow: 'hidden' }}>
        {fontFaces && <style>{fontFaces}</style>}
        <img alt="" src={assetUrl(spec, layout.background)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        {layout.layers.map((layer, i) => layer.type === 'image'
          ? <PhotoSlot key={i} layer={layer} src={valueOf(layer.field)} />
          : <FitText key={i} layer={layer} text={valueOf(layer.field) || layer.fallback || ''} />
        )}
        {layout.overlay && (
          <img alt="" src={assetUrl(spec, layout.overlay)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        )}
      </div>
    );
  }

  return LayeredCanvas;
}
