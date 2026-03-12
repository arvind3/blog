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

// Search page
(function() {
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var status = document.getElementById('search-status');
  var shell = document.getElementById('search-shell');
  if (!input || !results || !status || !shell) return;

  var indexUrl = shell.getAttribute('data-search-index');
  var pages = [];

  function escapeHtml(value) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function excerpt(content, query) {
    if (!content) return '';

    var normalizedContent = content.replace(/\s+/g, ' ').trim();
    if (!normalizedContent) return '';

    if (!query) {
      return normalizedContent.slice(0, 180) + (normalizedContent.length > 180 ? '...' : '');
    }

    var lower = normalizedContent.toLowerCase();
    var lowerQuery = query.toLowerCase();
    var matchIndex = lower.indexOf(lowerQuery);
    var start = Math.max(0, matchIndex - 70);
    var end = Math.min(normalizedContent.length, matchIndex + lowerQuery.length + 110);
    var snippet = normalizedContent.slice(start, end).trim();

    if (start > 0) snippet = '...' + snippet;
    if (end < normalizedContent.length) snippet = snippet + '...';
    return snippet;
  }

  function render(items, query) {
    if (!query) {
      status.textContent = 'Start typing to search posts by title, content, or tag.';
      results.innerHTML = '';
      return;
    }

    status.textContent = items.length + (items.length === 1 ? ' result' : ' results') + ' for "' + query + '".';

    if (!items.length) {
      results.innerHTML =
        '<div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-sm text-[var(--color-text-muted)]">No posts matched your search. Try a shorter phrase or a tag name.</div>';
      return;
    }

    results.innerHTML = items.map(function(item) {
      var tags = (item.tags || []).map(function(tag) {
        return '<span class="rounded-full bg-[var(--color-tag-bg)] px-2.5 py-1 text-xs font-medium text-[var(--color-tag-text)]">' + escapeHtml(tag) + '</span>';
      }).join('');

      return [
        '<article class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm transition-colors hover:border-[var(--color-accent)]">',
        '<a class="block no-underline" href="' + escapeHtml(item.url) + '">',
        '<div class="mb-3 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">',
        '<span>' + escapeHtml(item.date || '') + '</span>',
        '<span>' + escapeHtml(item.readingTime || '') + '</span>',
        '</div>',
        '<h2 class="mb-3 text-xl font-semibold text-[var(--color-text)]">' + escapeHtml(item.title) + '</h2>',
        '<p class="text-sm leading-7 text-[var(--color-text-muted)]">' + escapeHtml(excerpt(item.summary || '', query)) + '</p>',
        '</a>',
        tags ? '<div class="mt-4 flex flex-wrap gap-2">' + tags + '</div>' : '',
        '</article>'
      ].join('');
    }).join('');
  }

  function scorePage(page, query) {
    var q = query.toLowerCase();
    var score = 0;
    var title = (page.title || '').toLowerCase();
    var summary = (page.summary || '').toLowerCase();
    var tags = (page.tags || []).join(' ').toLowerCase();

    if (title.includes(q)) score += 6;
    if (tags.includes(q)) score += 4;
    if (summary.includes(q)) score += 2;

    return score;
  }

  function search(query) {
    var trimmed = query.trim();
    if (!trimmed) {
      render([], '');
      return;
    }

    var matches = pages
      .map(function(page) {
        return { page: page, score: scorePage(page, trimmed) };
      })
      .filter(function(item) {
        return item.score > 0;
      })
      .sort(function(a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.page.date) - new Date(a.page.date);
      })
      .slice(0, 20)
      .map(function(item) {
        return item.page;
      });

    render(matches, trimmed);
  }

  fetch(indexUrl)
    .then(function(response) {
      if (!response.ok) throw new Error('Search index request failed');
      return response.json();
    })
    .then(function(data) {
      pages = Array.isArray(data) ? data : [];
      status.textContent = 'Search is ready.';
      input.removeAttribute('disabled');
      input.focus();

      input.addEventListener('input', function(event) {
        search(event.target.value);
      });
    })
    .catch(function() {
      status.textContent = 'Search index failed to load. Rebuild the site and try again.';
      results.innerHTML =
        '<div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-sm text-[var(--color-text-muted)]">The search index is unavailable right now.</div>';
    });
})();
