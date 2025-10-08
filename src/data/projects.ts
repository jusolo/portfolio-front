import type { Project } from "@/components/project-card";

export const projects: Project[] = [
  {
    id: "p1",
    title: "Rivly",
    description: "Aplicación movil de retos entre usuarios.",
    technologies: ["React native", "Expo", "Better auth", "Postgresql"],
    demo: "https://challengers-landing.vercel.app",
    github: "#",
    featured: true,
  },
  {
    id: "p2",
    title: "E-commerce Minimal (Comedy Tickets)",
    description: "Plataforma de venta de tickets para shows de comedia en Colombia con autenticación de usuarios, carrito de compras persistente y procesamiento de pagos mediante Stripe.",
    technologies: ["React", "TypeScript", "NextJS", "Stripe", "Better Auth"],
    demo: "https://tickets-eta-beryl.vercel.app",
    github: "https://github.com/jusolo/tickets",
    featured: true,
  },
  {
    id: "p3",
    title: "API de IA Conversacional",
    description: "FastAPI + Gemini, logging y contexto dinámico por txts.",
    technologies: ["FastAPI", "Gemini", "Python"],
    featured: true,
  },
];
