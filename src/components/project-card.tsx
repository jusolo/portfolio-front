import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDesc?: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
  startDate?: string;
  endDate?: string;
  featured: boolean;
}

export function ProjectCard({ project }: { project: Project }) {
  const hasDemo = project.demo && project.demo !== "#";
  const hasGithub = project.github && project.github !== "#";

  return (
    <div className="project-card group h-full flex flex-col rounded-xl border bg-card overflow-hidden">
      {/* accent bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* header */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="hp-title text-base font-semibold leading-snug text-foreground">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 shrink-0">
            {hasGithub && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="project-icon-btn"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {hasDemo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label="Demo"
                className="project-icon-btn"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 flex-1">
          {project.description}
        </p>

        {/* tech badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.map((t) => (
            <Badge
              key={t}
              variant="outline"
              className="text-xs border-amber-400/30 text-amber-400/90 bg-amber-400/5"
            >
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
