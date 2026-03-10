'use client';

import { useRef, useEffect, useState, useCallback, type ReactNode } from 'react';
import { initBlueprintViz } from '@/lib/canvas/viz-blueprint';

type BlueprintKey = 'healthcare' | 'education';

interface PipelineStep {
  icon: string;
  type: 'input' | 'supervisor' | 'worker';
  label: string;
  desc: string;
  output?: string;
  tools?: string[];
}

interface PillarBadge {
  pillar: 'context' | 'build' | 'secure' | 'assure';
  label: string;
  desc: string;
}

interface BlueprintData {
  key: BlueprintKey;
  tabIcon: 'heart' | 'book';
  tabTitle: string;
  tabSub: string;
  domainBadge: string;
  title: string;
  desc: string;
  steps: PipelineStep[];
  pillars: PillarBadge[];
  demoUrl: string;
}

const blueprints: BlueprintData[] = [
  {
    key: 'healthcare',
    tabIcon: 'heart',
    tabTitle: 'Healthcare',
    tabSub: 'Appointment Intelligence',
    domainBadge: 'Healthcare',
    title: 'Appointment Intelligence',
    desc: 'An intelligent multi-agent system that transforms hospital appointment scheduling from a fragmented, manual process into a seamless, context-aware experience — without touching clinical decisions.',
    steps: [
      { icon: 'chat', type: 'input', label: 'Patient Request', desc: 'Patient initiates via chat, voice, or web portal' },
      { icon: 'settings', type: 'supervisor', label: 'Supervisor Agent', desc: 'Classifies intent, extracts key info, routes to appropriate worker' },
      { icon: 'doc', type: 'worker', label: 'Intake Agent', desc: 'Gathers insurance details, preferences, accessibility needs, symptoms in plain language', output: 'Structured Patient Profile' },
      { icon: 'calendar', type: 'worker', label: 'Scheduling Agent', desc: 'Checks doctor availability, matches specialty, suggests optimal slots', output: 'Appointment Confirmed', tools: ['EHR System', 'Calendar API', 'Department Directory'] },
      { icon: 'bell', type: 'worker', label: 'Notification Agent', desc: 'Sends confirmation, prep instructions, reminders', tools: ['SMS Gateway', 'Email Service', 'Patient Portal'] },
    ],
    pillars: [
      { pillar: 'context', label: 'Context', desc: 'Patient history, department knowledge base, insurance rules' },
      { pillar: 'build', label: 'Build', desc: 'Supervisor + 3 worker agents, MCP tools (EHR, Calendar, SMS)' },
      { pillar: 'secure', label: 'Secure', desc: 'PHI/PII redaction, HIPAA-compliant guardrails, input sanitization' },
      { pillar: 'assure', label: 'Assure', desc: 'Scheduling accuracy, agent denial rate, bias detection' },
    ],
    demoUrl: '/blueprint-demo/healthcare',
  },
  {
    key: 'education',
    tabIcon: 'book',
    tabTitle: 'Education',
    tabSub: 'First-Gen Navigator',
    domainBadge: 'Education',
    title: 'First-Gen College Navigator',
    desc: 'A multilingual AI navigator that bridges the information gap for first-generation college students — guiding them through admissions, scholarships, and documents that privileged students learn from family.',
    steps: [
      { icon: 'chat', type: 'input', label: 'Student Query', desc: 'Student asks in their preferred language via chat' },
      { icon: 'settings', type: 'supervisor', label: 'Navigator Agent', desc: 'Understands intent, assesses student profile, routes to specialist' },
      { icon: 'books', type: 'worker', label: 'Eligibility Agent', desc: 'Matches student background to programs, scholarships, financial aid options', output: 'Personalized Options List', tools: ['University Catalog', 'Scholarship Database', 'Financial Aid Rules'] },
      { icon: 'doc', type: 'worker', label: 'Document Agent', desc: 'Explains required documents, tracks submission status, sends deadline reminders', output: 'Application Readiness Score', tools: ['Document Checklist API', 'Calendar', 'Notification Service'] },
      { icon: 'people', type: 'worker', label: 'Counselor Agent', desc: 'Answers questions in simple language, provides step-by-step guidance', tools: ['FAQ Knowledge Base', 'Application Guides', 'Campus Resources'] },
    ],
    pillars: [
      { pillar: 'context', label: 'Context', desc: 'Student background, institutional knowledge, regional language context' },
      { pillar: 'build', label: 'Build', desc: 'Navigator + 3 agents, multilingual NLP, RAG over institutional knowledge' },
      { pillar: 'secure', label: 'Secure', desc: "Minor's data protection, no demographic profiling for steering" },
      { pillar: 'assure', label: 'Assure', desc: 'Bias detection, recommendation fairness, hallucination prevention' },
    ],
    demoUrl: '/blueprint-demo/education',
  },
];

