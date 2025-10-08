import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { motion } from "framer-motion";
import Particles from "@/components/particles";
import SplashCursor from "@/components/splashCursor";
import { useEffect, useState } from "react";
import { getProjects, getSkills } from "@/lib/api";

export function Home() {
  const [projects, setProjects] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProjects(), getSkills()])
      .then(([projectsData, skillsData]) => {
        setProjects(projectsData.filter((p: any) => p.featured));
        setSkills(skillsData);
      })
      .catch((err) => console.error("Error loading data:", err))
      .finally(() => setLoading(false));
  }, []);

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
              <p className="text-sm text-muted-foreground">
                Ingeniero de software
              </p>
              <h1 className="hp-title text-3xl md:text-5xl mt-2">
                Juan Sebastián Ospina Losada
              </h1>
              <p className="mt-4 text-muted-foreground max-w-xl">
                Diseño software y desarrollo web con enfoque en claridad,
                rendimiento y escalabilidad.
              </p>
              <div className="mt-6 flex gap-3">
                <a href="#projects">
                  <Button className="btn-spell">Ver proyectos</Button>
                </a>
                <a href="#contact">
                  <Button variant="outline">Contacto</Button>
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* SOBRE MI */}
        <Section id="about" title="Sobre mí">
          <p className="max-w-3xl text-muted-foreground">
            Soy ingeniero de software colombiano con experiencia en diseño de
            software y desarrollo web. Me interesa crear soluciones digitales
            claras, funcionales y eficientes, integrando buenas prácticas,
            usabilidad y escalabilidad. Disfruto trabajar con stacks modernos y
            equipos que cuidan el detalle.
          </p>
        </Section>
        {/* SKILLS */}
        <Section id="skills" title="Skills">
          {loading ? (
            <p className="text-muted-foreground">Cargando habilidades...</p>
          ) : (
            <motion.ul
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm"
            >
              {skills.map((s) => (
                <motion.li
                  key={s.id}
                  variants={item}
                  whileHover={{ y: -2 }}
                  className="rounded-xl border px-3 py-2 text-center bg-muted/40 hover:border-amber-400/60 hover:shadow-[0_0_8px_rgba(251,191,36,0.3)] transition-all duration-300"
                >
                  {s.name}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </Section>
        {/* PROYECTOS */}
        <Section id="projects" title="Proyectos">
          {loading ? (
            <p className="text-muted-foreground">Cargando proyectos...</p>
          ) : (
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
                  className="will-change-transform hover:[&>*]:border-amber-400/60 hover:[&>*]:shadow-[0_0_12px_rgba(251,191,36,0.4)] [&>*]:transition-all [&>*]:duration-300"
                >
                  <ProjectCard project={p} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </Section>
        {/* CONTACTO */}
        <Section id="contact" title="Contacto">
          <div className="max-w-xl">
            <p className="text-muted-foreground mb-4">
              ¿Hablamos de un proyecto o una colaboración? Puedes escribirme por
              correo.
            </p>
            <a href="mailto:jolosada1a@gmail.com">
              <Button className="w-full sm:w-auto">Enviar email</Button>
            </a>
          </div>
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
