// ──────────────────────────────────────────────
// Dark Mode Toggle
// ──────────────────────────────────────────────
(function() {
  function getTheme() {
    return localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || getTheme();
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Bind toggle buttons
  document.querySelectorAll('#theme-toggle, #theme-toggle-mobile').forEach(function(btn) {
    btn.addEventListener('click', toggleTheme);
  });

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
})();

// ──────────────────────────────────────────────
// Mobile Menu Toggle
// ──────────────────────────────────────────────
(function() {
  var toggle = document.getElementById('mobile-menu-toggle');
  var menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function() {
    var expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    menu.classList.toggle('hidden');

    // Toggle icon
    var openIcon = toggle.querySelector('.menu-open-icon');
    var closeIcon = toggle.querySelector('.menu-close-icon');
    if (openIcon && closeIcon) {
      openIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    }
  });
})();

// ──────────────────────────────────────────────
// Copy Code Button
// ──────────────────────────────────────────────
(function() {
  document.querySelectorAll('pre > code').forEach(function(codeBlock) {
    var pre = codeBlock.parentElement;
    pre.style.position = 'relative';

    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.style.cssText = 'position:absolute;top:0.5rem;right:0.5rem;padding:0.25rem 0.5rem;font-size:0.75rem;border-radius:0.375rem;border:1px solid var(--color-border);background:var(--color-surface);color:var(--color-text-muted);cursor:pointer;opacity:0;transition:opacity 0.2s;';

    pre.addEventListener('mouseenter', function() { btn.style.opacity = '1'; });
    pre.addEventListener('mouseleave', function() { btn.style.opacity = '0'; });
    btn.addEventListener('focus', function() { btn.style.opacity = '1'; });

    btn.addEventListener('click', function() {
      navigator.clipboard.writeText(codeBlock.textContent).then(function() {
        btn.textContent = 'Copied!';
        setTimeout(function() { btn.textContent = 'Copy'; }, 2000);
      });
    });

    pre.appendChild(btn);
  });
})();

// ──────────────────────────────────────────────
// Scroll-to-Top Button
// ──────────────────────────────────────────────
(function() {
  var btn = document.createElement('button');
  btn.id = 'scroll-top';
  btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg>';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.style.cssText = 'position:fixed;bottom:2rem;right:2rem;padding:0.75rem;border-radius:9999px;background:var(--color-surface);color:var(--color-text-muted);border:1px solid var(--color-border);cursor:pointer;opacity:0;pointer-events:none;transition:opacity 0.3s,background 0.2s;z-index:30;box-shadow:0 2px 8px rgba(0,0,0,0.1);';

  btn.addEventListener('mouseenter', function() { btn.style.color = 'var(--color-accent)'; });
  btn.addEventListener('mouseleave', function() { btn.style.color = 'var(--color-text-muted)'; });
  btn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  document.body.appendChild(btn);

  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    } else {
      btn.style.opacity = '0';
      btn.style.pointerEvents = 'none';
    }
  });
})();

// ──────────────────────────────────────────────
// Reading Progress Bar
// ──────────────────────────────────────────────
(function() {
  var bar = document.getElementById('reading-progress');
  if (!bar) return;

  window.addEventListener('scroll', function() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      bar.style.width = (scrollTop / docHeight * 100) + '%';
    }
  });
})();
