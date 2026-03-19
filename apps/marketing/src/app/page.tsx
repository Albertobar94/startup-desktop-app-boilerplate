import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@acme/ui";
import { BarChart3, Globe, Lock, Shield, Users, Zap } from "lucide-react";
import type { ReactElement } from "react";

const FEATURES = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built on modern technology for instant startup and blazing performance.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "End-to-end encryption and SOC 2 compliance keep your data safe.",
  },
  {
    icon: Globe,
    title: "Cross-Platform",
    description:
      "Works seamlessly on macOS, Windows, and Linux with native performance.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "Your data stays on your device. No tracking, no telemetry, no compromise.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Real-time insights and reporting to help your team make better decisions.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Built-in collaboration tools that keep your team in sync effortlessly.",
  },
] as const;

export default function HomePage(): ReactElement {
  return (
    <>
      <Header />

      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Build faster with <span className="text-primary">Acme</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          The modern desktop application for teams who ship. Powerful features,
          beautiful interface, and rock-solid reliability — all in one app.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Button size="lg">Download for Free</Button>
          <Button variant="outline" size="lg">
            View on GitHub
          </Button>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything your team needs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Designed for modern teams who need powerful tools without the
            complexity.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted/50 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of teams already building faster with Acme. Free to
            use, forever.
          </p>
          <div className="mt-10">
            <Button size="lg">Download Acme</Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
