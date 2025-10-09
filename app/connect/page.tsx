"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Shield, Check, ArrowLeft, Plus, Search } from "lucide-react"
import { ConnectAccountDialog } from "@/components/connect-account-dialog"
import { useAuth } from "@/lib/auth-context"

//
const availableBanks = [
  { id: "wema", name: "Wema Bank", logo: "/logos/wema.png", balance: 1250000 },
  { id: "kuda", name: "Kuda Bank", logo: "/logos/kuda.png", balance: 850000 },
  { id: "opay", name: "OPay", logo: "/logos/opay.png", balance: 450000 },
  { id: "piggyvest", name: "Piggyvest", logo: "/logos/piggy.png", balance: 297500 },
  { id: "alat", name: "ALAT by Wema", logo: "/logos/alat.png", balance: 0 },
  { id: "gtbank", name: "GTBank", logo: "/logos/gtbank.png", balance: 0 },
  { id: "access", name: "Access Bank", logo: "🔶", balance: 0 },
  { id: "zenith", name: "Zenith Bank", logo: "🔴", balance: 0 },
  { id: "uba", name: "UBA", logo: "🔵", balance: 0 },
  { id: "firstbank", name: "First Bank", logo: "🟦", balance: 0 },
  { id: "fidelity", name: "Fidelity Bank", logo: "🟢", balance: 0 },
  { id: "stanbic", name: "Stanbic IBTC", logo: "⚪", balance: 0 },
  { id: "sterling", name: "Sterling Bank", logo: "🔷", balance: 0 },
  { id: "union", name: "Union Bank", logo: "🟡", balance: 0 },
  { id: "fcmb", name: "FCMB", logo: "🟣", balance: 0 },
  { id: "ecobank", name: "Ecobank", logo: "🔴", balance: 0 },
  { id: "polaris", name: "Polaris Bank", logo: "🟠", balance: 0 },
  { id: "providus", name: "Providus Bank", logo: "🟢", balance: 0 },
  { id: "carbon", name: "Carbon", logo: "⚫", balance: 0 },
  { id: "vfd", name: "VFD Microfinance Bank", logo: "🔵", balance: 0 },
]

export default function ConnectPage() {
  const { connectedBanks, connectBank, disconnectBank } = useAuth()
  const [selectedBank, setSelectedBank] = useState<(typeof availableBanks)[number] | null>(null)
  const [showAllBanks, setShowAllBanks] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleConnect = (bankId: string) => {
    const bank = availableBanks.find((b) => b.id === bankId)
    if (bank) setSelectedBank(bank)
  }

  const handleConnectionComplete = (bankId: string) => {
    const bank = availableBanks.find((b) => b.id === bankId)
    if (bank) {
      connectBank({
        id: bank.id,
        name: bank.name,
        logo: bank.logo,
        balance: bank.balance,
        lastTransaction: "Today",
      })
    }
    setSelectedBank(null)
  }

  const handleRevoke = (bankId: string) => {
    disconnectBank(bankId)
  }

  const isConnected = (bankId: string) =>
    connectedBanks?.some((b) => b.id === bankId)

  const filteredBanks = availableBanks.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // ✅ Correctly use filtered list in all-banks dialog
  const displayedBanks = availableBanks.slice(0, 6)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TrustHub</span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Section */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Connect Your Accounts
          </h1>
          <p className="text-lg text-muted-foreground">
            Securely link your banks and financial apps to get started
          </p>

          {connectedBanks?.length > 0 && (
            <p className="text-sm text-success mt-2 flex items-center justify-center">
              <Check className="w-4 h-4 inline mr-1" />
              {connectedBanks.length} account
              {connectedBanks.length > 1 ? "s" : ""} connected
            </p>
          )}
        </div>

        {/* Security Notice */}
        <Card className="p-4 mb-8 bg-success/5 border-success/20">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-success mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Bank-grade encryption
              </p>
              <p className="text-sm text-muted-foreground">
                Your credentials are never stored. You stay in control and can revoke access anytime.
              </p>
            </div>
          </div>
        </Card>

        {/* Banks Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {displayedBanks.map((bank) => {
            const connected = isConnected(bank.id)
            return (
              <Card key={bank.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* ✅ Show image if path, emoji otherwise */}
                    {bank.logo.startsWith("/") ? (
                      <Image
                        src={bank.logo}
                        alt={bank.name}
                        width={40}
                        height={40}
                        className="rounded"
                      />
                    ) : (
                      <div className="text-4xl">{bank.logo}</div>
                    )}
                    <div>
                      <h3 className="font-semibold text-card-foreground">{bank.name}</h3>
                      {connected && (
                        <div className="flex items-center gap-1 text-success text-sm mt-1">
                          <Check className="w-4 h-4" />
                          <span>Connected</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {connected ? (
                    <Button
                      onClick={() => handleRevoke(bank.id)}
                      variant="outline"
                      size="sm"
                      className="text-destructive"
                    >
                      Revoke
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleConnect(bank.id)}
                      variant="default"
                      size="sm"
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}

          {/* Add Another Bank */}
          <Card
            className="p-6 border-dashed cursor-pointer hover:border-primary transition-colors"
            onClick={() => setShowAllBanks(true)}
          >
            <div className="flex flex-col items-center justify-center gap-3 py-4">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">Add Another Bank</p>
              <p className="text-xs text-muted-foreground text-center">50+ more banks available</p>
            </div>
          </Card>
        </div>

        {/* Continue Button */}
        {connectedBanks?.length > 0 && (
          <div className="flex justify-center">
            <Button asChild size="lg">
              <Link href="/dashboard">Continue to Dashboard</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Connection Dialog */}
      {selectedBank && (
        <ConnectAccountDialog
          bank={selectedBank}
          onClose={() => setSelectedBank(null)}
          onConnect={handleConnectionComplete}
        />
      )}

      {/* All Banks Dialog */}
      <Dialog open={showAllBanks} onOpenChange={setShowAllBanks}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>All Available Banks</DialogTitle>
            <DialogDescription>
              Connect to any of the {availableBanks.length} supported Nigerian financial institutions
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search banks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              <div className="grid gap-3">
                {filteredBanks.map((bank) => {
                  const connected = isConnected(bank.id)
                  return (
                    <Card key={bank.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {bank.logo.startsWith("/") ? (
                            <Image
                              src={bank.logo}
                              alt={bank.name}
                              width={32}
                              height={32}
                              className="rounded"
                            />
                          ) : (
                            <div className="text-2xl">{bank.logo}</div>
                          )}
                          <div>
                            <h3 className="font-medium text-sm text-card-foreground">{bank.name}</h3>
                            {connected && (
                              <div className="flex items-center gap-1 text-success text-xs mt-0.5">
                                <Check className="w-3 h-3" />
                                <span>Connected</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {connected ? (
                          <Button
                            onClick={() => handleRevoke(bank.id)}
                            variant="outline"
                            size="sm"
                            className="text-destructive"
                          >
                            Revoke
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleConnect(bank.id)}
                            variant="default"
                            size="sm"
                          >
                            Connect
                          </Button>
                        )}
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
