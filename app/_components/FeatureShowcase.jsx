"use client"
import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { FileText, Users, Bot, Search, Lock, BarChart } from 'lucide-react'

function FeatureShowcase() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const features = [
    {
      title: "AI-Powered SOP Creation",
      description: "Create professional SOPs in minutes with our AI assistant that guides you through the process and suggests improvements.",
      icon: Bot,
      image: "/features/ai-assistant.png"
    },
    {
      title: "Collaborative Editing",
      description: "Work together with your team in real-time. Track changes, add comments, and manage approvals seamlessly.",
      icon: Users,
      image: "/features/collaboration.png"
    },
    {
      title: "Template Library",
      description: "Access hundreds of industry-specific templates to jumpstart your SOP creation process.",
      icon: FileText,
      image: "/features/templates.png"
    },
    {
      title: "Smart Search",
      description: "Find any information across all your SOPs instantly with our powerful semantic search capabilities.",
      icon: Search,
      image: "/features/search.png"
    },
    {
      title: "Security & Compliance",
      description: "Keep your SOPs secure with role-based access controls and maintain compliance with industry regulations.",
      icon: Lock,
      image: "/features/security.png"
    },
    {
      title: "Analytics & Insights",
      description: "Gain valuable insights into SOP usage, compliance, and team engagement through detailed analytics.",
      icon: BarChart,
      image: "/features/analytics.png"
    }
  ]

  const x = useTransform(scrollYProgress, [0, 1], [0, -100 * (features.length - 1)])

  return (
    <section className="py-16 overflow-hidden" ref={containerRef}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need for SOPs
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Powerful features designed to streamline your SOP management process from creation to distribution.
            </p>
          </div>
        </div>

        <div className="relative h-[500px] md:h-[600px] w-full">
          <div className="sticky top-0 flex h-[500px] md:h-[600px] items-center overflow-hidden">
            <motion.div 
              className="flex gap-8" 
              style={{ x }}
            >
              {features.map((feature, index) => (
                <Card key={index} className="flex-shrink-0 w-[300px] md:w-[400px] h-[450px] md:h-[550px] overflow-hidden">
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-md bg-primary/10">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-xl">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-6">{feature.description}</p>
                    <div className="mt-auto relative flex-1 w-full rounded-md overflow-hidden border">
                      <Image
                        src={feature.image || "/placeholder-feature.png"}
                        alt={feature.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureShowcase
