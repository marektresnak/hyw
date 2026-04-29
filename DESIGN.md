---
name: Eldritch Cartography
colors:
  surface: '#fff8f2'
  surface-dim: '#ecd7b5'
  surface-bright: '#fff8f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff2df'
  surface-container: '#ffebcc'
  surface-container-high: '#fbe6c2'
  surface-container-highest: '#f5e0bd'
  on-surface: '#241a05'
  on-surface-variant: '#4d4540'
  inverse-surface: '#3b2f17'
  inverse-on-surface: '#ffefd6'
  outline: '#7e756f'
  outline-variant: '#d0c4bd'
  surface-tint: '#645d58'
  primary: '#16120e'
  on-primary: '#ffffff'
  primary-container: '#2b2622'
  on-primary-container: '#958c87'
  inverse-primary: '#cec5bf'
  secondary: '#8e4d2f'
  on-secondary: '#ffffff'
  secondary-container: '#ffaa85'
  on-secondary-container: '#793c1f'
  tertiary: '#0a150b'
  on-tertiary: '#ffffff'
  tertiary-container: '#1f2a1e'
  on-tertiary-container: '#859282'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ebe1da'
  primary-fixed-dim: '#cec5bf'
  on-primary-fixed: '#1f1b17'
  on-primary-fixed-variant: '#4c4641'
  secondary-fixed: '#ffdbcd'
  secondary-fixed-dim: '#ffb596'
  on-secondary-fixed: '#360f00'
  on-secondary-fixed-variant: '#71361a'
  tertiary-fixed: '#d9e6d5'
  tertiary-fixed-dim: '#bdcab9'
  on-tertiary-fixed: '#131e13'
  on-tertiary-fixed-variant: '#3e4a3d'
  background: '#fff8f2'
  on-background: '#241a05'
  surface-variant: '#f5e0bd'
typography:
  headline-lg:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Noto Serif
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Noto Serif
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Newsreader
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  margin-edge: 40px
  gutter: 24px
  container-max: 1440px
---

## Brand & Style
This design system is built upon a **Tactile / Skeuomorphic** philosophy, aiming to bridge the gap between a digital interface and a physical relic. The aesthetic is inspired by the meticulous craftsmanship of third-age cartography, evoking feelings of adventure, ancient history, and the weight of a physical journey. 

The brand personality is authoritative and immersive. It avoids the sterile cleanliness of modern SaaS in favor of "lived-in" textures, where every UI element feels like it was etched, stamped, or woven by hand. The target audience is the immersive RPG player who values lore and atmosphere as much as functionality. The interface should not feel like an overlay, but rather like an object the player is holding in their hands.

## Colors
The palette for this design system is rooted in natural pigments and organic decay. 
- **Primary (Charcoal Black):** Used for the "ink" of the interface—text, hand-drawn iconography, and intricate borders. 
- **Secondary (Burnt Sienna/Sepia):** Used for emphasis, interactive states, and important navigational markers.
- **Tertiary (Deep Forest Green):** Reserved for topographical features, positive status indicators, and "safe" pathing.
- **Neutral (Aged Parchment):** The foundation of the UI. It utilizes a base of warm beige and sepia to simulate sun-bleached vellum.

Avoid pure whites or vibrant neons. Every color must feel as though it could be produced by crushed minerals, soot, or plant dyes.

## Typography
The typography in this design system emphasizes a literary and authoritative tone. 

**Newsreader** is used for headlines and navigational labels to mimic the serif-heavy styles found in ancient manuscripts and high-fantasy literature. It provides the "Uncial" feel through its classic proportions and sharp serifs. **Noto Serif** is utilized for body copy and descriptions to ensure long-form readability while maintaining the elegant, timeless aesthetic. 

Headlines should often be treated with a subtle "ink-bleed" effect or slight opacity variance to simulate hand-stamped lettering. Label styles use expanded letter spacing and uppercase transformations to evoke the appearance of region names on a physical map.

## Layout & Spacing
This design system utilizes a **Fixed Grid** model centered on the screen, surrounded by generous "safe areas" that reveal the edges of a physical map or scroll. The layout rhythm is based on an 8px base unit, though spacing is often intentionally asymmetrical to enhance the hand-drawn feel.

Main content areas should be treated as "panels" of parchment. Spacing between major elements (gutters) is wide to allow for decorative flourishes, ink-drawn dividers, or ornamental corner-pieces. Margins are intentionally large to simulate the natural curling and fraying of paper edges.

## Elevation & Depth
Depth in this design system is achieved through **Tonal Layers** and physical metaphors rather than modern drop shadows. 

1.  **The Base:** The primary map surface, using a heavy parchment texture.
2.  **Overlays:** Menus and modals appear as smaller scraps of paper or leather bound with cord. These have "Stacking Depth"—the edges should have a very subtle, dark inner-glow to suggest thickness and a micro-shadow (1-2px) to lift them off the base map.
3.  **Physical Artifacts:** Compass roses, wax seals, and buttons are the highest level of elevation. They use skeuomorphic highlights (top-left) and deep shadows (bottom-right) to appear as 3D objects resting on the paper. 

Backdrop blurs are not used. Instead, when a modal is active, the background map should darken and slightly desaturate, as if the lighting in the room has shifted to the foreground object.

## Shapes
The shape language is primarily **Sharp (0)** to **Soft (1)**. Perfectly round corners are avoided as they feel too machined and modern.

Buttons and containers should use "Rough Edges"—vector masks that simulate torn paper or hand-cut leather. Where standard geometric shapes are required, a very slight rounding (4px) is used to suggest the natural wear on the corners of a book or map. Circles are used exclusively for "Artifact" elements like wax seals or the compass rose navigational hub.

## Components
- **Buttons:** Styled as **Wax Seals** (circular, crimson or gold, embossed icons) for primary actions, or **Leather Tabs** for secondary navigation. Hover states involve a subtle brightening of the "wax" or an embossed-to-debossed transition.
- **Cards/Panels:** These are "Parchment Scraps." Use a texture overlay with tattered edges and visible grain. Borders should look like hand-drawn ink lines with slight "wobble" and varying thickness.
- **Input Fields:** Styled as a simple underline (ink stroke) with a "quill" cursor. The focus state changes the ink color from charcoal to a deep ochre.
- **Checkboxes & Radios:** Use "X" marks and "O" marks that look like they were quickly sketched with a fountain pen. 
- **Compass Rose:** A central navigation component used for map panning and zooming, featuring a highly detailed, hand-drawn nautical star illustration.
- **Dividers:** Use ornate, hand-drawn flourishes or "knotwork" patterns rather than simple grey lines.
- **Tooltips:** Styled as small, stained paper tags that appear to be pinned to the interface with a small metallic needle or tack.