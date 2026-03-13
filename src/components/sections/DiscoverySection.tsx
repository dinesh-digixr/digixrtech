'use client';

import { useEffect, useRef, useState, useCallback, type FormEvent } from 'react';
import {
  type Industry,
  industries,
  architectureTemplates,
} from '@/lib/data/architecture-templates';

type Step = 'idle' | 'industry' | 'challenge' | 'thinking' | 'proposal' | 'form' | 'thankyou';

interface Message {
  id: number;
  type: 'agent' | 'user' | 'thinking' | 'thankyou';
  html: string;
  reasoning?: string;
}

export function DiscoverySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const msgIdRef = useRef(0);
  const timeoutIdsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [step, setStep] = useState<Step>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [customChallenge, setCustomChallenge] = useState('');
  const [chipsDisabled, setChipsDisabled] = useState(false);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  // Scroll reveal
  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    if (!reveals || reveals.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Auto-scroll panel to bottom on new messages
  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTop = panelRef.current.scrollHeight;
    }
  }, [messages, step]);

  const safeTimeout = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      fn();
      const arr = timeoutIdsRef.current;
      const idx = arr.indexOf(id);
      if (idx !== -1) arr.splice(idx, 1);
    }, ms);
    timeoutIdsRef.current.push(id);
    return id;
  }, []);

  const addMessage = useCallback((type: Message['type'], html: string, reasoning?: string) => {
    const id = ++msgIdRef.current;
    setMessages((prev) => [...prev, { id, type, html, reasoning }]);
    return id;
  }, []);

  const handleStart = useCallback(() => {
    setStep('industry');
    safeTimeout(() => {
      addMessage(
        'agent',
        "Hi! I'm the Digixr discovery agent. Let's map your challenge to an agentic architecture.<br/><br/><b>What industry are you in?</b>",
        'Initiating: Solution Discovery → Step 1: Industry context'
      );
    }, 300);
  }, [addMessage, safeTimeout]);

  const handleSelectIndustry = useCallback(
    (industry: Industry) => {
      setSelectedIndustry(industry);
      setChipsDisabled(true);
      const label = industries.find((i) => i.key === industry)?.label ?? industry;

      safeTimeout(() => {
        addMessage('user', label);
        setStep('challenge');

        safeTimeout(() => {
          addMessage(
            'agent',
            "Great choice. <b>What's the biggest challenge you want AI to solve?</b><br/><br/>Pick one below or describe your own:",
            `Loading: ${label} domain context → challenge templates`
          );
          setChipsDisabled(false);
        }, 400);
      }, 300);
    },
    [addMessage, safeTimeout]
  );

  const handleSubmitChallenge = useCallback(
    (challenge: string) => {
      if (!challenge.trim()) return;
      setSelectedChallenge(challenge);
      setChipsDisabled(true);

      addMessage('user', challenge);

      safeTimeout(() => {
        setStep('thinking');
        addMessage('thinking', '');

        safeTimeout(() => {
          // Remove thinking message and show proposal
          setMessages((prev) => prev.filter((m) => m.type !== 'thinking'));
          setStep('proposal');

          const template = architectureTemplates[selectedIndustry ?? 'other'];

          const agentsHtml = template.agents
            .map(
              (a) => `
            <div class="agent-row">
              <div class="agent-icon ${a.color}">${a.icon}</div>
              <div>
                <div class="agent-name">${a.name}</div>
                <div class="agent-desc">${a.desc}</div>
              </div>
            </div>`
            )
            .join('');

          const lifecycleHtml = `
            <div class="lifecycle-map">
              <div class="lifecycle-step"><div class="step-label">Context</div><div class="step-detail">${template.lifecycle.context}</div></div>
              <div class="lifecycle-step"><div class="step-label">Build</div><div class="step-detail">${template.lifecycle.build}</div></div>
              <div class="lifecycle-step"><div class="step-label">Secure</div><div class="step-detail">${template.lifecycle.secure}</div></div>
              <div class="lifecycle-step"><div class="step-label">Assure</div><div class="step-detail">${template.lifecycle.assure}</div></div>
            </div>`;

          addMessage(
            'agent',
            `Here's how we'd architect an agentic solution for <b>${challenge.toLowerCase()}</b>:
            <div class="architecture-card">
              <h4>Proposed Agent Architecture</h4>
              ${agentsHtml}
              ${lifecycleHtml}
              <span class="complexity-badge">Complexity: ${template.complexity}</span>
            </div>`,
            `Generated: Architecture proposal → ${selectedIndustry} domain × "${challenge}" → 4-pillar lifecycle mapping`
          );

          safeTimeout(() => {
            addMessage(
              'agent',
              'Want us to build a detailed proposal for your use case? <b>Let us know how to reach you.</b>'
            );
            setStep('form');
          }, 600);
        }, 1800);
      }, 300);
    },
    [addMessage, safeTimeout, selectedIndustry]
  );

  const handleSubmitLead = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const lead = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        company: formData.get('company') as string,
        role: formData.get('role') as string,
        industry: selectedIndustry,
        challenge: selectedChallenge,
        timestamp: new Date().toISOString(),
      };

      // In production, this would POST to an API
      console.log('Lead captured:', lead);

      addMessage('user', `${lead.name} — ${lead.role} at ${lead.company}`);

      safeTimeout(() => {
        const firstName = lead.name.split(' ')[0];
        addMessage(
          'thankyou',
          `<h3>Thank you, ${firstName}!</h3><p>We'll put together a detailed proposal for <b>${selectedChallenge?.toLowerCase()}</b> and reach out at <b>${lead.email}</b> within 24 hours.</p>`
        );
        setStep('thankyou');
      }, 400);
    },
    [addMessage, safeTimeout, selectedIndustry, selectedChallenge]
  );

  const template = selectedIndustry ? architectureTemplates[selectedIndustry] : null;

  return (
    <section className="cta-section" id="cta" ref={sectionRef}>
      <div className="section-header reveal">
        <div className="section-label">Challenge Us</div>
        <h2 className="section-title">
          Tell our agent what you&apos;re trying to <span className="gradient">solve.</span>
        </h2>
        <p className="section-subtitle">
          Tell us what you&apos;re solving — our agent will map it to an architecture before you finish your coffee.
        </p>
      </div>

      {/* Entry buttons — hidden once discovery starts */}
      {step === 'idle' && (
        <div className="discovery-start reveal">
          <div className="cta-buttons">
            <button className="cta-primary" onClick={handleStart}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={18} height={18}>
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Start Discovery
            </button>
            <button
              className="cta-secondary"
              onClick={() => document.getElementById('blueprints')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Blueprints
            </button>
          </div>
        </div>
      )}

      {/* Discovery conversation panel */}
      <div className={`discovery-panel${step !== 'idle' ? ' active' : ''}`} ref={panelRef}>
        <div className="discovery-messages">
          {messages.map((msg) => {
            if (msg.type === 'thinking') {
              return (
                <div key={msg.id} className="discovery-msg agent">
                  <div className="discovery-thinking">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              );
            }
            if (msg.type === 'thankyou') {
              return (
                <div
                  key={msg.id}
                  className="discovery-thankyou"
                  dangerouslySetInnerHTML={{ __html: msg.html }}
                />
              );
            }
            return (
              <div key={msg.id} className={`discovery-msg ${msg.type}`}>
                <span dangerouslySetInnerHTML={{ __html: msg.html }} />
                {msg.reasoning && <div className="reasoning">{msg.reasoning}</div>}
              </div>
            );
          })}
        </div>

        {/* Input area — changes per step */}
        <div className="discovery-input-area">
          {/* Industry chips */}
          {step === 'industry' && (
            <div className="discovery-chips">
              {industries.map((ind) => (
                <button
                  key={ind.key}
                  className={`discovery-chip${selectedIndustry === ind.key ? ' selected' : ''}`}
                  onClick={() => handleSelectIndustry(ind.key)}
                  disabled={chipsDisabled}

                >
                  {ind.label}
                </button>
              ))}
            </div>
          )}

          {/* Challenge chips + free text */}
          {step === 'challenge' && template && (
            <>
              <div className="discovery-chips">
                {template.challenges.map((ch) => (
                  <button
                    key={ch}
                    className={`discovery-chip${selectedChallenge === ch ? ' selected' : ''}`}
                    onClick={() => handleSubmitChallenge(ch)}
                    disabled={chipsDisabled}
  
                  >
                    {ch}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  className="discovery-text-input"
                  placeholder="Or describe your challenge..."
                  value={customChallenge}
                  onChange={(e) => setCustomChallenge(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customChallenge.trim()) {
                      handleSubmitChallenge(customChallenge.trim());
                    }
                  }}
                  disabled={chipsDisabled}
                />
                <button
                  className="discovery-submit"
                  onClick={() => {
                    if (customChallenge.trim()) handleSubmitChallenge(customChallenge.trim());
                  }}
                  disabled={!customChallenge.trim() || chipsDisabled}
                >
                  Send
                </button>
              </div>
            </>
          )}

          {/* Lead capture form */}
          {step === 'form' && (
            <form className="discovery-form" onSubmit={handleSubmitLead}>
              <input type="text" name="name" placeholder="Your name" required />
              <input type="email" name="email" placeholder="Work email" required />
              <input type="text" name="company" placeholder="Company" required />
              <input type="text" name="role" placeholder="Your role / designation" required />
              <button type="submit" className="discovery-form-submit">
                Send My Proposal &rarr;
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
