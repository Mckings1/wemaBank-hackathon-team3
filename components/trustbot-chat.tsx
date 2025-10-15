"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Send, Bot, User, TrendingUp, Sparkles } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  chartData?: any
  recommendations?: string[]
  timestamp: Date
}

function generateMockResponse(message: string, userData: any) {
  const lowerMessage = message.toLowerCase()
  const totalBalance = userData.totalBalance || 0
  const connectedBanks = userData.connectedBanks || 0

  // Spending analysis
  if (lowerMessage.includes("spending") || lowerMessage.includes("spend")) {
    return {
      message: `Based on your transaction history, you've spent ₦89,000 this month. Your top spending categories are Food & Dining (₦35,000), Transportation (₦22,000), and Shopping (₦18,000). You're on track with your budget!`,
      chartData: [
        { name: "Week 1", value: 18000 },
        { name: "Week 2", value: 25000 },
        { name: "Week 3", value: 21000 },
        { name: "Week 4", value: 25000 },
      ],
      recommendations: [
        "Consider reducing dining out expenses by 15% to save ₦5,250/month",
        "Your transportation costs are higher than average - explore carpooling options",
      ],
    }
  }

  // Savings analysis
  if (lowerMessage.includes("save") || lowerMessage.includes("saving")) {
    return {
      message: `Great question! Based on your income of ₦125,000/month and expenses of ₦89,000, you're saving ₦36,000 monthly (28.8% savings rate). This is excellent! The recommended savings rate is 20-30%.`,
      chartData: [
        { name: "Jan", value: 32000 },
        { name: "Feb", value: 35000 },
        { name: "Mar", value: 36000 },
        { name: "Apr", value: 38000 },
      ],
      recommendations: [
        "Set up automatic transfers of ₦40,000/month to reach your ₦500K goal faster",
        "Consider opening a high-yield savings account for better returns",
      ],
    }
  }

  // Income analysis
  if (lowerMessage.includes("income") || lowerMessage.includes("earn")) {
    return {
      message: `Your total income this month is ₦125,000 across ${connectedBanks} connected accounts. This represents a 12% increase from last month. Your primary income sources are salary (₦100,000) and freelance work (₦25,000).`,
      chartData: [
        { name: "Jan", value: 110000 },
        { name: "Feb", value: 115000 },
        { name: "Mar", value: 120000 },
        { name: "Apr", value: 125000 },
      ],
      recommendations: [
        "Your income is growing steadily - consider increasing your savings rate",
        "Diversify income streams by exploring additional freelance opportunities",
      ],
    }
  }

  // Balance/accounts
  if (lowerMessage.includes("balance") || lowerMessage.includes("account")) {
    return {
      message: `You have ${connectedBanks} connected accounts with a total balance of ₦${totalBalance.toLocaleString()}. Your Wema Bank account holds the largest balance at ₦${(totalBalance * 0.6).toLocaleString()}.`,
      recommendations: [
        "Consider consolidating smaller balances to reduce account maintenance fees",
        "Keep 3-6 months of expenses in easily accessible accounts",
      ],
    }
  }

  // Budget
  if (lowerMessage.includes("budget")) {
    return {
      message: `Your current monthly budget is ₦89,000. You're spending within budget in most categories. Food & Dining is at 95% of budget, Transportation at 88%, and Shopping at 90%.`,
      chartData: [
        { name: "Food", value: 35000 },
        { name: "Transport", value: 22000 },
        { name: "Shopping", value: 18000 },
        { name: "Bills", value: 14000 },
      ],
      recommendations: [
        "Set alerts when you reach 80% of category budgets",
        "Review and adjust budgets quarterly based on spending patterns",
      ],
    }
  }

  // Trust score
  if (lowerMessage.includes("trust") || lowerMessage.includes("score") || lowerMessage.includes("credit")) {
    return {
      message: `Your Trust Score is 87/100 - Excellent! This score is based on your consistent savings habits, on-time payments, and responsible spending. You're in the top 15% of TrustHub users.`,
      chartData: [
        { name: "Jan", value: 82 },
        { name: "Feb", value: 84 },
        { name: "Mar", value: 85 },
        { name: "Apr", value: 87 },
      ],
      recommendations: [
        "Maintain your current financial habits to keep improving your score",
        "Your score qualifies you for premium loan rates - explore financing options",
      ],
    }
  }

  // Summary/overview
  if (
    lowerMessage.includes("summary") ||
    lowerMessage.includes("overview") ||
    lowerMessage.includes("how am i") ||
    lowerMessage.includes("doing")
  ) {
    return {
      message: `Here's your financial snapshot: Total Balance: ₦${totalBalance.toLocaleString()} across ${connectedBanks} accounts. This month you earned ₦125,000 and spent ₦89,000, saving ₦36,000 (28.8% savings rate). Your Trust Score is 87/100. Overall, you're doing great!`,
      chartData: [
        { name: "Income", value: 125000 },
        { name: "Expenses", value: 89000 },
        { name: "Savings", value: 36000 },
      ],
      recommendations: [
        "Continue your excellent savings habits",
        "Consider investing a portion of your savings for long-term growth",
        "Your financial health is strong - explore wealth-building opportunities",
      ],
    }
  }

  // Default response
  return {
    message: `I can help you with insights about your spending, savings, income, budgets, account balances, and Trust Score. What would you like to know more about?`,
    recommendations: [
      "Ask me about your spending patterns",
      "Get personalized savings recommendations",
      "Check your Trust Score and how to improve it",
    ],
  }
}

export function TrustBotChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user, connectedBanks } = useAuth()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        role: "assistant",
        content: `Hi ${user?.name || "there"}! I'm TrustBot, your AI financial assistant. I've analyzed your accounts for this week. Want a quick summary or a deep dive into your finances?`,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, user?.name, messages.length])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const userData = {
      // customerId: user?.customerId,
      connectedBanks: connectedBanks.length,
      totalBalance: connectedBanks.reduce((sum, bank) => sum + bank.balance, 0),
    }

    const response = generateMockResponse(input, userData)

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response.message,
      chartData: response.chartData,
      recommendations: response.recommendations,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50"
      >
        <Bot className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">TrustBot</h3>
            <p className="text-xs text-muted-foreground">AI Financial Assistant</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            {message.role === "assistant" && (
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}
            <div className={`flex flex-col gap-2 max-w-[80%]`}>
              <div
                className={`rounded-2xl px-4 py-2 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-card-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>

              {/* Chart Data */}
              {message.chartData && (
                <Card className="p-4">
                  <ResponsiveContainer width="100%" height={150}>
                    <LineChart data={message.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" fontSize={10} />
                      <YAxis fontSize={10} />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              )}

              {/* Recommendations */}
              {message.recommendations && message.recommendations.length > 0 && (
                <Card className="p-3 space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Recommendations
                  </p>
                  {message.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <TrendingUp className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-card-foreground">{rec}</p>
                    </div>
                  ))}
                </Card>
              )}
            </div>
            {message.role === "user" && (
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-accent" />
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-muted rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your finances..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSend} size="icon" disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
