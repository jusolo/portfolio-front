import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

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
  const content = (
    <Card className="h-full perchment cursor-pointer">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span>{project.title}</span>
          {project.demo && (
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          )}
        </CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {project.technologies.map((t) => (
          <Badge key={t} variant="secondary">
            {t}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );

  if (project.demo) {
    return (
      <a
        href={project.demo}
        target="_blank"
        rel="noreferrer"
        className="block h-full"
        aria-label={`Ver proyecto ${project.title}`}
      >
        {content}
      </a>
    );
  }

  return content;
}
