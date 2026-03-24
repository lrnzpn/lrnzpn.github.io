# Deployment Guide

This guide covers multiple deployment options for your portfolio.

## 🚀 Quick Deploy to GitHub Pages

### Option 1: Automated Deployment (Recommended)

The project includes GitHub Actions for automatic deployment.

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Source: Select `gh-pages` branch
   - Click Save

3. **Automatic Deployment**:
   - Every push to `main` branch triggers automatic build and deployment
   - Check the "Actions" tab to monitor deployment progress
   - Your site will be live at: `https://YOUR_USERNAME.github.io/lrnzportfolio`

### Option 2: Manual Deployment

Deploy manually using the npm script:

```bash
# Install dependencies first
npm install

# Deploy to GitHub Pages
npm run deploy
```

This will:
1. Run linting checks
2. Run tests
3. Build production bundle
4. Deploy to `gh-pages` branch

---

## 📦 Production Build

### Build for Any Platform

```bash
# Production build with all optimizations
npm run build:prod
```

This creates an optimized `dist/` folder with:
- Minified JavaScript (< 40KB gzipped)
- Optimized CSS
- Compressed assets
- Content-hashed filenames for cache busting

### Build Output Structure

```
dist/
├── index.html
├── main.[hash].js
├── main.[hash].css
├── vendors.[hash].js
├── runtime.[hash].js
├── assets/
│   ├── images/
│   └── fonts/
├── manifest.json
└── robots.txt
```

---

## 🌐 Deploy to Other Platforms

### Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   npm run build:prod
   netlify deploy --prod --dir=dist
   ```

Or use **Netlify Drop**: Drag the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

### Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   npm run build:prod
   vercel --prod
   ```

### AWS S3 + CloudFront

1. **Build**:
   ```bash
   npm run build:prod
   ```

2. **Upload to S3**:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

3. **Invalidate CloudFront**:
   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
   ```

### Firebase Hosting

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize**:
   ```bash
   firebase init hosting
   # Select 'dist' as public directory
   # Configure as single-page app: Yes
   ```

3. **Deploy**:
   ```bash
   npm run build:prod
   firebase deploy
   ```

---

## 🔧 Configuration

### Update Homepage URL

Edit `package.json`:

```json
{
  "homepage": "https://yourdomain.com"
}
```

For GitHub Pages:
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/REPO_NAME"
}
```

### Custom Domain (GitHub Pages)

1. Add a `CNAME` file to `public/`:
   ```
   yourdomain.com
   ```

2. Configure DNS:
   - Add A records pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add CNAME record: `YOUR_USERNAME.github.io`

3. Enable HTTPS in repository settings

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All tests pass: `npm test`
- [ ] No linting errors: `npm run lint`
- [ ] Bundle size is acceptable: `npm run analyze`
- [ ] Updated `portfolio.json` with your data
- [ ] Added your images to `src/assets/images/`
- [ ] Updated colors/branding in SCSS variables
- [ ] Tested on multiple browsers
- [ ] Verified accessibility with screen reader
- [ ] Updated `homepage` in package.json

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build:prod
```

### GitHub Pages Shows 404

- Ensure `gh-pages` branch exists
- Check repository settings > Pages
- Verify homepage URL in package.json matches your GitHub Pages URL
- Wait a few minutes for deployment to propagate

### Assets Not Loading

- Check that `homepage` in package.json is correct
- Verify paths in your code are relative (start with `./` or `/`)
- Check browser console for 404 errors

### Bundle Too Large

```bash
# Analyze bundle
npm run analyze

# Check what's taking up space
# Remove unused dependencies
# Implement code splitting for large libraries
```

---

## 📊 Monitoring

After deployment, monitor:

- **Performance**: Use Lighthouse CI (runs automatically on PRs)
- **Analytics**: Check browser console for analytics events
- **Errors**: Monitor browser console for runtime errors
- **Bundle Size**: GitHub Actions checks on every build

---

## 🔄 Continuous Deployment

The project includes GitHub Actions that automatically:

1. ✅ Lint code
2. ✅ Run tests
3. ✅ Build production bundle
4. ✅ Validate bundle size (< 40KB)
5. ✅ Deploy to GitHub Pages (main branch only)

View workflow status: `.github/workflows/ci.yml`

---

## 📝 Quick Commands Reference

| Command | Description |
|---------|-------------|
| `npm run build` | Build for production |
| `npm run build:prod` | Build with tests and linting |
| `npm run deploy` | Deploy to GitHub Pages |
| `npm run analyze` | Analyze bundle size |

---

**Need help?** Check the [README](README.md) or open an issue on GitHub.
