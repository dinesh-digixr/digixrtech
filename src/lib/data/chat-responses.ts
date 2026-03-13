/**
 * Chat widget content — externalized for easy replacement with real AI responses.
 *
 * To make this functional:
 * 1. Replace `getQuickActionResponse` with an API call to your agent backend.
 * 2. Replace `getChatResponse` with a streaming/non-streaming LLM call.
 * 3. Keep the same return shape ({ html, reasoning }) so the UI needs no changes.
 */

export interface ChatMessage {
  html: string;
  reasoning?: string;
}

/** Header content shown at the top of the chat panel */
export const chatHeader = {
  title: 'Digixr Agent',
  subtitle: 'Powered by our own Context Engineering',
} as const;

/** Initial greeting message shown when chat opens */
export const chatGreeting: ChatMessage = {
  html: "Hi! I'm an AI agent built using the same practices we offer to our clients.<br/><br/>I can help you understand our services, explore solution blueprints, or discuss how we'd approach your specific challenge.",
  reasoning:
    'Using ReAct reasoning with layered context: System (Digixr knowledge) + Domain (your industry) + Task (your question)',
};

/** Quick action button labels */
export const quickActions = ['Our services', 'Solution blueprints', 'My use case'] as const;

export type QuickActionTopic = (typeof quickActions)[number];

/** Canned responses for quick action buttons — replace with API calls for real agent */
const quickActionResponses: Record<QuickActionTopic, ChatMessage> = {
  'Our services': {
    html: 'We offer four interconnected stages that form the complete agent lifecycle — <b>Context first. Secure by design. Assured at scale.</b><br/><br/><b>01 — Context Engineering</b> — We start by layering System, Domain, Task, Interaction, and Response context. Intelligence before code.<br/><br/><b>02 — Agent Engineering</b> — Design and build multi-agent systems using ReAct reasoning, CoT, and MCP tool integration.<br/><br/><b>03 — Agent Security</b> — Prompt injection defense, data protection, access control, and runtime guardrails. Security as a dedicated lifecycle stage.<br/><br/><b>04 — AI Assurance</b> — Validate reliability with RAGAS, agent trajectory analysis, bias detection, and trustworthiness metrics.',
    reasoning:
      'Retrieved from: company knowledge base → 4-pillar service taxonomy → generated summary',
  },
  'Solution blueprints': {
    html: 'We have two solution blueprints that demonstrate our 4-pillar lifecycle in action:<br/><br/><b>Appointment Intelligence</b> (Healthcare) — Multi-agent scheduling system with Supervisor + 3 worker agents (Intake, Scheduling, Notification). MCP integrations with EHR, Calendar API, and SMS Gateway. HIPAA-compliant guardrails throughout.<br/><br/><b>First-Gen College Navigator</b> (Education) — Multilingual AI navigator for underserved students. Eligibility matching, document tracking, and step-by-step counseling — with bias detection to ensure equitable recommendations.<br/><br/><a href="#blueprints" style="color:var(--cyan)">View the blueprints &rarr;</a>',
    reasoning:
      'Retrieved from: solution blueprints database → architecture summaries → 4-pillar mapping',
  },
  'My use case': {
    html: "I'd love to help! To recommend the right approach, could you share:<br/><br/>1. What's your current AI maturity? (No agents / Basic / Multi-agent)<br/>2. What problem are you looking to solve?<br/>3. What systems need to be integrated?",
    reasoning:
      'Initiating: Service Recommendation Agent → Step 1: Assess maturity → Step 2: Map requirements → Step 3: Generate recommendation',
  },
};

/** Get response for a quick action topic. Replace this function body with an API call. */
export function getQuickActionResponse(topic: QuickActionTopic): ChatMessage {
  return quickActionResponses[topic];
}

/** Fallback response for free-text input. Replace with real agent call. */
export function getChatResponse(_userMessage: string): ChatMessage {
  return {
    html: "I can help with that! In production, I'd use our Context Engineering pipeline to understand your question and provide a detailed answer. For now, try the quick actions above or <a href=\"#cta\" style=\"color:var(--cyan)\">start a discovery session</a> for a personalized architecture proposal.",
    reasoning:
      'Fallback: Static response — real agent integration pending (Phase 2)',
  };
}
