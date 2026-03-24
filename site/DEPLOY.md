# DEPLOY

## Static build
From this directory:

```bash
npm run build
```

Publish the generated `dist/` directory.

## Recommended host
### Cloudflare Pages
- Framework preset: None
- Build command: `npm run build`
- Build output directory: `dist`

### GitHub Pages
Build locally or in CI, then publish `dist/`.

## Current blockers to live deployment
External deployment requires account access on the selected host.

## Form handling
Current forms are mockups only. Next cheap options:
- Formspree
- Basin
- Netlify Forms (if deployed there)
- Cloudflare Workers / Pages Functions later
