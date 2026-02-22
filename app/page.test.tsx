/// <reference types="@testing-library/jest-dom" />
import Home from "@/app/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockAssistantContent =
  "I understand your question. Let me help you with that.";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          id: "msg_123",
          role: "assistant",
          content: mockAssistantContent,
          conversationId: "conv_abc",
          timestamp: new Date().toISOString(),
        }),
    }),
  ) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
});

it("when user sends a message, assistant response appears", async () => {
  render(<Home />);

  const input = screen.getByRole("textbox", { name: /message input/i });
  fireEvent.change(input, { target: { value: "Hello" } });
  fireEvent.click(screen.getByRole("button", { name: /send message/i }));

  await waitFor(() => {
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText(mockAssistantContent)).toBeInTheDocument();
  });

  // ConversationId is undefined until the chat is established with the backend
  expect(global.fetch).toHaveBeenCalledWith(
    "/api/chat",
    expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Hello", conversationId: undefined }),
    }),
  );
});
