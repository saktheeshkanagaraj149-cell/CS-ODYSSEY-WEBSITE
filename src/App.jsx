import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Explorer from './components/Explorer.jsx'
import FutureSection from './components/FutureSection.jsx'
import Footer from './components/Footer.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import CustomCursor from './components/CustomCursor.jsx'

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen overflow-x-hidden bg-deep font-body text-ink">
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <Explorer />
          <FutureSection />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default App
