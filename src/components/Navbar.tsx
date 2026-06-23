import { useState } from 'react';
import { Menu, X, MessageSquare, Globe, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenContactModal: () => void;
  lang: 'TR' | 'EN';
  onLangChange: (lang: 'TR' | 'EN') => void;
}

export default function Navbar({
  currentTab,
  onTabChange,
  onOpenContactModal,
  lang,
  onLangChange
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: lang === 'TR' ? 'Ana Sayfa' : 'Home' },
    { id: 'about', label: lang === 'TR' ? 'Hakkımızda' : 'About Us' },
    { id: 'talent', label: lang === 'TR' ? 'Talent' : 'Talents' },
    { id: 'services', label: lang === 'TR' ? 'Hizmetler' : 'Services' }
  ];

  const toggleLang = () => {
    onLangChange(lang === 'TR' ? 'EN' : 'TR');
    setLangMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-rose-200/20 shadow-[0_4px_30px_rgba(0,0,0,0.02)] selection:bg-rose-100 selection:text-red-950">
      <div className="flex justify-between items-center w-full px-6 md:px-16 py-4 max-w-7xl mx-auto h-20">
        {/* Brand Logo */}
        <div className="flex-shrink-0 cursor-pointer" onClick={() => onTabChange('home')}>
          <span className="font-display text-2xl font-extrabold text-primary tracking-tight">
            Booseberg Talent
          </span>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onTabChange(link.id)}
              className={`font-sans font-medium text-sm transition-all pb-1 cursor-pointer hover:text-primary ${
                currentTab === link.id
                  ? 'text-primary font-bold border-b-2 border-primary'
                  : 'text-on-surface-variant'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center space-x-1 font-sans text-sm text-on-surface-variant hover:text-primary transition-colors border border-outline-variant px-3 py-1.5 rounded-lg bg-white/50 cursor-pointer"
            >
              <span>{lang}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white border border-rose-100 rounded-lg shadow-lg z-50 overflow-hidden">
                <button
                  onClick={toggleLang}
                  className="w-full text-left px-4 py-2 text-sm text-on-surface-variant hover:bg-rose-50 hover:text-primary transition-colors"
                >
                  {lang === 'TR' ? 'English (EN)' : 'Türkçe (TR)'}
                </button>
              </div>
            )}
          </div>

          {/* Primary Action (Contact) */}
          <button
            onClick={onOpenContactModal}
            className="bg-primary text-on-primary font-sans font-semibold text-sm px-4 py-2.5 rounded-full hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-1.5 shadow-[0_4px_15px_rgba(174,49,30,0.3)] cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{lang === 'TR' ? 'İLETİŞİM' : 'CONTACT'}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-rose-200/20 bg-white/75 backdrop-blur-md shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 p-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onTabChange(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left font-sans font-medium text-base py-1.5 ${
                  currentTab === link.id ? 'text-primary font-bold border-l-2 border-primary pl-2' : 'text-on-surface-variant pl-2'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="border-t border-rose-100/30 pt-3 flex justify-between items-center pl-2">
              <span className="text-sm text-on-surface-variant font-medium">Dil / Language</span>
              <button
                onClick={toggleLang}
                className="flex items-center space-x-1 font-sans text-sm text-primary font-semibold border border-primary px-3 py-1 rounded-full bg-rose-50"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === 'TR' ? 'EN\'ye Geç' : 'Switch to TR'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
