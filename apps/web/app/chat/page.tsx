"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import {
  Button,
  ScrollArea,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
} from "@repo/ui";
import { Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI asset assistant. I can help you find files using semantic understanding. What are you looking for today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Mock AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `I understand you're looking for "${inputValue}". I'm searching across all assets including video transcripts and document contents...`,
        },
      ]);
    }, 1000);
  };

  return (
    <AppShell>
      <div className="mx-auto flex h-[calc(100vh-theme(spacing.12)-theme(spacing.6))] w-full max-w-4xl flex-col">
        <div className="flex-1 overflow-hidden p-4">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    {message.role === "assistant" ? (
                      <div className="bg-primary/10 flex h-full w-full items-center justify-center">
                        <Sparkles className="text-primary h-4 w-4" />
                      </div>
                    ) : (
                      <AvatarImage src="https://github.com/shadcn.png" />
                    )}
                    <AvatarFallback>
                      {message.role === "assistant" ? "AI" : "ME"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 text-sm ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-t p-4 backdrop-blur">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about your assets..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
