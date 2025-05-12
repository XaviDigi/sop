"use client"
import React from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

// Dynamically import the ChatBox component to avoid SSR issues
const ChatBox = dynamic(() => import('./ChatBox'), { 
  ssr: false,
  loading: () => null
})

function ChatBoxWrapper() {
  const pathname = usePathname()
  
  // Don't show the chat box on the dedicated chat page
  if (pathname === '/chat') {
    return null
  }
  
  return <ChatBox />
}

export default ChatBoxWrapper
