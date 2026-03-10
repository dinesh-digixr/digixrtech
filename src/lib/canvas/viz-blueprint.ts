import { Color, CYAN, TEAL, EMERALD, AMBER, rgba, quadBezier } from './utils';

interface BpNode {
  label: string;
  type: 'input' | 'supervisor' | 'worker' | 'tool';
  x: number;
  y: number;
}

interface BpParticle {
  edge: number;
  t: number;
  speed: number;
  size: number;
  alpha: number;
}

interface BlueprintConfig {
  color: Color;
  accentColors: Color[];
  nodes: BpNode[];
  edges: [number, number][];
}

const MAX_PARTICLES = 30;

export const blueprintConfigs: Record<string, BlueprintConfig> = {
  healthcare: {
    color: { r: 239, g: 68, b: 68 },
    accentColors: [CYAN, TEAL, EMERALD],
    nodes: [
      { label: 'Patient', type: 'input', x: 0.12, y: 0.15 },
      { label: 'Supervisor', type: 'supervisor', x: 0.5, y: 0.15 },
      { label: 'Intake', type: 'worker', x: 0.22, y: 0.55 },
      { label: 'Scheduling', type: 'worker', x: 0.5, y: 0.55 },
      { label: 'Notification', type: 'worker', x: 0.78, y: 0.55 },
      { label: 'EHR', type: 'tool', x: 0.35, y: 0.85 },
      { label: 'Calendar', type: 'tool', x: 0.55, y: 0.85 },
      { label: 'SMS', type: 'tool', x: 0.75, y: 0.85 },
    ],
    edges: [[0, 1], [1, 2], [1, 3], [1, 4], [3, 5], [3, 6], [4, 7]],
  },
  education: {
    color: { r: 59, g: 130, b: 246 },
    accentColors: [CYAN, TEAL, EMERALD],
    nodes: [
      { label: 'Student', type: 'input', x: 0.12, y: 0.15 },
      { label: 'Navigator', type: 'supervisor', x: 0.5, y: 0.15 },
      { label: 'Eligibility', type: 'worker', x: 0.22, y: 0.55 },
      { label: 'Document', type: 'worker', x: 0.5, y: 0.55 },
      { label: 'Counselor', type: 'worker', x: 0.78, y: 0.55 },
      { label: 'Scholarships', type: 'tool', x: 0.15, y: 0.85 },
      { label: 'Checklist', type: 'tool', x: 0.42, y: 0.85 },
      { label: 'FAQ KB', type: 'tool', x: 0.72, y: 0.85 },
    ],
    edges: [[0, 1], [1, 2], [1, 3], [1, 4], [2, 5], [3, 6], [4, 7]],
  },
};

