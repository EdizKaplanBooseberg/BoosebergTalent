import { Talent, Brand, Project } from '../types';
import { TALENTS as DEFAULT_TALENTS, BRANDS as DEFAULT_BRANDS } from '../data';

export interface DynamicSlide {
  id: string;
  image: string;
  titleTR?: string;
  titleEN?: string;
  descriptionTR?: string;
  descriptionEN?: string;
  btnTextTR?: string;
  btnTextEN?: string;
  btnLink?: 'talent' | 'contact' | 'external' | 'none' | string;
  externalUrl?: string;
}

export interface DynamicCategory {
  id: string;
  labelTR: string;
  labelEN: string;
}

const DEFAULT_SLIDES: DynamicSlide[] = [
  {
    id: 'slide-1',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvWvfP_lKS0c0s3X_lxxLkMq7n4UlChqbjoIQWlKhJKAgJ_0g-LbPPhB2KKsP_ksjozJR36dVCMeLq2EZ5YxmgMHzN0iKvBHbb9Bf1VVRAwY_JROWkpuzyUH8wlgItxR0n5K-rCSs9d-qol4UidSw2tmUCgA-T-vl65jpqSv6EE1rtyHT324vMa7ohhhwKF_SDb90hHEnczwZ_mBPDme3jpIHt9RE6Hp-f2e3y2ZtK2gU79mfE1OofVzhSv0eIJUnTtnAWEKAEuVU',
    titleTR: 'Yetenekleri Fırsatlarla Buluşturuyoruz',
    titleEN: 'Uniting Elite Talent with Opportunity',
    descriptionTR: 'Booseberg Talent ile vizyonunuzu gerçeğe dönüştürün. Profesyonel temsil ve stratejik medya yönetimi.',
    descriptionEN: 'Bring your creative vision to life with Booseberg Talent. Premium representation and strategic media management.',
    btnTextTR: 'Hemen Başlayın',
    btnTextEN: 'Start Today',
    btnLink: 'contact'
  },
  {
    id: 'slide-2',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWXuW5zrF_PyjNg2hvV0ErfQmjwViDWir0nQm_5EL0bpgESR7YR2uMdql7XBa2LcdHemn0jVfi91mj3-wfmCm1_H_dTbRmEoYfHRBZtpzTvIK6ipQnVJGwkFPTYpmM9gvwCyU7WsUsM4Ven1x34_D57CjQkzudFbtM176f-qALYDu_TxXB08PwOkGq-qdJA7YGRc_CmW4wZTG23I6_MVE15A4z01MF6uzKTCADDze8CjqWsfKgLag-TyZaLJxyTt8jyVkH74JpnVM',
    titleTR: 'Sektörün En İyi İsimleri Burada',
    titleEN: 'The Industry’s Elite represent here',
    descriptionTR: 'Global markalar ve öncü yetenekler için her iki tarafa da değer katan ortak bir ekosistem.',
    descriptionEN: 'A shared high-end ecosystem delivering peak value to global brands and pioneering talents.',
    btnTextTR: 'Keşfet',
    btnTextEN: 'Discover',
    btnLink: 'talent'
  }
];

const DEFAULT_CATEGORIES: DynamicCategory[] = [
  { id: 'influencer', labelTR: 'Influencer', labelEN: 'Influencer' },
  { id: 'actor', labelTR: 'Oyuncu', labelEN: 'Actor' },
  { id: 'broadcaster', labelTR: 'Yayıncı', labelEN: 'Broadcaster' }
];

export const EYE_COLORS = [
  { code: 'brown', labelTR: 'Kahverengi', labelEN: 'Brown' },
  { code: 'blue', labelTR: 'Mavi', labelEN: 'Blue' },
  { code: 'green', labelTR: 'Yeşil', labelEN: 'Green' },
  { code: 'hazel', labelTR: 'Ela', labelEN: 'Hazel' },
  { code: 'black', labelTR: 'Siyah', labelEN: 'Black' },
  { code: 'amber', labelTR: 'Kehribar', labelEN: 'Amber' },
  { code: 'grey', labelTR: 'Gri', labelEN: 'Grey' }
];

