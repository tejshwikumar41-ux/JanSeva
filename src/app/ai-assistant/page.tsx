"use client";

import React, { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Sparkles, Send, ShieldAlert, ArrowRight, RefreshCw, 
  User, Bot, Trash2, HelpCircle, ChevronRight
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  source?: string;
}

function AIContent() {
  const searchParams = useSearchParams();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `**Namaste! I am JanSeva AI**, your virtual assistant for Indian Central and State Government schemes.

How can I help you today? You can ask me questions like:
- *"How do I apply for PM Kisan?"*
- *"What documents are needed for Ayushman Bharat?"*
- *"Tell me about scholarships for students."*
- *"How to get a new Voter ID card?"*`
    }
  ]);
  
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("System Offline");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Trigger search from query param on mount
  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setInput(`Tell me details about "${searchQuery}"`);
    }
  }, [searchParams]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    
    // Append user message
    const updatedMessages = [...messages, { role: "user" as const, content: userText }];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages.map(m => ({ role: m.role, content: m.content })) })
      });
      const data = await res.json();
      if (data.success) {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: data.message,
          source: data.source
        }]);
        setSource(data.source || "Local Engine");
      }
    } catch (err) {
      console.error("AI chat error", err);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Oops! I encountered an error connecting to my database engine. Please try again or visit our Schemes page directly." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: `**Namaste! I am JanSeva AI**, your virtual assistant for Indian Central and State Government schemes.

How can I help you today? You can ask me questions like:
- *"How do I apply for PM Kisan?"*
- *"What documents are needed for Ayushman Bharat?"*
- *"Tell me about scholarships for students."*
- *"How to get a new Voter ID card?"*`
      }
    ]);
  };

  const handleShortcutClick = (query: string) => {
    setInput(query);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full flex flex-col h-[82vh] space-y-4">
      {/* Header and Breadcrumbs */}
      <div>
        <nav className="flex items-center space-x-1.5 text-xs text-text-muted mb-2">
          <Link href="/" className="hover:underline">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-semibold text-foreground">AI Assistant</span>
        </nav>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-accent-saffron animate-pulse" />
            <h1 className="text-xl sm:text-2xl font-black text-primary-navy dark:text-foreground">
              JanSeva AI Assistant
            </h1>
          </div>
          <button
            onClick={clearChat}
            className="text-xs text-red-500 hover:underline flex items-center space-x-1 border border-border px-3 py-1.5 rounded-lg bg-card"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </div>
      </div>

      {/* Main Chat Layout */}
      <div className="flex-grow bg-card border border-border rounded-2xl shadow-sm flex flex-col overflow-hidden relative">
        
        {/* Messages List Area */}
        <div className="flex-grow p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[50vh] sm:max-h-[55vh]">
          {messages.map((msg, index) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={index}
                className={`flex items-start gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Avatar Icon */}
                <div className={`p-2 rounded-full flex-shrink-0 ${isUser ? "bg-accent-saffron text-primary-navy" : "bg-primary-navy text-white dark:bg-card-secondary dark:text-accent-saffron"}`}>
                  {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1">
                  <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    isUser 
                      ? "bg-accent-saffron text-primary-navy font-bold rounded-tr-none" 
                      : "bg-card-secondary border border-border text-foreground rounded-tl-none"
                  }`}>
                    {msg.content}
                  </div>
                  {!isUser && msg.source && (
                    <span className="text-[9px] text-text-muted block pl-1">
                      Source: {msg.source}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-start gap-3 max-w-[80%] mr-auto">
              <div className="p-2 rounded-full bg-primary-navy text-white dark:bg-card-secondary dark:text-accent-saffron">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-card-secondary border border-border p-4 rounded-2xl rounded-tl-none flex items-center space-x-2 text-xs text-text-muted">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>AI is searching files...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Shortcuts (visible when only 1 message exists) */}
        {messages.length === 1 && (
          <div className="px-6 py-4 border-t border-border bg-card-secondary/30">
            <span className="text-xs font-extrabold text-text-muted block mb-2 uppercase tracking-wider">Suggested Questions:</span>
            <div className="flex flex-wrap gap-2">
              {[
                "How do I apply for PM Kisan?",
                "Ayushman Bharat cash limits?",
                "DigiLocker account setup steps?",
                "Ladki Bahin Maharashtra benefits?"
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleShortcutClick(q)}
                  className="text-xs border border-border hover:bg-card bg-card-secondary px-3 py-1.5 rounded-full text-foreground transition font-semibold"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Input Area */}
        <form onSubmit={handleSubmit} className="border-t border-border p-4 bg-card-secondary/20 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask how to apply, eligibility, or required files..."
            className="flex-grow bg-background border border-border text-foreground px-4 py-3 rounded-xl text-sm outline-none placeholder:text-gray-400 font-medium"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-accent-saffron hover:bg-accent-saffron/90 text-primary-navy disabled:opacity-50 font-black p-3.5 rounded-xl transition duration-150 flex items-center justify-center"
            aria-label="Send Message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Safety Notice Panel */}
      <div className="bg-card border border-border p-4 rounded-xl flex items-start space-x-3">
        <ShieldAlert className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div className="text-[11px] text-text-muted space-y-1">
          <span className="font-extrabold text-red-500 block">AI Security & Safety Warnings</span>
          <p>
            JanSeva AI is an informational engine. **We will never ask you for Aadhaar, PAN, OTP, passwords or credit cards.** For your safety, do not type or upload personal files. Always verify rules and submit applications only on official government portals.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AIAssistantPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <RefreshCw className="h-8 w-8 animate-spin mx-auto text-accent-saffron" />
        <p className="text-sm mt-2 text-text-muted">Loading AI Engine...</p>
      </div>
    }>
      <AIContent />
    </Suspense>
  );
}
