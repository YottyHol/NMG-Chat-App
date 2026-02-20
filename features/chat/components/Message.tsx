import type { MessageProps } from '@/features/chat/types';

export function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';

  return (
    <li className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] rounded-xl px-4 py-2 text-sm leading-relaxed break-words ${
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
        }`}
      >
        {message.content}
      </div>
    </li>
  );
}
