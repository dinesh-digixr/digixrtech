import { type Color, CYAN, EMERALD, rgba, lerpColor, isInView } from './utils';

interface ContextParticle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  color: Color;
  size: number;
  alpha: number;
}

export function initVizContext(
  canvas: HTMLCanvasElement,
  highlightRef: { current: string | null }
): () => void {
  const ctxOrNull = canvas.getContext('2d');
  if (!ctxOrNull) return () => {};
  const ctx = ctxOrNull;
  let W = 0, H = 0;
  const particles: ContextParticle[] = [];
  let rafId: number;

  const layers = [
    { label: 'System', highlight: 'layers' },
    { label: 'Domain', highlight: 'layers' },
    { label: 'Task', highlight: 'layers' },
    { label: 'Interaction', highlight: 'layers' },
    { label: 'Response', highlight: 'layers' },
  ];

  function resize() {
    const rect = canvas.parentElement!.getBoundingClientRect();
    W = canvas.width = rect.width;
    H = canvas.height = rect.height;
  }

  function spawnParticle() {
    if (particles.length > 80) return;
    const angle = Math.random() * Math.PI * 2;
    const r = Math.min(W, H) * 0.46;
    particles.push({
      x: W / 2 + Math.cos(angle) * r,
      y: H * 0.42 + Math.sin(angle) * r,
      targetX: W / 2 + (Math.random() - 0.5) * 10,
      targetY: H * 0.42 + (Math.random() - 0.5) * 10,
      progress: 0, speed: 0.003 + Math.random() * 0.003,
      color: lerpColor(CYAN, EMERALD, Math.random()),
      size: 1.5 + Math.random() * 2,
      alpha: 0.6 + Math.random() * 0.4,
    });
  }

  function animate(time: number) {
    if (!isInView(canvas)) { rafId = requestAnimationFrame(animate); return; }
    ctx.clearRect(0, 0, W, H);
    const now = time * 0.001;
    const activeHighlight = highlightRef.current;

    const cx = W / 2, cy = H * 0.42;
    const maxR = Math.min(W, H) * 0.38;

    // Concentric rings
    const ringDimmed = activeHighlight !== null && activeHighlight !== 'layers';
    for (let i = 0; i < layers.length; i++) {
      const t = i / (layers.length - 1);
      const r = maxR * (1 - t * 0.75);
      const color = lerpColor(CYAN, EMERALD, t);
      const isHighlighted = activeHighlight === 'layers';
      const dimFactor = ringDimmed ? 0.25 : 1;
      const baseAlpha = (isHighlighted ? 0.2 : 0.08) * dimFactor;
      const pulseAlpha = Math.sin(now * 0.6 + i * 0.5) * 0.02 * dimFactor;

      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = rgba(color, (baseAlpha * 0.3 + pulseAlpha) * 0.5);
      ctx.fill();

      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(color, baseAlpha + pulseAlpha);
      ctx.lineWidth = isHighlighted ? 1.8 : 1;
      ctx.stroke();

      const labelX = cx + r * 0.7;
      const labelY = cy - r * 0.7;
      if (W > 400) {
        ctx.font = `500 ${Math.max(9, W * 0.022)}px 'Inter'`;
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillStyle = rgba(color, (isHighlighted ? 0.7 : 0.3) * dimFactor);
        ctx.fillText(layers[i].label, labelX, labelY);
      }
    }

    // Particles moving inward
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.progress += p.speed;
      if (p.progress >= 1) { particles.splice(i, 1); continue; }

      const t = p.progress;
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const x = p.x + (p.targetX - p.x) * eased;
      const y = p.y + (p.targetY - p.y) * eased;

      const colorT = eased;
      const color = lerpColor(CYAN, EMERALD, colorT);
      const size = p.size * (1 - eased * 0.5);
      const alpha = p.alpha * (0.3 + eased * 0.7);

      const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 5);
      glow.addColorStop(0, rgba(color, alpha * 0.3));
      glow.addColorStop(1, rgba(color, 0));
      ctx.beginPath(); ctx.arc(x, y, size * 5, 0, Math.PI * 2);
      ctx.fillStyle = glow; ctx.fill();

      ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = rgba(color, alpha); ctx.fill();
    }

    // Center output glow
    const centerPulse = Math.sin(now * 1.5) * 0.3 + 0.7;
    const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 25);
    centerGlow.addColorStop(0, rgba(EMERALD, 0.3 * centerPulse));
    centerGlow.addColorStop(0.5, rgba(EMERALD, 0.08 * centerPulse));
    centerGlow.addColorStop(1, rgba(EMERALD, 0));
    ctx.beginPath(); ctx.arc(cx, cy, 25, 0, Math.PI * 2);
    ctx.fillStyle = centerGlow; ctx.fill();

    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = rgba(EMERALD, 0.8); ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.fill();

    // Context chaining (bottom)
    const chainDimmed = activeHighlight !== null && activeHighlight !== 'chain';
    const chainY = H * 0.85;
    const chainNodes = ['Analysis', 'Synthesis', 'Recommendation'];
    const chainSpacing = Math.min(W * 0.28, 140);
    const chainStartX = cx - chainSpacing;
    const isChainHighlighted = activeHighlight === 'chain';
    const chainAlpha = isChainHighlighted ? 0.8 : (chainDimmed ? 0.12 : 0.35);

    for (let i = 0; i < chainNodes.length; i++) {
      const nx = chainStartX + i * chainSpacing;
      const color = lerpColor(CYAN, EMERALD, i / 2);

      if (i < chainNodes.length - 1) {
        const nextX = chainStartX + (i + 1) * chainSpacing;
        ctx.beginPath(); ctx.moveTo(nx + 20, chainY); ctx.lineTo(nextX - 20, chainY);
        ctx.strokeStyle = rgba(color, chainAlpha * 0.4);
        ctx.lineWidth = 1; ctx.setLineDash([3, 4]); ctx.stroke(); ctx.setLineDash([]);

        if (isChainHighlighted) {
          const arrowX = (nx + 20 + nextX - 20) / 2 + Math.sin(now * 2 + i) * 15;
          ctx.beginPath(); ctx.arc(arrowX, chainY, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = rgba(color, 0.6); ctx.fill();
        }
      }

      ctx.beginPath(); ctx.arc(nx, chainY, 14, 0, Math.PI * 2);
      ctx.fillStyle = rgba(color, 0.06 * chainAlpha / 0.35);
      ctx.strokeStyle = rgba(color, chainAlpha * 0.5);
      ctx.lineWidth = 1.2; ctx.fill(); ctx.stroke();

      if (W > 380) {
        ctx.font = `500 ${Math.max(8, W * 0.02)}px 'Inter'`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        ctx.fillStyle = rgba(color, chainAlpha);
        ctx.fillText(chainNodes[i], nx, chainY + 20);
      }
    }

    // Knowledge Engineering cluster (right side)
    if (W > 500) {
      const isKnowledgeHighlighted = activeHighlight === 'knowledge';
      const knowledgeDimmed = activeHighlight !== null && activeHighlight !== 'knowledge';
      const kAlpha = isKnowledgeHighlighted ? 0.8 : (knowledgeDimmed ? 0.12 : 0.35);

      const kNodes = [
        { label: 'RAG', ox: 0, oy: -28 },
        { label: 'KG', ox: 30, oy: 8 },
        { label: 'Embed', ox: -25, oy: 18 },
        { label: 'Retrieve', ox: 10, oy: 38 },
      ];
      const kx = W * 0.82, ky = H * 0.38;

      if (isKnowledgeHighlighted) {
        const kGlow = ctx.createRadialGradient(kx, ky, 0, kx, ky, 60);
        kGlow.addColorStop(0, rgba(EMERALD, 0.08));
        kGlow.addColorStop(1, rgba(EMERALD, 0));
        ctx.beginPath(); ctx.arc(kx, ky, 60, 0, Math.PI * 2);
        ctx.fillStyle = kGlow; ctx.fill();
      }

      const kEdges: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 3]];
      for (const [ai, bi] of kEdges) {
        const a = kNodes[ai], b = kNodes[bi];
        ctx.beginPath();
        ctx.moveTo(kx + a.ox, ky + a.oy);
        ctx.lineTo(kx + b.ox, ky + b.oy);
        ctx.strokeStyle = rgba(EMERALD, kAlpha * 0.3);
        ctx.lineWidth = isKnowledgeHighlighted ? 1.2 : 0.8;
        ctx.setLineDash([2, 3]); ctx.stroke(); ctx.setLineDash([]);
      }

      const ringEdgeX = cx + maxR * 0.7;
      ctx.beginPath();
      ctx.moveTo(kx - 35, ky + 5);
      ctx.lineTo(ringEdgeX + 15, cy - maxR * 0.15);
      ctx.strokeStyle = rgba(EMERALD, kAlpha * 0.25);
      ctx.lineWidth = 0.8;
      ctx.setLineDash([4, 6]); ctx.stroke(); ctx.setLineDash([]);

      if (isKnowledgeHighlighted) {
        const flowT = (now * 0.5) % 1;
        const fx = (kx - 35) + ((ringEdgeX + 15) - (kx - 35)) * flowT;
        const fy = (ky + 5) + ((cy - maxR * 0.15) - (ky + 5)) * flowT;
        ctx.beginPath(); ctx.arc(fx, fy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = rgba(EMERALD, 0.6); ctx.fill();
      }

      for (const kn of kNodes) {
        const nx = kx + kn.ox, ny = ky + kn.oy;

        ctx.beginPath(); ctx.arc(nx, ny, 10, 0, Math.PI * 2);
        ctx.fillStyle = rgba(EMERALD, 0.06 * (kAlpha / 0.35));
        ctx.strokeStyle = rgba(EMERALD, kAlpha * 0.5);
        ctx.lineWidth = isKnowledgeHighlighted ? 1.8 : 1;
        ctx.fill(); ctx.stroke();

        ctx.beginPath(); ctx.arc(nx, ny, 3, 0, Math.PI * 2);
        ctx.fillStyle = rgba(EMERALD, kAlpha * 0.6); ctx.fill();

        ctx.font = `500 ${Math.max(8, W * 0.018)}px 'Inter'`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        ctx.fillStyle = rgba(EMERALD, kAlpha);
        ctx.fillText(kn.label, nx, ny + 14);
      }
    }

    rafId = requestAnimationFrame(animate);
  }

  function onResize() { resize(); }
  window.addEventListener('resize', onResize);
  resize();
  rafId = requestAnimationFrame(animate);
  const spawnInterval = setInterval(spawnParticle, 200);

  return () => {
    cancelAnimationFrame(rafId);
    clearInterval(spawnInterval);
    window.removeEventListener('resize', onResize);
  };
}
