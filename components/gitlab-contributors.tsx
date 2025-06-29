"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { User, AlertCircle } from "lucide-react"

interface Contributor {
  name: string
  username: string
  avatar_url: string
  web_url: string
  commits_count: number
}

interface GitLabContributorsProps {
  projectId: string
  projectUrl: string
}

export default function GitLabContributors({ projectId, projectUrl }: GitLabContributorsProps) {
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContributors = async () => {
      setLoading(true)
      setError(null)

      try {
        // Note: GitLab API requires authentication for private repos
        // For public repos, this should work without authentication
        const response = await fetch(
          `https://gitlab.rat.ad/api/v4/projects/${projectId}/repository/contributors`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        )

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unable to fetch contributors. This may be a private repository.")
          }
          throw new Error(`GitLab API error: ${response.status}`)
        }

        const data = await response.json()
        setContributors(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch contributors")
        
        // Fallback: show placeholder contributors for demo purposes
        setContributors([
          {
            name: "Pulsar Team",
            username: "pulsar-dev",
            avatar_url: "/pulsar-logo.png",
            web_url: projectUrl,
            commits_count: 100
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchContributors()
  }, [projectId, projectUrl])

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

  return (
    <div className="space-y-6">
      {error && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-yellow-400 mb-2">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">Note: {error}</p>
          </div>
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contributors.map((contributor) => (
          <a
            key={contributor.username}
            href={contributor.web_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="border-zinc-700 bg-zinc-800 hover:bg-zinc-750 transition-colors">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-700 overflow-hidden">
                  {contributor.avatar_url ? (
                    <img
                      src={contributor.avatar_url}
                      alt={contributor.name || contributor.username}
                      className="h-12 w-12 rounded-full"
                    />
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold">{contributor.name || contributor.username}</h3>
                  <p className="text-sm text-zinc-400">
                    {contributor.commits_count} commits
                  </p>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
      
      <div className="text-center">
        <a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>View on GitLab</span>
        </a>
      </div>
    </div>
  )
}
