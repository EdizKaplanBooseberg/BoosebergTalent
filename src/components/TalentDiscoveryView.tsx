import { useState, useEffect } from 'react';
import { Talent } from '../types';
import { TALENTS } from '../data';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface TalentDiscoveryViewProps {
  onSelectTalent: (talent: Talent) => void;
  initialFilter?: string;
  lang: 'TR' | 'EN';
  categories?: any[];
  talents?: any[];
}

export default function TalentDiscoveryView({
  onSelectTalent,
  initialFilter = 'all',
  lang,
  categories = [],
  talents = []
}: TalentDiscoveryViewProps) {
  const [activeFilter, setActiveFilter] = useState<string>(initialFilter);

  useEffect(() => {
    setActiveFilter(initialFilter);
  }, [initialFilter]);

  const activeCategories = [
    { id: 'all', label: lang === 'TR' ? 'Hepsi' : 'All' },
    ...categories.map((c) => ({
      id: c.id,
      label: lang === 'TR' ? c.labelTR : c.labelEN
    }))
  ];

  const activeTalentList = talents && talents.length > 0 ? talents : TALENTS;

  const filteredTalents = activeFilter === 'all'
    ? activeTalentList
    : activeTalentList.filter(talent => talent.category === activeFilter);

  return (
    <div className="w-full space-y-12 animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-100 rounded-full text-xs font-semibold text-primary">
          <Sparkles className="w-4 h-4 animate-spin-slow" />
          <span>{lang === 'TR' ? 'YETENEK KESFİ' : 'TALENT DISCOVERY'}</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight">
          {lang === 'TR' ? 'Yeteneklerimizi Keşfedin' : 'Discover Our Elite Talent'}
        </h1>
        <p className="font-sans text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto font-light">
          {lang === 'TR'
            ? 'Sektörün en parlak yıldızları ve dijital dünyayı şekillendiren yükselen yetenekleri burada buluşuyor. Markanız için en uygun hikaye anlatıcısını bulun.'
            : 'Explore award-winning stars and influential digital creators shaping the future of global media. Discover the perfect storyteller for your brand.'}
        </p>
      </section>

      {/* Filters Section */}
      <section className="flex flex-wrap items-center justify-center gap-2.5">
        {activeCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`px-6 py-2.5 rounded-full font-sans text-sm font-semibold transition-all cursor-pointer hover:scale-105 active:scale-95 ${
              activeFilter === cat.id
                ? 'bg-primary text-on-primary shadow-md shadow-primary/15'
                : 'bg-white/60 text-on-surface-variant border border-rose-100 hover:bg-rose-50/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </section>

      {/* Talent Grid */}
      <section className="max-w-7xl mx-auto">
        {filteredTalents.length === 0 ? (
          <div className="text-center py-20 bg-rose-50/20 rounded-2xl border border-dashed border-rose-100">
            <p className="text-on-surface-variant font-medium">Bu kategoride henüz yetenek bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTalents.map((talent) => (
              <div
                key={talent.id}
                onClick={() => onSelectTalent(talent)}
                className="talent-card group relative aspect-[3/4] rounded-2xl overflow-hidden bg-rose-50 border border-rose-100/30 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Grayscale on default, color on group hover */}
                <img
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] transition-all grayscale contrast-[1.1] brightness-[0.9] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
                  src={talent.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800"}
                  alt={talent.name}
                  referrerPolicy="no-referrer"
                />
                
                {/* Hover overlay indicator */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full p-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                {/* Glassmorphic Badge container overlay at the absolute bottom */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="bg-white/75 backdrop-blur-md border border-white/40 p-3 flex flex-col rounded-xl shadow-md">
                    <span className="text-primary text-[10px] font-bold uppercase tracking-wider mb-0.5 opacity-90">
                      {talent.categoryLabel}
                    </span>
                    <span className="text-zinc-900 font-display font-extrabold text-sm md:text-base">
                      {talent.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
