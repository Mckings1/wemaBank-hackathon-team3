"use client"

interface TrustScoreGaugeProps {
  score: number
}

export function TrustScoreGauge({ score }: TrustScoreGaugeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success"
    if (score >= 60) return "text-primary"
    return "text-muted-foreground"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    if (score >= 40) return "Fair"
    return "Needs Improvement"
  }

  // Calculate the stroke dash offset for the circular progress
  const circumference = 2 * Math.PI * 90
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="12" fill="none" className="text-muted" />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`${getScoreColor(score)} transition-all duration-1000`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-5xl font-bold ${getScoreColor(score)}`}>{score}</span>
          <span className="text-sm text-muted-foreground mt-1">out of 100</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className={`text-xl font-semibold ${getScoreColor(score)}`}>{getScoreLabel(score)}</p>
        <p className="text-sm text-muted-foreground mt-1">Financial Trust Score</p>
      </div>
    </div>
  )
}
