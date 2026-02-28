"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const layer1 = useRef(null);
  const layer2 = useRef(null);
  const layer3 = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=1500",
          scrub: 1,
          pin: true,
        },
      });

      // Scale whole group
      tl.to([layer1.current, layer2.current, layer3.current], {
        scale: 1.3,
        duration: 1,
        ease: "none",
      });

      // Split layers apart
      tl.to(
        layer1.current,
        {
          x: -300,
          rotation: -20,
          duration: 1,
          opacity: 1,
          ease: "none",
        },
        0.5,
      );

      tl.to(
        layer2.current,
        {
          y: -250,
          rotation: 15,
          duration: 1,
          opacity: 1,
          ease: "none",
        },
        0.5,
      );

      tl.to(
        layer3.current,
        {
          x: 300,
          rotation: 25,
          duration: 1,
          opacity: 1,
          ease: "none",
        },
        0.5,
      );

      // Fade out headline
      tl.to(
        textRef.current,
        {
          y: 250,
          scale: 0.5,
          duration: 1,
          ease: "none",
        },
        0.5,
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="h-screen relative flex items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* Background Glow */}
      <div className="absolute w-[800px] h-[800px] bg-purple-600 opacity-20 blur-3xl rounded-full" />

      {/* Split Layers */}
      <div
        ref={layer1}
        className="absolute w-64 h-64 bg-blue-500 rounded-2xl mix-blend-screen opacity-0"
      >
        <div className="flex justify-center items-center h-full flex-col">
          <h2 className="text-3xl font-bold">120+</h2>
          <p>Projects</p>
        </div>
      </div>
      <div
        ref={layer2}
        className="absolute w-64 h-64 bg-pink-500 rounded-2xl mix-blend-screen opacity-0"
      >
        <div className="flex justify-center items-center h-full flex-col">
          <h2 className="text-3xl font-bold">98%</h2>
          <p>Satisfaction</p>
        </div>
      </div>
      <div
        ref={layer3}
        className="absolute w-64 h-64 bg-green-400 rounded-2xl mix-blend-screen opacity-0"
      >
        <div className="flex justify-center items-center h-full flex-col">
          <h2 className="text-3xl font-bold">5★</h2>
          <p>Rating</p>
        </div>
      </div>

      {/* Headline */}
      <div ref={textRef} className="z-10 text-center">
        <h1 className="text-5xl font-bold tracking-[0.5em]">
          W E L L C O M E
          <span className="text-rose-500 pl-6">I T Z F I Z Z</span>
        </h1>
      </div>
    </section>
  );
}
