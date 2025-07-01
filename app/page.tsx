"use client"

import Link from "next/link"
import { ArrowRight, Download, Send, Star, Zap, Shield, Globe, Sparkles, Copy, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ModernHeader from "@/components/modern-header"
import CompactFeaturesShowcase from "@/components/compact-features"
// import CompactContributors from "@/components/compact-contributors"
import ScreenshotGallery from "@/components/screenshot-gallery"
import GitLabLatestBuild from "@/components/gitlab-latest-build"
import ModernFooter from "@/components/modern-footer"
import { useState } from "react"

export default function Home() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const downloadUrl = "https://gitlab.rat.pe/pulsar/pulsar/-/jobs/artifacts/main/raw/build_output.zip?job=build"
      window.open(downloadUrl, "_blank")
    } catch (error) {
      console.error("Failed to initiate download:", error)
      window.open("https://gitlab.rat.pe/pulsar/pulsar", "_blank")
    } finally {
      setIsDownloading(false)
    }
  }

  const copyToClipboard = async (address: string, type: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(type)
      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const stats = [
    { icon: <Download className="h-5 w-5" />, value: "50K+", label: "Downloads" },
    { icon: <Star className="h-5 w-5" />, value: "60 fps", label: "Remote Desktop" },
    { icon: <Shield className="h-5 w-5" />, value: "256-bit", label: "Encryption" },
    { icon: <Zap className="h-5 w-5" />, value: "<10ms", label: "Latency" },
  ]

  return (
    <div className="min-h-screen text-zinc-100 overflow-x-hidden">
      {/* Navigation */}
      <ModernHeader />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center gradient-bg">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }}></div>
        </div>

        <div className="container relative z-10 px-4">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium">Next-Gen Remote Administration</span>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="hero-pulsar">Pulsar</span>
            </h1>
            
            {/* Subtitle */}
            <p className="mb-8 text-lg md:text-xl lg:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              Experience the future of remote system management with{" "}
              <span className="glow-text font-semibold">lightning-fast performance</span>,{" "}
              <span className="glow-text font-semibold">military-grade security</span>, and{" "}
              <span className="glow-text font-semibold">intuitive controls</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                className="neon-button bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0 text-lg px-8 py-6 w-full sm:w-auto"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                <Download className="h-5 w-5 mr-2" />
                <span className="slide-underline">Download Free</span>
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="neon-button text-lg px-8 py-6 w-full sm:w-auto"
                asChild
              >
                <a
                  href="https://gitlab.rat.pe/pulsar/pulsar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Globe className="h-5 w-5" />
                  <span className="slide-underline">View Source</span>
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="neon-card p-4 text-center float-animation"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center justify-center mb-2 text-cyan-400">
                    {stat.icon}
                  </div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Community Link */}
            <div className="mt-8">
              <Link
                href="https://t.me/SomaliDevs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Send className="h-4 w-4" />
                <span className="slide-underline">Join the Telegram</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 relative">
        <div className="container relative px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="glow-text">Powerful Features</span>
            </h2>
            <p className="text-lg text-zinc-400">
              Everything you need for secure and efficient remote administration
            </p>
          </div>
          <CompactFeaturesShowcase />
        </div>
      </section>

      {/* Screenshots Section */}
      <section id="showcase" className="py-16 md:py-24 bg-black/20">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="glow-text">See It in Action</span>
            </h2>
            <p className="text-lg text-zinc-400">
              Explore Pulsar's intuitive interface and powerful capabilities
            </p>
          </div>
          <ScreenshotGallery />
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-16 md:py-24 relative overflow-hidden">
        <div className="container relative z-10 px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="glow-text">Ready to Get Started?</span>
            </h2>
            <p className="text-lg text-zinc-400 mb-8">
              Download the latest version and experience the future of remote administration
            </p>
            <GitLabLatestBuild 
              projectUrl="https://gitlab.rat.pe/pulsar/pulsar"
              artifactUrl="https://gitlab.rat.pe/pulsar/pulsar/-/jobs/artifacts/main/raw/build_output.zip?job=build"
            />
          </div>
        </div>
      </section>

      {/* Community Section - Temporarily disabled */}
      {/* 
      <section id="community" className="py-16 md:py-24 bg-black/20">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="glow-text">Meet the Team</span>
            </h2>
            <p className="text-lg text-zinc-400">
              The talented developers behind Pulsar's innovation
            </p>
          </div>
          <CompactContributors projectId="pulsar%2Fpulsar" projectUrl="https://gitlab.rat.pe/pulsar/pulsar" />
        </div>
      </section>
      */}

      {/* Quick Start Guide */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="glow-text">Quick Start</span>
              </h2>
              <p className="text-lg text-zinc-400">
                Get up and running in just 3 simple steps
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Download & Extract",
                  description: "Get the latest release and extract files to your preferred location",
                  color: "from-blue-500 to-cyan-400"
                },
                {
                  step: "02", 
                  title: "Configure Settings",
                  description: "Use the built-in client builder to customize your configuration",
                  color: "from-purple-500 to-pink-400"
                },
                {
                  step: "03",
                  title: "Connect & Manage",
                  description: "Start managing remote systems with advanced security features",
                  color: "from-green-500 to-emerald-400"
                }
              ].map((item, index) => (
                <Card
                  key={index}
                  className="neon-card feature-card float-animation"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${item.color} text-white font-bold text-xl mb-4`}>
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-zinc-300">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
              <p className="text-sm text-yellow-200 text-center">
                <strong>⚠️ Important:</strong> Pulsar is designed for legitimate administrative and educational purposes only. 
                Always ensure you have proper authorization before accessing any system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donations Section */}
      <section className="py-16 md:py-24 bg-black/20">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="glow-text">Support Development</span>
            </h2>
            <p className="text-lg text-zinc-400">
              Help us continue developing and improving Pulsar with your donations
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Bitcoin Donation */}
            <Card className="neon-card hover-glow">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold text-2xl mb-4">
                    ₿
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Bitcoin (BTC)</h3>
                </div>
                <div className="bg-black/40 rounded-lg p-4 mb-4">
                  <p className="text-xs text-zinc-300 font-mono break-all leading-relaxed">
                    bc1q0q4e6mtrtqct7xvmv6hcucaaljn5j3djaxf3p4
                  </p>
                </div>
                <Button
                  onClick={() => copyToClipboard("bc1q0q4e6mtrtqct7xvmv6hcucaaljn5j3djaxf3p4", "btc")}
                  className="w-full bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-white border-0"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copiedAddress === "btc" ? "Copied!" : "Copy Address"}
                </Button>
              </CardContent>
            </Card>

            {/* Monero Donation */}
            <Card className="neon-card hover-glow">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-600 to-red-500 text-white font-bold text-2xl mb-4">
                    Ɱ
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Monero (XMR)</h3>
                </div>
                <div className="bg-black/40 rounded-lg p-4 mb-4">
                  <p className="text-xs text-zinc-300 font-mono break-all leading-relaxed">
                    8Ao3U16N9mTAXRTexBsS9QWrS742Yzxj7A7yk23dEqjG7wANXxuaiizNC5Bo4k8UttPBjfCpAfSfmcSbkaWX46vs7uwCzMz
                  </p>
                </div>
                <Button
                  onClick={() => copyToClipboard("8Ao3U16N9mTAXRTexBsS9QWrS742Yzxj7A7yk23dEqjG7wANXxuaiizNC5Bo4k8UttPBjfCpAfSfmcSbkaWX46vs7uwCzMz", "xmr")}
                  className="w-full bg-gradient-to-r from-orange-700 to-red-600 hover:from-orange-600 hover:to-red-500 text-white border-0"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copiedAddress === "xmr" ? "Copied!" : "Copy Address"}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-zinc-400 flex items-center justify-center gap-2">
              <Heart className="h-4 w-4 text-red-400" />
              Your support helps keep Pulsar free and open source
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <ModernFooter />
    </div>
  )
}
