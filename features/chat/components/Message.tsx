import type { MessageProps } from '@/features/chat/types';

export function Message({ message, onRetry }: MessageProps) {
  const isUser = message.role === 'user';
  const isError = message.isError === true;

  const bubbleClasses = isUser
    ? 'bg-blue-600 text-white'
    : isError
      ? 'bg-red-50 text-red-800 border border-red-200'
      : 'bg-gray-100 text-gray-900';

  const listItemLabel = isError
    ? 'Error message'
    : isUser
      ? 'Your message'
      : 'Assistant message';

  return (
    <li
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      aria-label={listItemLabel}
    >
      <div
        className={`max-w-[75%] rounded-xl px-4 py-2 text-sm leading-relaxed break-words ${bubbleClasses}`}
      >
        {message.content}
        {isError && message.retryContent && onRetry && (
          <div className="mt-2">
            <button
              type="button"
              onClick={() => onRetry(message.retryContent!)}
              aria-label="Retry sending message"
              className="rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-800 hover:bg-red-200"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
