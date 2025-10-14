"use client";
import React, { useEffect } from "react";
import {InteractiveHoverButton} from '../ui/InteractiveHoverButton'
import posthog from "posthog-js";
import { AnimatedShinyText } from "../magicui/AnimatedShinyText";
import { useRouter } from "next/navigation";
import { FooterComp } from "./footerComp"


   const Hero: React.FC = () => { const router = useRouter();

    useEffect(() => {
      posthog.capture('viewed_landing_page'), {
        referrer: document.referrer,
        timeStamp: new Date().toISOString()

      } }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-4xl w-full">
                <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    <AnimatedShinyText text="PulseTalk" className="text-5xl sm:text-6xl font-extrabold mb-6" />
                </h1>
                <p className="text-lg sm:text-xl mb-8 text-gray-700 dark:text-gray-300">
                    Revolutionize your meetings with AI-powered summaries, action items, and insights. Focus on the conversation while PulseTalk handles the rest.
                </p>
                <InteractiveHoverButton text="Get Started" onClick={() => router.push('/signup')} />
            </div> 
            </div>) }

            export default Hero;