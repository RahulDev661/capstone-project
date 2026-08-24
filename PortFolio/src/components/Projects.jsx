import { projects } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'

export default function Projects() {
  return (
    <section id="projects" className="container-px py-20 sm:py-28">
      <div className="max-w-6xl mx-auto">
        <p className="eyebrow"></p>
        <h2 className="section-heading">Projects</h2>
        <p className="mt-4 text-muted max-w-xl">
          A selection of what I've built. Each one started as a real problem I wanted to solve.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
