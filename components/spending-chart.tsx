"use client"

import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Food & Dining", value: 85000, color: "hsl(var(--chart-1))" },
  { name: "Transportation", value: 45000, color: "hsl(var(--chart-2))" },
  { name: "Shopping", value: 62000, color: "hsl(var(--chart-3))" },
  { name: "Bills & Utilities", value: 38000, color: "hsl(var(--chart-4))" },
  { name: "Entertainment", value: 28000, color: "hsl(var(--chart-5))" },
]

export function SpendingChart() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-card-foreground mb-6">Spending Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `₦${value.toLocaleString()}`} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}
