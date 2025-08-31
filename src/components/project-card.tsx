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
  tech: string[];
  link?: string;
  repo?: string;
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full perchment">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span>{project.title}</span>
          {project.link && (
            <a
              href={project.link}
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
        {project.tech.map((t) => (
          <Badge key={t} variant="secondary">
            {t}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
