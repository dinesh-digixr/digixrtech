import { type Color, AMBER, rgba, lerp, isInView } from './utils';

interface Threat {
  angle: number;
  x: number;
  y: number;
  speed: number;
  progress: number;
  interceptRing: number;
  intercepted: boolean;
  alpha: number;
  size: number;
}

interface InterceptFlash {
  x: number;
  y: number;
  age: number;
  ring: number;
  color: Color;
}

const rings = [
  { label: 'Prompt Security', highlight: 'prompt', radiusFactor: 0.92 },
  { label: 'Data Protection', highlight: 'data', radiusFactor: 0.72 },
  { label: 'Access Control', highlight: 'access', radiusFactor: 0.52 },
  { label: 'Runtime Guardrails', highlight: 'guardrails', radiusFactor: 0.32 },
];

export function initVizSecure(
  canvas: HTMLCanvasElement,
  highlightRef: { current: string | null }
): () => void {
  const ctxOrNull = canvas.getContext('2d');
  if (!ctxOrNull) return () => {};
  const ctx = ctxOrNull;
  let W = 0, H = 0;
  const threats: Threat[] = [];
  const interceptFlashes: InterceptFlash[] = [];
  let rafId: number;

  function resize() {
    const rect = canvas.parentElement!.getBoundingClientRect();
    W = canvas.width = rect.width;
    H = canvas.height = rect.height;
  }

  function spawnThreat() {
    if (threats.length > 50) return;
    const angle = Math.random() * Math.PI * 2;
    const maxR = Math.min(W, H) * 0.46;
    const interceptRing = Math.floor(Math.random() * 4);
    threats.push({
      angle, x: W / 2 + Math.cos(angle) * (maxR + 30), y: H / 2 + Math.sin(angle) * (maxR + 30),
      speed: 0.4 + Math.random() * 0.6, progress: 0,
      interceptRing, intercepted: false,
      alpha: 0.7 + Math.random() * 0.3,
      size: 2 + Math.random() * 2,
    });
  }

  function animate(time: number) {
    if (!isInView(canvas)) { rafId = requestAnimationFrame(animate); return; }
    ctx.clearRect(0, 0, W, H);
    const now = time * 0.001;
    const activeHighlight = highlightRef.current;

    const cx = W / 2, cy = H / 2;
    const maxR = Math.min(W, H) * 0.42;

    // Central agent node
    const centerPulse = Math.sin(now * 1.2) * 0.15 + 0.85;
    const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
    centerGlow.addColorStop(0, rgba(AMBER, 0.25 * centerPulse));
    centerGlow.addColorStop(0.6, rgba(AMBER, 0.06 * centerPulse));
    centerGlow.addColorStop(1, rgba(AMBER, 0));
    ctx.beginPath(); ctx.arc(cx, cy, 30, 0, Math.PI * 2);
    ctx.fillStyle = centerGlow; ctx.fill();

    // Shield shape
    ctx.beginPath();
    ctx.moveTo(cx, cy - 12); ctx.lineTo(cx + 10, cy - 6);
    ctx.lineTo(cx + 10, cy + 4); ctx.quadraticCurveTo(cx, cy + 14, cx, cy + 14);
    ctx.quadraticCurveTo(cx, cy + 14, cx - 10, cy + 4);
    ctx.lineTo(cx - 10, cy - 6); ctx.closePath();
    ctx.fillStyle = rgba(AMBER, 0.15); ctx.fill();
    ctx.strokeStyle = rgba(AMBER, 0.7); ctx.lineWidth = 1.5; ctx.stroke();

    // Checkmark
    ctx.beginPath(); ctx.moveTo(cx - 4, cy); ctx.lineTo(cx - 1, cy + 4); ctx.lineTo(cx + 5, cy - 4);
    ctx.strokeStyle = rgba(AMBER, 0.8); ctx.lineWidth = 1.8; ctx.stroke();

    // Defense rings
    for (let i = 0; i < rings.length; i++) {
      const ring = rings[i];
      const r = maxR * ring.radiusFactor;
      const isHighlighted = activeHighlight === ring.highlight;
      const dimmed = activeHighlight !== null && !isHighlighted;

      const rotation = now * (0.08 + i * 0.03) * (i % 2 === 0 ? 1 : -1);
      const segments = 6 + i * 2;
      const gapAngle = Math.PI * 2 / segments * 0.25;
      const segAngle = Math.PI * 2 / segments - gapAngle;

      for (let s = 0; s < segments; s++) {
        const startAngle = rotation + (Math.PI * 2 / segments) * s;
        const endAngle = startAngle + segAngle;

        const ringAlpha = isHighlighted ? 0.45 : (dimmed ? 0.04 : 0.12);
        const pulseAlpha = Math.sin(now * 0.8 + i * 0.7 + s * 0.3) * 0.03;

        ctx.beginPath();
        ctx.arc(cx, cy, r, startAngle, endAngle);
        ctx.strokeStyle = rgba(AMBER, ringAlpha + pulseAlpha);
        ctx.lineWidth = isHighlighted ? 2.5 : 1.2;
        ctx.stroke();
      }

      if (W > 400 && (isHighlighted || !activeHighlight)) {
        const labelAngle = rotation + Math.PI * 1.5;
        const labelR = r + 12;
        const lx = cx + Math.cos(labelAngle) * labelR;
        const ly = cy + Math.sin(labelAngle) * labelR;
        ctx.font = `500 ${Math.max(8, W * 0.018)}px 'Inter'`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = rgba(AMBER, isHighlighted ? 0.8 : 0.25);
        ctx.fillText(ring.label, lx, ly);
      }

      if (isHighlighted) {
        const glowGrad = ctx.createRadialGradient(cx, cy, r - 8, cx, cy, r + 8);
        glowGrad.addColorStop(0, rgba(AMBER, 0));
        glowGrad.addColorStop(0.5, rgba(AMBER, 0.06));
        glowGrad.addColorStop(1, rgba(AMBER, 0));
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.lineWidth = 16; ctx.strokeStyle = glowGrad; ctx.stroke();
      }
    }

    // Threats
    for (let i = threats.length - 1; i >= 0; i--) {
      const t = threats[i];
      t.progress += t.speed * 0.008;

      const targetR = maxR * rings[t.interceptRing].radiusFactor;
      const startR = maxR + 30;
      const currentR = startR - (startR - targetR) * Math.min(t.progress, 1);

      t.x = cx + Math.cos(t.angle) * currentR;
      t.y = cy + Math.sin(t.angle) * currentR;

      if (!t.intercepted && t.progress >= 1) {
        t.intercepted = true;
        interceptFlashes.push({ x: t.x, y: t.y, age: 0, ring: t.interceptRing, color: AMBER });
      }

      if (t.intercepted) {
        t.alpha -= 0.04;
        if (t.alpha <= 0) { threats.splice(i, 1); continue; }
      }

      const threatColor = t.intercepted
        ? AMBER
        : { r: lerp(255, 255, t.progress), g: lerp(80, 184, t.progress), b: lerp(60, 77, t.progress) };

      const glow = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.size * 4);
      glow.addColorStop(0, rgba(threatColor, t.alpha * 0.4));
      glow.addColorStop(1, rgba(threatColor, 0));
      ctx.beginPath(); ctx.arc(t.x, t.y, t.size * 4, 0, Math.PI * 2);
      ctx.fillStyle = glow; ctx.fill();

      ctx.beginPath(); ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
      ctx.fillStyle = rgba(threatColor, t.alpha); ctx.fill();
    }

    // Intercept flashes
    for (let i = interceptFlashes.length - 1; i >= 0; i--) {
      const f = interceptFlashes[i];
      f.age += 0.03;
      if (f.age >= 1) { interceptFlashes.splice(i, 1); continue; }

      const flashR = 6 + f.age * 20;
      const flashAlpha = (1 - f.age) * 0.5;
      ctx.beginPath(); ctx.arc(f.x, f.y, flashR, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(f.color, flashAlpha);
      ctx.lineWidth = 2 * (1 - f.age); ctx.stroke();

      for (let p = 0; p < 3; p++) {
        const bAngle = (f.age * 4) + p * (Math.PI * 2 / 3);
        const bR = f.age * 15;
        const bx = f.x + Math.cos(bAngle) * bR;
        const by = f.y + Math.sin(bAngle) * bR;
        ctx.beginPath(); ctx.arc(bx, by, 1.5 * (1 - f.age), 0, Math.PI * 2);
        ctx.fillStyle = rgba(f.color, flashAlpha * 0.6); ctx.fill();
      }
    }

    rafId = requestAnimationFrame(animate);
  }

  function onResize() { resize(); }
  window.addEventListener('resize', onResize);
  resize();
  rafId = requestAnimationFrame(animate);
  const spawnInterval = setInterval(spawnThreat, 450);

  return () => {
    cancelAnimationFrame(rafId);
    clearInterval(spawnInterval);
    window.removeEventListener('resize', onResize);
  };
}
