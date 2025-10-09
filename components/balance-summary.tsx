import { Card } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export function BalanceSummary() {
  const accounts = [
    { name: "Wema Bank", balance: 450000, logo: "🏦" },
    { name: "Kuda Bank", balance: 125000, logo: "💜" },
    { name: "Piggyvest", balance: 280000, logo: "🐷" },
  ]

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)
  const monthlyChange = 12000
  const changePercent = 4.2

  return (
    <div className="grid md:grid-cols-4 gap-4">
      <Card className="md:col-span-2 p-6 bg-primary text-primary-foreground">
        <p className="text-sm opacity-90 mb-2">Total Balance</p>
        <h2 className="text-4xl font-bold mb-4">₦{totalBalance.toLocaleString()}</h2>
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>
            +₦{monthlyChange.toLocaleString()} ({changePercent}%) this month
          </span>
        </div>
      </Card>

      {accounts.slice(0, 2).map((account) => (
        <Card key={account.name} className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{account.logo}</span>
            <p className="text-sm text-muted-foreground">{account.name}</p>
          </div>
          <p className="text-2xl font-bold text-card-foreground">₦{account.balance.toLocaleString()}</p>
        </Card>
      ))}
    </div>
  )
}
