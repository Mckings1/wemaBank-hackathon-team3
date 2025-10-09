"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 text-center">
        <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
        <h2 className="text-xl font-semibold mb-2">Registration Complete</h2>
        <p className="text-sm text-gray-600 mb-4">
          Your BVN and face verification are complete. You can now sign in to your account.
        </p>
        <Link href="/signin">
          <Button className="w-full">Go to Login</Button>
        </Link>
      </Card>
    </div>
  )
}
