import { NextResponse } from 'next/server';
import type { ChatRequest, ChatResponse } from '@/types/chat';

// Mock AI responses for realistic interaction
const mockResponses = [
  "I understand your question. Let me help you with that.",
  "That's an interesting point. Based on what you've shared, here's what I think...",
  "I can assist you with that. Here's some information that might help.",
  "Thank you for asking. Let me provide you with a detailed response.",
  "Great question! I'd be happy to help you understand this better.",
];

// Simulate occasional typing delay
const getRandomDelay = () => Math.floor(Math.random() * 1000) + 500;

export async function POST(request: Request): Promise<Response> {
  try {
    const body: ChatRequest = await request.json();
    
    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, getRandomDelay()));

    // Simulate occasional server errors (10% chance)
    if (Math.random() > 0.9) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again.' },
        { status: 503 }
      );
    }

    // Generate mock response
    const response: ChatResponse = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      role: 'assistant',
      content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
      conversationId: body.conversationId || `conv_${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
