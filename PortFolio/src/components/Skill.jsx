import { skillGroups } from '../data/skills.js'

export default function Skills() {
  return (
    <section id="skills" className="bg-surface border-y border-line">
      <div className="container-px py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <p className="eyebrow"></p>
          <h2 className="section-heading">Skills</h2>
          <p className="mt-4 text-muted max-w-xl">
            Grouped by area — the tools and languages I actually use.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillGroups.map((group) => (
              <div
                key={group.name}
                className="rounded-lg border border-line bg-paper p-5 hover:border-accent/60 transition-colors"
              >
                <p className="font-mono text-[11px] text-faint mb-3">{group.path}</p>
                <h3 className="font-display font-semibold text-ink mb-3">{group.name}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
