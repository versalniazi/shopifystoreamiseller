# 16. Image & Icon Suggestions

## Icons
All icons are custom inline SVG (line-icon style, `stroke="currentColor"`, no external icon font/CDN) via `shopify-theme/snippets/icon.liquid` — matches the brand spec ("professional line icons") and adds zero extra HTTP requests. ~30 icons are included covering navigation, trust badges, services, and all 15 industries. Add more `{% when %}` cases to the same snippet if additional icons are needed.

## Photography direction (to source before launch)
Avoid stock-photo clichés (thumbs-up handshakes, generic "business people in a meeting" shots, exaggerated smiling headshots). Prefer:
- **Hero image**: a clean, editorial close-up of a laptop/desk with a resume document visible, or a muted-tone portrait of a professional in believable, unstaged work context — desaturated/cool-toned to match the Ink Navy palette.
- **ATS section image**: an abstract or illustrative graphic — a simplified document-scan motif, not a literal "robot reading a resume" cliché.
- **Resume samples (before/after)**: actual anonymized before/after resume snippets (blur or use placeholder names) — this is the single highest-value image asset on the site since it makes the value proposition concrete. Recommend commissioning this specifically.
- **Industries section**: icons only (already implemented) rather than 15 stock photos — keeps the section fast and visually consistent.
- **Testimonials**: no headshots recommended until real, consented client photos are available — initials-only avatars (as implemented) avoid implying a fabricated identity.
- **About Us**: a professional, editorial-style image or abstract brand photography representing "precision/clarity" (e.g., clean geometric shapes, minimal desk setup) rather than a personal photo, consistent with the decision to keep the About page company-voice rather than personal-bio-driven.

## Image specs
| Placement | Recommended size | Format |
|---|---|---|
| Hero image | 1200×1500px (4:5) | WebP/JPG, <200KB |
| Product featured image | 1200×1600px (3:4) | WebP/JPG, <200KB |
| Blog article image | 1600×1000px (16:10) | WebP/JPG, <200KB |
| OG/social share image | 1200×630px | JPG |
| Favicon | 512×512px source (scaled to 32×32) | PNG |
| Logo | SVG preferred, or 800×200px PNG with transparency | SVG/PNG |

All `<img>` tags in the theme already include descriptive `alt` fallbacks and `width`/`height` attributes to prevent layout shift — when uploading real images in Shopify Admin, still set a specific custom Alt Text per the suggestions in `10-seo.md` rather than leaving the filename as the alt text.
