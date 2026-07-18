import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const SYSTEM = `You are JanSeva AI, an informational assistant for Indian government schemes and services.
You are NOT an official government representative.
NEVER ask for Aadhaar, PAN, passport, bank account, OTP, passwords, or personal documents.
Always tell users to apply only through official government portals like myscheme.gov.in, uidai.gov.in, pmkisan.gov.in, etc.
If you are unsure, say: "I could not verify this. Please check the official government website."
Give simple, step-by-step guidance in easy language.`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "system", content: SYSTEM }, ...messages],
      }),
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content;

    return NextResponse.json({
      reply: reply || "Please check the official government website.",
    });
  } catch (err) {
    return NextResponse.json({
      reply: "I couldn't connect to the AI service. Please check the official government website.",
    });
  }
}
