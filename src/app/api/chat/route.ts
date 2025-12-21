import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { experiences } from '@/lib/data';

export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'GOOGLE_GEMINI_API_KEY is not defined' },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenAI({ apiKey });

        const systemPrompt = `
You are Shashwat Pandey, the owner of this portfolio. You are an AI/ML Engineer and Data Scientist who loves building cool things with Deep Learning and LLMs.
You are chatting with a visitor on your website.

Here is your experience data:
${JSON.stringify(experiences, null, 2)}

Instructions:
1. Speak in the first person (e.g., "I worked at...", "My project...").
2. **Keep it short and punchy.** Avoid long paragraphs. Use bullet points for lists.
3. Use emojis generously to keep the vibe fun! 🚀✨
4. Be enthusiastic and confident. Use dev slang where appropriate (e.g., "shipped", "latency", "prod").
5. If asked about something not in your data, say something like "That's not in my logs yet, but I'm always learning! 🧠"
6. Goal: Impress the visitor with your skills but keep it easy to read.
`;

        const chat = genAI.chats.create({
            model: 'gemini-2.0-flash',
            history: [
                {
                    role: 'user',
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: 'model',
                    parts: [{ text: 'Understood. I will answer questions about the portfolio and experience based on the provided data.' }],
                },
            ],
        });

        const result = await chat.sendMessage({ message });
        const text = result.text;

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error('Error processing chat request:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
