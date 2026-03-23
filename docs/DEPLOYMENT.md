# 🚀 Deployment Guide

Guide untuk deploy CNZR Framework website ke production.

## 📋 Pre-deployment Checklist

- [ ] Update environment variables
- [ ] Build Tailwind CSS
- [ ] Test all endpoints
- [ ] Check responsive design
- [ ] Verify security headers
- [ ] Update session secret
- [ ] Configure CORS origins
- [ ] Set NODE_ENV=production

## 🔧 Environment Setup

### 1. Create .env file

```bash
cp .env.example .env
```

### 2. Update production values

```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
SESSION_SECRET=your-strong-random-secret-here
CORS_ORIGIN=https://yourdomain.com
```

### 3. Build assets

```bash
npm run build
```

## 🌐 Deployment Options

### Option 1: Node.js Server

#### Requirements
- Node.js 16+
- npm or yarn

#### Steps

```bash
# Install dependencies
npm install --production

# Build Tailwind
npm run build

# Start server
NODE_ENV=production node server.js
```

#### Using PM2 (Recommended)

```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start server.js --name cnzr-website

# Save PM2 config
pm2 save

# Setup startup script
pm2 startup
```

---

### Option 2: Docker

#### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", "server.js"]
```

#### Build and run

```bash
# Build image
docker build -t cnzr-website .

# Run container
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e SESSION_SECRET=your-secret \
  cnzr-website
```

#### Docker Compose

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - SESSION_SECRET=${SESSION_SECRET}
    restart: unless-stopped
```

---

### Option 3: Vercel

#### Install Vercel CLI

```bash
npm install -g vercel
```

#### Create vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

#### Deploy

```bash
vercel --prod
```

---

### Option 4: Railway

1. Push code to GitHub
2. Connect Railway to your repo
3. Set environment variables
4. Deploy automatically

---

### Option 5: Heroku

#### Create Procfile

```
web: node server.js
```

#### Deploy

```bash
# Login to Heroku
heroku login

# Create app
heroku create cnzr-website

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set SESSION_SECRET=your-secret

# Deploy
git push heroku main
```

---

## 🔒 Security Considerations

### 1. Session Secret

Generate strong secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. CORS Configuration

Update in server.js:

```javascript
app.plugin(cors({
  origin: ['https://yourdomain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
```

### 3. Security Headers

Already configured via securityHeaders plugin:

```javascript
app.plugin(securityHeaders());
```

### 4. HTTPS

Always use HTTPS in production. Configure via:
- Reverse proxy (nginx, Apache)
- Cloud provider (Vercel, Railway)
- Let's Encrypt certificates

---

## 🔄 Reverse Proxy (Nginx)

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### SSL with Let's Encrypt

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## 📊 Monitoring

### PM2 Monitoring

```bash
# View logs
pm2 logs cnzr-website

# Monitor resources
pm2 monit

# View status
pm2 status
```

### Health Check Endpoint

Add to server.js:

```javascript
app.get('/health', (ctx) => {
  return ctx.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});
```

---

## 🔧 Performance Optimization

### 1. Enable Compression

Already configured:

```javascript
app.plugin(compression({ level: 6 }));
```

### 2. Static File Caching

Configure in server.js:

```javascript
const app = new CenzeroApp({
  staticDir: 'public',
  staticOptions: {
    maxAge: '1d',
    etag: true
  }
});
```

### 3. CDN for Static Assets

Upload to CDN:
- Cloudflare
- AWS CloudFront
- Vercel Edge Network

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Permission Denied

```bash
# Use port > 1024 or run with sudo
sudo node server.js
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📈 Scaling

### Horizontal Scaling

Use PM2 cluster mode:

```bash
pm2 start server.js -i max
```

### Load Balancing

Use nginx or cloud load balancer to distribute traffic across multiple instances.

---

## 🔄 CI/CD

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm test
      - name: Deploy
        run: |
          # Your deployment script
```

---

## 📝 Post-deployment

1. Test all endpoints
2. Check logs for errors
3. Monitor performance
4. Set up alerts
5. Document any issues

---

## 🆘 Support

If you encounter issues:
1. Check logs
2. Review configuration
3. Test locally first
4. Open GitHub issue

---

Happy deploying! 🚀
