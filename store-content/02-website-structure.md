# 2. Website Structure

## Header Navigation (main-menu)
1. Home → `/`
2. Resume Writing → `/pages/resume-writing`
3. Cover Letter → `/pages/cover-letter`
4. LinkedIn Optimization → `/pages/linkedin-optimization`
5. Packages → `/collections/packages`
6. Industries → `/pages/industries`
7. Success Stories → `/pages/success-stories`
8. Blog → `/blogs/career-advice`
9. About Us → `/pages/about-us`
10. FAQs → `/pages/faqs`
11. Contact → `/pages/contact`

> Services (Resume Writing / Cover Letter / LinkedIn Optimization) render as a "Services" dropdown in the header for cleaner UX; Packages links straight to the pricing collection since it's the primary conversion page.

## Footer Menu Structure

**Column 1 — Services**
- Resume Writing
- Cover Letter
- LinkedIn Optimization
- Packages
- Industries

**Column 2 — Company**
- About Us
- Success Stories
- Blog
- Contact
- FAQs

**Column 3 — Policies**
- Privacy Policy
- Refund Policy
- Terms & Conditions
- Shipping & Delivery (Digital Delivery)
- Cookie Policy
- Cancellation Policy
- Revision Policy

**Column 4 — Newsletter + Social**
- Email signup ("Get career tips + resume advice in your inbox")
- Social icons: LinkedIn, Instagram, Facebook, X/Twitter (placeholders — link to real handles before launch)
- Trust row: "Secure Checkout · Worldwide Delivery · 100% Confidential"

## Full Sitemap

```
/ (Home)
/pages/resume-writing
/pages/cover-letter
/pages/linkedin-optimization
/collections/packages
  /products/professional-resume
  /products/resume-cover-letter-combo
  /products/linkedin-optimization-package
  /products/starter-career-package
  /products/executive-career-package
  /products/ultimate-career-transformation
  /products/entry-level-graduate-package
/pages/industries
  (in-page anchored sections for: IT, Engineering, Finance, Healthcare, Marketing, Sales,
   Education, Government, Construction, Legal, Hospitality, Retail, Remote Jobs, Executives, Graduates)
/pages/success-stories
/blogs/career-advice (30 planned articles — see 11-blog-content-plan.md)
/pages/about-us
/pages/faqs
/pages/contact
/pages/privacy-policy
/pages/refund-policy
/pages/terms-conditions
/pages/shipping-delivery
/pages/cookie-policy
/pages/cancellation-policy
/pages/revision-policy
/404
/cart
```

## Page-to-Template Map (Shopify Online Store 2.0)

| Page | Template file |
|---|---|
| Home | `templates/index.json` |
| Resume Writing | `templates/page.resume-writing.json` |
| Cover Letter | `templates/page.cover-letter.json` |
| LinkedIn Optimization | `templates/page.linkedin-optimization.json` |
| Industries | `templates/page.industries.json` |
| Success Stories | `templates/page.success-stories.json` |
| About Us | `templates/page.about-us.json` |
| FAQs | `templates/page.faqs.json` |
| Contact | `templates/page.contact.json` |
| Packages collection | `templates/collection.packages.json` |
| Package product | `templates/product.package.json` |
| Blog | `templates/blog.json` |
| Blog article | `templates/article.json` |
| Cart | `templates/cart.json` |
| 404 | `templates/404.json` |
| Legal pages (Privacy/Refund/Terms/Shipping/Cookie/Cancellation/Revision) | Shopify default `page.json` (simple rich-text; content pasted via Settings → Policies where applicable, or Online Store → Pages) |
