# ⚡ Quick Start Guide

Get up and running with CNZR Framework website in 5 minutes!

## 🎯 Prerequisites

- Node.js 16+ installed
- npm or yarn
- Basic knowledge of JavaScript
- Terminal/Command line access

## 📦 Installation

### Step 1: Clone or Download

```bash
# If you have the code
cd cnzr-website

# Or clone from GitHub
git clone https://github.com/CenZero/cnzr-website.git
cd cnzr-website
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- CNZR Framework (v2.5.2)
- Tailwind CSS
- All required dependencies

### Step 3: Build Tailwind CSS

```bash
npm run build
```

This compiles the Tailwind CSS with custom pixel art theme.

### Step 4: Start Development Server

```bash
npm run dev
```

You should see:
```
🎮 CNZR Pixel Website running on http://localhost:3000
```

### Step 5: Open Browser

Navigate to: `http://localhost:3000`

🎉 **You're done!** The website is now running.

---

## 🎨 Development Mode

For active development with auto-reload:

### Terminal 1: Watch Tailwind

```bash
npm run watch
```

This watches for CSS changes and rebuilds automatically.

### Terminal 2: Run Server

```bash
npm run dev
```

Now you can edit files and see changes instantly!

---

## 📁 Project Structure

```
cnzr-website/
├── public/              # Static files
│   ├── styles.css      # Tailwind input
│   ├── output.css      # Generated CSS
│   └── app.js          # Client JS
├── views/              # EJS templates
│   ├── index.ejs       # Homepage
│   ├── docs.ejs        # Documentation
│   └── playground.ejs  # API Playground
├── routes/             # File-based routes
│   ├── index.js
│   └── api/
├── server.js           # Main server
└── tailwind.config.js  # Tailwind config
```

---

## 🎮 Explore the Website

### Homepage (/)
- Pixel art hero section
- Framework statistics
- Feature showcase
- Code examples

### Documentation (/docs)
- Complete API reference
- Installation guide
- Code examples
- Best practices

### Playground (/playground)
- Interactive API testing
- Real-time responses
- Quick examples
- Console logging

---

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=3000
HOST=localhost
NODE_ENV=development
SESSION_SECRET=your-secret-key
```

### Server Configuration

Edit `server.js` to customize:

```javascript
const app = new CenzeroApp({
  port: 3000,
  host: 'localhost',
  staticDir: 'public',
  viewEngine: 'ejs',
  viewsDir: 'views'
});
```

---

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  pixel: {
    bg: '#1a1c2c',      // Background
    cyan: '#29adff',    // Primary
    pink: '#b13e53',    // Secondary
    // Add your colors
  }
}
```

### Fonts

Update in `public/styles.css`:

```css
@import url('your-font-url');

.custom-font {
  font-family: 'Your Font', monospace;
}
```

### Content

Edit EJS files in `views/`:
- `index.ejs` - Homepage content
- `docs.ejs` - Documentation
- `playground.ejs` - Playground

---

## 🚀 Next Steps

### 1. Explore CNZR Features

```javascript
// Context API
app.get('/example', (ctx) => {
  const params = ctx.params;
  const query = ctx.query;
  const body = ctx.body;
  
  return ctx.json({ data: 'example' });
});
```

### 2. Add Custom Routes

Create file in `routes/`:

```javascript
// routes/custom.js
export async function GET(ctx) {
  return ctx.json({ message: 'Custom route!' });
}
```

### 3. Add Middleware

```javascript
app.use((ctx, next) => {
  console.log(`${ctx.req.method} ${ctx.req.url}`);
  return next();
});
```

### 4. Use Plugins

```javascript
import { logger, cors } from 'cnzr';

app.plugin(logger({ level: 'info' }));
app.plugin(cors({ origin: '*' }));
```

---

## 📚 Learn More

### Documentation
- Read `/docs` page
- Check `docs/API.md`
- Review code examples

### CNZR Framework
- [GitHub](https://github.com/CenZero/cnzr)
- [NPM](https://www.npmjs.com/package/cnzr)
- Official documentation

### Resources
- `README.md` - Project overview
- `CONTRIBUTING.md` - Contribution guide
- `CHANGELOG.md` - Version history

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Change port in .env
PORT=3001
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### CSS Not Loading

```bash
# Rebuild Tailwind
npm run build
```

### Server Won't Start

```bash
# Check Node version
node --version  # Should be 16+

# Check for errors
npm run dev
```

---

## 💡 Tips

1. **Hot Reload**: Use `npm run watch` for CSS changes
2. **Debugging**: Check browser console and terminal logs
3. **Testing**: Use `/playground` to test API endpoints
4. **Code Style**: Follow existing patterns in codebase
5. **Git**: Commit often with clear messages

---

## 🎯 Common Tasks

### Add New Page

1. Create EJS file in `views/`
2. Add route in `server.js`
3. Update navigation

### Add API Endpoint

1. Create file in `routes/api/`
2. Export HTTP method functions
3. Test in playground

### Modify Styles

1. Edit `public/styles.css`
2. Run `npm run build`
3. Refresh browser

### Update Content

1. Edit EJS files
2. Restart server
3. Check changes

---

## 🆘 Getting Help

- Check documentation
- Review code examples
- Open GitHub issue
- Ask in community

---

## ✅ Checklist

- [ ] Dependencies installed
- [ ] Tailwind built
- [ ] Server running
- [ ] Browser opened
- [ ] All pages working
- [ ] API endpoints tested
- [ ] Ready to develop!

---

**Happy coding with CNZR! 🎮✨**
