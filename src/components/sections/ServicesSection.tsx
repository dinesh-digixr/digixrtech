'use client';

import { Fragment, useRef, useEffect, useState, useCallback } from 'react';
import { CYAN, TEAL, AMBER, EMERALD } from '@/lib/canvas/utils';
import { initVizContext } from '@/lib/canvas/viz-context';
import { initVizBuild } from '@/lib/canvas/viz-build';
import { initVizSecure } from '@/lib/canvas/viz-secure';
import { initVizAssure } from '@/lib/canvas/viz-assure';
import { initRiver } from '@/lib/canvas/river-divider';

const SERVICES = ['context', 'build', 'secure', 'assure'] as const;
type ServiceKey = (typeof SERVICES)[number];

interface Offering {
  name: string;
  highlight: string;
  tags: string[];
}

interface ServiceData {
  key: ServiceKey;
  num: string;
  eyebrow: string;
  title: string;
  titleBreak: string;
  desc: string;
  reversed: boolean;
  offerings: Offering[];
}

const servicesData: ServiceData[] = [
  {
    key: 'context', num: '01', eyebrow: 'Stage 01 — Context',
    title: 'Context Engineering', titleBreak: 'Services',
    desc: 'Intelligence before code. We engineer the context layer — system constraints, domain knowledge, and task boundaries — so your agents think right before they act.',
    reversed: false,
    offerings: [
      { name: 'Layering of Context', highlight: 'layers', tags: ['System Context', 'Domain Context', 'Task Context', 'Interaction Context', 'Response Context'] },
      { name: 'Context Chaining', highlight: 'chain', tags: ['Multi-step Query Decomposition', 'Cross-Domain Context Synthesis', 'Contextual Recommendation Pipelines', 'Chain-of-Context Orchestration'] },
      { name: 'Knowledge Engineering', highlight: 'knowledge', tags: ['RAG Pipeline Design', 'Knowledge Graph Architecture', 'Agentic RAG / Multi-hop Retrieval', 'Chunking & Embedding Optimization'] },
    ],
  },
  {
    key: 'build', num: '02', eyebrow: 'Stage 02 — Build',
    title: 'Agent Engineering', titleBreak: '& Development',
    desc: 'Your core AI capability, engineered right. From single-agent pipelines to multi-agent orchestration — we design, build, and ship production-grade agents that actually work in the real world.',
    reversed: true,
    offerings: [
      { name: 'Agent Design & Architecture', highlight: 'design', tags: ['Agent Workflow vs Agentic AI', 'ReAct & CoT Reasoning', 'Supervisor & Swarm Patterns', 'Multi-Agent Orchestration'] },
      { name: 'LLM Strategy', highlight: 'llm', tags: ['Model Selection & Benchmarking', 'Prompt Engineering', 'Fine-tuning & Distillation', 'Cost Optimization'] },
      { name: 'MCP Tool Integration', highlight: 'tools', tags: ['Function Calling Protocols', 'API & Database Connectors', 'CRM & ERP Integration', 'External Tool Binding', 'A2A Agent Communication'] },
      { name: 'Agent Lifecycle Management', highlight: 'lifecycle', tags: ['Performance Monitoring', 'LLM Observability', 'Memory Management', 'Versioning & Rollback'] },
    ],
  },
  {
    key: 'secure', num: '03', eyebrow: 'Stage 03 — Secure',
    title: 'Agent', titleBreak: 'Security',
    desc: 'Most companies treat agent security as an afterthought. We make it a dedicated lifecycle stage — because one prompt injection can undo months of engineering.',
    reversed: false,
    offerings: [
      { name: 'Prompt Security', highlight: 'prompt', tags: ['Prompt Injection Defense', 'Jailbreak Prevention', 'Input Sanitization', 'Adversarial Testing'] },
      { name: 'Data Protection', highlight: 'data', tags: ['Exfiltration Prevention', 'PII Detection & Redaction', 'Context Window Leakage', 'Data Boundaries'] },
      { name: 'Access & Permission Control', highlight: 'access', tags: ['Permission Boundaries', 'Tool Access Governance', 'Human-in-the-Loop Gates', 'Least-Privilege Execution'] },
      { name: 'Runtime Guardrails', highlight: 'guardrails', tags: ['Output Filtering', 'Action Sandboxing', 'Rate Limiting & Cost Controls', 'Fallback Strategies'] },
    ],
  },
  {
    key: 'assure', num: '04', eyebrow: 'Stage 04 — Assure',
    title: 'Agentic AI', titleBreak: 'Assurance Services',
    desc: 'Ship with confidence, not crossed fingers. We validate your agents for reliability, fairness, and trust — because an unverified agent is a liability, not an asset.',
    reversed: true,
    offerings: [
      { name: 'Agentic Evaluation', highlight: 'eval', tags: ['Convergence & Agent Trajectory', 'Task Completion Accuracy', 'Agent Denial Rate', 'Multi-step Reasoning Validation'] },
      { name: 'LLM-as-a-Judge', highlight: 'judge', tags: ['RAGAS', 'DeepEVal', 'Custom Judge Pipelines', 'Human-AI Agreement Scoring'] },
      { name: 'Agent Interpretability', highlight: 'xai', tags: ['Agent Trajectory Analysis', 'Tool Use Attribution', 'Attention Visualization', 'Decision Audit Trails'] },
      { name: 'Trustworthy Assurance', highlight: 'trust', tags: ['Entity / Topic Bias', 'Hallucination Detection', 'Refusal Ratio', 'Toxicity Scoring'] },
    ],
  },
];

