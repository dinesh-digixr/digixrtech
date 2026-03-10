import { type Color, CYAN, TEAL, EMERALD, rgba, lerpColor, quadBezier, dist } from './utils';

interface AgentType {
  label: string;
  color: Color;
}

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  type: AgentType;
  brightness: number;
  targetBrightness: number;
  phase: number;
  scale: number;
}

interface Signal {
  from: number;
  to: number;
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

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

const agentTypes: AgentType[] = [
  { label: 'Strategy', color: CYAN },
  { label: 'Code', color: TEAL },
  { label: 'Support', color: EMERALD },
  { label: 'Analytics', color: CYAN },
  { label: 'Automation', color: TEAL },
  { label: 'Security', color: EMERALD },
  { label: 'Research', color: CYAN },
  { label: 'Ops', color: TEAL },
];

function drawNodeIcon(
  ctx: CanvasRenderingContext2D,
  type: AgentType,
  x: number,
  y: number,
  s: number,
  alpha: number
): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  const c = type.color;
  ctx.strokeStyle = rgba(c, alpha);
  ctx.lineWidth = 2.4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const idx = agentTypes.indexOf(type);
  if (idx === 0 || idx === 3 || idx === 6) {
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fillStyle = rgba(c, alpha * 0.5);
    ctx.fill();
  } else if (idx === 1 || idx === 4 || idx === 7) {
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(8, 0);
    ctx.lineTo(0, 8);
    ctx.lineTo(-8, 0);
    ctx.closePath();
    ctx.stroke();
  } else {
    ctx.strokeRect(-6, -6, 12, 12);
  }
  ctx.restore();
}

