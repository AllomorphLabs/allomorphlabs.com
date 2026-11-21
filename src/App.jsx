import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import NameMeaning from './components/NameMeaning.jsx'
import Approach from './components/Approach.jsx'
import TwinsDemo from './components/TwinsDemo.jsx'
import Method from './components/Method.jsx'
import Roadmap from './components/Roadmap.jsx'
import OpenCode from './components/OpenCode.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="page">
      <div className="grid-bg" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <NameMeaning />
        <Approach />
        <TwinsDemo />
        <Method />
        <Roadmap />
        <OpenCode />
      </main>
      <Footer />
    </div>
  )
}
