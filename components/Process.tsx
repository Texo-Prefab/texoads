'use client';

import { useEffect, useRef, useState } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import {
  AnimatePresence,
  MotionValue,
  easeInOut,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
});

/* -------------------------------------------------------------------------- */
/*  Content                                                                   */
/* -------------------------------------------------------------------------- */

const GOLD = '#886c46';

const STEPS = [
  {
    day: 'Day 0',
    title: 'Inquiry',
    body: 'We discuss your vision, requirements and budget with our expert team, and map it to your site.',
  },
  {
    day: 'Day 1–3',
    title: 'Design & Customisation',
    body: 'Our architects turn it into a custom design — layout, finishes, colours — tailored to your brand.',
  },
  {
    day: 'Day 4–30',
    title: 'Factory Manufacturing',
    body: 'Your office is built under quality control in our in-house facility while your site stays clear.',
  },
  {
    day: 'Day 30+',
    title: 'Dispatch & Installation',
    body: 'We transport, install and hand over a plug-and-play office, ready to use from day one.',
  },
] as const;

// Where clicking a step lands on the 0–1 scroll timeline.
const STEP_TARGETS = [0.06, 0.4, 0.7, 0.97];

/* -------------------------------------------------------------------------- */
/*  3D world (all values in px, y is down)                                    */
/* -------------------------------------------------------------------------- */

const W = 240; // module width
const H = 130; // module height
const D = 150; // module depth
const SITE = 300; // x of the client's site
const FACTORY = -300; // x of the factory
const LIFT = 70; // crane lift height during dispatch

type FaceDef = {
  id: string;
  rot: string;
  dist: number; // distance from centre along the face normal
  w: number;
  h: number;
  color: string;
  explode: number; // extra distance while the module is being assembled
  settle: number; // scroll progress at which the face is back in place
  detail: 'none' | 'seams' | 'window' | 'entry' | 'roof';
};

const FACES: FaceDef[] = [
  { id: 'bottom', rot: 'rotateX(-90deg)', dist: H / 2, w: W, h: D, color: '#d3c5ac', explode: 140, settle: 0.6, detail: 'none' },
  { id: 'back', rot: 'rotateY(180deg)', dist: D / 2, w: W, h: H, color: '#e4d9c6', explode: 200, settle: 0.66, detail: 'seams' },
  { id: 'left', rot: 'rotateY(-90deg)', dist: W / 2, w: D, h: H, color: '#e4d9c6', explode: 230, settle: 0.68, detail: 'window' },
  { id: 'right', rot: 'rotateY(90deg)', dist: W / 2, w: D, h: H, color: '#ddd0ba', explode: 230, settle: 0.7, detail: 'window' },
  { id: 'front', rot: 'rotateY(0deg)', dist: D / 2, w: W, h: H, color: '#efe7d9', explode: 200, settle: 0.72, detail: 'entry' },
  { id: 'top', rot: 'rotateX(90deg)', dist: H / 2, w: W, h: D, color: '#f7f3ec', explode: 260, settle: 0.76, detail: 'roof' },
];

/** Everything about the module that changes with scroll progress. */
function useModuleMotion(p: MotionValue<number>) {
  // Site → (hidden hand-off) → factory → crane → road → site
  const x = useTransform(p, [0, 0.5, 0.501, 0.8, 0.92, 1], [SITE, SITE, FACTORY, FACTORY, SITE, SITE], { ease: easeInOut });
  const y = useTransform(p, [0, 0.76, 0.8, 0.92, 0.97, 1], [0, 0, -LIFT, -LIFT, 0, 0], { ease: easeInOut });
  const fade = useTransform(p, [0, 0.44, 0.49, 0.51, 0.56, 1], [1, 1, 0, 0, 1, 1]);
  const fill = useTransform(p, [0.5, 0.74], [0, 1]);
  const detail = useTransform(p, [0.22, 0.34], [0, 1]);
  const border = useTransform(p, [0.2, 0.3], [GOLD, '#000000']);
  const shadow = useTransform([y, fade], (v: number[]) => v[1] * (0.12 + (v[0] / LIFT) * 0.07));
  return { x, y, fade, fill, detail, border, shadow };
}

type ModuleMotion = ReturnType<typeof useModuleMotion>;

