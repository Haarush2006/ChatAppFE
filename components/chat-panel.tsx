"use client"
import { Button } from "@/components/ui/button"
import MessageList from "./message-list"
import MessageInput from "./message-input"

interface Message {
  type: "chat" | "system"
  sender: string
  message: string
  timestamp: number
}

interface ChatPanelProps {
  username: string
  roomId: string
  messages: Message[]
  onSendMessage: (message: string) => void
  onDisconnect: () => void
  isConnected: boolean
}

export default function ChatPanel({
  username,
  roomId,
  messages,
  onSendMessage,
  onDisconnect,
  isConnected,
}: ChatPanelProps) {
  return (
    <div className="w-full max-w-2xl h-screen md:h-[90vh] flex flex-col bg-background rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 bg-card/50">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">{roomId}</h1>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              {username} {isConnected ? "• Connected" : "• Disconnected"}
            </p>
          </div>
          <Button onClick={onDisconnect} variant="outline" size="sm" className="text-xs bg-transparent">
            Leave
          </Button>
        </div>
      </div>

      {/* Messages */}
      <MessageList messages={messages} />

      {/* Input */}
      <MessageInput onSendMessage={onSendMessage} isConnected={isConnected} />
    </div>
  )
}
