import type { Message } from '@/types/chat';

export interface MessageProps {
  message: Message;
}

export interface MessageListProps {
  messages: Message[];
}
