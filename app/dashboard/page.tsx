"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TrendingUp, Lock, ArrowRight, Eye, X } from "lucide-react"
import { SpendingChart } from "@/components/spending-chart"
import { TransactionList } from "@/components/transaction-list"
import { InsightCards } from "@/components/insight-cards"
import { useAuth } from "@/lib/auth-context"
import { AppHeader } from "@/components/app-header"

export default function DashboardPage() {
  const { user, connectedBanks, disconnectBank } = useAuth()

  const totalBalance = connectedBanks.reduce((sum, bank) => sum + bank.balance, 0)

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user?.name || "User"}</h1>
          <p className="text-muted-foreground">Here's your financial overview</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card className="p-6 md:col-span-2">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Balance</h3>
            <p className="text-4xl font-bold text-foreground mb-4">₦{totalBalance.toLocaleString()}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-xl font-semibold text-success">+₦125,000</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Spent</p>
                <p className="text-xl font-semibold text-destructive">₦89,000</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-warning/10 border-warning/30">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Trust Score</h3>
            <p className="text-4xl font-bold text-foreground mb-2">87/100</p>
            <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
              <Link href="/trust-score">View Details</Link>
            </Button>
          </Card>
        </div>

        {connectedBanks.length > 0 && (
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Connected Accounts</h3>
              <Button asChild variant="ghost" size="sm">
                <Link href="/connect">Manage</Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {connectedBanks.map((bank) => (
                <div key={bank.id} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                  <div className="flex items-center gap-3">
                    <img
  src={bank.logo}
  alt={`${bank.name} logo`}
  className="w-8 h-8 rounded-md object-contain"
/>

                    <div>
                      <p className="font-medium text-sm">{bank.name}</p>
                      <p className="text-xs text-muted-foreground">₦{bank.balance.toLocaleString()}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => disconnectBank(bank.id)}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Charts and Transactions */}
          <div className="lg:col-span-2 space-y-6">
            <SpendingChart />
            <TransactionList />
          </div>

          {/* Right Column - Insights and Actions */}
          <div className="space-y-6">
            <InsightCards />

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-semibold text-card-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-between bg-transparent">
                  <Link href="/privacy">
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Privacy Vault
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-between bg-transparent">
                  <Link href="/trust-score">
                    <span className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      View Trust Score
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-between bg-transparent">
                  <Link href="/insights">
                    <span className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Smart Insights
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
