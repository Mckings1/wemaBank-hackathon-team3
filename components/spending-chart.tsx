"use client"

import { Card } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"


const chartColors = [
  "#9e9bd2ff", // Food & Dining - Indigo
  "#00C9A7", // Transportation - Teal
  "#24f794ff", // Shopping - Orange
  "#ac5a09ff", // Bills & Utilities - Red
  "#ed0d0dff", // Entertainment - Yellow
]

const data = [
  { name: "Food & Dining", value: 85000, color: chartColors[0] },
  { name: "Transportation", value: 45000, color: chartColors[1] },
  { name: "Shopping", value: 62000, color: chartColors[2] },
  { name: "Bills & Utilities", value: 38000, color: chartColors[3] },
  { name: "Entertainment", value: 28000, color: chartColors[4] },
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
            label={(props) => `${props.name} ${props.percent ? (Number(props.percent) * 100).toFixed(0) : 0}%`}
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
