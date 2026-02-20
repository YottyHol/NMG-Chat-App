"use client";

import type { ChatInputProps } from "@/features/chat/types";
import type { KeyboardEvent } from "react";

export function ChatInput({
  value,
  disabled = false,
  onChange,
  onSend,
}: ChatInputProps) {
  const isSendDisabled = disabled || value.trim().length === 0;

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!isSendDisabled) {
        onSend();
      }
    }
  };

  return (
    <div className="mt-4 border-t border-gray-200 pt-4">
      <div className="flex items-end gap-2">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={2}
          disabled={disabled}
          className="min-h-[44px] flex-1 resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-100"
        />

        <button
          type="button"
          onClick={onSend}
          disabled={isSendDisabled}
          className="h-11 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          Send
        </button>
      </div>
    </div>
  );
}
