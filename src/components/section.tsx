import type { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MagicDivider } from "./magic-divider";

type SectionProps = PropsWithChildren<{
  id?: string;
  title?: string;
  className?: string;
}>;

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, delay } },
});

export function Section({ id, title, className, children }: SectionProps) {
  const reduce = useReducedMotion();

  return (
    <section
      id={id}
      className={`container mx-auto px-4 py-16 ${className ?? ""}`}
    >
      {title ? (
        <motion.h2
          variants={reduce ? undefined : fadeUp(0)}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, amount: 0.2 }}
          className="hp-title text-2xl md:text-3xl font-semibold tracking-tight mb-6"
        >
          {title}
        </motion.h2>
      ) : null}

      <MagicDivider className="mb-6" />

      <motion.div
        variants={reduce ? undefined : fadeUp(0.05)}
        initial={reduce ? undefined : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.2 }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </section>
  );
}
