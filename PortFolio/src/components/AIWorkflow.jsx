const practices = [
  {
    title: 'Prompt engineering',
    body: 'Writing clear, specific prompts that give an AI tool the context and constraints it needs to produce useful output on the first pass.',
  },
  {
    title: 'Requirement analysis',
    body: 'Breaking a feature request down into concrete requirements before writing or generating any code.',
  },
  {
    title: 'AI-assisted coding',
    body: 'Using AI tools to scaffold components, boilerplate, and repetitive logic, then reviewing and adapting the output to fit the codebase.',
  },
  {
    title: 'AI-assisted debugging',
    body: 'Pairing with AI tools to narrow down bugs faster — describing symptoms, sharing relevant code, and testing suggested fixes.',
  },
  {
    title: 'Iterative prompt improvement',
    body: 'Refining prompts based on what the output gets wrong, rather than accepting the first result.',
  },
  {
    title: 'Testing & verification',
    body: 'Treating AI-generated code the same as any other code — reading it, testing it, and verifying it actually does what it claims to.',
  },
]

export default function AIWorkflow() {
  return (
    <section className="bg-surface border-y border-line">
      <div className="container-px py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <p className="eyebrow"></p>
          <h2 className="section-heading">AI & Development Workflow</h2>
          <p className="mt-4 text-muted max-w-xl">
            I use AI tools as part of my day-to-day workflow — not as a replacement for
            understanding the code, but as a way to move faster and think more clearly about
            requirements.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {practices.map((practice) => (
              <div key={practice.title} className="rounded-lg border border-line bg-paper p-5">
                <h3 className="font-display font-semibold text-ink mb-2">{practice.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{practice.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
