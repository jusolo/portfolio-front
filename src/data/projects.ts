import type { Project } from "@/components/project-card";

export const projects: Project[] = [
  {
    id: "p1",
    title: "Rivly",
    description: "Aplicación movil de retos entre usuarios.",
    tech: ["React native", "Expo", "Better auth", "Postgresql"],
    link: "https://challengers-landing.vercel.app",
    repo: "#",
  },
  {
    id: "p2",
    title: "E-commerce Minimal (Comedy Tickets)",
    description: "Plataforma de venta de tickets para shows de comedia en Colombia con autenticación de usuarios, carrito de compras persistente y procesamiento de pagos mediante Stripe.",
    tech: ["React", "TypeScript", "NextJS", "Stripe", "Better Auth"],
    link: "https://tickets-eta-beryl.vercel.app",
    repo: "https://github.com/jusolo/tickets"
  },
  {
    id: "p3",
    title: "API de IA Conversacional",
    description: "FastAPI + Gemini, logging y contexto dinámico por txts.",
    tech: ["FastAPI", "Gemini", "Python"],
  },
];
