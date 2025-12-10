"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchConversationStore } from "@/lib/stores/search-conversation-store";
import { Button } from "@repo/ui";
// Badge removed
import { Input } from "@repo/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@repo/ui";
import { cn } from "@repo/ui";
import {
  Sparkles,
  Send,
  Bot,
  User as UserIcon,
  MessageSquarePlus,
  History,
  Paperclip,
  Image as ImageIcon,
  FileText,
  ChevronDown,
  Zap,
  BrainCircuit,
  Library,
  X,
  MessageSquare,
  PanelRight,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { generateAIResponse } from "@/lib/ai-response-generator";

const MODEL_PRESETS = [
  { id: "fast", label: "Fast", icon: Zap, desc: "Quick, concise answers" },
  {
    id: "reasoning",
    label: "Reasoning",
    icon: BrainCircuit,
    desc: "Detailed step-by-step logic",
  },
  {
    id: "research",
    label: "Research",
    icon: Library,
    desc: "Deep dive with sources",
  },
] as const;

interface AISearchAssistantProps {
  isCollapsed?: boolean;
  onExpand?: () => void;
}

export function AISearchAssistant({
  isCollapsed = false,
  onExpand,
}: AISearchAssistantProps) {
  const {
    messages,
    isActive,
    chatMode,
    modelPreset,
    history,
    pendingAttachments,
    addUserMessage,
    addAssistantMessage,
    clearConversation,
    setChatMode,
    setModelPreset,
    addAttachment,
    removeAttachment,
    loadSession,
  } = useSearchConversationStore();

  const [input, setInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pendingAttachments]); // Also scroll when adding attachments

  const handleSend = () => {
    if (!input.trim() && pendingAttachments.length === 0) return;

    const userQuery = input;
    addUserMessage(input);
    setInput("");

    // Generate intelligent AI response based on query content
    setTimeout(() => {
      const aiResponse = generateAIResponse(userQuery);
      addAssistantMessage(aiResponse.content, {
        suggestions: aiResponse.suggestions,
      });
    }, 800);
  };

  const handleSuggestionClick = (suggestion: string) => {
    addUserMessage(suggestion);
    setTimeout(() => {
      const aiResponse = generateAIResponse(suggestion);
      addAssistantMessage(aiResponse.content, {
        suggestions: aiResponse.suggestions,
      });
    }, 600);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      addAttachment({
        id: Math.random().toString(),
        name: file.name,
        type: file.type.startsWith("image/") ? "image" : "document",
        size: file.size,
      });
    }
  };

  const ActivePresetIcon =
    MODEL_PRESETS.find((p) => p.id === modelPreset)?.icon || Zap;

  // COMPACT MODE (Icon Strip)
  if (isCollapsed) {
    return (
      <div className="bg-background flex h-full flex-col items-center gap-4 border-l py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onExpand}
          className="text-muted-foreground hover:text-foreground h-9 w-9"
          title="Expand Assistant"
        >
          <PanelRight className="h-5 w-5" />
        </Button>

        <div className="bg-border h-px w-8" />

        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground h-9 w-9"
          title="New Chat"
          onClick={() => {
            clearConversation();
            onExpand?.();
          }}
        >
          <MessageSquarePlus className="h-5 w-5" />
        </Button>

        {/* Recent History Icons */}
        <div className="mt-2 flex flex-col gap-2">
          {history.slice(0, 3).map((session) => (
            <div
              key={session.id}
              className="bg-muted/50 hover:bg-muted hover:text-primary text-muted-foreground flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[10px] font-bold transition-colors"
              title={session.title}
              onClick={() => {
                loadSession(session.id);
                onExpand?.();
              }}
            >
              {session.title.substring(0, 2).toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render History View
  if (showHistory) {
    return (
      <div className="bg-background flex h-full flex-col border-l">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="flex items-center gap-2 font-semibold">
            <History className="h-4 w-4" />
            History
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowHistory(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {history.map((session) => (
            <div
              key={session.id}
              className="hover:bg-muted/50 group cursor-pointer rounded-lg border p-3 transition-colors"
              onClick={() => {
                loadSession(session.id);
                setShowHistory(false);
              }}
            >
              <div className="mb-1 flex items-start justify-between">
                <h4 className="truncate text-sm font-medium">
                  {session.title}
                </h4>
                <span className="text-muted-foreground whitespace-nowrap text-[10px]">
                  {new Date(session.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-muted-foreground mb-2 line-clamp-2 text-xs">
                {session.preview}
              </p>
              <div className="text-muted-foreground flex items-center gap-2 text-[10px]">
                <MessageSquare className="h-3 w-3" />
                {session.messageCount} messages
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background flex h-full flex-col whitespace-normal border-l">
      {/* Header Controls */}
      <div className="space-y-3 border-b p-3">
        {/* Top Row: Title + Main Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`rounded-md p-1.5 ${chatMode === "assistant" ? "bg-indigo-500/10 text-indigo-500" : "bg-green-500/10 text-green-500"}`}
            >
              {chatMode === "assistant" ? (
                <Bot className="h-4 w-4" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-2 h-8 gap-1 px-2 font-semibold"
                >
                  {chatMode === "chat" ? "Chat" : "Assistant"}
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setChatMode("chat")}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>Chat Mode</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setChatMode("assistant")}>
                  <Bot className="mr-2 h-4 w-4" />
                  <span>Assistant Mode</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground h-8 w-8"
              onClick={() => setShowHistory(true)}
              title="History"
            >
              <History className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground h-8 w-8"
              onClick={onExpand}
              title="Collapse Panel"
            >
              <PanelRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Bottom Row: Model Preset Selector */}
        <div className="flex items-center gap-2 px-1">
          <span className="text-muted-foreground text-[10px] font-medium uppercase tracking-wider">
            Model:
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-6 gap-2 text-xs">
                <ActivePresetIcon className="h-3 w-3" />
                {MODEL_PRESETS.find((p) => p.id === modelPreset)?.label}
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Select Model Behavior</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {MODEL_PRESETS.map((preset) => (
                <DropdownMenuItem
                  key={preset.id}
                  onClick={() =>
                    setModelPreset(
                      preset.id as "fast" | "reasoning" | "research"
                    )
                  }
                  className="flex flex-col items-start gap-1 py-2"
                >
                  <div className="flex items-center gap-2 font-medium">
                    <preset.icon className="h-4 w-4" />
                    {preset.label}
                  </div>
                  <p className="text-muted-foreground text-xs">{preset.desc}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {!isActive ? (
          <div className="flex h-full flex-1 flex-col items-center justify-center space-y-4 text-center opacity-50">
            <div className="bg-muted/50 rounded-full p-4">
              <Sparkles className="text-muted-foreground h-8 w-8" />
            </div>
            <div>
              <h3 className="font-medium">How can I help you?</h3>
              <p className="text-muted-foreground text-sm">
                Select a specific mode or start typing
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.type === "user" ? "flex-row-reverse" : ""
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-sm",
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background"
                  )}
                >
                  {message.type === "user" ? (
                    <UserIcon className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={cn(
                    "flex max-w-[85%] flex-col gap-2",
                    message.type === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm shadow-sm",
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    {message.type === "assistant" ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <p className="mb-2 last:mb-0">{children}</p>
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      message.content
                    )}

                    {/* Attachments Display in Message */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.attachments.map((att) => (
                          <div
                            key={att.id}
                            className="bg-background/20 flex items-center gap-1 rounded border border-white/20 px-2 py-1 text-xs"
                          >
                            {att.type === "image" ? (
                              <ImageIcon className="h-3 w-3" />
                            ) : (
                              <FileText className="h-3 w-3" />
                            )}
                            <span className="max-w-[150px] truncate">
                              {att.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Suggestions */}
                  {message.suggestions && (
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {message.suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors"
                        >
                          <Sparkles className="mr-1 h-3 w-3 text-purple-500" />
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-muted-foreground px-1 text-[10px]">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-background z-10 border-t p-4">
        {pendingAttachments.length > 0 && (
          <div className="mb-2 flex gap-2 overflow-x-auto pb-2">
            {pendingAttachments.map((att) => (
              <div
                key={att.id}
                className="bg-muted group relative inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs"
              >
                {att.type === "image" ? (
                  <ImageIcon className="h-3 w-3" />
                ) : (
                  <FileText className="h-3 w-3" />
                )}
                <span className="max-w-[100px] truncate">{att.name}</span>
                <button
                  onClick={() => removeAttachment(att.id)}
                  className="hover:text-destructive ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={
              chatMode === "assistant"
                ? "Ask me to perform a task..."
                : "Ask me anything..."
            }
            className="resize-none pl-9 pr-20"
          />

          {/* Attachment Button */}
          <div className="absolute left-1 top-1/2 -translate-y-1/2">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileSelect}
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground h-7 w-7 rounded-full"
              onClick={() => fileInputRef.current?.click()}
              title="Attach file"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center gap-1">
            <Button
              size="icon"
              className={cn(
                "h-7 w-7 rounded-full transition-all",
                input.trim() || pendingAttachments.length > 0
                  ? "opacity-100"
                  : "opacity-50"
              )}
              onClick={handleSend}
              disabled={!input.trim() && pendingAttachments.length === 0}
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground mt-2 text-center text-[10px]">
          AI generated responses can be inaccurate.
        </p>
      </div>
    </div>
  );
}
