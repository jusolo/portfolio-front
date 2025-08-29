import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Navbar } from "@/components/navbar";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export function Home() {
  return (
    <div className="min-h-dvh">
      <Navbar />

      {/* HERO */}
      <section className="container mx-auto px-4 pt-16 pb-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              Ingeniero de software
            </p>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mt-2">
              Juan Sebastián Ospina Losada
            </h1>
            <p className="mt-4 text-muted-foreground">
              Diseño software y desarrollo web con enfoque en claridad,
              rendimiento y escalabilidad. 24 años, construyendo productos que
              resuelven problemas reales.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#projects">
                <Button>Ver proyectos</Button>
              </a>
              <a href="#contact">
                <Button variant="outline">Contacto</Button>
              </a>
            </div>
          </div>

          <div className="flex md:justify-end">
            <Avatar className="h-28 w-28 border">
              <AvatarFallback>JO</AvatarFallback>
            </Avatar>
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
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
          {[
            "TypeScript",
            "React",
            "Angular",
            "NestJS",
            "FastAPI",
            "TailwindCSS",
            "JWT",
            "PostgreSQL",
          ].map((s) => (
            <li
              key={s}
              className="rounded-xl border px-3 py-2 text-center bg-muted/40"
            >
              {s}
            </li>
          ))}
        </ul>
      </Section>

      {/* PROYECTOS */}
      <Section id="projects" title="Proyectos">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
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
          © {new Date().getFullYear()} Juan Sebastián Ospina. Hecho con React y
          shadcn/ui.
        </div>
      </footer>
    </div>
  );
}
