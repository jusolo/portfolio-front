import type { PropsWithChildren } from "react";

type SectionProps = PropsWithChildren<{
  id?: string;
  title?: string;
  className?: string;
}>;

export function Section({ id, title, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={`container mx-auto px-4 py-16 ${className ?? ""}`}
    >
      {title && (
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
