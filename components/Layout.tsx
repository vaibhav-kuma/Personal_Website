import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, Mail, FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Architecture', href: '#architecture' },
  { name: 'Activity', href: '#activity' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' }
];

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-mono text-lg font-semibold tracking-wide text-primary">
            VAIBHAV
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white/70 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center gap-4 ml-4">
              <Link
                href="https://github.com/vaibhav-kuma"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/vaibhav-kumar-a19a81232"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:vaibhavkumar26412@gmail.com"
                className="text-white/50 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </Link>
              <Link
                href="/resume.pdf"
                className="px-4 py-2 text-sm font-medium text-white bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-all"
              >
                <FileText className="w-4 h-4 inline mr-1" /> Resume
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-white/5 glass">
            <div className="flex flex-col gap-4 px-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-white/70 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <Link
                  href="https://github.com/vaibhav-kuma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/vaibhav-kumar-a19a81232"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link
                  href="mailto:vaibhavkumar26412@gmail.com"
                  className="text-white/50 hover:text-primary transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </Link>
                <Link
                  href="/resume.pdf"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary/10 border border-primary/30 rounded-lg hover:bg-primary/20 transition-all"
                >
                  <FileText className="w-4 h-4 inline mr-1" /> Resume
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40 font-mono">
            VAIBHAV KUMAR — Backend Developer • Cybersecurity Engineer • AI Builder
          </p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link href="https://github.com/vaibhav-kuma" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              GitHub
            </Link>
            <Link href="https://www.linkedin.com/in/vaibhav-kumar-a19a81232" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              LinkedIn
            </Link>
            <Link href="mailto:vaibhavkumar26412@gmail.com" className="hover:text-primary transition-colors">
              Email
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}