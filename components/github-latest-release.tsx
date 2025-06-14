"use client"

import { useEffect, useState } from "react"
import { Download, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Release {
  tag_name: string
  name: string
  published_at: string
  html_url: string
  assets: {
    name: string
    browser_download_url: string
    size: number
  }[]
}

interface GitHubLatestReleaseProps {
  owner: string
  repo: string
}

export default function GitHubLatestRelease({ owner, repo }: GitHubLatestReleaseProps) {
  const [release, setRelease] = useState<Release | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLatestRelease = async () => {
      try {
        // Fetch the AutoBuild release specifically
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/releases/tags/AutoBuild`,
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
        setRelease(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch release information")
      } finally {
        setLoading(false)
      }
    }

    fetchLatestRelease()
  }, [owner, repo])

  if (loading) {
    return (
      <Card className="mx-auto max-w-md border-zinc-700 bg-zinc-800 animate-pulse">
        <CardContent className="p-6">
          <div className="h-6 w-32 bg-zinc-700 rounded mb-4" />
          <div className="h-4 w-48 bg-zinc-700 rounded mb-6" />
          <div className="h-10 w-full bg-zinc-700 rounded" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-red-400 mb-2">
          <AlertCircle className="h-5 w-5" />
          <p>Error loading release information: {error}</p>
        </div>
      </div>
    )
  }

  if (!release) {
    return null
  }

  // If there are no assets, show a message and link to releases page
  if (!release.assets || release.assets.length === 0) {
    return (
      <Card className="mx-auto max-w-md border-zinc-700 bg-zinc-800">
        <CardContent className="p-6">
          <h3 className="mb-4 text-xl font-bold">{release.name}</h3>
          <p className="mb-6 text-sm text-zinc-400">
            Version {release.tag_name} | Released {new Date(release.published_at).toLocaleDateString()}
          </p>
          <Button
            size="lg"
            className="w-full gap-2 bg-blue-600 text-blue-50 hover:bg-blue-700"
            asChild
          >
            <a
              href={release.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-5 w-5" />
              <span className="slide-underline">View Release</span>
            </a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Find the build_output.zip file
  const buildOutput = release.assets.find(asset => asset.name === "build_output.zip")

  // If build_output.zip is not found, use the first asset
  const downloadAsset = buildOutput || release.assets[0]

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Card className="mx-auto max-w-md border-zinc-700 bg-zinc-800">
      <CardContent className="p-6">
        <h3 className="mb-4 text-xl font-bold">{release.name}</h3>
        <p className="mb-2 text-sm text-zinc-400">
          Version {release.tag_name} | Released {new Date(release.published_at).toLocaleDateString()}
        </p>
        <p className="mb-6 text-sm text-zinc-400">
          File size: {formatFileSize(downloadAsset.size)}
        </p>
        <Button
          size="lg"
          className="w-full gap-2 bg-blue-600 text-blue-50 hover:bg-blue-700"
          asChild
        >
          <a
            href={downloadAsset.browser_download_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="h-5 w-5" />
            <span className="slide-underline">Download Latest</span>
          </a>
        </Button>
      </CardContent>
    </Card>
  )
} 