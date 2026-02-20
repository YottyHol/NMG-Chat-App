import type { MessageListProps } from '@/features/chat/types';
import { Message } from '@/features/chat/components/Message';

export function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">
        No messages yet.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </ul>
  );
}
