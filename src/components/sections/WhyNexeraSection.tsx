import { motion } from "framer-motion";
import { Zap, Target, TrendingUp, Users, Shield, Clock } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion-elements";
import { TextShimmer } from "@/components/ui/text-shimmer";

const features = [
  {
    icon: Target,
    title: "Data-Driven Strategy",
    description: "Every decision backed by analytics and market insights for maximum impact.",
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "Consistent track record of delivering 300%+ ROI for our clients.",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description: "Expert specialists assigned exclusively to your brand's success.",
  },
  {
    icon: Zap,
    title: "Rapid Execution",
    description: "Fast turnarounds without compromising on quality or attention to detail.",
  },
  {
    icon: Shield,
    title: "Transparent Reporting",
    description: "Real-time dashboards and weekly reports keep you informed always.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock availability to address your needs and concerns.",
  },
];

const WhyNexeraSection = () => {
  return (
    <section className="relative overflow-hidden bg-card py-12 md:py-0">
      <div className="mx-auto max-w-7xl px-4">
        {/* Desktop scroll animation ONLY */}
        <div className="hidden lg:block">
          <ContainerScroll
            titleComponent={
              <div className="mx-auto max-w-3xl text-center">
                <TextShimmer
                  as="span"
                  duration={1.5}
                  className="text-sm font-bold uppercase tracking-widest [--base-color:hsl(187,100%,50%)] [--base-gradient-color:hsl(270,80%,70%)]"
                >
                  Why Choose Nexera
                </TextShimmer>
                <h2 className="heading-lg mt-4 font-extrabold">
                  Partner with a Team That{" "}
                  <span className="gradient-text">Delivers Excellence</span>
                </h2>
                <p className="body-lg mt-4 font-medium">
                  We don't just promise results – we deliver them. Here's what sets
                  us apart from the rest.
                </p>
              </div>
            }
          >
            <FeatureGrid />
          </ContainerScroll>
        </div>

        {/* Mobile & Tablet – NO scroll animation */}
        <div className="lg:hidden">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <TextShimmer
              as="span"
              duration={1.5}
              className="text-sm font-bold uppercase tracking-widest [--base-color:hsl(187,100%,50%)] [--base-gradient-color:hsl(270,80%,70%)]"
            >
              Why Choose Nexera
            </TextShimmer>
            <h2 className="heading-lg mt-4 font-extrabold">
              Partner with a Team That{" "}
              <span className="gradient-text">Delivers Excellence</span>
            </h2>
            <p className="body-lg mt-4 font-medium">
              We don't just promise results – we deliver them. Here's what sets
              us apart from the rest.
            </p>
          </FadeIn>

          <div className="mt-10">
            <FeatureGrid />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------- */
/* Feature Grid Component */
/* ---------------------------------- */

const FeatureGrid = () => {
  return (
    <StaggerContainer className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <StaggerItem key={feature.title}>
          <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative h-full rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8 transition-all hover:border-primary/40 hover:shadow-[0_0_30px_hsl(187_100%_50%/0.15)]"
          >
            {/* Icon */}
            <div className="mb-4 md:mb-6 inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-[0_0_20px_hsl(187_100%_50%/0.2)]">
              <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>

            {/* Content */}
            <h3 className="font-display text-lg md:text-xl font-bold text-foreground">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm md:text-base text-muted-foreground font-medium leading-relaxed">
              {feature.description}
            </p>

            {/* Decorative glow */}
            <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
          </motion.div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
};

export default WhyNexeraSection;
