"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Download, X, Github } from "lucide-react"

export default function ModernHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#showcase", label: "Gallery" },
    { href: "#download", label: "Download" },
    // { href: "#community", label: "Community" }, // Temporarily disabled
  ]

  const handleDownload = () => {
    const downloadUrl = "https://gitlab.rat.pe/pulsar/pulsar/-/jobs/artifacts/main/raw/build_output.zip?job=build"
    window.open(downloadUrl, "_blank")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img 
              src="/pulsar-logo.png" 
              alt="Pulsar" 
              className="h-8 w-8 transition-all duration-300 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </div>
          <span className="text-xl font-bold pulsar-glow">Pulsar</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-300 hover:text-white transition-colors relative group"
            >
              <span className="slide-underline">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="neon-button text-sm"
            asChild
          >
            <a
              href="https://gitlab.rat.pe/pulsar/pulsar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              <span>GitLab</span>
            </a>
          </Button>
          <Button
            size="sm"
            className="neon-button bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm" className="text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-80 bg-black/95 backdrop-blur-xl border-l border-white/10"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <img src="/pulsar-logo.png" alt="Pulsar" className="h-6 w-6" />
                  <span className="font-bold pulsar-glow">Pulsar</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 py-6">
                <div className="space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 text-lg text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Mobile Actions */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                <Button
                  variant="outline"
                  className="w-full neon-button"
                  asChild
                >
                  <a
                    href="https://gitlab.rat.pe/pulsar/pulsar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    View on GitLab
                  </a>
                </Button>
                <Button
                  className="w-full neon-button bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0"
                  onClick={() => {
                    handleDownload()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Pulsar
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}