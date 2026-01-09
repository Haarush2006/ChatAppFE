"use client"

import { useEffect, useRef, useState } from "react"
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
  const [connectionError, setConnectionError] = useState("")

  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("chat:user")
    const storedRoom = sessionStorage.getItem("chat:room")

    if (storedUser && storedRoom) {
      setUsername(storedUser)
      setRoomId(storedRoom)
      setJoined(true)
      setIsConnecting(true)
    }
  }, [])

  const handleJoin = (user: string, room: string) => {
    sessionStorage.setItem("chat:user", user)
    sessionStorage.setItem("chat:room", room)

    setUsername(user)
    setRoomId(room)
    setJoined(true)
    setIsConnecting(true)
    setConnectionError("")
  }

  useEffect(() => {
    if (!joined || !username || !roomId) return

    const ws = new WebSocket("ws://localhost:8080")
    wsRef.current = ws

    ws.onopen = () => {
      setIsConnected(true)
      setIsConnecting(false)

      ws.send(
        JSON.stringify({
          type: "join",
          username,
          roomId,
        })
      )
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)

      if (data.type === "history") {
        setMessages(data.messages)
      } else {
        setMessages((prev) => [...prev, data])
      }
    }

    ws.onerror = () => {
      setConnectionError("WebSocket connection failed")
      setIsConnecting(false)
      setIsConnected(false)
    }

    ws.onclose = () => {
      setIsConnected(false)
    }

    return () => {
      ws.close()
    }
  }, [joined, username, roomId])

  const sendMessage = (message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: "chat",
          message,
        })
      )
    }
  }

  const handleDisconnect = () => {
    sessionStorage.removeItem("chat:user")
    sessionStorage.removeItem("chat:room")

    wsRef.current?.close()
    setJoined(false)
    setMessages([])
    setConnectionError("")
  }

  return (
    <main className="h-screen flex items-center justify-center p-4">
      {!joined ? (
        <JoinForm
          onJoin={handleJoin}
          isConnecting={isConnecting}
          connectionError={connectionError}
        />
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
