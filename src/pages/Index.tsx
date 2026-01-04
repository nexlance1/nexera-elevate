import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import WhyNexeraSection from "@/components/sections/WhyNexeraSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Nexera - Digital Marketing Agency | SEO, Branding & Web Development</title>
        <meta
          name="description"
          content="Nexera is a full-service digital marketing agency specializing in SEO, social media marketing, branding, and web development. Transform your brand with data-driven strategies."
        />
        <meta name="keywords" content="digital marketing agency, SEO services, social media marketing, branding, web development, marketing strategy" />
        <link rel="canonical" href="https://nexera.agency" />
        <meta property="og:title" content="Nexera - Digital Marketing Agency" />
        <meta property="og:description" content="Transform your brand with data-driven digital marketing strategies. SEO, social media, branding, and web development services." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <Layout>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <WhyNexeraSection />
        <TestimonialsSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
