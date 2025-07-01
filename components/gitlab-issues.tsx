"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, GitPullRequest, CircleDot } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Issue {
  iid: number
  title: string
  state: string
  created_at: string
  updated_at: string
  labels: string[]
  author: {
    username: string
    avatar_url: string
  }
  web_url: string
}

interface GitLabIssuesProps {
  projectId: string
  projectUrl: string
}

export default function GitLabIssues({ projectId, projectUrl }: GitLabIssuesProps) {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [filter, setFilter] = useState<"all" | "opened" | "closed">("opened")

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://gitlab.rat.pe/api/v4/projects/${projectId}/issues?state=${filter}&page=${page}&per_page=10`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        )

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unable to fetch issues. This may be a private repository.")
          }
          throw new Error(`GitLab API error: ${response.status}`)
        }

        const data = await response.json()
        setIssues(data)
        setHasMore(data.length === 10)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch issues")
        
        // Fallback: show placeholder issues for demo purposes
        setIssues([
          {
            iid: 1,
            title: "Welcome to Pulsar Issues",
            state: "opened",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            labels: ["enhancement"],
            author: {
              username: "pulsar-team",
              avatar_url: "/pulsar-logo.png"
            },
            web_url: `${projectUrl}/-/issues/1`
          }
        ])
        setHasMore(false)
      } finally {
        setLoading(false)
      }
    }

    fetchIssues()
  }, [projectId, projectUrl, page, filter])

  if (loading && issues.length === 0) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-zinc-700 bg-zinc-800 animate-pulse">
            <CardContent className="p-6">
              <div className="h-6 w-3/4 bg-zinc-700 rounded mb-4" />
              <div className="h-4 w-1/2 bg-zinc-700 rounded mb-4" />
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-zinc-700 rounded" />
                <div className="h-6 w-20 bg-zinc-700 rounded" />
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

      <div className="flex justify-center gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          className="border-zinc-700"
        >
          All
        </Button>
        <Button
          variant={filter === "opened" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("opened")}
          className="border-zinc-700"
        >
          Open
        </Button>
        <Button
          variant={filter === "closed" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("closed")}
          className="border-zinc-700"
        >
          Closed
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {issues.map((issue) => (
          <a
            key={issue.iid}
            href={issue.web_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="border-zinc-700 bg-zinc-800 hover:bg-zinc-750 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {issue.state === "opened" ? (
                      <CircleDot className="h-5 w-5 text-green-500" />
                    ) : (
                      <GitPullRequest className="h-5 w-5 text-purple-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{issue.title}</h3>
                    <p className="text-sm text-zinc-400 mt-1">
                      #{issue.iid} opened {new Date(issue.created_at).toLocaleDateString()} by{" "}
                      {issue.author.username}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {issue.labels.map((label) => (
                        <span
                          key={label}
                          className="px-2 py-1 text-xs rounded-full bg-blue-600/20 text-blue-400"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="border-zinc-700"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasMore}
          className="border-zinc-700"
        >
          Next
        </Button>
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
          <span>View Issues on GitLab</span>
        </a>
      </div>
    </div>
  )
}