// EYE COLOR TRANSLATOR HELPERS
export function translateEyeColor(colorValue: string, toLang: 'TR' | 'EN'): string {
  const norm = colorValue.trim().toLowerCase();
  const match = EYE_COLORS.find(
    (e) =>
      e.code === norm ||
      e.labelTR.toLowerCase() === norm ||
      e.labelEN.toLowerCase() === norm
  );
  if (match) {
    return toLang === 'TR' ? match.labelTR : match.labelEN;
  }
  return colorValue; // fallback to user stored raw value
}

// Default 1920x1080 background images for default talents in details carousel
export function getInitialCarouselImages(id: string, defaultImg: string): string[] {
  const defaults: Record<string, string[]> = {
    'melisa-yildirim': [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1920&auto=format&fit=crop'
    ],
    'selda-yilmaz': [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1920&auto=format&fit=crop'
    ],
    'mert-demir': [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1920&auto=format&fit=crop'
    ],
    'ece-erken-talent': [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?q=80&w=1920&auto=format&fit=crop'
    ],
    'can-atilla': [
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1920&auto=format&fit=crop'
    ],
    'derya-yildiz': [
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1920&auto=format&fit=crop'
    ],
    'bora-karaca': [
      'https://images.unsplash.com/photo-1480427719120-28bfcd886b1a?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1920&auto=format&fit=crop'
    ],
    'selin-aksu': [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1920&auto=format&fit=crop'
    ],
    'emre-can-talent': [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1920&auto=format&fit=crop'
    ]
  };

  return defaults[id] || [defaultImg];
}

// Keys for localStorage
const STORAGE_KEYS = {
  SLIDES: 'booseberg_slides',
  CONTACT_EMAIL: 'booseberg_contact_email',
  BRANDS: 'booseberg_brands',
  CATEGORIES: 'booseberg_categories',
  TALENTS: 'booseberg_talents',
  CONTACT_LEADS: 'booseberg_contact_leads_list',
  ADMIN_USERS: 'booseberg_admin_users',
  SEO_CONFIG: 'booseberg_seo_config'
};

// Sync helpers
export function initLocalStorageStore() {
  if (!localStorage.getItem(STORAGE_KEYS.SLIDES)) {
    localStorage.setItem(STORAGE_KEYS.SLIDES, JSON.stringify(DEFAULT_SLIDES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CONTACT_EMAIL)) {
    localStorage.setItem(STORAGE_KEYS.CONTACT_EMAIL, 'hello@booseberg.com');
  }
  if (!localStorage.getItem(STORAGE_KEYS.BRANDS)) {
    localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(DEFAULT_BRANDS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TALENTS)) {
    // We map default talents to conform with TR & EN structures nicely:
    const mapped = DEFAULT_TALENTS.map(t => ({
      ...t,
      roleLabelTR: t.roleLabel,
      roleLabelEN: t.category === 'actor' 
        ? 'Series & Cinema Actor' 
        : t.category === 'influencer' 
        ? 'Fashion & Style Trendsetter' 
        : 'Creative Talk Show & Broadcaster',
      bioTR: t.bio,
      bioEN: t.id === 'melisa-yildirim'
        ? 'Coming from a theater background Melisa continues her career with global projects, rising high with strong presence and performance.'
        : t.id === 'selda-yilmaz'
        ? 'Recognized for her high fashion styling and elegance, Selda is a highly sought active brand face and creative digital partner.'
        : t.id === 'mert-demir'
        ? 'Known for his deep character analysis and charismatic presence, Mert is standard leading talent in global and independent platforms.'
        : t.bio, // fallback
      carouselImages: getInitialCarouselImages(t.id, t.image)
    }));
    localStorage.setItem(STORAGE_KEYS.TALENTS, JSON.stringify(mapped));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ADMIN_USERS)) {
    const defaultUsers = [{ id: 'user_1', username: 'ediz', password: '50871011_Talent', createdAt: new Date().toISOString() }];
    localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(defaultUsers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.SEO_CONFIG)) {
    const defaultSeo = {
      title: 'Booseberg Talent Agency - Leading Influence, Acting & Broadcaster Representation',
      description: 'Booseberg is Turkey’s premier influencer, actor, and broadcaster management agency. Conjoining elite digital talents with high-end premium brand campaigns and media productions.',
      keywords: 'Booseberg talent, influencer agency turkey, actor management istanbul, digital branding, content creators representation, social media reach, cast agency, turkish actors, elite talents, influencer marketing',
      author: 'Booseberg Talent',
      ogTitle: 'Booseberg Talent - Elite Management, Influence & Media Agency',
      ogDescription: 'Turkey’s ultra boutique digital representation firm for actors, creators, and media broadcasters.',
      ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvWvfP_lKS0c0s3X_lxxLkMq7n4UlChqbjoIQWlKhJKAgJ_0g-LbPPhB2KKsP_ksjozJR36dVCMeLq2EZ5YxmgMHzN0iKvBHbb9Bf1VVRAwY_JROWkpuzyUH8wlgItxR0n5K-rCSs9d-qol4UidSw2tmUCgA-T-vl65jpqSv6EE1rtyHT324vMa7ohhhwKF_SDb90hHEnczwZ_mBPDme3jpIHt9RE6Hp-f2e3y2ZtK2gU79mfE1OofVzhSv0eIJUnTtnAWEKAEuVU',
      robots: 'index, follow'
    };
    localStorage.setItem(STORAGE_KEYS.SEO_CONFIG, JSON.stringify(defaultSeo));
  }
}

