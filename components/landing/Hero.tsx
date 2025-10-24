"use client";
import React, { useEffect } from "react";
import {InteractiveHoverButton} from '../ui/InteractiveHoverButton'
import posthog from "posthog-js";
import { AnimatedShinyText } from "../magicui/AnimatedShinyText";
import { useRouter } from "next/navigation";
import { FooterComp } from "./footerComp"
import Chatdemo from "./Chatdemo";
import { motion } from "framer-motion";
import { BentoGrid }  from './BentoGrid'
import { AccordionComp } from '../ui/Minimal-accordion'


   const Hero: React.FC = () => { const router = useRouter();

    useEffect(() => {
    posthog.capture('landing_page_viewed', {
      referrer: document.referrer,
      timestamp: new Date().toISOString()
    });
  }, []);

    return (
        <div>
  <section className="relative min-h-screen pt-32 pb-24 md:pt-50 md:pb-32 overflow-hidden bg-[#181818]">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-0 w-3/4 h-1/2 bg-primary opacity-50 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-accent/20 to-transparent opacity-60 blur-[120px] rounded-full"></div>
    </div>

    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="flex flex-col lg:flex-row items-center gap-y-16 gap-x-8">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-block item-center rounded-full px-6 py-2 mb-6 text-xs font-medium border-1 border-white  text-white shadow-lg">
            <span className="mr-1"> ✪ </span> 
            <AnimatedShinyText> Introducing Pulsetalk</AnimatedShinyText>
          </div>

          <h1 className="text-4xl sm:text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
            Reach out to anyone,<br /> anywhere in real-time
          </h1>
          <p className="text-lg md:text-xl text-amber-400 mb-8 max-w-2xl mx-auto lg:mx-0">
            Create private chat rooms for friends, teammates, or communities. Share text, images, and files with end-to-end encryption and connect with seamless real-time messaging.
          </p>

          <div className="w-full flex justify-center lg:justify-start">
            
            <InteractiveHoverButton onClick={() => {
              posthog.capture('cta_clicked', {
                button_text: 'Get Started',
                destination: '/signin'
              });
              router.push('/signin');
            }}>
              Get Started
            </InteractiveHoverButton>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md mx-auto lg:mx-0" style={{ height: 'auto', minHeight: '450px' }}>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Chatdemo />
          </motion.div>
        </div>
      </div>
    </div>
  

  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center
   " >
    <svg className="w-6 h-6 animate-bounce"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
    </svg>
    <span className="mt-2 text-sm text-muted-foreground">
      Scroll Down
    </span>
    </div>
    </section>

    <section className="max-w-7xl mx-auto my-8 border border-red-500 border-solid rounded-lg bg-slate-500 pt-0 pb-24 md:pt-32 md:pb-32 overflow-hidden">
      <div className="border border-solid border-red-500 px-4 sm:px-6 lg:px-8">
        <div className="border border-solid border-red-500 flex flex-col items-center">
          <h1 className="text-4xl text-center mb-10 underline decoration-dashed font-extrabold"> Features</h1>
          <p className="text-center mb-12 mx-auto text-lg">

            Empover your conversation with real-time chat, expressive media, <br/> secure public rooms, and a sleek, user-freindly interface.
          </p>
                 
                 <BentoGrid/>
          
        </div>
      </div>
    </section>

    <section className="py-10"
    >
      <div>
        <h1 className="text-center text-4xl underline decoration-wavy "> FAQ </h1>

      </div>
      <AccordionComp/>
    </section>

    <footer className="bg-primary/2">
    <FooterComp/>
    </footer>
    
   
</div>
) }

            export default Hero;