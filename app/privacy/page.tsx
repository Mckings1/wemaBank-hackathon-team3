"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Shield, Lock, Eye, Activity, AlertTriangle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { AppHeader } from "@/components/app-header"

interface DataPermission {
  id: string
  name: string
  description: string
  enabled: boolean
  icon: React.ReactNode
}

export default function PrivacyPage() {
  const { connectedBanks, disconnectBank } = useAuth()
  const [permissions, setPermissions] = useState<DataPermission[]>([
    {
      id: "investment",
      name: "Investment Partners",
      description: "Share anonymized data with investment platforms for personalized recommendations",
      enabled: true,
      icon: <Activity className="w-5 h-5" />,
    },
    {
      id: "budgeting",
      name: "Budgeting Apps",
      description: "Allow third-party budgeting tools to access your transaction history",
      enabled: false,
      icon: <Eye className="w-5 h-5" />,
    },
    {
      id: "credit",
      name: "Credit Bureaus",
      description: "Share your Trust Score with credit bureaus for loan applications",
      enabled: true,
      icon: <Shield className="w-5 h-5" />,
    },
  ])

  const togglePermission = (id: string) => {
    setPermissions((prev) => prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)))
  }

  const revokeAll = () => {
    setPermissions((prev) => prev.map((p) => ({ ...p, enabled: false })))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AppHeader />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Privacy Vault</h1>
              <p className="text-muted-foreground">Control who sees your financial data</p>
            </div>
          </div>
        </div>

        {/* Security Banner */}
        <Card className="p-6 mb-8 bg-success/5 border-success/20">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-success mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">You're in control</h3>
              <p className="text-sm text-muted-foreground">
                All data sharing requires your explicit consent. You can revoke access at any time, and we'll
                immediately stop sharing your information. Your data is encrypted end-to-end.
              </p>
            </div>
          </div>
        </Card>

        {/* Data Sharing Permissions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">Data Sharing Permissions</h2>
            <Button onClick={revokeAll} variant="outline" size="sm" className="text-destructive bg-transparent">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Revoke All Access
            </Button>
          </div>
          <div className="space-y-4">
            {permissions.map((permission) => (
              <Card key={permission.id} className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        permission.enabled ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {permission.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-card-foreground mb-1">{permission.name}</h3>
                      <p className="text-sm text-muted-foreground">{permission.description}</p>
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        {permission.enabled ? "✓ Currently has access to transaction history" : "✗ No access granted"}
                      </p>
                    </div>
                  </div>
                  <Switch checked={permission.enabled} onCheckedChange={() => togglePermission(permission.id)} />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Connected Accounts */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Connected Accounts</h2>
          {connectedBanks.length > 0 ? (
            <div className="space-y-4">
              {connectedBanks.map((bank) => (
                <Card key={bank.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
  src={bank.logo}
  alt={`${bank.name} logo`}
  className="w-8 h-8 rounded-md object-contain"
/>

                      <div>
                        <h3 className="font-semibold text-card-foreground">{bank.name}</h3>
                        <p className="text-sm text-muted-foreground">Connected • Last sync: {bank.lastTransaction}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => disconnectBank(bank.id)}
                      variant="outline"
                      size="sm"
                      className="text-destructive"
                    >
                      Revoke Access
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No accounts connected yet</p>
              <Button asChild size="lg" className="gap-2 w-full sm:w-auto">
                <Link href="/connect">
                  <Shield className="w-4 h-4" />
                  Connect Your Accounts
                </Link>
              </Button>
            </Card>
          )}
        </div>

        {/* Activity Log */}
        <Card className="p-6 mt-8">
          <h3 className="font-semibold text-card-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Investment Partners access granted</span>
              <span className="text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Kuda Bank connected</span>
              <span className="text-muted-foreground">1 day ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">Privacy settings updated</span>
              <span className="text-muted-foreground">3 days ago</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
