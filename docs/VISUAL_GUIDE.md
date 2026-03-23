# 🎨 Visual Design Guide

Complete visual design guide untuk CNZR Framework website.

## 🎮 Design Philosophy

**Pixel Art Retro + Modern Functionality**

Menggabungkan nostalgia gaming retro dengan user experience modern untuk menciptakan website yang:
- Aesthetic dan eye-catching
- Minimalist namun informative
- Programmer-friendly
- Responsive dan accessible

---

## 🎨 Color System

### Primary Palette (Pixel Art)

```
┌─────────────────────────────────────────┐
│  Background Colors                       │
├─────────────────────────────────────────┤
│  pixel-bg      #1a1c2c  ████████████   │
│  pixel-dark    #0f0f1e  ████████████   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Accent Colors                           │
├─────────────────────────────────────────┤
│  pixel-purple  #5d275d  ████████████   │
│  pixel-pink    #b13e53  ████████████   │
│  pixel-cyan    #29adff  ████████████   │
│  pixel-yellow  #ffcd75  ████████████   │
│  pixel-lime    #a7f070  ████████████   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  Neutral Colors                          │
├─────────────────────────────────────────┤
│  pixel-white   #f4f4f4  ████████████   │
│  pixel-gray    #566c86  ████████████   │
└─────────────────────────────────────────┘
```

### Color Usage

**pixel-bg** (`#1a1c2c`)
- Main background
- Page base color
- Dark mode primary

**pixel-dark** (`#0f0f1e`)
- Card backgrounds
- Code blocks
- Darker sections

**pixel-purple** (`#5d275d`)
- Primary buttons
- Navigation highlights
- Brand color

**pixel-pink** (`#b13e53`)
- Secondary accents
- Borders
- Hover states

**pixel-cyan** (`#29adff`)
- Links
- Active states
- Neon effects
- Primary text highlights

**pixel-yellow** (`#ffcd75`)
- Warnings
- Emphasis
- Code highlights

**pixel-lime** (`#a7f070`)
- Success states
- Positive feedback
- Active indicators

**pixel-white** (`#f4f4f4`)
- Primary text
- Headings
- Content

**pixel-gray** (`#566c86`)
- Secondary text
- Borders
- Disabled states

---

## 📝 Typography

### Font Families

**Press Start 2P** (Pixel Font)
```
Usage: Headings, titles, navigation
Weight: Regular (400)
Style: Pixel art, 8-bit gaming
```

**JetBrains Mono** (Monospace)
```
Usage: Body text, code, UI
Weights: 400, 500, 700
Style: Modern monospace, developer-friendly
```

### Type Scale

```
Hero Title:     text-5xl md:text-7xl  (48px / 72px)
Page Title:     text-4xl              (36px)
Section Title:  text-3xl md:text-4xl  (30px / 36px)
Heading:        text-2xl              (24px)
Subheading:     text-xl               (20px)
Body Large:     text-base             (16px)
Body:           text-sm               (14px)
Small:          text-xs               (12px)
```

### Text Styles

**Neon Text**
```css
.neon-text {
  color: #29adff;
  text-shadow: 
    0 0 10px currentColor,
    0 0 20px currentColor,
    0 0 30px currentColor;
}
```

**Pixel Text**
```css
.pixel-text {
  font-family: 'Press Start 2P';
  color: #29adff;
  text-shadow: 2px 2px 0px rgba(0,0,0,0.8);
}
```

---

## 🎯 Components

### Buttons

**Primary Button** (`.pixel-btn`)
```
┌─────────────────────┐
│   START QUEST   ▶   │
└─────────────────────┘

Background: pixel-purple
Border: 2px pixel-pink
Shadow: 4px 4px 0px black
Hover: Translate(1px, 1px)
```

**Secondary Button** (`.pixel-btn-secondary`)
```
┌─────────────────────┐
│   VIEW SOURCE   →   │
└─────────────────────┘

Background: transparent
Border: 2px pixel-cyan
Color: pixel-cyan
Hover: bg-pixel-cyan, text-dark
```

### Cards

**Pixel Card** (`.pixel-card`)
```
┌─────────────────────────────┐
│                             │
│  Card Content Here          │
│                             │
└─────────────────────────────┘

Background: pixel-dark/50
Border: 2px pixel-gray
Shadow: 4px 4px 0px black
Hover: Border changes to cyan
       Shadow increases
       Slight translate
```

### Code Blocks

**Code Container** (`.code-block`)
```
┌─────────────────────────────┐
│ $ npx cnzr new my-app █     │
└─────────────────────────────┘

Background: pixel-dark
Border: 2px pixel-gray
Font: JetBrains Mono
Padding: 1rem
```

---

## 🎭 Effects

### Scanline Effect

```css
.scanline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}
```

### Pixel Shadow

```css
.shadow-pixel {
  box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.8);
}

.shadow-pixel-hover {
  box-shadow: 6px 6px 0px 0px rgba(0,0,0,0.8);
}
```

### Animations

**Float Animation**
```css
@keyframes pixelFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
```

**Blink Animation**
```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```