const stepIcons: Record<string, ReactNode> = {
  chat: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
  doc: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
  calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
  bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
  books: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
  people: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
};

const tabIcons: Record<string, ReactNode> = {
  heart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
  book: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
};

export function BlueprintsSection() {
  const [activeTab, setActiveTab] = useState<BlueprintKey>('healthcare');
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRefs = useRef<Record<BlueprintKey, HTMLCanvasElement | null>>({
    healthcare: null,
    education: null,
  });

  const switchBlueprint = useCallback((key: BlueprintKey) => {
    setActiveTab(key);
  }, []);

  // Canvas initialization
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const hc = canvasRefs.current.healthcare;
    if (hc) cleanups.push(initBlueprintViz(hc, 'healthcare'));
    const ed = canvasRefs.current.education;
    if (ed) cleanups.push(initBlueprintViz(ed, 'education'));
    return () => cleanups.forEach(fn => fn());
  }, []);

  // Reveal animations
  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    if (!reveals || reveals.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="blueprints-section" id="blueprints" ref={sectionRef}>
      <div className="section-header reveal">
        <div className="section-label">Solution Blueprints</div>
        <h2 className="section-title">
          See our methodology <span className="gradient">in action.</span>
        </h2>
        <p className="section-subtitle">
          Explore interactive demos that show how our 4-pillar lifecycle solves real-world challenges across domains.
        </p>
      </div>

      {/* Tabs */}
      <div className="blueprint-tabs reveal">
        {blueprints.map((bp) => (
          <button
            key={bp.key}
            className={`blueprint-tab${activeTab === bp.key ? ' active' : ''}`}
            data-bp={bp.key}
            onClick={() => switchBlueprint(bp.key)}
          >
            {tabIcons[bp.tabIcon]}
            <span>{bp.tabTitle}</span>
            <small>{bp.tabSub}</small>
          </button>
        ))}
      </div>

      {/* Content panels */}
      {blueprints.map((bp) => (
        <div
          key={bp.key}
          className={`blueprint-content${activeTab === bp.key ? ' active' : ''}`}
          id={`bp-${bp.key}`}
        >
          <div className="blueprint-viz reveal">
            <canvas ref={el => { canvasRefs.current[bp.key] = el; }} />
          </div>

          <div className="blueprint-details reveal">
            <span className={`domain-badge ${bp.key}`}>{bp.domainBadge}</span>
            <h3 className="blueprint-title">{bp.title}</h3>
            <p className="blueprint-desc">{bp.desc}</p>

            <div className="pipeline-steps">
              {bp.steps.map((step) => (
                <div key={step.label} className="pipeline-step" data-type={step.type}>
                  <div className="pipeline-step-header">
                    {stepIcons[step.icon]}
                    <strong>{step.label}</strong>
                    {step.output && <span className="pipeline-output">{step.output}</span>}
                  </div>
                  <p>{step.desc}</p>
                  {step.tools && (
                    <div className="pipeline-tools">
                      {step.tools.map(tool => (
                        <span key={tool} className="pipeline-tool">{tool}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pillar-badges">
              {bp.pillars.map((p) => (
                <div key={p.pillar} className={`pillar-badge ${p.pillar}`}>
                  <span className="pillar-dot" />
                  <strong>{p.label}</strong>
                  <span>{p.desc}</span>
                </div>
              ))}
            </div>

            <a href={bp.demoUrl} className="blueprint-demo-cta">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Try the Demo
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}
