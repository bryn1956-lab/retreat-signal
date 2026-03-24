# Forms

## Current state
The site currently ships with static form mockups.

## Cheapest practical production option
Recommended first backend: **Formspree**

Why:
- fast setup
- no server required
- good fit for static sites
- easy to wire into existing HTML forms

## Suggested form endpoints to create
1. shortlist request form
2. feature your venue form

## Integration pattern
Once Formspree is set up, each form can post directly to its endpoint with standard HTML form actions.

Example:
```html
<form action="https://formspree.io/f/your-id" method="POST">
```

## Other options
- Basin
- StaticForms
- Cloudflare Pages Functions / Workers later

## Recommendation
Start with Formspree now.
Move to Cloudflare-native handling later if the site gets traction.