**Fade In**
```css
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

---

## 📐 Layout

### Grid System

**Mobile** (< 768px)
```
┌─────────────────┐
│   Single Col    │
│   Stack Layout  │
└─────────────────┘
```

**Tablet** (768px - 1024px)
```
┌─────────┬─────────┐
│  Col 1  │  Col 2  │
└─────────┴─────────┘
```

**Desktop** (> 1024px)
```
┌─────┬─────┬─────┐
│ C1  │ C2  │ C3  │
└─────┴─────┴─────┘
```

### Spacing Scale

```
xs:  0.25rem  (4px)
sm:  0.5rem   (8px)
md:  1rem     (16px)
lg:  1.5rem   (24px)
xl:  2rem     (32px)
2xl: 3rem     (48px)
```

---

## 🎨 Page Layouts

### Homepage Layout

```
┌─────────────────────────────────────┐
│         Navigation Bar              │
├─────────────────────────────────────┤
│                                     │
│         Hero Section                │
│      (Pixel Art Character)          │
│                                     │
├─────────────────────────────────────┤
│         Stats Section               │
│    [Ver] [Down] [Star] [Contrib]   │
├─────────────────────────────────────┤
│                                     │
│       Features Grid                 │
│    [F1]  [F2]  [F3]                │
│    [F4]  [F5]  [F6]                │
│                                     │
├─────────────────────────────────────┤
│       Code Examples                 │
│    [Code 1]  [Code 2]              │
├─────────────────────────────────────┤
│       Quick Links                   │
│    [Docs] [Play] [GitHub]          │
├─────────────────────────────────────┤
│         Footer                      │
└─────────────────────────────────────┘
```

### Documentation Layout

```
┌─────────────────────────────────────┐
│         Navigation Bar              │
├──────────┬──────────────────────────┤
│          │                          │
│ Sidebar  │   Main Content           │
│          │                          │
│ - Intro  │   # Installation         │
│ - Setup  │   Content here...        │
│ - API    │                          │
│ - Guide  │   # Quick Start          │
│          │   Content here...        │
│          │                          │
└──────────┴──────────────────────────┘
```

### Playground Layout

```
┌─────────────────────────────────────┐
│         Navigation Bar              │
├──────────────────┬──────────────────┤
│                  │                  │
│   Request Panel  │  Response Panel  │
│                  │                  │
│   [Method]       │  Status: 200     │
│   [Endpoint]     │  Time: 45ms      │
│   [Body]         │                  │
│                  │  [Response Body] │
│   [Send Button]  │                  │
│                  │                  │
├──────────────────┼──────────────────┤
│  Quick Examples  │    Console       │
│  [Ex1] [Ex2]     │  > Logs here...  │
└──────────────────┴──────────────────┘
```

---

## 🎯 Interactive States

### Button States

```
Normal:   bg-purple, border-pink
Hover:    translate(1px, 1px), shadow-increase
Active:   translate(2px, 2px), shadow-decrease
Focus:    outline-cyan
Disabled: opacity-50, cursor-not-allowed
```

### Link States

```
Normal:   text-cyan
Hover:    text-yellow
Active:   text-pink
Visited:  text-purple
```

### Card States

```
Normal:   border-gray
Hover:    border-cyan, shadow-increase
Active:   border-pink
Focus:    outline-cyan
```

---

## 📱 Responsive Breakpoints

```javascript
sm:  640px   // Mobile landscape
md:  768px   // Tablet
lg:  1024px  // Desktop
xl:  1280px  // Large desktop
2xl: 1536px  // Extra large
```

### Responsive Patterns

**Navigation**
- Mobile: Hamburger menu
- Tablet: Horizontal menu
- Desktop: Full navigation bar

**Grid**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

**Typography**
- Mobile: Smaller sizes
- Tablet: Medium sizes
- Desktop: Full sizes

---

## 🎨 Design Tokens

### Border Radius
```
none:   0
sm:     2px   (pixel-perfect)
md:     4px
lg:     8px
```

### Border Width
```
default: 2px  (pixel art style)
thick:   4px
```

### Shadows
```
pixel:       4px 4px 0px black
pixel-hover: 6px 6px 0px black
neon:        0 0 10px currentColor
```

---

## ✨ Best Practices

### Do's ✅
- Use pixel-perfect measurements (multiples of 4px)
- Maintain high contrast for readability
- Keep animations snappy (< 300ms)
- Use monospace fonts for code
- Preserve pixel art aesthetic

### Don'ts ❌
- Don't use rounded corners (except minimal)
- Don't use gradients (except for effects)
- Don't use smooth shadows
- Don't mix font styles
- Don't break the grid

---

## 🎯 Accessibility

### Color Contrast
- Text on background: 7:1 minimum
- Links: Underline or distinct color
- Focus states: Visible outline

### Typography
- Minimum font size: 14px
- Line height: 1.5 minimum
- Paragraph width: 65-75 characters

### Interactive Elements
- Minimum touch target: 44x44px
- Keyboard accessible
- Screen reader friendly

---

## 🎨 Component Examples

### Feature Card
```html
<div class="pixel-card p-6 group">
  <div class="text-4xl mb-4">🎯</div>
  <h3 class="font-pixel text-sm text-pixel-cyan mb-3">
    ROUTING
  </h3>
  <p class="text-pixel-white text-sm">
    File-based routing with dynamic params
  </p>
</div>
```

### Code Block
```html
<div class="code-block">
  <pre><code class="text-pixel-lime">
    npm install cnzr
  </code></pre>
</div>
```

### Button
```html
<button class="pixel-btn">
  START QUEST
</button>
```

---

**Design with pixels, code with passion! 🎮✨**
