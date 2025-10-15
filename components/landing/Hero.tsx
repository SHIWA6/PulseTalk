"use client";
import React, { useEffect } from "react";
import {InteractiveHoverButton} from '../ui/InteractiveHoverButton'
import posthog from "posthog-js";
import { AnimatedShinyText } from "../magicui/AnimatedShinyText";
import { useRouter } from "next/navigation";
import { FooterComp } from "./footerComp"
import Chatdemo from "./Chatdemo";
import { motion } from "framer-motion";


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
  </section>
</div>
) }

            export default Hero;