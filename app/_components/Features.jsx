"use client"
import React from 'react'
import Image from 'next/image'
import { Bot, FileText, Users, Search, Lock, BarChart } from 'lucide-react'

function Features() {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Assistant",
      description: "Our intelligent assistant helps you create, improve, and analyze SOPs with natural language processing."
    },
    {
      icon: FileText,
      title: "Template Library",
      description: "Access hundreds of industry-specific templates to jumpstart your SOP creation process."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time editing, comments, and approval workflows."
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Find any information across all your SOPs instantly with our powerful semantic search."
    },
    {
      icon: Lock,
      title: "Security & Compliance",
      description: "Keep your SOPs secure with role-based access controls and maintain regulatory compliance."
    },
    {
      icon: BarChart,
      title: "Analytics & Insights",
      description: "Gain valuable insights into SOP usage, compliance, and team engagement through detailed analytics."
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-primary">
              Powerful SOP Management
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl/relaxed">
              Everything you need to create, manage, and distribute Standard Operating Procedures effectively.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 pt-4">
          {features.map((feature, index) => (
            <div key={index} className="group flex flex-col items-center space-y-5 rounded-xl border border-border p-8 text-center bg-card hover:border-primary/50 transition-all shadow-sm hover:shadow-md relative overflow-hidden">
              <div className="relative w-full h-40 mb-2 rounded-lg overflow-hidden">
                <Image
                  src={`/images/features/feature-${index + 1}.jpg`}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-70"></div>
              </div>
              <div className="rounded-full border border-primary/30 p-4 bg-primary/5 text-primary -mt-12 relative z-10">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-primary">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
