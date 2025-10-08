import { Card } from "@/components/ui/card"
import { TrendingUp, AlertCircle, Sparkles } from "lucide-react"

export function InsightCards() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-card-foreground mb-4">AI Insights</h3>
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-success/10 border border-success/20">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-success mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Great Progress!</p>
              <p className="text-sm text-muted-foreground">You saved ₦12,000 more this month compared to last month.</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Spending Alert</p>
              <p className="text-sm text-muted-foreground">
                You spent 30% more on food this week. Consider meal planning.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Smart Tip</p>
              <p className="text-sm text-muted-foreground">
                Automate ₦10,000 monthly to reach your savings goal faster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
