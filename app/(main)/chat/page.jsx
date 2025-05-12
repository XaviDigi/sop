"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { initSOPChat, sendSOPChatMessage, sendSOPChatMessageWithFiles } from '@/configs/AiModel'
import { Bot, Send, User, Loader2, Upload, FileText, Image as ImageIcon, FileArchive, File, X } from 'lucide-react'
import { useAuthContext } from '@/app/provider'
import { toast } from 'sonner'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function ChatPage() {
  const { user } = useAuthContext()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your SOP Assistant. I can help you with creating, improving, and understanding Standard Operating Procedures. How can I assist you today?"
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatSession, setChatSession] = useState(null)
  const [files, setFiles] = useState([])
  const fileInputRef = useRef(null)
  const messagesEndRef = useRef(null)

  // Initialize chat session
  useEffect(() => {
    try {
      const session = initSOPChat()
      setChatSession(session)
    } catch (error) {
      console.error("Error initializing chat:", error)
      toast.error("Failed to initialize chat. Please refresh the page.")
    }
  }, [])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (!inputMessage.trim() && files.length === 0) return
    if (!chatSession) {
      toast.error("Chat session not initialized. Please refresh the page.")
      return
    }

    // Create user message content
    let userContent = inputMessage
    if (files.length > 0) {
      userContent += files.length === 1
        ? `\n[Uploaded 1 file: ${files[0].name}]`
        : `\n[Uploaded ${files.length} files: ${files.map(f => f.name).join(', ')}]`
    }

    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: userContent,
      files: files.length > 0 ? [...files] : undefined
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      let response

      // Send message with or without files
      if (files.length > 0) {
        response = await sendSOPChatMessageWithFiles(chatSession, inputMessage, files)
        setFiles([]) // Clear files after sending
      } else {
        response = await sendSOPChatMessage(chatSession, inputMessage)
      }

      // Add AI response to chat
      const assistantMessage = {
        role: 'assistant',
        content: response
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("Failed to get response. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files)

    // Check file size (limit to 10MB per file)
    const maxSize = 10 * 1024 * 1024 // 10MB
    const oversizedFiles = selectedFiles.filter(file => file.size > maxSize)

    if (oversizedFiles.length > 0) {
      toast.error(`Some files exceed the 10MB limit: ${oversizedFiles.map(f => f.name).join(', ')}`)
      // Filter out oversized files
      const validFiles = selectedFiles.filter(file => file.size <= maxSize)
      setFiles(prev => [...prev, ...validFiles])
    } else {
      setFiles(prev => [...prev, ...selectedFiles])
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">SOP Assistant</h2>
      </div>

      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>Chat with AI</CardTitle>
          <CardDescription>
            Ask questions about SOPs, get help creating procedures, or learn best practices
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  } p-3 rounded-lg`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {message.role === 'user' ? (
                      <User className="h-5 w-5" />
                    ) : (
                      <Bot className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.files && message.files.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.files.map((file, fileIndex) => {
                          // Determine file icon based on type
                          let FileIcon = File;
                          if (file.type.includes('image')) {
                            FileIcon = ImageIcon;
                          } else if (file.type.includes('pdf')) {
                            FileIcon = FileText;
                          } else if (file.type.includes('word') || file.type.includes('document')) {
                            FileIcon = FileText;
                          } else if (file.type.includes('zip') || file.type.includes('archive')) {
                            FileIcon = FileArchive;
                          }

                          return (
                            <div
                              key={fileIndex}
                              className="flex items-center gap-1 text-xs bg-background/20 rounded px-2 py-1"
                            >
                              <FileIcon className="h-3 w-3" />
                              <span className="truncate max-w-[150px]">{file.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        <CardFooter className="border-t pt-4">
          <form onSubmit={handleSendMessage} className="w-full flex flex-col gap-2">
            {/* File upload preview */}
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-md mb-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-background rounded px-3 py-2 text-sm"
                  >
                    {file.type.includes('image') ? (
                      <ImageIcon className="h-4 w-4" />
                    ) : file.type.includes('pdf') ? (
                      <FileText className="h-4 w-4" />
                    ) : (
                      <File className="h-4 w-4" />
                    )}
                    <span className="truncate max-w-[200px]">{file.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <div className="flex-1">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 min-h-[60px] max-h-[120px]"
                  disabled={isLoading}
                />
              </div>

              <div className="flex flex-col gap-2">
                {/* File upload button */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                      >
                        <Upload className="h-5 w-5" />
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          className="hidden"
                          multiple
                          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.csv,.xls,.xlsx"
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Upload files (PDF, Word, Images, etc.)
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Send button */}
                <Button
                  type="submit"
                  className="h-10"
                  disabled={isLoading || (!inputMessage.trim() && files.length === 0)}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ChatPage
