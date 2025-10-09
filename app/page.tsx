"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Lightbulb, Lock, Check, Play, CreditCard, Star } from "lucide-react"
import { useState } from "react"

export default function LandingPage() {
  const [showDemo, setShowDemo] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">TrustHub</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Security
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
          </nav>
          <Button asChild variant="outline" size="sm" className="bg-white">
            <Link href="/signin">Sign In</Link>
          </Button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 text-balance leading-tight">
              All your finances.
              <br />
              <span className="text-muted-foreground">One trusted hub.</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 text-pretty max-w-xl">
              Securely connect your banks, wallets, and investment apps. Get AI-powered insights, build your trust
              score, and take control of your financial future.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4 mb-6 md:mb-8">
              <Button asChild size="lg" className="gap-2 w-full sm:w-auto">
                <Link href="/register">
                  <Shield className="w-4 h-4" />
                  Connect Your Accounts
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="gap-2 bg-white w-full sm:w-auto"
                onClick={() => setShowDemo(true)}
              >
                <Play className="w-4 h-4" />
                Watch Demo
              </Button>
            </div>

            {/* Demo Modal */}
            {showDemo && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                <div className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full relative">
                  <button
                    className="absolute top-2 right-2 text-muted-foreground"
                    onClick={() => setShowDemo(false)}
                  >
                    ✕
                  </button>
                  <div className="aspect-video mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.loom.com/embed/62e4da1fc0c84306b32eee97d9b946d9" 
                      title="Demo Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-center text-muted-foreground">TrustHub Demo</p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span>Bank-grade security</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span>Privacy first</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <span>Real-time insights</span>
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-border">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground">Your Financial Overview</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Check className="w-3 h-3 md:w-4 md:h-4 text-success" />
                  <span className="hidden sm:inline">Connected accounts: 4</span>
                  <span className="sm:hidden">4 accounts</span>
                </div>
              </div>

              {/* Balance Card */}
              <div className="bg-primary rounded-xl p-4 md:p-6 mb-4 md:mb-6 relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-xs md:text-sm text-primary-foreground/80 mb-1">Total Balance</p>
                  <p className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2 md:mb-4">₦2,847,500</p>
                  <CreditCard className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground/50 absolute top-4 md:top-6 right-4 md:right-6" />
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="bg-success/5 rounded-lg p-3 md:p-4 border border-success/20">
                  <p className="text-xs text-muted-foreground mb-1">This Month</p>
                  <p className="text-lg md:text-xl font-bold text-success">+ ₦125K</p>
                  <p className="text-xs text-muted-foreground mt-1">Income</p>
                </div>
                <div className="bg-destructive/5 rounded-lg p-3 md:p-4 border border-destructive/20">
                  <p className="text-xs text-muted-foreground mb-1">Spent</p>
                  <p className="text-lg md:text-xl font-bold text-destructive">₦89K</p>
                  <p className="text-xs text-muted-foreground mt-1">This month</p>
                </div>
              </div>

              {/* Trust Score Badge */}
              <div className="bg-warning/10 rounded-lg p-3 md:p-4 border border-warning/30 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Trust Score</p>
                  <p className="text-xl md:text-2xl font-bold text-foreground">87/100</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-warning rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-warning-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="container mx-auto px-4 py-12 md:py-16 lg:py-20 border-t border-border">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Why Choose TrustHub?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Experience the future of financial management with our secure, intelligent platform
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          <div className="bg-primary/5 rounded-2xl p-6 md:p-8 text-center border border-primary/10">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Shield className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">Secure Connections</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Connect all your banks, wallets, and investment apps with bank-grade encryption. Your data stays
              protected.
            </p>
          </div>

          <div className="bg-success/5 rounded-2xl p-6 md:p-8 text-center border border-success/10">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Lightbulb className="w-7 h-7 md:w-8 md:h-8 text-success-foreground" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">AI Insights</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Get personalized financial insights, spending alerts, and smart recommendations to optimize your money.
            </p>
          </div>

          <div className="bg-accent/5 rounded-2xl p-6 md:p-8 text-center border border-accent/10 sm:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Lock className="w-7 h-7 md:w-8 md:h-8 text-accent-foreground" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 md:mb-3">Privacy Control</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              You decide who sees what. Control data sharing with granular permissions and revoke access anytime.
            </p>
          </div>
        </div>
      </section>

      <section id="security" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-success" />
        <div className="relative container mx-auto px-4 py-12 md:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="text-white">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                Build Your Financial Trust Score
              </h2>
              <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                A fairer credit scoring system based on your actual financial behavior, not just debt history. Perfect
                for building credit without traditional credit cards.
              </p>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90 text-sm md:text-base">Income stability tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90 text-sm md:text-base">Savings consistency analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90 text-sm md:text-base">Payment reliability scoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90 text-sm md:text-base">Financial goal achievement</span>
                </div>
              </div>
            </div>

            {/* Right Column - Trust Score Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-bold text-center mb-6 md:mb-8">Your Trust Score</h3>

              <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-4 md:mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="44%"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-muted/20"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="44%"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(87 / 100) * 553} 553`}
                    className="text-success"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl md:text-5xl font-bold text-foreground">87</span>
                  <span className="text-xs md:text-sm text-muted-foreground">out of 100</span>
                </div>
              </div>

              <p className="text-center text-muted-foreground mb-4 md:mb-6 text-sm md:text-base">
                Excellent financial behavior!
              </p>

              <Button asChild className="w-full" size="lg">
                <Link href="/signin">View Detailed Report</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Connect Your Favorite Apps
          </h2>
          <p className="text-base md:text-lg text-muted-foreground px-4">
            Seamlessly integrate with leading Nigerian financial institutions
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-4 md:p-6 border border-border flex flex-col items-center justify-center gap-2 md:gap-3 hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
              <span className="text-lg md:text-xl font-bold text-red-600">W</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground text-center">Wema Bank</span>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 border border-border flex flex-col items-center justify-center gap-2 md:gap-3 hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <span className="text-lg md:text-xl font-bold text-purple-600">K</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground text-center">Kuda Bank</span>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 border border-border flex flex-col items-center justify-center gap-2 md:gap-3 hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <span className="text-lg md:text-xl font-bold text-green-600">O</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground text-center">Opay</span>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 border border-border flex flex-col items-center justify-center gap-2 md:gap-3 hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <span className="text-lg md:text-xl font-bold text-blue-600">P</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground text-center">Piggyvest</span>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 border border-border flex flex-col items-center justify-center gap-2 md:gap-3 hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <span className="text-lg md:text-xl font-bold text-orange-600">G</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground text-center">GTBank</span>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 border border-border flex flex-col items-center justify-center gap-2 md:gap-3 hover:shadow-lg transition-shadow">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-lg md:text-xl font-bold text-muted-foreground">+</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground text-center">50+ More</span>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="bg-muted rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Ready to Take Control?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of Nigerians who trust TrustHub with their financial future
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Button asChild size="lg" className="gap-2 w-full sm:w-auto">
              <Link href="/register">
                <Shield className="w-4 h-4" />
                Get Started Free
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-white w-full sm:w-auto">
              Schedule Demo
            </Button>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground mt-4 md:mt-6 px-4">
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      <footer className="bg-foreground text-background mt-12 md:mt-20">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">TrustHub</span>
              </div>
              <p className="text-sm text-background/70 leading-relaxed">
                Your trusted financial companion for a secure and intelligent money management experience.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Product</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>
                  <a href="#features" className="hover:text-background transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#security" className="hover:text-background transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <Link href="/connect" className="hover:text-background transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Company</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Support</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-background transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-background transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/10 pt-6 md:pt-8 text-center text-xs md:text-sm text-background/70">
            <p>© 2025 TrustHub. All rights reserved. Built for Wema Bank Hackaholics Hackathon.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
