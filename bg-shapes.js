(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const container = document.createElement('div');
  container.className = 'bg-shapes';
  container.setAttribute('aria-hidden', 'true');
  container.innerHTML = `
    <div class="shape shape-a"><div class="shape-spin"><i></i><i></i><i></i><i></i><i></i></div></div>
    <div class="shape shape-b"><div class="shape-spin"><i></i><i></i><i></i><i></i><i></i></div></div>
  `;
  document.body.prepend(container);
})();
