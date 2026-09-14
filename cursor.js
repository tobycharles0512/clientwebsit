(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.body.style.cursor = 'none';

  const dot = document.createElement('div');
  dot.className = 'cur-dot';
  const ring = document.createElement('div');
  ring.className = 'cur-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
  });

  function animate() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    ring.style.transform = `translate(${ringX - 19}px, ${ringY - 19}px)`;
    requestAnimationFrame(animate);
  }
  animate();
})();