export function initAgentNetwork(canvas: HTMLCanvasElement): () => void {
  const ctxOrNull = canvas.getContext('2d');
  if (!ctxOrNull) return () => {};
  const ctx: CanvasRenderingContext2D = ctxOrNull;

  let heroW = 0;
  let heroH = 0;
  const heroMouse = { x: -9999, y: -9999 };
  let heroNodes: Node[] = [];
  const heroSignals: Signal[] = [];
  let heroParticles: Particle[] = [];
  let rafId: number;

  function heroResize() {
    heroW = canvas.width = canvas.offsetWidth;
    heroH = canvas.height = canvas.offsetHeight;
    heroNodes = [];
    const cx = heroW / 2;
    const cy = heroH / 2;
    const isMobile = heroW < 768;
    const rX = isMobile ? heroW * 0.35 : Math.min(heroW * 0.4, 480);
    const rY = isMobile ? heroH * 0.32 : Math.min(heroH * 0.38, 360);

    for (let i = 0; i < agentTypes.length; i++) {
      const angle = -Math.PI * 0.35 + ((Math.PI * 2) / agentTypes.length) * i;
      const x = Math.max(60, Math.min(heroW - 60, cx + Math.cos(angle) * rX));
      const y = Math.max(100, Math.min(heroH - 60, cy + Math.sin(angle) * rY));
      heroNodes.push({
        x, y, baseX: x, baseY: y,
        type: agentTypes[i], brightness: 0.3, targetBrightness: 0.3,
        phase: Math.random() * Math.PI * 2, scale: isMobile ? 0.9 : 1.3,
      });
    }
    heroParticles = [];
    const pCount = Math.min(35, Math.floor((heroW * heroH) / 40000));
    for (let i = 0; i < pCount; i++) {
      heroParticles.push({
        x: Math.random() * heroW, y: Math.random() * heroH,
        vx: (Math.random() - 0.5) * 0.1, vy: (Math.random() - 0.5) * 0.1,
        size: 0.8 + Math.random() * 1.2, alpha: 0.05 + Math.random() * 0.08,
      });
    }
  }

  function spawnHeroSignal() {
    if (heroNodes.length < 2 || heroSignals.length > 20) return;
    const a = Math.floor(Math.random() * heroNodes.length);
    let b: number;
    do { b = Math.floor(Math.random() * heroNodes.length); } while (b === a);
    const from = heroNodes[a], to = heroNodes[b];
    const mx = (from.x + to.x) / 2, my = (from.y + to.y) / 2;
    const dx = to.x - from.x, dy = to.y - from.y;
    const d = Math.sqrt(dx * dx + dy * dy) || 1;
    const perp = (30 + Math.random() * 50) * (Math.random() > 0.5 ? 1 : -1);
    heroSignals.push({
      from: a, to: b, fx: from.x, fy: from.y, tx: to.x, ty: to.y,
      cpx: mx + ((-dy / d) * perp), cpy: my + ((dx / d) * perp),
      p: 0, speed: 0.005 + Math.random() * 0.004,
      color: lerpColor(from.type.color, to.type.color, 0.5), trail: [],
    });
  }

  function animateHero(time: number) {
    ctx.clearRect(0, 0, heroW, heroH);
    const now = time * 0.001;
    const isMobile = heroW < 768;

    for (const p of heroParticles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > heroW) p.vx *= -1;
      if (p.y < 0 || p.y > heroH) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = rgba(TEAL, p.alpha); ctx.fill();
    }

    for (let i = 0; i < heroNodes.length; i++) {
      for (let j = i + 1; j < heroNodes.length; j++) {
        const a = heroNodes[i], b = heroNodes[j];
        const d2 = dist(a.x, a.y, b.x, b.y);
        if (d2 > heroW * 0.6) continue;
        const alpha = 0.03 * (1 - d2 / (heroW * 0.6));
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        const dx = b.x - a.x, dy = b.y - a.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        ctx.beginPath(); ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(mx + ((-dy / len) * 18), my + ((dx / len) * 18), b.x, b.y);
        ctx.strokeStyle = rgba(TEAL, alpha); ctx.lineWidth = 0.7;
        ctx.setLineDash([4, 7]); ctx.stroke(); ctx.setLineDash([]);
      }
    }

    for (let i = heroSignals.length - 1; i >= 0; i--) {
      const s = heroSignals[i];
      s.p += s.speed;
      if (s.p >= 1) { heroNodes[s.to].targetBrightness = 1; heroSignals.splice(i, 1); continue; }
      const pos = quadBezier(s.fx, s.fy, s.cpx, s.cpy, s.tx, s.ty, s.p);
      s.trail.push({ x: pos.x, y: pos.y, age: 0 });
      if (s.trail.length > 2) {
        ctx.beginPath(); ctx.moveTo(s.trail[0].x, s.trail[0].y);
        for (let t = 1; t < s.trail.length; t++) ctx.lineTo(s.trail[t].x, s.trail[t].y);
        ctx.strokeStyle = rgba(s.color, 0.12); ctx.lineWidth = 2; ctx.stroke();
      }
      for (let t = s.trail.length - 1; t >= 0; t--) {
        const tp = s.trail[t]; tp.age += 0.02;
        if (tp.age > 1) { s.trail.splice(t, 1); continue; }
        ctx.beginPath(); ctx.arc(tp.x, tp.y, (1 - tp.age) * 2, 0, Math.PI * 2);
        ctx.fillStyle = rgba(s.color, (1 - tp.age) * 0.25); ctx.fill();
      }
      const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 14);
      glow.addColorStop(0, rgba(s.color, 0.4)); glow.addColorStop(1, rgba(s.color, 0));
      ctx.beginPath(); ctx.arc(pos.x, pos.y, 14, 0, Math.PI * 2);
      ctx.fillStyle = glow; ctx.fill();
      ctx.beginPath(); ctx.arc(pos.x, pos.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fill();
    }

    for (const ag of heroNodes) {
      const fX = isMobile ? 2 : 5, fY = isMobile ? 1.5 : 4;
      ag.x = ag.baseX + Math.sin(now * 0.5 + ag.phase) * fX;
      ag.y = ag.baseY + Math.cos(now * 0.4 + ag.phase) * fY;
      const dx = heroMouse.x - ag.x, dy = heroMouse.y - ag.y;
      const mD = Math.sqrt(dx * dx + dy * dy);
      if (mD < 220) ag.targetBrightness = Math.max(ag.targetBrightness, 0.7 * (1 - mD / 220));
      ag.brightness += (ag.targetBrightness - ag.brightness) * 0.06;
      ag.targetBrightness += (0.3 - ag.targetBrightness) * 0.01;
      const b = ag.brightness;

      const rp = Math.sin(now * 1.2 + ag.phase) * 0.5 + 0.5;
      const ms = isMobile ? 0.6 : 1;
      const rs = (36 + b * 8 + rp * 4) * ms;
      ctx.beginPath(); ctx.arc(ag.x, ag.y, rs, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(ag.type.color, 0.06 + b * 0.1); ctx.lineWidth = 1; ctx.stroke();

      const gs = (32 + b * 16) * ms;
      const glowGrad = ctx.createRadialGradient(ag.x, ag.y, 0, ag.x, ag.y, gs);
      glowGrad.addColorStop(0, rgba(ag.type.color, 0.08 + b * 0.12));
      glowGrad.addColorStop(1, rgba(ag.type.color, 0));
      ctx.beginPath(); ctx.arc(ag.x, ag.y, gs, 0, Math.PI * 2);
      ctx.fillStyle = glowGrad; ctx.fill();

      const bs = isMobile ? 16 : 24;
      const r = 8;
      ctx.beginPath();
      ctx.moveTo(ag.x - bs + r, ag.y - bs); ctx.lineTo(ag.x + bs - r, ag.y - bs);
      ctx.quadraticCurveTo(ag.x + bs, ag.y - bs, ag.x + bs, ag.y - bs + r);
      ctx.lineTo(ag.x + bs, ag.y + bs - r);
      ctx.quadraticCurveTo(ag.x + bs, ag.y + bs, ag.x + bs - r, ag.y + bs);
      ctx.lineTo(ag.x - bs + r, ag.y + bs);
      ctx.quadraticCurveTo(ag.x - bs, ag.y + bs, ag.x - bs, ag.y + bs - r);
      ctx.lineTo(ag.x - bs, ag.y - bs + r);
      ctx.quadraticCurveTo(ag.x - bs, ag.y - bs, ag.x - bs + r, ag.y - bs);
      ctx.closePath();
      ctx.fillStyle = `rgba(255,255,255,${0.88 + b * 0.1})`;
      ctx.shadowColor = rgba(ag.type.color, 0.15 + b * 0.1); ctx.shadowBlur = 16;
      ctx.fill(); ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0;
      ctx.fillStyle = rgba(ag.type.color, 0.05 + b * 0.03); ctx.fill();
      ctx.strokeStyle = rgba(ag.type.color, 0.3 + b * 0.4); ctx.lineWidth = 1.5; ctx.stroke();

      drawNodeIcon(ctx, ag.type, ag.x, ag.y, ag.scale, 0.75 + b * 0.25);

      if (heroW > 480) {
        ctx.font = `600 ${isMobile ? 9 : 11}px 'Plus Jakarta Sans'`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        ctx.fillStyle = rgba(ag.type.color, 0.45 + b * 0.35);
        ctx.fillText(ag.type.label, ag.x, ag.y + bs + 6);
      }
    }

    rafId = requestAnimationFrame(animateHero);
  }

  function onMouseMove(e: MouseEvent) { heroMouse.x = e.clientX; heroMouse.y = e.clientY; }
  function onMouseLeave() { heroMouse.x = -9999; heroMouse.y = -9999; }
  function onResize() { heroResize(); }

  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mouseleave', onMouseLeave);
  window.addEventListener('resize', onResize);
  heroResize();
  rafId = requestAnimationFrame(animateHero);
  const signalInterval = setInterval(spawnHeroSignal, 1200);

  return () => {
    cancelAnimationFrame(rafId);
    clearInterval(signalInterval);
    canvas.removeEventListener('mousemove', onMouseMove);
    canvas.removeEventListener('mouseleave', onMouseLeave);
    window.removeEventListener('resize', onResize);
  };
}
