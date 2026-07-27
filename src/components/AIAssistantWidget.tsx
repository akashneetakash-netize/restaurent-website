'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';
import { useStore } from '@/lib/store';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AIAssistantWidget: React.FC = () => {
  const store = useStore();

  const menuItems = store.menuItems || [];
  const tables = store.tables || [];
  const orders = store.orders || [];
  const currentUser = store.currentUser || null;

  const role: string = (currentUser as any)?.role || 'customer';

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Good evening. I am the Haven AI Sommelier & Operations Assistant. How may I elevate your experience tonight?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const getQuickPrompts = (): string[] => {
    if (role === 'manager') {
      return ['Show today’s performance', 'Any inventory warnings?', 'Predict busy hours'];
    }
    if (role === 'kitchen' || role === 'waiter') {
      return ['Show pending orders', 'Table status overview', 'Mark item sold out'];
    }
    return [
      'Recommend a wine for Tandoori Lamb Chops',
      'What are tonight’s chef signatures?',
      'Any vegetarian options?',
      'Book a table for 2',
    ];
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Live context sent to Gemini
      const liveContext = {
        role,
        userName: currentUser?.name || 'Guest',
        availableMenu: menuItems
          .filter((item: any) => item.isAvailable !== false)
          .map((item: any) => ({
            name: item.name,
            price: item.price,
            isSignature: item.isSignature,
            description: item.description || '',
            pairingNote: item.pairingNote || '',
          })),
        tablesSummary: {
          available: tables.filter((t: any) => t.status === 'available').length,
          occupied: tables.filter((t: any) => t.status === 'occupied').length,
          reserved: tables.filter((t: any) => t.status === 'reserved').length,
        },
        activeOrdersCount: orders.filter(
          (o: any) => !['served', 'completed'].includes(o.orderStatus)
        ).length,
      };

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          history: messages.slice(-8),
          context: liveContext,
        }),
      });

      const data = await response.json();
      const aiReply =
        data.reply ||
        'I recommend our signature Tandoori Lamb Chops paired with a smoky Old Fashioned.';

      const aiMsg: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: `msg-ai-err-${Date.now()}`,
        sender: 'ai',
        text: 'Allow me to suggest our Nalli Nihari Biryani. It is exceptional tonight.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gold-gradient text-black font-bold shadow-gold-lg flex items-center gap-2"
      >
        <Sparkles className="w-5 h-5 text-black" />
        <span className="hidden sm:inline font-serif text-xs uppercase tracking-widest font-bold">
          AI Sommelier
        </span>
      </motion.button>

      {/* Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] bg-haven-card border border-haven-gold/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-haven-surface via-haven-card to-haven-surface border-b border-haven-gold/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-haven-gold/10 border border-haven-gold/40 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-haven-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-haven-text-primary tracking-wider">
                    HAVEN AI SOMMELIER
                  </h3>
                  <span className="text-[9px] text-haven-gold uppercase tracking-widest">
                    {role === 'manager'
                      ? 'Manager Mode'
                      : role === 'kitchen' || role === 'waiter'
                      ? 'Staff Mode'
                      : 'Platinum Concierge'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-haven-text-muted hover:text-haven-gold transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-haven-bg/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                      msg.sender === 'user'
                        ? 'bg-haven-gold text-black border-haven-gold'
                        : 'bg-haven-surface text-haven-gold border-haven-gold/30'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <User className="w-3.5 h-3.5" />
                    ) : (
                      <Bot className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-xl p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-haven-gold/20 border border-haven-gold/40 text-haven-text-primary rounded-tr-none'
                        : 'bg-haven-surface border border-haven-border text-haven-text-primary rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span className="block text-[8px] text-haven-text-muted mt-1 text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-haven-gold text-xs italic font-serif">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Consulting live kitchen & cellar data...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-2 bg-haven-surface/80 border-t border-haven-border/40 flex gap-1.5 overflow-x-auto no-scrollbar">
              {getQuickPrompts().map((qp, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(qp)}
                  className="px-2.5 py-1 rounded-full border border-haven-gold/20 bg-haven-card text-[10px] text-haven-text-secondary hover:text-haven-gold hover:border-haven-gold/50 whitespace-nowrap transition"
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-haven-card border-t border-haven-border flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about wine, pairings, tables, or orders..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-haven-surface border border-haven-border rounded-xl px-3.5 py-2 text-xs text-haven-text-primary placeholder:text-haven-text-muted focus:outline-none focus:border-haven-gold/60"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-xl bg-gold-gradient text-black hover:opacity-90 transition disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};