export function initBlueprintViz(canvas: HTMLCanvasElement, key: string): () => void {
  const config = blueprintConfigs[key];
  if (!config) return () => {};

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const dpr = window.devicePixelRatio || 1;
  const particles: BpParticle[] = [];
  let W = 0;
  let H = 0;
  let rafId: number;

  function resize() {
    const rect = canvas.parentElement!.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    W = rect.width;
    H = rect.height;
  }

  function nodePos(node: BpNode) {
    return { x: node.x * W, y: node.y * H };
  }

  function spawnParticle() {
    if (particles.length >= MAX_PARTICLES) return;
    const edgeIdx = Math.floor(Math.random() * config.edges.length);
    particles.push({
      edge: edgeIdx,
      t: 0,
      speed: 0.003 + Math.random() * 0.004,
      size: 2 + Math.random() * 2,
      alpha: 0.6 + Math.random() * 0.4,
    });
  }

  function drawNode(node: BpNode, time: number) {
    const pos = nodePos(node);
    const c = config.color;
    let radius: number;
    let fillAlpha: number;
    let strokeColor: string;

    if (node.type === 'input') {
      radius = 18; fillAlpha = 0.15;
      strokeColor = rgba(CYAN, 0.8);
    } else if (node.type === 'supervisor') {
      radius = 22; fillAlpha = 0.2;
      strokeColor = rgba(TEAL, 0.9);
      const pulse = 0.5 + 0.5 * Math.sin(time * 0.002);
      ctx!.beginPath();
      ctx!.arc(pos.x, pos.y, radius + 8 + pulse * 6, 0, Math.PI * 2);
      ctx!.fillStyle = rgba(TEAL, 0.05 + pulse * 0.05);
      ctx!.fill();
    } else if (node.type === 'worker') {
      radius = 16; fillAlpha = 0.12;
      strokeColor = rgba(EMERALD, 0.7);
    } else {
      radius = 12; fillAlpha = 0.08;
      strokeColor = rgba(AMBER, 0.6);
    }

    ctx!.beginPath();
    ctx!.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx!.fillStyle = `rgba(${c.r},${c.g},${c.b},${fillAlpha})`;
    ctx!.fill();
    ctx!.strokeStyle = strokeColor;
    ctx!.lineWidth = 1.5;
    ctx!.stroke();

    ctx!.fillStyle = 'rgba(255,255,255,0.75)';
    ctx!.font = `${node.type === 'tool' ? 10 : 11}px Inter, system-ui, sans-serif`;
    ctx!.textAlign = 'center';
    ctx!.fillText(node.label, pos.x, pos.y + radius + 14);
  }

  function drawEdge(edge: [number, number]) {
    const from = nodePos(config.nodes[edge[0]]);
    const to = nodePos(config.nodes[edge[1]]);
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2 - 15;
    ctx!.beginPath();
    ctx!.moveTo(from.x, from.y);
    ctx!.quadraticCurveTo(midX, midY, to.x, to.y);
    ctx!.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx!.lineWidth = 1;
    ctx!.stroke();
  }

  function drawParticle(p: BpParticle) {
    const edge = config.edges[p.edge];
    const from = nodePos(config.nodes[edge[0]]);
    const to = nodePos(config.nodes[edge[1]]);
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2 - 15;

    const pos = quadBezier(from.x, from.y, midX, midY, to.x, to.y, p.t);
    const accent = config.accentColors[p.edge % config.accentColors.length];
    const a = p.alpha * (1 - Math.abs(p.t - 0.5) * 0.5);

    ctx!.beginPath();
    ctx!.arc(pos.x, pos.y, p.size, 0, Math.PI * 2);
    ctx!.fillStyle = rgba(accent, a);
    ctx!.fill();

    ctx!.beginPath();
    ctx!.arc(pos.x, pos.y, p.size + 3, 0, Math.PI * 2);
    ctx!.fillStyle = rgba(accent, a * 0.15);
    ctx!.fill();
  }

  function drawPillarIndicators(time: number) {
    const pillars = [
      { label: 'C', color: CYAN, x: W - 60, y: 20 },
      { label: 'B', color: TEAL, x: W - 40, y: 20 },
      { label: 'S', color: AMBER, x: W - 20, y: 20 },
      { label: 'A', color: EMERALD, x: W - 0, y: 20 },
    ];
    pillars.forEach((p, i) => {
      const pulse = 0.6 + 0.4 * Math.sin(time * 0.001 + i * 1.5);
      ctx!.beginPath();
      ctx!.arc(p.x, p.y, 6, 0, Math.PI * 2);
      ctx!.fillStyle = rgba(p.color, 0.2 + pulse * 0.3);
      ctx!.fill();
      ctx!.fillStyle = `rgba(255,255,255,${0.4 + pulse * 0.3})`;
      ctx!.font = '8px Inter, system-ui, sans-serif';
      ctx!.textAlign = 'center';
      ctx!.fillText(p.label, p.x, p.y + 3);
    });
  }

  function animate(time: number) {
    ctx!.clearRect(0, 0, W, H);
    config.edges.forEach(e => drawEdge(e));
    config.nodes.forEach(n => drawNode(n, time));

    if (Math.random() < 0.08) spawnParticle();
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].t += particles[i].speed;
      if (particles[i].t >= 1) {
        particles.splice(i, 1);
      } else {
        drawParticle(particles[i]);
      }
    }

    drawPillarIndicators(time);
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
