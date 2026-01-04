import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { FadeIn } from "@/components/ui/motion-elements";

const testimonials = [
  {
    quote:
      "Nexera transformed our online presence completely. Our organic traffic increased by 400% in just 6 months. Their strategic approach and dedication are unmatched.",
    name: "Sarah Chen",
    designation: "CEO, TechFlow Inc",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop&crop=face",
  },
  {
    quote:
      "The team at Nexera doesn't just deliver results – they become true partners in your growth. Their data-driven strategies helped us achieve 500% ROI.",
    name: "Marcus Johnson",
    designation: "Marketing Director, Elevate",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face",
  },
  {
    quote:
      "Working with Nexera was a game-changer for our brand. They brought creativity and precision that exceeded all our expectations.",
    name: "Emily Rodriguez",
    designation: "Founder, Bloom Studio",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop&crop=face",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a digital agency that delivers on all its promises like Nexera does.",
    name: "James Kim",
    designation: "Engineering Lead, DataPro",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop&crop=face",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend Nexera to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology, FutureNet",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&crop=face",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Glowing background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <FadeIn className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary glow-text">
            Client Success Stories
          </span>
          <h2 className="heading-lg mt-4">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="body-lg mx-auto mt-4 max-w-2xl">
            Don't just take our word for it. Here's what our clients have to say
            about working with Nexera.
          </p>
        </FadeIn>

        <AnimatedTestimonials testimonials={testimonials} autoplay />
      </div>
    </section>
  );
};

export default TestimonialsSection;
