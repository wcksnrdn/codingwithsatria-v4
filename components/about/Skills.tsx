"use client";

import React, { forwardRef, useRef } from "react";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaPhp } from 'react-icons/fa';
import { SiReact, SiTailwindcss, SiNextdotjs, SiLaravel, SiNodedotjs, SiTypescript} from 'react-icons/si';
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import ShineBorder from "../ui/shine-border";
import '@/components/about/Skills.module.css';

export function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  // Create refs for icons at the top level of the component
  const divRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  return (
    <div
      className="relative flex h-[600px] md:h-[600px] w-full items-center justify-center overflow-hidden rounded-lg bg-transparent"
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-w-lg max-h-[200px] items-stretch justify-between mt-[-8rem] md:mt-[-2rem]">
        <div className="relative flex items-center justify-center">
          {/* Kiri */}
          <div className="absolute left-[-2rem] md:left-[-28rem] flex flex-col items-center space-y-6 md:space-y-9 mt-[15rem] md:mt-[0]">
            <div ref={divRefs[0]} className="flex items-center justify-center" key="html">
              <FaHtml5 className="text-black dark:text-white text-[55px] md:text-[80px]" />
            </div>
            <div ref={divRefs[1]} className="flex items-center justify-center" key="css">
              <FaCss3Alt className="text-black dark:text-white text-[55px] md:text-[80px]" />
            </div>
            <div ref={divRefs[2]} className="flex items-center justify-center" key="javascript">
              <FaJsSquare className="text-black dark:text-white text-[55px] md:text-[80px]" />
            </div>
            <div ref={divRefs[3]} className="flex items-center justify-center" key="php">
              <FaPhp className="text-black dark:text-white text-[55px] md:text-[80px]" />
            </div>
            <div ref={divRefs[4]} className="flex items-center justify-center" key="typescript">
              <SiTypescript className="text-black dark:text-white text-[55px] md:text-[80px]" />
            </div>
          </div>

          {/* Tengah */}
          <ShineBorder 
            className="z-10 shine-border border-gray-800 mt-[-17rem] md:mt-[0] rounded-[10px] h-[70px] md:h-[110px] px-4 md:px-8 py-1 md:py-3 text-center bg-gradient-to-r from-black to-gray-700 shadow-md"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
            <div className="z-10">
              <div ref={titleRef}>
                <span className="text-[36px] md:text-[60px] font-semibold bg-gradient-to-b from-white via-white to-gray-800 bg-clip-text text-transparent drop-shadow-lg">
                  Skills
                </span>
              </div>
            </div>
          </ShineBorder>

          {/* Kanan */}
          <div className="absolute right-[-2rem] md:right-[-28rem] flex flex-col items-center space-y-6 md:space-y-9 mt-[15rem] md:mt-[0]">
            <div ref={divRefs[5]} className="flex items-center justify-center" key="react">
              <SiReact className="text-black dark:text-white text-[55px] md:text-[80px]" />
            </div>
            <div ref={divRefs[6]} className="flex items-center justify-center" key="tailwind">
              <SiTailwindcss className="text-black dark:text-white text-[55px] md:text-[80px]" />
            </div>
            <div ref={divRefs[7]} className="flex items-center justify-center" key="nextjs">
              <SiNextdotjs className="text-black dark:text-white text-[55px] md:text-[80px]" />
            </div>
            <div ref={divRefs[8]} className="flex items-center justify-center" key="laravel">
              <SiLaravel className="text-black dark:text-white text-[55px] md:text-[80px]" />
            </div>
            <div ref={divRefs[9]} className="flex items-center justify-center" key="nodedotjs">
              <SiNodedotjs className="text-black dark:text-white text-[55px] md:text-[80px]" />
            </div>
          </div>
        </div>

        {/* Animated Beam */}
        {divRefs.map((divRef, index) => {
          const curvatureValues = [20, 20, 0, -20, -75, 20, 20, 0, -20, -75];
          const endYOffsetValues = [10, 10, 10, 10, -10, 10, 10, 10, 10, -10];
          const reverse = index >= 5;
          
          return (
            <AnimatedBeam
              key={index} // Unique key for the AnimatedBeam component
              containerRef={containerRef}
              fromRef={divRef}
              toRef={titleRef}
              curvature={curvatureValues[index]}
              endYOffset={endYOffsetValues[index]}
              reverse={reverse}
            />
          );
        })}
      </div>
    </div>
  );
}
