# Quick Start: Deploy to Cloudflare Pages

## 🚀 Fastest Way to Deploy (5 minutes)

### Method 1: Using Cloudflare Dashboard (No CLI needed)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git remote add origin https://github.com/YOUR_USERNAME/cnzr-framework.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Click **Pages** → **Create a project**
   - Click **Connect to Git**
   - Select your repository
   - Configure:
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Root directory**: `/`
   - Click **Save and Deploy**

3. **Done!** Your site will be live at `https://your-project.pages.dev`

### Method 2: Using Wrangler CLI (Direct Deploy)

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Build and Deploy**
   ```bash
   npm run deploy
   ```

4. **Done!** Your site is live!

## 📁 What Gets Deployed

```
dist/
├── index.html          # Homepage
├── docs.html           # Documentation
├── playground.html     # API Playground
├── community.html      # Community page
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service
├── output.css          # Compiled Tailwind CSS
├── app-motion.js       # Animations
├── favicon.svg         # Favicon
├── _redirects          # URL routing rules
└── _headers            # Security headers

functions/
└── api/
    ├── health.js       # Health check endpoint
    ├── stats.js        # Statistics endpoint
    ├── features.js     # Features list endpoint
    └── feedback.js     # Feedback submission endpoint
```

## 🔧 Build Process

The build script (`build-static.js`) does:
1. ✅ Converts EJS templates to static HTML
2. ✅ Copies all public assets (CSS, JS, images)
3. ✅ Creates `_redirects` for routing
4. ✅ Creates `_headers` for security
5. ✅ Minifies CSS with Tailwind

## 🌐 API Endpoints

After deployment, these endpoints will work:

- `GET /api/health` - Server health check
- `GET /api/stats` - Framework statistics
- `GET /api/features` - List of features
- `POST /api/feedback` - Submit feedback

Example:
```bash
curl https://your-project.pages.dev/api/health
```

## 🎯 Custom Domain

1. Go to your project in Cloudflare Pages
2. Click **Custom domains**
3. Click **Set up a custom domain**
4. Enter your domain (e.g., `cnzr.dev`)
5. Cloudflare automatically configures DNS

## 🔒 Environment Variables

If you need environment variables:

1. Go to **Settings** → **Environment variables**
2. Add variables:
   ```
   NODE_ENV=production
   API_KEY=your_secret_key
   ```

## 📊 Monitoring

After deployment, monitor your site:

1. **Analytics**: Pages → Your Project → Analytics
2. **Logs**: Pages → Your Project → Functions → Logs
3. **Performance**: Use Cloudflare Web Analytics

## 🐛 Troubleshooting

### Build fails?
```bash
# Test build locally first
npm run build

# Check if dist/ folder is created
ls -la dist/
```

### API not working?
- Check `functions/api/` files exist
- View function logs in Cloudflare Dashboard
- Test locally with `wrangler pages dev dist`

### 404 errors?
- Verify `_redirects` file exists in dist/
- Check build output directory is set to `dist`

## 🚀 Deploy Updates

After making changes:

```bash
# Method 1: Git push (auto-deploys)
git add .
git commit -m "Update website"
git push

# Method 2: Direct deploy
npm run deploy
```

## 💰 Cost

**FREE** on Cloudflare Pages:
- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ 500 builds/month
- ✅ 100,000 function invocations/day

## 📚 Next Steps

1. ✅ Deploy to Cloudflare Pages
2. ✅ Add custom domain
3. ✅ Enable Web Analytics
4. ✅ Set up alerts
5. ✅ Configure caching rules
6. ✅ Add more API endpoints as needed

## 🆘 Need Help?

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)
- [GitHub Issues](https://github.com/CenZero/cnzr/issues)

---

**Ready to deploy?** Run `npm run deploy` now! 🚀
