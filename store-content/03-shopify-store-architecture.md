# 3. Shopify Store Architecture

## Store Type
Digital-goods/services store. All "products" are service packages fulfilled by email (no physical shipping). Shopify settings needed:
- **Settings → Shipping:** disable physical shipping rates or add a single "Digital Delivery — Free" shipping rate covering all zones, since products are marked as **not requiring shipping** (see product setup below) — no shipping rate will actually be charged.
- **Products:** every product's **"This is a physical product"** checkbox must be **unchecked** so no address/shipping step appears at checkout.
- **Settings → Checkout:** enable "shipping address" as optional/hidden where possible for digital-only checkout; add a checkout note field: "Which email should we send your files to?" if different from account email.
- **Settings → Notifications:** customize the "Order confirmation" email to include delivery timeline and a request for the customer's current resume/CV and job target (or link to an intake form — see Contact page / post-purchase flow recommendation in `13-cro-improvements.md`).

## Collections

| Collection | Handle | Purpose |
|---|---|---|
| Packages | `packages` | All 7 pricing packages — main product listing page |
| Resume Services | `resume-services` | Resume-focused products |
| Bundles | `career-bundles` | Multi-service bundles (Combo, Ultimate, Job Hunter, etc.) |
| Executive | `executive` | Executive/leadership-tier packages |
| Graduate & Entry-Level | `graduate-entry-level` | Student/graduate-tier packages |

Collections are **manual** (curated) rather than automated, since there are only 7 SKUs and precise curation/order matters for conversion (cheapest-to-premium or "recommended" ordering).

## Products, Tags & Product Type

All products share:
- **Product type:** `Career Service`
- **Vendor:** `Hire Nestt Limited`
- **Tags (applied per relevance):** `resume`, `cover-letter`, `linkedin`, `ats-optimized`, `executive`, `entry-level`, `bundle`, `most-popular`, `premium`, `digital-delivery`
- **Requires shipping:** No
- **Charge tax:** per merchant's tax settings (service/digital goods tax treatment varies by country — confirm with a tax advisor/Shopify Tax before launch)

See `06-product-listings.md` for full descriptions and `products_import.csv` for a ready-to-import Shopify product CSV (Products → Import).

## Metafields / Metaobjects (recommended, optional enhancements)
- `product.metafields.custom.delivery_days` (number) — used by the pricing-card section to auto-display "Delivery: X Business Days" consistently.
- `product.metafields.custom.includes_list` (list of single-line text) — bullet list of what's included, rendered by the custom pricing-card snippet.
- Metaobject `testimonial` (fields: name, role, country, rating, quote) — powers the testimonials section without hardcoding Liquid; falls back to hardcoded JSON in the section if metaobjects aren't set up yet (theme ships with static defaults so it works out of the box).

## Recommended Free/Widely-Used Shopify Apps (CRO + Ops)

| Need | App | Why |
|---|---|---|
| Reviews/testimonials on product pages | **Shopify Product Reviews** (free, by Shopify) | Native, lightweight, no extra JS bloat |
| Email/SMS marketing + newsletter popups | **Shopify Email** (free, built-in) | Native flows for post-purchase, abandoned checkout |
| Live chat / support widget | **Shopify Inbox** (free, by Shopify) | Native chat, syncs with admin, no extra script tax |
| Upsell/cross-sell at cart | **Shopify's native Cart Upsell / "Bundles" app** (free, by Shopify) | Suggest Cover Letter or LinkedIn add-on at cart |
| SEO/meta management | **Shopify's built-in SEO fields** + **Google & YouTube channel app** (free) | Sitemap, GMB/Merchant Center integration |
| Countdown/urgency banners | **Hextom: Countdown Timer Bar** (free tier) | Optional seasonal promos — used sparingly per brand tone |
| Form builder for intake questionnaire | **Shopify's native "Contact form" section** + Google Forms embed (free) as a fallback for a detailed intake form | Collects job target, current resume upload |
| Page speed monitoring | **Shopify's built-in Theme → Performance** report | No app needed |

Avoid stacking many apps — each added script impacts load speed, which directly contradicts the "fast loading" requirement.

## Digital Delivery Flow (recommended operational process)
1. Customer purchases a package → order confirmation email sent automatically (customized with delivery timeline + intake instructions).
2. Customer replies to that email (or submits the Contact form) with current resume, job target, and LinkedIn link.
3. Writer completes draft within the stated business-day window and emails the deliverables (Word + PDF, and LinkedIn copy doc where applicable) to the customer's email on file.
4. Revisions tracked by email thread per the Revision Policy.

No physical fulfillment, no tracking numbers — the "Shipping & Delivery" policy page explains this clearly to avoid checkout confusion.
