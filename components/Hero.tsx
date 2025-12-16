'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { PDFButton } from './PDFButton';

export function Hero() {
  return (
    <section className="relative h-[85vh] sm:h-[90vh] w-full overflow-hidden" aria-label="Banner principal">
      {/* Background Image - use bg.svg as fallback, replace with bg.webp when available */}
      <Image
        src="/bg.svg"
        alt="Background principal da head shop de cigarros eletrônicos"
        fill
        priority
        className="object-cover"
        sizes="100vw"
        quality={85}
      />

      {/* Overlay with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

      {/* Smoke/Vapor effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />

      {/* Neon glow effects - hidden on mobile for performance */}
      <div className="hidden sm:block absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse" />
      <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Age Warning Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 sm:mb-6"
        >
          <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 text-xs sm:text-sm font-medium backdrop-blur-sm">
            <span className="text-base sm:text-lg">🔞</span>
            APENAS PARA MAIORES DE 18
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-3 sm:mb-4 glow-text"
        >
          <span className="bg-gradient-to-r from-white via-accent to-secondary bg-clip-text text-transparent">
            Catálogo
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-300 max-w-2xl mb-6 sm:mb-8 px-4"
        >
          Vapes, Pods e Acessórios
        </motion.p>

        {/* PDF Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <PDFButton />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-6 sm:bottom-8"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-zinc-400"
          >
            <span className="text-sm">Ver produtos</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
