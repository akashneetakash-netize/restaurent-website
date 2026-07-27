'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface StoryStep {
  number: string;
  subtitle: string;
  title: string;
  description: string;
  image: string;
}

const STORY_STEPS: StoryStep[] = [
  {
    number: '01',
    subtitle: 'Mise en Place',
    title: 'Precision Before the Flame',
    description: 'Every ingredient measured, weighed and positioned before the first flame is lit.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop',
  },
  {
    number: '02',
    subtitle: 'The Pass',
    title: 'The Art of Plating',
    description: 'Clean flavours, precise craft, honest ingredients.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop',
  },
  {
    number: '03',
    subtitle: 'Service',
    title: 'Intuitive Hospitality',
    description: 'Attentive, unhurried, invisible when it should be.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop',
  },
  {
    number: '04',
    subtitle: 'The Table',
    title: 'Unforgettable Evenings',
    description: 'Where stories are shared and evenings slow down.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop',
  },
];

function StepBgImage({
  step,
  idx,
  scrollYProgress,
}: {
  step: StoryStep;
  idx: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = idx * 0.25;
  const end = (idx + 1) * 0.25;

  const opacity = useTransform(
    scrollYProgress,
    [start - 0.05, start + 0.05, end - 0.05, end + 0.05],
    [0, 1, 1, 0]
  );

  const scale = useTransform(scrollYProgress, [start, end], [1.05, 1.0]);

  return (
    <motion.div
      key={step.number}
      style={{ opacity, scale }}
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      <img
        src={step.image}
        alt={step.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
    </motion.div>
  );
}

function StepTextOverlay({
  step,
  idx,
  scrollYProgress,
}: {
  step: StoryStep;
  idx: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = idx * 0.25;
  const end = (idx + 1) * 0.25;
  const mid = (start + end) / 2;

  const opacity = useTransform(
    scrollYProgress,
    [start, mid - 0.05, mid + 0.05, end],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start, mid - 0.05, mid + 0.05, end],
    [40, 0, 0, -40]
  );

  return (
    <motion.div
      key={`text-${step.number}`}
      style={{ opacity, y }}
      className="absolute inset-x-6 sm:inset-x-12 max-w-2xl text-left"
    >
      <div className="flex items-center gap-3 text-haven-gold font-serif text-sm sm:text-base tracking-[0.25em] uppercase mb-4">
        <span className="font-bold text-lg sm:text-xl">{step.number}</span>
        <span className="w-8 h-[1px] bg-haven-gold/60" />
        <span>{step.subtitle}</span>
      </div>

      <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F5F0E8] tracking-wide leading-tight mb-4 drop-shadow-md">
        {step.title}
      </h2>

      <p className="font-sans text-lg sm:text-2xl text-[#E8D5A3]/90 font-light leading-relaxed max-w-xl drop-shadow-sm">
        {step.description}
      </p>
    </motion.div>
  );
}

function StepIndicatorItem({
  step,
  idx,
  scrollYProgress,
}: {
  step: StoryStep;
  idx: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = idx * 0.25;
  const end = (idx + 1) * 0.25;

  const stepOpacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [0.4, 1, 1, 0.4]
  );

  return (
    <motion.span
      key={step.number}
      style={{ opacity: stepOpacity }}
      className="transition-colors duration-300"
    >
      {step.number} — {step.subtitle}
    </motion.span>
  );
}

export function StorytellingScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {STORY_STEPS.map((step, idx) => (
          <StepBgImage
            key={step.number}
            step={step}
            idx={idx}
            scrollYProgress={scrollYProgress}
          />
        ))}

        <div className="relative z-20 max-w-5xl w-full px-6 sm:px-12 flex flex-col justify-center min-h-[50vh]">
          {STORY_STEPS.map((step, idx) => (
            <StepTextOverlay
              key={`text-${step.number}`}
              step={step}
              idx={idx}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <div className="absolute bottom-10 inset-x-0 z-30 flex flex-col items-center gap-3 px-6">
          <div className="flex items-center gap-4 text-xs font-serif tracking-widest text-[#F5F0E8]/70">
            {STORY_STEPS.map((step, idx) => (
              <StepIndicatorItem
                key={step.number}
                step={step}
                idx={idx}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          <div className="w-48 sm:w-64 h-[2px] bg-white/20 rounded-full overflow-hidden relative">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
              className="w-full h-full bg-haven-gold"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
