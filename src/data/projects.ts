import type { Project } from "@/components/project-card";

export const projects: Project[] = [
  {
    id: "p1",
    title: "MyPay",
    description:
      "Plataforma web para freelancers y contratistas que automatiza la gestión de contratos de prestación de servicios. Permite generar cuentas de cobro, crear informes mensuales personalizados y organizar evidencias de trabajo de forma automática, optimizando el proceso de facturación independiente.",
    technologies: ["React", "Next.js", "Better Auth", "PostgreSQL"],
    demo: "https://mypay-company.vercel.app",
    github: "#",
    featured: true,
  },
  {
    id: "p2",
    title: "Plataforma de Gestión de Tickets",
    description:
      "Sistema full-stack para venta de tickets con disponibilidad en tiempo real, pagos seguros y control de acceso basado en roles. Desplegado en Vercel con backend optimizado para alta concurrencia.",
    technologies: ["Next.js", "Better Auth", "PostgreSQL"],
    demo: "https://tickets-eta-beryl.vercel.app/",
    github: "https://github.com/jusolo/tickets",
    featured: true,
  },
  {
    id: "p3",
    title: "Chatbot IA con Memoria Contextual",
    description:
      "Chatbot inteligente impulsado por Gemini API con comprensión contextual de documentos .txt. Incluye encadenamiento de prompts e inyección dinámica de contexto para simular respuestas naturales en diversos temas.",
    technologies: ["TypeScript", "Gemini API", "Node.js", "LangChain"],
    demo: "#",
    github: "#",
    featured: true,
  },
];
