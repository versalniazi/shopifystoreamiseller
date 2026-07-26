document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.site-header__mobile-toggle');
  var mobileNav = document.getElementById('MobileNav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      mobileNav.hidden = !isOpen;
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Hide sticky CTA on cart/checkout-adjacent sections and when footer is in view
  var stickyCta = document.getElementById('StickyCta');
  var footer = document.querySelector('.site-footer');
  if (stickyCta && footer && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        stickyCta.style.display = entry.isIntersecting ? 'none' : '';
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    observer.observe(footer);
  }

  // Subtle scroll-in animation for cards and section headings
  if ('IntersectionObserver' in window) {
    var animTargets = document.querySelectorAll('.card, .section-heading, .hero__content, .hero__media');
    animTargets.forEach(function (el) { el.setAttribute('data-animate', ''); });

    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animTargets.forEach(function (el) { revealObserver.observe(el); });
  }
});
