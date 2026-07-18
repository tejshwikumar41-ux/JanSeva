import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Helper to call local Ollama API
async function callOllama(messages: any[], system: string, model: string) {
  const ollamaUrl = process.env.OLLAMA_URL || "http://localhost:11434";
  const res = await fetch(`${ollamaUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: model,
      stream: false,
      messages: [{ role: "system", content: system }, ...messages],
    }),
    signal: AbortSignal.timeout(6000)
  });
  
  if (!res.ok) throw new Error("Ollama request failed");
  const data = await res.json();
  return data.message?.content;
}

// Helper to call Groq Cloud API
async function callGroq(messages: any[], system: string) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "system", content: system }, ...messages],
    }),
    signal: AbortSignal.timeout(6000)
  });

  if (!res.ok) throw new Error("Groq API request failed");
  const data = await res.json();
  return data.choices?.[0]?.message?.content;
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const lowerUserMessage = lastUserMessage.toLowerCase();

    // 1. Fetch all schemes from database
    const allSchemes = await prisma.scheme.findMany({
      include: {
        state: true,
        category: true,
        department: true
      }
    });

    // 2. Lightweight RAG: Score and retrieve top 8 most relevant schemes matching the query
    const scoredSchemes = allSchemes.map(s => {
      let score = 0;
      const nameLower = s.name.toLowerCase();
      const descLower = s.shortDescription.toLowerCase();

      // Check for exact word matches of scheme name tokens (words > 3 chars)
      const nameTokens = nameLower.split(/[\s\-\(\),]+/).filter(w => w.length > 3);
      for (const token of nameTokens) {
        if (lowerUserMessage.includes(token)) score += 2;
      }

      // Check description matches
      const descTokens = ["pension", "scholarship", "farmer", "women", "disabled", "student", "bpl", "housing"];
      for (const token of descTokens) {
        if (descLower.includes(token) && lowerUserMessage.includes(token)) {
          score += 1;
        }
      }

      // Predefined Trigger Keywords
      if (nameLower.includes("aadhaar") && (lowerUserMessage.includes("aadhaar") || lowerUserMessage.includes("adhar"))) score += 10;
      if (nameLower.includes("pan") && lowerUserMessage.includes("pan")) score += 10;
      if (nameLower.includes("digilocker") && (lowerUserMessage.includes("digilocker") || lowerUserMessage.includes("locker"))) score += 10;
      if (nameLower.includes("kisan") && (lowerUserMessage.includes("kisan") || lowerUserMessage.includes("farmer") || lowerUserMessage.includes("crop"))) score += 10;
      if (nameLower.includes("ayushman") && (lowerUserMessage.includes("ayushman") || lowerUserMessage.includes("health") || lowerUserMessage.includes("pmjay"))) score += 10;
      if (nameLower.includes("awas") && (lowerUserMessage.includes("awas") || lowerUserMessage.includes("housing") || lowerUserMessage.includes("home") || lowerUserMessage.includes("pmay"))) score += 10;
      if (nameLower.includes("pension") && (lowerUserMessage.includes("pension") || lowerUserMessage.includes("atal") || lowerUserMessage.includes("apy") || lowerUserMessage.includes("old age"))) score += 10;
      if (nameLower.includes("scholarship") && (lowerUserMessage.includes("scholarship") || lowerUserMessage.includes("student") || lowerUserMessage.includes("nsp"))) score += 10;
      if (nameLower.includes("passport") && lowerUserMessage.includes("passport")) score += 10;
      if (nameLower.includes("driving") && (lowerUserMessage.includes("driving") || lowerUserMessage.includes("license") || lowerUserMessage.includes("parivahan"))) score += 10;
      if (nameLower.includes("ladki bahin") && (lowerUserMessage.includes("ladki") || lowerUserMessage.includes("bahin") || lowerUserMessage.includes("maharashtra"))) score += 10;
      if (nameLower.includes("gruha lakshmi") && (lowerUserMessage.includes("gruha") || lowerUserMessage.includes("lakshmi") || lowerUserMessage.includes("karnataka"))) score += 10;

      return { scheme: s, score };
    });

    const hasMatches = scoredSchemes.some(item => item.score > 0);
    const selectedSchemes = hasMatches
      ? scoredSchemes.filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 8).map(item => item.scheme)
      : allSchemes.slice(0, 8); // Default fallback: top 8 schemes in DB

    // 3. Format RAG context for prompt
    const contextData = selectedSchemes.map(s => {
      const stateName = s.state ? s.state.name : "Central Government";
      const catName = s.category ? s.category.name : "General";
      const deptName = s.department ? s.department.name : "General";
      return `
Name: ${s.name}
Slug: ${s.slug}
Type: ${s.type}
Level: ${s.governmentLevel} (State: ${stateName})
Category: ${catName} | Department: ${deptName}
Short Description: ${s.shortDescription}
Benefits: ${s.benefits}
Eligibility: ${s.eligibilitySummary}
Required Documents: ${s.requiredDocuments}
Apply Online: ${s.onlineApplicationSteps}
Apply Offline: ${s.offlineApplicationSteps}
Official Website: ${s.officialWebsiteUrl || "None"}
Official Apply URL: ${s.officialApplyUrl || "None"}
Helpline: ${s.helplineNumber || "None"}
Fees: ${s.fees}
`;
    }).join("\n---\n");

    const systemPrompt = `You are JanSeva AI, a helpful, intelligent, and trustworthy general-purpose AI assistant for Indian citizens. 

Core Duties:
1. Answer ANY query from the user. You can answer general knowledge questions, converse, solve simple math, or help with greetings.
2. If the user asks about Indian government schemes, services, pensions, or documentation, ground your answer in the verified database context provided below.
3. Keep your tone polite, citizen-friendly, accessible, and structured.

Safety Rules (CRITICAL):
1. You are NOT an official government representative. Always include a brief disclaimer at the end of scheme-related replies.
2. NEVER ask for, collect, or store sensitive personal information such as Aadhaar number, PAN number, passport number, bank account details, OTP, passwords, or documents.
3. Always tell users to apply ONLY through official government portals.
4. If a scheme is not in the database below and you are unsure about it, say: "I could not verify this information in our database. Please check the official government website."

Context of relevant schemes and services in our database (RAG retrieved):
${contextData}`;

    // 4. ROUTING LOGIC: Determine which service to call
    let reply = "";
    let source = "";

    // A. Check for Groq API
    if (process.env.GROQ_API_KEY) {
      try {
        const groqReply = await callGroq(messages, systemPrompt);
        if (groqReply) {
          reply = groqReply;
          source = "Groq Cloud AI (Llama 3.1)";
        }
      } catch (err) {
        console.warn("Groq API call failed, attempting local Ollama...", err);
      }
    }

    // B. Check for local Ollama
    if (!reply) {
      let modelName = process.env.OLLAMA_MODEL || "llama3.1";
      let ollamaOnline = false;

      try {
        const tagsResponse = await fetch("http://localhost:11434/api/tags", {
          signal: AbortSignal.timeout(1000)
        });
        if (tagsResponse.ok) {
          const tagsData = await tagsResponse.json();
          if (tagsData.models && tagsData.models.length > 0) {
            modelName = tagsData.models[0].name;
            ollamaOnline = true;
          }
        }
      } catch (e) {
        console.warn("Could not query local Ollama tags. Defaulting to llama3.1");
      }

      if (ollamaOnline || process.env.OLLAMA_URL) {
        try {
          const ollamaReply = await callOllama(messages, systemPrompt, modelName);
          if (ollamaReply) {
            reply = ollamaReply;
            source = `Ollama Local AI (${modelName})`;
          }
        } catch (err) {
          console.warn("Local Ollama chat request failed. Falling back to local search database...", err);
        }
      }
    }

    // C. Fallback: Search Database and generate structured response directly
    if (!reply) {
      const greetings = ["hello", "hi", "hey", "namaste", "good morning", "good afternoon", "who are you", "what can you do"];
      const isGreeting = greetings.some(g => lowerUserMessage.startsWith(g) || lowerUserMessage === g);

      if (isGreeting) {
        reply = `**Namaste! I am JanSeva AI.** 

I am your informational assistant for Indian government schemes, services, and benefits.

**How can I help you today?**
- Ask about schemes: *"How do I apply for PM Kisan?"* or *"documents for passport"*
- Check qualification guidelines: *"pension for seniors"*
- Search by location: *"Maharashtra ladki bahin scheme"*

*Disclaimer: I am an independent informational assistant and not affiliated with the government.*`;
        source = "Database Conversational Fallback";
      } else {
        // Find best match in database
        const sortedScored = scoredSchemes.sort((a, b) => b.score - a.score);
        const bestMatchItem = sortedScored[0];
        
        if (bestMatchItem && bestMatchItem.score >= 2) {
          const scheme = bestMatchItem.scheme;
          const stateName = scheme.state ? scheme.state.name : "Central Government";
          const benefitsList = JSON.parse(scheme.benefits || "[]");
          const docsList = JSON.parse(scheme.requiredDocuments || "[]");
          const stepsList = JSON.parse(scheme.onlineApplicationSteps || "[]");

          reply = `**Namaste! I am JanSeva AI (Database Engine Fallback).**

I found matching information regarding **${scheme.name}** (${stateName}):

### 🌟 Main Utility / Benefits
${benefitsList.map((b: string) => `- ${b}`).join("\n")}

### 📋 Who can Apply?
${scheme.eligibilitySummary}

### 📂 Required Documents
${docsList.map((d: string) => `- [ ] ${d}`).join("\n")}

### 💻 Application Guidelines
${stepsList.map((s: string, idx: number) => `${idx + 1}. ${s}`).join("\n")}

${scheme.officialApplyUrl ? `**Apply Link:** [Apply here on Official Portal](${scheme.officialApplyUrl})` : ""}
${scheme.helplineNumber ? `**Helpline Contact:** ${scheme.helplineNumber}` : ""}

---
*Disclaimer: JanSeva Bharat is an independent informational platform and not an official government website. Users must apply only through official government portals.*`;
          source = "Database Semantic Fallback";
        } else {
          reply = `**Namaste! I am JanSeva AI (Database Engine Fallback).**

I am currently running in **Database Fallback Mode** (Ollama & Groq AI models are offline). In this mode, I can only answer queries about registered schemes and services in our database.

For general questions or conversational chat, please make sure your local Ollama server is running (with e.g., \`ollama run llama3.1\`).

**Here is what you can ask me now:**
- *"How to apply for Aadhaar?"*
- *"Required documents for PAN card?"*
- *"Pensions for senior citizens"*
- *"Scholarships for students"*

---
*Disclaimer: JanSeva Bharat is an independent informational platform and not an official government website.*`;
          source = "Database General Fallback";
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: reply,
      reply: reply, // Dual key compatibility
      source: source
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process chat" },
      { status: 500 }
    );
  }
}
