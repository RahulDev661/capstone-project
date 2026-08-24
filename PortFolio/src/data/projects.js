// Add a new project by adding an object to this array — ProjectCard.jsx
// renders whatever is here. Replace the placeholder projects and links
// (anything wrapped in [brackets]) with your real details.

export const projects = [
  {
    id: 'construction-cost-estimator',
    name: 'Construction Cost Estimator',
    description:
      "A web app that helps small construction shops estimate material needs and job costs before quoting a client, replacing manual spreadsheet guesswork with a form-driven calculator.",
    problem:
      'Estimating material quantities and costs by hand is slow and error-prone, which leads to under- or over-quoting jobs.',
    features: [
      'Dynamic material estimation based on job dimensions',
      'Real-time cost calculation as inputs change',
      'User input validation to prevent invalid or unsafe estimates',
      'REST API layer connecting the form to backend calculation logic',
    ],
    tech: ['React', 'JavaScript', 'Node.js', 'Express.js', 'Tailwind CSS'],
    github: '[Add GitHub URL]',
    demo: '[Add live demo URL]',
    image: null,
    featured: true,
  },
  {
    id: 'placeholder-project-2',
    name: '[Add project name]',
    description: '[Add a short description of what this project does and who it is for.]',
    problem: '[Add the problem this project solves.]',
    features: ['[Add key feature]', '[Add key feature]', '[Add key feature]'],
    tech: ['[Add tech]', '[Add tech]'],
    github: '[Add GitHub URL]',
    demo: '[Add live demo URL]',
    image: null,
    featured: false,
  },
  {
    id: 'placeholder-project-3',
    name: '[Add project name]',
    description: '[Add a short description of what this project does and who it is for.]',
    problem: '[Add the problem this project solves.]',
    features: ['[Add key feature]', '[Add key feature]', '[Add key feature]'],
    tech: ['[Add tech]', '[Add tech]'],
    github: '[Add GitHub URL]',
    demo: '[Add live demo URL]',
    image: null,
    featured: false,
  },
]

export const featuredProject = projects.find((p) => p.featured) || projects[0]
