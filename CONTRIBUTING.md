# 🎮 Contributing to CNZR Website

Thank you for your interest in contributing! This document provides guidelines for contributing to the CNZR Framework website.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/cnzr-website.git`
3. Install dependencies: `npm install`
4. Build Tailwind: `npm run build`
5. Start dev server: `npm run dev`

## 📁 Project Structure

```
.
├── public/          # Static assets
├── views/           # EJS templates
├── routes/          # File-based routes (examples)
├── server.js        # Main server file
└── tailwind.config.js
```

## 🎨 Design Guidelines

### Pixel Art Style
- Use pixel-perfect measurements (multiples of 4px)
- Maintain retro gaming aesthetic
- Use defined color palette from tailwind.config.js
- Keep animations simple and snappy

### Colors
```javascript
pixel-bg      // #1a1c2c - Main background
pixel-dark    // #0f0f1e - Dark elements
pixel-purple  // #5d275d - Primary accent
pixel-pink    // #b13e53 - Secondary accent
pixel-cyan    // #29adff - Links & highlights
pixel-yellow  // #ffcd75 - Warnings & emphasis
pixel-lime    // #a7f070 - Success states
```

### Typography
- Headings: `font-pixel` (Press Start 2P)
- Body: `font-mono` (JetBrains Mono)
- Code: `font-mono` with syntax highlighting

## 🔧 Development Workflow

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly
4. Commit with clear messages
5. Push to your fork
6. Create a Pull Request

## ✅ Code Standards

### JavaScript
- Use ES6+ features
- Async/await for promises
- Clear variable names
- Add comments for complex logic

### CSS/Tailwind
- Use utility classes first
- Custom classes in `@layer components`
- Follow pixel art design system
- Maintain responsive design

### EJS Templates
- Keep templates clean and readable
- Use partials for reusable components
- Proper indentation
- Semantic HTML

## 🧪 Testing

Before submitting:
- [ ] Test all pages (/, /docs, /playground)
- [ ] Test API endpoints
- [ ] Check responsive design (mobile, tablet, desktop)
- [ ] Verify all links work
- [ ] Test in different browsers
- [ ] Check console for errors

## 📝 Commit Messages

Use clear, descriptive commit messages:

```
feat: Add new playground feature
fix: Resolve navigation bug on mobile
docs: Update API documentation
style: Improve pixel art animations
refactor: Optimize server routes
```

## 🐛 Bug Reports

When reporting bugs, include:
- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Browser/OS information

## 💡 Feature Requests

For new features:
- Describe the feature clearly
- Explain the use case
- Provide examples if possible
- Consider design implications

## 📚 Documentation

When adding features:
- Update relevant documentation
- Add code examples
- Update README if needed
- Add comments in code

## 🎯 Pull Request Process

1. Update documentation
2. Add/update tests if applicable
3. Ensure code follows style guidelines
4. Update CHANGELOG.md
5. Request review from maintainers

## 🙏 Thank You!

Your contributions make CNZR better for everyone. We appreciate your time and effort!

---

Questions? Open an issue or reach out to the maintainers.
