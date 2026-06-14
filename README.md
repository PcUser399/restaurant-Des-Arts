# Restaurant des Arts

Premium restaurant website built as a static HTML/CSS site with Vite.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Netlify Settings

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: current LTS is recommended

The site is static, so Netlify can publish the generated `dist` folder directly. A `_redirects` file may remain in `public`, but client-side routing is no longer required.
