"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const trendData = [
  { month: "Jul", score: 72 },
  { month: "Aug", score: 75 },
  { month: "Sep", score: 78 },
  { month: "Oct", score: 80 },
  { month: "Nov", score: 83 },
  { month: "Dec", score: 87 },
]

export function TrustScoreTrend() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Score Trend</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={trendData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="month" className="text-xs" />
          <YAxis domain={[0, 100]} className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Line type="monotone" dataKey="score" stroke="hsl(var(--success))" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Your score has improved by <span className="text-success font-semibold">+15 points</span> over the last 6 months
      </p>
    </Card>
  )
}
