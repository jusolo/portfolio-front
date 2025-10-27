export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Lenguajes",
    items: ["JavaScript", "TypeScript", "Python"]
  },
  {
    category: "Frontend",
    items: ["React", "Angular", "HTML/CSS"]
  },
  {
    category: "Backend",
    items: ["NestJS", "Django", "REST APIs", "WebSockets"]
  },
  {
    category: "Datos",
    items: ["PostgreSQL", "Pandas", "scikit-learn"]
  },
  {
    category: "DevOps & Herramientas",
    items: ["Docker", "Git", "Agile"]
  }
];
