(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(max-width: 700px)').matches) return;

  function init() {
    const canvas = document.createElement('canvas');
    canvas.className = 'bg-shape-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);

    let width = window.innerWidth;
    let height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 34;

    const geometry = new THREE.TorusKnotGeometry(8, 2.2, 150, 16);
    const wireframe = new THREE.WireframeGeometry(geometry);
    const material = new THREE.LineBasicMaterial({ color: 0x4c8cff, transparent: true, opacity: 0.35 });
    const knot = new THREE.LineSegments(wireframe, material);
    knot.position.set(width > 1100 ? 15 : 9, -2, 0);
    scene.add(knot);

    const geometry2 = new THREE.IcosahedronGeometry(3.2, 0);
    const wireframe2 = new THREE.WireframeGeometry(geometry2);
    const material2 = new THREE.LineBasicMaterial({ color: 0x1fdcc0, transparent: true, opacity: 0.3 });
    const ico = new THREE.LineSegments(wireframe2, material2);
    ico.position.set(width > 1100 ? -15 : -9, 6, -4);
    scene.add(ico);

    function animate() {
      knot.rotation.x += 0.0018;
      knot.rotation.y += 0.0026;
      knot.rotation.z += 0.0011;
      ico.rotation.x -= 0.0014;
      ico.rotation.y += 0.002;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
  }

  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
  script.onload = init;
  document.head.appendChild(script);
})();