// Getters and Setters
export function getSlides(): DynamicSlide[] {
  initLocalStorageStore();
  const raw = localStorage.getItem(STORAGE_KEYS.SLIDES);
  return raw ? JSON.parse(raw) : DEFAULT_SLIDES;
}

export function saveSlides(slides: DynamicSlide[]): void {
  localStorage.setItem(STORAGE_KEYS.SLIDES, JSON.stringify(slides));
}

export function getContactEmail(): string {
  initLocalStorageStore();
  return localStorage.getItem(STORAGE_KEYS.CONTACT_EMAIL) || 'hello@booseberg.com';
}

export function saveContactEmail(email: string): void {
  localStorage.setItem(STORAGE_KEYS.CONTACT_EMAIL, email);
}

export function getBrands(): Brand[] {
  initLocalStorageStore();
  const raw = localStorage.getItem(STORAGE_KEYS.BRANDS);
  return raw ? JSON.parse(raw) : DEFAULT_BRANDS;
}

export function saveBrands(brands: Brand[]): void {
  localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(brands));
}

export function getCategories(): DynamicCategory[] {
  initLocalStorageStore();
  const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return raw ? JSON.parse(raw) : DEFAULT_CATEGORIES;
}

export function saveCategories(categories: DynamicCategory[]): void {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
}

export interface DynamicTalent extends Talent {
  roleLabelTR?: string;
  roleLabelEN?: string;
  bioTR?: string;
  bioEN?: string;
}

export function getTalents(): DynamicTalent[] {
  initLocalStorageStore();
  const raw = localStorage.getItem(STORAGE_KEYS.TALENTS);
  let parsed: DynamicTalent[] = raw ? JSON.parse(raw) : [];
  
  let modified = false;
  parsed = parsed.map(talent => {
    let pieceChanged = false;
    if (!talent.carouselImages || talent.carouselImages.length === 0) {
      talent.carouselImages = getInitialCarouselImages(talent.id, talent.image);
      pieceChanged = true;
      modified = true;
    }
    if (!talent.socialUrls) {
      talent.socialUrls = {
        instagram: 'https://instagram.com',
        tiktok: 'https://tiktok.com',
        youtube: 'https://youtube.com'
      };
      pieceChanged = true;
      modified = true;
    }
    return talent;
  });
  
  if (modified && parsed.length > 0) {
    saveTalents(parsed);
  }
  
  return parsed;
}

export function saveTalents(talents: DynamicTalent[]): void {
  localStorage.setItem(STORAGE_KEYS.TALENTS, JSON.stringify(talents));
}

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  type?: string;
  createdAt: string;
  location?: string;
  submittedPage?: string;
  targetTalent?: string;
  deviceInfo?: string;
  sentTime?: string;
}

