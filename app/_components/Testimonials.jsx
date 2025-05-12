"use client"
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { StarIcon } from 'lucide-react'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900']
})

function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Operations Manager",
      company: "TechCorp Inc.",
      image: "/images/testimonials/person-1.jpg",
      content: "SOP Manager has transformed how we create and maintain our procedures. The AI assistant is incredibly helpful for drafting and improving our documentation. It's cut our SOP creation time in half!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Quality Assurance Director",
      company: "HealthPlus",
      image: "/images/testimonials/person-2.jpg",
      content: "As a healthcare provider, we need precise and compliant SOPs. This platform makes it easy to create, update, and distribute procedures to our staff. The template library saved us countless hours.",
      rating: 5
    },
    {
      name: "Jessica Williams",
      role: "HR Manager",
      company: "Global Logistics",
      image: "/images/testimonials/person-3.jpg",
      content: "The collaboration features are outstanding. Our team can work together on SOPs in real-time, with version control and approval workflows. It's exactly what we needed for our growing company.",
      rating: 4
    },
    {
      name: "David Rodriguez",
      role: "IT Director",
      company: "Secure Solutions",
      image: "/images/testimonials/person-4.jpg",
      content: "Security was our main concern, and SOP Manager exceeded our expectations. The platform's compliance features and access controls give us peace of mind while streamlining our documentation process.",
      rating: 5
    }
  ]

  return (
    <section className="bg-primary py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm text-white font-medium">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white">
              Trusted by Teams Worldwide
            </h2>
            <p className="mx-auto max-w-[700px] text-white/90 text-lg md:text-xl/relaxed">
              See what our customers have to say about how SOP Manager has transformed their documentation processes.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10 pt-4">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden border border-purple-200 bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:border-purple-300 group">
              <CardContent className="p-8">
                <div className="flex items-start gap-5">
                  <Avatar className="h-14 w-14 border-2 border-purple-300 shadow-sm">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-purple-100 text-purple-700 text-lg font-medium">{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className={`font-bold text-purple-900 text-lg ${playfair.className}`}>{testimonial.name}</div>
                    <div className="text-sm text-purple-600 font-medium">
                      {testimonial.role}, {testimonial.company}
                    </div>
                    <div className="flex items-center gap-1 pt-1.5">
                      {Array(5).fill(0).map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? 'fill-purple-500 text-purple-500' : 'fill-purple-200 text-purple-200'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className={`mt-6 text-lg leading-relaxed text-purple-700 italic ${playfair.className} font-medium`}>
                  "{testimonial.content}"
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
