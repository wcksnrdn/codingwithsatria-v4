import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const reviews = [
  {
    name: "Muhammad Rifki",
    username: "@inward",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "/images/rifki.png",
  },
  {
    name: "Maureen Gabriella",
    username: "@alice",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "/images/alice.png",
  },
  {
    name: "Muhammad Handhika",
    username: "@handhika",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "/images/handhika.png",
  },
  {
    name: "Nizar Lugatio",
    username: "@microboy",
    body: "I'm at a loss for words. This is amazing.",
    img: "/images/nizar.png",
  },
  {
    name: "Jisoo Sooya",
    username: "@jisoo",
    body: "I'm at a loss for words. This is amazing.",
    img: "/images/jisoo.png",
  },
  {
    name: "Lisa",
    username: "@lisa",
    body: "I'm at a loss for words. This is amazing.",
    img: "/images/lisa.png",
  },
].map((review, index) => ({ ...review, id: index }));

const ReviewCard = React.memo(({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => (
  <figure
    className={cn(
      "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 will-change-transform",
      "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
      "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
    )}
  >
    <div className="flex flex-row items-center gap-2 ">
      <Image
        className="rounded-full"
        width={32}
        height={32}
        alt={`Image of ${name}`}
        src={img}
        loading="lazy"
        sizes="32px"
      />
      <div className="flex flex-col">
        <figcaption className="text-sm font-medium dark:text-white">
          {name}
        </figcaption>
        <p className="text-xs font-medium dark:text-white/40">{username}</p>
      </div>
    </div>
    <blockquote className="mt-2 text-sm">{body}</blockquote>
  </figure>
));

ReviewCard.displayName = 'ReviewCard';

export function MarqueeDemo() {
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(mobile);
      setPauseOnHover(!mobile);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative flex h-[150px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent mt-[-40px] translate-z-0 mb-[20px]">
      <Marquee pauseOnHover={pauseOnHover} className="[--duration:100s]">
        {reviews.slice(0, isMobile ? 3 : reviews.length).map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#f0f0f0] to-transparent dark:from-[#1a1a1a] dark:to-transparent hidden md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#f0f0f0] to-transparent dark:from-[#1a1a1a] dark:to-transparent hidden md:block" />
    </div>
  );
}