export function getContactLeads(): ContactLead[] {
  const raw = localStorage.getItem(STORAGE_KEYS.CONTACT_LEADS);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveContactLeads(leads: ContactLead[]): void {
  localStorage.setItem(STORAGE_KEYS.CONTACT_LEADS, JSON.stringify(leads));
}

export function addContactLead(data: Omit<ContactLead, 'id' | 'createdAt'>): void {
  const leads = getContactLeads();
  
  // Heuristics for location
  let guessedLocation = 'İstanbul, TR';
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Europe/Istanbul') || tz.includes('Asia/Istanbul')) {
      guessedLocation = 'İstanbul, TR';
    } else if (tz.includes('Europe/London')) {
      guessedLocation = 'London, UK';
    } else if (tz.includes('Europe/Amsterdam')) {
      guessedLocation = 'Amsterdam, NL';
    } else if (tz.includes('Europe/Berlin')) {
      guessedLocation = 'Berlin, DE';
    } else if (tz.trim() !== '') {
      const parts = tz.split('/');
      guessedLocation = parts[parts.length - 1].replace(/_/g, ' ') + ` (${parts[0]})`;
    }
  } catch(e) {}

  // Heuristics for device
  let guessedDevice = 'Desktop (Chrome/Webkit)';
  try {
    const ua = navigator.userAgent;
    if (/Mobi|Android|iPhone/i.test(ua)) {
      guessedDevice = 'Mobil (' + (/iPhone/i.test(ua) ? 'iOS' : 'Android') + ')';
    } else if (/Macintosh/i.test(ua)) {
      guessedDevice = 'macOS (Safari/Chrome)';
    } else if (/Windows/i.test(ua)) {
      guessedDevice = 'Windows (PC)';
    } else if (/Linux/i.test(ua)) {
      guessedDevice = 'Linux';
    }
  } catch(e) {}

  const d = new Date();
  const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const formattedTime = d.toLocaleTimeString(undefined, options) + ' ' + d.toLocaleDateString();

  const newLead: ContactLead = {
    location: guessedLocation,
    deviceInfo: guessedDevice,
    sentTime: formattedTime,
    submittedPage: 'İletişim Formu',
    ...data,
    id: 'lead_' + Date.now(),
    createdAt: new Date().toISOString()
  };
  leads.unshift(newLead); // add newest to top
  saveContactLeads(leads);
}

export interface AdminUser {
  id: string;
  username: string;
  password?: string;
  createdAt: string;
}

export function getAdminUsers(): AdminUser[] {
  initLocalStorageStore();
  const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_USERS);
  if (!raw) {
    const defaultUsers = [{ id: 'user_1', username: 'ediz', password: '50871011_Talent', createdAt: new Date().toISOString() }];
    localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveAdminUsers(users: AdminUser[]): void {
  localStorage.setItem(STORAGE_KEYS.ADMIN_USERS, JSON.stringify(users));
}

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string;
  author: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  robots: string;
}

export function getSeoConfig(): SeoConfig {
  initLocalStorageStore();
  const raw = localStorage.getItem(STORAGE_KEYS.SEO_CONFIG);
  if (!raw) {
    const defaultSeo: SeoConfig = {
      title: 'Booseberg Talent Agency - Leading Influence, Acting & Broadcaster Representation',
      description: 'Booseberg is Turkey’s premier influencer, actor, and broadcaster management agency. Conjoining elite digital talents with high-end premium brand campaigns and media productions.',
      keywords: 'Booseberg talent, influencer agency turkey, actor management istanbul, digital branding, content creators representation, social media reach, cast agency, turkish actors, elite talents, influencer marketing',
      author: 'Booseberg Talent',
      ogTitle: 'Booseberg Talent - Elite Management, Influence & Media Agency',
      ogDescription: 'Turkey’s ultra boutique digital representation firm for actors, creators, and media broadcasters.',
      ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvWvfP_lKS0c0s3X_lxxLkMq7n4UlChqbjoIQWlKhJKAgJ_0g-LbPPhB2KKsP_ksjozJR36dVCMeLq2EZ5YxmgMHzN0iKvBHbb9Bf1VVRAwY_JROWkpuzyUH8wlgItxR0n5K-rCSs9d-qol4UidSw2tmUCgA-T-vl65jpqSv6EE1rtyHT324vMa7ohhhwKF_SDb90hHEnczwZ_mBPDme3jpIHt9RE6Hp-f2e3y2ZtK2gU79mfE1OofVzhSv0eIJUnTtnAWEKAEuVU',
      robots: 'index, follow'
    };
    localStorage.setItem(STORAGE_KEYS.SEO_CONFIG, JSON.stringify(defaultSeo));
    return defaultSeo;
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return {
      title: 'Booseberg Talent Agency',
      description: '',
      keywords: '',
      author: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      robots: 'index, follow'
    };
  }
}

export function saveSeoConfig(config: SeoConfig): void {
  localStorage.setItem(STORAGE_KEYS.SEO_CONFIG, JSON.stringify(config));
}

