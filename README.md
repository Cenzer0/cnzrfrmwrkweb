# 🎮 CNZR Framework - Pixel Art Website

Website profile resmi untuk CNZR Framework dengan design pixel art retro yang minimalist dan aesthetic.

## ✨ Features

- 🎨 **Pixel Art Design** - Retro gaming aesthetic dengan modern functionality
- 📱 **Fully Responsive** - Mobile-first design yang sempurna di semua device
- ⚡ **Full CNZR Features** - Memanfaatkan semua fitur CNZR framework
- 📚 **Complete Documentation** - Dokumentasi lengkap dan terstruktur
- 🎮 **Interactive Playground** - Test API endpoints secara real-time
- 🔥 **Scanline Effect** - Retro CRT monitor effect
- 💫 **Smooth Animations** - Pixel-perfect animations

## 🛠️ Tech Stack

- **Framework**: CNZR v2.5.2 (Full features)
- **Styling**: Tailwind CSS + Custom Pixel Art Theme
- **Template Engine**: EJS
- **Fonts**: Press Start 2P, JetBrains Mono

## 📦 Installation

```bash
# Install dependencies
npm install

# Build Tailwind CSS
npm run build

# Start development server
npm run dev
```

## 🎨 Development

```bash
# Watch Tailwind CSS changes (Terminal 1)
npm run watch

# Run development server (Terminal 2)
npm run dev
```

Website akan berjalan di `http://localhost:3000`

## 📁 Project Structure

```
.
├── public/
│   ├── styles.css      # Tailwind input dengan pixel art styles
│   ├── output.css      # Tailwind output (generated)
│   └── app.js          # Client-side JavaScript
├── views/
│   ├── index.ejs       # Homepage dengan pixel art design
│   ├── docs.ejs        # Complete documentation page
│   └── playground.ejs  # Interactive API playground
├── server.js           # CNZR server dengan full features
├── tailwind.config.js  # Custom pixel art theme
└── package.json
```

## 🎯 Pages

### 🏠 Homepage (/)
- Hero section dengan pixel art character
- Stats display (version, downloads, stars, contributors)
- Feature cards dengan pixel art icons
- Code examples dengan syntax highlighting
- Quick links ke docs, playground, dan GitHub

### 📚 Documentation (/docs)
- Complete API reference
- Installation guide
- Quick start tutorial
- Routing (basic, dynamic, file-based)
- Context API documentation
- Middleware examples
- Plugin system guide
- Session & Cookies management
- Error handling
- CLI commands reference

### 🎮 Playground (/playground)
- Interactive API testing
- Real-time request/response
- Quick example templates
- Console logging
- Response time tracking

## 🔌 CNZR Features Used

### Core Features
- ✅ Modern Context API
- ✅ Advanced Routing
- ✅ Session Management
- ✅ Cookie Management
- ✅ Error Handling
- ✅ State Management

### Plugins
- ✅ Logger Plugin (colorized output)
- ✅ CORS Plugin (with credentials)
- ✅ Compression Plugin (level 6)
- ✅ Response Time Plugin
- ✅ Security Headers Plugin
- ✅ Request ID Plugin

### Middleware
- ✅ Context-based middleware
- ✅ Custom state management
- ✅ Request timing

### API Endpoints

```javascript
GET  /                    // Homepage
GET  /docs                // Documentation
GET  /playground          // API Playground
GET  /api/stats           // Framework statistics
GET  /api/features        // Feature list
POST /api/feedback        // Submit feedback
GET  /api/docs/:section   // Dynamic docs section
```

## 🎨 Design System

### Color Palette (Pixel Art Retro)
- Background: `#1a1c2c` (pixel-bg)
- Dark: `#0f0f1e` (pixel-dark)
- Purple: `#5d275d` (pixel-purple)
- Pink: `#b13e53` (pixel-pink)
- Cyan: `#29adff` (pixel-cyan)
- Yellow: `#ffcd75` (pixel-yellow)
- Lime: `#a7f070` (pixel-lime)

### Typography
- Headings: Press Start 2P (pixel font)
- Body: JetBrains Mono (monospace)

### Components
- `pixel-card` - Card dengan shadow pixel art
- `pixel-btn` - Button dengan pixel art style
- `neon-text` - Text dengan neon glow effect
- `scanline` - CRT monitor scanline effect

## 🚀 Deployment

```bash
# Build for production
npm run build

# Start production server
NODE_ENV=production npm run dev
```

## 📝 License

MIT License - Muhammad Falih Afiq (cenzer0)

## 🙏 Credits

- Framework: [CNZR](https://github.com/CenZero/cnzr)
- Design: Pixel art retro gaming aesthetic
- Fonts: Google Fonts (Press Start 2P, JetBrains Mono)

---

Built with ❤️ using CNZR Framework
