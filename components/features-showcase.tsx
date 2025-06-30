"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Globe,
  Zap,
  Lock,
  Signal,
  Monitor,
  Key,
  LayoutList,
  FolderOpen,
  Terminal,
  Keyboard,
  Shield,
  Network,
  Cpu,
  Settings,
  Camera,
  Mic,
  MessageSquare,
  Code,
} from "lucide-react"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"

interface Feature {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  category: "connectivity" | "security" | "management" | "monitoring" | "tools"
}

const features: Feature[] = [
  {
    id: "tcp-streams",
    icon: <Globe className="h-6 w-6" />,
    title: "TCP Network Streams",
    description: "IPv4 & IPv6 support for robust connectivity across networks",
    category: "connectivity",
  },
  {
    id: "serialization",
    icon: <Zap className="h-6 w-6" />,
    title: "Fast Serialization",
    description: "Uses Protocol Buffers for efficient data transfer",
    category: "connectivity",
  },
  {
    id: "encryption",
    icon: <Lock className="h-6 w-6" />,
    title: "Encrypted Communication",
    description: "Secure TLS encryption for all traffic",
    category: "security",
  },
  {
    id: "upnp",
    icon: <Signal className="h-6 w-6" />,
    title: "UPnP Support",
    description: "Automatic port forwarding for easy setup",
    category: "connectivity",
  },
  {
    id: "hvnc",
    icon: <Monitor className="h-6 w-6" />,
    title: "HVNC",
    description: "Hidden Virtual Network Computing for stealthy remote access",
    category: "management",
  },
  {
    id: "gatherer",
    icon: <Key className="h-6 w-6" />,
    title: "Kematian Gatherer",
    description: "Integrated credential recovery system",
    category: "security",
  },
  {
    id: "task-manager",
    icon: <LayoutList className="h-6 w-6" />,
    title: "Task Manager",
    description: "View and manage remote processes",
    category: "management",
  },
  {
    id: "file-manager",
    icon: <FolderOpen className="h-6 w-6" />,
    title: "File Manager",
    description: "Browse, upload, and download files remotely",
    category: "management",
  },
  {
    id: "remote-shell",
    icon: <Terminal className="h-6 w-6" />,
    title: "Remote Shell",
    description: "Command-line access to remote systems",
    category: "management",
  },
  {
    id: "keylogger",
    icon: <Keyboard className="h-6 w-6" />,
    title: "Keylogger",
    description: "Unicode-supporting keylogger for input monitoring",
    category: "monitoring",
  },
  {
    id: "proxy",
    icon: <Network className="h-6 w-6" />,
    title: "Reverse Proxy",
    description: "SOCKS5 proxy support for secure connections",
    category: "connectivity",
  },
  {
    id: "system-info",
    icon: <Cpu className="h-6 w-6" />,
    title: "System Information",
    description: "Gather detailed system information remotely",
    category: "monitoring",
  },
  {
    id: "registry",
    icon: <Settings className="h-6 w-6" />,
    title: "Registry Editor",
    description: "Edit the Windows registry remotely",
    category: "tools",
  },
  {
    id: "webcam",
    icon: <Camera className="h-6 w-6" />,
    title: "Webcam Capture",
    description: "Capture images from remote webcams",
    category: "tools",
  },
  {
    id: "microphone",
    icon: <Mic className="h-6 w-6" />,
    title: "Microphone Capture",
    description: "Record audio from remote microphones",
    category: "tools",
  },
  {
    id: "chat",
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Chat",
    description: "Real-time chat with remote users",
    category: "tools",
  },
  {
    id: "scripts",
    icon: <Code className="h-6 w-6" />,
    title: "Remote Script Execution",
    description: "Execute PowerShell, Batch, or custom scripts",
    category: "tools",
  },
  {
    id: "anti-vm",
    icon: <Shield className="h-6 w-6" />,
    title: "Anti-VM / Anti-Debug",
    description: "Evade analysis environments",
    category: "security",
  },
]

const categories = [
  { id: "all", label: "All Features" },
  { id: "connectivity", label: "Connectivity" },
  { id: "security", label: "Security" },
  { id: "management", label: "Management" },
  { id: "monitoring", label: "Monitoring" },
  { id: "tools", label: "Tools" },
]

export default function FeaturesShowcase() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  
  const { ref: featuresRef, isInView: featuresInView } = useInViewAnimation()

  const filteredFeatures =
    activeCategory === "all" ? features : features.filter((feature) => feature.category === activeCategory)

  return (
    <div className="space-y-10">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "px-4 py-2 text-sm md:text-base rounded-full transition-all",
              activeCategory === category.id
                ? "bg-blue-600 text-blue-50 shadow-lg"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200",
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" ref={featuresRef}>
        {filteredFeatures.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: featuresInView ? index * 0.1 : 0 }}
            className={cn(
              "group relative overflow-hidden rounded-lg border p-6 transition-all duration-300",
              hoveredFeature === feature.id || hoveredFeature === null
                ? "border-zinc-700 bg-zinc-800"
                : "border-zinc-800 bg-zinc-900 opacity-50",
            )}
            onMouseEnter={() => setHoveredFeature(feature.id)}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-700 group-hover:bg-zinc-600 transition-all duration-300">
                <div className="text-zinc-300 group-hover:text-blue-400 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] group-hover:filter">
                  {feature.icon}
                </div>
              </div>
              <h3 className="mb-2 text-lg font-bold group-hover:text-blue-100 transition-colors">{feature.title}</h3>
              <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
