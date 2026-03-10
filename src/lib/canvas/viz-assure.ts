import { type Color, TEAL, EMERALD, WHITE, rgba, isInView } from './utils';

interface Gate {
  label: string;
  metric: string;
  value: number;
  unit: string;
  color: Color;
  highlight: string;
  x: number;
  y: number;
  width: number;
  displayValue: number;
  targetValue: number;
}

interface Packet {
  x: number;
  y: number;
  speed: number;
  gate: number;
  passed: boolean;
  color: Color;
  alpha: number;
  size: number;
}

export function initVizAssure(
  canvas: HTMLCanvasElement,
  highlightRef: { current: string | null }
): () => void {
  const ctxOrNull = canvas.getContext('2d');
  if (!ctxOrNull) return () => {};
  const ctx = ctxOrNull;
  let W = 0, H = 0;
  let gates: Gate[] = [];
  const packets: Packet[] = [];
  let rafId: number;

  function resize() {
    const rect = canvas.parentElement!.getBoundingClientRect();
    W = canvas.width = rect.width;
    H = canvas.height = rect.height;
    createGates();
  }

  function createGates() {
    gates = [];
    const gateData = [
      { label: 'Agentic Eval', metric: 'Convergence', value: 94.7, unit: '%', color: TEAL, highlight: 'eval' },
      { label: 'LLM Judge', metric: 'RAGAS Score', value: 0.91, unit: '', color: TEAL, highlight: 'judge' },
      { label: 'Interpretability', metric: 'Trajectory Score', value: 0.92, unit: '', color: TEAL, highlight: 'xai' },
      { label: 'Trustworthy', metric: 'Toxicity', value: 0.02, unit: '%', color: TEAL, highlight: 'trust' },
    ];
    const startY = H * 0.12, endY = H * 0.88;
    const spacing = (endY - startY) / (gateData.length - 1);
    gateData.forEach((g, i) => {
      gates.push({ ...g, x: W * 0.35, y: startY + i * spacing, width: W * 0.5, displayValue: 0, targetValue: g.value });
    });
  }

  function spawnPacket() {
    if (packets.length > 40) return;
    packets.push({
      x: W * 0.1, y: H * 0.05 + Math.random() * H * 0.05,
      speed: 1.2 + Math.random() * 0.8,
      gate: 0, passed: true, color: TEAL, alpha: 0.8,
      size: 3 + Math.random() * 2,
    });
  }

  function animate(time: number) {
    if (!isInView(canvas)) { rafId = requestAnimationFrame(animate); return; }
    ctx.clearRect(0, 0, W, H);
    const now = time * 0.001;
    const activeHighlight = highlightRef.current;

    // Pipeline line (vertical)
    ctx.beginPath();
    ctx.moveTo(W * 0.35, H * 0.05);
    ctx.lineTo(W * 0.35, H * 0.95);
    ctx.strokeStyle = rgba(TEAL, 0.08);
    ctx.lineWidth = 1; ctx.setLineDash([4, 6]); ctx.stroke(); ctx.setLineDash([]);

    // Gates
    for (const g of gates) {
      const isHighlighted = activeHighlight === g.highlight;
      const dimmed = activeHighlight !== null && !isHighlighted;
      const alpha = dimmed ? 0.15 : 1;

      ctx.beginPath();
      ctx.moveTo(g.x - g.width * 0.15, g.y);
      ctx.lineTo(g.x + g.width * 0.5, g.y);
      ctx.strokeStyle = rgba(g.color, (isHighlighted ? 0.5 : 0.15) * alpha);
      ctx.lineWidth = isHighlighted ? 2 : 1;
      ctx.stroke();

      if (isHighlighted) {
        const glow = ctx.createRadialGradient(g.x + g.width * 0.2, g.y, 0, g.x + g.width * 0.2, g.y, 60);
        glow.addColorStop(0, rgba(g.color, 0.08)); glow.addColorStop(1, rgba(g.color, 0));
        ctx.beginPath(); ctx.arc(g.x + g.width * 0.2, g.y, 60, 0, Math.PI * 2);
        ctx.fillStyle = glow; ctx.fill();
      }

      ctx.font = `600 ${Math.max(10, W * 0.025)}px 'Inter'`;
      ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
      ctx.fillStyle = rgba(WHITE, (isHighlighted ? 0.9 : 0.45) * alpha);
      ctx.fillText(g.label, g.x + g.width * 0.08, g.y - 8);

      g.displayValue += (g.targetValue - g.displayValue) * 0.03;
      const valStr = g.targetValue < 1 ? g.displayValue.toFixed(2) : Math.round(g.displayValue).toString();
      ctx.font = `700 ${Math.max(14, W * 0.038)}px 'Inter'`;
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      ctx.fillStyle = rgba(g.color, (isHighlighted ? 1 : 0.6) * alpha);
      ctx.fillText(valStr + g.unit, g.x + g.width * 0.5, g.y);

      ctx.font = `500 ${Math.max(9, W * 0.02)}px 'Inter'`;
      ctx.textAlign = 'right'; ctx.textBaseline = 'top';
      ctx.fillStyle = rgba(WHITE, (isHighlighted ? 0.5 : 0.25) * alpha);
      ctx.fillText(g.metric, g.x + g.width * 0.5, g.y + 6);
    }

    // Packets
    for (let i = packets.length - 1; i >= 0; i--) {
      const pk = packets[i];
      pk.y += pk.speed;

      for (let gi = 0; gi < gates.length; gi++) {
        if (pk.gate === gi && Math.abs(pk.y - gates[gi].y) < 4) {
          pk.gate = gi + 1;
          pk.passed = Math.random() > 0.1;
          if (!pk.passed) { pk.color = { r: 255, g: 180, b: 50 }; }
          else { pk.color = EMERALD; }
        }
      }

      if (pk.y > H + 10) { packets.splice(i, 1); continue; }

      const px = pk.x + (Math.sin(now * 3 + i) * 8);
      const glow = ctx.createRadialGradient(px, pk.y, 0, px, pk.y, pk.size * 4);
      glow.addColorStop(0, rgba(pk.color, pk.alpha * 0.4));
      glow.addColorStop(1, rgba(pk.color, 0));
      ctx.beginPath(); ctx.arc(px, pk.y, pk.size * 4, 0, Math.PI * 2);
      ctx.fillStyle = glow; ctx.fill();

      ctx.beginPath(); ctx.arc(px, pk.y, pk.size, 0, Math.PI * 2);
      ctx.fillStyle = rgba(pk.color, pk.alpha); ctx.fill();

      ctx.beginPath(); ctx.arc(px, pk.y, pk.size * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fill();
    }

    rafId = requestAnimationFrame(animate);
  }

  function onResize() { resize(); }
  window.addEventListener('resize', onResize);
  resize();
  rafId = requestAnimationFrame(animate);
  const spawnInterval = setInterval(spawnPacket, 600);

  return () => {
    cancelAnimationFrame(rafId);
    clearInterval(spawnInterval);
    window.removeEventListener('resize', onResize);
  };
}
