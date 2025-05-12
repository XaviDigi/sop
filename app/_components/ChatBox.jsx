"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { initSOPChat, sendSOPChatMessage, sendSOPChatMessageWithFiles } from '@/configs/AiModel'
import { Bot, Send, User, Loader2, X, MessageSquare, Minimize2, Maximize2, Upload, FileText, Image as ImageIcon, FileArchive, File, Expand, Shrink } from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function ChatBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your SOP Assistant. How can I help you today?"
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chatSession, setChatSession] = useState(null)
  const [files, setFiles] = useState([])
  const fileInputRef = useRef(null)
  const messagesEndRef = useRef(null)
  const expandedMessagesEndRef = useRef(null)

  // Initialize chat session when opened
  useEffect(() => {
    if (isOpen && !chatSession) {
      try {
        const session = initSOPChat()
        setChatSession(session)
      } catch (error) {
        console.error("Error initializing chat:", error)
        toast.error("Failed to initialize chat. Please try again.")
      }
    }
  }, [isOpen, chatSession])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    expandedMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()

    if (!inputMessage.trim() && files.length === 0) return
    if (!chatSession) {
      toast.error("Chat session not initialized. Please try again.")
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

  const toggleChat = () => {
    setIsOpen(prev => !prev)
    setIsMinimized(false)
    setIsExpanded(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(prev => !prev)
  }

  const toggleExpand = () => {
    setIsExpanded(prev => !prev)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="rounded-full h-14 w-14 shadow-lg"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : '500px',
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col"
          >
            <Card className={`w-80 md:w-96 shadow-xl ${isMinimized ? '' : 'h-[500px] flex flex-col'}`}>
              <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <h3 className="font-medium text-sm">SOP Assistant</h3>
                </div>
                <div className="flex items-center gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={toggleExpand}
                        >
                          <Expand className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Expand chat
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={toggleMinimize}
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={toggleChat}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {!isMinimized && (
                <>
                  <CardContent className="flex-1 overflow-y-auto p-3">
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`flex gap-2 max-w-[85%] ${
                              message.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            } p-2 rounded-lg`}
                          >
                            <div className="flex-shrink-0 mt-1">
                              {message.role === 'user' ? (
                                <User className="h-4 w-4" />
                              ) : (
                                <Bot className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
                                        <span className="truncate max-w-[100px]">{file.name}</span>
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

                  <CardFooter className="border-t p-3">
                    <form onSubmit={handleSendMessage} className="w-full flex flex-col gap-2">
                      {/* File upload preview */}
                      {files.length > 0 && (
                        <div className="flex flex-wrap gap-2 p-2 bg-muted rounded-md mb-2">
                          {files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 bg-background rounded px-2 py-1 text-xs"
                            >
                              {file.type.includes('image') ? (
                                <ImageIcon className="h-3 w-3" />
                              ) : file.type.includes('pdf') ? (
                                <FileText className="h-3 w-3" />
                              ) : (
                                <File className="h-3 w-3" />
                              )}
                              <span className="truncate max-w-[100px]">{file.name}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 rounded-full"
                                onClick={() => removeFile(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Input area */}
                      <div className="flex gap-2">
                        <div className="flex-1 flex">
                          <Textarea
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            className="flex-1 min-h-[40px] max-h-[100px] text-sm resize-none"
                            disabled={isLoading}
                          />
                        </div>

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
                                <Upload className="h-4 w-4" />
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
                          size="icon"
                          className="h-10 w-10"
                          disabled={isLoading || (!inputMessage.trim() && files.length === 0)}
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardFooter>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Chat Dialog */}
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="sm:max-w-[800px] h-[80vh] flex flex-col p-0">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">SOP Assistant</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
            >
              <Shrink className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
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
                    } p-4 rounded-lg`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      {message.role === 'user' ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Bot className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="whitespace-pre-wrap text-base">{message.content}</p>
                      {message.files && message.files.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
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
                                className="flex items-center gap-2 text-sm bg-background/20 rounded px-3 py-2"
                              >
                                <FileIcon className="h-4 w-4" />
                                <span className="truncate max-w-[200px]">{file.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={expandedMessagesEndRef} />
            </div>
          </div>

          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex flex-col gap-3">
              {/* File upload preview */}
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-md">
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
                    className="min-h-[80px] resize-none"
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ChatBox
