import { Button } from '@/components/ui/button'
import React from 'react'
import Authentication from './Authentication'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

function Hero() {
    return (
        <div className="relative overflow-hidden bg-primary pb-24 pt-16">
            {/* Background gradient effect */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[40%] top-0 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/60 to-transparent opacity-40 blur-3xl"></div>
                <div className="absolute right-[40%] top-[30%] h-[1000px] w-[1000px] rounded-full bg-gradient-to-b from-primary/30 to-transparent opacity-30 blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <div className="grid gap-16 lg:grid-cols-2 lg:gap-12 xl:gap-20 items-center">
                    {/* Left column - Text content */}
                    <div className="flex flex-col justify-center space-y-8 max-w-2xl mx-auto lg:mx-0">
                        <div className="space-y-6 text-center lg:text-left">
                            <div className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm text-white font-medium">
                                Introducing SOP Manager
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
                                AI-Powered SOP Management
                            </h1>
                            <p className="text-white/90 text-lg md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed max-w-[600px] mx-auto lg:mx-0">
                                Manage your Standard Operating Procedures with clarity, speed, and security.
                                Create, update, and share SOPs with your team effortlessly.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center lg:justify-start">
                            <Authentication>
                                <Button size="lg" className="gap-1.5 bg-white hover:bg-white/90 text-primary px-6 py-6 h-auto font-medium text-base">
                                    Get Started <ArrowRight className="h-4 w-4 ml-1" />
                                </Button>
                            </Authentication>
                            <Link href="/explore">
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-6 h-auto font-medium text-base">
                                    Explore Templates
                                </Button>
                            </Link>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3 justify-center lg:justify-start mx-auto lg:mx-0">
                            <div className="flex items-center gap-2.5">
                                <CheckCircle2 className="h-5 w-5 text-white" />
                                <span className="text-white font-medium">AI-Powered</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <CheckCircle2 className="h-5 w-5 text-white" />
                                <span className="text-white font-medium">Team Collaboration</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <CheckCircle2 className="h-5 w-5 text-white" />
                                <span className="text-white font-medium">Secure & Compliant</span>
                            </div>
                        </div>
                    </div>

                    {/* Right column - Image */}
                    <div className="flex items-center justify-center">
                        <div className="relative h-[450px] w-full max-w-[550px] rounded-xl border-2 border-white/20 bg-white/5 p-3 shadow-xl backdrop-blur-sm">
                            <div className="absolute left-0 top-0 h-2.5 w-full rounded-t-lg bg-gradient-to-r from-primary to-blue-400"></div>
                            <div className="flex h-7 items-center gap-2 px-3">
                                <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                                <div className="ml-3 h-4 w-[70%] rounded-full bg-white/20"></div>
                            </div>
                            <div className="mt-3 h-[calc(100%-2.75rem)] w-full overflow-hidden rounded-md shadow-inner">
                                <Image
                                    src="/images/hero/hero-image.jpg"
                                    alt="SOP Manager Dashboard"
                                    width={550}
                                    height={430}
                                    className="h-full w-full object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero