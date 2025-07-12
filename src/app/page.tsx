'use client';

import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import AnimateOnScroll from "@/components/AnimateOnScroll";

// Dynamic imports (โหลดฝั่ง client เท่านั้น)
const DynamicProduct = dynamic(() => import('@/components/Product'), { ssr: false });
const DynamicFeatures = dynamic(() => import('@/components/Features'), { ssr: false });
const DynamicWhyChooseUs = dynamic(() => import('@/components/WhyChooseUs'), { ssr: false });
const DynamicAbout = dynamic(() => import('@/components/About'), { ssr: false });
const DynamicContact = dynamic(() => import('@/components/Contact'), { ssr: false });
const DynamicFaq = dynamic(() => import('@/components/Faq'), { ssr: false });
const DynamicFooter = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function Home() {
  return (
    <main className="text-foreground">
      <Hero />

      <AnimateOnScroll>
        <DynamicProduct />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <DynamicFeatures />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <DynamicWhyChooseUs />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <DynamicAbout />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <DynamicContact />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <DynamicFaq />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <DynamicFooter />
      </AnimateOnScroll>
    </main>
  );
}
