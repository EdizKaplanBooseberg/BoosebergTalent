import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import TalentDiscoveryView from './components/TalentDiscoveryView';
import TalentProfileView from './components/TalentProfileView';
import ServicesView from './components/ServicesView';
import AboutView from './components/AboutView';
import AdminPanel from './components/AdminPanel';
import { Talent } from './types';
import { Mail, MessageSquare, Phone, X, CheckCircle } from 'lucide-react';
import { 
  getSlides, getContactEmail, getBrands, getCategories, 
  getTalents, initLocalStorageStore, addContactLead,
  trackPageVisit, trackTalentProfileView, getSeoConfig
} from './lib/dataStore';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [talentFilter, setTalentFilter] = useState<string>('all');
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);
  const [lang, setLang] = useState<'TR' | 'EN'>('TR');
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactTalentName, setContactTalentName] = useState<string | undefined>(undefined);

  // Dynamic Content States
  const [slides, setSlides] = useState<any[]>([]);
  const [contactEmail, setContactEmail] = useState('hello@booseberg.com');
  const [brands, setBrands] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [talents, setTalents] = useState<any[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Modal Form State
  const [modalName, setModalName] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('brand');
  const [modalSubmitted, setModalSubmitted] = useState(false);

  useEffect(() => {
    initLocalStorageStore();
    setSlides(getSlides());
    setContactEmail(getContactEmail());
    setBrands(getBrands());
    setCategories(getCategories());
    setTalents(getTalents());
  }, [refreshTrigger]);

  // Track page visit on real initial app start
  useEffect(() => {
    trackPageVisit(document.referrer);
  }, []);

  // Dynamic SEO Agent Metadata Injection For Search Engines
  useEffect(() => {
    try {
      const seo = getSeoConfig();
      if (seo) {
        document.title = seo.title;
        
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.setAttribute('name', 'description');
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', seo.description);

        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.setAttribute('name', 'keywords');
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', seo.keywords);

        let metaAuthor = document.querySelector('meta[name="author"]');
        if (!metaAuthor) {
          metaAuthor = document.createElement('meta');
          metaAuthor.setAttribute('name', 'author');
          document.head.appendChild(metaAuthor);
        }
        metaAuthor.setAttribute('content', seo.author);

        let metaRobots = document.querySelector('meta[name="robots"]');
        if (!metaRobots) {
          metaRobots = document.createElement('meta');
          metaRobots.setAttribute('name', 'robots');
          document.head.appendChild(metaRobots);
        }
        metaRobots.setAttribute('content', seo.robots);

        const ogs = [
          { property: 'og:title', content: seo.ogTitle },
          { property: 'og:description', content: seo.ogDescription },
          { property: 'og:image', content: seo.ogImage },
          { property: 'og:type', content: 'website' }
        ];

        ogs.forEach(item => {
          let selection = document.querySelector(`meta[property="${item.property}"]`);
          if (!selection) {
            selection = document.createElement('meta');
            selection.setAttribute('property', item.property);
            document.head.appendChild(selection);
          }
          selection.setAttribute('content', item.content);
        });
      }
    } catch (e) {
      console.error('SEO dynamic initialization error:', e);
    }
  }, [refreshTrigger]);

  const handleRefreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleTabChange = (tabId: string, filter?: string) => {
    setSelectedTalent(null); // Reset detail view when changing tab
    setCurrentTab(tabId);
    if (filter) {
      setTalentFilter(filter);
    } else {
      setTalentFilter('all');
    }
    // Scroll to top smoothly on transition
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTalent = (talent: Talent) => {
    setSelectedTalent(talent);
    trackTalentProfileView(talent.id); // Log real talent click
    // Smooth transition to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenContactModal = (talentName?: string) => {
    setContactTalentName(talentName);
    setModalSubmitted(false);
    setShowContactModal(true);
  };

  const handleModalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!modalName || !modalEmail) return;

    // Save lead
    addContactLead({
      name: modalName,
      email: modalEmail,
      phone: '',
      message: contactTalentName 
        ? `[Talent Request: ${contactTalentName}] ${modalMessage}` 
        : modalMessage,
      type: modalType
    });

    setModalSubmitted(true);
    setTimeout(() => {
      setShowContactModal(false);
      setModalName('');
      setModalEmail('');
      setModalMessage('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-primary/20 selection:text-primary relative flex flex-col justify-between font-sans pr-0 md:pr-0 overflow-x-hidden">
      
      {/* Dynamic Background decor grids */}
      <div className="absolute top-0 left-0 right-0 h-[450px] bg-gradient-to-b from-rose-100/20 via-rose-50/10 to-transparent pointer-events-none z-0"></div>
      
      {/* Top Navbar */}
      <Navbar 
        currentTab={currentTab} 
        onTabChange={handleTabChange} 
        onOpenContactModal={() => handleOpenContactModal()} 
        lang={lang} 
        onLangChange={setLang}
      />

      {/* Main Content Body */}
      <main className={`flex-grow relative z-10 w-full ${
        currentTab === 'home' && !selectedTalent ? 'pt-20 pb-16' : 'pt-28 pb-16 px-6 md:px-16 max-w-7xl mx-auto'
      }`}>
        
        {/* Render Active View Column with clean conditional switching */}
        {selectedTalent ? (
          <TalentProfileView 
            talent={selectedTalent} 
            onBack={() => setSelectedTalent(null)} 
            lang={lang} 
            onOpenContactModal={handleOpenContactModal}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <HomeView 
                onTabChange={handleTabChange} 
                lang={lang} 
                onOpenContactModal={() => handleOpenContactModal()} 
                slides={slides}
              />
            )}

            {currentTab === 'about' && (
              <AboutView 
                lang={lang} 
                onOpenContactModal={() => handleOpenContactModal()} 
                brands={brands}
                contactEmail={contactEmail}
              />
            )}

            {currentTab === 'talent' && (
              <TalentDiscoveryView 
                onSelectTalent={handleSelectTalent} 
                initialFilter={talentFilter} 
                lang={lang} 
                categories={categories}
                talents={talents}
              />
            )}

            {currentTab === 'services' && (
              <ServicesView 
                lang={lang} 
                onOpenContactModal={() => handleOpenContactModal()} 
              />
            )}

            {currentTab === 'contact' && (
              <AboutView 
                lang={lang} 
                onOpenContactModal={() => handleOpenContactModal()} 
                brands={brands}
                contactEmail={contactEmail}
                targetTalent={contactTalentName}
              />
            )}

            {currentTab === 'admin' && (
              <AdminPanel 
                lang={lang} 
                onClose={() => setCurrentTab('home')} 
                onRefreshData={handleRefreshData}
              />
            )}
          </>
        )}

      </main>

      {/* Bottom Footer block */}
      <Footer onTabChange={handleTabChange} lang={lang} />

      {/* Corporate WhatsApp / Contact Modal Pop-up */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <motion.div 
              className="bg-white/75 backdrop-blur-xl max-w-lg w-full rounded-2xl p-6 md:p-8 shadow-2xl relative border border-white/60"
              initial={{ opacity: 0, y: 150, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 150, scale: 0.5 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              
              <button 
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 right-4 p-1.5 text-on-surface-variant hover:text-primary transition-colors cursor-pointer rounded-full hover:bg-rose-50"
              >
                <X className="w-5 h-5" />
              </button>

              {modalSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center animate-bounce">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg md:text-xl font-extrabold text-on-surface">
                    {lang === 'TR' ? 'Talep Gönderildi!' : 'Form Submitted successfully!'}
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant max-w-sm">
                    {lang === 'TR'
                      ? 'Booseberg ekibimiz başvurunuzu aldı. En kısa zamanda size özel WhatsApp veya e-posta kanalından dönüş sağlayacağız.'
                      : 'Our specialist has received your communication file. We will touch base via WhatsApp shortly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleModalSubmit} className="space-y-5">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1 block">
                      {lang === 'TR' ? 'HIZLI ILETISIM' : 'QUICK CONTACT'}
                    </span>
                    <h3 className="font-display text-xl font-bold text-on-surface">
                      {contactTalentName 
                        ? (lang === 'TR' ? `${contactTalentName} ile Çalışın` : `Work with ${contactTalentName}`)
                        : (lang === 'TR' ? 'Ajansımızla İletişime Geçin' : 'Connect with Agency')}
                    </h3>
                  </div>

                  {/* Role Switcher in iOS Style */}
                  <div className="relative p-1 bg-zinc-100 border border-zinc-200/50 rounded-xl flex items-center justify-between overflow-hidden">
                    {/* iOS sliding indicator */}
                    <motion.div 
                      className="absolute top-1 bottom-1 bg-white rounded-lg shadow-sm border border-zinc-200/30 z-0"
                      initial={false}
                      animate={{
                        left: modalType === 'brand' ? '4px' : '50%',
                        width: 'calc(50% - 4px)'
                      }}
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                    
                    <button
                      type="button"
                      onClick={() => setModalType('brand')}
                      className={`relative z-10 flex-1 py-1.5 text-center font-sans text-xs font-semibold select-none transition-colors duration-200 ${
                        modalType === 'brand' ? 'text-primary' : 'text-zinc-500 hover:text-zinc-800'
                      }`}
                    >
                      {lang === 'TR' ? 'Biz bir markayız' : 'Brand Client'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalType('influencer')}
                      className={`relative z-10 flex-1 py-1.5 text-center font-sans text-xs font-semibold select-none transition-colors duration-200 ${
                        modalType === 'influencer' ? 'text-primary' : 'text-zinc-500 hover:text-zinc-800'
                      }`}
                    >
                      {lang === 'TR' ? 'Ben bir yeteneğim' : 'Talent Applicant'}
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Name field */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-on-surface-variant block font-sans">{lang === 'TR' ? 'Adınız Soyadınız' : 'Your Name'} *</label>
                      <input 
                        type="text" 
                        required
                        value={modalName}
                        onChange={(e) => setModalName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full bg-white/65 border border-rose-100/60 rounded-xl p-3 text-xs md:text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 shadow-inner"
                      />
                    </div>

                    {/* Email field */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-on-surface-variant block font-sans">{lang === 'TR' ? 'E-posta veya Telefon' : 'Email or Phone'} *</label>
                      <input 
                        type="text" 
                        required
                        value={modalEmail}
                        onChange={(e) => setModalEmail(e.target.value)}
                        placeholder="hello@example.com"
                        className="w-full bg-white/65 border border-rose-100/60 rounded-xl p-3 text-xs md:text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 shadow-inner"
                      />
                    </div>

                    {/* Message field */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-on-surface-variant block font-sans">{lang === 'TR' ? 'Mesajınız' : 'Your Message'}</label>
                      <textarea 
                        rows={3}
                        value={modalMessage}
                        onChange={(e) => setModalMessage(e.target.value)}
                        placeholder={contactTalentName 
                          ? (lang === 'TR' ? `${contactTalentName} ile kurmak istediğiniz ortak projenin detayları...` : `Details regarding your planned collaboration with ${contactTalentName}...`)
                          : (lang === 'TR' ? 'Aklınızdaki fikirleri bizimle paylaşın...' : 'Share your ideas or casting specifications...')}
                        className="w-full bg-white/65 border border-rose-100/60 rounded-xl p-3 text-xs md:text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 resize-none shadow-inner"
                      />
                    </div>
                  </div>

                  {/* GDPR / KVKK Consent notice */}
                  <div className="flex items-start gap-2 bg-rose-500/5 hover:bg-rose-500/10 border border-primary/10 rounded-xl p-3 transition-colors">
                    <input 
                      type="checkbox" 
                      required 
                      id="gdpr-consent-checkbox"
                      className="mt-0.5 accent-primary cursor-pointer w-4 h-4 rounded text-primary focus:ring-primary"
                    />
                    <label htmlFor="gdpr-consent-checkbox" className="text-[10px] text-[11px] text-zinc-600 font-sans leading-relaxed cursor-pointer select-none">
                      {lang === 'TR' ? (
                        <>
                          <strong>KVKK Bilgilendirmesi:</strong> Paylaştığım kişisel verilerimin, Booseberg Talent Agency temsil hakları ve reklam/ortak işbirlikleri kapsamında KVKK mevzuatına uygun şekilde işlenmesini kabul ediyorum.
                        </>
                      ) : (
                        <>
                          <strong>GDPR / KVKK Consent:</strong> I agree that my shared personal credentials will be processed securely under GDPR and KVKK compliance frameworks for representation, media castings, and campaign matching.
                        </>
                      )}
                    </label>
                  </div>

                  <div className="pt-3 flex gap-3">
                    <a 
                      href="https://wa.me/905551234567" 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex-1 bg-[#25D366] text-white text-xs md:text-sm font-semibold rounded-full py-3 px-4 flex items-center justify-center gap-1.5 shadow-md shadow-[#25D366]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>WhatsApp</span>
                    </a>
                    <button
                      type="submit"
                      className="flex-grow bg-primary text-on-primary text-xs md:text-sm font-semibold rounded-full py-3 px-4 shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      {lang === 'TR' ? 'Gönder' : 'Direct Submit'}
                    </button>
                  </div>
                </form>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
