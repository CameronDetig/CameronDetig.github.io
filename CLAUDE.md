# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site (AI/ML projects, about page) hosted on GitHub Pages at https://camerondetig.github.io/. It is plain static HTML/CSS/vanilla JS — no build step, package manager, framework, linter, or tests. Pushing to `main` deploys.

## Local preview

```
python3 -m http.server 3000
```

Then open http://localhost:3000/. A server is required (not `file://`) because the navbar is loaded with `fetch()`.

## Architecture

- **Pages**: `index.html` (hero + project card grid), `about.html`, and one detail page per project in `projects/`. Each page is a full standalone HTML document that duplicates the `<head>` boilerplate (Google Analytics gtag `G-HVH1X106DQ`, favicon, Inter font, `styles/main.css`). Pages in `projects/` use `../` relative paths.
- **Shared navbar**: `components/navbar.html` is a template injected into `<div id="navbar-placeholder">` by `loadNavbar()` in `scripts/main.js`. It substitutes `{{baseUrl}}` (`../` when the URL path contains `/projects/`, else empty) and `{{homeActive}}`/`{{aboutActive}}`. Edit nav links/social icons in the component only. Adding a new top-level nav page requires a new placeholder in the template and matching replacement logic in `main.js`.
- **Every page** loads `scripts/main.js` at the end of `<body>`.
- **Embedded demos**: project pages embed live demos via iframes — Hugging Face Spaces (`*.hf.space`), the separate `3D_Model_Viewer` GitHub Pages repo, or Vimeo. Hugging Face embeds use the `.huggingface-embed` block with `#hf-loading`, an `iframe.hf-iframe` initially `display: none`, and `#hf-error`; these pages must also include `scripts/project-iframe.js`, which manages the loading/error states (with timeouts to accommodate sleeping Spaces that take 20–30s to wake).
- **Styling**: all CSS is in `styles/main.css`; theme colors and shadows are CSS custom properties on `:root`.
- **Images**: project assets live in `images/projects/<project-slug>/` (e.g. `thumbnail.png` used by the home page cards).

## Adding a project

1. Copy an existing page in `projects/` (use one with a `.hf-iframe` embed if the demo is a Hugging Face Space) and update title, meta description, content, and iframe/links.
2. Add images under `images/projects/<slug>/`.
3. Add a `.project-card` link to the `.projects-grid` in `index.html`, with `.tech-tag-small` tags.
