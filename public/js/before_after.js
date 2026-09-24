/* Before/after image slider — behaviour for the `before_after` shortcode.
   Drag the round handle (mouse or touch) to reveal more/less of the top image.
   Safe to load more than once; each slider is initialised only once. */
(function () {
  function initSliders() {
    document.querySelectorAll('.ba-slider:not([data-ba-ready])').forEach(function (slider) {
      slider.setAttribute('data-ba-ready', '');

      var overlay = slider.querySelector('.ba-before');   // the clipped (left) layer
      var scroller = slider.querySelector('.ba-scroller');
      var dragging = false;

      // Position everything from a fraction (0-1) of the slider's width.
      // Percentages keep it correct when the window/slider is resized.
      function setSplit(fraction) {
        fraction = Math.max(0, Math.min(1, fraction));
        overlay.style.width = (fraction * 100) + '%';
        scroller.style.left = (fraction * 100) + '%';
      }

      // Turn a pointer position into a fraction of the slider's width.
      function fractionFromEvent(e) {
        var rect = slider.getBoundingClientRect();
        return (e.clientX - rect.left) / rect.width;
      }

      scroller.addEventListener('pointerdown', function (e) {
        dragging = true;
        scroller.classList.add('ba-scrolling');
        scroller.setPointerCapture(e.pointerId);
        e.preventDefault();
      });
      scroller.addEventListener('pointermove', function (e) {
        if (dragging) setSplit(fractionFromEvent(e));
      });
      scroller.addEventListener('pointerup', function () {
        dragging = false;
        scroller.classList.remove('ba-scrolling');
      });
      scroller.addEventListener('pointercancel', function () {
        dragging = false;
        scroller.classList.remove('ba-scrolling');
      });

      // Keyboard support (left/right arrows) when the handle is focused.
      scroller.addEventListener('keydown', function (e) {
        var current = parseFloat(overlay.style.width) || 50;
        if (e.key === 'ArrowLeft')  { setSplit((current - 4) / 100); e.preventDefault(); }
        if (e.key === 'ArrowRight') { setSplit((current + 4) / 100); e.preventDefault(); }
      });

      // Opening position (a bit of both images visible).
      var start = parseFloat(slider.getAttribute('data-ba-start'));
      setSplit((isNaN(start) ? 50 : start) / 100);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSliders);
  } else {
    initSliders();
  }
})();
