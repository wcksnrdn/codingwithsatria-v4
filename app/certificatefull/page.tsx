"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { certificatesData } from "@/components/data/certificates";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUp, Sun, Moon, X } from "lucide-react";
import { useTheme } from "next-themes";

export default function CertificatesPage() {
  const [expandedCertId, setExpandedCertId] = useState<number | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [curtainPhase, setCurtainPhase] = useState(0);
  const [isBackToHome, setIsBackToHome] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    
    const timer1 = setTimeout(() => setCurtainPhase(1), 100);
    const timer2 = setTimeout(() => setCurtainPhase(2), 600);
    const timer3 = setTimeout(() => setCurtainPhase(3), 1100);
    const timer4 = setTimeout(() => setShowContent(true), 1600);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleScroll = () => {
    setShowScrollToTop(window.scrollY > 200);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    setIsScrolling(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setIsScrolling(false), 1000);
  };

  const handleViewCertificate = (certId: number) => {
    if (expandedCertId === certId) {
      handleCloseCertificate();
    } else {
      setExpandedCertId(certId);
    }
  };

  const handleCloseCertificate = () => {
    setIsExiting(true);
    setTimeout(() => {
      setExpandedCertId(null);
      setIsExiting(false);
    }, 300);
  };

  const handleBackToHome = () => {
    setIsBackToHome(true);
    setCurtainPhase(0);
    setTimeout(() => {
      router.push('/');
    }, 1600);
  };

  if (!mounted) return null;

  const curtainColor = resolvedTheme === "dark" ? "from-black to-zinc-500" : "from-white to-gray-200";

  return (
    <>
      {/* Curtain Animation */}
      <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
        <div className={`absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r ${curtainColor} transform transition-transform duration-1000 ease-[cubic-bezier(0.7,0,0.3,1)]
            ${isBackToHome ? 'translate-x-0' : (curtainPhase >= 1 ? '-translate-x-full' : 'translate-x-0')}`} />
        <div className={`absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l ${curtainColor} transform transition-transform duration-1000 ease-[cubic-bezier(0.7,0,0.3,1)]
            ${isBackToHome ? 'translate-x-0' : (curtainPhase >= 1 ? 'translate-x-full' : 'translate-x-0')}`} />
        <div className={`absolute inset-x-0 top-0 h-1/2 ${curtainColor} transform origin-top transition-transform duration-800 ease-[cubic-bezier(0.7,0,0.3,1)]
            ${isBackToHome ? 'scale-y-100' : (curtainPhase >= 2 ? 'scale-y-0' : 'scale-y-100')}`} />
        <div className={`absolute inset-x-0 bottom-0 h-1/2 ${curtainColor} transform origin-bottom transition-transform duration-800 ease-[cubic-bezier(0.7,0,0.3,1)]
            ${isBackToHome ? 'scale-y-100' : (curtainPhase >= 2 ? 'scale-y-0' : 'scale-y-100')}`} />
        <div className={`absolute inset-0 bg-zinc-600 transition-all duration-1000 ease-[cubic-bezier(0.87,0,0.13,1)]
            ${isBackToHome ? 'clip-path-circle-zero opacity-100' : (curtainPhase >= 3 ? 'clip-path-circle-full opacity-0' : 'clip-path-circle-zero opacity-100')}`} />
      </div>

      <div className={`min-h-screen transition-all duration-1000 ease-[cubic-bezier(0.87,0,0.13,1)] ${
        resolvedTheme === "dark" ? "bg-zinc-900" : "bg-gradient-to-b from-gray-100 to-white"
      } ${showContent ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}>
        <div className="max-w-[80rem] mx-auto py-16 px-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-[20px] md:text-4xl font-bold text-dark dark:text-white">All Certificates</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300 transition-all duration-300"
              >
                {resolvedTheme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              <button
                onClick={handleBackToHome}
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                ← Back to Home
              </button>
            </div>
          </div>

          {/* Certificate Grid with Inline Expansion */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificatesData.map((cert) => (
              <div key={cert.id} className="relative">
                <div
                  className={`group bg-zinc-200 dark:bg-zinc-800 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2
                    ${expandedCertId === cert.id ? 'z-20' : 'z-10'}`}
                >
                  <div className="relative overflow-hidden aspect-video">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-black dark:text-white group-hover:text-blue-400 transition-colors duration-300">
                      {cert.title}
                    </h3>
                    <div className="space-y-3">
                      <p className="text-black/50 dark:text-white/50 text-sm leading-relaxed">
                        {cert.description}
                      </p>
                      <div className="flex items-center justify-between pt-4">
                        <span className="text-sm text-gray-400 dark:text-gray-500">2024</span>
                        <button
                          onClick={() => handleViewCertificate(cert.id)}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300"
                        >
                          {expandedCertId === cert.id ? 'Close ×' : 'View Certificate →'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inline Certificate Expansion */}
                {expandedCertId === cert.id && (
            <div
                className={`absolute top-0 left-0 right-0 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl z-30
                ${isExiting ? 'animate-popupExit' : 'animate-popupEnter'}
                transition-all duration-300 ease-out`}
            >
                <button
                onClick={handleCloseCertificate}
                className="absolute -top-3 -right-3 z-40 p-2 rounded-full bg-white dark:bg-zinc-800 
                    shadow-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors duration-200"
                >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>

                <div className="relative w-full rounded-2xl overflow-hidden">
                <div className="relative w-full" style={{ paddingTop: '60%' }}>
                    <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1200px"
                    />
                </div>
                </div>
            </div>
            )}

              </div>
            ))}
          </div>

          {/* Scroll to Top Button */}
          {showScrollToTop && (
            <button
              onClick={handleScrollToTop}
              className={`fixed bottom-4 right-4 p-2 rounded-full bg-blue-500 text-white shadow-lg transition-transform duration-300 
                ${isScrolling ? "animate-bounce" : ""}`}
            >
              <ArrowUp className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}