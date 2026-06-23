import { Instagram, Linkedin, Shield, Lock } from 'lucide-react';

interface FooterProps {
  onTabChange: (tab: string) => void;
  lang: 'TR' | 'EN';
}

export default function Footer({ onTabChange, lang }: FooterProps) {
  return (
    <footer className="w-full rounded-t-xl bg-white/70 backdrop-blur-md border-t border-rose-200/20 shadow-[0_-8px_30px_rgba(0,0,0,0.02)] selection:bg-rose-100 selection:text-red-950 mt-16 relative overflow-hidden">
      {/* Subtle spotlight glow */}
      <div className="absolute top-0 right-[-10%] w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-[-5%] w-[300px] h-[300px] bg-amber-500/5 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-8 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        {/* Brand Column */}
        <div className="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
          <span 
            className="font-display text-xl font-bold text-primary tracking-tight cursor-pointer"
            onClick={() => onTabChange('home')}
          >
            Booseberg Talent
          </span>
          <p className="font-sans text-xs text-on-surface-variant opacity-70">
            {lang === 'TR' ? 'Yenilikçi Dijital Medya & Yetenek Yönetimi' : 'Precision & Ether Talent Acquisition.'}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 bg-white/40 border border-rose-50 px-3 py-1.5 rounded-full hover:scale-105 transition-transform"
          >
            <Instagram className="w-3.5 h-3.5 text-primary" />
            <span>Instagram</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 bg-white/40 border border-rose-50 px-3 py-1.5 rounded-full hover:scale-105 transition-transform"
          >
            <Linkedin className="w-3.5 h-3.5 text-primary" />
            <span>LinkedIn</span>
          </a>
          <button
            onClick={() => onTabChange('about')}
            className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 bg-white/40 border border-rose-50 px-3 py-1.5 rounded-full hover:scale-105 transition-transform cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span>KVKK / GDPR</span>
          </button>
          <button
            onClick={() => onTabChange('admin')}
            className="font-sans text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 bg-white/40 border border-rose-50 px-3 py-1.5 rounded-full hover:scale-105 transition-transform cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-primary" />
            <span>{lang === 'TR' ? 'Yönetici Paneli' : 'Admin Panel'}</span>
          </button>
        </nav>

        {/* Copyright and decorative element */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="font-sans text-xs text-on-surface-variant opacity-60">
            © 2026 Powered by <a href="https://elixis.com.tr" target="_blank" rel="noopener noreferrer" className="font-extrabold hover:text-primary hover:underline transition-all">Elixis Software</a>. {lang === 'TR' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
          </p>
          <div className="flex gap-1">
            <div className="h-1 w-8 rounded-full bg-primary/20"></div>
            <div className="h-1 w-2 rounded-full bg-primary"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
