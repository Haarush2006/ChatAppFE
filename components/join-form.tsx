

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface JoinFormProps {
  onJoin: (username: string, roomId: string) => void
  isConnecting: boolean
  connectionError?: string
}

export default function JoinForm({ onJoin, isConnecting, connectionError }: JoinFormProps) {
  const [username, setUsername] = useState("")
  const [roomId, setRoomId] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim() && roomId.trim()) {
      onJoin(username, roomId)
    }
  }

  return (
    <Card className="w-full max-w-md border-border bg-card">
      <CardHeader>
        <CardTitle className="text-xl tracking-tight">Join Chat Room</CardTitle>
        <CardDescription>Enter your username and room ID to connect</CardDescription>
      </CardHeader>
      <CardContent>
        {connectionError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">
            {connectionError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="dev_user_123"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isConnecting}
              className="font-mono text-sm bg-input border-border"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="roomId" className="text-sm font-medium">
              Room ID
            </label>
            <Input
              id="roomId"
              type="text"
              placeholder="1001"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              disabled={isConnecting}
              className="font-mono text-sm bg-input border-border"
            />
          </div>
          <Button type="submit" disabled={!username.trim() || !roomId.trim() || isConnecting} className="w-full mt-6">
            {isConnecting ? "Connecting..." : "Join Room"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
