"use client"

import { motion } from "framer-motion"
import HeroText from "./HeroText"
import ParallaxText from "./ParallaxText"
import HeroGraphic from "./HeroGraphic"
import DigitalGlobe from "../DigitalGlobe"

export default function Hero() {
  return (
    <motion.section
      id="hero"
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center"
      initial="initial"
      animate="animate"
    >
      <HeroGraphic />
      <HeroText />
      <div className="mt-10 w-full overflow-hidden text-[20rem]">
        <ParallaxText direction={500} baseVelocity={-1}>
          Frontend Web Developer
        </ParallaxText>
        <ParallaxText direction={-500} baseVelocity={1}>
          Freelance Web Developer
        </ParallaxText>
      </div>
      <motion.div
          initial={{ opacity: 0, x: -500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute left-0 top-[20%] hidden h-[121px] w-[350px] flex-col items-start justify-center rounded-br-full rounded-tr-full px-5 
                    bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 
                    dark:bg-gradient-to-r dark:from-purple-900 dark:via-indigo-800 dark:to-blue-800 lg:flex"
        >
        <p className="text-md font-medium text-zinc-200 dark:text-zinc-200">
          Locate
        </p>
        <p className="text-md font-medium text-zinc-200 dark:text-zinc-200">
          in Jakarta
        </p>
        <p className="text-md font-medium text-zinc-200 dark:text-zinc-200">
          DK Jakarta, Indonesia
        </p>
        <DigitalGlobe className="absolute right-3 top-[10%]" />
      </motion.div>
    </motion.section>
  )
}
