import { GithubIcon, ExternalLinkIcon } from './Icons.jsx'

export default function ProjectCard({ project }) {
  const { name, description, features, tech, github, demo, image } = project

  return (
    <article className="flex flex-col rounded-lg border border-line bg-surface overflow-hidden hover:shadow-md hover:border-accent/50 transition-all">
      <div className="aspect-video bg-paper border-b border-line flex items-center justify-center">
        {image ? (
          <img src={image} alt={`Screenshot of ${name}`} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <span className="font-mono text-xs text-faint">[Add project image]</span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-lg text-ink">{name}</h3>
        <p className="mt-2 text-sm text-muted leading-relaxed">{description}</p>

        {features?.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex gap-2 text-sm text-muted">
                <span className="w-1 h-1 rounded-full bg-accent shrink-0 mt-2" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] px-2 py-1 rounded bg-accent-soft text-accent-dark"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 pt-5 border-t border-line flex items-center gap-3">
          <a
            href={github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors"
          >
            <GithubIcon width={16} height={16} />
            Code
          </a>
          <a
            href={demo}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent transition-colors"
          >
            <ExternalLinkIcon width={16} height={16} />
            Live demo
          </a>
        </div>
      </div>
    </article>
  )
}
