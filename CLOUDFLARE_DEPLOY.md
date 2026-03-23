# Deploying CNZR Framework to Cloudflare

This guide covers deploying the CNZR Framework website to Cloudflare using different methods.

## Option 1: Cloudflare Pages (Recommended for Static + Functions)

### Prerequisites
- Cloudflare account
- Git repository (GitHub, GitLab, or Bitbucket)
- Node.js 16+ installed locally

### Step 1: Prepare Your Repository

1. Initialize git if not already done:
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Push to GitHub/GitLab:
```bash
git remote add origin https://github.com/YOUR_USERNAME/cnzr-framework.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Connect your Git repository
4. Configure build settings:
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `public`
   - **Root directory**: `/`

5. Environment variables (optional):
   ```
   NODE_VERSION=18
   NPM_VERSION=9
   ```

6. Click **Save and Deploy**

### Step 3: Configure Functions (for API routes)

Since this is a Node.js application with server-side logic, you'll need to adapt it for Cloudflare Pages Functions:

1. Create `functions` directory in your project root
2. Move API routes to `functions/api/` directory
3. Each file becomes a serverless function

Example structure:
```
functions/
  api/
    stats.js
    features.js
    feedback.js
```

## Option 2: Cloudflare Workers (For Full Node.js App)

### Prerequisites
- Install Wrangler CLI:
```bash
npm install -g wrangler
```

### Step 1: Login to Cloudflare
```bash
wrangler login
```

### Step 2: Initialize Wrangler
```bash
wrangler init
```

### Step 3: Configure wrangler.toml
The `wrangler.toml` file has been created in your project root.

### Step 4: Deploy
```bash
wrangler deploy
```

## Option 3: Cloudflare Pages + External Backend

For the best performance, consider splitting the application:

### Frontend (Cloudflare Pages)
- Static HTML, CSS, JavaScript
- Views rendered as static pages
- Deploy to Cloudflare Pages

### Backend (Cloudflare Workers or other hosting)
- API endpoints
- Server-side logic
- Deploy separately

## Recommended Approach: Hybrid Deployment

Since CNZR Framework uses server-side rendering (EJS templates), here's the recommended approach:

### 1. Convert to Static Site Generator (SSG)

Create a build script to pre-render pages:

```javascript
// build-static.js
import fs from 'fs';
import ejs from 'ejs';
import path from 'path';

const pages = ['index', 'docs', 'playground', 'community', 'privacy', 'terms'];

pages.forEach(page => {
  const template = fs.readFileSync(`views/${page}.ejs`, 'utf-8');
  const html = ejs.render(template, {
    title: page.charAt(0).toUpperCase() + page.slice(1)
  });
  fs.writeFileSync(`dist/${page}.html`, html);
});
```

### 2. Deploy Static Files to Cloudflare Pages

```bash
npm run build:static
# Deploy dist/ folder to Cloudflare Pages
```

### 3. Deploy API Routes to Cloudflare Workers

Create separate Workers for API endpoints:
- `/api/stats` → Worker function
- `/api/features` → Worker function
- `/api/feedback` → Worker function

## Quick Deploy Script

Add to `package.json`:

```json
{
  "scripts": {
    "build:css": "tailwindcss -i ./public/styles.css -o ./public/output.css --minify",
    "build:static": "node build-static.js",
    "build": "npm run build:css && npm run build:static",
    "deploy:pages": "wrangler pages deploy dist",
    "deploy:worker": "wrangler deploy"
  }
}
```

## Environment Variables

Set these in Cloudflare Dashboard:

```
NODE_ENV=production
PORT=8080
```

## Custom Domain Setup

1. Go to Cloudflare Pages → Your Project → Custom domains
2. Add your domain (e.g., `cnzr.dev`)
3. Cloudflare will automatically configure DNS

## Performance Optimization

### Enable Cloudflare Features:
- ✅ Auto Minify (HTML, CSS, JS)
- ✅ Brotli compression
- ✅ HTTP/3 (QUIC)
- ✅ Early Hints
- ✅ Rocket Loader
- ✅ Mirage (image optimization)

### Cache Rules:
```
# Static assets - cache for 1 year
/output.css - Cache Level: Standard, Edge TTL: 1 year
/app-motion.js - Cache Level: Standard, Edge TTL: 1 year
/favicon.svg - Cache Level: Standard, Edge TTL: 1 year

# HTML pages - cache for 5 minutes
/*.html - Cache Level: Standard, Edge TTL: 5 minutes
```

## Monitoring

1. Enable **Web Analytics** in Cloudflare Dashboard
2. Set up **Alerts** for:
   - High error rates
   - Traffic spikes
   - Performance degradation

## Troubleshooting

### Build Fails
- Check Node.js version (must be 16+)
- Verify all dependencies are in `package.json`
- Check build logs in Cloudflare Dashboard

### 404 Errors
- Verify build output directory is correct
- Check that all static files are in `public/` or `dist/`
- Configure redirects in `_redirects` file

### API Routes Not Working
- Ensure Functions are in `functions/` directory
- Check function syntax matches Cloudflare Workers API
- Review function logs in Dashboard

## Cost Estimate

Cloudflare Pages Free Tier:
- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ 500 builds per month
- ✅ 1 build at a time

Cloudflare Workers Free Tier:
- ✅ 100,000 requests per day
- ✅ 10ms CPU time per request

## Next Steps

1. ✅ Push code to Git repository
2. ✅ Connect repository to Cloudflare Pages
3. ✅ Configure build settings
4. ✅ Deploy and test
5. ✅ Add custom domain (optional)
6. ✅ Enable performance features
7. ✅ Set up monitoring

## Support

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)

---

**Note**: Since this is a Node.js application with server-side rendering, you may need to adapt it for serverless deployment. Consider using Cloudflare Workers with Hono or similar framework for best results.
