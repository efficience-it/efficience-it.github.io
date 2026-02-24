# Explanation

## Why questions are in a separate repository

The quiz app and the question banks are decoupled intentionally:

- **Independent contribution cycles.** Subject-matter experts can add or fix questions without touching the app code, and vice versa.
- **Reusability.** The same YAML question bank could be consumed by a different frontend, a CLI tool, or a CI pipeline.
- **Versioning.** The app pins a specific branch (`v1.5`). A breaking change in the question format can be developed on a new branch without affecting the live app until the app explicitly upgrades.

## Why no build step

The app is intentionally a zero-build static site:

- **Low barrier to contribution.** Anyone can clone, open `index.html`, and start working. No Node.js, no bundler, no config files.
- **GitHub Pages compatibility.** The repo deploys as-is. Push to `main` and it's live.
- **Simplicity.** With ~400 lines of JavaScript total, a build pipeline would add complexity without meaningful benefit.

Tailwind CSS is loaded from the CDN rather than compiled. This adds ~60KB to initial load but avoids introducing a build dependency.

## Why localStorage for history

Quiz history is stored in `localStorage` because:

- **No backend.** The app is fully client-side, so browser storage is the only option.
- **Persistence.** Unlike `sessionStorage`, data survives tab and browser restarts.
- **Simplicity.** The 10-entry cap keeps storage usage negligible.

The trade-off is that history is per-browser and is lost if the user clears their browser data. This is acceptable for a training tool.

## Why sessionStorage for question cache

Fetched YAML files are cached in `sessionStorage` to avoid re-downloading ~20 files on every quiz restart. `sessionStorage` was chosen over `localStorage` because:

- **Automatic expiry.** Cache clears when the tab closes, so users always get fresh questions on a new visit.
- **No stale data risk.** If questions are updated upstream, the next session picks them up automatically.

## Why Tailwind CSS

Tailwind was chosen for the redesign because:

- **Utility classes keep styles co-located with markup.** In a small project with no components framework, this is more maintainable than separate CSS files.
- **Consistent design tokens.** Spacing, colors, and typography follow a coherent scale without manual definition.
- **CDN usage avoids a build step**, which aligns with the zero-build philosophy above.
