# CNZR Design System

Desain pixel retro professional yang konsisten di seluruh website.

## Design Principles

1. **Pixel Art Aesthetic**: Retro gaming vibes dengan sentuhan modern
2. **Professional**: Clean, readable, dan tidak berlebihan
3. **Performance First**: Optimized animations dan lazy loading
4. **Accessibility**: Support untuk reduced motion preferences
5. **Consistency**: Komponen yang sama di semua halaman

## Color Palette

```css
/* Primary Colors */
--pixel-bg: #1a1c2c      /* Background utama */
--pixel-dark: #0f0f1e    /* Background gelap */
--pixel-cyan: #29adff    /* Accent primary */
--pixel-yellow: #ffcd75  /* Accent secondary */
--pixel-pink: #ff6b9d    /* Accent tertiary */
--pixel-lime: #a7f070    /* Success/code */
--pixel-white: #f4f4f4   /* Text primary */
--pixel-gray: #566c86    /* Text secondary */
```

## Typography

- **Headings**: System fonts dengan bold weight
- **Body**: Space Mono untuk readability
- **Code**: JetBrains Mono untuk code blocks
- **Pixel**: Press Start 2P untuk accent text (minimal usage)

## Components

### Navigation
- Sticky navigation dengan backdrop blur
- Logo dengan glow effect
- Smooth hover transitions
- Responsive mobile menu

### Cards (`.card-pixel`)
- Clipped corners untuk pixel aesthetic
- Border dengan opacity
- Hover effects dengan shadow glow
- Backdrop blur untuk depth

### Buttons (`.btn-pixel`, `.btn-pixel-outline`)
- Clipped corners
- Bold uppercase text
- Hover glow effects
- Smooth transitions

### Terminal (`.terminal`)
- Dark background dengan border
- Header dengan controls
- Syntax highlighted code
- Copy button functionality

### Animations
- Fade in on scroll (Intersection Observer)
- Parallax backgrounds (desktop only)
- Hover lift effects
- Smooth page transitions
- Scanline effect (optional)

## Layout Structure

### Homepage
- Hero section dengan animated background
- Stats section dengan cards
- Features grid (3 columns)
- Code example showcase
- CTA section
- Footer dengan links

### Documentation
- Sidebar navigation (desktop)
- Main content area
- Code examples dengan syntax highlighting
- Section anchors
- Consistent footer

### Playground
- Two-column layout (request/response)
- Interactive API tester
- Quick examples
- Real-time response display
- Available endpoints list

## Performance Optimizations

1. **CSS**: Minified dan optimized
2. **JavaScript**: Deferred loading
3. **Images**: SVG icons (no raster images)
4. **Fonts**: Preconnect dan preload
5. **Animations**: GPU accelerated dengan `transform3d`
6. **Lazy Loading**: Intersection Observer untuk scroll animations
7. **Reduced Motion**: Respect user preferences

## Responsive Breakpoints

```css
/* Mobile First */
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large desktops */
```

## Accessibility

- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Focus visible states
- Color contrast WCAG AA compliant
- Reduced motion support
- Screen reader friendly

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

## Usage Guidelines

### Do's
✓ Use consistent spacing (4px, 8px, 12px, 16px, 24px, 32px)
✓ Maintain color palette consistency
✓ Use SVG icons instead of emojis
✓ Keep animations subtle and purposeful
✓ Test on mobile devices
✓ Optimize for performance

### Don'ts
✗ Don't use too many animations
✗ Don't mix different design styles
✗ Don't use raster images for icons
✗ Don't ignore accessibility
✗ Don't add unnecessary complexity
✗ Don't forget mobile responsiveness

## File Structure

```
views/
├── index.ejs       # Homepage
├── docs.ejs        # Documentation
└── playground.ejs  # API Playground

public/
├── styles.css      # Custom Tailwind CSS
├── output.css      # Compiled CSS
└── app-motion.js   # Animation library

tailwind.config.js  # Tailwind configuration
```

## Future Enhancements

- Dark/Light mode toggle
- More interactive components
- Advanced animations
- Custom cursor
- Loading states
- Toast notifications system
- Modal components
- Form components
