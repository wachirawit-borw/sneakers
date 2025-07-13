"use client";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import useScreenSize from "@/hook/useScreenSize";

export default function Hero() {
  const { isMobile } = useScreenSize();

  // ─── Animation states ────────────────────────────────
  const [showTitle, setShowTitle] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // ─── Video capability / loading states ───────────────
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // ตรวจว่าเบราว์เซอร์เล่น .webm ได้หรือไม่
  useEffect(() => {
    const vid = document.createElement("video");
    const support = vid.canPlayType("video/webm");
    if (support === "probably" || support === "maybe") setCanPlayVideo(true);
  }, []);

  // จังหวะโชว์หัวข้อ → ปุ่ม
  useEffect(() => {
    const t1 = setTimeout(() => setShowTitle(true), 2000);   // 2 s
    const t2 = setTimeout(() => setShowButton(true), 4000); // 4 s
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleVideoLoad = () => setVideoLoaded(true);

  const handleVideoError = () => {
    setCanPlayVideo(false);
    setVideoLoaded(false);
  };

  // ─── JSX ─────────────────────────────────────────────
  return (
    <>
      <Head>
        <link
          rel="preload"
          as="video"
          href="/video/hero-bg.webm"
          type="video/webm"
        />
      </Head>

      <section className="relative w-full min-h-screen overflow-hidden">
        {/* ── Background Video ─────────────────────────── */}
        {canPlayVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            className={`
              absolute inset-0 w-full h-full z-0
              object-cover object-center
              ${videoLoaded ? "opacity-100" : "opacity-0"}
              transition-opacity duration-500
            `}
            poster="/picture/hero-image.webp"
            style={{
              minWidth: "100%",
              minHeight: "100%",
              width: "auto",
              height: "auto",
            }}
          >
            <source src="/video/hero-bg.webm" type="video/webm" />
          </video>
        )}

        {/* ── Fallback Image ───────────────────────────── */}
        <Image
          src="/picture/hero-image.webp"
          alt="Hero Background"
          fill
          priority
          className={`
            object-cover object-center z-0
            ${canPlayVideo && videoLoaded ? "opacity-0" : "opacity-100"}
            transition-opacity duration-500
          `}
        />

        {/* ── Overlay Tint ─────────────────────────────── */}
        <div className="absolute inset-0 bg-[#D9B89C]/80 mix-blend-multiply z-10" />

        {/* ── Hero Content ─────────────────────────────── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center text-white">
          {/* Title */}
          <h2
            className={`
              max-w-4xl font-extrabold drop-shadow-lg
              transition-all duration-700 ease-out
              ${isMobile ? "text-4xl" : "text-6xl"}
              ${showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
            `}
          >
            Step into Style <br /> Walk with ZURFRK
          </h2>

          {/* CTA Button */}
          <Link
            href="/shop"
            aria-label="shop"
            className={`
              group relative inline-flex items-center justify-center
              px-8 py-4 font-bold text-white
              bg-gradient-to-r from-orange-500 to-red-600
              border-2 border-white/20 rounded-full overflow-hidden
              backdrop-blur-sm shadow-2xl shadow-black/30
              transition-all duration-500 ease-out
              hover:scale-105 hover:shadow-orange-500/30 active:scale-95
              ${isMobile ? "mt-6 text-lg" : "mt-8 text-xl"}
              ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
            `}
          >
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 group-hover:opacity-0 transition-all duration-500" />

            {/* Text + icon */}
            <div className="relative flex items-center gap-3">
              <span className="group-hover:scale-110 transition-transform duration-300">
                Shop Now
              </span>
              <div className="group-hover:translate-x-1 transition-transform duration-300">
                <svg
                  fill="currentColor"
                  viewBox="0 0 576 512"
                  width="20"
                  height="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                </svg>
              </div>
            </div>

            {/* Shine swipe */}
            <div className="absolute inset-0 -top-1 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
          </Link>
        </div>
      </section>
    </>
  );
}
