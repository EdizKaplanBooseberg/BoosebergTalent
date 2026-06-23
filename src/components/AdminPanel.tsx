import { useState, FormEvent, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Save, X, Eye, EyeOff, LogIn, Lock, 
  User, Image, Link, Type, Mail, Clipboard, Users, FolderCheck, 
  HelpCircle, CheckCircle, Award, Sparkles, LogOut, ChevronRight,
  GraduationCap, BarChart3, UserCheck, Map, Settings, ShieldAlert,
  BadgeInfo, FileJson, MailOpen, Layers, Check, Send, AlertTriangle, FileText
} from 'lucide-react';
import { 
  getSlides, saveSlides, getContactEmail, saveContactEmail, 
  getBrands, saveBrands, getCategories, saveCategories, 
  getTalents, saveTalents, DynamicSlide, DynamicCategory, DynamicTalent, EYE_COLORS,
  getContactLeads, saveContactLeads, ContactLead,
  getAnalytics, purgeAnalytics, AnalyticsData,
  getAdminUsers, saveAdminUsers, getSeoConfig, saveSeoConfig, AdminUser, SeoConfig
} from '../lib/dataStore';
import { Project } from '../types';
import AdminHubAddons from './AdminHubAddons';

interface AdminPanelProps {
  lang: 'TR' | 'EN';
  onClose: () => void;
  onRefreshData?: () => void;
}

