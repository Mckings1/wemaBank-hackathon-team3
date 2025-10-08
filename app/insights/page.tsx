"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertTriangle, Sparkles, TrendingUp, ArrowRight } from "lucide-react"
import { AppHeader } from "@/components/app-header"

export default function InsightsPage() {
  const insights = [
    {
      id: 1,
      type: "alert",
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Unusual Spending Detected",
      description:
        "You spent 30% more on food and dining this week compared to your average. Consider meal planning to reduce costs.",
      action: "Set Budget",
      color: "primary",
    },
    {
      id: 2,
      type: "success",
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Savings Milestone Reached",
      description:
        "Congratulations! You saved ₦12,000 more this month. You're on track to reach your ₦500,000 goal by June.",
      action: "View Progress",
      color: "success",
    },
    {
      id: 3,
      type: "tip",
      icon: <Sparkles className="w-6 h-6" />,
      title: "Smart Savings Opportunity",
      description:
        "You can save ₦10,000 monthly by automating transfers to your Piggyvest account right after salary deposits.",
      action: "Automate Savings",
      color: "accent",
    },
    {
      id: 4,
      type: "tip",
      icon: <Sparkles className="w-6 h-6" />,
      title: "Optimize Your Subscriptions",
      description:
        "You have 3 streaming subscriptions totaling ₦8,500/month. Consider sharing family plans to save ₦4,000.",
      action: "Review Subscriptions",
      color: "accent",
    },
  ]

  const quickActions = [
    { label: "Automate Savings", icon: <TrendingUp className="w-5 h-5" /> },
    { label: "Set Budget", icon: <Sparkles className="w-5 h-5" /> },
    { label: "Transfer Funds", icon: <ArrowRight className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Smart Insights</h1>
              <p className="text-muted-foreground">AI-powered recommendations for your finances</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          {quickActions.map((action) => (
            <Button key={action.label} variant="outline" className="gap-2 bg-transparent">
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>

        {/* Insights List */}
        <div className="space-y-6">
          {insights.map((insight) => (
            <Card key={insight.id} className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    insight.color === "success"
                      ? "bg-success/10 text-success"
                      : insight.color === "accent"
                        ? "bg-accent/10 text-accent"
                        : "bg-primary/10 text-primary"
                  }`}
                >
                  {insight.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">{insight.title}</h3>
                  <p className="text-muted-foreground mb-4">{insight.description}</p>
                  <Button size="sm" variant={insight.color === "success" ? "default" : "outline"}>
                    {insight.action}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Spending Patterns */}
        <Card className="p-8 mt-8">
          <h2 className="text-xl font-semibold text-card-foreground mb-6">Your Spending Patterns</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Most Spent On</p>
              <p className="text-2xl font-bold text-card-foreground">Food & Dining</p>
              <p className="text-sm text-muted-foreground mt-1">₦85,000 this month</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Biggest Increase</p>
              <p className="text-2xl font-bold text-primary">Shopping</p>
              <p className="text-sm text-muted-foreground mt-1">+45% from last month</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Best Category</p>
              <p className="text-2xl font-bold text-success">Bills & Utilities</p>
              <p className="text-sm text-muted-foreground mt-1">Always paid on time</p>
            </div>
          </div>
        </Card>

        {/* AI Assistant Tip */}
        <Card className="p-6 mt-8 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">AI Assistant Tip</h3>
              <p className="text-sm text-muted-foreground">
                Based on your spending patterns, you could save an additional ₦25,000 per month by: reducing dining out
                by 20%, switching to a cheaper mobile plan, and consolidating your subscriptions.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
