"use client";
import React, { useEffect } from "react";
import {InteractiveHoverButton} from '../ui/InteractiveHoverButton'
import posthog from "posthog-js";
import { AnimatedShinyText } from "../magicui/AnimatedShinyText";
import { useRouter } from "next/navigation";
import { FooterComp } from "./footerComp"
import Chatdemo from "./Chatdemo";
import { motion } from "framer-motion";
import bg from "./pulsetalk_loop.png"
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
  {/* ===== HERO SECTION ===== */}
  <section
    className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#0f1115] via-[#111418] to-[#0e1013] text-white"
    style={{
      backgroundImage: `url(${bg.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    {/* Soft overlays for depth */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-0 w-3/4 h-1/2 bg-blue-500/20 opacity-40 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-0 w-1/2 h-1/2 bg-cyan-400/20 opacity-40 blur-[120px] rounded-full"></div>
    </div>

{/* Content container */}
<div className="container mx-auto px-6 lg:px-12 relative z-10">
  <div className="flex flex-col lg:flex-row items-center gap-y-16 gap-x-10">
    {/* LEFT SIDE */}
    <div className="flex-1 text-center lg:text-left space-y-8">

      {/* Tagline */}
      <div className="inline-flex items-center justify-center lg:justify-start rounded-full px-6 py-2 text-sm font-semibold
        text-white/90 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.05)_100%)]
        border border-white/20 backdrop-blur-xl
        shadow-[inset_0_0_15px_rgba(255,255,255,0.1),0_4px_30px_rgba(0,0,0,0.3)]
        hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:border-cyan-300/50
        transition-all duration-500 ease-out">
        ✪ 
        <span className="ml-2 text-slate-100 tracking-wide drop-shadow-[0_1px_5px_rgba(0,0,0,0.4)]">
          <AnimatedShinyText>Introducing PulseTalk</AnimatedShinyText>
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight 
        bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-400 bg-clip-text text-transparent 
        tracking-tight drop-shadow-[0_10px_40px_rgba(0,0,0,0.6)] 
        filter brightness-[1.15] saturate-[1.3]">
        Reach out to anyone,<br className="hidden sm:block" /> Wherever instantly
      </h1>

      {/* Subtext */}
      <p className="text-base sm:text-lg md:text-xl text-slate-200/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed
        tracking-wide backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl px-6 py-4
        shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:bg-white/10 transition-colors duration-500">
        Create private chat rooms for friends, teammates, or communities. 
        Share text, images, and files with end-to-end encryption and enjoy seamless 
        real-time messaging with a sleek, distraction-free interface.
      </p>

          {/* CTA */}
          <div className="w-full flex justify-center lg:justify-start">
            <InteractiveHoverButton
              onClick={() => {
                posthog.capture("cta_clicked", {
                  button_text: "Get Started",
                  destination: "/signin",
                });
                router.push("/signin");
              }}
            >
              Get Started
            </InteractiveHoverButton>
          </div>
        </div>

        {/* RIGHT SIDE (Chatdemo floating) */}
        <div className="hidden md:flex flex-1 w-full max-w-md mx-auto lg:mx-0 relative justify-end">
  <motion.div
    animate={{ y: [0, -8, 0] }}
    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
    className="absolute overflow-hidden rounded-[2.1rem] shadow-[0_0_25px_rgba(0,0,0,0.5)]"
    style={{
      width: "350px",           // Slightly wider for proportional balance
      height: "600px",          // Optional tweak for taller layout
      top: "-205px",              // Fine-tuned vertical alignment
      right: "-26px",           // 💥 moves it all the way to the side (adjust ±10px if needed)
      transform: "rotate(-7deg)", // matches your phone tilt
    }}
  >
    <Chatdemo />
  </motion.div>
</div>
      </div>
    </div>

  
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center text-green-500">
      <svg
        className="w-5 h-5 animate-bounce"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
      </svg>
      

      <svg
        className="w-5 h-5 animate-bounce"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
      </svg>
      
    </div>
  </section>

  {/* ===== FEATURES SECTION ===== */}
  <section className="max-w-7xl mx-auto my-24 bg-[#111418]/90 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.4)] px-8 py-24 text-white/90">
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">Features</h1>
      <p className="text-gray-400 text-lg mb-12 leading-relaxed">
        Empower your conversations with expressive media, public and private rooms, and end-to-end encryption — all wrapped in an elegant, minimal interface.
      </p>
    </div>
    <BentoGrid />
  </section>

  {/* ===== FAQ SECTION ===== */}
  <section className="py-24 bg-[#0f1115] text-white/90">
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">FAQ</h1>
      <p className="text-gray-400 text-lg">Answers to your most common questions.</p>
    </div>
    <AccordionComp />
  </section>

  {/* ===== FOOTER ===== */}
  <footer className="bg-[#0d0f12] border-t border-white/10 py-12">
    <FooterComp />
  </footer>
</div>

) }

            export default Hero;