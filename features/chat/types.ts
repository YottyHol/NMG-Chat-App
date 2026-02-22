import type { Message } from '@/types/chat';

export interface MessageProps {
  message: Message;
  onRetry?: (content: string) => void;
}

export interface MessageListProps {
  messages: Message[];
  onRetry?: (content: string) => void;
}

export interface ChatInputProps {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
}
