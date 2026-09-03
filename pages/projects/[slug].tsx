import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowLeft, Shield, Brain, Server, Database, Network, Code2, ChevronRight, CheckCircle, Clock, Star, GitBranch } from 'lucide-react';
import { projects, getProjectBySlug, Project } from '@/data/projects';
import { Layout } from '@/components/Layout';
import { SEO } from '@/components/SEO';
import { getProjectIcon, getProjectColor, VisualizationType } from '@/data/visualization';

interface ProjectPageProps {
  project: Project;
}

export default function ProjectPage({ project }: ProjectPageProps) {
  const Icon = getProjectIcon(project.visualizationType as VisualizationType);
  const siteUrl = 'https://vaibhavk.dev';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.name,
    description: project.description,
    url: `${siteUrl}/projects/${project.slug}`,
    codeRepository: project.githubUrl,
    programmingLanguage: project.technologies.join(', '),
    author: {
      '@type': 'Person',
      name: 'Vaibhav Kumar',
    },
    datePublished: project.updatedAt,
    dateModified: project.updatedAt,
    keywords: project.topics?.join(', '),
  };

  return (
    <>
      <SEO
        title={project.name}
        description={project.description}
        canonical={`${siteUrl}/projects/${project.slug}`}
        ogImage={project.screenshots?.[0]}
        ogType="article"
        structuredData={structuredData}
      />
      <Layout>
        <article className="pt-16 pb-24 px-6">
          <div className="max-w-5xl mx-auto">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-white/50 hover:text-primary transition-colors font-mono text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
            </motion.div>

            {/* Hero */}
            <motion.header
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `${getProjectColor(project.visualizationType as VisualizationType)}20`, borderColor: `${getProjectColor(project.visualizationType as VisualizationType)}40` }}>
                  <Icon className="w-6 h-6" style={{ color: getProjectColor(project.visualizationType as VisualizationType) }} />
                </div>
                <div>
                  <span className="font-mono text-xs tracking-widest uppercase text-primary">{project.category === 'featured' ? 'Featured Project' : 'Project'}</span>
                  <span className="text-white/40 ml-2 px-2 py-0.5 text-xs font-mono bg-white/5 rounded">Priority {project.priority}</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">{project.name}</h1>
              <p className="text-xl text-white/70 max-w-3xl leading-relaxed">{project.longDescription || project.description}</p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 mt-8 text-sm">
                <span className="flex items-center gap-1 text-white/50">
                  <Code2 className="w-3.5 h-3.5" /> {project.language}
                </span>
                <span className="flex items-center gap-1 text-white/50">
                  <Star className="w-3.5 h-3.5" /> {project.stars || 0} stars
                </span>
                <span className="flex items-center gap-1 text-white/50">
                  <GitBranch className="w-3.5 h-3.5" /> {project.forks || 0} forks
                </span>
                <span className="flex items-center gap-1 text-white/50">
                  <Clock className="w-3.5 h-3.5" /> Updated {formatDate(project.updatedAt)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-all"
                >
                  <Github className="w-5 h-5" /> View on GitHub
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white/70 border border-white/10 rounded-lg hover:border-white/30 hover:text-white transition-all"
                  >
                    <ExternalLink className="w-5 h-5" /> Live Demo
                  </a>
                )}
              </div>
            </motion.header>

            {/* Tech Stack */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-16"
            >
              <h2 className="font-mono text-sm font-semibold tracking-widest uppercase text-primary mb-6 flex items-center gap-2">
                <Code2 className="w-4 h-4" /> Technology Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: 0.03 * i }}
                    className="px-4 py-2 text-sm font-medium text-white/80 bg-white/5 border border-white/10 rounded-lg hover:border-primary/30 hover:text-primary transition-all"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.section>

            {/* Problem & Solution */}
            {project.problem && project.solution && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid md:grid-cols-2 gap-8 mb-16"
              >
                <div className="glass p-6 rounded-xl border border-white/5">
                  <h3 className="font-mono text-sm font-semibold tracking-widest uppercase text-primary mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Problem
                  </h3>
                  <p className="text-white/70 leading-relaxed">{project.problem}</p>
                </div>
                <div className="glass p-6 rounded-xl border border-white/5">
                  <h3 className="font-mono text-sm font-semibold tracking-widest uppercase text-success mb-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Solution
                  </h3>
                  <p className="text-white/70 leading-relaxed">{project.solution}</p>
                </div>
              </motion.div>
            )}

            {/* Architecture */}
            {project.architecture && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-16"
              >
                <h2 className="font-mono text-sm font-semibold tracking-widest uppercase text-primary mb-6 flex items-center gap-2">
                  <Server className="w-4 h-4" /> Architecture
                </h2>
                <div className="glass p-6 rounded-xl border border-white/5 prose prose-invert max-w-none">
                  <p className="text-white/70 leading-relaxed whitespace-pre-wrap">{project.architecture}</p>
                </div>
              </motion.section>
            )}

            {/* Core Features */}
            {project.coreFeatures && project.coreFeatures.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-16"
              >
                <h2 className="font-mono text-sm font-semibold tracking-widest uppercase text-primary mb-6 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Core Features
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {project.coreFeatures.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 * i }}
                      className="flex items-center gap-3 p-3 glass rounded-lg border border-white/5"
                    >
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Security & AI Capabilities */}
            {(project.securityCapabilities && project.securityCapabilities.length > 0) || (project.aiCapabilities && project.aiCapabilities.length > 0) ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="grid md:grid-cols-2 gap-8 mb-16"
              >
                {project.securityCapabilities && project.securityCapabilities.length > 0 && (
                  <div className="glass p-6 rounded-xl border border-white/5">
                    <h3 className="font-mono text-sm font-semibold tracking-widest uppercase text-primary mb-4 flex items-center gap-2">
                      <Shield className="w-4 h-4" /> Security Capabilities
                    </h3>
                    <ul className="space-y-2">
                      {project.securityCapabilities.map((cap, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.05 * i }}
                          className="flex items-center gap-2 text-white/70"
                        >
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          {cap}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.aiCapabilities && project.aiCapabilities.length > 0 && (
                  <div className="glass p-6 rounded-xl border border-white/5">
                    <h3 className="font-mono text-sm font-semibold tracking-widest uppercase text-secondary mb-4 flex items-center gap-2">
                      <Brain className="w-4 h-4" /> AI Capabilities
                    </h3>
                    <ul className="space-y-2">
                      {project.aiCapabilities.map((cap, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.05 * i }}
                          className="flex items-center gap-2 text-white/70"
                        >
                          <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                          {cap}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ) : null}

            {/* Engineering Challenges */}
            {project.engineeringChallenges && project.engineeringChallenges.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mb-16"
              >
                <h2 className="font-mono text-sm font-semibold tracking-widest uppercase text-primary mb-6 flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> Engineering Challenges
                </h2>
                <div className="space-y-3">
                  {project.engineeringChallenges.map((challenge, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 * i }}
                      className="glass p-4 rounded-lg border border-white/5 flex items-start gap-3"
                    >
                      <span className="text-primary font-mono text-lg flex-shrink-0 mt-0.5">›</span>
                      <span className="text-white/70">{challenge}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Verifiable Results */}
            {project.verifiableResults && project.verifiableResults.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mb-16"
              >
                <h2 className="font-mono text-sm font-semibold tracking-widest uppercase text-success mb-6 flex items-center gap-2">
                  <Star className="w-4 h-4" /> Verifiable Results
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.verifiableResults.map((result, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 * i }}
                      className="glass p-5 rounded-xl border border-white/5"
                    >
                      <p className="text-white/80 leading-relaxed">{result}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Screenshots */}
            {project.screenshots && project.screenshots.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mb-16"
              >
                <h2 className="font-mono text-sm font-semibold tracking-widest uppercase text-primary mb-6 flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> Screenshots
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.screenshots.map((screenshot, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 * i }}
                      className="glass rounded-xl border border-white/5 overflow-hidden aspect-video"
                    >
                      <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/30 font-mono text-sm">
                        Screenshot: {screenshot}
                        {/* <Image src={screenshot} alt={`${project.name} screenshot`} fill className="object-cover" /> */}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Future Improvements */}
            {project.futureImprovements && project.futureImprovements.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mb-16"
              >
                <h2 className="font-mono text-sm font-semibold tracking-widest uppercase text-primary mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Future Improvements
                </h2>
                <ul className="space-y-3">
                  {project.futureImprovements.map((improvement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.05 * i }}
                      className="glass p-4 rounded-lg border border-white/5 flex items-start gap-3"
                    >
                      <span className="text-secondary font-mono text-lg flex-shrink-0 mt-0.5">→</span>
                      <span className="text-white/70">{improvement}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Footer Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex flex-wrap gap-4 pt-8 border-t border-white/5"
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-all"
              >
                <Github className="w-5 h-5" /> View Source on GitHub
              </a>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white/70 border border-white/10 rounded-lg hover:border-white/30 hover:text-white transition-all"
              >
                <ArrowLeft className="w-5 h-5" /> Back to Projects
              </Link>
            </motion.div>
          </div>
        </article>
      </Layout>
    </>
  );
}

// Helper functions
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Static Generation
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = projects.map(p => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { notFound: true };
  }

  return { props: { project } };
};