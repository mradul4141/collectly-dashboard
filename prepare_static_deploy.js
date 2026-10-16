const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const appDir = path.join(rootDir, '.next', 'server', 'app');
const staticDest = path.join(rootDir, '.netlify', 'static');

console.log('Preparing static deploy in:', staticDest);
if (!fs.existsSync(staticDest)) {
  fs.mkdirSync(staticDest, { recursive: true });
}

// 1. Copy public assets if not already there
const publicDir = path.join(rootDir, 'public');
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, staticDest, { recursive: true });
}

// 2. Ensure _next/static is present
const nextStatic = path.join(rootDir, '.next', 'static');
const destNextStatic = path.join(staticDest, '_next', 'static');
if (fs.existsSync(nextStatic)) {
  fs.cpSync(nextStatic, destNextStatic, { recursive: true });
}

// 3. Recursively copy all html files from .next/server/app
function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.html')) {
      const relPath = path.relative(appDir, fullPath);
      // e.g. "index.html", "dashboard.html", "dashboard/invoices.html"
      const targetPath = path.join(staticDest, relPath);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.copyFileSync(fullPath, targetPath);

      // Also create folder/index.html for clean URLs (e.g., dashboard.html -> dashboard/index.html)
      if (file !== 'index.html' && file !== '_global-error.html' && file !== '_not-found.html') {
        const withoutExt = relPath.replace(/\.html$/, '');
        const cleanDir = path.join(staticDest, withoutExt);
        fs.mkdirSync(cleanDir, { recursive: true });
        fs.copyFileSync(fullPath, path.join(cleanDir, 'index.html'));
      }

      if (file === '_not-found.html') {
        fs.copyFileSync(fullPath, path.join(staticDest, '404.html'));
      }
    }
  }
}

if (fs.existsSync(appDir)) {
  walk(appDir);
}

// 4. Create _headers
const headersContent = `/_next/static/*
  Cache-Control: public, max-age=31536000, immutable
/*
  X-Content-Type-Options: nosniff
`;
fs.writeFileSync(path.join(staticDest, '_headers'), headersContent);

// 5. Create _redirects
const redirectsContent = `/_next/*  /_next/:splat  200
`;
fs.writeFileSync(path.join(staticDest, '_redirects'), redirectsContent);

console.log('Static directory successfully prepared with all HTML pages, CSS chunks, and assets!');
