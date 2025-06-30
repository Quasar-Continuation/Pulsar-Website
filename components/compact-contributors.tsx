"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, AlertCircle, Users, ChevronRight } from "lucide-react"

interface Contributor {
  name: string
  username: string
  avatar_url: string
  web_url: string
  commits_count: number
}

interface CompactContributorsProps {
  projectId: string
  projectUrl: string
}

export default function CompactContributors({ projectId, projectUrl }: CompactContributorsProps) {
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchContributors = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://gitlab.rat.ad/api/v4/projects/${projectId}/repository/contributors`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        )

        if (!response.ok) {
          throw new Error("Unable to fetch contributors")
        }

        const data = await response.json()
        setContributors(data)
      } catch (err) {
        setError("Unable to load contributors")
        
        // Fallback contributors for demo
        setContributors([
          {
            name: "Pulsar Team",
            username: "pulsar-dev",
            avatar_url: "/pulsar-logo.png",
            web_url: projectUrl,
            commits_count: 150
          },
          {
            name: "Core Developer",
            username: "core-dev",
            avatar_url: "/placeholder-user.jpg",
            web_url: projectUrl,
            commits_count: 89
          },
          {
            name: "Security Expert",
            username: "security-dev",
            avatar_url: "/placeholder-user.jpg",
            web_url: projectUrl,
            commits_count: 67
          },
          {
            name: "UI/UX Designer",
            username: "ui-dev",
            avatar_url: "/placeholder-user.jpg",
            web_url: projectUrl,
            commits_count: 34
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchContributors()
  }, [projectId, projectUrl])

  const displayedContributors = showAll ? contributors : contributors.slice(0, 6)

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="neon-card animate-pulse">
              <CardContent className="p-4 text-center">
                <div className="h-16 w-16 rounded-full bg-zinc-700 mx-auto mb-3" />
                <div className="h-4 w-20 bg-zinc-700 rounded mx-auto mb-2" />
                <div className="h-3 w-16 bg-zinc-700 rounded mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {error && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 rounded-lg px-4 py-2">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Mobile: Show top 3 contributors prominently */}
      <div className="block md:hidden mb-6">
        <div className="grid grid-cols-1 gap-4 mb-4">
          {contributors.slice(0, 3).map((contributor, index) => (
            <motion.div
              key={`mobile-${contributor.username || `unknown-${index}`}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="neon-card hover:scale-105 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={contributor.avatar_url || "/placeholder-user.jpg"}
                        alt={contributor.name}
                        className="h-16 w-16 rounded-full object-cover border-2 border-cyan-400/50"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-user.jpg"
                        }}
                      />
                      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">
                        {contributor.name}
                      </h3>
                      <p className="text-sm text-zinc-400 truncate">
                        @{contributor.username}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="h-2 w-2 rounded-full bg-green-400"></div>
                        <span className="text-xs text-zinc-400">
                          {contributor.commits_count} commits
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {contributors.length > 3 && (
          <Card className="neon-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      +{contributors.length - 3} more contributors
                    </p>
                    <p className="text-sm text-zinc-400">View all team members</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="neon-button"
                  asChild
                >
                  <a
                    href={projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Desktop: Grid layout */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {displayedContributors.map((contributor, index) => (
            <motion.div
              key={`desktop-${contributor.username || `unknown-${index}`}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="float-animation"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="neon-card hover:scale-105 transition-all duration-300 group">
                <CardContent className="p-4 text-center">
                  <div className="relative mb-3">
                    <img
                      src={contributor.avatar_url || "/placeholder-user.jpg"}
                      alt={contributor.name}
                      className="h-16 w-16 rounded-full object-cover mx-auto border-2 border-transparent group-hover:border-cyan-400/50 transition-all duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-user.jpg"
                      }}
                    />
                    {index < 3 && (
                      <div className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-white text-sm truncate group-hover:glow-text transition-all duration-300">
                    {contributor.name}
                  </h3>
                  <p className="text-xs text-zinc-400 truncate mb-2">
                    @{contributor.username}
                  </p>
                  <div className="flex items-center justify-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                    <span className="text-xs text-zinc-400">
                      {contributor.commits_count}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {contributors.length > 6 && !showAll && (
          <div className="text-center">
            <Button
              variant="outline"
              className="neon-button group"
              onClick={() => setShowAll(true)}
            >
              <Users className="h-4 w-4 mr-2" />
              <span className="slide-underline">Show All {contributors.length} Contributors</span>
              <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>
        )}

        {showAll && contributors.length > 6 && (
          <div className="text-center">
            <Button
              variant="outline"
              className="neon-button"
              onClick={() => setShowAll(false)}
            >
              <span className="slide-underline">Show Less</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
