# Deepwoken.app

A fanmade Deepwoken website with pages like a talent creator, an item creator and more. Made by zalaxis.

## Project structure

```text
.
├── assets/                 # Public static assets
│   ├── audio/
│   ├── fonts/
│   ├── images/
│   ├── iframes/
│   ├── music/
│   ├── scripts/            # Browser JavaScript
│   ├── styles/             # CSS
│   └── templates/          # Reusable HTML templates / iframe documents
│
├── data/                   # JSON data used by the site
│   ├── destroyman/
│   └── traan/
│
├── src/
│   └── pages/              # HTML pages, grouped by purpose
│       ├── game/
│       ├── legacy/
│       ├── site/
│       ├── tools/
│       └── world/
│           ├── map/
│           ├── market/
│           └── stock/
│
├── tests/                  # Development/test pages
├── sandbox/                # Temporary screenshots and experiments
├── public root files       # favicon, manifest, robots, error pages
└── vercel.json             # Clean URL routing
```

## URLs vs. source files

The source tree is intentionally separate from public URLs. For example:

```text
src/pages/tools/talent-creator.html
                ↓
https://deepwoken.app/talent-creator
```

Vercel handles this through `vercel.json`, so pages can be reorganized without exposing the internal source layout.

## Development

For local development, use a static server that serves the repository root. The included `assets/scripts/local-paths.js` maps the site's clean URLs to the reorganized source files when running on `localhost`.

For the closest match to production routing, use Vercel's local development server (`vercel dev`).

## Adding a new page

1. Put the HTML in the appropriate `src/pages/` category.
2. Add a clean route to `vercel.json`.
3. Add the corresponding local route to `assets/scripts/local-paths.js` if the page needs to work through clean URLs on a basic local server.
4. Keep reusable JavaScript in `assets/scripts/` and reusable CSS in `assets/styles/`.
5. Keep game/content data in `data/` instead of embedding large datasets in page files.
