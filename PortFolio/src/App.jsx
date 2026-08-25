import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skill from './components/Skill.jsx'
import Projects from './components/Projects.jsx'
import FeaturedProject from './components/FeaturedProject.jsx'
import Experience from './components/Experience.jsx'
import AIWorkflow from './components/AIWorkflow.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main>
        <Hero />
        <Hero />
        <About />
        <Skill />
        <Projects />
        <FeaturedProject />
        <Experience />
        <AIWorkflow />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
