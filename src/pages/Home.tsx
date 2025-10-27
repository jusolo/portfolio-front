import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { motion } from "framer-motion";
import Particles from "@/components/particles";
import SplashCursor from "@/components/splashCursor";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { Card } from "@/components/ui/card";

export function Home() {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.02 } },
  };
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <>
      <SplashCursor />
      <div className="min-h-dvh">
        <Navbar />
        {/* HERO */}
        <section
          className="relative min-h-[100svh] flex items-center overflow-hidden"
          style={{ backgroundImage: "url(/img/hp-hero.jpg)" }}
        >
          {/* capa de fondo */}
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: "url(/img/hp-hero.jpg)" }}
            aria-hidden
          />

          {/* capa de partículas */}
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

          {/* degradé encima para que el texto se lea */}
          <div
            className="absolute inset-0 z-[2] bg-gradient-to-b from-background/70 via-background/30 to-background"
            aria-hidden
          />

          {/* contenido */}
          <div className="relative z-10 container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-sm font-medium text-foreground/80">
                Ingeniero de software
              </p>
              <h1 className="hp-title text-3xl md:text-5xl mt-2 text-foreground">
                Juan Sebastián Ospina Losada
              </h1>
              <p className="mt-4 text-foreground/70 max-w-xl text-base md:text-lg font-medium">
                Diseño software y desarrollo web con enfoque en claridad,
                rendimiento y escalabilidad.
              </p>
              <div className="mt-6 flex gap-4">
                <motion.div
                  whileHover={{
                    y: -6,
                    scale: 1.08,
                    boxShadow: "0 0 25px rgba(251, 191, 36, 0.7)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15
                  }}
                  className="inline-block rounded-lg overflow-hidden"
                >
                  <a href="#projects">
                    <Button className="btn-spell text-base px-6 py-6 font-semibold shadow-lg">
                      Ver proyectos
                    </Button>
                  </a>
                </motion.div>
                <motion.div
                  whileHover={{
                    y: -6,
                    scale: 1.08,
                    boxShadow: "0 0 20px rgba(251, 191, 36, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15
                  }}
                  className="inline-block rounded-lg overflow-hidden"
                >
                  <a href="#contact">
                    <Button variant="outline" className="text-base px-6 py-6 font-semibold border-2 hover:border-amber-400 hover:bg-amber-400/5 hover:text-amber-300 shadow-lg backdrop-blur-sm">
                      Contacto
                    </Button>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        {/* SOBRE MI */}
        <Section id="about" title="Sobre mí">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center md:justify-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative w-64 h-64 md:w-80 md:h-80"
              >
                <img
                  src="/img/profile.png"
                  alt="Juan Sebastián Ospina Losada"
                  className="w-full h-full object-cover rounded-2xl shadow-lg border-2 border-amber-400/20"
                />
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
              <motion.div
                whileHover={{
                  y: -4,
                  scale: 1.02,
                  boxShadow: "0 0 16px rgba(251, 191, 36, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15
                }}
                className="inline-block rounded-lg overflow-hidden"
              >
                <a href="/cv.pdf" download>
                  <Button className="btn-spell px-6 py-6 text-base">
                    Descargar CV
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>
        </Section>
        {/* SKILLS */}
        <Section id="skills" title="Habilidades">
          <div className="space-y-8">
            {skills.map((category, catIndex) => (
              <div key={catIndex}>
                <h3 className="text-lg font-semibold mb-3 text-amber-400">
                  {category.category}
                </h3>
                <motion.ul
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm"
                >
                  {category.items.map((skill, i) => (
                    <motion.li
                      key={i}
                      variants={item}
                      whileHover={{ y: -2 }}
                      className="rounded-xl border px-3 py-2 text-center bg-muted/40 hover:border-amber-400/60 hover:shadow-[0_0_8px_rgba(251,191,36,0.3)] transition-all duration-300"
                    >
                      {skill}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            ))}
          </div>
        </Section>
        {/* PROYECTOS */}
        <Section id="projects" title="Proyectos">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((p) => (
              <motion.div
                key={p.id}
                variants={item}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="will-change-transform rounded-xl [&>*]:rounded-xl hover:[&>*]:border-amber-400/60 hover:[&>*]:shadow-[0_0_12px_rgba(251,191,36,0.4)] [&>*]:transition-all [&>*]:duration-300"
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </motion.div>
        </Section>
        {/* CONTACTO */}
        <Section id="contact" title="Contacto">
          <Card className="text-center py-16">
            <h3 className="text-5xl font-medium mb-2 hp-title">
              ¿Tienes un proyecto increíble?
            </h3>
            <p className="text-xl text-muted-foreground mb-4">
              Puedes escribirme por correo.
            </p>
            <a href="mailto:jolosada1a@gmail.com">
              <motion.div
                key="contact-button"
                whileHover={{
                  y: -6,
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(251, 191, 36, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15
                }}
                className="inline-block rounded-lg overflow-hidden"
              >
                <Button className="w-full sm:w-auto py-6 uppercase font-bold">
                  Enviar email
                </Button>
              </motion.div>
            </a>
          </Card>
        </Section>
        {/* FOOTER */}
        <footer className="border-t py-8 mt-10">
          <div className="container mx-auto px-4 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Juan Sebastián Ospina. Hecho con React
            y shadcn/ui.
          </div>
        </footer>
      </div>
    </>
  );
}
