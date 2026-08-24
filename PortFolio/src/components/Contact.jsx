import { useState } from 'react'
import { MailIcon, GithubIcon, LinkedinIcon, CheckCircleIcon } from './Icons.jsx'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Name is required.'
  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (!values.message.trim()) errors.message = 'Message is required.'
  return errors
}

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) {
      setErrors((err) => ({ ...err, [name]: undefined }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      // ---------------------------------------------------------------
      // INTEGRATION POINT: no email service or backend is connected yet.
      // Wire this up to something like Formspree, EmailJS, Resend, or
      // your own API endpoint before relying on this form in production.
      // Example:
      //   await fetch('[Add your form endpoint]', {
      //     method: 'POST',
      //     body: JSON.stringify(values),
      //   })
      // ---------------------------------------------------------------
      setSubmitted(true)
      setValues({ name: '', email: '', message: '' })
    }
  }

  return (
    <section id="contact" className="container-px py-20 sm:py-28">
      <div className="max-w-4xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
        <div>
          <p className="eyebrow"></p>
          <h2 className="section-heading">Contact</h2>
          <p className="mt-4 text-muted leading-relaxed">
            Have a role, project, or question in mind? Send a message and I'll get back to you.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href="mailto:rahuldevbera098@gmail.com"
              className="flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors"
            >
              <MailIcon width={16} height={16} /> rahuldevbera098@gmail.com
            </a>
            <a
              href="[Add GitHub URL]"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors"
            >
              <GithubIcon width={16} height={16} /> GitHub
            </a>
            <a
              href="[Add LinkedIn URL]"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 text-sm text-ink hover:text-accent transition-colors"
            >
              <LinkedinIcon width={16} height={16} /> LinkedIn
            </a>
          </div>
        </div>

        <div>
          {submitted ? (
            <div className="rounded-lg border border-accent/30 bg-accent-soft p-8 flex flex-col items-start gap-3">
              <CheckCircleIcon className="text-accent" width={28} height={28} />
              <h3 className="font-display font-semibold text-ink">Message ready to send</h3>
              <p className="text-sm text-muted leading-relaxed">
                Your message passed validation. No email service is connected yet, so nothing
                was actually sent — wire up a form backend at the integration point noted in
                Contact.jsx to deliver messages for real.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-2 text-sm font-medium text-accent hover:text-accent-dark"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={`w-full rounded-md border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-faint transition-colors ${
                    errors.name ? 'border-red-400' : 'border-line'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-sm text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full rounded-md border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-faint transition-colors ${
                    errors.email ? 'border-red-400' : 'border-line'
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`w-full rounded-md border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-faint transition-colors resize-y ${
                    errors.message ? 'border-red-400' : 'border-line'
                  }`}
                  placeholder="What would you like to say?"
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-ink text-paper text-sm font-medium px-5 py-3 hover:bg-accent transition-colors"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
