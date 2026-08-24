// Add or edit timeline entries here. Keep only real, verifiable items —
// projects you built, courses you completed, roles you held.
const timeline = [
  {
    date: '[Add date]',
    title: '[Add project, course, or milestone name]',
    body: '[Add one sentence on what it was and what you did or learned.]',
  },
  {
    date: '[Add date]',
    title: '[Add project, course, or milestone name]',
    body: '[Add one sentence on what it was and what you did or learned.]',
  },
  {
    date: '[Add date]',
    title: 'AI-assisted development practice',
    body: 'Learning to work with AI coding tools as part of my regular workflow — see the section below for specifics.',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="container-px py-20 sm:py-28">
      <div className="max-w-4xl mx-auto">
        <p className="eyebrow"></p>
        <h2 className="section-heading">Experience & Learning</h2>
        <p className="mt-4 text-muted max-w-xl">
          A running timeline of projects, courses, and milestones. Replace the placeholders
          with your real dates and details.
        </p>

        <ol className="mt-12 relative border-l border-line ml-3">
          {timeline.map((entry) => (
            <li key={entry.title + entry.date} className="mb-10 ml-6 last:mb-0">
              <span className="absolute -left-7px w-3 h-3 rounded-full bg-accent border-4 border-paper" />
              <p className="font-mono text-xs text-accent">{entry.date}</p>
              <h3 className="mt-1 font-display font-semibold text-ink">{entry.title}</h3>
              <p className="mt-1 text-sm text-muted leading-relaxed">{entry.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
