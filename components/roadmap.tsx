import { Check, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface RoadmapItemProps {
  title: string
  description: string
  status: "completed" | "in-progress" | "planned"
}

const RoadmapItem = ({ title, description, status }: RoadmapItemProps) => {
  return (
    <div className="flex">
      <div className="mr-4 flex flex-col items-center">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
            status === "completed"
              ? "border-green-500 bg-green-500/20"
              : status === "in-progress"
                ? "border-amber-500 bg-amber-500/20"
                : "border-zinc-600 bg-zinc-600/20"
          }`}
        >
          {status === "completed" ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <Clock className="h-5 w-5 text-zinc-400" />
          )}
        </div>
        <div className="h-full w-0.5 bg-zinc-700"></div>
      </div>
      <div className="mb-10 w-full">
        <div className="mb-2">
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <Card className="border-zinc-700 bg-zinc-800">
          <CardContent className="p-4">
            <p className="text-sm text-zinc-400">{description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function Roadmap() {
  const roadmapItems: RoadmapItemProps[] = [
    {
      title: "Web API",
      description:
        "A web API (e.g. REST-like) allows to interact with the clients in more flexible ways and can be used to build a web interface for Pulsar.",
      status: "planned",
    },
    {
      title: "Transparent Communication Protocol",
      description:
        "To open up the way for Pulsar clients in different programming languages the communication protocol needs to be clearly specified and documented.",
      status: "in-progress",
    },
    {
      title: "Cross-Platform Support",
      description:
        "A long-term goal is to support operating systems such as MacOS and Linux. The new .NET Core framework will help achieve this goal.",
      status: "planned",
    },
    {
      title: "Command Line (CLI) Version of the Server",
      description:
        "It should be possible to use the server as a simple CLI tool to accept and forward (proxy) connections to other servers.",
      status: "planned",
    },
    {
      title: "GUI Overhaul",
      description:
        "The GUI needs to be reworked in a more modern way, such as WPF or a web-based interface. WPF as GUI framework would drastically improve rendering performance of the remote desktop with the hardware accelerated rendering, similar to a web-based GUI depending on the used browser.",
      status: "in-progress",
    },
    {
      title: "Allow Different Types of Clients (Permissioned Clients)",
      description:
        "Allow clients with higher privileges (i.e. ability to administrate other lower privileged clients) connect to the server. This change would allow administrators to manage clients from their own computers with a lightweight client without having to run the server.",
      status: "planned",
    },
    {
      title: "Allow Client Installation as Windows Service",
      description:
        "Currently the client is installed on a per-user basis and this makes it unflexible to remotly manage the machine when the user is not logged in. It also requires the client to be installed for every account who uses the machine. Machines which are used by multiple users would greatly benefit when Pulsar could be run as a Windows service.",
      status: "planned",
    },
    {
      title: "Basic Client GUI",
      description:
        "Add a basic GUI to the client to allow the user at any time to check the status if a specific feature is active. Additionally it can show a notification when the client gets installed or when someone requests permission to use remote desktop (similar to teamviewer).",
      status: "planned",
    },
    {
      title: "Password Recovery Enhancement",
      description:
        "Add Browser Scraping so passwords don't have to have predefined paths for each file, making credential recovery more flexible and comprehensive.",
      status: "in-progress",
    },
  ]

  return (
    <div className="space-y-4">
      {roadmapItems.map((item, index) => (
        <RoadmapItem key={index} {...item} />
      ))}
      <div className="flex justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-zinc-600 bg-zinc-800">
          <span className="text-sm font-bold">...</span>
        </div>
      </div>
    </div>
  )
}
