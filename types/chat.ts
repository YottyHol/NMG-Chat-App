export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  /** When true, message is an error and can show retry UI */
  isError?: boolean;
  /** If set, retry button will resend this content */
  retryContent?: string;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
}

export interface ChatResponse {
  id: string;
  role: 'assistant';
  content: string;
  conversationId: string;
  timestamp: string;
}

export interface ErrorResponse {
  error: string;
  code?: string;
}