function FaceDetail({ kind, w, h }: { kind: FaceDef['detail']; w: number; h: number }) {
  const line = { stroke: '#000', strokeWidth: 1, vectorEffect: 'non-scaling-stroke' as const };

  if (kind === 'entry') {
    return (
      <>
        <rect x={w * 0.08} y={h * 0.26} width={w * 0.13} height={h * 0.74} fill={GOLD} {...line} />
        <rect x={w * 0.38} y={h * 0.24} width={w * 0.46} height={h * 0.38} fill="#fff" {...line} />
        <line x1={0} x2={w} y1={h * 0.9} y2={h * 0.9} {...line} />
      </>
    );
  }
  if (kind === 'window') {
    return <rect x={w * 0.3} y={h * 0.24} width={w * 0.4} height={h * 0.38} fill="#fff" {...line} />;
  }
  if (kind === 'seams') {
    return (
      <>
        {[0.25, 0.5, 0.75].map((t) => (
          <line key={t} x1={w * t} x2={w * t} y1={0} y2={h} {...line} />
        ))}
      </>
    );
  }
  if (kind === 'roof') {
    return (
      <>
        {[0.25, 0.5, 0.75].map((t) => (
          <line key={t} x1={w * t} x2={w * t} y1={0} y2={h} {...line} />
        ))}
        <line x1={0} x2={w} y1={h / 2} y2={h / 2} {...line} />
      </>
    );
  }
  return null;
}

function Face({ def, p, m }: { def: FaceDef; p: MotionValue<number>; m: ModuleMotion }) {
  // Each face flies out when the factory stage begins, then settles in order.
  const explode = useTransform(p, [0, 0.5, 0.501, def.settle, 1], [0, 0, def.explode, 0, 0], { ease: easeInOut });
  const dist = useTransform(explode, (v) => def.dist + v);
  const transform = useMotionTemplate`${def.rot} translateZ(${dist}px)`;

  return (
    <motion.div
      className="absolute"
      style={{ width: def.w, height: def.h, left: -def.w / 2, top: -def.h / 2, transform, opacity: m.fade }}
    >
      <motion.div className="absolute inset-0" style={{ backgroundColor: def.color, opacity: m.fill }} />
      {def.detail !== 'none' && (
        <motion.svg
          className="absolute inset-0"
          width="100%"
          height="100%"
          viewBox={`0 0 ${def.w} ${def.h}`}
          style={{ opacity: m.detail }}
        >
          <FaceDetail kind={def.detail} w={def.w} h={def.h} />
        </motion.svg>
      )}
      <motion.div className="absolute inset-0 border-[1.5px] border-solid" style={{ borderColor: m.border }} />
    </motion.div>
  );
}

const plane = (x: number, depth: number) => `translate3d(${x}px, ${H / 2 + depth}px, 0px) rotateX(90deg)`;

function GroundRect({
  x,
  depth,
  w,
  h,
  className = '',
  children,
}: {
  x: number;
  depth: number;
  w: number;
  h: number;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{ width: w, height: h, left: -w / 2, top: -h / 2, transform: plane(x, depth) }}
    >
      {children}
    </div>
  );
}

function Scene({ p, scale }: { p: MotionValue<number>; scale: number }) {
  const m = useModuleMotion(p);

  const yaw = useTransform(p, [0, 0.25, 0.5, 0.75, 1], [-34, -22, -32, -46, -30]);
  // Camera follows the action: site → factory → back to site
  const pan = useTransform(p, [0, 0.45, 0.55, 0.8, 0.92, 1], [-SITE, -SITE, -FACTORY, -FACTORY, -SITE, -SITE], {
    ease: easeInOut,
  });

  const sceneT = useMotionTemplate`scale(${scale}) rotateX(-30deg) rotateY(${yaw}deg) translate3d(${pan}px, 0px, 0px)`;
  const moduleT = useMotionTemplate`translate3d(${m.x}px, ${m.y}px, 0px)`;
  const shadowT = useMotionTemplate`translate3d(${m.x}px, ${H / 2 + 1}px, 0px) rotateX(90deg)`;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 h-0 w-0"
      style={{ transform: sceneT, transformStyle: 'preserve-3d' }}
    >
      {/* Ground: factory, road, site */}
      <GroundRect x={FACTORY} depth={3} w={340} h={250} className="border-[1.5px] border-black/30">
        <span className="absolute bottom-2 left-3 text-xs text-black/50">Factory</span>
      </GroundRect>
      <GroundRect x={0} depth={3} w={260} h={70} className="border-y border-black/20">
        <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-black/25" />
      </GroundRect>
      <GroundRect x={SITE} depth={3} w={340} h={250} className="border-[1.5px] border-dashed border-[#886c46]/60">
        <span className="absolute bottom-2 left-3 text-xs text-black/50">Your site</span>
      </GroundRect>
      <GroundRect x={SITE} depth={2} w={W} h={D} className="border-[1.5px] border-[#886c46]" />

      {/* Soft contact shadow */}
      <motion.div
        className="absolute bg-black"
        style={{ width: W, height: D, left: -W / 2, top: -D / 2, transform: shadowT, opacity: m.shadow }}
      />

      {/* The office module */}
      <motion.div className="absolute left-0 top-0" style={{ transform: moduleT, transformStyle: 'preserve-3d' }}>
        {FACES.map((f) => (
          <Face key={f.id} def={f} p={p} m={m} />
        ))}
      </motion.div>
    </motion.div>
  );
}

