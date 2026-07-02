import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgressBar from './components/ScrollProgressBar';

function App() {
  return (
    <div className="min-h-screen bg-brand-black text-brand-text font-sans">
      <Navbar />
      <ScrollProgressBar />
      <Hero />
      <Services />
      <CaseStudies />
      <Pricing />
      <Testimonials />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
