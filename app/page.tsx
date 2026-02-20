"use client";
import { ChatInput, MessageList } from "@/features/chat";
import type { Message } from "@/types/chat";
import { useState } from "react";

const DEMO_MESSAGE_COUNT = 50;

const loremSnippets = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
];

const demoMessages: Message[] = Array.from(
  { length: DEMO_MESSAGE_COUNT },
  (_, index) => {
    const messageNumber = index + 1;
    const role = index % 2 === 0 ? "assistant" : "user";
    const content = loremSnippets[index % loremSnippets.length];

    return {
      id: `msg_${messageNumber}`,
      role,
      content,
      timestamp: new Date().toISOString(),
    };
  },
);

export default function Home() {
  const [draftMessage, setDraftMessage] = useState("");

  const handleSend = () => {
    setDraftMessage("");
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">
        AI Chat Interface
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        This is the initial chat message list rendered from the features folder.
      </p>

      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <MessageList messages={demoMessages} />
        <ChatInput
          value={draftMessage}
          onChange={setDraftMessage}
          onSend={handleSend}
        />
      </section>
    </main>
  );
}
