# Designer templates

Each folder here is one event template: designer artwork plus a `template.json`
that says where the per-person content goes. The tool draws only the parts that
change (photo, name, title, event copy); everything else is the designer's art.

```
brilliance-2025/
  template.json
  square/background.svg      art with the photo and text areas left empty
  square/overlay.png         optional, drawn on top of photo and text
  landscape/background.svg
  fonts/Brand-Bold.woff2     optional, listed under "fonts"
```

## Adding a template

1. Copy an existing folder and rename it; set `id` in `template.json` to the folder name.
2. Drop in the designer's exports (PNG, JPG or SVG) and point each size's `background` at them.
3. Update each layer's `x`, `y`, `width`, `height` from the designer's spec (output pixels).
4. Add one import line for the new `template.json` in `src/templates/registry.ts`.

## template.json reference

- `fields`: the form inputs. `perEntry: true` = per speaker/attendee; `false` = event setting
  (its `defaultValue` pre-fills the form).
- `fonts`: `{ "family", "src", "weight" }` — `src` is relative to the folder. Use the same
  `family` name in text styles.
- `sizes[]`: `id`, `label`, `width`, `height`, `background`, optional `overlay`, and `layers`.
- Image layer: `{ "type": "image", "field", x, y, width, height, "shape": "circle" | "rect", "radius", "placeholder": { "color", "text", "textColor" } }`
- Text layer: `{ "type": "text", "field", x, y, width, height, "style": { "family", "size", "weight", "color", "lineHeight", "letterSpacing", "transform" }, "align", "verticalAlign", "maxLines", "minSize", "fallback" }`
  - `color` can be a CSS `linear-gradient(...)` for gradient text.
  - Text starts at `size` and shrinks toward `minSize` until it fits the box and `maxLines`.

## Designer handoff checklist

- One frame per output size (1080×1080, 1200×630, 1080×1920 …).
- Placeholder layers named by role (`{{headshot}}`, `{{name}}`, `{{title}}`) using a deliberately long sample name.
- Export each background with the placeholder layers hidden; export an overlay if any art sits on top of the photo.
- Provide the web-licensed font files and each text box's position, size, font, color and alignment.
