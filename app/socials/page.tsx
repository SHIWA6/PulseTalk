"use client";
import me from "./reall.jpg"


import React, { useState, useEffect, useRef, useMemo, useCallback, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Timelocal from "../utils/Timelocal";
import { FaGithub, FaTwitter, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from "react-icons/si";

const FuturisticIntroCard = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);
  
  // Element refs for position tracking
  const profileRef = useRef(null);
  const nameRef = useRef(null);
  const badgeRef = useRef(null);
  const emailRef = useRef(null);
  const githubRef = useRef(null);
  const twitterRef = useRef(null);
  const aboutRef = useRef(null);
  const leetcodeRef = useRef(null);
  const linkedinRef = useRef(null);

  // Memoize sections so the array identity is stable between renders
  const sections = useMemo(() => [
    { ref: profileRef, name: 'profile', duration: 2.5 },
    { ref: nameRef, name: 'name', duration: 2.0 },
    { ref: badgeRef, name: 'badge', duration: 1.8 },
    { ref: emailRef, name: 'email', duration: 2.2 },
    { ref: githubRef, name: 'github', duration: 1.6 },
    { ref: twitterRef, name: 'twitter', duration: 1.6 },
    { ref: leetcodeRef, name: 'leetcode', duration: 1.6 },
    { ref: linkedinRef, name: 'linkedin', duration: 1.6 },
    { ref: aboutRef, name: 'about', duration: 2.8 }
  ], []);

  // Check for mobile screen
  // Use matchMedia for efficient mobile detection and listen to changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 767px)');
    const handle = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    // modern addEventListener, fallback to addListener
    if (mql.addEventListener) mql.addEventListener('change', handle);
    else mql.addListener(handle);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', handle);
      else mql.removeListener(handle);
    };
  }, []);

  // Animation loop (uses memoized sections). Keep same timing logic but
  // depend on sections.length so it remains stable.
  useEffect(() => {
    const nextSection = () => {
      setActiveSection(prev => (prev + 1) % sections.length);
    };

    const duration = (sections[activeSection] && sections[activeSection].duration) || 2;
    const timer = setTimeout(nextSection, duration * 1000);

    return () => clearTimeout(timer);
  }, [activeSection, sections.length]);


    // Measure element position relative to card with layout effect and RAF to avoid layout thrash
    const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

    const measure = useCallback((elementRef) => {
      if (!elementRef?.current || !cardRef.current) return { x: 0, y: 0, width: 0, height: 0 };
      const cardRect = cardRef.current.getBoundingClientRect();
      const elementRect = elementRef.current.getBoundingClientRect();
      return {
        x: elementRect.left - cardRect.left,
        y: elementRect.top - cardRect.top,
        width: elementRect.width || 100,
        height: elementRect.height || 50,
      };
    }, []);

    const currentSection = sections[activeSection];

    // UseLayoutEffect so measurement happens before paint to avoid visible flicker
    useLayoutEffect(() => {
      if (!currentSection?.ref) return;
      let rafId;
      const update = () => {
        const pos = measure(currentSection.ref);
        setSpotlightPosition(pos);
      };
      // measure once immediately
      update();

      // Keep measurements updated on resize with requestAnimationFrame to batch reads
      const onResize = () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(update);
      };
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }, [activeSection, measure, currentSection]);

  return (
    <div className="flex p-25 bg-[#] items-center justify-center min-h-screen  ">

    {/* Background Light Rays */}
      


      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full max-w-4xl mx-auto bg-[#181818] backdrop-blur-xl border border-white rounded-3xl p-8  overflow-hidden shadow-2xl"
      >
      
        <div className=" block fixed top-8 right-10 text-white "> <Timelocal></Timelocal></div>
        {/* Animated Spotlight/Scanner */}
       
         

        {/* Corner Accents */}
        <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white rounded-tl-lg" />
{/*
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <LightRays
          raysOrigin="center"
          raysColor="#00ffff"
          raysSpeed={2}
          lightSpread={1}
          rayLength={2}
          followMouse={false}
          mouseInfluence={0}
          noiseAmount={0.05}
          distortion={0.02}
          className="w-full h-full"
        />
      </div>    */}     
           

        <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-white rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-white rounded-br-lg" />

        {/* Main Content */}
        <div className="  flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          
          {/* Profile Image */}
          <motion.div
            
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <div  className="relative w-32 h-32 rounded-2xl overflow-hidden ring-2 ring-white bg-black">

              

              <Image ref={profileRef}
                src={me}
                alt="Profile"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>
          </motion.div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left space-y-4">
            
            {/* Name & Badge */}
            <div className="space-y-3">
              <motion.h1
                ref={nameRef}
                whileHover={{ scale: 1.02 }}
                className="text-4xl md:text-6xl font-bold text-white tracking-tight"
              >
                Shiva
              </motion.h1>
              
              <motion.div
                ref={badgeRef}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black border border-white backdrop-blur-sm"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"
                />
                <span className="text-white font-bold text-sm md:text-base"> Active </span>
              </motion.div>
            </div>

            {/* Role */}
            <p className="text-xl md:text-2xl text-white font-light">
              Software Engineer
            </p>

            {/* Email */}
            <motion.div
              ref={emailRef}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-center md:justify-start gap-3 text-slate-300 group cursor-pointer"
            >
              <FaEnvelope className="w-5 h-5 text-white group-hover:text-cyan-300 transition-colors" />
              <span className="text-base md:text-lg group-hover:text-white transition-colors">
                Shivapanday9616527173@gmail.com
              </span>
            </motion.div>

            {/* Social Links */}
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              <motion.a
                ref={githubRef}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/SHIWA6"
                className="p-3 rounded-xl bg-black border border-white hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <FaGithub className="w-6 h-6 text-slate-300 group-hover:text-cyan-400 transition-colors" />
              </motion.a>
              
              <motion.a
                ref={twitterRef}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://x.com/testcricforlife"
                
                className="p-3 rounded-xl bg-black border border-white hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <FaTwitter className="w-6 h-6 text-slate-300 group-hover:text-cyan-400 transition-colors" />
              </motion.a>


              <motion.a
                 ref={leetcodeRef}
                 whileHover={{ scale: 1.1, y: -2 }}
                 whileTap={{ scale: 0.95 }}
                 href="https://leetcode.com/SHIWA6"
                 className="p-3 rounded-xl bg-black border border-white hover:border-cyan-500/50 transition-all duration-300 group"
                  >
                <SiLeetcode className="w-6 h-6 text-slate-300 group-hover:text-cyan-400 transition-colors" />
          </motion.a>

                   <motion.a
  ref={linkedinRef}
  whileHover={{ scale: 1.1, y: -2 }}
  whileTap={{ scale: 0.95 }}
  href="https://www.linkedin.com/in/shiva-pandey-41978a308" 
  className="p-3 rounded-xl bg-black border border-white hover:border-cyan-500/50 transition-all duration-300 group"
> <div>
   
  <FaLinkedin className="w-6 h-6 text-slate-300 group-hover:text-cyan-400 transition-colors" />
  </div>
</motion.a>


            </div>
          </div>
        </div>

        {/* About Section */}
        <motion.div
          ref={aboutRef}
          whileHover={{ scale: 1.01 }}
          className="mt-8 md:mt-12 p-6 rounded-[1.25rem] bg-gradient-to-r from-slate-800/30 to-slate-700/30  border-[2px] border-border border-black backdrop-blur-sm"
        > 
          <p className="text-white text-base md:text-lg leading-relaxed text-center md:text-left">
            I build full-stack apps -- that matter
            with design-first, production-ready projects. Passionate about creating seamless user 
            experiences and innovative solutions, A problem solver, Critical thinker and I'm also preparing for GATE2027, Let's connect. 
            <br/>
          </p>
        </motion.div>
       
      </motion.div>
    </div>
  );
};

export default FuturisticIntroCard;