import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Architecture } from '@/components/sections/Architecture';
import { Activity } from '@/components/sections/Activity';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';
import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';

export default function Home() {
  return (
    <>
      <SEO />
      <Layout>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Architecture />
        <Activity />
        <Experience />
        <Contact />
      </Layout>
    </>
  );
}