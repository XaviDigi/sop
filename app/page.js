import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import Testimonials from "./_components/Testimonials";
import CTA from "./_components/CTA";
import Footer from "./_components/Footer";
import { Search, Shield, Users, Zap, MessageSquare, Bell, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Pricing Section */}
      <div className="py-24 px-4 md:px-6 bg-muted">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary font-medium">
                Pricing
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-primary">
                Simple, Transparent Pricing
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl/relaxed">
                Choose the plan that's right for your team. All plans include a 14-day free trial.
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3 pt-16">
            <PricingCard
              title="Starter"
              price="$9"
              description="Perfect for small teams just getting started with SOPs."
              features={[
                "Up to 50 SOPs",
                "5 team members",
                "Basic search",
                "Email support"
              ]}
              buttonText="Get Started"
              highlighted={false}
            />
            <PricingCard
              title="Professional"
              price="$29"
              description="For growing teams that need more advanced features."
              features={[
                "Unlimited SOPs",
                "20 team members",
                "Advanced AI search",
                "Chat interface",
                "Priority support"
              ]}
              buttonText="Get Started"
              highlighted={true}
            />
            <PricingCard
              title="Enterprise"
              price="$99"
              description="For large organizations with complex needs."
              features={[
                "Unlimited SOPs",
                "Unlimited team members",
                "Advanced AI search",
                "Chat interface",
                "Custom integrations",
                "Dedicated support"
              ]}
              buttonText="Contact Sales"
              highlighted={false}
            />
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function PricingCard({ title, price, description, features, buttonText, highlighted }) {
  return (
    <div className={`flex flex-col p-6 rounded-lg border ${
      highlighted
        ? 'border-primary bg-white shadow-lg relative overflow-hidden'
        : 'bg-card hover:border-primary/50 transition-colors border-border'
    }`}>
      {highlighted && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
            Most Popular
          </div>
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2 text-primary">{title}</h3>
      <div className="flex items-baseline mb-4">
        <span className="text-4xl font-bold text-primary">{price}</span>
        <span className="text-muted-foreground ml-1">/month</span>
      </div>
      <p className="text-muted-foreground mb-6">{description}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-foreground/90">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        className={`w-full ${highlighted ? 'bg-primary hover:bg-primary/90 text-white' : 'border-primary text-primary hover:bg-primary/10'}`}
        variant={highlighted ? "default" : "outline"}
        size="lg"
      >
        {buttonText}
      </Button>
    </div>
  );
}
