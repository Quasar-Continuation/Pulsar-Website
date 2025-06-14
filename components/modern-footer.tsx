import Link from "next/link"
import { Github, ExternalLink, Send } from "lucide-react"

export default function ModernFooter() {
  return (
    <footer className="border-t border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/pulsar-logo.png" alt="Pulsar" className="h-10 w-10" />
              <span className="text-2xl font-bold pulsar-glow">Pulsar</span>
            </div>
            <p className="text-sm text-zinc-400">
              A lightweight, fast, and powerful remote administration tool written in C#. The next evolution in remote
              system management.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="https://github.com/Quasar-Continuation/Pulsar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://t.me/SomaliDevs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-blue-600 hover:text-white"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Telegram</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#features"
                    className="text-zinc-400 transition-colors hover:text-blue-100 flex items-center gap-1 group"
                  >
                    <span className="slide-underline">Features</span>
                    <ExternalLink className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#screenshots"
                    className="text-zinc-400 transition-colors hover:text-blue-100 flex items-center gap-1 group"
                  >
                    <span className="slide-underline">Screenshots</span>
                    <ExternalLink className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#download"
                    className="text-zinc-400 transition-colors hover:text-blue-100 flex items-center gap-1 group"
                  >
                    <span className="slide-underline">Download</span>
                    <ExternalLink className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#getting-started"
                    className="text-zinc-400 transition-colors hover:text-blue-100 flex items-center gap-1 group"
                  >
                    <span className="slide-underline">Getting Started</span>
                    <ExternalLink className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Community</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="https://t.me/SomaliDevs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 transition-colors hover:text-blue-100 flex items-center gap-1 group"
                  >
                    <span className="slide-underline">Telegram</span>
                    <ExternalLink className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contributors"
                    className="text-zinc-400 transition-colors hover:text-blue-100 flex items-center gap-1 group"
                  >
                    <span className="slide-underline">Contributors</span>
                    <ExternalLink className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between space-y-4 border-t border-zinc-800 pt-8 md:flex-row md:space-y-0">
          <div className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Pulsar. Licensed under MIT.
            <span className="mx-2">|</span>
            Website by{" "}
            <a
              href="https://vn0.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors slide-underline"
            >
              Vn0
            </a>
          </div>
          <div className="flex space-x-6 text-sm text-zinc-500">
            <Link href="#" className="hover:text-zinc-300 slide-underline">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-zinc-300 slide-underline">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-zinc-300 slide-underline">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
