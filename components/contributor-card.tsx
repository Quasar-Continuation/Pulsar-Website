import { User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ContributorCardProps {
  name: string
  role: string
  avatarUrl?: string
}

export default function ContributorCard({ name, role, avatarUrl }: ContributorCardProps) {
  return (
    <Card className="border-zinc-700 bg-zinc-800 hover:bg-zinc-750 transition-colors">
      <CardContent className="p-6 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-700">
          {avatarUrl ? (
            <img src={avatarUrl || "/placeholder.png"} alt={name} className="h-12 w-12 rounded-full" />
          ) : (
            <User className="h-6 w-6" />
          )}
        </div>
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-sm text-zinc-400">{role}</p>
        </div>
      </CardContent>
    </Card>
  )
}
