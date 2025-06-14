"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { User, Github, AlertCircle } from "lucide-react"

interface Collaborator {
  login: string
  avatar_url: string
  html_url: string
  contributions: number
}

interface GitHubCollaboratorsProps {
  owner: string
  repo: string
}

export default function GitHubCollaborators({ owner, repo }: GitHubCollaboratorsProps) {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [rateLimit, setRateLimit] = useState<{ remaining: number; reset: number } | null>(null)

  useEffect(() => {
    const fetchCollaborators = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
            cache: "no-store",
          }
        )
        
        // Get rate limit info from headers
        const remaining = response.headers.get("x-ratelimit-remaining")
        const reset = response.headers.get("x-ratelimit-reset")
        if (remaining && reset) {
          setRateLimit({
            remaining: parseInt(remaining),
            reset: parseInt(reset) * 1000,
          })
        }

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error("GitHub API rate limit exceeded. Please try again later.")
          }
          throw new Error(`GitHub API error: ${response.status}`)
        }

        const data = await response.json()
        setCollaborators(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch collaborators")
      } finally {
        setLoading(false)
      }
    }

    fetchCollaborators()
  }, [owner, repo])

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="border-zinc-700 bg-zinc-800 animate-pulse">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-zinc-700" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-zinc-700 rounded" />
                <div className="h-3 w-16 bg-zinc-700 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-red-400 mb-2">
          <AlertCircle className="h-5 w-5" />
          <p>Error loading collaborators: {error}</p>
        </div>
        {rateLimit && rateLimit.remaining === 0 && (
          <p className="text-sm text-zinc-400">
            Rate limit will reset at {new Date(rateLimit.reset).toLocaleTimeString()}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {collaborators.map((collaborator) => (
          <a
            key={collaborator.login}
            href={collaborator.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="border-zinc-700 bg-zinc-800 hover:bg-zinc-750 transition-colors">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-700 overflow-hidden">
                  {collaborator.avatar_url ? (
                    <img
                      src={collaborator.avatar_url}
                      alt={collaborator.login}
                      className="h-12 w-12 rounded-full"
                    />
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold">{collaborator.login}</h3>
                  <p className="text-sm text-zinc-400">
                    {collaborator.contributions} contributions
                  </p>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
      <div className="text-center">
        <a
          href={`https://github.com/${owner}/${repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <Github className="h-4 w-4" />
          <span>View on GitHub</span>
        </a>
      </div>
    </div>
  )
} 