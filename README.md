# 🍾 Uncorked

A playful website game that teaches the basics of wine (inspired by the core topics of WSET Level 1), so people can order with confidence at the restaurant or the supermarket.

It's plain HTML, CSS and JavaScript with no build step and nothing to install.

## Files

| File | What it is |
|---|---|
| `index.html` | The page shell |
| `css/style.css` | All the styling (colours are at the top) |
| `js/data.js` | **All the content**: grapes, questions, levels, cheat sheet. Edit this to change what the game teaches. |
| `js/app.js` | The game engine |
| `sw.js`, `manifest.webmanifest`, `icon.svg` | Offline support and "add to home screen" |

## Run it on your computer

From this folder, run:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

You can also double-click `index.html`. Everything works except offline mode, which needs the site to be served over http(s).

## Live site

**https://harryknightrider.github.io/uncorked/** (code: https://github.com/harryknightrider/uncorked)

To publish changes: bump `VERSION` in `sw.js`, then run `git add -A && git commit -m "What changed" && git push`. The site updates about a minute later.

## Publish on GitHub Pages (from scratch)

1. Create a new repository on GitHub and upload these files (keep the folder structure).
2. In the repository, go to **Settings → Pages**.
3. Under "Build and deployment", choose **Deploy from a branch**, then branch `main` and folder `/ (root)`. Save.
4. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

**When you update files later:** change `VERSION` in `sw.js` (e.g. `uncorked-v2`) so returning players get the new version instead of a cached copy.

## Editing content

- **Add a question:** add an entry to `QUESTIONS` in `js/data.js`, then list its id in a Cellar's `questions` or in a `FINAL_TEST` pool.
- **Change a grape:** edit its entry in `GRAPES`. `map.x` is body (0 light → 100 full) and `map.y` is fruity (0) → savoury (100).
- **Add a Cellar:** copy an existing one in `CELLARS` and remove `comingSoon: true`. Step types: `learn`, `sort`, `mcq`, `recall`, `whoami`, `order`, `pair`.

*Not affiliated with WSET. Please drink responsibly.*
