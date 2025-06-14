"use client"

import { useState } from "react"
import Image from "next/image"
import { Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const screenshots = [
  {
    id: 1,
    title: "Remote Shell",
    src: "/placeholder.svg?height=720&width=1280",
    alt: "Pulsar Remote Shell interface",
  },
  {
    id: 2,
    title: "Remote Desktop",
    src: "/placeholder.svg?height=720&width=1280",
    alt: "Pulsar Remote Desktop interface",
  },
  {
    id: 3,
    title: "File Manager",
    src: "/placeholder.svg?height=720&width=1280",
    alt: "Pulsar File Manager interface",
  },
  {
    id: 4,
    title: "Task Manager",
    src: "/placeholder.svg?height=720&width=1280",
    alt: "Pulsar Task Manager interface",
  },
  {
    id: 5,
    title: "Registry Editor",
    src: "/placeholder.svg?height=720&width=1280",
    alt: "Pulsar Registry Editor interface",
  },
  {
    id: 6,
    title: "Keylogger",
    src: "/placeholder.svg?height=720&width=1280",
    alt: "Pulsar Keylogger interface",
  },
]

export default function ScreenshotGallery() {
  const [isOpen, setIsOpen] = useState(false)
  const [fullscreenImage, setFullscreenImage] = useState<number | null>(null)

  const openFullscreen = (index: number) => {
    setFullscreenImage(index)
    setIsOpen(true)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {screenshots.map((screenshot, index) => (
        <div key={screenshot.id} className="group relative overflow-hidden border border-zinc-700 rounded-lg">
          <div className="relative aspect-video">
            <Image
              src={screenshot.src || "/placeholder.svg"}
              alt={screenshot.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Button
              variant="outline"
              size="icon"
              onClick={() => openFullscreen(index)}
              className="absolute top-4 right-4 h-10 w-10 rounded-full border-zinc-600 bg-zinc-800/70 backdrop-blur-sm hover:bg-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Maximize2 className="h-5 w-5" />
              <span className="sr-only">View fullscreen</span>
            </Button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-lg font-bold">{screenshot.title}</h3>
            </div>
          </div>
        </div>
      ))}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl bg-zinc-900 border-zinc-700">
          {fullscreenImage !== null && (
            <div className="relative aspect-video">
              <Image
                src={screenshots[fullscreenImage].src || "/placeholder.svg"}
                alt={screenshots[fullscreenImage].alt}
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
