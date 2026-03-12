// Table of Contents scroll-spy using Intersection Observer
(function() {
  var toc = document.getElementById('TableOfContents');
  if (!toc) return;

  var links = toc.querySelectorAll('a');
  if (!links.length) return;

  var headings = [];
  links.forEach(function(link) {
    var id = link.getAttribute('href');
    if (id && id.startsWith('#')) {
      var heading = document.getElementById(id.substring(1));
      if (heading) headings.push({ link: link, heading: heading });
    }
  });

  if (!headings.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        links.forEach(function(l) { l.classList.remove('active'); });
        headings.forEach(function(h) {
          if (h.heading === entry.target) {
            h.link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-80px 0px -80% 0px' });

  headings.forEach(function(h) { observer.observe(h.heading); });
})();
