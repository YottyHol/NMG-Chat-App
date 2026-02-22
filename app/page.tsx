"use client";

import { ChatInput, MessageList } from "@/features/chat";
import type { Message } from "@/types/chat";
import { useCallback, useState } from "react";

// // Keep for later testing ui
// const DEMO_MESSAGE_COUNT = 50;

// const loremSnippets = [
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//   "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//   "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
//   "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
// ];

// const demoMessages: Message[] = Array.from(
//   { length: DEMO_MESSAGE_COUNT },
//   (_, index) => {
//     const messageNumber = index + 1;
//     const role = index % 2 === 0 ? "assistant" : "user";
//     const content = loremSnippets[index % loremSnippets.length];

//     return {
//       id: `msg_${messageNumber}`,
//       role,
//       content,
//       timestamp: new Date().toISOString(),
//     };
//   },
// );

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draftMessage, setDraftMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: Message = {
        id: `user_${Date.now()}`,
        role: "user",
        content: text.trim(),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text.trim(),
            conversationId: conversationId ?? undefined,
          }),
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error ?? "Request failed");
        }

        if (data.conversationId && !conversationId) {
          setConversationId(data.conversationId);
        }

        const assistantMessage: Message = {
          id: data.id,
          role: "assistant",
          content: data.content,
          timestamp: data.timestamp,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        const errorMessage: Message = {
          id: `err_${Date.now()}`,
          role: "assistant",
          content: err instanceof Error ? err.message : "Something went wrong.",
          timestamp: new Date().toISOString(),
          isError: true,
          retryContent: text.trim(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, conversationId],
  );

  const handleSend = useCallback(() => {
    const text = draftMessage.trim();
    if (!text) return;
    setDraftMessage("");
    sendMessage(text);
  }, [draftMessage, sendMessage]);

  const handleRetry = useCallback(
    (content: string) => {
      sendMessage(content);
    },
    [sendMessage],
  );

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-gray-900">
        AI Chat Interface
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        Send a message to talk to the mock assistant.
      </p>

      <section className="mt-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <MessageList messages={messages} onRetry={handleRetry} />
        <ChatInput
          value={draftMessage}
          disabled={isLoading}
          onChange={setDraftMessage}
          onSend={handleSend}
        />
      </section>
    </main>
  );
}
