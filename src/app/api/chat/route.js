import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const message = body?.message ?? "";

    if (!message) {
      return NextResponse.json({ error: "Missing 'message' in request body" }, { status: 400 });
    }

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    if (!OPENAI_KEY) {
      return NextResponse.json({ error: "Server: OPENAI_API_KEY not set" }, { status: 500 });
    }

    // Call OpenAI Chat Completions
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // you can change model if needed
        messages: [
          { role: "system", content: "You are Hasnain's AI assistant. Answer helpfully and concisely." },
          { role: "user", content: message },
        ],
        max_tokens: 800,
        temperature: 0.2,
      }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      // bubble up OpenAI error message so frontend can show it
      const errMsg = data?.error?.message || JSON.stringify(data);
      return NextResponse.json({ error: `OpenAI error: ${errMsg}` }, { status: resp.status });
    }

    const reply = data?.choices?.[0]?.message?.content ?? "No response from model";
    return NextResponse.json({ reply });
  } catch (err) {
    // This will appear in terminal where your Next dev server runs
    console.error("API /api/chat error:", err);
    return NextResponse.json({ error: `Server error: ${err.message}` }, { status: 500 });
  }
}
