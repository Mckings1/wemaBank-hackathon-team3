import { Card } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"

const transactions = [
  { id: 1, name: "Shoprite", amount: -15000, type: "debit", category: "Shopping", date: "2 hours ago" },
  { id: 2, name: "Salary Deposit", amount: 250000, type: "credit", category: "Income", date: "1 day ago" },
  { id: 3, name: "Uber", amount: -3500, type: "debit", category: "Transportation", date: "2 days ago" },
  { id: 4, name: "Netflix", amount: -5000, type: "debit", category: "Entertainment", date: "3 days ago" },
  { id: 5, name: "Transfer from Kuda", amount: 50000, type: "credit", category: "Transfer", date: "4 days ago" },
]

export function TransactionList() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-card-foreground mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between py-3 border-b border-border last:border-0"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === "credit" ? "bg-success/10" : "bg-muted"
                }`}
              >
                {transaction.type === "credit" ? (
                  <ArrowDownLeft className="w-5 h-5 text-success" />
                ) : (
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="font-medium text-card-foreground">{transaction.name}</p>
                <p className="text-sm text-muted-foreground">
                  {transaction.category} • {transaction.date}
                </p>
              </div>
            </div>
            <p className={`font-semibold ${transaction.type === "credit" ? "text-success" : "text-card-foreground"}`}>
              {transaction.type === "credit" ? "+" : ""}₦{Math.abs(transaction.amount).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
