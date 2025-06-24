import { Card, CardContent } from "@/components/ui/card"

interface CodeBlockProps {
  code: string
}

export default function CodeBlock({ code }: CodeBlockProps) {
  return (
    <Card className="border-zinc-700 bg-zinc-800">
      <CardContent className="p-0">
        <pre className="overflow-x-auto p-4 text-sm text-zinc-300">
          <code>{code}</code>
        </pre>
      </CardContent>
    </Card>
  )
}
