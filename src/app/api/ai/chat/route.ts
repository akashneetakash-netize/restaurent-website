import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, history = [], context } = body;

    if (!prompt) {
      return NextResponse.json({ reply: 'Please ask me something.' });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        reply: 'AI service is not configured. Please contact the restaurant staff.',
      });
    }

    // Initialize Groq client inside handler (not at module level)
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Strong system prompt using live menu data
    const systemPrompt = `
You are the official AI Sommelier & Operations Assistant of Haven Sanctuary — a luxury Indian fine-dining restaurant in Bandra West, Mumbai.

STRICT RULES:
1. Only recommend dishes that are present in the availableMenu list below.
2. Never invent dishes.
3. Always use Indian Rupees (₹).
4. Be elegant, warm, and concise (like a high-end hotel concierge).
5. If asked about booking, guide the user politely to the Reservations section.
6. Use the live context provided.

LIVE CONTEXT:
${JSON.stringify(context, null, 2)}
`;

    // Convert history to Groq format
    const messages: any[] = [
      { role: 'system', content: systemPrompt },
    ];

    // Add previous conversation
    history.forEach((msg: any) => {
      messages.push({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      });
    });

    // Add current user message
    messages.push({ role: 'user', content: prompt });

    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 800,
    });

    const reply = completion.choices[0]?.message?.content || 'I am here to help you.';

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Groq Error →', error);
    return NextResponse.json({
      reply: 'I apologize. Our systems are momentarily busy. Please try again in a moment.',
    });
  }
}