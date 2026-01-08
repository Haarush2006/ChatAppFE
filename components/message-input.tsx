"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MessageInputProps {
  onSendMessage: (message: string) => void
  isConnected: boolean
}

export default function MessageInput({ onSendMessage, isConnected }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && isConnected) {
      onSendMessage(message)
      setMessage("")
      inputRef.current?.focus()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-border bg-card/50 p-4">
      <div className="flex gap-3">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!isConnected}
          className="flex-1 text-sm bg-input border-border font-mono"
        />
        <Button type="submit" disabled={!message.trim() || !isConnected} size="sm">
          Send
        </Button>
      </div>
    </form>
  )
}