const ChevronIcon = () => (
  <svg className="offering-chevron" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
  </svg>
);

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lifecycleBarRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Record<ServiceKey, HTMLDivElement | null>>({ context: null, build: null, secure: null, assure: null });

  const vizCanvasRefs = useRef<Record<ServiceKey, HTMLCanvasElement | null>>({ context: null, build: null, secure: null, assure: null });
  const riverCanvasRefs = useRef<(HTMLCanvasElement | null)[]>([null, null, null]);

  const highlightRefs = useRef<Record<ServiceKey, { current: string | null }>>({
    context: { current: null }, build: { current: null },
    secure: { current: null }, assure: { current: null },
  });

  const [activeService, setActiveService] = useState<number>(-1);
  const [activeOfferings, setActiveOfferings] = useState<Record<string, string | null>>({
    context: null, build: null, secure: null, assure: null,
  });

  const toggleOffering = useCallback((serviceKey: ServiceKey, highlight: string) => {
    setActiveOfferings(prev => ({
      ...prev,
      [serviceKey]: prev[serviceKey] === highlight ? null : highlight,
    }));
  }, []);

  const scrollToService = useCallback((service: ServiceKey) => {
    panelRefs.current[service]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  // Lifecycle bar visibility
  useEffect(() => {
    const section = sectionRef.current;
    const bar = lifecycleBarRef.current;
    if (!section || !bar) return;

    const observer = new IntersectionObserver(([entry]) => {
      bar.classList.toggle('visible', entry.isIntersecting);
    }, { threshold: 0.05 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Panel active tracking
  useEffect(() => {
    const panelEls = SERVICES.map(s => panelRefs.current[s]).filter(Boolean) as HTMLDivElement[];
    if (panelEls.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const service = (entry.target as HTMLDivElement).dataset.service as ServiceKey;
        const idx = SERVICES.indexOf(service);
        setActiveService(idx);
      });
    }, { threshold: 0.4 });

    panelEls.forEach(p => observer.observe(p));
    return () => observer.disconnect();
  }, []);

  // Canvas initialization
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    const vizContext = vizCanvasRefs.current.context;
    if (vizContext) cleanups.push(initVizContext(vizContext, highlightRefs.current.context));

    const vizBuild = vizCanvasRefs.current.build;
    if (vizBuild) cleanups.push(initVizBuild(vizBuild, highlightRefs.current.build));

    const vizSecure = vizCanvasRefs.current.secure;
    if (vizSecure) cleanups.push(initVizSecure(vizSecure, highlightRefs.current.secure));

    const vizAssure = vizCanvasRefs.current.assure;
    if (vizAssure) cleanups.push(initVizAssure(vizAssure, highlightRefs.current.assure));

    const river0 = riverCanvasRefs.current[0];
    if (river0) cleanups.push(initRiver(river0, CYAN, TEAL));

    const river1 = riverCanvasRefs.current[1];
    if (river1) cleanups.push(initRiver(river1, TEAL, AMBER));

    const river2 = riverCanvasRefs.current[2];
    if (river2) cleanups.push(initRiver(river2, AMBER, EMERALD));

    return () => cleanups.forEach(fn => fn());
  }, []);

  // Scroll reveal animations
  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    if (!reveals || reveals.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });

    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Sync hover highlight refs
  useEffect(() => {
    for (const key of SERVICES) {
      highlightRefs.current[key].current = activeOfferings[key];
    }
  }, [activeOfferings]);

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      {/* Section header */}
      <div className="section-header reveal">
        <div className="section-label">Our GenAI Services</div>
        <h2 className="section-title">
          Context. Build. Secure. <span className="gradient">Assure.</span>
        </h2>
        <p className="section-subtitle">
          Four stages of the AI agent lifecycle — context first, secure by design, assured at scale.
        </p>
      </div>

      {/* Sticky lifecycle bar */}
      <div className="lifecycle-bar" ref={lifecycleBarRef}>
        <div className="lifecycle-track">
          {SERVICES.map((service, i) => (
            <Fragment key={service}>
              <div
                className="lifecycle-node"
                data-service={service}
                data-active={(i === activeService).toString()}
                data-past={(i < activeService).toString()}
                onClick={() => scrollToService(service)}
              >
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span>{service.toUpperCase()}</span>
              </div>
              {i < SERVICES.length - 1 && (
                <div
                  className="lifecycle-connector"
                  data-service={service}
                  data-filled={(i < activeService).toString()}
                >
                  <div className="fill" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      {/* Service panels + river dividers */}
      {servicesData.map((service, si) => (
        <Fragment key={service.key}>
          <div
            className={`service-panel${service.reversed ? ' reversed' : ''}`}
            data-service={service.key}
            data-num={service.num}
            id={`panel-${service.key}`}
            ref={el => { panelRefs.current[service.key] = el; }}
          >
            <div className="viz-area reveal">
              <canvas ref={el => { vizCanvasRefs.current[service.key] = el; }} />
            </div>
            <div className="service-content">
              <div className="service-eyebrow reveal">{service.eyebrow}</div>
              <h3 className="service-title reveal reveal-delay-1">
                {service.title}<br />{service.titleBreak}
              </h3>
              <p className="service-desc reveal reveal-delay-2">{service.desc}</p>
              <div className="offerings-list reveal reveal-delay-3">
                {service.offerings.map(offering => (
                  <div
                    key={offering.highlight}
                    className={`offering${activeOfferings[service.key] === offering.highlight ? ' active' : ''}`}
                    onMouseEnter={() => { highlightRefs.current[service.key].current = offering.highlight; }}
                    onMouseLeave={() => { highlightRefs.current[service.key].current = activeOfferings[service.key]; }}
                  >
                    <div
                      className="offering-header"
                      onClick={() => toggleOffering(service.key, offering.highlight)}
                    >
                      <span className="offering-name">
                        <span className="offering-dot" />
                        {offering.name}
                      </span>
                      <ChevronIcon />
                    </div>
                    <div className="offering-body">
                      <div className="offering-items">
                        {offering.tags.map(tag => (
                          <span key={tag} className="tech-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* River divider (after each panel except last) */}
          {si < servicesData.length - 1 && (
            <div className="river-divider">
              <canvas ref={el => { riverCanvasRefs.current[si] = el; }} />
            </div>
          )}
        </Fragment>
      ))}
    </section>
  );
}
