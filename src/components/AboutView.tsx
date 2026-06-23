import { useState, useRef, useEffect, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronRight } from 'lucide-react';
import { addContactLead } from '../lib/dataStore';

interface AboutViewProps {
  lang: 'TR' | 'EN';
  onOpenContactModal: () => void;
  selectedCategoryFromHeader?: string;
  targetTalent?: string;
  brands: any[];
  contactEmail: string;
}

export default function AboutView({ 
  lang, 
  onOpenContactModal, 
  selectedCategoryFromHeader, 
  targetTalent,
  brands = [],
  contactEmail = 'hello@booseberg.com'
}: AboutViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: targetTalent ? `${targetTalent} ile bir proje planlıyoruz.` : '',
    type: 'brand' // brand or influencer
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Persist as lead
    addContactLead({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      message: formData.message || '',
      type: formData.type // 'brand' or 'influencer'
    });

    setIsSubmitted(true);
    setTimeout(() => {
      // Clear data nicely
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        type: 'brand'
      });
    }, 5000);
  };

  return (
    <div className="w-full space-y-24 animate-in fade-in duration-500">
      
      {/* About Us Segment */}
      <section className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <span className="text-primary font-sans text-xs font-bold tracking-[0.2em] uppercase bg-rose-50 border border-rose-100 px-3.5 py-1.5 rounded-full w-fit block">
              {lang === 'TR' ? 'HAKKIMIZDA' : 'ABOUT US'}
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-on-surface leading-tight">
              {lang === 'TR' ? 'Yetenekleri Geleceğin Dijital Dünyasına Taşıyoruz' : 'Carrying Talent into the Digital Future'}
            </h1>
            <p className="font-sans text-on-surface-variant font-light text-base md:text-lg leading-relaxed">
              {lang === 'TR'
                ? 'Booseberg Talent, kurulduğu günden itibaren yenilikçi yaklaşımları ve güçlü küresel bağlantılarıyla dijital yetenekleri en prestijli marka iş birlikleriyle buluşturmaktadır. Sanatçıların kariyerlerini en doğru kanallarla yönetirken, markalara ise veri odaklı ve yüksek dönüşümlü pazarlama stratejileri sunuyoruz.'
                : 'Since inception, Booseberg Talent has combined visionary workflows and outstanding global links to unite digital creators with top-tier brands. While mapping detailed career blueprints for our talents, we drive data-proven high-conversion marketing outcomes for brands.'}
            </p>
            <p className="font-sans text-on-surface-variant font-light text-sm leading-relaxed">
              {lang === 'TR'
                ? 'Misyonumuz, yeteneklerin sanatsal derinliğini ve dijital popülaritesini koruyarak sürdürülebilir bir eko-kampanya modeli oluşturmaktır. İstanbul merkezli ofisimizle küresel trendleri takip edip uyguluyoruz.'
                : 'Our mission is to foster structured sustainable digital campaign operations while preserving artistic integrity. Headquartered in creative Istanbul hubs, we monitor and execute global tendencies.'}
            </p>
          </div>

          {/* Photographic Anchor */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video lg:aspect-square">
              <img 
                className="absolute inset-0 w-full h-full object-cover brightness-[0.9]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxuj8pWTXPAP9Pv47-5lwjZd2LyIKmjuJbE90cfvoiTVUB7bsVOXmktKXHwCWCSrHrSAst9oTI2LK8wxRmn58v_b6tDuY2SvM4r_67xtmYwC-u7r6xhZtJ5rqC8-SR_RmBHXTB4IHpbMSZEYPxHaYRww5WtKvUVsL2x2XGkKad0Vr-Dbs2WlfJ2uWBZHCWaVJd4NMaNYQ1mtQFxIqHeDWWcbNLJsT7XwoS2JH4AmACqPLjl_ozsYxiZ53dhMDDlQcBIKFxg7UayZY" 
                alt="Booseberg Talent boardroom discussion"
              />
              <div className="absolute inset-0 bg-primary/5" />
            </div>
          </div>

        </div>
      </section>

      {/* Brand Referances Styled 5-Column Grid section */}
      <section className="bg-rose-100/10 py-12 -mx-6 md:-mx-16 border-y border-rose-100/20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center md:text-left">
          <span className="text-primary font-mono text-[10px] font-bold tracking-[0.25em] uppercase block mb-1">
            {lang === 'TR' ? 'PARTNERLERİMİZ' : 'BRANDS'}
          </span>
          <h2 className="font-display text-lg md:text-xl font-extrabold text-on-surface opacity-80">
            {lang === 'TR' ? 'Birlikte Çalıştığımız Sektör Liderleri' : 'Sector Leaders Working With Us'}
          </h2>
        </div>

        {/* Dynamic Static 5-Column Grid with color logo icons */}
        <div className="max-w-7xl mx-auto px-6">
          {brands.length === 0 ? (
            <div className="text-center py-6 text-zinc-400 text-xs font-sans">
              {lang === 'TR' ? 'Kayıtlı marka bulunamadı.' : 'No brand logos stored.'}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-start justify-items-center">
              {brands.map((brand, index) => (
                <div 
                  key={brand.id || index}
                  className="flex flex-col items-center space-y-2 w-full group"
                >
                  <div className="bg-white/60 hover:bg-white rounded-2xl border border-rose-100/30 p-4 md:p-5 w-full h-28 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                    <img
                      className="max-h-12 md:max-h-16 max-w-full object-contain pointer-events-none duration-300 transition-transform group-hover:scale-105"
                      src={brand.image}
                      alt={brand.name}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-xs font-semibold text-zinc-600 group-hover:text-primary transition-colors text-center truncate max-w-full px-1">
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Contact Segment with Form */}
      <section id="contact-section" className="max-w-7xl mx-auto px-6 md:px-0 scroll-mt-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Contact Details */}
          <div className="w-full lg:w-1/3 space-y-8 lg:pr-6">
            <div className="space-y-3">
              <span className="text-primary font-sans text-xs font-bold tracking-[0.2em] uppercase">{lang === 'TR' ? 'ILETISIM' : 'CONTACT'}</span>
              <h2 className="font-display text-2xl md:text-4xl font-extrabold text-on-surface">{lang === 'TR' ? 'Görüşelim' : 'Get in Touch'}</h2>
              <p className="font-sans text-on-surface-variant font-light text-sm max-w-sm">
                {lang === 'TR'
                  ? 'Aklınızdaki projeyi gerçekleştirmek veya portföyümüze başvurmak için her zaman açığız.'
                  : 'We are always open to discuss brand campaigns, model placements, or career representations.'}
              </p>
            </div>

            <div className="space-y-4">
              
              {/* E-posta */}
              <div className="flex gap-4 p-4 rounded-xl bg-white border border-rose-100/30 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-red-50 text-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block opacity-50">E-Posta</span>
                  <a href={`mailto:${contactEmail}`} className="font-sans font-semibold text-sm text-on-surface hover:text-primary transition-colors">{contactEmail}</a>
                </div>
              </div>

              {/* Telefon */}
              <div className="flex gap-4 p-4 rounded-xl bg-white border border-rose-100/30 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-green-50 text-green-700 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block opacity-50">{lang === 'TR' ? 'Telefon / WhatsApp' : 'Phone / WhatsApp'}</span>
                  <a href="tel:+905551234567" className="font-sans font-semibold text-sm text-on-surface hover:text-primary transition-colors">+90 (555) 123 45 67</a>
                </div>
              </div>

              {/* Ofis */}
              <div className="flex gap-4 p-4 rounded-xl bg-white border border-rose-100/30 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block opacity-50">{lang === 'TR' ? 'Ofis / Adres' : 'Creative Studio'}</span>
                  <p className="font-sans font-semibold text-sm text-on-surface leading-normal">Levent Loft, No: 128, Beşiktaş / İstanbul</p>
                </div>
              </div>

            </div>
          </div>

          {/* Submission Form */}
          <div className="w-full lg:w-2/3 bg-white/60 backdrop-blur-md border border-rose-100/30 rounded-3xl p-8 md:p-12 shadow-xl relative">
            
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16 animate-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-extrabold text-on-surface">
                  {lang === 'TR' ? 'Teşekkür Ederiz!' : 'Message Received!'}
                </h3>
                <p className="font-sans text-on-surface-variant text-sm max-w-md">
                  {lang === 'TR'
                    ? 'Mesajınız başarıyla iletildi. Uzman ekibimiz detaylı inceleme sonrası sizinle en kısa sürede iletişime geçecektir.'
                    : 'Your information has been logged in our secure systems. Our manager will touch base shortly.'}
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary font-display font-semibold text-sm border-b border-primary hover:border-transparent transition-all cursor-pointer"
                >
                  {lang === 'TR' ? 'Yeni Mesaj Gönder' : 'Submit Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <h3 className="font-display text-lg md:text-xl font-bold text-on-surface">{lang === 'TR' ? 'Bizimle İletişime Geçin' : 'Connect with Us'}</h3>
                  <p className="font-sans text-on-surface-variant font-light text-xs md:text-sm">{lang === 'TR' ? 'Formu doldurun, size en kısa sürede geri dönüş yapalım.' : 'Complete the fields and we will respond momentarily.'}</p>
                </div>

                {/* Role Switcher */}
                <div className="grid grid-cols-2 gap-4 p-1 bg-rose-50 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'brand' })}
                    className={`py-2 px-4 rounded-lg font-sans text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                      formData.type === 'brand'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {lang === 'TR' ? 'Biz bir markayız' : 'I am a Brand'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'influencer' })}
                    className={`py-2 px-4 rounded-lg font-sans text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                      formData.type === 'influencer'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {lang === 'TR' ? 'Ben bir influencer / oyuncuyum' : 'I am a Creator / Talent'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-on-surface-variant block font-sans">{lang === 'TR' ? 'Ad Soyad' : 'Your Name'} *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={lang === 'TR' ? 'Melisa Yıldırım' : 'Melisa Yildirim'}
                      className="w-full bg-white/80 border border-outline-variant rounded-xl p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/30"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-on-surface-variant block font-sans">{lang === 'TR' ? 'E-posta' : 'Email Address'} *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="hello@gmail.com"
                      className="w-full bg-white/80 border border-outline-variant rounded-xl p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/30"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold text-on-surface-variant block font-sans">{lang === 'TR' ? 'Telefon Numarası' : 'Phone Number'}</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+90 (555) 123 45 67"
                      className="w-full bg-white/80 border border-outline-variant rounded-xl p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/30"
                    />
                  </div>

                  {/* Message field */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold text-on-surface-variant block font-sans">{lang === 'TR' ? 'Mesajınız' : 'Your Message'}</label>
                    <textarea 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={lang === 'TR' ? 'Birlikte gerçekleştirmek istediğiniz projelerden bahsedin...' : 'Describe your project plans or requirements...'}
                      className="w-full bg-white/80 border border-outline-variant rounded-xl p-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/30 resize-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary text-on-primary font-display font-semibold text-sm py-3 px-8 rounded-full shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer border border-transparent hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>{lang === 'TR' ? 'Gönder' : 'Submit'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}

