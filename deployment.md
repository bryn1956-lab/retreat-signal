# Deployment Plan

## Current status
The site is a static build generated into:
- `projects/retreat-directory/site/dist`

## Cheapest practical deployment options
### 1. GitHub Pages
Pros:
- free
- simple for static sites
- good enough for MVP
Cons:
- weaker form handling by default
- less flexible if we later add dynamic endpoints

### 2. Cloudflare Pages
Pros:
- free tier
- very fast static hosting
- can later add lightweight functions/forms logic
- good long-term option
Cons:
- requires Cloudflare account/project setup

### 3. Netlify
Pros:
- simple static deploys
- forms can be easy
Cons:
- another platform dependency
- less appealing than Cloudflare Pages for long-term flexibility

## Recommendation
Use **Cloudflare Pages** if available.
Fallback to **GitHub Pages** for the fastest zero-cost publish.

## Build settings
- project root: `projects/retreat-directory/site`
- build command: `npm run build`
- output directory: `dist`

## Form handling options
### Fastest cheap path
Use a dedicated form backend later or route submissions to email.

### Current MVP state
The forms are static mockups only.

## What we still need from Eric
To actually publish externally, one of these:
- Cloudflare account access
- GitHub repo + Pages preference
- Netlify preference
- domain choice, if using custom domain
