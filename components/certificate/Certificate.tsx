"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { certificatesData } from "@/components/data/certificates";
import Certificatetitle from "./CertificateTitle";
import { BorderBeam } from "../ui/border-beam";
import Image from "next/image"; // Import Image from next/image

export const Certificates = () => {
  const [displayCount, setDisplayCount] = useState(6);
  const [popupImage, setPopupImage] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setDisplayCount(window.innerWidth < 1024 ? 3 : 6);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedCertificates = certificatesData.slice(0, displayCount);

  const handleViewCertificate = (image: string) => {
    setPopupImage(image);
    setIsExiting(false);
    setTimeout(() => setShowPopup(true), 50);
  };

  const closePopup = () => {
    setIsExiting(true);
    setShowPopup(false);
    setTimeout(() => {
      setPopupImage(null);
      setIsExiting(false);
    }, 500);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;

    const button = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - button.left - button.width / 2;
    const y = e.clientY - button.top - button.height / 2;

    const maxMove = 8;
    const limitedX = Math.max(Math.min(x / 10, maxMove), -maxMove);
    const limitedY = Math.max(Math.min(y / 10, maxMove), -maxMove);

    setPosition({ x: limitedX, y: limitedY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <section
      id="certificate"
      className="py-12 px-6 text-black dark:text-white w-[80rem] max-w-full mx-auto"
    >
      <Certificatetitle />
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8">
        {displayedCertificates.map((cert) => (
          <div
            key={cert.id}
            className="group bg-zinc-200 dark:bg-zinc-800 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="relative overflow-hidden aspect-video">
              <Image
                src={cert.image} // Use the Image component
                alt={cert.title}
                width={500} // Set a width value
                height={300} // Set a height value
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                {cert.title}
              </h3>
              <div className="space-y-3">
                <p className="text-gray-500 dark:text-white text-sm leading-relaxed">
                  {cert.description}
                </p>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-sm text-gray-600 dark:text-gray-300">2024</span>
                  <button
                    onClick={() => handleViewCertificate(cert.image)}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-300"
                  >
                    View Certificate →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <h2 className="text-[25px] md:text-[44px] font-bold mb-4 text-gray-800 dark:text-gray-200">
          See Other Certificates
        </h2>
        
        <div 
          className="inline-block perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href="/certificatefull"
            className={`
              relative px-8 py-3 bg-black text-white font-semibold rounded-lg
              shadow-lg transition-all duration-200 ease-out
              hover:shadow-gray-800/25 hover:bg-gray-800
              before:absolute before:inset-0 before:rounded-lg
              before:bg-gradient-to-r before:from-gray-800/20 before:to-transparent
              before:opacity-0 hover:before:opacity-100 before:transition-opacity
              active:scale-95
              inline-block
            `}
            style={{
              transform: isHovered
                ? `translate3d(${position.x}px, ${position.y}px, 0) rotateX(${-position.y}deg) rotateY(${position.x}deg)`
                : 'translate3d(0, 0, 0) rotateX(0) rotateY(0)',
            }}
            aria-label="Load More"
          >
            <span className="relative z-10">Load More</span>
            <div 
              className="absolute inset-0 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 
              transition-opacity duration-300 -z-10"
              style={{
                opacity: isHovered ? 0.5 : 0,
                transform: `translate3d(${-position.x * 0.5}px, ${-position.y * 0.5}px, 0)`,
              }}
            />
          </Link>
        </div>
      </div>

      {popupImage && (
        <div
          className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-all duration-500 ease-in-out
            ${showPopup ? 'bg-opacity-50' : 'bg-opacity-0'}
            ${isExiting ? 'opacity-0' : 'opacity-100'}`}
          onClick={closePopup}
        >
          <div
            className={`relative bg-white dark:bg-zinc-900 rounded-lg shadow-lg transition-all duration-500 ease-in-out
              ${showPopup ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
              ${isExiting ? 'scale-95 translate-y-4 opacity-0' : 'scale-100 translate-y-0 opacity-100'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Image // Change img to Image for the popup as well
              src={popupImage}
              alt="Certificate"
              width={500} // Set width for the popup image
              height={300} // Set height for the popup image
              className="w-auto max-w-[90vw] max-h-[90vh] object-contain"
            />
            <button
              className="absolute top-2 right-2 p-2 text-black dark:text-white bg-gray-200 dark:bg-zinc-700 
                hover:bg-gray-300 dark:hover:bg-zinc-600 rounded-full w-8 h-8 flex items-center justify-center
                transition-all duration-300 hover:rotate-90"
              onClick={closePopup}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
