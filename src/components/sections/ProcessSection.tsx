import { Calendar, FileText, Code, Users, Clock } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { FadeIn } from "@/components/ui/motion-elements";

const processData = [
  {
    id: 1,
    title: "Discovery",
    date: "Week 1",
    content: "We dive deep into understanding your brand, goals, and target audience through comprehensive research.",
    category: "Strategy",
    icon: Calendar,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Strategy",
    date: "Week 2",
    content: "Developing a tailored digital marketing strategy based on data-driven insights.",
    category: "Planning",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Execution",
    date: "Week 3-4",
    content: "Implementing campaigns across all channels with precision and creativity.",
    category: "Development",
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 70,
  },
  {
    id: 4,
    title: "Optimization",
    date: "Ongoing",
    content: "Continuous monitoring and optimization to maximize your ROI.",
    category: "Analysis",
    icon: Users,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 50,
  },
  {
    id: 5,
    title: "Growth",
    date: "Month 2+",
    content: "Scaling successful strategies and exploring new opportunities for expansion.",
    category: "Expansion",
    icon: Clock,
    relatedIds: [4],
    status: "pending" as const,
    energy: 30,
  },
];

const ProcessSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-card/30" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <FadeIn className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary glow-text">
            Our Process
          </span>
          <h2 className="heading-lg mt-4">
            How We <span className="gradient-text">Transform Brands</span>
          </h2>
          <p className="body-lg mx-auto mt-4 max-w-2xl">
            A proven methodology that delivers consistent results for our clients.
          </p>
        </FadeIn>

        {/* Desktop orbital timeline */}
        <div className="hidden md:block">
          <RadialOrbitalTimeline timelineData={processData} />
        </div>

        {/* Mobile linear process */}
        <div className="md:hidden space-y-6">
          {processData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="relative flex gap-4 p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-semibold text-lg">{item.title}</h3>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{item.content}</p>
                </div>
                {index < processData.length - 1 && (
                  <div className="absolute left-[2.75rem] top-full w-0.5 h-6 bg-gradient-to-b from-primary/30 to-transparent" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
