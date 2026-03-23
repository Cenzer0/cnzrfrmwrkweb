import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Pages to build
const pages = [
  { name: 'index', title: 'CNZR - Modern Node.js Framework' },
  { name: 'docs', title: 'Documentation - CNZR' },
  { name: 'playground', title: 'API Playground - CNZR' },
  { name: 'community', title: 'Community - CNZR Framework' },
  { name: 'privacy', title: 'Privacy Policy - CNZR' },
  { name: 'terms', title: 'Terms of Service - CNZR' }
];

// Simple template processor (since we're not using complex EJS features)
function processTemplate(content, data) {
  // Replace <%= title %> with actual title
  content = content.replace(/<%=\s*title\s*%>/g, data.title || 'CNZR Framework');
  
  // Remove any remaining EJS tags (for simple cases)
  content = content.replace(/<%.*?%>/g, '');
  
  return content;
}

// Build each page
pages.forEach(page => {
  try {
    const templatePath = path.join(__dirname, 'views', `${page.name}.ejs`);
    const outputPath = path.join(distDir, page.name === 'index' ? 'index.html' : `${page.name}.html`);
    
    console.log(`Building ${page.name}...`);
    
    let content = fs.readFileSync(templatePath, 'utf-8');
    content = processTemplate(content, { title: page.title });
    
    fs.writeFileSync(outputPath, content);
    console.log(`✓ Built ${page.name}.html`);
  } catch (error) {
    console.error(`✗ Error building ${page.name}:`, error.message);
  }
});

// Copy public assets to dist
const publicDir = path.join(__dirname, 'public');
const publicFiles = fs.readdirSync(publicDir);

publicFiles.forEach(file => {
  const srcPath = path.join(publicDir, file);
  const destPath = path.join(distDir, file);
  
  if (fs.statSync(srcPath).isFile()) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Copied ${file}`);
  }
});

// Create _redirects file for SPA-like routing
const redirects = `
# Redirect rules for Cloudflare Pages
/docs /docs.html 200
/playground /playground.html 200
/community /community.html 200
/privacy /privacy.html 200
/terms /terms.html 200

# API routes (will need to be handled by Functions)
/api/* /api/:splat 200
/health /api/health 200
`;

fs.writeFileSync(path.join(distDir, '_redirects'), redirects.trim());
console.log('✓ Created _redirects file');

// Create _headers file for security and caching
const headers = `
# Security headers
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()

# Cache static assets
/output.css
  Cache-Control: public, max-age=31536000, immutable

/app-motion.js
  Cache-Control: public, max-age=31536000, immutable

/favicon.svg
  Cache-Control: public, max-age=31536000, immutable

# Cache HTML with shorter duration
/*.html
  Cache-Control: public, max-age=300, must-revalidate
`;

fs.writeFileSync(path.join(distDir, '_headers'), headers.trim());
console.log('✓ Created _headers file');

console.log('\n✅ Build complete! Deploy the dist/ folder to Cloudflare Pages.');
console.log('\nNext steps:');
console.log('1. Run: wrangler pages deploy dist');
console.log('2. Or connect your Git repo to Cloudflare Pages Dashboard');
