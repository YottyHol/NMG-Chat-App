import { MessageList } from '@/features/chat';
import type { Message } from '@/types/chat';

const demoMessages: Message[] = [
  {
    id: 'msg_1',
    role: 'assistant',
    content: 'Hi! Ask me anything and I can help.',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'msg_2',
    role: 'user',
    content: 'Can you explain how this chat UI is structured?',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'msg_3',
    role: 'assistant',
    content: 'Sure. We are rendering a feature-level MessageList component on the home page.',
    timestamp: new Date().toISOString(),
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">AI Chat Interface</h1>
      <p className="mt-2 text-sm text-gray-600">
        This is the initial chat message list rendered from the features folder.
      </p>

      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <MessageList messages={demoMessages} />
      </section>
    </main>
  );
}
