"use client"

import { useState, useRef, useEffect } from "react"
// import ChatPanel from "@/components/chat-panel"
// import JoinForm from "@/components/join-form"

import ChatPanel from "@/components/chat-panel"
import JoinForm from "@/components/join-form"

interface Message {
  type: "chat" | "system"
  sender: string
  message: string
  timestamp: number
}

export default function Home() {
  const [joined, setJoined] = useState(false)
  const [username, setUsername] = useState("")
  const [roomId, setRoomId] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const [connectionError, setConnectionError] = useState("")

  const handleJoin = (user: string, room: string) => {
    setUsername(user)
    setRoomId(room)
    setIsConnecting(true)
    setConnectionError("")
    connectWebSocket(user, room)
  }

  const connectWebSocket = (user: string, room: string) => {
    const wsUrl = `ws://localhost:8080`

    try {
      const ws = new WebSocket(wsUrl)

      ws.onopen = () => {
        console.log("[v0] WebSocket connected")
        setIsConnected(true)
        setIsConnecting(false)
        ws.send(
          JSON.stringify({
            type: "join",
            username: user,
            roomId: room,
          }),
        )
        setJoined(true)
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          console.log("[v0] Message received:", data)
          setMessages((prev) => [...prev, data])
        } catch (error) {
          console.error("Failed to parse message:", error)
        }
      }

      ws.onerror = (error) => {
        console.error("[v0] WebSocket error:", error)
        setIsConnected(false)
        setIsConnecting(false)
        setConnectionError("Failed to connect to chat server")
      }

      ws.onclose = () => {
        console.log("[v0] WebSocket closed")
        setIsConnected(false)
        setIsConnecting(false)
        setJoined(false)
      }

      wsRef.current = ws
    } catch (error) {
      console.error("[v0] Connection error:", error)
      setConnectionError("Failed to establish connection")
      setIsConnecting(false)
    }
  }

  const sendMessage = (message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: "chat",
          message: message,
        }),
      )
    }
  }

  const handleDisconnect = () => {
    if (wsRef.current) {
      wsRef.current.close()
    }
    setJoined(false)
    setMessages([])
    setConnectionError("")
  }

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  return (
    <main className="h-screen bg-background text-foreground flex items-center justify-center p-4">
      {!joined ? (
        <JoinForm onJoin={handleJoin} isConnecting={isConnecting} connectionError={connectionError} />
      ) : (
        <ChatPanel
          username={username}
          roomId={roomId}
          messages={messages}
          onSendMessage={sendMessage}
          onDisconnect={handleDisconnect}
          isConnected={isConnected}
        />
      )}
    </main>
  )
}
