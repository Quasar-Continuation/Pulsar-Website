import Link from "next/link"
import { ExternalLink, Send } from "lucide-react"

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
                href="https://github.com/Quasar-Continuation/Poopsar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://t.me/novashadowisgay"
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
                    href="https://t.me/novashadowisgay"
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
            {" & "}
            <a
              href="https://github.com/KingKDot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors slide-underline"
            >
              kdot
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
