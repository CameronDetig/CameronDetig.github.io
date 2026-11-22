# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio site (AI/ML projects, VFX & animation work, about page) hosted on GitHub Pages at https://camerondetig.github.io/. It is plain static HTML/CSS/vanilla JS — no build step, package manager, framework, linter, or tests. Pushing to `main` deploys.

## Local preview

```
python3 -m http.server 3000
```

Then open http://localhost:3000/. A server is required (not `file://`) because the navbar is loaded with `fetch()`.

## Architecture

- **Pages**: `index.html` (home: bio, links to the Technical and Creative pages, education, experience, skills, resume), `technical.html` (hero + project card grid), `creative.html` (previs/animation reels, rigging, tools, 3D renders — merged in from the retired VFX_Anim_Portfolio_Site), and one detail page per project in `projects/`. Each page is a full standalone HTML document that duplicates the `<head>` boilerplate (Google Analytics gtag `G-HVH1X106DQ`, favicon, Inter font, `styles/main.css`). Pages in `projects/` use `../` relative paths.
- **Shared navbar**: `components/navbar.html` is a template injected into `<div id="navbar-placeholder">` by `loadNavbar()` in `scripts/main.js`. It substitutes `{{baseUrl}}` (`../` when the URL path contains `/projects/`, else empty) and `{{aboutActive}}`/`{{technicalActive}}`/`{{creativeActive}}`. Edit nav links/social icons in the component only. Adding a new top-level nav page requires a new placeholder in the template and matching replacement logic in `main.js`.
- **Shared footer**: `components/footer.html` is injected into `<div id="footer-placeholder"></div>` by `loadFooter()` in `scripts/main.js` (no substitutions). Edit the footer in the component only; each page just keeps the placeholder div.
- **Every page** loads `scripts/main.js` at the end of `<body>`.
- **Embedded demos**: project pages embed live demos via iframes — Hugging Face Spaces (`*.hf.space`), the separate `3D_Model_Viewer` GitHub Pages repo, or Vimeo. Hugging Face embeds use the `.huggingface-embed` block with `#hf-loading`, an `iframe.hf-iframe` initially `display: none`, and `#hf-error`; these pages must also include `scripts/project-iframe.js`, which manages the loading/error states (with timeouts to accommodate sleeping Spaces that take 20–30s to wake).
- **Styling**: all CSS is in `styles/main.css`. The site is dark-only ("Projector Amber": warm near-black with an amber `--accent`); colors, fonts and shadows are CSS custom properties on `:root` (`--bg`, `--surface`, `--border`, `--text`, `--text-muted`, `--accent`, …) — use those, not hex values. The old names (`--primary-color`, `--text-light`, `--bg-white`, …) remain as aliases because inline styles in project pages use them. Headings use Space Grotesk, body Inter (both loaded from Google Fonts in each page's `<head>`). Buttons are `.cta-button` (amber) and `.cta-button.cta-button-secondary` (outline). Every page links it as `main.css?v=N` for cache busting — when you change the CSS, bump `N` on all pages (`index.html`, `technical.html`, `creative.html`, `projects/*.html`) together.
- **Creative page (`creative.html`)**: uses its own `work-` prefixed classes (`.work-grid`, `.work-card` + `.full-width`, `.work-media`, `.work-gallery`, `.video-container`) because `.project-card`/`.project-title` already mean the home-page cards. Vimeo reels sit in `.video-container` (16:9 wrapper); the previs reels are password-protected, explained by the `.intro-note`. `scripts/lightbox.js` (loaded only on this page) opens any `img.work-media` in the `<dialog class="lightbox">` and steps through the images in the same `.work-card`.
- **Images**: project assets live in `images/projects/<project-slug>/` (e.g. `thumbnail.png` used by the home page cards); VFX page media (incl. mp4s + posters) in `images/creative/`; about-page images in `images/about/`.
- **Social icons**: files in `images/social/` (SVG or transparent PNG), shown in the navbar as `<span class="social-icon icon-<name>">`. CSS draws each file as a mask filled with the link colour, so they all go muted → amber on hover; to add one, drop the file in and add an `.icon-<name> { --icon: url('../images/social/<file>'); }` rule.
- **Assets**: `assets/Cameron_Detig_Resume.pdf` is embedded and offered for download on `index.html`.

## Adding a project

1. Copy an existing page in `projects/` (use one with a `.hf-iframe` embed if the demo is a Hugging Face Space) and update title, meta description, content, and iframe/links.
2. Add images under `images/projects/<slug>/`.
3. Add a `.project-card` link to the `.projects-grid` in `technical.html`, with `.tech-tag-small` tags.
