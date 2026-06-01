"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { T } from "@/lib/translations";

type ProjectId = keyof T["projects"]["items"];

type ProjectStatic = {
  id: ProjectId;
  name: string;
  tools: string[];
  figmaUrl: string | null;
  caseStudyUrl: string | null;
};

const EASE = [0.25, 0.1, 0.25, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: EASE },
  }),
};

const UXUI_PROJECTS: ProjectStatic[] = [
  { id: "habita",   name: "Habita",    tools: ["Figma", "Maze", "Claude", "ChatGPT"], figmaUrl: null, caseStudyUrl: "/projects/habita" },
  { id: "esdesign", name: "EsDesign",  tools: ["Figma", "WCAG", "Wireframe"],         figmaUrl: null, caseStudyUrl: null },
  { id: "substrack",name: "Substrack", tools: ["Figma", "Claude", "Wireframe"],       figmaUrl: null, caseStudyUrl: null },
];

const BRANDING_PROJECTS: ProjectStatic[] = [
  // Add branding projects here
];

function ProjectGrid({
  projects,
  tProjects,
  offsetIndex = 0,
}: {
  projects: ProjectStatic[];
  tProjects: T["projects"];
  offsetIndex?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (projects.length === 0) {
    return (
      <div className="py-16 border border-dashed border-white/10 rounded-2xl bg-neutral-950 flex items-center justify-center">
        <p className="font-mono text-sm text-white/30">{tProjects.comingSoon}</p>
      </div>
    );
  }

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {projects.map((project, i) => {
        const tx = tProjects.items[project.id];
        return (
          <motion.article
            key={project.id}
            custom={offsetIndex + i}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={cardVariants}
            className="group flex flex-col bg-neutral-950 rounded-2xl overflow-hidden border border-white/10 hover:bg-accent hover:border-accent transition-colors duration-300"
          >
            {/* Image slot — replace with <Image> once you have assets */}
            <div className="aspect-[4/3] bg-white/5 group-hover:bg-black/10 flex items-center justify-center transition-colors duration-300">
              <span className="font-mono text-xs text-white/25 group-hover:text-accent-light/50 transition-colors duration-300">
                {tProjects.imagePlaceholder}
              </span>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <p className="font-mono text-xs text-white/40 group-hover:text-accent-light/70 uppercase tracking-widest mb-2 transition-colors duration-300">
                {tx.tagline}
              </p>
              <h3 className="text-xl font-semibold text-white group-hover:text-accent-light mb-3 transition-colors duration-300">
                {project.name}
              </h3>
              <p className="text-sm text-white/60 group-hover:text-accent-light leading-relaxed flex-1 transition-colors duration-300">
                {tx.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 font-mono text-xs border border-white/20 text-white/60 rounded-full group-hover:border-accent-light/30 group-hover:text-accent-light transition-colors duration-300 cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {project.caseStudyUrl && (
                <Link
                  href={project.caseStudyUrl}
                  className="mt-5 text-sm font-medium text-white/50 group-hover:text-accent-light active:text-accent-light/70 transition-colors duration-300"
                >
                  {tProjects.viewCaseStudy}
                </Link>
              )}
              {project.figmaUrl && (
                <a
                  href={project.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-sm font-medium text-white/50 group-hover:text-accent-light active:text-accent-light/70 transition-colors duration-300"
                >
                  {tProjects.viewFigma}
                </a>
              )}
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto space-y-20">
        <p className="font-mono text-sm text-muted uppercase tracking-widest">
          {t.projects.label}
        </p>

        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-10">
            {t.projects.uxuiHeading}
          </h2>
          <ProjectGrid
            projects={UXUI_PROJECTS}
            tProjects={t.projects}
            offsetIndex={0}
          />
        </div>

        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-10">
            {t.projects.brandingHeading}
          </h2>
          <ProjectGrid
            projects={BRANDING_PROJECTS}
            tProjects={t.projects}
            offsetIndex={3}
          />
        </div>
      </div>
    </section>
  );
}
