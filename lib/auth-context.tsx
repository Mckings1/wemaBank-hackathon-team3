"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  bvn?: string
  nin?: string
}

interface Bank {
  id: string
  name: string
  logo: string
  balance: number
  lastTransaction?: string
}

interface AuthContextType {
  user: User | null
  connectedBanks: Bank[]
  isAuthenticated: boolean
  signIn: (identifier: string) => void
  signOut: () => void
  connectBank: (bank: Bank) => void
  disconnectBank: (bankId: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [connectedBanks, setConnectedBanks] = useState<Bank[]>([])
  const router = useRouter()

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("trusthub_user")
    const savedBanks = localStorage.getItem("trusthub_banks")

    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    if (savedBanks) {
      setConnectedBanks(JSON.parse(savedBanks))
    }
  }, [])

  const signIn = (identifier: string) => {
    // Mock authentication - in real app, this would call an API
    const mockUser: User = {
      id: "user_123",
      name: "Alex Johnson",
      bvn: identifier.length === 11 ? identifier : undefined,
      nin: identifier.length === 11 ? undefined : identifier,
    }

    setUser(mockUser)
    localStorage.setItem("trusthub_user", JSON.stringify(mockUser))
    router.push("/connect")
  }

  const signOut = () => {
    setUser(null)
    setConnectedBanks([])
    localStorage.removeItem("trusthub_user")
    localStorage.removeItem("trusthub_banks")
    router.push("/signin")
  }

  const connectBank = (bank: Bank) => {
    const updatedBanks = [...connectedBanks, bank]
    setConnectedBanks(updatedBanks)
    localStorage.setItem("trusthub_banks", JSON.stringify(updatedBanks))
  }

  const disconnectBank = (bankId: string) => {
    const updatedBanks = connectedBanks.filter((b) => b.id !== bankId)
    setConnectedBanks(updatedBanks)
    localStorage.setItem("trusthub_banks", JSON.stringify(updatedBanks))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        connectedBanks,
        isAuthenticated: !!user,
        signIn,
        signOut,
        connectBank,
        disconnectBank,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
