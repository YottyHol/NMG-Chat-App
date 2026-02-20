import { NextResponse } from 'next/server';
import type { ChatRequest } from '@/types/chat';

const mockStreamResponses = [
  "I understand your question about AI communications. Let me break this down for you in detail. First, consider the architecture patterns we typically use...",
  "That's a great question! Here's what I think: Modern AI systems rely on several key components working together seamlessly. The frontend needs to handle...",
  "Excellent point! Let me explain this step by step. When building chat interfaces, we need to consider user experience, performance, and reliability...",
];

export async function POST(request: Request): Promise<Response> {
  try {
    const body: ChatRequest = await request.json();
    
    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const encoder = new TextEncoder();
    const responseText = mockStreamResponses[Math.floor(Math.random() * mockStreamResponses.length)];

    const stream = new ReadableStream({
      async start(controller) {
        // Send response character by character to simulate streaming
        for (let i = 0; i < responseText.length; i++) {
          const chunk = responseText[i];
          controller.enqueue(encoder.encode(chunk));
          
          // Random delay between characters (20-80ms) for realistic typing effect
          await new Promise(resolve => 
            setTimeout(resolve, Math.random() * 60 + 20)
          );
        }
        
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Stream API error:', error);
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
