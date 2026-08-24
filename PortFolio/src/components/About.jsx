const points = [
  {
    label: 'Currently learning',
    body: 'Currently, I’m focused on strengthening my DSA, backend development, React, system design fundamentals, and AI development skills, while gaining real-world industry experience through projects and internships.]',
  },
  {
    label: 'What I enjoy building',
    body: 'I enjoy solving problems through 200 + Data Structures and Algorithms and continuously improving my programming and development skills. I have worked on 15+ projects, including AI/ML applications, web applications, computer-vision projects, and automation tools. Some of my notable projects include a Virtual Gesture Keyboard, SafeBite Food Inspection System, Snake Classification Model, and Clap-to-Action application.',
  },
  {
    label: "What I'm looking for",
    body: 'My goal is to become a strong Software Engineer/AI Engineer who can build scalable applications, solve complex problems, and turn ideas into real-world products.',
  },
]

export default function About() {
  return (
    <section id="about" className="container-px py-20 sm:py-28">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16">
        <div>
          <p className="eyebrow"></p>
          <h2 className="section-heading">About Me</h2>
          <p className="mt-5 text-muted leading-relaxed max-w-md">
            I’m Rahul Dev Bera, a Computer Science student and aspiring Full-Stack & AI Developer with a strong interest in building practical, user-focused applications. I work with technologies such as React, JavaScript, TypeScript, Node.js, Express.js, MongoDB, Python, and Machine Learning.
          </p>
        </div>

        <dl className="space-y-8">
          {points.map((point) => (
            <div key={point.label} className="border-b border-line pb-8 last:border-none last:pb-0">
              <dt className="font-mono text-xs text-accent uppercase tracking-wide">
                {point.label}
              </dt>
              <dd className="mt-2 text-base text-ink leading-relaxed">{point.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}