import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { MarqueeDemo } from '@/components/about/MarqueeReview';
import { FaReact } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiHtml5, SiCss3, SiJavascript, SiNextdotjs } from "react-icons/si";
import { SiNodedotjs, SiLaravel, SiPostgresql } from "react-icons/si";
import { SiMysql, SiPhp, SiPhpmyadmin } from 'react-icons/si';
import { SiCanva, SiFigma, SiAdobephotoshop } from "react-icons/si";
import { SiApachenetbeanside, SiXcode } from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";
import { IconType } from 'react-icons';
import GithubGraph from './GithubGraph';
import AboutGlobeAnimate from "./AboutGlobeAnimate";
import { AnimatedBeamDemo } from './Skills';
import { Github } from 'lucide-react';
import CardProfile from './CardProfile';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

interface AnimatedTextProps {
  children: ReactNode;
  delay?: number;
}

interface TechIconProps {
  Icon: IconType;
  color: string;
  delay: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentElement = elementRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  const baseStyle = {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: `opacity 0.6s ease-out, transform 0.6s ease-out ${delay}s`,
  };

  const currentStyle = isVisible
    ? { ...baseStyle, opacity: 1, transform: 'translateY(0)' }
    : baseStyle;

  return (
    <div ref={elementRef} className={className} style={currentStyle}>
      {children}
    </div>
  );
};

const AnimatedText: React.FC<AnimatedTextProps> = ({ children, delay = 0 }) => {
  return (
    <AnimatedSection delay={delay} className="w-full">
      {children}
    </AnimatedSection>
  );
};

const TechIcon: React.FC<TechIconProps> = ({ Icon, color, delay }) => (
  <Icon
    size={32}
    className={`${color} animate-fadeIn`}
    style={{ animationDelay: `${delay}s` }}
  />
);

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative mb-10 flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      <div className="mx-auto flex w-[90%] flex-col items-start justify-center lg:max-w-[1212.8px]">
        <AnimatedSection delay={0.5} className="mb-10 flex w-full items-center justify-between gap-x-2 md:mb-16">
          <h1 className="text-left text-[40px] font-bold leading-[0.9em] tracking-tighter sm:text-[45px] md:text-[60px] lg:text-[80px]">
            About me
          </h1>
          <AboutGlobeAnimate />
        </AnimatedSection>

        <div className="mx-auto flex w-full flex-col lg:max-w-[1200px] lg:flex-row lg:gap-20">
          <div className="lg:mg-16 mb-10 flex w-full flex-col gap-4 text-[18px] font-medium leading-relaxed tracking-wide md:mb-16 md:gap-6 md:text-[20px] md:leading-relaxed lg:max-w-[90%] lg:text-base">
            <AnimatedText delay={0.5}>
              As a passionate and dedicated IT student, I am deeply committed to exploring, mastering, and advancing within the dynamic world of technology.
            </AnimatedText>

            <AnimatedText delay={0.7}>
              My primary focus lies in full-stack web development, where I take pride in creating innovative and efficient solutions that prioritize functionality, performance, and user experience.
            </AnimatedText>

            <AnimatedText delay={0.9}>
              Beyond technical skills, I embrace accountability for delivering high-quality results, ensuring every project reflects both creativity and reliability. Driven by an insatiable curiosity and a desire for continuous improvement, I actively seek opportunities to grow, both professionally and personally.
            </AnimatedText>

            <AnimatedText delay={1}>
              My ultimate goal is to contribute to meaningful projects that not only solve complex challenges but also leave a lasting impact on the ever-evolving tech landscape.
            </AnimatedText>
          </div>

          <div className="mb-24 flex w-full flex-col gap-4 leading-relaxed tracking-wide sm:mb-32 md:mb-40 md:gap-6 md:leading-relaxed lg:mb-16 lg:max-w-[90%]">
            <AnimatedSection delay={0.5} className="flex flex-col gap-4 md:gap-3">
              <h2 className="text-xl font-semibold">Frontend Tools</h2>
              <div className="flex gap-4">
                <TechIcon Icon={FaReact} color="text-blue-500 md:text-blue-400" delay={1.0} />
                <TechIcon Icon={SiTailwindcss} color="text-teal-500 md:text-teal-400" delay={1.2} />
                <TechIcon Icon={SiTypescript} color="text-blue-600 md:text-blue-500" delay={1.4} />
                <TechIcon Icon={SiHtml5} color="text-orange-600 md:text-orange-500" delay={1.4} />
                <TechIcon Icon={SiCss3} color="text-blue-600 md:text-blue-500" delay={1.4} />
                <TechIcon Icon={SiJavascript} color="text-yellow-600 md:text-yellow-500" delay={1.4} />
                <TechIcon Icon={SiNextdotjs} color="text-white-600 md:text-white-500" delay={1.4} />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.6} className="flex flex-col gap-4 md:gap-3">
              <h2 className="text-xl font-semibold">Backend Tools</h2>
              <div className="flex gap-4">
                <TechIcon Icon={SiNodedotjs} color="text-green-500 md:text-green-400" delay={1.5} />
                <TechIcon Icon={SiLaravel} color="text-red-500 md:text-red-400" delay={1.6} />
                <TechIcon Icon={SiPostgresql} color="text-blue-600 md:text-blue-500" delay={1.7} />
                <TechIcon Icon={SiMysql} color="text-orange-600 md:text-orange-500" delay={1.7} />
                <TechIcon Icon={SiPhp} color="text-blue-600 md:text-blue-500" delay={1.7} />
                <TechIcon Icon={SiPhpmyadmin} color="text-blue-600 md:text-blue-500" delay={1.7} />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.7} className="flex flex-col gap-4 md:gap-3">
              <h2 className="text-xl font-semibold">Design Tools</h2>
              <div className="flex gap-4">
                <TechIcon Icon={SiFigma} color="text-pink-500 md:text-pink-400" delay={1.7} />
                <TechIcon Icon={SiCanva} color="text-blue-500 md:text-blue-400" delay={1.8} />
                <TechIcon Icon={SiAdobephotoshop} color="text-blue-700 md:text-blue-600" delay={1.9} />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.8} className="flex flex-col gap-4 md:gap-3">
              <h2 className="text-[20px] font-semibold">Development Tools</h2>
              <div className="flex gap-4">
                <TechIcon Icon={VscVscode} color="text-blue-500 md:text-blue-500" delay={2} />
                <TechIcon Icon={SiApachenetbeanside} color="text-green-500 md:text-green-400" delay={2} />
                <TechIcon Icon={SiXcode} color="text-blue-500 md:text-blue-400" delay={2.1} />
              </div>
            </AnimatedSection>
          </div>
        </div>
        <MarqueeDemo />
        <div className="flex flex-col md:flex-row items-start justify-between gap-2">
  <CardProfile />
  <GithubGraph />
</div>
        <AnimatedBeamDemo />
      </div>
    </section>
  );
};

export default About;