function useStageScale() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);
  const [measured, setMeasured] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.max(0.45, Math.min(width / 560, height / 440, 1.7)));
      setMeasured(true);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, scale, measured };
}

/* -------------------------------------------------------------------------- */
/*  UI                                                                        */
/* -------------------------------------------------------------------------- */

function Fill({ p, index, axis }: { p: MotionValue<number>; index: number; axis: 'x' | 'y' }) {
  const v = useTransform(p, [index * 0.25, (index + 1) * 0.25], [0, 1]);
  return (
    <motion.span
      className={`absolute inset-0 bg-[#886c46] ${axis === 'y' ? 'origin-top' : 'origin-left'}`}
      style={axis === 'y' ? { scaleY: v } : { scaleX: v }}
    />
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4, restDelta: 0.0005 });
  const p = reduceMotion ? scrollYProgress : smooth;

  useMotionValueEvent(p, 'change', (v) => {
    setActive(Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length))));
  });

  const { ref: stageRef, scale, measured } = useStageScale();

  const goTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + range * STEP_TARGETS[i], behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-labelledby="process-title"
      className="relative h-[500vh] bg-white text-black"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-5 pb-6 pt-20 sm:px-8 lg:grid lg:grid-cols-[5fr_6fr] lg:items-center lg:gap-16 lg:py-0">
          {/* Text column */}
          <div className="shrink-0">
            <h2
              id="process-title"
              className={`${playfair.className} text-3xl font-medium tracking-tight sm:text-4xl lg:mb-12 lg:text-6xl`}
            >
              Our process
            </h2>

            {/* Desktop: full step list */}
            <ol className="hidden lg:block">
              {STEPS.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.title} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-full border text-sm font-medium transition-colors duration-300 motion-reduce:transition-none ${
                          isActive
                            ? 'border-[#886c46] bg-[#886c46] text-white'
                            : i < active
                              ? 'border-[#886c46] bg-white text-[#886c46]'
                              : 'border-black/20 bg-white text-black/40'
                        }`}
                      >
                        {i + 1}
                      </span>
                      {i < STEPS.length - 1 && (
                        <span className="relative my-2 w-px flex-1 bg-black/15">
                          <Fill p={p} index={i} axis="y" />
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={isActive ? 'step' : undefined}
                      className="pb-8 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#886c46]"
                    >
                      <span
                        className={`${inter.className} block text-sm font-medium transition-colors duration-300 motion-reduce:transition-none ${
                          isActive ? 'text-[#886c46]' : 'text-black/40'
                        }`}
                      >
                        {s.day}
                      </span>
                      <span
                        className={`${playfair.className} mt-1 block text-3xl font-medium tracking-tight transition-colors duration-300 motion-reduce:transition-none ${
                          isActive ? 'text-black' : 'text-black/35'
                        }`}
                      >
                        {s.title}
                      </span>
                      <span
                        className={`grid transition-[grid-template-rows,opacity] duration-500 motion-reduce:transition-none ${
                          isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className={`${inter.className} mt-3 block max-w-md text-lg leading-relaxed text-black/70`}>
                            {s.body}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* 3D stage */}
          <div
            ref={stageRef}
            role="img"
            aria-label="3D illustration of an office module moving from design, to factory, to installation on your site"
            className="relative min-h-0 flex-1 transition-opacity duration-300 lg:h-[76svh] lg:flex-none"
            style={{ perspective: 1600, opacity: measured ? 1 : 0 }}
          >
            <Scene p={p} scale={scale} />
          </div>

          {/* Mobile: progress + active step */}
          <div className="shrink-0 pt-3 lg:hidden">
            <div className="flex gap-2">
              {STEPS.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  aria-label={`Go to step ${i + 1}: ${s.title}`}
                  aria-current={i === active ? 'step' : undefined}
                  onClick={() => goTo(i)}
                  className="flex-1 py-3 focus-visible:outline-2 focus-visible:outline-[#886c46]"
                >
                  <span className="relative block h-[3px] overflow-hidden bg-black/15">
                    <Fill p={p} index={i} axis="x" />
                  </span>
                </button>
              ))}
            </div>

            <div className="min-h-[9.5rem] pt-2">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className={`${inter.className} text-sm font-medium text-[#886c46]`}>
                    {active + 1}. {STEPS[active].day}
                  </p>
                  <h3 className={`${playfair.className} mt-1 text-2xl font-medium tracking-tight`}>
                    {STEPS[active].title}
                  </h3>
                  <p className={`${inter.className} mt-2 text-base leading-relaxed text-black/70`}>
                    {STEPS[active].body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}