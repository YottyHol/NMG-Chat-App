"use client";

import { ChatInput, MessageList } from "@/features/chat";
import type { Message } from "@/types/chat";
import { useCallback, useState } from "react";

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
    <main
      className="mx-auto max-w-3xl px-3 py-5 sm:px-6 sm:py-10"
      aria-label="AI Chat Interface"
    >
      <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
        AI Chat Interface
      </h1>
      <p className="mt-1.5 text-xs text-gray-600 sm:mt-2 sm:text-sm">
        Send a message to talk to the mock assistant.
      </p>
      {/* I want history messages to scroll behind the send box so the focus makes more sense */}
      <section
        className="mt-4 rounded-lg border border-gray-200 bg-white p-3 shadow-sm sm:mt-6 sm:rounded-xl sm:p-4"
        aria-label="Chat conversation"
      >
        <MessageList messages={messages} onRetry={handleRetry} />
      </section>
      <section>
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
