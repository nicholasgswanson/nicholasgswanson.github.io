# Site setup notes

Jekyll site (academicpages theme, a fork of Minimal Mistakes) for Nicholas Swanson, hosted on GitHub Pages at `nicholasgswanson.github.io`.

## Local preview

Run `./preview.sh` from the repo root, then open `http://localhost:4000`. It watches files and rebuilds on save — just refresh the browser.

Two things this script handles that aren't obvious:

- **Locale.** This machine's shell has no `LANG`/`LC_ALL` set, so Ruby defaults to US-ASCII and the Sass compiler crashes on any non-ASCII character (e.g. an em dash). The script sets `LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8`.
- **Config.** It passes `--config _config.yml,_config.dev.yml` so generated links point at `localhost:4000` instead of the production URL. Without this, `{% include base_path %}` resolves to `https://nicholasgswanson.github.io/...`, so the page tries to load CSS/assets from the live site over the network instead of from the local build.

If you ever build/serve manually instead of via the script, include both of those or pages will look unstyled or load stale production CSS.

## iCloud Drive warning

This repo lives under `~/Documents/GitHub/...`, which is synced by iCloud Drive (Desktop & Documents sync). iCloud syncs `.git` internals (pack files, refs, locks) in the background, and it can collide with git/GitHub Desktop mid-operation — this is what causes the occasional "a lock file already exists in the repository" error in GitHub Desktop. It's usually transient (no actual `.git/index.lock` left behind); closing the dialog and retrying after a few seconds resolves it. If it keeps recurring, the real fix is moving the repo to a non-iCloud-synced path (e.g. `~/Developer/`).

## Design decisions (2026-06-26 redesign)

- Dropped the theme's persistent sidebar/author-profile/"Follow" button site-wide (removed the `{% include sidebar.html %}` call from `_layouts/single.html`, `archive.html`, `talk.html`). Pages are now a single centered column (`$content-width: 740px` in `_sass/_variables.scss`).
- Homepage (`_pages/about.md`) has a custom hero intro (photo + name + title + Email/CV/Research links) instead of the sidebar widget. Styles in `_sass/_custom.scss` under `.home-intro`.
- Accent color is blue (`$accent-color` in `_sass/_variables.scss`, currently `#2B6CB0`) — used for links, hover states, and list numbering. (Was briefly Cornell red; changed back to a normal blue per feedback — don't reintroduce red.)
- Fixed a real pre-existing bug in `_sass/_reset.scss`: the global `a { color: $link-color }` rule was losing to the browser's built-in `a:link`/`a:visited` styles on specificity, so the theme's link color was never actually showing. Now targets `a:link, a:visited` explicitly.
- Research/Teaching pages use a `.pub-list` numbered-list pattern (`_sass/_custom.scss`): an `<ol class="pub-list" markdown="1">` of `<li markdown="1">` items, each with `{: .pub-title}` / `{: .pub-authors}` / `{: .pub-venue}` IAL classes on the markdown paragraphs. Numbering is CSS counter-based (auto-renumbers if you add/remove/reorder entries).
  - **kramdown gotcha:** `markdown="1"` does *not* cascade to children — it has to be set on every nested HTML block you want parsed as markdown (hence it's on both the `<ol>` and each `<li>`).
- Abstracts are hidden by default behind a "Abstract" toggle button (`.pub-abstract-toggle` / `.pub-abstract.is-open`), driven by `assets/js/pub-toggle.js` (vanilla JS, no jQuery, click-delegated). Loaded via `_includes/scripts.html`.
- Teaching page is `_pages/teaching.md` — **not** the old `_teaching` collection (those placeholder files were deleted). To add a course, copy one of the existing `<li>` blocks in that file directly; don't recreate the collection.
- CV: nav and homepage both link **directly to the PDF** (`/files/Swanson_cv_v13.pdf`), not to an in-page viewer — an `<iframe>` embed was tried and rejected (shows the browser's native PDF toolbar, looks bad). `_pages/cv.md` still exists at `/cv/` as a fallback (simple link) for anyone who lands there directly, but nothing routes there now.
- `Swanson_cv_v13.pdf` (Mar 2025) is the current CV. There are several stale CV PDFs in `/files/` (`1_swanson_cv.pdf`, `Swanson_cv_v8.pdf`, `Swanson_cv_Nov20.pdf`, `Swanson_cv_v13 copy.pdf`) — don't link to those, they're outdated.
