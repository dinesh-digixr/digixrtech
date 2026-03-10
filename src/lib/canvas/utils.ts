export interface Color {
  r: number;
  g: number;
  b: number;
}

export const CYAN: Color = { r: 76, g: 201, b: 208 };
export const TEAL: Color = { r: 59, g: 191, b: 166 };
export const EMERALD: Color = { r: 66, g: 198, b: 139 };
export const AMBER: Color = { r: 255, g: 184, b: 77 };
export const WHITE: Color = { r: 255, g: 255, b: 255 };

export function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

export function rgba(c: Color, a: number): string {
  return `rgba(${c.r},${c.g},${c.b},${a})`;
}

export function lerpColor(a: Color, b: Color, t: number): Color {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

export function quadBezier(
  p0x: number, p0y: number,
  p1x: number, p1y: number,
  p2x: number, p2y: number,
  t: number
): { x: number; y: number } {
  const u = 1 - t;
  return {
    x: u * u * p0x + 2 * u * t * p1x + t * t * p2x,
    y: u * u * p0y + 2 * u * t * p1y + t * t * p2y,
  };
}

export function dist(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

export function isInView(el: HTMLElement): boolean {
  const r = el.getBoundingClientRect();
  return r.bottom > -100 && r.top < window.innerHeight + 100;
}
