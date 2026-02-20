import type { Message } from '@/types/chat';

export interface MessageProps {
  message: Message;
}

export interface MessageListProps {
  messages: Message[];
}

export interface ChatInputProps {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
}