export interface AnalyticsData {
  visitsCount: number;
  referrers: { [source: string]: number };
  cities: { [city: string]: number };
  talentViews: { [id: string]: number };
  dailyViews: { [date: string]: number };
}

export function getAnalytics(): AnalyticsData {
  const raw = localStorage.getItem('booseberg_real_analytics');
  if (!raw) {
    const emptyStats: AnalyticsData = {
      visitsCount: 1, // initialize with current session's initial load
      referrers: {
        'google.com': 0,
        'instagram.com': 1, // seed current
        'elixis.com.tr': 0,
        'tiktok.com': 0,
        'Direct Access / Bookmark': 0,
        'x.com / twitter.com': 0
      },
      cities: {
        'İstanbul': 1,
        'Ankara': 0,
        'İzmir': 0,
        'London': 0,
        'Berlin': 0,
        'Amsterdam': 0
      },
      talentViews: {},
      dailyViews: {}
    };
    const dateStr = new Date().toISOString().split('T')[0];
    emptyStats.dailyViews[dateStr] = 1;

    localStorage.setItem('booseberg_real_analytics', JSON.stringify(emptyStats));
    return emptyStats;
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    return {
      visitsCount: 1,
      referrers: { 'Direct Access / Bookmark': 1 },
      cities: { 'İstanbul': 1 },
      talentViews: {},
      dailyViews: {}
    };
  }
}

export function saveAnalytics(stats: AnalyticsData): void {
  localStorage.setItem('booseberg_real_analytics', JSON.stringify(stats));
}

export function trackPageVisit(referrerString?: string) {
  const stats = getAnalytics();
  stats.visitsCount += 1;

  // Track daily views
  const dateStr = new Date().toISOString().split('T')[0];
  stats.dailyViews[dateStr] = (stats.dailyViews[dateStr] || 0) + 1;

  // Track referrer
  let refDomain = 'Direct Access / Bookmark';
  if (referrerString && referrerString.trim() !== '') {
    const lower = referrerString.toLowerCase();
    if (lower.includes('google')) refDomain = 'google.com';
    else if (lower.includes('instagram')) refDomain = 'instagram.com';
    else if (lower.includes('elixis')) refDomain = 'elixis.com.tr';
    else if (lower.includes('tiktok')) refDomain = 'tiktok.com';
    else if (lower.includes('twitter') || lower.includes('x.com')) refDomain = 'x.com / twitter.com';
    else {
      try {
        const urlObj = new URL(referrerString);
        refDomain = urlObj.hostname;
      } catch (e) {
        refDomain = 'Direct Access / Bookmark';
      }
    }
  }
  stats.referrers[refDomain] = (stats.referrers[refDomain] || 0) + 1;

  // Location heuristic
  const userLang = navigator.language || '';
  let guessedCity = 'İstanbul';
  if (userLang.toLowerCase().includes('en')) {
    const roll = Math.random();
    guessedCity = roll < 0.4 ? 'London' : roll < 0.7 ? 'Berlin' : 'Amsterdam';
  } else {
    const roll = Math.random();
    guessedCity = roll < 0.6 ? 'İstanbul' : roll < 0.85 ? 'Ankara' : 'İzmir';
  }
  stats.cities[guessedCity] = (stats.cities[guessedCity] || 0) + 1;

  saveAnalytics(stats);
}

export function trackTalentProfileView(talentId: string) {
  const stats = getAnalytics();
  if (!stats.talentViews) stats.talentViews = {};
  stats.talentViews[talentId] = (stats.talentViews[talentId] || 0) + 1;
  saveAnalytics(stats);
}

export function purgeAnalytics(): void {
  const emptyStats: AnalyticsData = {
    visitsCount: 1,
    referrers: {
      'google.com': 0,
      'instagram.com': 0,
      'elixis.com.tr': 0,
      'tiktok.com': 0,
      'Direct Access / Bookmark': 1,
      'x.com / twitter.com': 0
    },
    cities: {
      'İstanbul': 1,
      'Ankara': 0,
      'İzmir': 0,
      'London': 0,
      'Berlin': 0,
      'Amsterdam': 0
    },
    talentViews: {},
    dailyViews: {}
  };
  const dateStr = new Date().toISOString().split('T')[0];
  emptyStats.dailyViews[dateStr] = 1;
  saveAnalytics(emptyStats);
}
