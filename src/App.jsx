import { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import CursorGlow from './components/CursorGlow';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Seo from './components/Seo';
import Footer from './sections/Footer';
import Hero from './sections/Hero';

const About = lazy(() => import('./sections/About'));
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Experience = lazy(() => import('./sections/Experience'));
const Contact = lazy(() => import('./sections/Contact'));

function SectionFallback() {
  return (
    <div className="flex min-h-[50dvh] items-center justify-center px-4 py-20">
      <div
        className="h-11 w-11 animate-spin rounded-full border-2 border-accent border-t-transparent dark:border-cyan-400 dark:border-t-transparent"
        role="status"
        aria-label="Loading section"
      />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen key="loading" />}</AnimatePresence>

      {!loading && (
        <MotionConfig reducedMotion="user">
          <Seo />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-[max(1rem,env(safe-area-inset-top))] focus:z-[80] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Navbar />
          <CursorGlow />
          <main id="main" role="main">
            <Hero />
            <Suspense fallback={<SectionFallback />}>
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Contact />
            </Suspense>
          </main>
          <Footer />
        </MotionConfig>
      )}
    </>
  );
}
