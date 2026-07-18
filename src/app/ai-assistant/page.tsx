"use client";
import { useState } from "react";
import { Send } from "lucide-react";

export default function AIAssistant() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Namaste! I'm JanSeva AI. Ask me about any government scheme, eligibility, or how to apply." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const next = [...messages, { role: "user", content: input }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Sorry, I couldn't connect. Please check the official government website." }]);
    }
    setLoading(false);
  };

  const chips = ["Schemes for farmers", "How to apply for Aadhaar?", "Old age pension", "Scholarships for students"];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold">JanSeva AI Assistant</h1>
      <p className="text-sm opacity-70 mt-1">
        Never share Aadhaar, PAN, bank details or OTP. Apply only on official portals.
      </p>

      <div className="border rounded-xl p-4 mt-6 h-[420px] overflow-y-auto space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-xl px-4 py-2 text-sm whitespace-pre-wrap ${
              m.role === "user" ? "bg-orange-400 text-black" : "border"}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="opacity-60 text-sm">JanSeva AI is typing…</div>}
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {chips.map((c) => (
          <button key={c} onClick={() => setInput(c)} className="text-xs border rounded-full px-3 py-1">{c}</button>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask about any scheme..."
          className="flex-1 border rounded-lg px-4 py-3 bg-transparent"
        />
        <button onClick={send} className="bg-orange-400 text-black px-5 rounded-lg"><Send /></button>
      </div>
    </div>
  );
}
