"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import Authentication from './Authentication'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <svg
          className="absolute h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 1600 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <g fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2">
            <path d="M0 0l1600 0l0 800l-1600 0l0 -800Z" />
            <path d="M786 400l814 0l0 400l-1600 0l0 -400l786 0Z" />
            <path d="M1600 0l0 400l-1600 0l0 -400l1600 0Z" />
            <path d="M0 400l800 0l0 400l-800 0l0 -400Z" />
            <path d="M800 400l800 0l0 400l-800 0l0 -400Z" />
            <path d="M0 0l800 0l0 400l-800 0l0 -400Z" />
            <path d="M800 0l800 0l0 400l-800 0l0 -400Z" />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative">
        <div className="flex flex-col items-center justify-center space-y-10 text-center max-w-4xl mx-auto">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Ready to Transform Your SOP Management?
            </h2>
            <p className="mx-auto max-w-[800px] text-white/90 text-lg md:text-xl/relaxed">
              Join thousands of teams who have streamlined their documentation process with SOP Manager.
            </p>
          </div>
          <div className="flex flex-col gap-5 min-[400px]:flex-row">
            <Authentication>
              <Button size="lg" className="gap-1.5 bg-white hover:bg-white/90 text-primary px-8 py-7 h-auto font-medium text-base rounded-full">
                Get Started <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Authentication>
            <Link href="/explore">
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 px-8 py-7 h-auto font-medium text-base rounded-full">
                Explore Templates
              </Button>
            </Link>
          </div>
          <p className="text-white/80 font-medium">
            No credit card required. Start with our free plan today.
          </p>
        </div>
      </div>
    </section>
  )
}

export default CTA
