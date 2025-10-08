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
  return (
    <Card className="h-full perchment">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span>{project.title}</span>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground"
              aria-label="Ver proyecto"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
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
}
