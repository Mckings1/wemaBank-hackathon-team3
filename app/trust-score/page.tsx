"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TrendingUp, CheckCircle2 } from "lucide-react"
import { TrustScoreGauge } from "@/components/trust-score-gauge"
import { TrustScoreTrend } from "@/components/trust-score-trend"
import { AppHeader } from "@/components/app-header"

export default function TrustScorePage() {
  const scoreFactors = [
    { name: "Income Stability", score: 92, description: "Consistent monthly income for 6+ months" },
    { name: "Savings Consistency", score: 78, description: "Regular savings deposits detected" },
    { name: "Payment Reliability", score: 88, description: "Bills paid on time 95% of the time" },
    { name: "Spending Behavior", score: 75, description: "Balanced spending across categories" },
  ]

  const benefits = [
    "Access to better loan rates from partner banks",
    "Pre-approved credit offers based on behavior",
    "Priority customer service from financial institutions",
    "Personalized investment recommendations",
  ]

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Score Display */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Your Trust Score</h1>
              <p className="text-muted-foreground">A fairer way to measure financial health</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Score Display */}
          <Card className="p-8">
            <TrustScoreGauge score={87} />
            <div className="text-center mt-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">+5 points this month</span>
              </div>
            </div>
          </Card>

          {/* What This Means */}
          <Card className="p-8">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">What This Means</h3>
            <p className="text-muted-foreground mb-6">
              Your Trust Score of 87 indicates excellent financial behavior. This score is based on your actual
              financial habits, not just your debt history.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium text-card-foreground">Strong Score</p>
                  <p className="text-sm text-muted-foreground">You're in the top 25% of users</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium text-card-foreground">Improving Trend</p>
                  <p className="text-sm text-muted-foreground">Your score has increased 15% over 6 months</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-8">
          <TrustScoreTrend />
        </div>

        {/* Score Factors */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Score Breakdown</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {scoreFactors.map((factor) => (
              <Card key={factor.name} className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-card-foreground">{factor.name}</h3>
                  <span className="text-2xl font-bold text-success">{factor.score}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-3">
                  <div className="bg-success h-2 rounded-full transition-all" style={{ width: `${factor.score}%` }} />
                </div>
                <p className="text-sm text-muted-foreground">{factor.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <Card className="p-8 bg-primary text-primary-foreground">
          <h2 className="text-2xl font-bold mb-4">Benefits of Your Trust Score</h2>
          <p className="opacity-90 mb-6">Your strong Trust Score unlocks exclusive financial opportunities:</p>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* How to Improve */}
        <Card className="p-8 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-card-foreground">How to Improve Your Score</h2>
            <Button asChild variant="outline" size="sm">
              <Link href="/insights">View Insights</Link>
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Maintain consistent savings</p>
                <p className="text-sm text-muted-foreground">
                  Set up automatic transfers to your savings account each month
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">2</span>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Pay bills on time</p>
                <p className="text-sm text-muted-foreground">
                  Enable payment reminders or auto-pay for recurring bills
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">3</span>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Diversify your income sources</p>
                <p className="text-sm text-muted-foreground">Multiple income streams demonstrate financial stability</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
