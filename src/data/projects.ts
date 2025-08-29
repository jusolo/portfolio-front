import type { Project } from "@/components/project-card";

export const projects: Project[] = [
  {
    id: "p1",
    title: "Dashboard UNP",
    description: "Panel modular con autenticación, roles y consumo de APIs.",
    tech: ["Angular", "NestJS", "Tailwind", "JWT"],
    link: "#",
    repo: "#",
  },
  {
    id: "p2",
    title: "E-commerce Minimal",
    description:
      "Checkout con Wompi, carrito persistente y catálogo filtrable.",
    tech: ["React", "TypeScript", "Wompi", "Cloudinary"],
    link: "#",
  },
  {
    id: "p3",
    title: "API de IA Conversacional",
    description: "FastAPI + Gemini, logging y contexto dinámico por txts.",
    tech: ["FastAPI", "Gemini", "Python"],
  },
];
