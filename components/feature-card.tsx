import type { LucideIcon } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  // Dynamically get the icon from Lucide
  const Icon = LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon

  return (
    <Card className="border-zinc-700 bg-zinc-800 hover:bg-zinc-750 transition-colors">
      <CardContent className="p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-700">
          {Icon && <Icon className="h-6 w-6" />}
        </div>
        <h3 className="mb-2 text-lg font-bold">{title}</h3>
        <p className="text-sm text-zinc-400">{description}</p>
      </CardContent>
    </Card>
  )
}
