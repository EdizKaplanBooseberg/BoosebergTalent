import { useState, useEffect } from 'react';
import { Talent } from '../types';
import { 
  ArrowLeft, MessageCircle, Calendar, Ruler, Award, Eye, 
  GraduationCap, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { translateEyeColor } from '../lib/dataStore';

interface TalentProfileViewProps {
  talent: Talent;
  onBack: () => void;
  lang: 'TR' | 'EN';
  onOpenContactModal: (talentName?: string) => void;
}

export default function TalentProfileView({
  talent,
  onBack,
  lang,
  onOpenContactModal
}: TalentProfileViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const bio = lang === 'TR' ? (talent.bioTR || talent.bio) : (talent.bioEN || talent.bio || talent.bioTR);
  const roleLabel = lang === 'TR' ? (talent.roleLabelTR || talent.roleLabel) : (talent.roleLabelEN || talent.roleLabel || talent.roleLabelTR);
  const eyeDisplay = translateEyeColor(talent.eyeColor, lang);

  const images = talent.carouselImages && talent.carouselImages.length > 0 
    ? talent.carouselImages 
    : [talent.image];

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  // Convert categories label translation nicely
  const categoryLabelTR = talent.category === 'actor' 
    ? 'OYUNCU' 
    : talent.category === 'influencer' 
    ? 'INFLUENCER' 
    : 'YAYINCI';
  const categoryLabelEN = talent.category === 'actor' 
    ? 'ACTOR' 
    : talent.category === 'influencer' 
    ? 'INFLUENCER' 
    : 'BROADCASTER';
  const categoryLabelDisplay = lang === 'TR' ? categoryLabelTR : categoryLabelEN;

  return (
    <div id="talent-profile-root" className="w-full space-y-12 animate-in fade-in duration-500 pb-20">
      
      {/* Top Floating Back Button Panel (Glass effect) */}
      <div className="max-w-7xl mx-auto px-6 pt-4 flex justify-between items-center relative z-20">
        <button
          id="btn-back-to-talents"
          onClick={onBack}
          className="flex items-center gap-2 font-display font-semibold text-sm text-on-surface hover:text-primary bg-white/80 dark:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-rose-100/35 shadow-sm transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{lang === 'TR' ? 'Yeteneklere Dön' : 'Back to Talents'}</span>
        </button>
        <span className="text-xs font-mono text-on-surface-variant opacity-60 bg-white/80 dark:bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-rose-100/35">
          PRO / {talent.id.toUpperCase()}
        </span>
      </div>

      {/* Seamless Horizontal Carousel (Edge-to-Edge) */}
      <div id="talent-hero-carousel" className="relative w-full h-[55vh] md:h-[65vh] min-h-[420px] bg-zinc-950 overflow-hidden shadow-2xl">
        
        {/* Images Track */}
        <div 
          className="flex h-full w-full transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="relative w-full h-full flex-shrink-0">
              <img 
                className="absolute inset-0 w-full h-full object-cover brightness-[0.7] focusable-img" 
                src={img} 
                alt={`${talent.name} slide ${idx + 1}`}
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        {/* Immersive Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30 pointer-events-none z-10" />

        {/* Left & Right Arrows (Only if multiple images exist) */}
        {images.length > 1 && (
          <>
            <button
              id="talent-carousel-prev"
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-primary/95 text-white backdrop-blur-md border border-white/10 hover:border-transparent transition-all z-20 cursor-pointer hover:scale-105"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              id="talent-carousel-next"
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-primary/95 text-white backdrop-blur-md border border-white/10 hover:border-transparent transition-all z-20 cursor-pointer hover:scale-105"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Carousel Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-6 right-8 flex space-x-2 z-20">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx ? 'w-8 bg-primary' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Bottom Left Elegant Giant Text Block */}
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="max-w-7xl mx-auto px-6 md:px-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              
              {/* Massive Name & Category Beside it */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3.5">
                  <h1 className="font-display text-4xl md:text-7xl font-extrabold text-white tracking-tight uppercase drop-shadow-md">
                    {talent.name}
                  </h1>
                  <span className="text-xs md:text-sm font-bold font-sans text-black uppercase tracking-widest bg-white border border-white px-4 py-1.5 rounded-full inline-block mt-1 md:mt-0 drop-shadow-sm">
                    {categoryLabelDisplay}
                  </span>
                </div>
                <p className="font-sans text-lg md:text-2xl text-white/90 drop-shadow-sm font-medium">
                  {roleLabel}
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Main Content Layout Block: Bio, Features & Metrics */}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Biography ("bio yazısı") */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display text-xl md:text-2xl font-bold text-on-surface border-b border-rose-100/50 pb-3">
              {lang === 'TR' ? 'Biyografi' : 'Biography'}
            </h3>
            <p className="font-sans text-on-surface-variant font-light leading-relaxed text-lg whitespace-pre-line text-justify md:text-left">
              {bio}
            </p>
            
            <div className="bg-rose-50/20 rounded-2xl border border-rose-100/30 p-6 space-y-4">
              <h4 className="font-display font-semibold text-base text-primary">
                {lang === 'TR' ? `${talent.name} Hakkında` : `About ${talent.name}`}
              </h4>
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                {lang === 'TR' 
                  ? 'Kreatif vizyonunuzu hayata geçirmek için profesyonel proje temsili, iş ortaklıkları ve marka iş birlikleri kapsamında bizimle görüşebilirsiniz.'
                  : 'Get in touch with us today on potential professional bookings, brand campaigns, and creative partnership structures with this talent.'}
              </p>
            </div>
          </div>

          {/* Right Column: Features and stats ("özellikler") */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Box 1: Physical Characteristics */}
            <div className="bg-white rounded-3xl border border-rose-100/30 p-6 md:p-8 shadow-xl text-zinc-850">
              <div className="space-y-4">
                <h3 className="font-display text-lg font-bold text-zinc-800">
                  {lang === 'TR' ? 'Fiziksel Özellikler' : 'Physical Characteristics'}
                </h3>

                {/* Physical details grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center justify-center bg-zinc-50 p-3 rounded-xl border border-zinc-100/70 text-center">
                    <div className="p-2 rounded-xl bg-orange-50 text-orange-600 mb-2">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 block font-sans leading-none mb-1">{lang === 'TR' ? 'Yaş' : 'Age'}</span>
                      <span className="font-sans font-bold text-sm text-zinc-800">{talent.age}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center bg-zinc-50 p-3 rounded-xl border border-zinc-100/70 text-center">
                    <div className="p-2 rounded-xl bg-teal-50 text-teal-600 mb-2">
                      <Ruler className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 block font-sans leading-none mb-1">{lang === 'TR' ? 'Boy' : 'Height'}</span>
                      <span className="font-sans font-bold text-sm text-zinc-800">{talent.height}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center bg-zinc-50 p-3 rounded-xl border border-zinc-100/70 text-center">
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-600 mb-2">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-400 block font-sans leading-none mb-1">{lang === 'TR' ? 'Göz' : 'Eyes'}</span>
                      <span className="font-sans font-bold text-sm text-zinc-800 truncate block max-w-[64px]">{eyeDisplay}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 2: Social Media Reach */}
            <div className="bg-white rounded-3xl border border-rose-100/30 p-6 md:p-8 shadow-xl text-zinc-850">
              <div className="space-y-4">
                <h3 className="font-display text-sm font-bold text-zinc-500 uppercase tracking-wider">
                  {lang === 'TR' ? 'Sosyal Medya Erişimi' : 'Social Media Reach'}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      id: 'instagram',
                      name: 'INSTAGRAM',
                      hex: '#E1306C',
                      icon: (
                        <svg className="w-5 h-5" style={{ color: '#E1306C' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                        </svg>
                      ),
                      follower: talent.socials?.instagram,
                      url: talent.socialUrls?.instagram
                    },
                    {
                      id: 'tiktok',
                      name: 'TIKTOK',
                      hex: '#25F4EE', // Custom Neon TikTok Cyan Blue
                      icon: (
                        <svg className="w-5 h-5" style={{ color: '#000000' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                        </svg>
                      ),
                      follower: talent.socials?.tiktok,
                      url: talent.socialUrls?.tiktok
                    },
                    {
                      id: 'youtube',
                      name: 'YOUTUBE',
                      hex: '#FF0000',
                      icon: (
                        <svg className="w-5 h-5" style={{ color: '#FF0000' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 14.12"/>
                        </svg>
                      ),
                      follower: talent.socials?.youtube,
                      url: talent.socialUrls?.youtube
                    },
                    {
                      id: 'kick',
                      name: 'KICK',
                      hex: '#53FC18', // Kick Lime
                      icon: (
                        <span className="w-5 h-5 text-[10px] font-extrabold bg-current/10 rounded flex items-center justify-center font-mono border border-dashed border-current" style={{ color: '#53FC18' }}>
                          K
                        </span>
                      ),
                      follower: talent.socials?.kick,
                      url: talent.socialUrls?.kick
                    },
                    {
                      id: 'twitch',
                      name: 'TWITCH',
                      hex: '#9146FF',
                      icon: (
                        <svg className="w-5 h-5" style={{ color: '#9146FF' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9H9V6h2v5zm4 0h-2V6h2v5z"/>
                        </svg>
                      ),
                      follower: talent.socials?.twitch,
                      url: talent.socialUrls?.twitch
                    },
                    {
                      id: 'twitter',
                      name: 'TWITTER',
                      hex: '#1DA1F2',
                      icon: (
                        <span className="font-display w-5 h-5 font-black text-sm flex items-center justify-center" style={{ color: '#1DA1F2' }}>X</span>
                      ),
                      follower: talent.socials?.twitter,
                      url: talent.socialUrls?.twitter
                    }
                  ].filter(s => s.follower && s.follower.trim() !== '').map((soc) => (
                    <a 
                      key={soc.id}
                      href={soc.url || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-2xl flex flex-col items-center justify-center border shadow-sm transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] group"
                      style={{
                        color: soc.hex,
                        borderColor: `${soc.hex}50`,
                        backgroundColor: `${soc.hex}0b`
                      }}
                      title={`${soc.name} yetenek profili`}
                    >
                      {soc.icon}
                      <span 
                        style={{ color: soc.hex }} 
                        className="text-[9px] font-black tracking-wider mt-1.5 font-sans uppercase group-hover:opacity-100 transition-opacity text-center leading-none"
                      >
                        {soc.name}
                      </span>
                      <span 
                        style={{ color: soc.hex }} 
                        className="font-display text-[14px] font-black mt-0.5 whitespace-nowrap"
                      >
                        {soc.follower}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Box 3: Education Details */}
            <div className="bg-white rounded-3xl border border-rose-100/30 p-6 md:p-8 shadow-xl text-zinc-850">
              <div className="space-y-4">
                <h3 className="font-display text-lg font-bold text-zinc-850 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <span>{lang === 'TR' ? 'Eğitim Bilgileri' : 'Education Details'}</span>
                </h3>
                <div className="space-y-2.5">
                  {talent.educations && talent.educations.length > 0 ? (
                    talent.educations.map((item, index) => {
                      const school = lang === 'TR' ? (item.schoolTR || item.school) : (item.schoolEN || item.school || item.schoolTR);
                      const degree = lang === 'TR' ? (item.degreeTR || item.degree) : (item.degreeEN || item.degree || item.degreeTR);
                      return (
                        <div key={index} className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-100 space-y-1">
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-xs font-bold text-zinc-700 font-sans tracking-tight leading-snug">{school}</span>
                            {item.year && (
                              <span className="text-[9px] font-mono font-medium text-zinc-400 bg-zinc-200/50 px-1.5 py-0.5 rounded-md flex-shrink-0">{item.year}</span>
                            )}
                          </div>
                          {degree && (
                            <p className="text-[11px] text-zinc-500 font-sans font-light leading-snug mt-0.5">{degree}</p>
                          )}
                        </div>
                      );
                    })
                  ) : talent.education ? (
                    <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-100">
                      <span className="text-xs font-bold text-zinc-700 font-sans tracking-tight leading-snug">{talent.education}</span>
                    </div>
                  ) : (
                    <div className="text-xs text-zinc-400 italic font-light p-3 text-center border border-dashed border-zinc-150 rounded-xl">
                      {lang === 'TR' ? 'Eğitim bilgisi belirtilmedi.' : 'Education details not specified.'}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Featured Projects & Campaigns ("öne çıkan projeler ve kampanyalar") */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 space-y-6 pt-6">
        <div className="flex items-center space-x-2.5 border-b border-rose-100/35 pb-4">
          <Award className="w-5 h-5 text-primary" />
          <h2 className="font-display text-xl md:text-2xl font-extrabold text-on-surface">
            {lang === 'TR' ? 'Öne Çıkan Projeler & Kampanyalar' : 'Featured Projects & Campaigns'}
          </h2>
        </div>

        {talent.projects && talent.projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {talent.projects.map((project) => (
              <div 
                key={project.id}
                className="group relative h-[320px] rounded-2xl overflow-hidden bg-rose-50 border border-rose-100/20 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <img 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform brightness-[0.7]" 
                  src={project.image} 
                  alt={project.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-5 flex flex-col justify-end">
                  <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase mb-1">
                    {lang === 'TR' ? (project.typeTR || project.type) : (project.typeEN || project.type || project.typeTR)}
                  </span>
                  <h3 className="text-white font-display text-lg font-bold group-hover:text-primary transition-colors">
                    {lang === 'TR' ? (project.titleTR || project.title) : (project.titleEN || project.title || project.titleTR)}
                  </h3>
                  <p className="text-zinc-300 font-sans text-xs mt-1 font-light">
                    {lang === 'TR' ? (project.roleTR || project.role) : (project.roleEN || project.role || project.roleTR)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-rose-50/10 border border-dashed border-rose-100/30 rounded-2xl">
            <span className="text-sm font-sans text-on-surface-variant opacity-70">
              {lang === 'TR' ? 'Kayıtlı medya veya kampanya bulunmamaktadır.' : 'No registered projects or campaigns available.'}
            </span>
          </div>
        )}
      </section>

      {/* Prominent Centered Contact CTA */}
      <section className="max-w-7xl mx-auto px-6 text-center pt-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-gradient-to-br from-rose-50/60 to-white dark:from-zinc-900/40 dark:to-zinc-950/20 p-8 rounded-3xl border border-rose-100/40 shadow-xl max-w-2xl mx-auto space-y-5">
          <h3 className="font-display text-2xl font-extrabold text-on-surface">
            {lang === 'TR' ? `${talent.name} ile Proje Başlatın` : `Start a Project with ${talent.name}`}
          </h3>
          <p className="font-sans text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
            {lang === 'TR'
              ? 'Marka iş birlikleri, dizi, film, dijital kampanya ve profesyonel rezervasyon talepleri için temsilci ekibimizle hızlıca iletişime geçin.'
              : 'Contact our representation desk directly for brand campaigns, digital partnerships, film productions, or professional talent bookings.'}
          </p>
          <div className="pt-2 flex justify-center">
            <button
              id="talent-footer-contact"
              onClick={() => onOpenContactModal(talent.name)}
              className="bg-primary text-on-primary hover:bg-primary-hover font-display font-bold text-base transition-all duration-300 px-10 py-4.5 rounded-full shadow-2xl hover:shadow-primary/40 flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.04] active:scale-[0.982]"
            >
              <MessageCircle className="w-5.5 h-5.5" />
              <span>{lang === 'TR' ? 'İletişime Geçin' : 'Get in Touch'}</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
