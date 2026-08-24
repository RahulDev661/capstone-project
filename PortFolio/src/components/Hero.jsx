import { GithubIcon, LinkedinIcon, ArrowRightIcon, FileTextIcon } from './Icons.jsx'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 container-px overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-8 items-center">
        {/* Left: identity */}
        <div className="animate-fadeUp">
          <p className="eyebrow">Mr</p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight leading-[1.05]">
            Rahul Dev 
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-muted font-medium">
            Building practical web applications with React, JavaScript, and modern development
            tools.
          </p>

          <p className="mt-5 max-w-xl text-base text-muted leading-relaxed">
            I'm a software developer focused on the React ecosystem — turning real problems
            into working, well-structured applications. I am Currently building a Client's Construction Website.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-ink text-paper text-sm font-medium px-5 py-3 hover:bg-accent transition-colors"
            >
              View Projects
              <ArrowRightIcon width={16} height={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-surface text-ink text-sm font-medium px-5 py-3 hover:border-accent hover:text-accent transition-colors"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <a
              href="[https://github.com/RahulDev661]"
              target="https://github.com/RahulDev661"
              rel="https://github.com/RahulDev661"
              aria-label="GitHub profile"
              className="text-muted hover:text-accent transition-colors"
            >
              <GithubIcon />
            </a>
            <a
              href="[Add LinkedIn URL]"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn profile"
              className="text-muted hover:text-accent transition-colors"
            >
              <LinkedinIcon />
            </a>
            <a
              href="[Add Resume]"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
            >
              <FileTextIcon width={16} height={16} />
              Resume
            </a>
          </div>
        </div>

        {/* Right: signature element — a small "editor" card that reads
            like the component that renders this very hero */}
        <div className="animate-fadeUp [animation-delay:120ms]">
          <div className="rounded-xl border border-line bg-surface shadow-sm overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-paper">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="ml-3 font-mono text-xs text-faint-900">Rahul.js</span>
            </div>
            <pre className="p-5 sm:p-6 font-mono text-[13px] sm:text-sm leading-7 overflow-x-auto">
              <code>
                <span className="text-faint">01</span>{'  '}
                <span className="text-accent">const</span> developer <span className="text-faint">=</span> {'{'}
                {'\n'}
                <span className="text-faint">02</span>{'    '}name:{' '}
                <span className="text-muted">'[Rahul]'</span>,{'\n'}
                <span className="text-faint">03</span>{'    '}stack:{' '}
                <span className="text-muted">['React', 'JS', 'Node']</span>,{'\n'}
                <span className="text-faint">04</span>{'    '}learning:{' '}
                <span className="text-muted">'Frontend Developer'</span>,{'\n'}
                <span className="text-faint">05</span>{'    '}status:{' '}
                <span className="text-muted">'[Intership At FLy Rank AI]'</span>,{'\n'}
                <span className="text-faint">06</span> {'}'}
                <span className="inline-block w-2px h-4 bg-accent align-middle ml-1 animate-blink" />
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
