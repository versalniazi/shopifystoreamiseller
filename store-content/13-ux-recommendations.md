# 13. UX Recommendations

1. **Keep the header CTA visible at all times.** The header's "Get Started" button and sticky mobile CTA (`snippets/sticky-cta.liquid`) ensure a purchase path is always one tap away — don't remove either during future edits.
2. **Limit header nav to 2 levels.** Services collapse into a single dropdown so the primary nav never exceeds ~7 visible top-level items — keeps cognitive load low, which matters more for a considered B2C purchase like this.
3. **Anchor navigation within long pages.** Home and Industries use in-page anchors (`#packages`, `#ats`, `#faq`, industry handles) so a header/footer link can jump straight to the relevant section instead of forcing a full page load.
4. **Use `<details>/<summary>` for FAQs** (already implemented) — zero JavaScript dependency, fully keyboard and screen-reader accessible out of the box.
5. **Keep pricing cards scannable.** Every package uses the same card anatomy (badge → title → price → includes → delivery → CTA) so a visitor comparing 8 options can scan consistently rather than re-reading varied layouts.
6. **Progressive image loading.** `loading="eager"` only on the hero image (above the fold); every other image uses `loading="lazy"` to protect page speed.
7. **Mobile-first forms.** Contact and newsletter forms use large tap targets (44px+ minimum) and native `<select>`/`<input type="email">` for correct mobile keyboards.
8. **Avoid modal popups for newsletter capture.** The footer newsletter form is deliberately non-intrusive — an interstitial popup on a "trustworthy, premium" positioned brand risks feeling like a discount-store tactic.
9. **Test color contrast after any palette tweaks.** The provided palette meets AA at body-text sizes; re-check with a contrast tool if colors are ever adjusted in the theme editor.
10. **Keep testimonials and industries sections near the top of the homepage funnel**, not buried below the fold — they answer "is this legitimate?" and "is this for me?" before the visitor reaches pricing.
