# 15. Shopify Theme Recommendations

## About this theme build
`shopify-theme/` is a custom Online Store 2.0 theme built from scratch for Hire Nestt (not a modified copy of Dawn or any paid theme) — JSON templates, section groups (`header-group`, `footer-group`), theme-editor-configurable sections/blocks, and a settings schema bound to the brand palette in `01-brand-guidelines.md`. It is fully merchant-editable via the Shopify theme editor: every homepage/page section supports adding, removing, and reordering blocks without touching code.

## What's included
- OS2.0-compliant structure: `layout/`, `templates/` (JSON), `sections/`, `snippets/`, `config/`, `locales/`, `assets/`
- 20+ custom sections (hero, pricing cards, ATS explainer, industries grid/detail, testimonials, FAQ accordion with FAQPage schema, trust badges, blog list, contact form, etc.)
- Full JSON templates for every requested page (Home, Resume Writing, Cover Letter, LinkedIn Optimization, Industries, Success Stories, About Us, FAQs, Contact, Packages collection, Product, Blog, Article, Cart, 404, generic Page)
- A single `theme.css`/`theme.js` pair (no framework dependency, no external requests) for fast load and easy maintenance

## Known gaps / next steps before launch
- **Customer account templates** (`templates/customers/*.json`) are not included — the store is built around guest checkout (no account required), which is called out in the FAQs. If you want a branded "My Account" experience, these should be added; otherwise Shopify's default fallback will apply if a customer navigates to `/account`.
- **`templates/search.json`** is not included; add one (reusing the `main-collection`-style grid) if you want a custom-styled search results page instead of Shopify's default.
- **Logo**: no logo file was supplied — the header currently renders a text wordmark. Add `shopify-theme/assets/logo.svg` and set it via the Header section's "Logo image" setting once you have a final logo.
- **Fonts**: `settings_data.json` defaults to Shopify font picker values (`assistant_n7` / `assistant_n4`) as a safe, premium-feeling default. Swap `font_heading`/`font_body` in Theme Settings → Typography if you acquire a licensed premium typeface (e.g., Fraunces + Inter, per the brand guidelines' stated preference).
- **Images**: every image slot has a placeholder/icon fallback so the theme works with zero uploaded images, but real photography/illustration should replace these before launch — see `16-image-icon-suggestions.md`.

## Deployment
1. Zip the contents of `shopify-theme/` (the folders themselves, not a wrapping parent folder) or push via Shopify CLI (`shopify theme push`) from within that directory.
2. Upload via Shopify Admin → Online Store → Themes → Add theme → Upload zip file, or `shopify theme push` if using CLI.
3. Create the products (via `store-content/products_import.csv` import), collections, blog, pages, navigation menus, and policies as documented in `02-website-structure.md` and `03-shopify-store-architecture.md` — the theme references these by handle and will render placeholders/empty states gracefully until they exist, but won't have real content until they're created.

## Recommended free/widely-used apps
See `03-shopify-store-architecture.md` → "Recommended Free/Widely-Used Shopify Apps" for the full list (Shopify Product Reviews, Shopify Email, Shopify Inbox, native Bundles/Upsell, Google & YouTube channel app).
