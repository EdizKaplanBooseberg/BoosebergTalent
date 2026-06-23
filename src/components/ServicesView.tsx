import { CheckCircle, Sliders, Target, HeartHandshake, Eye, Sparkles, ExternalLink } from 'lucide-react';

interface ServicesViewProps {
  lang: 'TR' | 'EN';
  onOpenContactModal: () => void;
}

export default function ServicesView({ lang, onOpenContactModal }: ServicesViewProps) {
  const processSteps = [
    {
      num: '01',
      title: lang === 'TR' ? 'Keşif' : 'Discovery',
      desc: lang === 'TR'
        ? 'Doğru yetenekleri ve potansiyeli analiz ediyor, pazar araştırmalarımızla en organik eşleşmeleri tespit ediyoruz.'
        : 'Analyzing top talents and potential reach, identifying authentic partnerships through strict market research.'
    },
    {
      num: '02',
      title: lang === 'TR' ? 'Strateji' : 'Strategy',
      desc: lang === 'TR'
        ? 'Yaratıcı hikaye anlatımını hedef kitle ile birleştiriyor, kampanya hedeflerine özel 360° yol haritaları çıkarıyoruz.'
        : 'Stitching creative narratives to the target demographic, mapping actionable 360° roadmaps.'
    },
    {
      num: '03',
      title: lang === 'TR' ? 'Uygulama' : 'Execution',
      desc: lang === 'TR'
        ? 'Tüm çekim, tanıtım ve paylaşım süreçlerinin prodüksiyon ve operasyonunu kusursuz yönetiyoruz.'
        : 'Flawlessly managing production, styling, schedule, and assets distribution during campaigns.'
    },
    {
      num: '04',
      title: lang === 'TR' ? 'Analiz' : 'Analytics',
      desc: lang === 'TR'
        ? 'Erişim ve dönüşüm verilerini şeffaf şekilde raporluyor, yatırım getirisini (ROI) optimize ediyoruz.'
        : 'Providing transparent performance logs and reports, steering maximum return on brand investment.'
    }
  ];

  return (
    <div className="w-full space-y-24 animate-in fade-in duration-500">
      
      {/* Services Hero Segment */}
      <section className="relative h-[380px] rounded-2xl overflow-hidden bg-zinc-900 border border-rose-100/10 shadow-xl flex items-center">
        <img 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.5]" 
          src="https://lh3.googleusercontent.com/aida/AP1WRLugjY7XZDqW4r8u8E9rfIpczwYdehBKAAJFf75cMHJThuaOrYXnyA6ix2VVH1xzd-ARfCy9R9ceIiVZuTYfqNxX_Fy7Qec9E1bHUibR0yUxXqI1WCOUGPXQvDKNJx3KkOCdq1NavdP4s0hwJ1Yl1w-m0NstZnKccl30zMFUXo1dOAYC_5h4zdG_f6HgSj-4TLvlui4-gsmKbUil3UvA6Fi2thHv8ydPtlrEcSq5a3ZV8jDj-_sc-WD-nA" 
          alt="Behind the scenes high resolution cameras"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="relative z-10 p-8 md:p-16 max-w-2xl space-y-4">
          <span className="text-rose-500 text-xs font-bold tracking-[0.2em] uppercase bg-rose-500/10 px-3.5 py-1 px-4 py-1.5 rounded-full border border-rose-500/20">
            {lang === 'TR' ? 'YENİ NESİL ÇÖZÜMLER' : 'NEXT-GEN SOLUTIONS'}
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {lang === 'TR' ? 'Medya ve Yetenek Yönetiminde Strateji' : 'Next-Generation Talent Management'}
          </h1>
          <p className="font-sans text-zinc-300 font-light text-sm md:text-base leading-relaxed">
            {lang === 'TR'
              ? 'Yaratıcı yetenekleri modern mecralarla harmanlayarak, markaların doğrudan tüketiciye ulaşacağı özgün kampanyalar üretiyoruz.'
              : 'Synthesizing creative influencer reach with modern layouts to deliver beautiful direct-to-consumer brand campaigns.'}
          </p>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-primary font-sans text-xs font-bold tracking-widest uppercase">{lang === 'TR' ? 'HİZMETLERİMİZ' : 'WHAT WE DO'}</span>
          <h2 className="font-display text-2xl md:text-4xl font-extrabold text-on-surface">{lang === 'TR' ? 'Sunduğumuz Çözümler' : 'Custom Corporate Solutions'}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Yetenek Yönetimi */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-rose-100/30 p-8 hover:shadow-lg transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-primary flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                {lang === 'TR' ? 'Yetenek Yönetimi' : 'Talent Temsilciliği'}
              </h3>
              <p className="font-sans text-on-surface-variant font-light text-sm leading-relaxed">
                {lang === 'TR'
                  ? 'Profesyonel oyuncular, yayıncılar ve etki gücü yüksek influencerlar için özel kariyer planlama, hukuki danışmanlık, marka ortaklıkları ve PR desteği sağlıyoruz.'
                  : 'Delivering full-scale career counseling, legal structuring, PR outreach, and brand sponsorship for professional actors and digital streamers.'}
              </p>
            </div>
          </div>

          {/* Card 2: Dijital Strateji & Prodüksiyon */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-rose-100/30 p-8 hover:shadow-lg transition-all flex flex-col justify-between group h-[320px] relative overflow-hidden">
            <img 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.25]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH7mNx6RC-WZICGQtBXYEsF4UhKDOqWfPYuHwAIs2emBDSziLV_i8neGDuv3oZ_jY-NGN_Nv8fy8wzE8FkaZYiNTuJ4MgPF-2z7GrQdmqHaZnNyj4KCo2gFOjiiviDqcB-LD2ul7AAzdZbvxFZjthnZeqB-DU7T4sSnXa2WJmbhNvxuBsYWbHakjSEyj_a3a923z8mPMq16sgRGT0I9N6DwCjgYLEok5MeQwMHUcnRW8PAkMJSMrqEkvBU60ohEkz-GU6Kh7XqXz0" 
              alt="Live Production Set"
            />
            <div className="relative z-10 space-y-4 text-white">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold">
                {lang === 'TR' ? 'Kreatif & Prodüksiyon' : 'Creative & Production'}
              </h3>
              <p className="font-sans text-zinc-300 font-light text-sm leading-relaxed">
                {lang === 'TR'
                  ? 'Sosyal medya trendlerine uygun, göz alıcı video reklamlar, konsept fotoğraf çekimleri ve özgün içerik kurguları üretiyoruz.'
                  : 'Fostering stunning video commercials, fashion photography layouts, and highly-crafted campaign screenplays.'}
              </p>
            </div>
          </div>

          {/* Card 3: Kampanya Yönetimi */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-rose-100/30 p-8 hover:shadow-lg transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                {lang === 'TR' ? 'Kampanya Yönetimi' : 'Campaign Management'}
              </h3>
              <p className="font-sans text-on-surface-variant font-light text-sm leading-relaxed">
                {lang === 'TR'
                  ? 'Bütçelendirmeden KPI takibine, influencer eşleşmelerinden yayın takvimine kadar 360 derece kampanya operasyonunu tek elden yönetiyoruz.'
                  : 'Directing full-scale end-to-end media operations including budgeting, metrics/KPI control, custom pairing, and schedule calendars.'}
              </p>
            </div>
          </div>

          {/* Card 4: Kreatif Danışmanlık */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-rose-100/30 p-8 hover:shadow-lg transition-all flex flex-col justify-between group h-[320px] relative overflow-hidden">
            <img 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.25]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4KhpeQ5Ys42awxmU0-OTzMsijoClNY185lY2pncogM23v2WeyZZJFb7rkgQv4KPviTuCGY1eQdIqMVvtZU-zzKEN7e-cZYO97JGd6UrmF-C4IcWH9pXHkJIAvdh-Pzl2dd3fGJwOSyPs56UMUneXAJMclc931ZBqU-gijrzse1SoNQUL0St4ScBPB6gouty3n7X8_Ew5x-Qgy2WxtrcIhB8Mb3rlf0CT7CjMPoKwX_KV31hCUw66Dwriu-x5s_LxI837QlKAva_Y" 
              alt="Tablet designing session"
            />
            <div className="relative z-10 space-y-4 text-white">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold">
                {lang === 'TR' ? 'Kreatif Danışmanlık' : 'Creative Mentorship'}
              </h3>
              <p className="font-sans text-zinc-300 font-light text-sm leading-relaxed">
                {lang === 'TR'
                  ? 'Markanızın pazardaki konumunu güçlendirecek vizyoner fikirler, pazarlama trendleri ve rekabetçi stratejiler sunuyoruz.'
                  : 'Guiding visionary branding directions, competitive strategic analytics, and state-of-the-art marketing solutions.'}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Booseberg Agency Web Frame */}
      <section className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] space-y-6">
        <div className="max-w-7xl mx-auto px-6 md:px-16 text-center space-y-2">
          <span className="text-primary font-sans text-xs font-bold tracking-widest uppercase">
            {lang === 'TR' ? 'BOOSEBERG KREATİF AJANSI' : 'BOOSEBERG CREATIVE AGENCY'}
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-on-surface">
            {lang === 'TR' ? 'Booseberg Kreatif Ajansı size neler sunuyor?' : 'What does Booseberg Creative Agency offer you?'}
          </h2>
        </div>

        {/* Status / Control Bar & Iframe Container */}
        <div className="w-full relative flex flex-col items-stretch">
          
          {/* External Button (Frame Dışı, Sağ Üst Köşeye hizalanmış) */}
          <div className="max-w-7xl mx-auto w-full px-6 md:px-16 flex justify-end mb-3.5">
            <a 
              href="https://booseberg.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold text-white bg-rose-600 hover:bg-zinc-900 border border-rose-500/30 rounded-full transition-all shadow-md active:scale-95 duration-200 cursor-pointer uppercase tracking-wider"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{lang === 'TR' ? 'Yeni Sekmede Aç' : 'Open in New Tab'}</span>
            </a>
          </div>

          {/* Iframe Wrapper (Edge-to-edge / Sağ ve Sola Sıfır Sabit) */}
          <div className="w-[calc(100%+3rem)] sm:w-auto -mx-6 md:-mx-16 h-[1400px] border-y border-rose-500/20 bg-zinc-50 relative">
            
            {/* Canlı Yayın Animasyonu (Framin Sağ Üstünde, absolute overlay) */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2.5 bg-zinc-900/90 text-white backdrop-blur-md border border-red-500/30 px-4 py-2 rounded-full shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </span>
              <span className="text-[10px] md:text-[11px] font-black tracking-widest font-sans uppercase">
                {lang === 'TR' ? 'ŞUAN BOOSEBERG SAYFASINI İNCELİYORSUNUZ' : 'YOU ARE CURRENTLY VIEWING THE BOOSEBERG PAGE'}
              </span>
            </div>

            <iframe 
              src="https://booseberg.com" 
              className="w-full h-full border-0"
              title="Booseberg Creative Agency"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* How We Work Process Flow */}
      <section className="bg-rose-50/20 py-16 -mx-6 md:-mx-16 px-6 md:px-16 border-y border-rose-100/35 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-primary font-sans text-xs font-bold tracking-[0.2em] uppercase">{lang === 'TR' ? 'METODOLOJİ' : 'METHODOLOGY'}</span>
            <h2 className="font-display text-2xl md:text-4xl font-extrabold text-on-surface">{lang === 'TR' ? 'Nasıl Çalışıyoruz?' : 'Our Strategic Process'}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative bg-white/90 backdrop-blur-md border border-rose-100/20 p-6 rounded-2xl shadow-sm space-y-4">
                <span className="font-display text-5xl font-extrabold text-primary/10 absolute -top-4 right-4">{step.num}</span>
                <h3 className="font-display text-lg font-bold text-on-surface">{step.title}</h3>
                <p className="font-sans text-on-surface-variant font-light text-xs md:text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Corporate Service CTA block */}
      <section className="max-w-5xl mx-auto">
        <div className="bg-primary text-on-primary rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden shadow-xl">
          {/* Spotlight aura */}
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
          
          <h2 className="font-display text-2xl md:text-4xl font-extrabold relative z-10">
            {lang === 'TR' ? 'Markanız İçin Doğru Kampanyayı Kurgulayalım' : 'Let’s Construct the Perfect Campaign'}
          </h2>
          <p className="font-sans text-white/80 font-light text-sm md:text-base max-w-2xl mx-auto relative z-10 leading-relaxed">
            {lang === 'TR'
              ? 'Marka hedeflerinize en uygun sanatçı ve etkileyicileri bularak, tüm süreçleri profesyonel ekiplerimizle yönetiyoruz.'
              : 'Pairing elite model talent with your marketing targets, coordinated completely by our team nodes.'}
          </p>
          <div className="pt-2 relative z-10">
            <button 
              onClick={onOpenContactModal}
              className="bg-white text-primary font-display font-semibold text-sm md:text-base py-3 px-8 rounded-full shadow-lg hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer"
            >
              {lang === 'TR' ? 'Geleceği Birlikte İnşa Edelim' : 'Get in Touch'}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
