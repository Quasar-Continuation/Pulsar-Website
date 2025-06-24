"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, GitPullRequest, CircleDot } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Issue {
  number: number
  title: string
  state: string
  created_at: string
  updated_at: string
  labels: {
    name: string
    color: string
  }[]
  user: {
    login: string
    avatar_url: string
  }
  html_url: string
}

interface GitHubIssuesProps {
  owner: string
  repo: string
}

export default function GitHubIssues({ owner, repo }: GitHubIssuesProps) {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [filter, setFilter] = useState<"all" | "open" | "closed">("open")

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/issues?state=${filter}&page=${page}&per_page=10`,
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
        setIssues(data)
        setHasMore(data.length === 10)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch issues")
      } finally {
        setLoading(false)
      }
    }

    fetchIssues()
  }, [owner, repo, page, filter])

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

  if (error) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-red-400 mb-2">
          <AlertCircle className="h-5 w-5" />
          <p>Error loading issues: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
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
          variant={filter === "open" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("open")}
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
            key={issue.number}
            href={issue.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="border-zinc-700 bg-zinc-800 hover:bg-zinc-750 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {issue.state === "open" ? (
                      <CircleDot className="h-5 w-5 text-green-500" />
                    ) : (
                      <GitPullRequest className="h-5 w-5 text-purple-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{issue.title}</h3>
                    <p className="text-sm text-zinc-400 mt-1">
                      #{issue.number} opened {new Date(issue.created_at).toLocaleDateString()} by{" "}
                      {issue.user.login}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {issue.labels.map((label) => (
                        <span
                          key={label.name}
                          className="px-2 py-1 text-xs rounded-full"
                          style={{
                            backgroundColor: `#${label.color}20`,
                            color: `#${label.color}`,
                          }}
                        >
                          {label.name}
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
    </div>
  )
} 