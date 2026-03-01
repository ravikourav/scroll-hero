"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const card2 = useRef<HTMLDivElement | null>(null);
  const card3 = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const metricsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const card = card3.current;
    const title = titleRef.current;
    const metrics = metricsRef.current;

    if (!hero || !card || !title || !metrics) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=1600",
          scrub: 1.2,
          pin: true,
        },
      });

      // Set initial state safely
      gsap.set(metrics.children, {
        opacity: 0,
        y: 40,
      });

      // Unfold animation
      tl.to(card, { y: 250, rotationX: -10 }, 0);

      // Shrink title
      tl.to(
        title,
        {
          scale: 0.6,
          opacity: 0,
        },
        0.2,
      );

      // Reveal metrics
      tl.to(
        metrics.children,
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
        },
        0.6,
      );
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden"
    >
      <div className="relative w-[400px] h-[400px] perspective-[1200px]">
        {/* Card 2 */}
        <div
          ref={card2}
          className="absolute inset-0 bg-white text-black rounded-2xl shadow-2xl flex items-center justify-center"
        >
          <div ref={metricsRef} className="flex gap-16 text-black">
            <div className="text-center">
              <h2 className="text-4xl font-bold">120+</h2>
              <p>Projects</p>
            </div>

            <div className="text-center">
              <h2 className="text-4xl font-bold">98%</h2>
              <p>Satisfaction</p>
            </div>

            <div className="text-center">
              <h2 className="text-4xl font-bold">5★</h2>
              <p>Rating</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div
          ref={card3}
          className="absolute inset-0 bg-white text-black rounded-2xl shadow-2xl flex items-center justify-center origin-top"
        >
          <h1
            ref={titleRef}
            className="text-4xl font-bold tracking-widest text-center"
          >
            WELCOME <br /> ITZFIZZ
          </h1>
        </div>
      </div>
    </section>
  );
}