export default function AdminPanel({ lang, onClose, onRefreshData }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active admin tab
  const [activeSubTab, setActiveSubTab] = useState<'slides' | 'email_brands' | 'categories' | 'talents' | 'analytics' | 'contact_leads' | 'managers' | 'seo_tools'>('slides');

  // Load Data
  const [slides, setSlidesState] = useState<DynamicSlide[]>([]);
  const [contactEmail, setContactEmailState] = useState('');
  const [brands, setBrandsState] = useState<any[]>([]);
  const [categories, setCategoriesState] = useState<DynamicCategory[]>([]);
  const [talents, setTalentsState] = useState<DynamicTalent[]>([]);
  const [leads, setLeadsState] = useState<ContactLead[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  // Dynamic Current User tracking
  const [currentUser, setCurrentUser] = useState<string>('');

  // Admin users management states
  const [adminUsers, setAdminUsersState] = useState<AdminUser[]>([]);
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [editingAdminId, setEditingAdminId] = useState<string | null>(null);
  const [editingAdminPassword, setEditingAdminPassword] = useState('');

  // SEO Configurations
  const [seoForm, setSeoForm] = useState<SeoConfig>({
    title: '', description: '', keywords: '', author: '', ogTitle: '', ogDescription: '', ogImage: '', robots: 'index, follow'
  });

  // Contact Leads layout tabs
  const [leadsInnerTab, setLeadsInnerTab] = useState<'list' | 'mass_email'>('list');
  const [selectedLeadEmails, setSelectedLeadEmails] = useState<string[]>([]);
  
  // Bulk Email Campaign States
  const [massEmailSubject, setMassEmailSubject] = useState('Booseberg Talent Agency - Elit İş Birlikleri Daveti');
  const [massBodyType, setMassBodyType] = useState<'rich' | 'html'>('rich');
  
  // Custom template strings for visual preview representation
  const [massRichBody, setMassRichBody] = useState('<p>Sayın Yetkilimiz,</p><p>Türkiye\'nin her kitle segmentinde öncü ve seçkin temsilciliği üstlenen <strong>Booseberg Talent Agency</strong> olarak sizlere yeni dönem kreatif planlarımızdan bahsetmek isteriz.</p><p>Sinema ve marka elçisi olarak temsil ettiğimiz prestijli sanatçılarımız ve yüzlerimizle yeni vizyoner kampanyalar tasarlamaktan mutluluk duyarız.</p><p>Kreatif projelerimizi ve portföyümüzü detaylı ele almak üzere en kısa sürede bizimle iletişime geçmenizi öneririz.</p><p>Saygılarımızla Core Ekibi,<br><strong>Booseberg Talent Management</strong></p>');
  
  const [massHtmlBody, setMassHtmlBody] = useState(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1c1917; margin: 0; padding: 20px; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f3f4f6; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .brand-hero { background-color: #ae311e; padding: 30px; text-align: center; }
    .brand-logo { color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: -0.05em; margin: 0; }
    .email-body { padding: 40px 30px; }
    .salutation { font-size: 15px; font-weight: 700; color: #1c1917; margin-bottom: 16px; }
    .message-p { font-size: 14px; text-height: 1.7; color: #44403c; margin-bottom: 20px; }
    .action-btn { display: inline-block; background-color: #ae311e; color: #ffffff !important; font-weight: 700; font-size: 13px; text-decoration: none; padding: 12px 28px; border-radius: 9999px; margin: 15px 0; }
    .email-footer { background-color: #fafaf9; border-top: 1px solid #f5f5f4; padding: 25px 30px; text-align: center; }
    .footer-text { font-size: 11px; color: #78716c; margin: 0; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="brand-hero">
      <h1 class="brand-logo">BOOSEBERG TALENT</h1>
    </div>
    <div class="email-body">
      <h3 class="salutation">Değerli İş Ortağımız,</h3>
      <p class="message-p">Booseberg Talent ekosistemi güvencesiyle temsil edilen seçkin influencer, oyuncu ve dijital yayıncıların güncel kreatif profillerini yeni sekmede incelemek ve kampanya uyumunu test etmek için davetlisiniz.</p>
      <center>
        <a href="https://booseberg.com" target="_blank" class="action-btn">PORTFÖYÜ İNCELE</a>
      </center>
      <p class="message-p" style="margin-top: 20px;">Marka bilinirliği, yüksek etkileşimli reklam projeleri ve güçlü kurgusal entegrasyonlar için uzman ekibimizle her zaman yanınızdayız.</p>
    </div>
    <div class="email-footer">
      <p class="footer-text">© 2026 Booseberg Talent Management Agency.<br>Esentepe, Şişli Istanbul / London, UK</p>
    </div>
  </div>
</body>
</html>`);

  const [manualEmails, setManualEmails] = useState('');
  const [sendToAllLeads, setSendToAllLeads] = useState(true);

  // Simulated Email Campaign Sending Feedbacks
  const [emailSending, setEmailSending] = useState(false);
  const [emailSendProgress, setEmailSendProgress] = useState(0);
  const [emailSendLogs, setEmailSendLogs] = useState<Array<{ email: string; status: 'ok' | 'fail'; code: number; msg: string }>>([]);
  const [showSendLogsModal, setShowSendLogsModal] = useState(false);

  // Feedback notifications
  const [successMsg, setSuccessMsg] = useState('');

  // Security Lockout States
  const [lockoutSecLeft, setLockoutSecLeft] = useState<number>(0);

  // Analytics Switch Panel SubTab
  const [analyticsSubTab, setAnalyticsSubTab] = useState<'home' | 'talents'>('home');

  const refreshLocalState = () => {
    setSlidesState(getSlides());
    setContactEmailState(getContactEmail());
    setBrandsState(getBrands());
    setCategoriesState(getCategories());
    setTalentsState(getTalents());
    setLeadsState(getContactLeads());
    setAnalyticsData(getAnalytics());
    setAdminUsersState(getAdminUsers());
    setSeoForm(getSeoConfig());
  };

  // Check lockout on load
  useEffect(() => {
    const rawUntil = localStorage.getItem('booseberg_lockout_until');
    if (rawUntil) {
      const until = parseInt(rawUntil, 10);
      const now = Date.now();
      if (until > now) {
        setLockoutSecLeft(Math.ceil((until - now) / 1000));
      }
    }
  }, []);

  // Lockdown countdown interval
  useEffect(() => {
    if (lockoutSecLeft <= 0) return;
    const interval = setInterval(() => {
      const rawUntil = localStorage.getItem('booseberg_lockout_until') || '0';
      const until = parseInt(rawUntil, 10);
      const now = Date.now();
      if (until > now) {
        setLockoutSecLeft(Math.ceil((until - now) / 1000));
      } else {
        setLockoutSecLeft(0);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutSecLeft]);

  useEffect(() => {
    refreshLocalState();
    // Check if session persists
    if (sessionStorage.getItem('booseberg_admin_logged') === 'true') {
      setIsAuthenticated(true);
      setCurrentUser(sessionStorage.getItem('booseberg_admin_current_user') || 'ediz');
    }
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    const rawUntil = localStorage.getItem('booseberg_lockout_until') || '0';
    const until = parseInt(rawUntil, 10);
    if (until > Date.now()) {
      const leftSec = Math.ceil((until - Date.now()) / 1000);
      setLockoutSecLeft(leftSec);
      const m = Math.floor(leftSec / 60);
      const s = leftSec % 60;
      setLoginError(lang === 'TR' 
        ? `Çok fazla hatalı giriş denemesi! Lütfen ${m > 0 ? `${m} dk ` : ''}${s} sn bekleyin.` 
        : `Too many failed login attempts! Please wait ${m > 0 ? `${m}m ` : ''}${s}s.`);
      return;
    }

    const users = getAdminUsers();
    const matchedUser = users.find(u => u.username.toLowerCase().trim() === username.toLowerCase().trim() && u.password === password);

    if (matchedUser) {
      setIsAuthenticated(true);
      setCurrentUser(matchedUser.username);
      sessionStorage.setItem('booseberg_admin_logged', 'true');
      sessionStorage.setItem('booseberg_admin_current_user', matchedUser.username);
      setLoginError('');
      // Reset fail states
      localStorage.removeItem('booseberg_failed_attempts');
      localStorage.removeItem('booseberg_lockout_until');
      localStorage.removeItem('booseberg_lockout_stage');
      setSuccessMsg(lang === 'TR' ? `Yönetici Girişi Başarılı! Hoş geldiniz, ${matchedUser.username}` : `Admin Session Authenticated! Welcome, ${matchedUser.username}`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } else {
      const rawFailures = localStorage.getItem('booseberg_failed_attempts') || '0';
      const failures = parseInt(rawFailures, 10) + 1;
      localStorage.setItem('booseberg_failed_attempts', failures.toString());

      if (failures >= 5) {
        const rawStage = localStorage.getItem('booseberg_lockout_stage') || '0';
        const nextStage = parseInt(rawStage, 10) + 1;
        localStorage.setItem('booseberg_lockout_stage', nextStage.toString());
        
        // exponential multiplication based on failed periods: stage 1 = 30m, stage 2 = 60m, stage 3 = 120m...
        const minutes = 30 * Math.pow(2, nextStage - 1);
        const lockoutTimeMs = minutes * 60 * 1000;
        const lockoutUntilTime = Date.now() + lockoutTimeMs;
        
        localStorage.setItem('booseberg_lockout_until', lockoutUntilTime.toString());
        localStorage.setItem('booseberg_failed_attempts', '0'); // reset tries for after countdown finishes
        
        setLockoutSecLeft(minutes * 60);
        setLoginError(lang === 'TR' 
          ? `Giriş engellendi! Art arda 5 başarısız deneme nedeniyle ${minutes} dakika kilitlendiniz.` 
          : `Login blocked! Locked out for ${minutes} minutes due to 5 consecutive failed attempts.`);
      } else {
        const leftAttempts = 5 - failures;
        setLoginError(lang === 'TR' 
          ? `Hatalı kullanıcı adı veya şifre! ${leftAttempts} hakkınız kaldı.` 
          : `Invalid credentials! ${leftAttempts} attempts remaining.`);
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser('');
    sessionStorage.removeItem('booseberg_admin_logged');
    sessionStorage.removeItem('booseberg_admin_current_user');
  };

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
    if (onRefreshData) onRefreshData();
  };

  // -----------------------------------------------------------------
  // 1. CAROUSEL SLIDES OPERATIONS
  // -----------------------------------------------------------------
  const [slideForm, setSlideForm] = useState<Partial<DynamicSlide>>({
    id: '', image: '', titleTR: '', titleEN: '', descriptionTR: '', descriptionEN: '', btnTextTR: '', btnTextEN: '', btnLink: 'contact', externalUrl: ''
  });
  const [isSlideEdit, setIsSlideEdit] = useState(false);

  const handleSaveSlide = (e: FormEvent) => {
    e.preventDefault();
    if (!slideForm.image) {
      alert(lang === 'TR' ? 'Lütfen Slayt Görsel Linkini girin!' : 'Please enter Slide Image URL!');
      return;
    }

    let updatedSlides = [...slides];
    if (isSlideEdit && slideForm.id) {
      const updatedS = {
        ...slideForm,
        titleTR: slideForm.titleTR || '',
        titleEN: slideForm.titleEN || '',
        descriptionTR: slideForm.descriptionTR || '',
        descriptionEN: slideForm.descriptionEN || '',
        btnTextTR: slideForm.btnTextTR || '',
        btnTextEN: slideForm.btnTextEN || '',
        btnLink: slideForm.btnLink || 'none',
        externalUrl: slideForm.btnLink === 'external' ? (slideForm.externalUrl || '') : ''
      } as DynamicSlide;
      updatedSlides = updatedSlides.map(s => s.id === slideForm.id ? updatedS : s);
    } else {
      const newSlide: DynamicSlide = {
        id: 'slide_' + Date.now(),
        image: slideForm.image || '',
        titleTR: slideForm.titleTR || '',
        titleEN: slideForm.titleEN || '',
        descriptionTR: slideForm.descriptionTR || '',
        descriptionEN: slideForm.descriptionEN || '',
        btnTextTR: slideForm.btnTextTR || '',
        btnTextEN: slideForm.btnTextEN || '',
        btnLink: slideForm.btnLink || 'none',
        externalUrl: slideForm.btnLink === 'external' ? (slideForm.externalUrl || '') : ''
      };
      updatedSlides.push(newSlide);
    }

    saveSlides(updatedSlides);
    setSlidesState(updatedSlides);
    setSlideForm({ id: '', image: '', titleTR: '', titleEN: '', descriptionTR: '', descriptionEN: '', btnTextTR: '', btnTextEN: '', btnLink: 'contact', externalUrl: '' });
    setIsSlideEdit(false);
    showNotification(lang === 'TR' ? 'Slayt başarıyla kaydedildi!' : 'Slide successfully saved!');
  };

  const handleEditSlide = (slide: DynamicSlide) => {
    setSlideForm(slide);
    setIsSlideEdit(true);
  };

  const handleDeleteSlide = (id: string) => {
    const updated = slides.filter(s => s.id !== id);
    saveSlides(updated);
    setSlidesState(updated);
    showNotification(lang === 'TR' ? 'Slayt silindi.' : 'Slide deleted.');
  };

  // -----------------------------------------------------------------
  // 2. EMAIL & BRANDS OPERATIONS
  // -----------------------------------------------------------------
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandImage, setNewBrandImage] = useState('');

  const handleSaveEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!contactEmail) return;
    saveContactEmail(contactEmail);
    showNotification(lang === 'TR' ? 'İletişim e-postası güncellendi!' : 'Contact email address updated!');
  };

  const handleAddBrand = (e: FormEvent) => {
    e.preventDefault();
    if (!newBrandName || !newBrandImage) return;

    const newBrand = {
      id: 'brand_' + Date.now(),
      name: newBrandName,
      image: newBrandImage,
      height: 'h-12'
    };

    const updated = [...brands, newBrand];
    saveBrands(updated);
    setBrandsState(updated);
    setNewBrandName('');
    setNewBrandImage('');
    showNotification(lang === 'TR' ? 'Referans marka başarıyla eklendi!' : 'Reference logo added!');
  };

  const handleDeleteBrand = (id: string) => {
    const updated = brands.filter(b => b.id !== id);
    saveBrands(updated);
    setBrandsState(updated);
    showNotification(lang === 'TR' ? 'Referans logo kaldırıldı.' : 'Reference brand removed.');
  };


  // -----------------------------------------------------------------
  // 3. CATEGORIES OPERATIONS
  // -----------------------------------------------------------------
  const [catForm, setCatForm] = useState<Partial<DynamicCategory>>({ id: '', labelTR: '', labelEN: '' });
  const [isCatEdit, setIsCatEdit] = useState(false);

  const handleSaveCategory = (e: FormEvent) => {
    e.preventDefault();
    if (!catForm.id || !catForm.labelTR || !catForm.labelEN) return;

    // sanitize ID
    const sanitizedId = catForm.id.trim().toLowerCase().replace(/[^a-z0-9-_]/g, '');

    let updated = [...categories];
    if (isCatEdit) {
      updated = updated.map(c => c.id === catForm.id ? { id: sanitizedId, labelTR: catForm.labelTR!, labelEN: catForm.labelEN! } : c);
    } else {
      if (updated.some(c => c.id === sanitizedId)) {
        alert(lang === 'TR' ? 'Bu kategori kimliği zaten mevcut!' : 'Category code already exists!');
        return;
      }
      updated.push({ id: sanitizedId, labelTR: catForm.labelTR!, labelEN: catForm.labelEN! });
    }

    saveCategories(updated);
    setCategoriesState(updated);
    setCatForm({ id: '', labelTR: '', labelEN: '' });
    setIsCatEdit(false);
    showNotification(lang === 'TR' ? 'Kategori kaydedildi!' : 'Category taxonomy saved!');
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm(lang === 'TR' ? 'Bu kategoriyi silmek istediğinizden emin misiniz?' : 'Are you sure you want to delete this category?')) {
      const updated = categories.filter(c => c.id !== id);
      saveCategories(updated);
      setCategoriesState(updated);
      showNotification(lang === 'TR' ? 'Kategori silindi.' : 'Category deleted.');
    }
  };


  // -----------------------------------------------------------------
  // 4. TALENTS OPERATIONS
  // -----------------------------------------------------------------
  const [talentForm, setTalentForm] = useState<Partial<DynamicTalent>>({
    id: '', name: '', category: '', categoryLabel: '', roleLabel: '', roleLabelTR: '', roleLabelEN: '',
    image: '', carouselImages: [], bio: '', bioTR: '', bioEN: '', age: 24, height: '172 cm', eyeColor: 'Ela', education: '',
    socials: { instagram: '1.2M', tiktok: '850K', youtube: '320K', kick: '', twitch: '', twitter: '' },
    socialUrls: { instagram: 'https://instagram.com', tiktok: 'https://tiktok.com', youtube: 'https://youtube.com', kick: '', twitch: '', twitter: '' },
    projects: [],
    educations: []
  });
  const [isTalentEdit, setIsTalentEdit] = useState(false);

  // New project sub-fields (Bilingual & translations)
  const [newProjTitleTR, setNewProjTitleTR] = useState('');
  const [newProjTitleEN, setNewProjTitleEN] = useState('');
  const [newProjRoleTR, setNewProjRoleTR] = useState('');
  const [newProjRoleEN, setNewProjRoleEN] = useState('');
  const [newProjTypeTR, setNewProjTypeTR] = useState('');
  const [newProjTypeEN, setNewProjTypeEN] = useState('');
  const [newProjImage, setNewProjImage] = useState('');

  // New education list fields
  const [newEduSchoolTR, setNewEduSchoolTR] = useState('');
  const [newEduSchoolEN, setNewEduSchoolEN] = useState('');
  const [newEduDegreeTR, setNewEduDegreeTR] = useState('');
  const [newEduDegreeEN, setNewEduDegreeEN] = useState('');
  const [newEduYear, setNewEduYear] = useState('');

  const handleAddEducationToTalent = () => {
    if (!newEduSchoolTR) {
      alert(lang === 'TR' ? 'Lütfen en azından Okul (TR) adını girin!' : 'Please enter at least School (TR) name!');
      return;
    }
    const newEdu = {
      school: newEduSchoolTR,
      schoolTR: newEduSchoolTR,
      schoolEN: newEduSchoolEN || newEduSchoolTR,
      degree: newEduDegreeTR || 'Eğitim',
      degreeTR: newEduDegreeTR,
      degreeEN: newEduDegreeEN || newEduDegreeTR,
      year: newEduYear
    };
    const currentEdus = talentForm.educations || [];
    setTalentForm({ ...talentForm, educations: [...currentEdus, newEdu] });
    setNewEduSchoolTR('');
    setNewEduSchoolEN('');
    setNewEduDegreeTR('');
    setNewEduDegreeEN('');
    setNewEduYear('');
  };

  const handleRemoveEducationFromTalent = (index: number) => {
    const list = [...(talentForm.educations || [])];
    list.splice(index, 1);
    setTalentForm({ ...talentForm, educations: list });
  };

  const handleAddProjectToTalent = () => {
    if (!newProjTitleTR && !newProjTitleEN) {
      alert(lang === 'TR' ? 'Lütfen en az bir dilde proje başlığı girin!' : 'Please insert project title in at least one language!');
      return;
    }
    const newProj: Project = {
      id: 'proj_' + Date.now(),
      title: newProjTitleTR || newProjTitleEN,
      titleTR: newProjTitleTR,
      titleEN: newProjTitleEN,
      role: newProjRoleTR || newProjRoleEN || '',
      roleTR: newProjRoleTR,
      roleEN: newProjRoleEN,
      type: newProjTypeTR || newProjTypeEN || 'Kampanya',
      typeTR: newProjTypeTR,
      typeEN: newProjTypeEN,
      image: newProjImage || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800'
    };
    const currentProjs = talentForm.projects || [];
    setTalentForm({ ...talentForm, projects: [...currentProjs, newProj] });
    setNewProjTitleTR('');
    setNewProjTitleEN('');
    setNewProjRoleTR('');
    setNewProjRoleEN('');
    setNewProjTypeTR('');
    setNewProjTypeEN('');
    setNewProjImage('');
  };

  const handleRemoveProjectFromTalent = (pId: string) => {
    const filtered = (talentForm.projects || []).filter(p => p.id !== pId);
    setTalentForm({ ...talentForm, projects: filtered });
  };

  const handleSaveTalent = (e: FormEvent) => {
    e.preventDefault();
    if (!talentForm.name || !talentForm.category || !talentForm.image) {
      alert(lang === 'TR' ? 'Lütfen Ad, Kategori ve Görsel alanlarını doldurun!' : 'Please complete Name, Category & Image!');
      return;
    }

    // Resolve categoryLabel dynamically from selected category
    const selectedCatObj = categories.find(c => c.id === talentForm.category);
    const resolvedLabel = selectedCatObj ? selectedCatObj.labelTR.toUpperCase() : talentForm.category.toUpperCase();

    // Generate readable id if not provided
    const talentId = talentForm.id || talentForm.name.toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-');

    const cleanedCarouselImages = (talentForm.carouselImages || [])
      .map(url => url.trim())
      .filter(url => url !== '');

    const updatedTalent: DynamicTalent = {
      id: talentId,
      name: talentForm.name,
      category: talentForm.category,
      categoryLabel: resolvedLabel,
      roleLabel: talentForm.roleLabelTR || talentForm.roleLabel || '',
      roleLabelTR: talentForm.roleLabelTR || talentForm.roleLabel || '',
      roleLabelEN: talentForm.roleLabelEN || talentForm.roleLabel || '',
      image: talentForm.image,
      carouselImages: cleanedCarouselImages,
      bio: talentForm.bioTR || talentForm.bio || '',
      bioTR: talentForm.bioTR || talentForm.bio || '',
      bioEN: talentForm.bioEN || talentForm.bio || '',
      age: Number(talentForm.age) || 25,
      height: talentForm.height || '175 cm',
      eyeColor: talentForm.eyeColor || 'Ela',
      education: talentForm.education || '',
      educations: talentForm.educations || [],
      socials: {
        instagram: talentForm.socials?.instagram || '',
        tiktok: talentForm.socials?.tiktok || '',
        youtube: talentForm.socials?.youtube || '',
        kick: talentForm.socials?.kick || '',
        twitch: talentForm.socials?.twitch || '',
        twitter: talentForm.socials?.twitter || '',
      },
      socialUrls: {
        instagram: talentForm.socialUrls?.instagram || '',
        tiktok: talentForm.socialUrls?.tiktok || '',
        youtube: talentForm.socialUrls?.youtube || '',
        kick: talentForm.socialUrls?.kick || '',
        twitch: talentForm.socialUrls?.twitch || '',
        twitter: talentForm.socialUrls?.twitter || '',
      },
      projects: talentForm.projects || []
    };

    let updatedList = [...talents];
    if (isTalentEdit) {
      updatedList = updatedList.map(t => t.id === talentForm.id ? updatedTalent : t);
    } else {
      if (updatedList.some(t => t.id === talentId)) {
        alert(lang === 'TR' ? 'Bu ID ile başka bir yetenek zaten kayıtlı!' : 'A talent with this ID is already stored!');
        return;
      }
      updatedList.push(updatedTalent);
    }

    saveTalents(updatedList);
    setTalentsState(updatedList);
    setTalentForm({
      id: '', name: '', category: '', categoryLabel: '', roleLabel: '', roleLabelTR: '', roleLabelEN: '',
      image: '', carouselImages: [], bio: '', bioTR: '', bioEN: '', age: 24, height: '172 cm', eyeColor: 'Ela', education: '',
      socials: { instagram: '1.2M', tiktok: '850K', youtube: '320K', kick: '', twitch: '', twitter: '' },
      socialUrls: { instagram: 'https://instagram.com', tiktok: 'https://tiktok.com', youtube: 'https://youtube.com', kick: '', twitch: '', twitter: '' },
      projects: [],
      educations: []
    });
    setIsTalentEdit(false);
    showNotification(lang === 'TR' ? 'Yetenek profili başarıyla güncellendi!' : 'Talent profile saved successfully!');
  };

  const handleEditTalent = (talent: DynamicTalent) => {
    setTalentForm({
      ...talent,
      roleLabelTR: talent.roleLabelTR || talent.roleLabel,
      roleLabelEN: talent.roleLabelEN || talent.roleLabel,
      bioTR: talent.bioTR || talent.bio,
      bioEN: talent.bioEN || talent.bio,
      socials: {
        instagram: talent.socials?.instagram || '',
        tiktok: talent.socials?.tiktok || '',
        youtube: talent.socials?.youtube || '',
        kick: talent.socials?.kick || '',
        twitch: talent.socials?.twitch || '',
        twitter: talent.socials?.twitter || '',
      },
      socialUrls: talent.socialUrls || { instagram: '', tiktok: '', youtube: '', kick: '', twitch: '', twitter: '' },
      educations: talent.educations || []
    });
    setIsTalentEdit(true);
    // Scroll editor to view
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDeleteTalent = (id: string) => {
    if (confirm(lang === 'TR' ? 'Bu yeteneği silmek istediğinizden emin misiniz?' : 'Are you sure you want to delete this talent?')) {
      const updated = talents.filter(t => t.id !== id);
      saveTalents(updated);
      setTalentsState(updated);
      showNotification(lang === 'TR' ? 'Yetenek silindi.' : 'Talent profile deleted.');
    }
  };


  // -----------------------------------------------------------------
  // RENDERING VISUAL VIEWS
  // -----------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-300">
        <div className="bg-white max-w-md w-full rounded-3xl p-8 shadow-2xl relative border border-rose-100/50 flex flex-col space-y-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-primary rounded-full hover:bg-rose-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-display text-2xl font-extrabold text-zinc-900">
              {lang === 'TR' ? 'Yönetici Girişi' : 'Control Panel Secure Access'}
            </h2>
            <p className="font-sans text-xs text-zinc-500">
              {lang === 'TR' ? 'Lütfen kimliğinizi doğrulamak için bilgilerinizi girin.' : 'Access requires authorized credential verification.'}
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-sans text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider block font-sans">
                {lang === 'TR' ? 'Kullanıcı Adı' : 'Username'}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                  <User className="w-4 h-4" />
                </span>
                <input 
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-zinc-400 text-zinc-800"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider block font-sans">
                {lang === 'TR' ? 'Şifre' : 'Password'}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder={lang === 'TR' ? 'Şifreniz' : 'Password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-11 pr-11 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-zinc-400 text-zinc-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3.5 rounded-xl font-display font-semibold text-sm shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>{lang === 'TR' ? 'Giriş Yap' : 'Authenticate'}</span>
            </button>
          </form>

          <div className="border-t border-zinc-100 pt-4 text-center">
            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              {lang === 'TR' ? 'Güvenli Yönetim Paneli Girişi' : 'Secure Admin Portal Entry'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // authenticated admin dashboard layout starts here
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-zinc-50 animate-in fade-in duration-300 overflow-y-auto">
      
      {/* Admin header rail */}
      <header className="sticky top-0 z-40 bg-zinc-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-primary/20 text-primary">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display text-lg md:text-xl font-extrabold tracking-tight">
              Booseberg {lang === 'TR' ? 'Yönetim Paneli' : 'Control Center'}
            </h1>
            <p className="font-sans text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
              {lang === 'TR' ? 'DİNAMİK İÇERİK EDİTÖRÜ' : 'DYNAMIC WRITER CONSOLE'}
            </p>
          </div>
        </div>

        {successMsg && (
          <div className="hidden md:flex items-center gap-2 bg-green-500/20 text-green-300 border border-green-500/30 px-4 py-1.5 rounded-full text-xs font-semibold animate-pulse">
            <CheckCircle className="w-3.5 h-3.5 text-green-400" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-1 text-xs font-sans text-zinc-400 hover:text-primary hover:bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-800 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{lang === 'TR' ? 'Çıkış' : 'Logout'}</span>
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Admin Tab Panel Inner Grid */}
      <div className="max-w-7xl w-full mx-auto p-6 flex flex-col md:flex-row gap-8 flex-grow">
        
        {/* Sidebar Tabs Selectors */}
        <aside className="w-full md:w-64 flex flex-col gap-2 flex-shrink-0">
          <button
            onClick={() => setActiveSubTab('slides')}
            className={`w-full text-left p-4 rounded-2xl font-sans text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer ${
              activeSubTab === 'slides' 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-zinc-700 hover:bg-rose-50 border border-zinc-100'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>{lang === 'TR' ? 'Giriş Carousel Slaytları' : 'Hero Carousel Slides'}</span>
            <span className="ml-auto text-xs bg-black/15 text-current px-2 py-0.5 rounded-full font-mono">{slides.length}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('email_brands')}
            className={`w-full text-left p-4 rounded-2xl font-sans text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer ${
              activeSubTab === 'email_brands' 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-zinc-700 hover:bg-rose-50 border border-zinc-100'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>{lang === 'TR' ? 'E-posta & Referanslar' : 'Email & Brands'}</span>
            <span className="ml-auto text-xs bg-black/15 text-current px-2 py-0.5 rounded-full font-mono">{brands.length}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('categories')}
            className={`w-full text-left p-4 rounded-2xl font-sans text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer ${
              activeSubTab === 'categories' 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-zinc-700 hover:bg-rose-50 border border-zinc-100'
            }`}
          >
            <Clipboard className="w-4 h-4" />
            <span>{lang === 'TR' ? 'Yetenek Türleri (Kategoriler)' : 'Talent Categories'}</span>
            <span className="ml-auto text-xs bg-black/15 text-current px-2 py-0.5 rounded-full font-mono">{categories.length}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('talents')}
            className={`w-full text-left p-4 rounded-2xl font-sans text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer ${
              activeSubTab === 'talents' 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-zinc-700 hover:bg-rose-50 border border-zinc-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{lang === 'TR' ? 'Yetenek Kartları (Talents)' : 'Manage Talents'}</span>
            <span className="ml-auto text-xs bg-black/15 text-current px-2 py-0.5 rounded-full font-mono">{talents.length}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('analytics')}
            className={`w-full text-left p-4 rounded-2xl font-sans text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer ${
              activeSubTab === 'analytics' 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-zinc-700 hover:bg-rose-50 border border-zinc-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{lang === 'TR' ? 'Analitik Dahboard' : 'Analytics Dashboard'}</span>
            <span className="ml-auto text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-mono font-bold">LIVE</span>
          </button>

          <button
            onClick={() => setActiveSubTab('contact_leads')}
            className={`w-full text-left p-4 rounded-2xl font-sans text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer ${
              activeSubTab === 'contact_leads' 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-zinc-700 hover:bg-rose-50 border border-zinc-100'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{lang === 'TR' ? 'Potansiyel Müşteriler' : 'Potential Leads'}</span>
            <span className="ml-auto text-xs bg-black/15 text-current px-2 py-0.5 rounded-full font-mono">{leads.length}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('seo_tools')}
            className={`w-full text-left p-4 rounded-2xl font-sans text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer ${
              activeSubTab === 'seo_tools' 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white text-zinc-700 hover:bg-rose-50 border border-zinc-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{lang === 'TR' ? 'SEO Uzman Araçları' : 'SEO Expert Tools'}</span>
            <span className="ml-auto text-[9px] bg-indigo-500 text-white px-2 py-0.5 rounded font-mono font-bold">SEO</span>
          </button>

          {/* Locked to ediz user only */}
          {currentUser === 'ediz' && (
            <button
              onClick={() => setActiveSubTab('managers')}
              className={`w-full text-left p-4 rounded-2xl font-sans text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer ${
                activeSubTab === 'managers' 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-white text-zinc-700 hover:bg-rose-50 border border-rose-100'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-emerald-600 group-hover:text-current" />
              <span>{lang === 'TR' ? 'Yöneticiler / Güvenlik' : 'Administrators / Auth'}</span>
              <span className="ml-auto text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full font-mono font-bold">🔑</span>
            </button>
          )}

          <div className="mt-8 bg-zinc-900 rounded-2xl p-4 text-white space-y-2">
            <h4 className="font-display text-xs font-bold text-primary uppercase block">Güvenlik İpuçları</h4>
            <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
              Tüm değişiklikler anında yerel sisteme kaydedilir. Sayfayı yenilediğinizde veya başkaları sayfayı açtığında dinamik olarak güncellenir.
            </p>
          </div>
        </aside>

        {/* Dynamic Editor Panel Workspace */}
        <main className="flex-grow bg-white border border-zinc-100 rounded-3xl p-6 md:p-8 shadow-sm">
          
          {/* 1. SLIDES TAB */}
          {activeSubTab === 'slides' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="font-display text-xl font-bold text-zinc-800">
                  {lang === 'TR' ? 'Giriş Carousel Slaytları' : 'Hero Carousel Slides Management'}
                </h3>
                <p className="text-zinc-500 text-xs font-sans">
                  Slayt görsellerini, başlıklarını ve metinlerini Türkçe/İngilizce ayrı ayrı ekleyin.
                </p>
              </div>

              {/* Slide Writer Form */}
              <form onSubmit={handleSaveSlide} className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl space-y-4">
                <h4 className="font-display text-sm font-bold text-zinc-700 flex items-center gap-1.5">
                  <Edit2 className="w-4 h-4 text-primary" />
                  <span>{isSlideEdit ? (lang === 'TR' ? 'Slaytı Düzenle' : 'Edit Slide') : (lang === 'TR' ? 'Yeni Slayt Ekle' : 'Add New Slide')}</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-600 block">Slayt Görsel Linki (Image URL)</label>
                    <input 
                      type="text" required placeholder="https://..." value={slideForm.image || ''}
                      onChange={(e) => setSlideForm({ ...slideForm, image: e.target.value })}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-zinc-600 block">Button Link (Gideceği Tab veya URL)</label>
                    <select 
                      value={slideForm.btnLink || 'contact'}
                      onChange={(e) => setSlideForm({ ...slideForm, btnLink: e.target.value })}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      <option value="contact">{lang === 'TR' ? 'İletişim Formu (Contact)' : 'Contact Page'}</option>
                      <option value="talent">{lang === 'TR' ? 'Yetenek Keşfi (Talents)' : 'Talents Page'}</option>
                      <option value="about">{lang === 'TR' ? 'Hakkımızda (About Us)' : 'About Us'}</option>
                      <option value="services">{lang === 'TR' ? 'Hizmetler (Services)' : 'Services'}</option>
                      <option value="external">{lang === 'TR' ? 'Harici Link (Yeni Sekmede açılır)' : 'External Link (Opens in new tab)'}</option>
                      <option value="none">{lang === 'TR' ? 'Butonsuz (Buton Gösterilmez)' : 'No Button (Image Only)'}</option>
                    </select>
                  </div>

                  {slideForm.btnLink === 'external' && (
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-xs font-bold text-zinc-600 block">Harici Link URL (Yeni Sekmede Açılacak Adres)</label>
                      <input 
                        type="text" placeholder="https://example.com" value={slideForm.externalUrl || ''}
                        onChange={(e) => setSlideForm({ ...slideForm, externalUrl: e.target.value })}
                        className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  )}

                  {/* TR Content */}
                  <div className="space-y-3 p-4 bg-rose-50/40 border border-rose-100 rounded-xl space-y-2">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Türkçe İçerik (Boş bırakılabilir)</span>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-zinc-600 block">Slayt Başlığı (TR)</label>
                      <input 
                        type="text" placeholder="Yetenekleri Keşfedin" value={slideForm.titleTR || ''}
                        onChange={(e) => setSlideForm({ ...slideForm, titleTR: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-sm outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-zinc-600 block">Kısa Açıklama (TR)</label>
                      <textarea 
                        rows={2} placeholder="Slayt alt metni..." value={slideForm.descriptionTR || ''}
                        onChange={(e) => setSlideForm({ ...slideForm, descriptionTR: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs outline-none resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-zinc-600 block">Buton Metni (TR)</label>
                      <input 
                        type="text" placeholder="Keşfet" value={slideForm.btnTextTR || ''}
                        onChange={(e) => setSlideForm({ ...slideForm, btnTextTR: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs outline-none"
                      />
                    </div>
                  </div>

                  {/* EN Content */}
                  <div className="space-y-3 p-4 bg-zinc-100/50 border border-zinc-200 rounded-xl space-y-2">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">English Content</span>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-zinc-600 block">Slide Title (EN)</label>
                      <input 
                        type="text" placeholder="Discover Talent" value={slideForm.titleEN || ''}
                        onChange={(e) => setSlideForm({ ...slideForm, titleEN: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-sm outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-zinc-600 block">Description (EN)</label>
                      <textarea 
                        rows={2} placeholder="Slide description text..." value={slideForm.descriptionEN || ''}
                        onChange={(e) => setSlideForm({ ...slideForm, descriptionEN: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs outline-none resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-zinc-600 block">Button Text (EN)</label>
                      <input 
                        type="text" placeholder="Discover" value={slideForm.btnTextEN || ''}
                        onChange={(e) => setSlideForm({ ...slideForm, btnTextEN: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  {isSlideEdit && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setIsSlideEdit(false);
                        setSlideForm({ id: '', image: '', titleTR: '', titleEN: '', descriptionTR: '', descriptionEN: '', btnTextTR: '', btnTextEN: '', btnLink: 'contact' });
                      }}
                      className="px-4 py-2 text-xs font-semibold text-zinc-500 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                    >
                      {lang === 'TR' ? 'İptal' : 'Cancel'}
                    </button>
                  )}
                  <button 
                    type="submit"
                    className="bg-primary hover:bg-red-700 text-white px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{lang === 'TR' ? 'Slaytı Kaydet' : 'Save Slide'}</span>
                  </button>
                </div>
              </form>

              {/* Slide List */}
              <div className="space-y-3">
                <h4 className="font-display text-xs font-bold text-zinc-500 uppercase tracking-wider block">Slayt Listesi ({slides.length})</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {slides.map(slide => (
                    <div key={slide.id} className="bg-white border border-zinc-200 rounded-2xl p-4 flex gap-4 shadow-sm items-start relative group">
                      <img src={slide.image} className="w-20 h-20 object-cover rounded-xl border border-zinc-100 flex-shrink-0" />
                      <div className="space-y-1 overflow-hidden">
                        <h5 className="font-display font-bold text-sm text-zinc-900 truncate">{slide.titleTR}</h5>
                        <p className="text-[11px] text-zinc-500 font-sans truncate">{slide.titleEN}</p>
                        <span className="inline-block mt-1 text-[9px] font-mono bg-rose-50 text-primary border border-primary/20 px-2 py-0.5 rounded-full">
                          Btn Link: /{slide.btnLink}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 flex gap-1 bg-white/95 p-1 rounded-lg border border-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEditSlide(slide)}
                          className="p-1 text-zinc-500 hover:text-primary rounded"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteSlide(slide.id)}
                          className="p-1 text-zinc-400 hover:text-red-600 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. EMAIL & BRANDS TAB */}
          {activeSubTab === 'email_brands' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="font-display text-xl font-bold text-zinc-800">
                  {lang === 'TR' ? 'Hakkımızda E-Posta & Referanslar' : 'Contact E-mail & References'}
                </h3>
                <p className="text-zinc-500 text-xs font-sans">
                  Sitedeki tüm e-postaları tek tıkla güncelleyin ve hakkımızda sayfasındaki referans marka logolarını yönetin.
                </p>
              </div>

              {/* Contact Email Change */}
              <form onSubmit={handleSaveEmail} className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-grow space-y-1.5 w-full">
                  <label className="text-xs font-bold text-zinc-600 block font-sans">İletişim E-posta Adresi (Mailto Linklerini Otomatik Günceller)</label>
                  <input 
                    type="email" required placeholder="hello@booseberg.com" value={contactEmail}
                    onChange={(e) => setContactEmailState(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary text-zinc-800 font-medium"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-primary hover:bg-red-700 text-white px-5 py-3 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-sm self-stretch md:self-auto justify-center"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{lang === 'TR' ? 'E-postayı Kaydet' : 'Save Email'}</span>
                </button>
              </form>

              {/* Reference Brands Section */}
              <div className="space-y-4">
                <h4 className="font-display text-sm font-bold text-zinc-700">{lang === 'TR' ? 'Referans Marka Logoları' : 'Reference Partner Logos'}</h4>
                
                {/* Brand Creator */}
                <form onSubmit={handleAddBrand} className="bg-zinc-50 border border-zinc-200 p-5 rounded-2xl space-y-4">
                  <span className="text-xs font-bold text-primary block">{lang === 'TR' ? 'Yeni Logo Ekle' : 'Add New Reference Logo'}</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-zinc-600 block">{lang === 'TR' ? 'Marka / Partner Adı' : 'Partner Name'}</label>
                      <input 
                        type="text" required placeholder="L'Oreal Paris" value={newBrandName}
                        onChange={(e) => setNewBrandName(e.target.value)}
                        className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-zinc-600 block">{lang === 'TR' ? 'Görsel URL (Logo .PNG formatında şeffaf önerilir)' : 'Logo Image URL'}</label>
                      <input 
                        type="text" required placeholder="https://..." value={newBrandImage}
                        onChange={(e) => setNewBrandImage(e.target.value)}
                        className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button 
                      type="submit"
                      className="bg-zinc-900 hover:bg-black text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{lang === 'TR' ? 'Logo Ekle' : 'Add Logo'}</span>
                    </button>
                  </div>
                </form>

                {/* Brands Grid */}
                <div className="border border-zinc-200 rounded-3xl p-6 bg-white space-y-4">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{lang === 'TR' ? 'KAYITLI TÜM MARKALAR' : 'REGISTERED BRANDS'}</span>
                  
                  {brands.length === 0 ? (
                    <div className="text-center py-12 text-zinc-400 font-sans text-xs">{lang === 'TR' ? 'Kayıtlı marka bulunamadı.' : 'No brand logos stored.'}</div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">
                      {brands.map((b: any) => (
                        <div key={b.id} className="relative group flex flex-col items-center justify-center p-4 bg-zinc-50 border border-zinc-200 rounded-2xl h-24">
                          <img src={b.image} className="max-h-12 max-w-full object-contain pointer-events-none" />
                          <span className="text-[10px] text-zinc-500 font-sans truncate mt-2 w-full text-center">{b.name}</span>
                          
                          <button 
                            type="button"
                            onClick={() => handleDeleteBrand(b.id)}
                            className="absolute -top-1.5 -right-1.5 p-1 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 rounded-full cursor-pointer hidden group-hover:block hover:scale-105"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 3. CATEGORIES TAB */}
          {activeSubTab === 'categories' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="font-display text-xl font-bold text-zinc-800">
                  {lang === 'TR' ? 'Yetenek Türleri ve Kategoriler' : 'Talent Categories & Taxonomy'}
                </h3>
                <p className="text-zinc-500 text-xs font-sans">
                  Sitedeki yetenekleri filtreleyen, bento kartlarında listelenen ana kategorileri (Influencer, Oyuncu, Yayıncı, vb.) yönetin.
                </p>
              </div>

              {/* Category form */}
              <form onSubmit={handleSaveCategory} className="bg-zinc-50 border border-zinc-200 p-5 rounded-2xl space-y-4">
                <h4 className="font-display text-xs font-bold text-primary uppercase">
                  {isCatEdit ? (lang === 'TR' ? 'Kategoriyi Düzenle' : 'Edit Category') : (lang === 'TR' ? 'Yeni Kategori Ekle' : 'Create New Category')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-600 block">Kategori Kimliği (ID - İngilizce Benzersiz Kod)</label>
                    <input 
                      type="text" required placeholder="influencer" value={catForm.id || ''}
                      disabled={isCatEdit}
                      onChange={(e) => setCatForm({ ...catForm, id: e.target.value })}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm outline-none disabled:bg-zinc-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-zinc-600 block">Kategori Türkçe Etiketi (TR)</label>
                    <input 
                      type="text" required placeholder="Modeller" value={catForm.labelTR || ''}
                      onChange={(e) => setCatForm({ ...catForm, labelTR: e.target.value })}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-zinc-600 block">Kategori İngilizce Etiketi (EN)</label>
                    <input 
                      type="text" required placeholder="Models" value={catForm.labelEN || ''}
                      onChange={(e) => setCatForm({ ...catForm, labelEN: e.target.value })}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  {isCatEdit && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setIsCatEdit(false);
                        setCatForm({ id: '', labelTR: '', labelEN: '' });
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-zinc-500 rounded hover:bg-zinc-100"
                    >
                      {lang === 'TR' ? 'İptal' : 'Cancel'}
                    </button>
                  )}
                  <button 
                    type="submit"
                    className="bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{lang === 'TR' ? 'Kategoriyi Gönder' : 'Save Category'}</span>
                  </button>
                </div>
              </form>

              {/* Saved categories table */}
              <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-white">
                <table className="w-full text-left border-collapse font-sans text-xs md:text-sm">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-200">
                      <th className="p-4 font-bold text-zinc-700">ID</th>
                      <th className="p-4 font-bold text-zinc-700">Etiket TR</th>
                      <th className="p-4 font-bold text-zinc-700">Etiket EN</th>
                      <th className="p-4 font-bold text-zinc-700 text-right">Eylemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((c) => (
                      <tr key={c.id} className="border-b border-zinc-100 last:border-b-0 hover:bg-rose-50/20">
                        <td className="p-4 font-mono font-bold text-primary">{c.id}</td>
                        <td className="p-4 text-zinc-800">{c.labelTR}</td>
                        <td className="p-4 text-zinc-800">{c.labelEN}</td>
                        <td className="p-4 text-right flex gap-3 justify-end">
                          <button 
                            onClick={() => {
                              setCatForm(c);
                              setIsCatEdit(true);
                            }}
                            className="text-zinc-500 hover:text-primary p-1 rounded"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteCategory(c.id)}
                            className="text-zinc-400 hover:text-red-600 p-1 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. TALENTS TAB */}
          {activeSubTab === 'talents' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="font-display text-xl font-bold text-zinc-800">
                  {lang === 'TR' ? 'Yetenek Kartları & Profiller' : 'Talent Profiles Creator'}
                </h3>
                <p className="text-zinc-500 text-xs font-sans">
                  Sitedeki yetenekleri ekleyin, kaldırın, fotoğraflarından projelerine kadar TR/EN destekli güncelleyin.
                </p>
              </div>

              {/* Talent Profile Editor Form */}
              <form onSubmit={handleSaveTalent} className="bg-zinc-50 border border-zinc-200 p-6 rounded-3xl space-y-6">
                <h4 className="font-display text-sm font-bold text-primary uppercase flex items-center gap-1.5">
                  <Edit2 className="w-4 h-4" />
                  <span>{isTalentEdit ? (lang === 'TR' ? 'Yetenek Düzenle' : 'Edit Talent Profile') : (lang === 'TR' ? 'Yeni Yetenek Ekle' : 'Add New Talent Profile')}</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  
                  {/* Basic stats */}
                  <div className="md:col-span-4 space-y-1">
                    <label className="text-xs font-semibold text-zinc-6 profile-form">Adı Soyadı</label>
                    <input 
                      type="text" required placeholder="Melisa Yıldırım" value={talentForm.name || ''}
                      onChange={(e) => setTalentForm({ ...talentForm, name: e.target.value })}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm outline-none"
                    />
                  </div>

                  <div className="md:col-span-4 space-y-1">
                    <label className="text-xs font-semibold text-zinc-6 block">Kategori</label>
                    <select 
                      value={talentForm.category || ''}
                      required
                      onChange={(e) => setTalentForm({ ...talentForm, category: e.target.value })}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-3 text-sm outline-none"
                    >
                      <option value="">{lang === 'TR' ? 'Seçin...' : 'Select Category...'}</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{lang === 'TR' ? c.labelTR : c.labelEN}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-4 space-y-1">
                    <label className="text-xs font-semibold text-zinc-6 block">Yetenek ID (Benzersiz URL Kodu - Boşsa Otomatik)</label>
                    <input 
                      type="text" placeholder="melisa-yildirim" value={talentForm.id || ''}
                      disabled={isTalentEdit}
                      onChange={(e) => setTalentForm({ ...talentForm, id: e.target.value })}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm outline-none disabled:bg-zinc-200"
                    />
                  </div>

                  <div className="md:col-span-8 space-y-1">
                    <label className="text-xs font-semibold text-zinc-6 block">Profil Resmi URL (Ana Listeleme Kart Seçeneği)</label>
                    <input 
                      type="text" required placeholder="https://..." value={talentForm.image || ''}
                      onChange={(e) => setTalentForm({ ...talentForm, image: e.target.value })}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm outline-none"
                    />
                  </div>

                  <div className="md:col-span-12 p-4 bg-zinc-100/65 dark:bg-zinc-800/25 rounded-2xl border border-zinc-200 mt-2 space-y-2">
                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block flex items-center gap-1.5">
                      <span>{lang === 'TR' ? 'Detay Sayfası Büyük Karosel Görselleri (1920x1080 - Alt Alta Yazın)' : 'Detail Page Large Carousel Images (1920x1080 - One Link Per Line)'}</span>
                    </span>
                    <p className="text-[10px] text-zinc-500 font-sans">
                      {lang === 'TR' 
                        ? 'Yetenek detay sayfasındaki tam genişlikteki büyük karosel için her satıra bir görsel linki (URL) yazarak birden fazla resim ekleyebilirsiniz. Boş bırakırsanız ana resmi kullanır.'
                        : 'Add multiple high-resolution images for the full-width top carousel of the talent profile by writing one image link (URL) per line. Defaults to the main picture if left blank.'}
                    </p>
                    <textarea 
                      rows={3} 
                      placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..." 
                      value={talentForm.carouselImages ? talentForm.carouselImages.join('\n') : ''}
                      onChange={(e) => {
                        const lines = e.target.value.split('\n');
                        setTalentForm({ ...talentForm, carouselImages: lines });
                      }}
                      className="w-full bg-white border border-zinc-300 rounded-xl p-3 text-xs outline-none font-mono"
                    />
                  </div>

                  {/* Physical statistics */}
                  <div className="md:col-span-4 space-y-1">
                    <label className="text-xs font-semibold text-zinc-6 block">Eğitim Derecesi / Kursu</label>
                    <input 
                      type="text" placeholder="Mimar Sinan Konservatuvarı" value={talentForm.education || ''}
                      onChange={(e) => setTalentForm({ ...talentForm, education: e.target.value })}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm outline-none"
                    />
                  </div>

                  <div className="md:col-span-3 space-y-1">
                    <label className="text-xs font-semibold text-zinc-6 block">Yaş</label>
                    <input 
                      type="number" placeholder="26" value={talentForm.age || ''}
                      onChange={(e) => setTalentForm({ ...talentForm, age: Number(e.target.value) })}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm outline-none"
                    />
                  </div>

                  <div className="md:col-span-3 space-y-1">
                    <label className="text-xs font-semibold text-zinc-6 block">Boy</label>
                    <input 
                      type="text" placeholder="174 cm" value={talentForm.height || ''}
                      onChange={(e) => setTalentForm({ ...talentForm, height: e.target.value })}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm outline-none"
                    />
                  </div>

                  <div className="md:col-span-3 space-y-1">
                    <label className="text-xs font-semibold text-zinc-6 block">Göz Rengi</label>
                    <select 
                      value={talentForm.eyeColor || 'Ela'}
                      onChange={(e) => setTalentForm({ ...talentForm, eyeColor: e.target.value })}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-3 text-sm outline-none"
                    >
                      {EYE_COLORS.map(color => (
                        <option key={color.code} value={color.labelTR}>{color.labelTR} ({color.labelEN})</option>
                      ))}
                    </select>
                  </div>


                  {/* Social reaches & Links Configurations */}
                  <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/10 rounded-2xl border border-zinc-200/60 my-2">
                    <span className="md:col-span-3 text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
                      {lang === 'TR' ? 'Sosyal Medya Hesapları & Etkileşim Haritası (Mevcut olanları doldurun, boş olanlar profilde gözükmeyecektir)' : 'Social Media Accounts & Link Map (Fill available fields; empty accounts remain hidden)'}
                    </span>

                    {/* Instagram Group */}
                    <div className="space-y-2 p-3 bg-white dark:bg-black/30 rounded-xl border border-zinc-200">
                      <span className="text-[10px] font-bold text-rose-500 block">INSTAGRAM</span>
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 font-mono block">TAKİPÇİ SÖZCÜĞÜ (ör. 1.2M)</label>
                        <input 
                          type="text" placeholder="1.2M" value={talentForm.socials?.instagram || ''}
                          onChange={(e) => setTalentForm({ ...talentForm, socials: { ...talentForm.socials!, instagram: e.target.value ?? '' } })}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 font-mono block">PROFİL URL LİNKİ</label>
                        <input 
                          type="text" placeholder="https://instagram.com/..." value={talentForm.socialUrls?.instagram || ''}
                          onChange={(e) => setTalentForm({ ...talentForm, socialUrls: { ...talentForm.socialUrls!, instagram: e.target.value ?? '' } })}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                        />
                      </div>
                    </div>

                    {/* TikTok Group */}
                    <div className="space-y-2 p-3 bg-white dark:bg-black/30 rounded-xl border border-zinc-200">
                      <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300 block">TIKTOK</span>
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 font-mono block">TAKİPÇİ SÖZCÜĞÜ (ör. 850K)</label>
                        <input 
                          type="text" placeholder="850K" value={talentForm.socials?.tiktok || ''}
                          onChange={(e) => setTalentForm({ ...talentForm, socials: { ...talentForm.socials!, tiktok: e.target.value ?? '' } })}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 font-mono block">PROFİL URL LİNKİ</label>
                        <input 
                          type="text" placeholder="https://tiktok.com/@..." value={talentForm.socialUrls?.tiktok || ''}
                          onChange={(e) => setTalentForm({ ...talentForm, socialUrls: { ...talentForm.socialUrls!, tiktok: e.target.value ?? '' } })}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                        />
                      </div>
                    </div>

                    {/* YouTube Group */}
                    <div className="space-y-2 p-3 bg-white dark:bg-black/30 rounded-xl border border-zinc-200">
                      <span className="text-[10px] font-bold text-red-600 block">YOUTUBE</span>
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 font-mono block">TAKİPÇİ SÖZCÜĞÜ (ör. 320K)</label>
                        <input 
                          type="text" placeholder="320K" value={talentForm.socials?.youtube || ''}
                          onChange={(e) => setTalentForm({ ...talentForm, socials: { ...talentForm.socials!, youtube: e.target.value ?? '' } })}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 font-mono block">PROFİL URL LİNKİ</label>
                        <input 
                          type="text" placeholder="https://youtube.com/..." value={talentForm.socialUrls?.youtube || ''}
                          onChange={(e) => setTalentForm({ ...talentForm, socialUrls: { ...talentForm.socialUrls!, youtube: e.target.value ?? '' } })}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                        />
                      </div>
                    </div>

                    {/* Kick Group */}
                    <div className="space-y-2 p-3 bg-white dark:bg-black/30 rounded-xl border border-zinc-200">
                      <span className="text-[10px] font-bold text-green-500 block">KICK</span>
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 font-mono block">TAKİPÇİ SÖZCÜĞÜ (ör. 50K)</label>
                        <input 
                          type="text" placeholder="50K" value={talentForm.socials?.kick || ''}
                          onChange={(e) => setTalentForm({ ...talentForm, socials: { ...talentForm.socials!, kick: e.target.value ?? '' } })}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 font-mono block">PROFİL URL LİNKİ</label>
                        <input 
                          type="text" placeholder="https://kick.com/..." value={talentForm.socialUrls?.kick || ''}
                          onChange={(e) => setTalentForm({ ...talentForm, socialUrls: { ...talentForm.socialUrls!, kick: e.target.value ?? '' } })}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                        />
                      </div>
                    </div>

                    {/* Twitch Group */}
                    <div className="space-y-2 p-3 bg-white dark:bg-black/30 rounded-xl border border-zinc-200">
                      <span className="text-[10px] font-bold text-indigo-500 block">TWITCH</span>
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 font-mono block">TAKİPÇİ SÖZCÜĞÜ (ör. 180K)</label>
                        <input 
                          type="text" placeholder="180K" value={talentForm.socials?.twitch || ''}
                          onChange={(e) => setTalentForm({ ...talentForm, socials: { ...talentForm.socials!, twitch: e.target.value ?? '' } })}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 font-mono block">PROFİL URL LİNKİ</label>
                        <input 
                          type="text" placeholder="https://twitch.tv/..." value={talentForm.socialUrls?.twitch || ''}
                          onChange={(e) => setTalentForm({ ...talentForm, socialUrls: { ...talentForm.socialUrls!, twitch: e.target.value ?? '' } })}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                        />
                      </div>
                    </div>

                    {/* Twitter/X Group */}
                    <div className="space-y-2 p-3 bg-white dark:bg-black/30 rounded-xl border border-zinc-200">
                      <span className="text-[10px] font-bold text-amber-500 block">TWITTER / X</span>
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 font-mono block">TAKİPÇİ SÖZCÜĞÜ (ör. 45K)</label>
                        <input 
                          type="text" placeholder="45K" value={talentForm.socials?.twitter || ''}
                          onChange={(e) => setTalentForm({ ...talentForm, socials: { ...talentForm.socials!, twitter: e.target.value ?? '' } })}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-zinc-500 font-mono block">PROFİL URL LİNKİ</label>
                        <input 
                          type="text" placeholder="https://x.com/..." value={talentForm.socialUrls?.twitter || ''}
                          onChange={(e) => setTalentForm({ ...talentForm, socialUrls: { ...talentForm.socialUrls!, twitter: e.target.value ?? '' } })}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Role Labels */}
                  <div className="md:col-span-6 space-y-1">
                    <label className="text-xs font-semibold text-zinc-6 block">Meslek / Rol Açıklaması (TR)</label>
                    <input 
                      type="text" required placeholder="Dizi & Sinema Oyuncusu" value={talentForm.roleLabelTR || ''}
                      onChange={(e) => setTalentForm({ ...talentForm, roleLabelTR: e.target.value })}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm outline-none"
                    />
                  </div>

                  <div className="md:col-span-6 space-y-1">
                    <label className="text-xs font-semibold text-zinc-6 block">Role Description label (EN)</label>
                    <input 
                      type="text" placeholder="Drama & Cinema Actor" value={talentForm.roleLabelEN || ''}
                      onChange={(e) => setTalentForm({ ...talentForm, roleLabelEN: e.target.value })}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm outline-none"
                    />
                  </div>

                  {/* Dual language fields */}
                  <div className="md:col-span-6 p-4 bg-rose-50/40 rounded-xl border border-rose-100 space-y-2">
                    <span className="text-[10px] font-bold text-zinc-500 block uppercase font-mono tracking-widest">Biyografi (Türkçe)</span>
                    <textarea 
                      rows={3} required placeholder="Oyuncu kariyerinin detayları..." value={talentForm.bioTR || ''}
                      onChange={(e) => setTalentForm({ ...talentForm, bioTR: e.target.value })}
                      className="w-full bg-white border border-rose-100 rounded-xl p-3 text-sm outline-none resize-none"
                    />
                  </div>

                  <div className="md:col-span-6 p-4 bg-zinc-100/50 rounded-xl border border-zinc-200 space-y-2">
                    <span className="text-[10px] font-bold text-zinc-500 block uppercase font-mono tracking-widest">Biography (English)</span>
                    <textarea 
                      rows={3} placeholder="Talent biography in english to prevent Turkish leak..." value={talentForm.bioEN || ''}
                      onChange={(e) => setTalentForm({ ...talentForm, bioEN: e.target.value })}
                      className="w-full bg-white border border-zinc-200 rounded-xl p-3 text-sm outline-none resize-none"
                    />
                  </div>

                  {/* EDUCATION MULTI-ITEM MANAGER */}
                  <div className="md:col-span-12 border border-rose-100 rounded-2xl p-4 bg-white space-y-4">
                    <span className="text-xs font-bold text-zinc-700 block flex items-center gap-1">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span>{lang === 'TR' ? 'EĞİTİM BİLGİLERİ (GENİŞ LİSTE)' : 'EDUCATION BACKGROUND (DETAILED)'}</span>
                    </span>

                    {/* Registered Educations list */}
                    {talentForm.educations && talentForm.educations.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {talentForm.educations.map((item, index) => (
                          <div key={index} className="relative group p-3 border border-zinc-100 rounded-xl bg-zinc-50 flex flex-col justify-center h-20 overflow-hidden text-ellipsis">
                            <span className="text-xs font-bold text-zinc-700 block truncate pr-8">{item.schoolTR || item.school}</span>
                            <span className="text-[11px] text-zinc-500 block truncate">{item.degreeTR || item.degree}</span>
                            {item.year && (
                              <span className="text-[9px] font-mono text-zinc-400 block">{item.year}</span>
                            )}
                            <button 
                              type="button"
                              onClick={() => handleRemoveEducationFromTalent(index)}
                              className="absolute top-1.5 right-1.5 p-1 bg-red-100 text-red-600 rounded-full hover:scale-105 transition-transform"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 border border-dashed border-zinc-200 rounded-xl text-xs text-zinc-500">
                        {lang === 'TR' ? 'Henüz detaylı eğitim eklenmedi.' : 'No detailed educations mapped yet.'}
                      </div>
                    )}

                    {/* Add education form elements */}
                    <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 space-y-3">
                      <span className="text-[11px] font-bold text-zinc-500 block">{lang === 'TR' ? 'Yetenek Kartına Eğitim Ekle' : 'Append Education background'}</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                        <input 
                          type="text" placeholder={lang === 'TR' ? 'Okul Adı (TR) Örn: Boğaziçi' : 'School Name (TR)'} value={newEduSchoolTR}
                          onChange={(e) => setNewEduSchoolTR(e.target.value)}
                          className="bg-white border border-zinc-300 rounded-lg text-xs px-2 py-1.5 outline-none"
                        />
                        <input 
                          type="text" placeholder={lang === 'TR' ? 'School Name (EN)' : 'School Name (EN)'} value={newEduSchoolEN}
                          onChange={(e) => setNewEduSchoolEN(e.target.value)}
                          className="bg-white border border-zinc-300 rounded-lg text-xs px-2 py-1.5 outline-none"
                        />
                        <input 
                          type="text" placeholder={lang === 'TR' ? 'Bölüm / Derece (TR) Örn: Oyunculuk Bölümü' : 'Degree / Bureau (TR)'} value={newEduDegreeTR}
                          onChange={(e) => setNewEduDegreeTR(e.target.value)}
                          className="bg-white border border-zinc-300 rounded-lg text-xs px-2 py-1.5 outline-none"
                        />
                        <input 
                          type="text" placeholder={lang === 'TR' ? 'Degree / Major (EN)' : 'Degree / Major (EN)'} value={newEduDegreeEN}
                          onChange={(e) => setNewEduDegreeEN(e.target.value)}
                          className="bg-white border border-zinc-300 rounded-lg text-xs px-2 py-1.5 outline-none"
                        />
                        <input 
                          type="text" placeholder={lang === 'TR' ? 'Yıl (Örn: 2021 - 2025)' : 'Year range'} value={newEduYear}
                          onChange={(e) => setNewEduYear(e.target.value)}
                          className="bg-white border border-zinc-300 rounded-lg text-xs px-2 py-1.5 outline-none"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button 
                          type="button"
                          onClick={handleAddEducationToTalent}
                          className="bg-zinc-800 hover:bg-zinc-950 text-white font-semibold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          <span>{lang === 'TR' ? 'Eğitimi Profile Ekle' : 'Add Education to Profile'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-projects list inside layout */}
                <div className="border border-zinc-200 rounded-2xl p-4 bg-white space-y-4">
                  <span className="text-xs font-bold text-zinc-700 block flex items-center gap-1">
                    <Award className="w-4 h-4 text-primary" />
                    <span>{lang === 'TR' ? 'YETENEĞİN ÖNE ÇIKAN PROJELERİ' : 'FEATURED PROJECTS'}</span>
                  </span>

                  {/* Registered Projects list for this talent */}
                  {talentForm.projects && talentForm.projects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {talentForm.projects.map((proj: Project, index) => (
                        <div key={proj.id || index} className="relative group p-3 border border-zinc-200 rounded-xl bg-zinc-50 flex items-start gap-2 h-20 overflow-hidden">
                          <img src={proj.image} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                          <div className="truncate">
                            <span className="text-[10px] text-zinc-400 block truncate">
                              {lang === 'TR' ? (proj.typeTR || proj.type) : (proj.typeEN || proj.type || proj.typeTR)}
                            </span>
                            <span className="text-xs font-bold text-zinc-800 block truncate">
                              {lang === 'TR' ? (proj.titleTR || proj.title) : (proj.titleEN || proj.title || proj.titleTR)}
                            </span>
                            <span className="text-[10px] text-primary block truncate">
                              {lang === 'TR' ? (proj.roleTR || proj.role) : (proj.roleEN || proj.role || proj.roleTR)}
                            </span>
                          </div>
                          <button 
                            type="button"
                            onClick={() => handleRemoveProjectFromTalent(proj.id)}
                            className="absolute top-1.5 right-1.5 p-1 bg-red-100 text-red-600 rounded-full hover:scale-105 transition-transform"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 border border-dashed border-zinc-200 rounded-xl text-xs text-zinc-500">
                      {lang === 'TR' ? 'Henüz proje eklenmedi.' : 'No projects mapped to this talent.'}
                    </div>
                  )}

                  {/* Add project panel */}
                  <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-3">
                    <span className="text-[11px] font-bold text-zinc-600 block">{lang === 'TR' ? 'Yetenek Kartına Proje Ekle' : 'Add Project Sibling to Talent Card'}</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-zinc-500">Proje Başlığı (TR)</label>
                        <input 
                          type="text" placeholder="Örn: Sonsuz Gökyüzü" value={newProjTitleTR}
                          onChange={(e) => setNewProjTitleTR(e.target.value)}
                          className="w-full bg-white border border-zinc-300 rounded-lg text-xs px-2.5 py-1.5 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-zinc-500">Project Title (EN)</label>
                        <input 
                          type="text" placeholder="e.g. Infinite Sky" value={newProjTitleEN}
                          onChange={(e) => setNewProjTitleEN(e.target.value)}
                          className="w-full bg-white border border-zinc-300 rounded-lg text-xs px-2.5 py-1.5 outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-zinc-500">Rolünüz (TR)</label>
                        <input 
                          type="text" placeholder="Örn: Başrol: Ceylin" value={newProjRoleTR}
                          onChange={(e) => setNewProjRoleTR(e.target.value)}
                          className="w-full bg-white border border-zinc-300 rounded-lg text-xs px-2.5 py-1.5 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-zinc-500">Your Role (EN)</label>
                        <input 
                          type="text" placeholder="e.g. Lead: Ceylin" value={newProjRoleEN}
                          onChange={(e) => setNewProjRoleEN(e.target.value)}
                          className="w-full bg-white border border-zinc-300 rounded-lg text-xs px-2.5 py-1.5 outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-zinc-500">Format & Yıl (TR)</label>
                        <input 
                          type="text" placeholder="Örn: Dizi | 2026" value={newProjTypeTR}
                          onChange={(e) => setNewProjTypeTR(e.target.value)}
                          className="w-full bg-white border border-zinc-300 rounded-lg text-xs px-2.5 py-1.5 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-zinc-500">Format & Year (EN)</label>
                        <input 
                          type="text" placeholder="e.g. TV Series | 2026" value={newProjTypeEN}
                          onChange={(e) => setNewProjTypeEN(e.target.value)}
                          className="w-full bg-white border border-zinc-300 rounded-lg text-xs px-2.5 py-1.5 outline-none"
                        />
                      </div>

                      <div className="md:col-span-2 space-y-1">
                        <label className="text-[10px] font-semibold text-zinc-500">Afiş/Görsel URL</label>
                        <input 
                          type="text" placeholder="https://unsplash.com/..." value={newProjImage}
                          onChange={(e) => setNewProjImage(e.target.value)}
                          className="w-full bg-white border border-zinc-300 rounded-lg text-xs px-2.5 py-1.5 outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button 
                        type="button"
                        onClick={handleAddProjectToTalent}
                        className="bg-zinc-800 hover:bg-zinc-950 text-white font-semibold text-xs py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{lang === 'TR' ? 'Projeyi Profile Ekle' : 'Push Project to Profile'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  {isTalentEdit && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setIsTalentEdit(false);
                        setTalentForm({
                          id: '', name: '', category: '', categoryLabel: '', roleLabel: '', roleLabelTR: '', roleLabelEN: '',
                          image: '', bio: '', bioTR: '', bioEN: '', age: 24, height: '172 cm', eyeColor: 'Ela', education: '',
                          socials: { instagram: '1.2M', tiktok: '850K', youtube: '320K' },
                          projects: []
                        });
                      }}
                      className="px-4 py-2 text-xs font-semibold text-zinc-500 rounded hover:bg-zinc-100"
                    >
                      {lang === 'TR' ? 'İptal' : 'Cancel'}
                    </button>
                  )}
                  <button 
                    type="submit"
                    className="bg-primary hover:bg-red-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>{lang === 'TR' ? 'Yetenek Kartını Kaydet / Güncelle' : 'Save Talent Card'}</span>
                  </button>
                </div>
              </form>

              {/* Stored Talent Profiles grid list */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{lang === 'TR' ? 'KAYITLI TÜM YETENEKLER' : 'REGISTERED TALENT PROFILES'}</span>
                
                {talents.length === 0 ? (
                  <div className="text-center py-10 text-zinc-400 text-xs bg-zinc-50 rounded-2xl border">{lang === 'TR' ? 'Yetenek kaydı bulunamadı.' : 'No talent profiles saved.'}</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {talents.map(talent => (
                      <div key={talent.id} className="relative group bg-white border border-zinc-200 rounded-2xl p-4 flex gap-4 shadow-sm items-start">
                        <img src={talent.image} className="w-16 h-20 object-cover rounded-xl border border-zinc-100 flex-shrink-0" />
                        <div className="overflow-hidden space-y-1">
                          <h5 className="font-display font-bold text-sm text-zinc-900 truncate">{talent.name}</h5>
                          <span className="inline-block text-[9px] font-mono font-bold bg-primary/15 text-primary tracking-wider uppercase px-2 py-0.5 rounded">
                            {categories.find(c => c.id === talent.category)?.labelTR || talent.category}
                          </span>
                          <p className="text-[10px] text-zinc-500 font-sans truncate">{talent.roleLabelTR || talent.roleLabel}</p>
                          <p className="text-[9px] text-zinc-400 font-mono truncate">Projects: {talent.projects?.length || 0}</p>
                        </div>
                        <div className="absolute top-2.5 right-2.5 flex gap-1 bg-white border border-zinc-100 p-1 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300">
                          <button 
                            onClick={() => handleEditTalent(talent)}
                            className="p-1 text-zinc-500 hover:text-primary rounded"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => handleDeleteTalent(talent.id)}
                            className="p-1 text-zinc-400 hover:text-red-500 rounded"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 5. ANALYTICS TAB */}
          {activeSubTab === 'analytics' && (() => {
            const stats = analyticsData || {
              visitsCount: 1,
              referrers: {},
              cities: {},
              talentViews: {},
              dailyViews: {}
            };

            const todayStr = new Date().toISOString().split('T')[0];
            const dailyViews = stats.dailyViews?.[todayStr] || stats.visitsCount || 1;
            const totalVisits = stats.visitsCount || 1;

            // Compute referring traffic percentages
            const defaultReferrers = [
              { name: 'google.com', label: lang === 'TR' ? 'Organik Arama (Google)' : 'Organic Search (Google)', color: 'bg-primary' },
              { name: 'instagram.com', label: lang === 'TR' ? 'Yetenek Profilleri' : 'Talent Profiles Traffic', color: 'bg-rose-500' },
              { name: 'elixis.com.tr', label: lang === 'TR' ? 'Geliştirici Referansı (Elixis)' : 'Developer Partner Referral (Elixis)', color: 'bg-indigo-600' },
              { name: 'tiktok.com', label: lang === 'TR' ? 'Video Kampanyaları' : 'Video Campaigns Traffic', color: 'bg-zinc-900' },
              { name: 'Direct Access / Bookmark', label: lang === 'TR' ? 'Doğrudan Erişim' : 'Direct Visits / Bookmark', color: 'bg-zinc-400' },
              { name: 'x.com / twitter.com', label: lang === 'TR' ? 'Sosyal Medya Paylaşımları' : 'Social Platforms Share', color: 'bg-sky-400' }
            ];

            const totalReferrals = (Object.values(stats.referrers || {}) as number[]).reduce((a: number, b: number) => a + Number(b), 0) || 1;
            const referralItems = defaultReferrers.map(def => {
              const currentCount = stats.referrers?.[def.name] || 0;
              const computedPct = Math.round((Number(currentCount) / Number(totalReferrals)) * 100);
              return {
                ...def,
                count: currentCount,
                pct: computedPct
              };
            }).sort((a, b) => b.count - a.count);

            // Compute city regional locations
            const defaultCities = [
              { name: 'İstanbul', flag: '🇹🇷' },
              { name: 'London', flag: '🇬🇧' },
              { name: 'Berlin', flag: '🇩🇪' },
              { name: 'Ankara', flag: '🇹🇷' },
              { name: 'İzmir', flag: '🇹🇷' },
              { name: 'Amsterdam', flag: '🇳🇱' }
            ];

            const totalCitiesCount = (Object.values(stats.cities || {}) as number[]).reduce((a: number, b: number) => a + Number(b), 0) || 1;
            const cityItems = defaultCities.map(c => {
              const count = stats.cities?.[c.name] || 0;
              return {
                ...c,
                count,
                pct: Math.round((Number(count) / Number(totalCitiesCount)) * 100)
              };
            }).sort((a, b) => b.count - a.count);

            // Fetch top percentages for geographic representations
            const istanbulPct = stats.cities?.['İstanbul'] ? Math.round((Number(stats.cities['İstanbul']) / Number(totalCitiesCount)) * 100) : 100;
            const londonPct = stats.cities?.['London'] ? Math.round((Number(stats.cities['London']) / Number(totalCitiesCount)) * 100) : 0;
            const berlinPct = stats.cities?.['Berlin'] ? Math.round((Number(stats.cities['Berlin']) / Number(totalCitiesCount)) * 100) : 0;
            const amsterdamPct = stats.cities?.['Amsterdam'] ? Math.round((Number(stats.cities['Amsterdam']) / Number(totalCitiesCount)) * 100) : 0;

            const successMsgState = (msg: string) => {
              setSuccessMsg(msg);
              setTimeout(() => setSuccessMsg(''), 5000);
            };

            return (
              <div className="space-y-8 animate-in fade-in duration-150">
                {/* Header section with top navigation */}
                <div className="border-b border-zinc-100 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-zinc-800 flex items-center gap-2">
                      <span>{lang === 'TR' ? 'Analitik Trafik ve Analiz Raporları' : 'Traffic Analytics & Intelligence Reports'}</span>
                      <span className="text-[9px] bg-rose-100 text-primary border border-primary/10 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-sans">
                        {lang === 'TR' ? 'Gerçek Veri Modeli' : 'Live Data Tracking'}
                      </span>
                    </h3>
                    <p className="text-zinc-500 text-xs font-sans">
                      {lang === 'TR' ? 'Booseberg Talent platformunun anlık performans, ziyaret ve yetenek popülerlik istatistikleri' : 'Realtime performance metrics, audience locations, and talent popularity analytics'}
                    </p>
                  </div>

                  {/* Reset Actions and SubTab Switcher */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => {
                        if (confirm(lang === 'TR' ? 'Tüm gerçek analitik verileri sıfırlanacaktır. Emin misiniz?' : 'Purge all logged live analytics telemetry?')) {
                          purgeAnalytics();
                          setAnalyticsData(getAnalytics());
                          if (onRefreshData) onRefreshData();
                          successMsgState(lang === 'TR' ? 'Analitik verileri tamamen temizlendi ve yeni takip başlatıldı!' : 'All telemetry cleaned with new tracking session active!');
                        }
                      }}
                      className="px-4 py-1.5 rounded-full border border-rose-200/60 hover:bg-rose-50 hover:text-primary hover:border-transparent text-xs text-zinc-600 font-bold bg-white active:scale-95 duration-200 cursor-pointer flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-primary" />
                      <span>{lang === 'TR' ? 'Verileri Sıfırla' : 'Reset Analytics'}</span>
                    </button>

                    <div className="bg-rose-50 border border-rose-100/50 rounded-full flex gap-1 p-1 w-fit">
                      <button
                        type="button"
                        onClick={() => setAnalyticsSubTab('home')}
                        className={`px-4 py-1.5 rounded-full font-sans text-xs font-bold transition-all cursor-pointer ${
                          analyticsSubTab === 'home'
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/50'
                        }`}
                      >
                        {lang === 'TR' ? 'Ana Sayfa Trafiği' : 'Homepage Traffic'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setAnalyticsSubTab('talents')}
                        className={`px-4 py-1.5 rounded-full font-sans text-xs font-bold transition-all cursor-pointer ${
                          analyticsSubTab === 'talents'
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/50'
                        }`}
                      >
                        {lang === 'TR' ? 'Yetenek Trafiği' : 'Talents Traffic'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* GDPR / KVKK Notification Banner on Dashboard */}
                <div className="bg-rose-50/50 border border-rose-100 text-[11px] text-zinc-600 rounded-2xl p-4 leading-relaxed font-sans flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold text-zinc-800 uppercase tracking-wider block">© GDPR / KVKK VERİLİRİ GÜVENLİĞİ UYUM BİLDİRİMİ</span>
                    <p>
                      {lang === 'TR'
                        ? 'Ajansımızın analitik raporlama modülü, ziyaretçilerin gizlilik haklarına azami ölçüde saygı duyar. KVKK mevzuatı uyarınca, çerezler ve gezinme analizi verileri anonimleştirilmiş sessionID parametreleri referans alınarak güvenli local veritabanlarında saklanır. IP adresi veya tam konum bilgisi KVKK kapsamında asla toplanmaz ve işlenmez.'
                        : 'Under standard GDPR compliance guidelines, our client-side telemetry modules run natively inside secured browser sandboxes. Dynamic referrer paths and profile clicks are logged using anonymized identifier codes. Geographial parameters are mapped locally based on language attributes without harvesting private user details.'}
                    </p>
                  </div>
                </div>

                {/* 5.1 HOMEPAGE TRAFFIC SUBTAB */}
                {analyticsSubTab === 'home' && (
                  <div className="space-y-8">
                    {/* Row of Three Stats Counters */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-white to-rose-50/20 border border-zinc-150 rounded-2xl p-5 shadow-sm space-y-2">
                        <span className="text-[10px] font-mono font-bold text-zinc-400 block tracking-wider uppercase">
                          {lang === 'TR' ? 'BUGÜNKÜ TRAFİK' : 'TODAY\'S TRAFFIC'}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-2xl font-extrabold text-zinc-900">{dailyViews}</span>
                          <span className="text-[10px] font-mono font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">LIVE</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-sans">
                          {lang === 'TR' ? 'Bugün gerçekleşen gerçek sayfa oturum yüklemeleri' : 'Actual page views registered during the current calendar date'}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-white to-rose-50/20 border border-zinc-150 rounded-2xl p-5 shadow-sm space-y-2">
                        <span className="text-[10px] font-mono font-bold text-zinc-400 block tracking-wider uppercase">
                          {lang === 'TR' ? 'KÜMÜLATİF OTURUMLAR' : 'CUMULATIVE SESSION HITS'}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-2xl font-extrabold text-zinc-900">{totalVisits}</span>
                          <span className="text-[10px] font-mono font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">+100% REAL</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-sans">
                          {lang === 'TR' ? 'Platformun yayına girdiğinden beri aldığı toplam gerçek sayfa gösterimleri' : 'Total unique browser tracking sessions logged by local storage store'}
                        </p>
                      </div>

                      <div className="bg-gradient-to-br from-white to-rose-50/20 border border-zinc-150 rounded-2xl p-5 shadow-sm space-y-2">
                        <span className="text-[10px] font-mono font-bold text-zinc-400 block tracking-wider uppercase">
                          {lang === 'TR' ? 'BÖLGESEL COĞRAFYA' : 'REGIONAL COORDINATES'}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-2xl font-extrabold text-zinc-900">{cityItems.filter(c => c.count > 0).length || 1}</span>
                          <span className="text-[10px] font-mono font-bold text-primary bg-rose-50 px-1.5 py-0.5 rounded-full">{lang === 'TR' ? 'Şehir' : 'Cities'}</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-sans">
                          {lang === 'TR' ? 'Platformu tıklayan ziyaretçilerin yayıldığı aktif lokasyonlar' : 'Unique cities generated from incoming user language preferences'}
                        </p>
                      </div>
                    </div>

                    {/* Heatmap and Traffic Sources Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      
                      {/* Heatmap Section */}
                      <div className="bg-white border border-zinc-150 rounded-2xl p-6 shadow-sm space-y-4">
                        <div>
                          <h4 className="font-display font-medium text-sm text-zinc-800 flex items-center gap-1.5">
                            <Map className="w-4 h-4 text-primary" />
                            <span>{lang === 'TR' ? 'Bölgesel Trafik Yoğunluğu' : 'Geographical Traffic Origin Distribution'}</span>
                          </h4>
                          <p className="text-zinc-500 text-[10px] font-sans">
                            {lang === 'TR' ? 'Web sitesi hitlerinin coğrafi koordinat analiz dağılımı' : 'Geographical coordinates distribution of web sessions'}
                          </p>
                        </div>

                        {/* Styled Visual SVG Mock Heatmap Graphic */}
                        <div className="relative w-full aspect-[2/1] rounded-xl bg-zinc-50 border border-zinc-100 p-2 flex items-center justify-center overflow-hidden">
                          
                          <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 50">
                            <rect width="100" height="50" fill="none" />
                            <circle cx="10" cy="15" r="1" fill="currentColor" />
                            <circle cx="20" cy="25" r="1.5" fill="currentColor" />
                            <circle cx="35" cy="12" r="1" fill="currentColor" />
                            <circle cx="50" cy="22" r="2" fill="currentColor" />
                            <circle cx="58" cy="18" r="1.5" fill="currentColor" />
                            <circle cx="70" cy="30" r="1.2" fill="currentColor" />
                            <circle cx="85" cy="20" r="1" fill="currentColor" />
                            <circle cx="90" cy="40" r="1.5" fill="currentColor" />
                            <circle cx="62" cy="18" r="2.5" fill="currentColor" />
                          </svg>

                          <div className="relative w-full h-full">
                            
                            {/* Pulsing Turkey Point */}
                            <div className="absolute top-[36%] left-[62%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                              <span className="absolute inline-flex h-6 w-6 rounded-full bg-primary/30 animate-ping opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-zinc-900 text-white text-[8px] font-semibold px-1 py-0.5 rounded shadow pointer-events-none">istanbul %{istanbulPct}</span>
                            </div>

                            {/* London Point */}
                            {londonPct > 0 && (
                              <div className="absolute top-[28%] left-[48%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center animate-pulse">
                                <span className="absolute inline-flex h-4 w-4 rounded-full bg-rose-400/20 animate-ping opacity-50"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-zinc-900 text-white text-[8px] font-semibold px-1 py-0.5 rounded shadow pointer-events-none">London %{londonPct}</span>
                              </div>
                            )}

                            {/* Berlin Point */}
                            {berlinPct > 0 && (
                              <div className="absolute top-[30%] left-[54%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-zinc-900 text-white text-[8px] font-semibold px-1 py-0.5 rounded shadow pointer-events-none">Berlin %{berlinPct}</span>
                              </div>
                            )}

                            {/* Amsterdam Point */}
                            {amsterdamPct > 0 && (
                              <div className="absolute top-[32%] left-[44%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-zinc-900 text-white text-[8px] font-semibold px-1 py-0.5 rounded shadow pointer-events-none">Amsterdam %{amsterdamPct}</span>
                              </div>
                            )}

                          </div>
                        </div>

                        {/* Locations lists ranked */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                            <span>{lang === 'TR' ? 'ŞEHİR / BÖLGE' : 'CITY / REGION'}</span>
                            <span>{lang === 'TR' ? 'TRAFİK ORANI (%)' : 'TRAFFIC SHARE (%)'}</span>
                          </div>
                          <div className="space-y-1.5">
                            {cityItems.map((c, i) => (
                              <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-zinc-50 border border-zinc-100 text-xs text-zinc-700">
                                <span className="font-semibold">{c.flag} {c.name}</span>
                                <span className={`font-mono px-2 py-0.5 rounded font-extrabold ${i === 0 ? 'bg-primary/10 text-primary' : 'bg-zinc-200/60 text-zinc-800'}`}>
                                  %{c.pct} <span className="text-[9px] font-normal font-sans text-zinc-400">({c.count})</span>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Referrals section (highest to lowest) */}
                      <div className="bg-white border border-zinc-150 rounded-2xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                        <div>
                          <h4 className="font-display font-medium text-sm text-zinc-800 flex items-center gap-1.5">
                            <Link className="w-4 h-4 text-primary" />
                            <span>{lang === 'TR' ? 'Trafik Referans Siteleri' : 'Referrer Traffic Sources'}</span>
                          </h4>
                          <p className="text-zinc-500 text-[10px] font-sans">
                            {lang === 'TR' ? 'Ziyaretçilerin Booseberg sitesine yönlendirildiği ana kaynaklar' : 'Primary referral domains generating incoming clickthroughs'}
                          </p>
                        </div>

                        {/* Rank Referral sources */}
                        <div className="space-y-3.5 flex-grow pt-4">
                          {referralItems.map((ref, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-medium text-zinc-800">
                                  {idx + 1}. {ref.name} <span className="text-[10px] text-zinc-400 font-sans tracking-wide">({ref.label})</span>
                                </span>
                                <span className="font-mono font-bold text-zinc-700">%{ref.pct} <span className="text-[10px] text-zinc-400">({ref.count})</span></span>
                              </div>
                              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                                <div className={`${ref.color} h-full rounded-full transition-all duration-300`} style={{ width: `${ref.pct || 1}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-zinc-100 text-[10px] text-zinc-400 text-center font-sans tracking-wide">
                          {lang === 'TR' ? 'Trafik kaynakları ziyaretçilerin document.referrer verileriyle anlık toplanır.' : 'Referrer stats dynamically captured on unique session mounts.'}
                        </div>

                      </div>

                    </div>
                  </div>
                )}

                {/* 5.2 TALENTS TRAFFIC SUBTAB */}
                {analyticsSubTab === 'talents' && (
                  <div className="space-y-6">
                    {/* Talents Performance Cards summary */}
                    <div className="bg-white border border-zinc-150 rounded-2xl p-5 shadow-sm space-y-4">
                      <div>
                        <h4 className="font-display font-medium text-sm text-zinc-800">
                          {lang === 'TR' ? 'Yetenek Kartlarının Trafik Gösterimleri (Tıklanma Raporu)' : 'Talent Cards Traffic & Impressions Audits'}
                        </h4>
                        <p className="text-zinc-500 text-[10px] font-sans">
                          {lang === 'TR' ? 'Hangi yetenek profilinin ne kadar tekil izleyici trafiği aldığının anlık dökümü' : 'Detailed analytics report mapping visitors interest of representation profiles'}
                        </p>
                      </div>

                      {talents.length === 0 ? (
                        <div className="text-center py-8 text-zinc-400 text-xs bg-zinc-50 border border-zinc-100 rounded-xl">
                          {lang === 'TR' ? 'Trafiği ölçülecek kayıtlı yetenek bulunmuyor.' : 'No talents registered to monitor tracking metrics.'}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {(() => {
                            const processedTalents = talents.map(t => {
                              const views = stats.talentViews?.[t.id] || 0;
                              return { ...t, views };
                            });

                            // Sort tallest to lowest
                            const sortedTotal = [...processedTalents].sort((a, b) => b.views - a.views);
                            const maxViews = Math.max(...sortedTotal.map(t => t.views), 1);

                            return (
                              <div className="space-y-4">
                                {sortedTotal.map((t, idx) => {
                                  const percentage = Math.round((t.views / maxViews) * 100);
                                  return (
                                    <div key={t.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 bg-zinc-50 border border-zinc-100 rounded-xl gap-4 hover:shadow-sm hover:bg-white hover:border-zinc-200 transition-all">
                                      <div className="flex items-center gap-3 w-full sm:w-1/3">
                                        <div className="font-mono text-zinc-400 text-xs font-bold w-4">{idx + 1}.</div>
                                        <img src={t.image} className="w-10 h-12 object-cover rounded-md border border-zinc-200 flex-shrink-0" />
                                        <div className="overflow-hidden">
                                          <h5 className="font-display font-bold text-xs text-zinc-800 truncate">{t.name}</h5>
                                          <span className="inline-block text-[8px] font-bold text-zinc-500 bg-zinc-100 uppercase px-1.5 py-0.5 rounded mt-0.5 tracking-wider">
                                            {categories.find(c => c.id === t.category)?.labelTR || t.category}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Progress view */}
                                      <div className="w-full sm:flex-grow">
                                        <div className="w-full bg-zinc-200 h-2.5 rounded-full overflow-hidden">
                                          <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
                                        </div>
                                      </div>

                                      {/* Hits numbers */}
                                      <div className="w-full sm:w-28 text-right flex sm:block justify-between items-center bg-white sm:bg-transparent px-2.5 py-1 rounded sm:p-0">
                                        <span className="text-[10px] text-zinc-400 sm:hidden block">{lang === 'TR' ? 'Görüntülenme' : 'Impressions'}</span>
                                        <div>
                                          <span className="font-mono font-extrabold text-sm text-zinc-900">{t.views.toLocaleString()}</span>
                                          <span className="text-[10px] font-sans font-semibold text-zinc-400 block">{lang === 'TR' ? 'izleyici (tıklanma)' : 'visitors (clicks)'}</span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* 6. DECOUPLED HARNESS ADDONS FOR LEADS, SEO AND MANAGERS */}
          {(activeSubTab === 'contact_leads' || activeSubTab === 'seo_tools' || activeSubTab === 'managers') && (
            <AdminHubAddons
              lang={lang}
              activeSubTab={activeSubTab}
              leads={leads}
              setLeadsState={setLeadsState}
              currentUser={currentUser}
              showNotification={showNotification}
              contactEmail={contactEmail}
            />
          )}

        </main>
      </div>
    </div>
  );
}
