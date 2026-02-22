import type { MessageListProps } from '@/features/chat/types';
import { Message } from '@/features/chat/components/Message';

export function MessageList({ messages, onRetry }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <p
        className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500"
        role="status"
        aria-live="polite"
      >
        No messages yet.
      </p>
    );
  }

  return (
    <ul
      className="space-y-4"
      aria-label="Message history"
      role="list"
    >
      {messages.map((message) => (
        <Message key={message.id} message={message} onRetry={onRetry} />
      ))}
    </ul>
  );
}
