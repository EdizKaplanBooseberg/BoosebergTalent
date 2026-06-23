import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Star, ShieldCheck, Users, Palette } from 'lucide-react';

interface HomeViewProps {
  onTabChange: (tab: string, filter?: string) => void;
  lang: 'TR' | 'EN';
  onOpenContactModal: () => void;
  slides: any[];
}

export default function HomeView({ onTabChange, lang, onOpenContactModal, slides = [] }: HomeViewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const getSlideAction = (btnLink: string, externalUrl?: string) => {
    if (btnLink === 'none') {
      return undefined;
    }
    if (btnLink === 'external') {
      return () => {
        if (externalUrl) {
          window.open(externalUrl, '_blank', 'noopener,noreferrer');
        }
      };
    }
    if (btnLink === 'contact') {
      return () => onOpenContactModal();
    }
    return () => onTabChange(btnLink);
  };

  const activeSlides = slides && slides.length > 0 ? slides.map(s => ({
    image: s.image,
    title: lang === 'TR' ? (s.titleTR || '') : (s.titleEN || ''),
    description: lang === 'TR' ? (s.descriptionTR || '') : (s.descriptionEN || ''),
    btnText: lang === 'TR' ? (s.btnTextTR || '') : (s.btnTextEN || ''),
    btnLink: s.btnLink || 'contact',
    action: getSlideAction(s.btnLink || 'contact', s.externalUrl)
  })) : [
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvWvfP_lKS0c0s3X_lxxLkMq7n4UlChqbjoIQWlKhJKAgJ_0g-LbPPhB2KKsP_ksjozJR36dVCMeLq2EZ5YxmgMHzN0iKvBHbb9Bf1VVRAwY_JROWkpuzyUH8wlgItxR0n5K-rCSs9d-qol4UidSw2tmUCgA-T-vl65jpqSv6EE1rtyHT324vMa7ohhhwKF_SDb90hHEnczwZ_mBPDme3jpIHt9RE6Hp-f2e3y2ZtK2gU79mfE1OofVzhSv0eIJUnTtnAWEKAEuVU',
      title: lang === 'TR' ? 'Yetenekleri Fırsatlarla Buluşturuyoruz' : 'Uniting Elite Talent with Opportunity',
      description: lang === 'TR' 
        ? 'Booseberg Talent ile vizyonunuzu gerçeğe dönüştürün. Profesyonel temsil ve stratejik medya yönetimi.'
        : 'Bring your creative vision to life with Booseberg Talent. Premium representation and strategic media management.',
      btnText: lang === 'TR' ? 'Hemen Başlayın' : 'Start Today',
      btnLink: 'contact',
      action: () => onOpenContactModal()
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWXuW5zrF_PyjNg2hvV0ErfQmjwViDWir0nQm_5EL0bpgESR7YR2uMdql7XBa2LcdHemn0jVfi91mj3-wfmCm1_H_dTbRmEoYfHRBZtpzTvIK6ipQnVJGwkFPTYpmM9gvwCyU7WsUsM4Ven1x34_D57CjQkzudFbtM176f-qALYDu_TxXB08PwOkGq-qdJA7YGRc_CmW4wZTG23I6_MVE15A4z01MF6uzKTCADDze8CjqWsfKgLag-TyZaLJxyTt8jyVkH74JpnVM',
      title: lang === 'TR' ? 'Sektörün En İyi İsimleri Burada' : 'The Industry’s Elite represent here',
      description: lang === 'TR'
        ? 'Global markalar ve öncü yetenekler için her iki tarafa da değer katan ortak bir ekosistem.'
        : 'A shared high-end ecosystem delivering peak value to global brands and pioneering talents.',
      btnText: lang === 'TR' ? 'Keşfet' : 'Discover',
      btnLink: 'talent',
      action: () => onTabChange('talent')
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeSlides.length > 0) {
        setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [activeSlides.length]);

  const nextSlide = () => {
    if (activeSlides.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }
  };

  const prevSlide = () => {
    if (activeSlides.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
    }
  };

  return (
    <div className="w-full space-y-24 animate-in fade-in duration-500">
      
      {/* Hero Carousel Section - Full screen width */}
      <section className="relative h-[650px] md:h-[750px] w-full overflow-hidden bg-zinc-900 shadow-2xl">
        <div 
          className="flex h-full w-full transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {activeSlides.map((slide, idx) => (
            <div key={idx} className="relative w-full h-full flex-shrink-0">
              <img 
                className="absolute inset-0 w-full h-full object-cover brightness-[0.6] scale-105 transition-all duration-[6000ms] ease-out" 
                src={slide.image} 
                alt="Booseberg Agency Production Studio"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 md:px-16 max-w-4xl mx-auto space-y-6">
                <span className="text-rose-500 text-xs font-bold tracking-[0.2em] uppercase bg-rose-500/15 border border-rose-500/25 px-4 py-1.5 rounded-full backdrop-blur-md animate-pulse">
                  Booseberg Talent Elite
                </span>
                {slide.title && (
                  <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                    {slide.title}
                  </h1>
                )}
                {slide.description && (
                  <p className="text-zinc-200 font-sans text-base md:text-xl max-w-2xl font-light">
                    {slide.description}
                  </p>
                )}
                {slide.btnLink !== 'none' && slide.btnText && slide.action && (
                  <div className="pt-4">
                    <button 
                      onClick={slide.action}
                      className="bg-primary hover:bg-red-700 text-on-primary font-display font-semibold text-base py-3.5 px-8 rounded-full shadow-lg hover:shadow-primary/30 active:scale-95 transition-all duration-300 transform duration-300 cursor-pointer"
                    >
                      {slide.btnText}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2.5 z-20">
          {activeSlides.map((_, idx) => (
            <button
               key={idx}
               onClick={() => setCurrentSlide(idx)}
               className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                 currentSlide === idx ? 'w-8 bg-primary' : 'w-2 bg-white/40 hover:bg-white/70'
               }`}
             />
          ))}
        </div>

        {/* Carousel Controls */}
        <button 
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 backdrop-blur-md hover:bg-white/30 border border-white/10 flex items-center justify-center text-white cursor-pointer active:scale-90 transition-all z-20" 
          onClick={prevSlide}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 backdrop-blur-md hover:bg-white/30 border border-white/10 flex items-center justify-center text-white cursor-pointer active:scale-90 transition-all z-20" 
          onClick={nextSlide}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>

      {/* Grid Content Wrapper to keep home page sections aligned */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 w-full space-y-24">
        {/* Talent Diversity Section (Bento Grid) */}
        <section className="py-8">
          <div className="text-center mb-12">
            <span className="text-primary font-sans text-xs font-bold tracking-[0.2em] uppercase mb-2 block">
              {lang === 'TR' ? 'PORTFÖYÜMÜZ' : 'OUR PORTFOLIO'}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-on-background">
              {lang === 'TR' ? 'Yetenek Çeşitliliği' : 'Diversity of Talents'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px] md:auto-rows-[300px]">
          
          {/* Talent Category: Actors */}
          <div 
            onClick={() => onTabChange('talent', 'actor')}
            className="md:col-span-8 group relative overflow-hidden rounded-2xl bg-zinc-800 transition-all duration-500 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 border border-rose-100/10"
          >
            <img 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.7]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuADzhLmp0LMATj5UY2e4ECIH5wu9JY1zrJLHm_gt9NIrv0HwkIo-f_S2X3XRQ2V224_viF4lHXd08DdimNirLgjwNZJvuNOO0mKoXznJ0sVi4Pmebym_khgRPIwcgO4bUBKaOJ0aI7I1MZ1FxHE1hVOMq_tafUbX2CFUsqGq2la6PZ6VTAaPOzm9VyvqfpTKTbuxzK369ICe1csl9IolzWaw-3j2ujl5ezb_5zyBiQF4y6BTBxaTXLnpIDLNd4iZqDb1Ze-wEf4EnE" 
              alt="Actor Casting Photos"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-black/10 to-transparent p-6 flex flex-col justify-end">
              <div className="flex items-center gap-1.5 text-rose-400 mb-1 z-10">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-xs font-bold tracking-wider uppercase">{lang === 'TR' ? 'LİDER OYUNCULAR' : 'ELITE ACTORS'}</span>
              </div>
              <h3 className="text-white font-display text-2xl font-bold z-10">
                {lang === 'TR' ? 'Oyuncular' : 'Actors'}
              </h3>
              <p className="text-zinc-200/80 font-sans text-sm z-10 font-light mt-1">
                {lang === 'TR' ? 'Sinema, televizyon ve dizi dünyasının ödüllü yıldızları.' : 'Award-winning stars of screen, cinema, and television.'}
              </p>
            </div>
          </div>

          {/* Talent Category: Broadcasters */}
          <div 
            onClick={() => onTabChange('talent', 'broadcaster')}
            className="md:col-span-4 group relative overflow-hidden rounded-2xl bg-zinc-800 transition-all duration-500 cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1 border border-rose-100/10"
          >
            <img 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.7]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuARVRqEAl0HtQrnc-IPscxN8JLFrS7CNw1vrMeyfe4yTKp5i1DEn06CRDRGvmRZR6rZo1I2UhXGc61uNMPns54uVyxUOjQioBE_fGspPkS8LgEmnDuKzin5kj4qUPesftjhVdnJkqr6LxHns56af--9O-3LdDbUyGUUJOhLtE76sK8tcVQwczWOvwZ1KLspIZWhTCza6MAv_dhX7kHGgEpGWOuVVnB4-p0I9oH70V7QLrzUklYOuwORBmfT7F0QK5t3X3B-2T1HCeA" 
              alt="Live Broadcasting Microphones and Studio"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-black/10 to-transparent p-6 flex flex-col justify-end">
              <div className="flex items-center gap-1.5 text-emerald-400 mb-1 z-10">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold tracking-wider uppercase">{lang === 'TR' ? 'YAYIN LİDERLERİ' : 'LIVE STREAMERS'}</span>
              </div>
              <h3 className="text-white font-display text-2xl font-bold z-10">
                {lang === 'TR' ? 'Yayıncılar' : 'Broadcasters'}
              </h3>
              <p className="text-zinc-200/80 font-sans text-sm z-10 font-light mt-1">
                {lang === 'TR' ? 'Canlı yayının, dijital mecraların ve podcast dünyasının usta sesleri.' : 'Master creators of digital media and podcasts.'}
              </p>
            </div>
          </div>

          {/* Talent Category: Influencers (Detailed Row) */}
          <div className="md:col-span-12 group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl border border-rose-100/25 bg-rose-50 h-[400px] md:h-[320px] transition-all">
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-rose-100/45">
                <span className="text-primary font-sans text-xs font-semibold tracking-wider mb-2 block">
                  {lang === 'TR' ? 'TRENDLERİN ÖNCÜSÜ' : 'LEADING TRENDSETTERS'}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-on-surface mb-3">
                  {lang === 'TR' ? 'İnfluencer Stratejileri' : 'Influencer Strategies'}
                </h3>
                <p className="text-on-surface-variant font-sans text-sm md:text-base mb-6 leading-relaxed font-light">
                  {lang === 'TR'
                    ? 'Dijital dünyada ses getiren projeler üretiyor, global markalarla en organik, etkili yüzleri ve yaratıcı beyinleri bir araya getiriyoruz.'
                    : 'We engineer outstanding digital campaigns, connecting global brands with authentic creators and creative masterminds.'}
                </p>
                <button 
                  onClick={() => onTabChange('services')}
                  className="w-fit text-primary font-display font-semibold text-sm flex items-center gap-1 border-b border-primary hover:border-transparent transition-all hover:gap-2 cursor-pointer"
                >
                  <span>{lang === 'TR' ? 'Daha Fazlası' : 'Explore More'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="md:w-1/2 relative overflow-hidden h-48 md:h-full">
                <img 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4000ms] brightness-95" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm5yCXGuCJ8TqWqDlLAKv3Vu80daFLUecOu8QHgLM8db1HO0-oUPSu4UQyAdwdVurJGx3vAv7GLZOzBhaPDAdC8zrc2ba9Pbttrnvq1WBR8rq8wfNcz3LRT5_m9ZahfE7iWu-l-e6hp8Xy4jui4FQkaTfYXRnesLLcyBPgrWdzK-SQHyB-xqOfcTDUMlMhWKlIE3xZnwCoyA7-QB5VyqU9BxltSzrjnppaey2VSJ-1e_A8LgyivNxQsNUrWKXDFZljtUvAi4VYh7o" 
                  alt="Elegant Lifestyle Influencer Setup"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Media Agency Highlight Section */}
      <section className="bg-rose-100/20 py-16 -mx-6 md:-mx-16 px-6 md:px-16 border-y border-rose-100/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            {/* Visual Column */}
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:rotate-0 -rotate-1 transition-transform duration-500">
                <img 
                  className="w-full aspect-video object-cover brightness-[0.9] border-4 border-white/60 shadow-inner" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdHhoBI7ajh_weSiQvmn-DF39DidKksSPkitpXhK2X6yYLT1lRd1D5ojXGdmnpwZSEXqj4yQq8zS4ykVz2MQxKvdUIrwY90tEASvZGs7VMlRbjXPXsD05zAAZQpUaz9I_FGY1JhucacxlLy_6ku3ZG9_ZWJ7C-vYcCdUatH3fy_Nz3h7U3StKKfdJC0WqXn9OPPn1uEUv1OTAZG606UI_Zm_2xN0164C9btBj--E5vLU2wS554ZYvYmcb3DmCOom86ln6nwxTyJA4" 
                  alt="High-end studio meeting"
                />
                <div className="absolute inset-0 bg-primary/5 group-hover:opacity-0 transition-opacity" />
              </div>
            </div>

            {/* Content Column */}
            <div className="w-full lg:w-1/2 space-y-6 lg:pl-6">
              <span className="text-primary font-sans text-xs font-bold tracking-[0.25em] uppercase px-3 py-1 bg-primary/10 rounded-full w-fit block">
                {lang === 'TR' ? 'MİSYONUMUZ' : 'OUR MISSION'}
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold text-on-surface leading-tight">
                {lang === 'TR' ? 'Yalnızca Bir Ajans Değil,' : 'Not Just an Agency,'} <span className="text-primary">{lang === 'TR' ? 'Stratejik Partneriz' : 'A Strategic Partner'}</span>
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg font-sans font-light leading-relaxed">
                {lang === 'TR'
                  ? 'Booseberg Talent olarak markaların dijital imajını kusursuz inşa ediyoruz. Doğru yetenekle doğru hedef kitleyi buluşturan veri odaklı analizlerimiz ve 360° yönetim yaklaşımlarımızla küresel pazarda fark yaratıyoruz.'
                  : 'At Booseberg Talent, we craft perfect digital signatures. Guided by data analytics and custom 360° management, we connect elite talent with the precision audience global brands seek.'}
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-rose-100/45">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2 text-primary">
                    <Users className="w-5 h-5" />
                    <span className="font-display text-4xl font-extrabold">150+</span>
                  </div>
                  <span className="text-on-surface-variant font-sans text-sm font-medium">{lang === 'TR' ? 'Aktif Global Marka' : 'Active Global Brands'}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2 text-primary">
                    <Palette className="w-5 h-5" />
                    <span className="font-display text-4xl font-extrabold">500+</span>
                  </div>
                  <span className="text-on-surface-variant font-sans text-sm font-medium">{lang === 'TR' ? 'Başarılı Proje ve Kampanya' : 'Completed Media Campaigns'}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      </div>

    </div>
  );
}
