import { type Color, rgba, lerpColor, isInView } from './utils';

interface RiverParticle {
  x: number;
  y: number;
  speed: number;
  color: Color;
  size: number;
  alpha: number;
}

export function initRiver(
  canvas: HTMLCanvasElement,
  fromColor: Color,
  toColor: Color
): () => void {
  const ctxOrNull = canvas.getContext('2d');
  if (!ctxOrNull) return () => {};
  const ctx = ctxOrNull;
  let W = 0, H = 0;
  const particles: RiverParticle[] = [];
  let rafId: number;

  function resize() {
    const rect = canvas.parentElement!.getBoundingClientRect();
    W = canvas.width = rect.width;
    H = canvas.height = rect.height;
  }

  function animate(time: number) {
    if (!isInView(canvas)) { rafId = requestAnimationFrame(animate); return; }
    ctx.clearRect(0, 0, W, H);
    const now = time * 0.001;

    // Flowing center line
    ctx.beginPath();
    ctx.moveTo(W * 0.5, 0);
    ctx.quadraticCurveTo(W * 0.5 + Math.sin(now) * 20, H * 0.5, W * 0.5, H);
    ctx.strokeStyle = rgba(lerpColor(fromColor, toColor, 0.5), 0.06);
    ctx.lineWidth = 1; ctx.setLineDash([4, 8]); ctx.stroke(); ctx.setLineDash([]);

    // Particles flowing down
    if (Math.random() < 0.08 && particles.length < 60) {
      particles.push({
        x: W * 0.5 + (Math.random() - 0.5) * 30,
        y: -5, speed: 0.8 + Math.random() * 1.2,
        color: lerpColor(fromColor, toColor, Math.random()),
        size: 1.5 + Math.random() * 2, alpha: 0.3 + Math.random() * 0.4,
      });
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.y += p.speed;
      p.x += Math.sin(now * 2 + i * 0.5) * 0.3;
      if (p.y > H + 10) { particles.splice(i, 1); continue; }

      const t = p.y / H;
      const color = lerpColor(fromColor, toColor, t);
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = rgba(color, p.alpha * (1 - Math.abs(t - 0.5) * 0.5));
      ctx.fill();
    }

    rafId = requestAnimationFrame(animate);
  }

  function onResize() { resize(); }
  window.addEventListener('resize', onResize);
  resize();
  rafId = requestAnimationFrame(animate);

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', onResize);
  };
}
