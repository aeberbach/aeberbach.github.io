(function () {
  'use strict';

  let searchData = [];
  let searchOverlay = null;
  let searchInput = null;
  let searchResults = null;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  async function initSearch() {
    const searchUrl = window.VOLKS_SEARCH_URL || '/search/';

    try {
      const response = await fetch(searchUrl);
      const text = await response.text();
      // The endpoint is a JSON array served from an .html file. Under `zola serve`
      // a livereload <script> is appended to .html responses, which would break
      // JSON.parse — so isolate the array (first '[' .. last ']') before parsing.
      const start = text.indexOf('[');
      const end = text.lastIndexOf(']');
      searchData = (start !== -1 && end !== -1) ? JSON.parse(text.slice(start, end + 1)) : [];
    } catch (error) {
      console.error('Failed to load search data:', error);
    }

    searchOverlay = document.getElementById('search-overlay');
    searchInput = document.getElementById('search-input');
    searchResults = document.getElementById('search-results');

    const searchToggle = document.getElementById('search-toggle');
    if (searchToggle) searchToggle.addEventListener('click', openSearch);

    const searchClose = document.getElementById('search-close');
    if (searchClose) searchClose.addEventListener('click', closeSearch);

    if (searchInput) searchInput.addEventListener('input', handleSearch);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
        closeSearch();
      }
    });

    if (searchOverlay) {
      searchOverlay.addEventListener('click', function (e) {
        if (e.target === searchOverlay) {
          closeSearch();
        }
      });
    }
  }

  function openSearch() {
    if (searchOverlay) searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      if (searchInput) searchInput.focus();
    }, 100);
  }

  function closeSearch() {
    if (searchOverlay) searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
  }

  function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();

    if (query.length < 2) {
      if (searchResults) searchResults.innerHTML = '';
      return;
    }

    const results = searchData.filter(function (post) {
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        (post.categories && post.categories.some(function (cat) {
          return cat.toLowerCase().includes(query);
        }))
      );
    }).slice(0, 10);

    displayResults(results, query);
  }

  function displayResults(results, query) {
    if (!searchResults) return;

    if (results.length === 0) {
      searchResults.innerHTML =
        '\n          <div class="search-no-results">\n            <p>No articles found for "' +
        escapeHtml(query) +
        '"</p>\n          </div>\n        ';
      return;
    }

    const resultsHTML = results.map(function (post) {
      const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const excerptHTML = post.excerpt
        ? '<p class="search-result-excerpt">' + escapeHtml(post.excerpt) + '</p>'
        : '';

      const categoriesHTML = post.categories
        ? '\n          <div class="search-result-categories">\n            ' +
          post.categories.map(function (cat) {
            return '<span class="search-category">' + escapeHtml(cat) + '</span>';
          }).join(' ') +
          '\n          </div>\n        '
        : '';

      return (
        '\n      <article class="search-result">\n        <h3 class="search-result-title">\n          <a href="' +
        post.url +
        '">' +
        escapeHtml(post.title) +
        '</a>\n        </h3>\n        <time class="search-result-date">' +
        date +
        '</time>\n        ' +
        excerptHTML +
        '\n        ' +
        categoriesHTML +
        '\n      </article>\n    '
      );
    }).join('');

    searchResults.innerHTML =
      '\n        <div class="search-results-header">\n          <p>Found ' +
      results.length +
      ' article' +
      (results.length === 1 ? '' : 's') +
      ' for "' +
      escapeHtml(query) +
      '"</p>\n        </div>\n        ' +
      resultsHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
})();
