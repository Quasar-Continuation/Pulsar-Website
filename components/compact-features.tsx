"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Globe,
  Zap,
  Lock,
  Monitor,
  Terminal,
  Shield,
  Network,
  Camera,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInViewAnimation } from "@/hooks/use-in-view-animation"

interface Feature {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  color: string
  accent: string
}

const features: Feature[] = [
  {
    id: "tcp-streams",
    icon: <Globe className="h-6 w-6" />,
    title: "TCP Network Streams",
    description: "IPv4 & IPv6 support for robust connectivity",
    color: "from-blue-500 to-cyan-400",
    accent: "border-blue-500/30",
  },
  {
    id: "serialization",
    icon: <Zap className="h-6 w-6" />,
    title: "Fast Serialization",
    description: "Protocol Buffers for lightning-fast data transfer",
    color: "from-yellow-500 to-orange-400",
    accent: "border-yellow-500/30",
  },
  {
    id: "encryption",
    icon: <Lock className="h-6 w-6" />,
    title: "TLS Encryption",
    description: "End-to-end encryption for secure connections",
    color: "from-green-500 to-emerald-400",
    accent: "border-green-500/30",
  },
  {
    id: "monitoring",
    icon: <Monitor className="h-6 w-6" />,
    title: "HVNC Monitoring",
    description: "Hidden VNC for stealthy remote access",
    color: "from-purple-500 to-violet-400",
    accent: "border-purple-500/30",
  },
  {
    id: "terminal",
    icon: <Terminal className="h-6 w-6" />,
    title: "Remote Terminal",
    description: "Full command-line access and control",
    color: "from-indigo-500 to-blue-400",
    accent: "border-indigo-500/30",
  },
  {
    id: "security",
    icon: <Shield className="h-6 w-6" />,
    title: "WinRE Survival",
    description: "Multi-layer protection and authentication",
    color: "from-red-500 to-pink-400",
    accent: "border-red-500/30",
  },
  {
    id: "network",
    icon: <Network className="h-6 w-6" />,
    title: "Optimized Quasar Networking",
    description: "Overhauled quasar networking for performance",
    color: "from-teal-500 to-cyan-400",
    accent: "border-teal-500/30",
  },
  {
    id: "surveillance",
    icon: <Camera className="h-6 w-6" />,
    title: "Remote Surveillance",
    description: "Webcam, Remote Desktop (GPU And CPU), HVNC, Virtual Monitor and more to come",
    color: "from-pink-500 to-rose-400",
    accent: "border-pink-500/30",
  },
  {
    id: "hvnc",
    icon: <Eye className="h-6 w-6" />,
    title: "HVNC (Hidden VNC)",
    description: "Invisible remote desktop access and control",
    color: "from-violet-500 to-purple-400",
    accent: "border-violet-500/30",
  },
]

export default function CompactFeaturesShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedFeature, setSelectedFeature] = useState(features[0])
  
  const { ref: mobileRef, isInView: mobileInView } = useInViewAnimation()
  const { ref: desktopRef, isInView: desktopInView } = useInViewAnimation()

  const nextFeature = () => {
    const newIndex = (currentIndex + 1) % features.length
    setCurrentIndex(newIndex)
    setSelectedFeature(features[newIndex])
  }

  const prevFeature = () => {
    const newIndex = (currentIndex - 1 + features.length) % features.length
    setCurrentIndex(newIndex)
    setSelectedFeature(features[newIndex])
  }

  const selectFeature = (index: number) => {
    setCurrentIndex(index)
    setSelectedFeature(features[index])
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Mobile Carousel View */}
      <div className="block md:hidden" ref={mobileRef}>
        <div className="relative">
          {/* Featured Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFeature.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "neon-card feature-card relative overflow-hidden rounded-2xl p-6 mb-6",
                selectedFeature.accent
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br",
                  selectedFeature.color,
                  "text-white shadow-lg"
                )}>
                  {selectedFeature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {selectedFeature.title}
                  </h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {selectedFeature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevFeature}
              className="neon-button"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => selectFeature(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-200",
                    index === currentIndex
                      ? "bg-cyan-400 w-6"
                      : "bg-zinc-600 hover:bg-zinc-500"
                  )}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextFeature}
              className="neon-button"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Grid View - Show All Features */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6" ref={desktopRef}>
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: desktopInView ? index * 0.1 : 0 }}
            className={cn(
              "neon-card feature-card group relative overflow-hidden rounded-2xl p-6 hover:scale-105 transition-all duration-300",
              feature.accent,
              "float-animation"
            )}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="relative z-10">
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br mb-4",
                feature.color,
                "text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
              )}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:glow-text transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
