# 📦 Installation Guide

Complete installation guide for CNZR Framework website.

## ⚡ Quick Install (Recommended)

```bash
# Clone or download the project
cd cnzr-website

# Install dependencies
npm install

# Build Tailwind CSS
npm run build

# Start server
npm run dev
```

Open browser: `http://localhost:3000`

---

## 📋 Prerequisites

### Required
- **Node.js** 16.0.0 or higher
- **npm** 7.0.0 or higher (comes with Node.js)

### Optional
- **Git** (for cloning repository)
- **PM2** (for production deployment)

### Check Versions

```bash
node --version   # Should be v16+
npm --version    # Should be v7+
```

---

## 🔧 Detailed Installation

### Step 1: Get the Code

#### Option A: Clone from GitHub
```bash
git clone https://github.com/CenZero/cnzr-website.git
cd cnzr-website
```

#### Option B: Download ZIP
1. Download ZIP from GitHub
2. Extract to your desired location
3. Open terminal in that directory

### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- `cnzr@^2.5.2` - CNZR Framework
- `tailwindcss@^3.4.0` - CSS framework

### Step 3: Build Assets

```bash
npm run build
```

This compiles Tailwind CSS with custom pixel art theme.

### Step 4: Configure Environment (Optional)

```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=3000
HOST=localhost
NODE_ENV=development
SESSION_SECRET=your-secret-key-here
```

### Step 5: Start Development Server

```bash
npm run dev
```

You should see:
```
🎮 CNZR Pixel Website running on http://localhost:3000
```

---

## 🎨 Development Setup

For active development with auto-reload:

### Terminal 1: Watch CSS
```bash
npm run watch
```

### Terminal 2: Run Server
```bash
npm run dev
```

Now edit files and see changes instantly!

---

## 🚀 Production Setup

### Build for Production

```bash
# Install production dependencies only
npm install --production

# Build optimized CSS
npm run build

# Start production server
NODE_ENV=production npm run dev
```

### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start server.js --name cnzr-website

# Save configuration
pm2 save

# Setup auto-start on boot
pm2 startup
```

---

## 🐳 Docker Installation

### Using Docker

```bash
# Build image
docker build -t cnzr-website .

# Run container
docker run -p 3000:3000 cnzr-website
```

### Using Docker Compose

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 🔍 Verify Installation

### Check Server
```bash
curl http://localhost:3000
```

### Check API
```bash
curl http://localhost:3000/api/stats
```

### Check Pages
- Homepage: http://localhost:3000
- Docs: http://localhost:3000/docs
- Playground: http://localhost:3000/playground

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Change port in .env
PORT=3001

# Or kill process using port 3000
lsof -i :3000
kill -9 <PID>
```

### Module Not Found

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CSS Not Loading

```bash
# Rebuild Tailwind
npm run build

# Check if output.css exists
ls -la public/output.css
```

### Permission Denied

```bash
# Use sudo (not recommended)
sudo npm run dev

# Or use port > 1024
PORT=8080 npm run dev
```

### Node Version Too Old

```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install latest Node.js
nvm install node
nvm use node
```

---

## 📦 Dependencies

### Production Dependencies
```json
{
  "cnzr": "^2.5.2"
}
```

### Development Dependencies
```json
{
  "tailwindcss": "^3.4.0"
}
```

---

## 🔄 Update

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update all
npm update

# Update specific package
npm update cnzr
```

### Update CNZR Framework

```bash
npm install cnzr@latest
```

---

## 🗑️ Uninstall

```bash
# Remove dependencies
rm -rf node_modules

# Remove generated files
rm -rf public/output.css

# Remove lock file
rm package-lock.json
```

---

## 📝 Next Steps

After installation:

1. ✅ Explore the website
2. ✅ Read documentation at `/docs`
3. ✅ Try playground at `/playground`
4. ✅ Check `docs/QUICKSTART.md`
5. ✅ Review code examples
6. ✅ Start building!

---

## 🆘 Getting Help

- Check `docs/` directory
- Review `README.md`
- Open GitHub issue
- Check CNZR documentation

---

**Installation complete! Happy coding! 🎮✨**
