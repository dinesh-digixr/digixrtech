import { type Color, CYAN, TEAL, EMERALD, rgba, lerpColor, quadBezier, isInView } from './utils';

interface BuildNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  label: string;
  color: Color;
  size: number;
  group: string;
  phase: number;
}

interface BuildSignal {
  fx: number;
  fy: number;
  tx: number;
  ty: number;
  cpx: number;
  cpy: number;
  p: number;
  speed: number;
  color: Color;
  trail: { x: number; y: number; age: number }[];
}

export function initVizBuild(
  canvas: HTMLCanvasElement,
  highlightRef: { current: string | null }
): () => void {
  const ctxOrNull = canvas.getContext('2d');
  if (!ctxOrNull) return () => {};
  const ctx = ctxOrNull;
  let W = 0, H = 0;
  let nodes: BuildNode[] = [];
  const signals: BuildSignal[] = [];
  let rafId: number;

  function resize() {
    const rect = canvas.parentElement!.getBoundingClientRect();
    W = canvas.width = rect.width;
    H = canvas.height = rect.height;
    createNodes();
  }

  function createNodes() {
    nodes = [];
    const cx = W / 2, cy = H / 2;
    const scale = Math.min(W, H) / 400;

    nodes.push({ x: cx, y: cy, baseX: cx, baseY: cy, label: 'Supervisor', color: CYAN, size: 28 * scale, group: 'design', phase: 0 });

    const workers = [
      { label: 'ReAct', angle: -Math.PI * 0.6, color: CYAN, group: 'design' },
      { label: 'CoT', angle: -Math.PI * 0.15, color: CYAN, group: 'design' },
      { label: 'Multi-Agent', angle: Math.PI * 0.25, color: CYAN, group: 'design' },
    ];
    const wR = 100 * scale;
    workers.forEach((w, i) => {
      nodes.push({ x: cx + Math.cos(w.angle) * wR, y: cy + Math.sin(w.angle) * wR, baseX: cx + Math.cos(w.angle) * wR, baseY: cy + Math.sin(w.angle) * wR, label: w.label, color: w.color, size: 20 * scale, group: w.group, phase: i * 1.2 });
    });

    const tools = [
      { label: 'API', angle: Math.PI * 0.7, color: TEAL, group: 'tools' },
      { label: 'DB', angle: Math.PI * 1.0, color: TEAL, group: 'tools' },
      { label: 'CRM', angle: Math.PI * 1.35, color: TEAL, group: 'tools' },
    ];
    const tR = 160 * scale;
    tools.forEach((t, i) => {
      nodes.push({ x: cx + Math.cos(t.angle) * tR, y: cy + Math.sin(t.angle) * tR, baseX: cx + Math.cos(t.angle) * tR, baseY: cy + Math.sin(t.angle) * tR, label: t.label, color: t.color, size: 16 * scale, group: t.group, phase: i * 1.5 + 3 });
    });

    const llmNodes = [
      { label: 'LLM Core', angle: Math.PI * 0.65, color: EMERALD, group: 'llm' },
      { label: 'Fine-tune', angle: Math.PI * 1.15, color: EMERALD, group: 'llm' },
    ];
    const llmR = 65 * scale;
    llmNodes.forEach((l, i) => {
      nodes.push({ x: cx + Math.cos(l.angle) * llmR, y: cy + Math.sin(l.angle) * llmR, baseX: cx + Math.cos(l.angle) * llmR, baseY: cy + Math.sin(l.angle) * llmR, label: l.label, color: l.color, size: 16 * scale, group: l.group, phase: i * 1.3 + 6 });
    });
  }

  function spawnSignal() {
    if (nodes.length < 2 || signals.length > 30) return;
    const pairs: [number, number][] = [[0, 1], [0, 2], [0, 3], [1, 4], [2, 5], [3, 6], [4, 0], [5, 0], [6, 0], [0, 7], [0, 8], [7, 0], [8, 0]];
    const pair = pairs[Math.floor(Math.random() * pairs.length)];
    const from = nodes[pair[0]], to = nodes[pair[1]];
    const mx = (from.x + to.x) / 2, my = (from.y + to.y) / 2;
    const dx = to.x - from.x, dy = to.y - from.y;
    const d = Math.sqrt(dx * dx + dy * dy) || 1;
    const perp = (15 + Math.random() * 25) * (Math.random() > 0.5 ? 1 : -1);
    signals.push({
      fx: from.x, fy: from.y, tx: to.x, ty: to.y,
      cpx: mx + ((-dy / d) * perp), cpy: my + ((dx / d) * perp),
      p: 0, speed: 0.008 + Math.random() * 0.006,
      color: lerpColor(from.color, to.color, 0.5), trail: [],
    });
  }

  function animate(time: number) {
    if (!isInView(canvas)) { rafId = requestAnimationFrame(animate); return; }
    ctx.clearRect(0, 0, W, H);
    const now = time * 0.001;
    const activeHighlight = highlightRef.current;

    // Connection lines
    const connections: [number, number][] = [[0, 1], [0, 2], [0, 3], [1, 4], [2, 5], [3, 6], [0, 7], [0, 8]];
    for (const [ai, bi] of connections) {
      const a = nodes[ai], b = nodes[bi];
      const isHighlighted = activeHighlight !== null && (
        (activeHighlight === 'design' && a.group === 'design' && b.group === 'design') ||
        (activeHighlight === 'tools' && (a.group === 'tools' || b.group === 'tools')) ||
        (activeHighlight === 'llm' && (a.group === 'llm' || b.group === 'llm'))
      );
      const alpha = isHighlighted ? 0.25 : (activeHighlight ? 0.04 : 0.08);
      ctx.beginPath(); ctx.moveTo(a.x, a.y);
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      ctx.quadraticCurveTo(mx + Math.sin(now * 1.5 + ai * 2.1) * 2, my + Math.cos(now * 1.3 + bi * 1.7) * 2, b.x, b.y);
      ctx.strokeStyle = rgba(lerpColor(a.color, b.color, 0.5), alpha);
      ctx.lineWidth = isHighlighted ? 1.5 : 0.8;
      ctx.setLineDash([3, 5]); ctx.stroke(); ctx.setLineDash([]);
    }

    // Signals
    for (let i = signals.length - 1; i >= 0; i--) {
      const s = signals[i]; s.p += s.speed;
      if (s.p >= 1) { signals.splice(i, 1); continue; }
      const pos = quadBezier(s.fx, s.fy, s.cpx, s.cpy, s.tx, s.ty, s.p);
      s.trail.push({ x: pos.x, y: pos.y, age: 0 });
      for (let t = s.trail.length - 1; t >= 0; t--) {
        const tp = s.trail[t]; tp.age += 0.025;
        if (tp.age > 1) { s.trail.splice(t, 1); continue; }
        ctx.beginPath(); ctx.arc(tp.x, tp.y, (1 - tp.age) * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = rgba(s.color, (1 - tp.age) * 0.2); ctx.fill();
      }
      const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 12);
      glow.addColorStop(0, rgba(s.color, 0.45)); glow.addColorStop(1, rgba(s.color, 0));
      ctx.beginPath(); ctx.arc(pos.x, pos.y, 12, 0, Math.PI * 2); ctx.fillStyle = glow; ctx.fill();
      ctx.beginPath(); ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.fill();
    }

    // Lifecycle ring (outermost)
    const lifecycleHighlighted = activeHighlight === 'lifecycle';
    const ringAlpha = lifecycleHighlighted ? 0.2 : 0.04;
    const ringPulse = Math.sin(now * 0.8) * 0.5 + 0.5;
    ctx.beginPath(); ctx.arc(W / 2, H / 2, Math.min(W, H) * 0.44, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(CYAN, ringAlpha + ringPulse * 0.03);
    ctx.lineWidth = lifecycleHighlighted ? 2 : 1;
    ctx.setLineDash([6, 8]); ctx.stroke(); ctx.setLineDash([]);

    // Nodes
    for (const n of nodes) {
      n.x = n.baseX + Math.sin(now * 0.4 + n.phase) * 3;
      n.y = n.baseY + Math.cos(now * 0.35 + n.phase) * 2.5;

      const isHighlighted = activeHighlight !== null && (
        (activeHighlight === 'design' && n.group === 'design') ||
        (activeHighlight === 'tools' && n.group === 'tools') ||
        (activeHighlight === 'llm' && n.group === 'llm') ||
        (activeHighlight === 'lifecycle')
      );
      const dimmed = activeHighlight !== null && !isHighlighted;
      const alpha = dimmed ? 0.2 : 1;

      const gs = n.size * 2;
      const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, gs);
      glow.addColorStop(0, rgba(n.color, 0.12 * alpha));
      glow.addColorStop(1, rgba(n.color, 0));
      ctx.beginPath(); ctx.arc(n.x, n.y, gs, 0, Math.PI * 2); ctx.fillStyle = glow; ctx.fill();

      ctx.beginPath(); ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
      ctx.fillStyle = rgba(n.color, 0.08 * alpha);
      ctx.strokeStyle = rgba(n.color, (isHighlighted ? 0.8 : 0.35) * alpha);
      ctx.lineWidth = isHighlighted ? 2 : 1.2; ctx.fill(); ctx.stroke();

      ctx.beginPath(); ctx.arc(n.x, n.y, n.size * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = rgba(n.color, (isHighlighted ? 0.7 : 0.4) * alpha); ctx.fill();

      const fontSize = Math.max(9, n.size * 0.5);
      ctx.font = `600 ${fontSize}px 'Inter'`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillStyle = rgba(n.color, (isHighlighted ? 0.9 : 0.5) * alpha);
      ctx.fillText(n.label, n.x, n.y + n.size + 6);
    }

    rafId = requestAnimationFrame(animate);
  }

  function onResize() { resize(); }
  window.addEventListener('resize', onResize);
  resize();
  rafId = requestAnimationFrame(animate);
  const spawnInterval = setInterval(spawnSignal, 800);

  return () => {
    cancelAnimationFrame(rafId);
    clearInterval(spawnInterval);
    window.removeEventListener('resize', onResize);
  };
}
