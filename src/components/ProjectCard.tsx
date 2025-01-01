import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  // Create schema for individual project
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "image": `https://hacktoast.com${project.image}`,
    "keywords": project.tags.join(", "),
    "creator": {
      "@type": "Organization",
      "name": "HackToast"
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative overflow-hidden rounded-2xl bg-zinc-900"
      role="article"
      aria-labelledby={`project-title-${index}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} - Project Screenshot`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={index < 2} // Prioritize loading for first two images
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
        aria-hidden="true"
      />

      <div 
        className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        role="contentinfo"
      >
        <div 
          className="flex gap-2 mb-3"
          role="list"
          aria-label="Project Technologies"
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-purple-600 text-white rounded-full"
              role="listitem"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 
          id={`project-title-${index}`}
          className="text-2xl font-bold text-white mb-2"
        >
          {project.title}
        </h3>
        
        <p className="text-gray-300 text-sm">
          {project.description}
        </p>
      </div>
    </motion.article>
  );
}