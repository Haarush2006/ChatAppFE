"use client"

import { useEffect, useRef } from "react"

interface Message {
  type: "chat" | "system"
  sender: string
  message: string
  timestamp: number
}

interface MessageListProps {
  messages: Message[]
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
}

export default function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto bg-background p-6 space-y-4">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <p className="text-muted-foreground text-sm">No messages yet. Start the conversation.</p>
        </div>
      ) : (
        <>
          {messages.map((msg, index) => (
            <div key={index} className="group">
              {msg.type === "system" ? (
                <div className="py-3 px-4 bg-muted/30 border border-border rounded text-center">
                  <p className="text-xs text-muted-foreground font-mono">➜ {msg.message}</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-mono font-semibold text-primary">{msg.sender}</span>
                    <span className="text-xs text-muted-foreground font-mono">{formatTime(msg.timestamp)}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground pl-0">{msg.message}</p>
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </>
      )}
    </div>
  )
}
