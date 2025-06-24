"use client"

import Link from "next/link"
import { ArrowRight, Download, Github, Send, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FeaturesShowcase from "@/components/features-showcase"
import ScreenshotGallery from "@/components/screenshot-gallery"
import ContributorCard from "@/components/contributor-card"
import CodeBlock from "@/components/code-block"
import Roadmap from "@/components/roadmap"
import ModernFooter from "@/components/modern-footer"
import GitHubCollaborators from "@/components/github-collaborators"
import GitHubLatestRelease from "@/components/github-latest-release"
import GitHubIssues from "@/components/github-issues"
import { useState } from "react"

export default function Home() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const response = await fetch(
        "https://api.github.com/repos/Quasar-Continuation/Pulsar/releases/tags/AutoBuild",
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      )

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const data = await response.json()
      
      // If there are no assets, redirect to the release page
      if (!data.assets || data.assets.length === 0) {
        window.open(data.html_url, "_blank")
        return
      }

      // Find the build_output.zip file
      const buildOutput = data.assets.find((asset: any) => asset.name === "build_output.zip")
      
      // If build_output.zip is not found, use the first asset
      const downloadAsset = buildOutput || data.assets[0]
      
      // Open the download URL
      window.open(downloadAsset.browser_download_url, "_blank")
    } catch (error) {
      console.error("Failed to fetch release:", error)
      // Fallback to the releases page if the API call fails
      window.open("https://github.com/Quasar-Continuation/Pulsar/releases/tag/AutoBuild", "_blank")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/pulsar-logo.png" alt="Pulsar" className="h-8 w-8" />
            <span className="text-xl font-bold pulsar-glow">Pulsar</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li>
                <Link href="#features" className="text-sm text-zinc-400 hover:text-blue-100 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#screenshots" className="text-sm text-zinc-400 hover:text-blue-100 transition-colors">
                  Screenshots
                </Link>
              </li>
              <li>
                <Link href="#download" className="text-sm text-zinc-400 hover:text-blue-100 transition-colors">
                  Download
                </Link>
              </li>
              <li>
                <Link href="#getting-started" className="text-sm text-zinc-400 hover:text-blue-100 transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="#roadmap" className="text-sm text-zinc-400 hover:text-blue-100 transition-colors">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="#contributors" className="text-sm text-zinc-400 hover:text-blue-100 transition-colors">
                  Contributors
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex gap-2 border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
              asChild
            >
              <a
                href="https://github.com/Quasar-Continuation/Pulsar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                <span className="slide-underline">GitHub</span>
              </a>
            </Button>
            <Button size="sm" className="gap-2 bg-blue-600 text-blue-50 hover:bg-blue-700">
              <Download className="h-4 w-4" />
              <span className="slide-underline">Download</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              <span className="hero-pulsar">Pulsar</span>
            </h1>
            <p className="mb-8 text-xl text-zinc-400">
              A lightweight, fast, and powerful remote administration tool written in C#. The next evolution in remote
              system management.
            </p>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <Button
                  size="lg"
                  className="gap-2 bg-blue-600 text-blue-50 hover:bg-blue-700 w-full sm:w-auto"
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  <Download className="h-5 w-5" />
                  <span className="slide-underline">Download Latest</span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  asChild
                >
                  <a
                    href="https://github.com/Quasar-Continuation/Pulsar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-5 w-5" />
                    <span className="slide-underline">View on GitHub</span>
                  </a>
                </Button>
              </div>
              <Link
                href="https://t.me/SomaliDevs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mt-4"
              >
                <Send className="h-4 w-4" />
                <span className="slide-underline">Join our Telegram community</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-zinc-900">
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-zinc-400">
              Pulsar offers a comprehensive suite of tools for remote administration, security, and system management.
            </p>
          </div>
          <FeaturesShowcase />
        </div>
      </section>

      {/* Screenshots Section */}
      <section id="screenshots" className="py-20 bg-zinc-800">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">Screenshots</h2>
          <ScreenshotGallery />
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 bg-zinc-900 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Download Pulsar</h2>
            <p className="mb-8 text-zinc-400">
              Get started with Pulsar today. Download the latest stable release and take control of your remote
              administration needs.
            </p>
            <GitHubLatestRelease owner="Quasar-Continuation" repo="Pulsar" />
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section id="getting-started" className="py-20 bg-zinc-800">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Getting Started</h2>
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">1. Download and Extract</h3>
                <p className="text-zinc-400">
                  Download the latest release and extract the files to a folder of your choice.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">2. Run Pulsar</h3>
                <p className="text-zinc-400">Run Pulsar.exe (server) or build the client as needed.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">3. Configure Settings</h3>
                <p className="text-zinc-400">Configure your settings using the built-in client builder.</p>
              </div>
              <div className="mt-8 p-4 rounded-md bg-zinc-900 border border-zinc-700">
                <p className="text-sm text-zinc-400">
                  <strong>Note:</strong> Pulsar is intended for legitimate administrative and educational use only.
                  Always ensure you have permission to access remote systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Supported Platforms</h2>
            <Card className="border-zinc-700 bg-zinc-800">
              <CardContent className="p-6">
                <div className="mb-6">
                  <h3 className="mb-2 text-xl font-bold">Runtime</h3>
                  <p className="text-zinc-400">.NET Framework 4.5.2 or higher</p>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold">Operating Systems (32- and 64-bit)</h3>
                  <ul className="grid gap-2 md:grid-cols-2 text-zinc-400">
                    <li>• Windows 11</li>
                    <li>• Windows Server 2022</li>
                    <li>• Windows 10</li>
                    <li>• Windows Server 2019</li>
                    <li>• Windows Server 2016</li>
                    <li>• Windows 8/8.1</li>
                    <li>• Windows Server 2012</li>
                    <li>• Windows 7</li>
                    <li>• Windows Server 2008 R2</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Compile Section */}
      <section className="py-20 bg-zinc-800">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold">How to Compile</h2>
            <div className="space-y-6">
              <CodeBlock
                code={`# Open Pulsar.sln in Visual Studio 2019+ with .NET Desktop Development installed
# Restore NuGet Packages
# Build the project (Build > F6)
# Find executables in the Bin directory`}
              />

              <div className="mt-8">
                <h3 className="mb-4 text-xl font-bold">Client Build Options</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-700">
                        <th className="py-2 px-4 text-left">Configuration</th>
                        <th className="py-2 px-4 text-left">Use Case</th>
                        <th className="py-2 px-4 text-left">Details</th>
                      </tr>
                    </thead>
                    <tbody className="text-zinc-400">
                      <tr className="border-b border-zinc-700">
                        <td className="py-2 px-4">Debug</td>
                        <td className="py-2 px-4">Testing</td>
                        <td className="py-2 px-4">Uses pre-defined Settings.cs. Edit before compiling.</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4">Release</td>
                        <td className="py-2 px-4">Production</td>
                        <td className="py-2 px-4">Run Pulsar.exe and use the client builder for custom settings.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-md bg-zinc-900 border border-zinc-700">
                <h4 className="mb-2 font-bold">Troubleshooting:</h4>
                <ul className="list-disc pl-5 text-sm text-zinc-400 space-y-1">
                  <li>Ensure all dependencies are restored via NuGet.</li>
                  <li>If you encounter build errors, check your .NET Framework version and Visual Studio workloads.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 bg-zinc-800">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-center text-3xl font-bold">Development Roadmap</h2>
            <p className="mb-12 text-center text-zinc-400">
              Our vision for Pulsar's future development. These are the features and improvements we're working on to
              make Pulsar even more powerful.
            </p>
            <Roadmap />
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      <section id="contributors" className="py-20 bg-zinc-900">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="mb-6 text-3xl font-bold">Contributors</h2>
            <p className="text-zinc-400">
              Meet the amazing developers who contribute to Pulsar's development.
            </p>
          </div>
          <GitHubCollaborators owner="Quasar-Continuation" repo="Pulsar" />
        </div>
      </section>

      {/* Issues Section */}
      <section id="issues" className="py-20 bg-zinc-800">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="mb-6 text-3xl font-bold">Latest Issues</h2>
            <p className="text-zinc-400">
              Track the latest issues and feature requests for Pulsar.
            </p>
          </div>
          <GitHubIssues owner="Quasar-Continuation" repo="Pulsar" />
        </div>
      </section>

      {/* Security Notice */}
      <section className="py-10 bg-zinc-800">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold">Security Notice</h2>
            <p className="text-zinc-400">
              Pulsar is designed for legitimate administrative and educational purposes only. Misuse of this software
              may violate laws and regulations. Always ensure you have proper authorization before accessing any system.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <ModernFooter />
    </div>
  )
}
