"use client"

import { Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface GitLabLatestBuildProps {
  projectUrl: string
  artifactUrl: string
}

export default function GitLabLatestBuild({ projectUrl, artifactUrl }: GitLabLatestBuildProps) {
  const handleDownload = () => {
    window.open(artifactUrl, "_blank")
  }

  return (
    <Card className="mx-auto max-w-md border-zinc-700 bg-zinc-800">
      <CardContent className="p-6">
        <h3 className="mb-4 text-xl font-bold">Latest Build</h3>
        <p className="mb-2 text-sm text-zinc-400">
          Automatically built from main branch
        </p>
        <p className="mb-6 text-sm text-zinc-400">
          Built using GitLab CI/CD pipeline
        </p>
        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full gap-2 bg-blue-600 text-blue-50 hover:bg-blue-700"
            onClick={handleDownload}
          >
            <Download className="h-5 w-5" />
            <span className="slide-underline">Download Latest Build</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-full gap-2 border-zinc-700 text-zinc-300 hover:bg-zinc-700"
            asChild
          >
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project on GitLab
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
