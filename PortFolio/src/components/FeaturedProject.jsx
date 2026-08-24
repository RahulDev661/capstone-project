import { featuredProject } from '../data/projects.js'
import { GithubIcon, ExternalLinkIcon } from './Icons.jsx'

const stages = [
  {
    label: 'Problem',
    body: 'Small construction shops were estimating material quantities and job costs by hand, which is slow and leaves room for costly mistakes when quoting a client.',
  },
  {
    label: 'Approach',
    body: 'Built a form-driven estimator: the user enters job dimensions and material choices, and the app calculates quantities and cost live instead of after the fact.',
  },
  {
    label: 'Implementation',
    body: 'React frontend with validated input forms, a Node.js/Express API handling the estimation logic, and dynamic calculations that update as the user changes inputs.',
  },
  {
    label: 'Result',
    body: '[Add what actually changed or what you learned building it — e.g. reduced estimate time, or the technical lesson from handling validation and dynamic state.]',
  },
]

export default function FeaturedProject() {
  return (
    <section className="bg-ink text-paper">
      <div className="container-px py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-xs text-faint inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Featured Project
          </p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-display font-semibold tracking-tight">
              {featuredProject.name}
            </h2>
            <div className="flex items-center gap-4">
              <a
                href={featuredProject.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm text-paper/80 hover:text-accent transition-colors"
              >
                <GithubIcon width={16} height={16} /> Code
              </a>
              <a
                href={featuredProject.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-sm text-paper/80 hover:text-accent transition-colors"
              >
                <ExternalLinkIcon width={16} height={16} /> Live demo
              </a>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-paper/70 leading-relaxed">
            {featuredProject.description}
          </p>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-paper/10 rounded-lg overflow-hidden">
            {stages.map((stage, i) => (
              <div key={stage.label} className="bg-ink p-6">
                <p className="font-mono text-xs text-accent mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display font-semibold mb-2">{stage.label}</h3>
                <p className="text-sm text-paper/70 leading-relaxed">{stage.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {featuredProject.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[11px] px-2.5 py-1 rounded border border-paper/20 text-paper/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
