"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// --- Types ---
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

export interface Transaction {
  id: string
  merchant: string
  category: string
  amount: number
  type: "debit" | "credit"
  date: string // ISO string
  fromBankId?: string
  toBankId?: string
  note?: string
}

interface AuthContextType {
  user: User | null
  connectedBanks: Bank[]
  isAuthenticated: boolean
  transactions: Transaction[]
  signIn: (identifier: string) => void
  signOut: () => void
  connectBank: (bank: Bank) => void
  disconnectBank: (bankId: string) => void
  addTransaction: (tx: Transaction) => void
  updateBankBalance: (bankId: string, newBalance: number) => void
}

// --- Context ---
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// --- Provider ---
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [connectedBanks, setConnectedBanks] = useState<Bank[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const router = useRouter()

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("trusthub_user")
    const savedBanks = localStorage.getItem("trusthub_banks")
    const savedTransactions = localStorage.getItem("trusthub_transactions")

    if (savedUser) setUser(JSON.parse(savedUser))
    if (savedBanks) setConnectedBanks(JSON.parse(savedBanks))
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions))
  }, [])

  // --- Auth Functions ---
  const signIn = (identifier: string) => {
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
    setTransactions([])
    localStorage.removeItem("trusthub_user")
    localStorage.removeItem("trusthub_banks")
    localStorage.removeItem("trusthub_transactions")
    router.push("/signin")
  }

  // --- Bank Functions ---
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

  // --- Transactions / Balance Updates ---
  const updateBankBalance = (bankId: string, newBalance: number) => {
    setConnectedBanks(prev =>
      prev.map(b => (b.id === bankId ? { ...b, balance: newBalance } : b))
    )
    localStorage.setItem(
      "trusthub_banks",
      JSON.stringify(
        connectedBanks.map(b => (b.id === bankId ? { ...b, balance: newBalance } : b))
      )
    )
  }

  const addTransaction = (tx: Transaction) => {
    const updatedTransactions = [tx, ...transactions]
    setTransactions(updatedTransactions)
    localStorage.setItem("trusthub_transactions", JSON.stringify(updatedTransactions))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        connectedBanks,
        transactions,
        isAuthenticated: !!user,
        signIn,
        signOut,
        connectBank,
        disconnectBank,
        updateBankBalance,
        addTransaction,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// --- Hook ---
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
