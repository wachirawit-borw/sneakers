import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import dynamic from "next/dynamic";

const DynamicProduct = dynamic(() => import('@/components/Product'));
const DynamicContact = dynamic(() => import('@/components/Contact'));
const DynamicProductDetail = dynamic(() => import('@/components/WhyChooseUs'));
const DynamicFaq = dynamic(() => import('@/components/Faq'));
const DynamicAbout = dynamic(() => import('@/components/About'));
const DynamicFooter = dynamic(() => import('@/components/Footer'));


export default function Home() {
  return (
    <>
      <Header />
      <Hero />

      <AnimateOnScroll>
        <DynamicProduct />
      </AnimateOnScroll>

      <AnimateOnScroll>
        <Features />
      </AnimateOnScroll>
      
      <AnimateOnScroll>
        <DynamicProductDetail />
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
    </>
  )
}
