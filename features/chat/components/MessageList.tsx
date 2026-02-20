import type { MessageListProps } from '@/features/chat/types';

export function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">
        No messages yet.
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {messages.map((message) => {
        const isUser = message.role === 'user';

        return (
          <li
            key={message.id}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-xl px-4 py-2 text-sm leading-relaxed ${
                isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.content}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
