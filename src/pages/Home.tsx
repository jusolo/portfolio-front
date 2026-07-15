import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Particles from "@/components/particles";
import SplashCursor from "@/components/splashCursor";
import { SnitchCanvas } from "@/components/snitch-canvas";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { useEffect, useRef, useState } from "react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

// ── Typewriter ────────────────────────────────────────────────────────────────
function Typewriter({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) { setDisplayed(text); setDone(true); return; }
    let i = 0;
    const tid = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, 26);
      return () => clearInterval(iv);
    }, startDelay * 1000);
    return () => clearTimeout(tid);
  }, [text, startDelay, reduce]);

  return (
    <>
      {displayed}
      {!done && <span className="typewriter-cursor" aria-hidden>|</span>}
    </>
  );
}

// ── Tilt photo ────────────────────────────────────────────────────────────────
function TiltPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });
  const reduce = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      className="w-64 h-64 md:w-80 md:h-80" style={{ perspective: "600px" }}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="w-full h-full relative"
      >
        <img
          src="/img/profile.png"
          alt="Juan Sebastián Ospina Losada"
          className="w-full h-full object-cover rounded-2xl shadow-xl border-2 border-amber-400/20"
        />
        {/* shine overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]: number[]) =>
                `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, oklch(0.78 0.12 85 / 0.18), transparent 65%)`,
            ),
          }}
        />
      </motion.div>
    </div>
  );
}

// ── Home ──────────────────────────────────────────────────────────────────────
export function Home() {
  const reduce = useReducedMotion();

  const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
  };
  const staggerItem = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT } },
  };

  const heroFadeUp = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: EASE_OUT },
        };

  return (
    <>
      <SplashCursor />
      {/* Snitch floats over the whole page, always visible */}
      <SnitchCanvas />
      <div className="min-h-dvh">
        <Navbar />

        {/* HERO */}
        <section className="relative min-h-[100svh] flex items-center overflow-hidden">
          {/* background image */}
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: "url(/img/hp-hero.jpg)" }}
            aria-hidden
          />

          {/* particles */}
          <div className="absolute inset-0 z-[1]">
            <Particles
              particleColors={["#ffffff", "#ffffff"]}
              particleCount={200}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={true}
              alphaParticles={true}
              disableRotation={false}
            />
          </div>

          {/* gradient overlay */}
          <div
            className="absolute inset-0 z-[2] bg-gradient-to-b from-background/70 via-background/30 to-background"
            aria-hidden
          />

          {/* content — single column, centred */}
          <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center min-h-[100svh] py-24 max-w-2xl">
            <motion.p
              {...heroFadeUp(0.1)}
              className="text-sm font-medium text-foreground/80 uppercase tracking-widest"
            >
              Ingeniero de software
            </motion.p>

            <motion.h1
              {...heroFadeUp(0.22)}
              className="hp-title text-3xl md:text-5xl mt-3 text-foreground"
            >
              Juan Sebastián Ospina Losada
            </motion.h1>

            <motion.p
              {...heroFadeUp(0.34)}
              className="mt-4 text-foreground/70 max-w-xl text-base md:text-lg font-medium"
            >
              <Typewriter
                text="Diseño software y desarrollo web con enfoque en claridad, rendimiento y escalabilidad."
                startDelay={0.9}
              />
            </motion.p>

            <motion.div
              {...heroFadeUp(0.46)}
              className="mt-8 flex gap-4"
            >
              <a href="#projects">
                <Button className="btn-spell text-base px-6 py-6 font-semibold shadow-lg">
                  Ver proyectos
                </Button>
              </a>
              <a href="#contact">
                <Button
                  variant="outline"
                  className="text-base px-6 py-6 font-semibold border-2 hover:border-amber-400 hover:bg-amber-400/5 hover:text-amber-300 shadow-lg backdrop-blur-sm"
                >
                  Contacto
                </Button>
              </a>
            </motion.div>
          </div>
        </section>

        {/* SOBRE MI */}
        <Section id="about" title="Sobre mí">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center md:justify-start">
              <motion.div
                initial={reduce ? undefined : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                <TiltPhoto />
              </motion.div>
            </div>
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Soy ingeniero de software colombiano con experiencia en diseño de
                software y desarrollo web. Me interesa crear soluciones digitales
                claras, funcionales y eficientes, integrando buenas prácticas,
                usabilidad y escalabilidad. Disfruto trabajar con stacks modernos y
                equipos que cuidan el detalle.
              </p>
              <a href="/cv.pdf" download>
                <Button className="btn-spell px-6 py-6 text-base">
                  Descargar CV
                </Button>
              </a>
            </div>
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills" title="Habilidades">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={reduce ? undefined : { opacity: 0, y: 20 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: catIndex * 0.08, ease: EASE_OUT }}
                className="grimoire-card"
              >
                <div className="grimoire-ornament" aria-hidden>
                  <span />
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-amber-400/60">
                    <path d="M8 0l1.5 5.5L16 8l-6.5 1.5L8 16l-1.5-6.5L0 8l6.5-1.5z" />
                  </svg>
                  <span />
                </div>
                <h3 className="hp-title text-base font-semibold text-amber-400 text-center mb-4">
                  {category.category}
                </h3>
                <ul className="flex flex-wrap gap-2 justify-center">
                  {category.items.map((skill, i) => (
                    <li key={i} className="skill-chip rounded-lg border px-3 py-1.5 text-sm bg-muted/40">
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* PROYECTOS */}
        <Section id="projects" title="Proyectos">
          <motion.div
            variants={reduce ? undefined : staggerContainer}
            initial={reduce ? undefined : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((p) => (
              <motion.div
                key={p.id}
                variants={reduce ? undefined : staggerItem}
                className="project-card-wrapper will-change-transform rounded-xl [&>*]:rounded-xl"
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </motion.div>
        </Section>

        {/* CONTACTO */}
        <section id="contact" className="relative overflow-hidden py-28">
          {/* layered bg */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-950/8 to-transparent dark:via-amber-950/15" aria-hidden />
          <div className="contact-constellation absolute inset-0" aria-hidden />

          <div className="relative container mx-auto px-4 text-center">
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              {/* ornament */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-amber-400/50 text-lg">✦</span>
                <p className="text-xs uppercase tracking-[0.25em] text-amber-400/70 font-medium">
                  Owl Post
                </p>
                <span className="text-amber-400/50 text-lg">✦</span>
              </div>

              <h2 className="hp-title text-4xl md:text-6xl font-semibold mb-5 text-foreground leading-tight">
                ¿Tienes un proyecto<br className="hidden sm:block" /> increíble?
              </h2>

              <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
                Escríbeme y lo conversamos.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="mailto:jolosada1@gmail.com">
                  <Button className="btn-spell py-6 px-12 text-base font-bold tracking-wider uppercase shadow-lg">
                    Enviar mensaje
                  </Button>
                </a>
                <a
                  href="https://github.com/jusolo"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    variant="outline"
                    className="py-6 px-8 text-base border-2 hover:border-amber-400 hover:bg-amber-400/5 hover:text-amber-300"
                  >
                    Ver GitHub
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t py-8">
          <div className="container mx-auto px-4 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Juan Sebastián Ospina. Hecho con React y shadcn/ui.
          </div>
        </footer>
      </div>
    </>
  );
}
