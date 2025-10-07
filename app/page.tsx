"use client"

import Link from "next/link"
import { ArrowRight, Download, Send, Star, Zap, Shield, Globe, Sparkles, Copy, Heart } from "lucide-react"
import { FaBitcoin, FaMonero } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ModernHeader from "@/components/modern-header"
import CompactFeaturesShowcase from "@/components/compact-features"
import ScreenshotGallery from "@/components/screenshot-gallery"
import GitHubLatestRelease from "@/components/github-latest-release"
import ModernFooter from "@/components/modern-footer"
import { useState, useEffect } from "react"

export default function Home() {
  const [isDownloading, setIsDownloading] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  useEffect(() => {
    const settings = {
      totalMeteors: 18,
      angle: 42,
      speedRange: [0.8, 2.0],
      sizeRange: [0.5, 1.4],
      lengthRange: [20, 40],
      color: '255, 255, 255',
      opacity: 0.78,
      fadeTriggerRatio: 0.5,
      fadeRate: 0.02,
      leftSpawnOffset: 200,
      boostChance: 0.2,
      boostSpeedRange: [2, 3],
    };

    const container = document.querySelector('.meteor-container');
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = `-${settings.leftSpawnOffset}px`;
    canvas.style.width = `calc(100% + ${settings.leftSpawnOffset}px)`;
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let canvasWidth, canvasHeight;

    function updateCanvasSize() {
      const rect = container.getBoundingClientRect();
      canvasWidth = rect.width + settings.leftSpawnOffset;
      canvasHeight = rect.height;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    class ShootingStar {
      constructor() {
        this.init();
      }

      init() {
        const fromLeft = Math.random() < 0.5;
        this.x = fromLeft
          ? Math.random() * -settings.leftSpawnOffset
          : Math.random() * canvasWidth;
        this.y = fromLeft
          ? Math.random() * canvasHeight
          : -50;

        const [minSpeed, maxSpeed] = settings.speedRange;
        const [minSize, maxSize] = settings.sizeRange;
        const [minLength, maxLength] = settings.lengthRange;

        let speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;

        if (Math.random() < settings.boostChance) {
          const [boostMin, boostMax] = settings.boostSpeedRange;
          speed += Math.random() * (boostMax - boostMin) + boostMin;
        }

        this.length = Math.random() * (maxLength - minLength) + minLength;
        this.size = Math.random() * (maxSize - minSize) + minSize;
        this.speed = speed;
        this.angle = settings.angle * (Math.PI / 180);
        this.opacity = 1;

        this.originX = this.x;
        this.originY = this.y;
        this.maxTravel = Math.sqrt(canvasWidth ** 2 + canvasHeight ** 2);
        this.fadeStart = this.maxTravel * (
          settings.fadeTriggerRatio +
          Math.random() * (1 - settings.fadeTriggerRatio)
        );
        this.distanceTravelled = 0;
      }

      move() {
        const dx = Math.cos(this.angle) * this.speed;
        const dy = Math.sin(this.angle) * this.speed;

        this.x += dx;
        this.y += dy;
        this.distanceTravelled += Math.sqrt(dx ** 2 + dy ** 2);

        if (this.distanceTravelled > this.fadeStart) {
          this.opacity -= settings.fadeRate;
        }

        if (this.opacity <= 0 || this.x > canvasWidth + 100 || this.y > canvasHeight + 100) {
          this.init();
        }
      }

      render(ctx) {
        const endX = this.x - this.length * Math.cos(this.angle);
        const endY = this.y - this.length * Math.sin(this.angle);
        const perpendicular = this.angle + Math.PI / 2;
        const halfSize = this.size / 2;

        ctx.save();

        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(
          this.x + halfSize * Math.cos(perpendicular),
          this.y + halfSize * Math.sin(perpendicular)
        );
        ctx.lineTo(
          this.x - halfSize * Math.cos(perpendicular),
          this.y - halfSize * Math.sin(perpendicular)
        );
        ctx.closePath();
        ctx.fillStyle = `rgba(${settings.color}, ${this.opacity * 0.5 * settings.opacity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${settings.color}, ${this.opacity * settings.opacity})`;
        ctx.fill();

        ctx.restore();
      }
    }

    const stars = Array.from({ length: settings.totalMeteors }, () => new ShootingStar());

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) {
        star.move();
        star.render(ctx);
      }
      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const downloadUrl = "https://gitlab.ratting.ru/pulsar/pulsar/-/jobs/artifacts/main/raw/build_output.zip?job=build"
      window.open(downloadUrl, "_blank")
    } catch (error) {
      console.error("Failed to initiate download:", error)
      window.open("https://gitlab.ratting.ru/pulsar/pulsar", "_blank")
    } finally {
      setIsDownloading(false)
    }
  }

  const copyToClipboard = async (address: string, type: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(type)
      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const stats = [
    { icon: <Download className="h-5 w-5" />, value: "50K+", label: "Downloads" },
    { icon: <Star className="h-5 w-5" />, value: "60 fps", label: "Remote Desktop" },
    { icon: <Shield className="h-5 w-5" />, value: "256-bit", label: "Encryption" },
    { icon: <Zap className="h-5 w-5" />, value: "<10ms", label: "Latency" },
  ]

  return (
    <div className="min-h-screen text-zinc-100 overflow-x-hidden">
      {/* Navigation */}
      <ModernHeader />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center gradient-bg">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden meteor-container">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }}></div>
        </div>

        <div className="container relative z-10 px-4">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium">Next-Gen Remote Administration</span>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="hero-pulsar">Pulsar</span>
            </h1>
            
            {/* Subtitle */}
            <p className="mb-8 text-lg md:text-xl lg:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              Experience the future of remote system management with{" "}
              <span className="glow-text font-semibold">lightning-fast performance</span>,{" "}
              <span className="glow-text font-semibold">military-grade security</span>, and{" "}
              <span className="glow-text font-semibold">intuitive controls</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                className="neon-button bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white border-0 text-lg px-8 py-6 w-full sm:w-auto"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                <Download className="h-5 w-5 mr-2" />
                <span className="slide-underline">Download Free</span>
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="neon-button text-lg px-8 py-6 w-full sm:w-auto"
                asChild
              >
                <a
                  href="https://gitlab.ratting.ru/pulsar/pulsar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Globe className="h-5 w-5" />
                  <span className="slide-underline">View Source</span>
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="neon-card p-4 text-center float-animation"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center justify-center mb-2 text-cyan-400">
                    {stat.icon}
                  </div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Community Link */}
            <div className="mt-8">
              <Link
                href="https://t.me/novashadowisgay"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Send className="h-4 w-4" />
                <span className="slide-underline">Join the Telegram</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 relative">
        <div className="container relative px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="glow-text">Powerful Features</span>
            </h2>
            <p className="text-lg text-zinc-400">
              Everything you need for secure and efficient remote administration
            </p>
          </div>
          <CompactFeaturesShowcase />
        </div>
      </section>

      {/* Screenshots Section */}
      <section id="showcase" className="py-16 md:py-24 bg-black/20">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="glow-text">See It in Action</span>
            </h2>
            <p className="text-lg text-zinc-400">
              Explore Pulsar's intuitive interface and powerful capabilities
            </p>
          </div>
          <ScreenshotGallery />
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-16 md:py-24 relative overflow-hidden">
        <div className="container relative z-10 px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="glow-text">Ready to Get Started?</span>
            </h2>
            <p className="text-lg text-zinc-400 mb-8">
              Download the latest version and experience the future of remote administration
            </p>
            <GitHubLatestRelease 
              owner="Quasar-Continuation"
              repo="Poopsar"
            />
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="glow-text">Quick Start</span>
              </h2>
              <p className="text-lg text-zinc-400">
                Get up and running in just 3 simple steps
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Download & Extract",
                  description: "Get the latest release and extract files to your preferred location",
                  color: "from-blue-500 to-cyan-400"
                },
                {
                  step: "02", 
                  title: "Configure Settings",
                  description: "Use the built-in client builder to customize your configuration",
                  color: "from-purple-500 to-pink-400"
                },
                {
                  step: "03",
                  title: "Connect & Manage",
                  description: "Start managing remote systems with advanced security features",
                  color: "from-green-500 to-emerald-400"
                }
              ].map((item, index) => (
                <Card
                  key={index}
                  className="neon-card feature-card float-animation"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${item.color} text-white font-bold text-xl mb-4`}>
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-zinc-300">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
              <p className="text-sm text-yellow-200 text-center">
                <strong>⚠️ Important:</strong> Pulsar is designed for legitimate administrative and educational purposes only. 
                Always ensure you have proper authorization before accessing any system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Contributors Section */}
      <section id="contributors" className="py-16 md:py-24 bg-black/20">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="glow-text">Key Contributors</span>
            </h2>
            <p className="text-lg text-zinc-400">
              Meet the talented developers who make Pulsar possible
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "KDot",
                role: "Owner",
                bio: "Me fr",
                image: "/dev/kdot.jpg",
                skills: ["Obfuscation", "Python", "Security", "C#", "Virtualization", "Administration"]
              },
              {
                name: "Twobit",
                role: "Lead Developer", 
                bio: "Added Auto Tasks, Crypto Clipper, Remote Chat, Remote Scripting",
                image: "/dev/twobit.jpg",
                skills: ["Cryptography", "Network Security", "Pentesting"]
              },
              {
                name: "Deadman",
                role: "Lead Developer",
                bio: "Added shellcode loading, memory dumping and many ideas",
                image: "/dev/deadman.jpg",
                skills: ["Design", "Security", "C#", "Project Design", "UI/UX", "Winforms"]
              },
              {
                name: "Cpores",
                role: "Some guy, idrk",
                bio: "Worked on the majority of Kematian, other random stuff too",
                image: "/dev/none.jpg",
                skills: ["None smh"]
              }
            ].map((contributor, index) => (
              <Card
                key={index}
                className="neon-card hover-glow float-animation"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4 ring-2 ring-cyan-400/50">
                    <AvatarImage 
                      src={contributor.image} 
                      alt={contributor.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg font-bold">
                      {contributor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h3 className="text-xl font-bold text-white mb-1">{contributor.name}</h3>
                  <p className="text-cyan-400 text-sm font-medium mb-3">{contributor.role}</p>
                  <p className="text-zinc-300 text-sm mb-4 leading-relaxed">{contributor.bio}</p>
                  
                  <div className="flex flex-wrap justify-center gap-2">
                    {contributor.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 text-xs bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-zinc-400">
              Want to contribute? Check out our{" "}
              <a
                href="https://gitlab.ratting.ru/pulsar/pulsar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors underline"
              >
                GitLab repository
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Donations Section */}
      <section className="py-16 md:py-24 bg-black/20">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="glow-text">Support Development</span>
            </h2>
            <p className="text-lg text-zinc-400">
              Help us continue developing and improving Pulsar with your donations
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-6">
            {/* Bitcoin Donation */}
            <Card className="neon-card hover-glow">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold text-2xl mb-4">
                    <FaBitcoin className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Bitcoin (BTC)</h3>
                </div>
                <div className="bg-black/40 rounded-lg p-4 mb-4">
                  <p className="text-xs text-zinc-300 font-mono break-all leading-relaxed">
                    bc1q0q4e6mtrtqct7xvmv6hcucaaljn5j3djaxf3p4
                  </p>
                </div>
                <Button
                  onClick={() => copyToClipboard("bc1q0q4e6mtrtqct7xvmv6hcucaaljn5j3djaxf3p4", "btc")}
                  className="w-full bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-white border-0"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copiedAddress === "btc" ? "Copied!" : "Copy Address"}
                </Button>
              </CardContent>
            </Card>

            {/* Monero Donation */}
            <Card className="neon-card hover-glow">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-600 to-red-500 text-white font-bold text-2xl mb-4">
                    <FaMonero className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Monero (XMR)</h3>
                </div>
                <div className="bg-black/40 rounded-lg p-4 mb-4">
                  <p className="text-xs text-zinc-300 font-mono break-all leading-relaxed">
                    8Ao3U16N9mTAXRTexBsS9QWrS742Yzxj7A7yk23dEqjG7wANXxuaiizNC5Bo4k8UttPBjfCpAfSfmcSbkaWX46vs7uwCzMz
                  </p>
                </div>
                <Button
                  onClick={() => copyToClipboard("8Ao3U16N9mTAXRTexBsS9QWrS742Yzxj7A7yk23dEqjG7wANXxuaiizNC5Bo4k8UttPBjfCpAfSfmcSbkaWX46vs7uwCzMz", "xmr")}
                  className="w-full bg-gradient-to-r from-orange-700 to-red-600 hover:from-orange-600 hover:to-red-500 text-white border-0"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copiedAddress === "xmr" ? "Copied!" : "Copy Address"}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-zinc-400 flex items-center justify-center gap-2">
              <Heart className="h-4 w-4 text-red-400" />
              Your support helps keep Pulsar free and open source
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <ModernFooter />
    </div>
  )
}
