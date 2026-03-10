'use client';

import { useEffect, useRef } from 'react';
import { initAgentNetwork } from '@/lib/canvas/agent-network';
import { initScrollTransition } from '@/lib/scroll-transition';

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cleanupCanvas = initAgentNetwork(canvas);
    const cleanupScroll = initScrollTransition();
    return () => {
      cleanupCanvas();
      cleanupScroll();
    };
  }, []);

  return (
    <section className="hero" id="heroSection">
      <canvas id="heroCanvas" ref={canvasRef} />
      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot" />
          Context → Build → Secure → Assure
        </div>
        <h1 className="hero-headline">
          We don&apos;t just build AI agents.
          <br />
          We engineer <span className="gradient">trust.</span>
        </h1>
        <p className="hero-sub">
          Context first. Secure by design. Assured at scale. AI powerful enough
          to transform industries — and responsible enough to earn trust.
        </p>
        <div className="hero-ctas">
          <button
            className="btn-primary"
            onClick={() =>
              document
                .getElementById('cta')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Challenge Us →
          </button>
          <button
            className="btn-secondary"
            onClick={() =>
              document
                .getElementById('blueprints')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            See It In Action
          </button>
        </div>
      </div>
    </section>
  );
}
