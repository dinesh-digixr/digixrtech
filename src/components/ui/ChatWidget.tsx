'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  type ChatMessage,
  type QuickActionTopic,
  chatHeader,
  chatGreeting,
  quickActions,
  getQuickActionResponse,
  getChatResponse,
} from '@/lib/data/chat-responses';

interface DisplayMessage {
  id: number;
  role: 'agent' | 'user';
  html: string;
  reasoning?: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState('');
  const messagesRef = useRef<HTMLDivElement>(null);
  const msgIdRef = useRef(0);
  const timeoutIdsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Initialize with greeting on first open
  const hasInitRef = useRef(false);

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

  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = useCallback((role: DisplayMessage['role'], msg: ChatMessage | string) => {
    const id = ++msgIdRef.current;
    const chatMsg = typeof msg === 'string' ? { html: msg } : msg;
    setMessages((prev) => [...prev, { id, role, html: chatMsg.html, reasoning: chatMsg.reasoning }]);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next && !hasInitRef.current) {
        hasInitRef.current = true;
        addMessage('agent', chatGreeting);
      }
      return next;
    });
  }, [addMessage]);

  const handleQuickAction = useCallback(
    (topic: QuickActionTopic) => {
      addMessage('user', `Tell me about ${topic.toLowerCase()}`);
      safeTimeout(() => {
        addMessage('agent', getQuickActionResponse(topic));
      }, 800);
    },
    [addMessage, safeTimeout]
  );

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput('');
    addMessage('user', trimmed);
    safeTimeout(() => {
      addMessage('agent', getChatResponse(trimmed));
    }, 800);
  }, [input, addMessage, safeTimeout]);

  return (
    <div className="chat-widget">
      <div className={`chat-panel${isOpen ? ' open' : ''}`}>
        <div className="chat-header">
          <div className="chat-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={18} height={18}>
              <path d="M12 2a4 4 0 014 4v2a4 4 0 01-8 0V6a4 4 0 014-4zM6.5 18C6.5 15 9 13 12 13s5.5 2 5.5 5" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <div className="chat-header-text">
            <h4>{chatHeader.title}</h4>
            <p>{chatHeader.subtitle}</p>
          </div>
        </div>

        <div className="chat-messages" ref={messagesRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-msg ${msg.role}`}>
              <span dangerouslySetInnerHTML={{ __html: msg.html }} />
              {msg.reasoning && <div className="reasoning">{msg.reasoning}</div>}
            </div>
          ))}
        </div>

        {messages.length <= 1 && (
          <div className="chat-quick-actions">
            {quickActions.map((action) => (
              <button
                key={action}
                className="quick-action"
                onClick={() => handleQuickAction(action)}
              >
                {action}
              </button>
            ))}
          </div>
        )}

        <div className="chat-input-area">
          <input
            className="chat-input"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <button className="chat-send" onClick={handleSend}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={18} height={18}>
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
            </svg>
          </button>
        </div>
      </div>

      <button className="chat-toggle" onClick={handleToggle} aria-label="Toggle chat">
        <span className="chat-pulse" />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={26} height={26}>
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      </button>
    </div>
  );
}
