"use client";

import type { ChatInputProps } from "@/features/chat/types";
import { useEffect, useRef, type KeyboardEvent } from "react";

export function ChatInput({
  value,
  disabled = false,
  onChange,
  onSend,
}: ChatInputProps) {
  const isSendDisabled = disabled || value.trim().length === 0;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!disabled) textareaRef.current?.focus();
  }, [disabled]);

  const sendAndKeepFocus = () => {
    if (isSendDisabled) return;
    onSend();
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!isSendDisabled) {
        sendAndKeepFocus();
      }
    }
  };

  return (
    <div
      className="mt-4 border-t border-gray-200 pt-4"
      role="form"
      aria-label="Compose message"
    >
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={2}
          disabled={disabled}
          aria-label="Message input"
          aria-describedby="message-hint"
          className="min-h-[44px] flex-1 resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
        <span id="message-hint" className="sr-only">
          Press Enter to send, Shift+Enter for new line.
        </span>

        <button
          type="button"
          onClick={sendAndKeepFocus}
          disabled={isSendDisabled}
          aria-label="Send message"
          className="h-11 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}
