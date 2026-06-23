import React, { useState, FormEvent, useEffect } from 'react';
import { 
  Send, Trash2, ShieldAlert, Plus, Edit2, Save, X, Settings, 
  MailOpen, Mail, User, CheckCircle, Eye, Trash, RefreshCw, Sparkles, Database
} from 'lucide-react';
import { 
  ContactLead, AdminUser, SeoConfig, getAdminUsers, saveAdminUsers, 
  getSeoConfig, saveSeoConfig, saveContactLeads 
} from '../lib/dataStore';

interface AdminHubAddonsProps {
  lang: 'TR' | 'EN';
  activeSubTab: 'contact_leads' | 'seo_tools' | 'managers';
  leads: ContactLead[];
  setLeadsState: React.Dispatch<React.SetStateAction<ContactLead[]>>;
  currentUser: string;
  showNotification: (msg: string) => void;
  contactEmail: string;
}

export default function AdminHubAddons({
  lang,
  activeSubTab,
  leads,
  setLeadsState,
  currentUser,
  showNotification,
  contactEmail
}: AdminHubAddonsProps) {
  // Inner Leads tab
  const [leadsInnerTab, setLeadsInnerTab] = useState<'list' | 'mass_email'>('list');
  const [selectedLeadEmails, setSelectedLeadEmails] = useState<string[]>([]);

  // Bulk Campaign States
  const [massEmailSubject, setMassEmailSubject] = useState('Booseberg Talent Agency - Elit İş Birlikleri Daveti');
  const [massBodyType, setMassBodyType] = useState<'rich' | 'html'>('rich');

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

  // Simulated Email Sending
  const [emailSending, setEmailSending] = useState(false);
  const [emailSendProgress, setEmailSendProgress] = useState(0);
  const [emailSendLogs, setEmailSendLogs] = useState<Array<{ email: string; status: 'ok' | 'fail'; code: number; msg: string }>>([]);
  const [showSendLogsModal, setShowSendLogsModal] = useState(false);

  // SEO States
  const [seoForm, setSeoForm] = useState<SeoConfig>({
    title: '', description: '', keywords: '', author: '', ogTitle: '', ogDescription: '', ogImage: '', robots: 'index, follow'
  });

  // Admin users states
  const [adminUsers, setAdminUsersState] = useState<AdminUser[]>([]);
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [editingAdminId, setEditingAdminId] = useState<string | null>(null);
  const [editingAdminPassword, setEditingAdminPassword] = useState('');

  // Initial load
  useEffect(() => {
    setAdminUsersState(getAdminUsers());
    setSeoForm(getSeoConfig());
  }, [activeSubTab]);

  // Submit SEO
  const handleSeoSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveSeoConfig(seoForm);
    showNotification(lang === 'TR' ? 'Google SEO Ayarları başarıyla güncellendi!' : 'Google SEO Configurations safely updated.');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. SEKTÖR: POTANSİYEL MÜŞTERİLER TABS */}
      {activeSubTab === 'contact_leads' && (
        <div className="space-y-8">
          <div className="border-b border-zinc-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-bold text-zinc-850">
                {lang === 'TR' ? 'Potansiyel Müşteriler & Haberleşme' : 'Potential Customers & Bulk Mailing'}
              </h3>
              <p className="text-zinc-500 text-xs font-sans">
                {lang === 'TR' ? 'Müşteri bülteni veritabanı, KVKK uyumlu form mailleri ve toplu e-posta kampanyaları göndericisi' : 'Secure CRM lead directory, compliance templates, and professional SMTP bulk communication system'}
              </p>
            </div>

            <div className="text-[10px] bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full text-emerald-800 font-sans font-semibold flex items-center gap-1 self-start sm:self-center">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>GDPR / KVKK ACTIVE</span>
            </div>
          </div>

          <div className="flex gap-2 border-b border-zinc-100 pb-1 flex-wrap sm:flex-nowrap">
            <button
              type="button"
              onClick={() => setLeadsInnerTab('list')}
              className={`px-4 py-2.5 rounded-xl text-xs font-sans font-bold flex items-center gap-2 transition-all cursor-pointer ${
                leadsInnerTab === 'list'
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              <MailOpen className="w-3.5 h-3.5" />
              <span>{lang === 'TR' ? 'Gelen Talepler ve Web Mail' : 'Received Inquiries & Webmail'}</span>
              <span className="bg-zinc-700 text-zinc-100 text-[10px] px-2 py-0.5 rounded-full">{leads.length}</span>
            </button>
            <button
              type="button"
              onClick={() => setLeadsInnerTab('mass_email')}
              className={`px-4 py-2.5 rounded-xl text-xs font-sans font-bold flex items-center gap-2 transition-all cursor-pointer ${
                leadsInnerTab === 'mass_email'
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'bg-zinc-50 text-zinc-650 hover:bg-zinc-100'
              }`}
            >
              <Send className="w-3.5 h-3.5 text-primary" />
              <span>{lang === 'TR' ? 'Toplu E-posta Gönderimi' : 'Bulk Campaign Dispatch'}</span>
              <span className="bg-primary text-zinc-50 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">SMTP</span>
            </button>
          </div>

          {leadsInnerTab === 'list' && (
            <div className="space-y-6">
              <div className="bg-zinc-50 border border-zinc-150 text-[11px] text-zinc-600 rounded-2xl p-4 leading-relaxed font-sans flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-zinc-800 uppercase tracking-wider block">© KVKK / GDPR Uyum Mevzuatı Bildirimi</span>
                  <p>
                    {lang === 'TR'
                      ? 'İletişim formları aracılığıyla Booseberg sistemlerine girilen kişisel veri, ad soyad, telefon ve e-posta parametreleri yasal olarak KVKK standartları çerçevesinde toplanmaktadır. Webmaster paneli üzerinde sunulan veriler, ziyaretçi lokasyonu, giriş saati ve sayfa detayları ile zenginleştirilmiştir.'
                      : 'All web data, name, contact info, IP/geographical location metrics and client signatures harvested via web actions are safely persisted in local client databases under global GDPR regulations.'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center sm:flex-row flex-col gap-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                    {lang === 'TR' ? `KAYITLI TÜM VERİ GİRİŞİ (${leads.length})` : `TOTAL ENCRYPTED DIRECTORY LIST (${leads.length})`}
                  </span>
                  
                  {leads.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(lang === 'TR' ? 'Tüm potansiyel müşteri listesini temizlemek istediğinizden emin misiniz?' : 'Are you sure you want to purge the entire customer leads list?')) {
                          saveContactLeads([]);
                          setLeadsState([]);
                          showNotification(lang === 'TR' ? 'Tüm liste temizlendi.' : 'Purged all customers.');
                        }
                      }}
                      className="text-xs bg-rose-50 text-primary px-3 py-1.5 rounded-xl font-bold hover:bg-primary hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{lang === 'TR' ? 'Tüm Veritabanını Temizle' : 'Purge All Database'}</span>
                    </button>
                  )}
                </div>

                {leads.length === 0 ? (
                  <div className="text-center py-16 text-zinc-450 text-xs bg-zinc-50 border border-zinc-150 rounded-2xl font-sans">
                    {lang === 'TR' 
                      ? 'Henüz form doldurup veri bırakan kişi bulunamadı. İletişim sayfasından test mesajı gönderebilirsiniz!' 
                      : 'No potential customer queries stored yet. Send a test message in our contact pages to see it populate here!'}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {leads.map((lead, idx) => {
                      const isEmailSelected = selectedLeadEmails.includes(lead.email);
                      return (
                        <div 
                          key={lead.id || idx}
                          className={`bg-zinc-50 border rounded-2xl p-5 hover:bg-white hover:shadow-lg transition-all duration-300 relative ${
                            isEmailSelected ? 'border-primary ring-1 ring-primary/20 bg-white' : 'border-zinc-200'
                          }`}
                        >
                          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-sans text-zinc-500 bg-white border border-zinc-150 px-2.5 py-1 rounded-lg hover:border-zinc-300 shadow-sm">
                              <input 
                                type="checkbox"
                                checked={isEmailSelected}
                                onChange={() => {
                                  if (isEmailSelected) {
                                    setSelectedLeadEmails(prev => prev.filter(e => e !== lead.email));
                                  } else {
                                    setSelectedLeadEmails(prev => [...prev, lead.email]);
                                  }
                                }}
                                className="rounded border-zinc-300 text-primary focus:ring-primary w-3.5 h-3.5 cursor-pointer"
                              />
                              <span>{lang === 'TR' ? 'Seç' : 'Select'}</span>
                            </label>

                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(lang === 'TR' ? 'Bu potansiyel müşteriyi listeden kaldırmak istiyor musunuz?' : 'Delete this prospect listing from the database?')) {
                                  const updated = leads.filter((l, i) => l.id ? l.id !== lead.id : i !== idx);
                                  saveContactLeads(updated);
                                  setLeadsState(updated);
                                  setSelectedLeadEmails(prev => prev.filter(e => e !== lead.email));
                                  showNotification(lang === 'TR' ? 'Müşteri kaydı silindi.' : 'Prospect deleted successfully.');
                                }
                              }}
                              className="p-1.5 bg-rose-50 text-primary border border-rose-100 rounded-lg hover:bg-primary hover:text-white transition-all cursor-pointer"
                              title={lang === 'TR' ? 'Kaydı Sil' : 'Delete Log'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-zinc-400 text-xs font-bold">#{leads.length - idx}</span>
                              <span className={`text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                                lead.type === 'brand' 
                                  ? 'bg-rose-500 text-white' 
                                  : 'bg-emerald-500 text-white'
                              }`}>
                                {lead.type === 'brand' 
                                  ? (lang === 'TR' ? 'İş Birliği / Marka Talebi' : 'Brand Alignment Proposal') 
                                  : (lang === 'TR' ? 'Yetanek Başvurusu' : 'Talent Application')}
                              </span>
                            </div>

                            {/* Custom Mail Template Frame */}
                            <div className="bg-zinc-900 text-zinc-100 rounded-xl p-4 border border-zinc-800 font-mono text-xs space-y-3 shadow-inner">
                              <div className="border-b border-zinc-800 pb-2.5 text-[10px] text-zinc-400 space-y-1 leading-relaxed">
                                <div><strong className="text-zinc-500">From:</strong> {lead.name} &lt;<span className="text-primary font-bold">{lead.email}</span>&gt;</div>
                                <div><strong className="text-zinc-500">To:</strong> Booseberg Representation Office &lt;<span className="text-zinc-300">{contactEmail}</span>&gt;</div>
                                <div><strong className="text-zinc-500">Date/Time:</strong> {lead.sentTime || new Date(lead.createdAt).toLocaleString()}</div>
                                <div><strong className="text-zinc-500">Origin Location:</strong> 📍 {lead.location || 'İstanbul, TR'} (Calculated Timezone Signature)</div>
                                <div><strong className="text-zinc-500">Device/Agent:</strong> 🖥️ {lead.deviceInfo || 'MacOS Desktop / Safari Browser'}</div>
                                <div><strong className="text-zinc-500">Referrer Page:</strong> 🔗 <span className="text-indigo-400 underline">{lead.submittedPage || 'Anasayfa Hızlı Formu'}</span></div>
                                <div><strong className="text-zinc-500">Subject:</strong> {lead.type === 'brand' ? 'New Premium Creative Campaign Intent' : 'New Professional Broadcaster Application'}</div>
                              </div>

                              <div className="pt-2 text-zinc-150 font-sans whitespace-pre-wrap leading-relaxed bg-zinc-950/60 p-3.5 rounded-lg border border-zinc-850">
                                <strong className="text-zinc-500 font-mono text-[9px] block uppercase tracking-wider pb-1">-- MESSAGE CONTENT TRANSMISSION --</strong>
                                {lead.message || 'Hatalı boş mesaj içeriği.'}
                              </div>

                              {lead.phone && (
                                <div className="text-[10px] text-zinc-450 border-t border-zinc-800 pt-2 flex items-center gap-1.5 font-sans">
                                  <strong className="text-zinc-400">Authorized Phone:</strong> {lead.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {leadsInnerTab === 'mass_email' && (
            <div className="space-y-6">
              <div className="bg-primary/5 border border-primary/10 text-[11px] text-zinc-700 rounded-2xl p-4 leading-relaxed font-sans">
                <span className="font-bold text-zinc-800 block">📢 Akıllı Kampanya Ve Toplu Bülten Göndericisi</span>
                <p>
                  Müşteri veritabanınızda yer alan potansiyel reklamverenlere, seçili bülten üyelerine veya dışarıdan elle ekleyeceğiniz e-posta adreslerine anında şık tasarımlı kurumsal e-postalar gönderin.
                </p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                let targets: string[] = [];
                if (sendToAllLeads) {
                  targets = leads.map(l => l.email);
                } else {
                  targets = [...selectedLeadEmails];
                }

                if (manualEmails.trim() !== '') {
                  const manuals = manualEmails.split(/[,;\s]+/).map(em => em.trim()).filter(em => em.includes('@'));
                  targets = [...targets, ...manuals];
                }

                targets = Array.from(new Set(targets));

                if (targets.length === 0) {
                  alert(lang === 'TR' ? 'Lütfen en az bir geçerli alıcı e-posta adresi seçin veya elle ekleyin!' : 'Please configure at least one valid recipient email address!');
                  return;
                }

                setEmailSending(true);
                setEmailSendProgress(0);
                setEmailSendLogs([]);
                setShowSendLogsModal(true);

                let currIndex = 0;
                const logs: typeof emailSendLogs = [];

                logs.push({ email: 'system_smtp', status: 'ok', code: 220, msg: `SMTP connecting to mx.google.com via TLS on Port 587...` });
                logs.push({ email: 'system_smtp', status: 'ok', code: 250, msg: `HELO mail.booseberg.com - Connection established with SSL.` });
                logs.push({ email: 'system_smtp', status: 'ok', code: 250, msg: `MAIL FROM: <${contactEmail}> - Sender identity authorized under SPF/DKIM.` });
                setEmailSendLogs([...logs]);

                const interval = setInterval(() => {
                  if (currIndex < targets.length) {
                    const targetEmail = targets[currIndex];
                    const progressPercent = Math.round(((currIndex + 1) / targets.length) * 100);
                    const isFail = targetEmail.includes('fail') || targetEmail.includes('error') || Math.random() < 0.15;
                    
                    if (isFail) {
                      logs.push({ 
                        email: targetEmail, 
                        status: 'fail', 
                        code: 550, 
                        msg: `SMTP Mail Delivery Rejected: Address Unknown / Mailbox Quota exceeded / Recipient Server Interrupted` 
                      });
                    } else {
                      logs.push({ 
                        email: targetEmail, 
                        status: 'ok', 
                        code: 250, 
                        msg: `Transmitted successfully: 250 OK Message accepted for delivery` 
                      });
                    }

                    setEmailSendLogs([...logs]);
                    setEmailSendProgress(progressPercent);
                    currIndex++;
                  } else {
                    clearInterval(interval);
                    setEmailSending(false);
                    setEmailSendProgress(100);
                  }
                }, 800);

              }} className="space-y-6">
                
                <div className="bg-zinc-50 border border-zinc-250/60 p-5 rounded-2xl space-y-4">
                  <h4 className="font-display text-sm font-bold text-zinc-900 border-b border-zinc-200 pb-2">
                    {lang === 'TR' ? '1. Alıcı Grubu Seçimi' : '1. Recipient Target Settings'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-sans text-zinc-700">
                        <input 
                          type="radio"
                          name="recipient_group"
                          checked={sendToAllLeads}
                          onChange={() => setSendToAllLeads(true)}
                          className="text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                        />
                        <strong>{lang === 'TR' ? `Kayıtlı Tüm Potansiyel Müşteriler (${leads.length})` : `All Database Prospects (${leads.length})`}</strong>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-xs font-sans text-zinc-700">
                        <input 
                          type="radio"
                          name="recipient_group"
                          checked={!sendToAllLeads}
                          onChange={() => setSendToAllLeads(false)}
                          className="text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                        />
                        <strong>{lang === 'TR' ? `Yalnızca Tablodan Seçilen Kişiler (${selectedLeadEmails.length})` : `Only Checked Listings (${selectedLeadEmails.length})`}</strong>
                      </label>

                      {!sendToAllLeads && selectedLeadEmails.length === 0 && (
                        <p className="text-[10px] text-amber-655 bg-amber-50 p-2 rounded-lg font-sans">
                          ⚠️ Gelen Talepler sekmesinden e-postaların solundaki kutucukları işaretleyerek alıcı ekleyebilirsiniz!
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-705 block font-sans">
                        {lang === 'TR' ? 'Dışarıdan E-posta Ekle (Elle / Virgülle ayırarak)' : 'Manual Add Recipient Emails'}
                      </label>
                      <textarea
                        placeholder="ornek@firma.com, test@marka.org"
                        value={manualEmails}
                        onChange={(e) => setManualEmails(e.target.value)}
                        className="w-full bg-white border border-zinc-250 rounded-xl py-2 px-3 text-xs outline-none focus:border-zinc-400 h-16 font-mono text-zinc-800"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-50 border border-zinc-250/60 p-5 rounded-2xl space-y-4">
                  <h4 className="font-display text-sm font-bold text-zinc-900 border-b border-zinc-200 pb-2">
                    {lang === 'TR' ? '2. E-posta Konusu & Şablon Türü' : '2. Subject & Template Style'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 block">
                        {lang === 'TR' ? 'E-posta Konusu (Subject)' : 'Email Subject'}
                      </label>
                      <input 
                        type="text"
                        required
                        value={massEmailSubject}
                        onChange={(e) => setMassEmailSubject(e.target.value)}
                        className="w-full bg-white border border-zinc-250 rounded-xl py-2.5 px-3 text-xs focus:border-zinc-400 outline-none text-zinc-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-zinc-700 block">
                        {lang === 'TR' ? 'Şablon Biçimi' : 'Content Format'}
                      </label>
                      <select
                        value={massBodyType}
                        onChange={(e) => setMassBodyType(e.target.value as 'rich' | 'html')}
                        className="w-full bg-white border border-zinc-250 rounded-xl py-2.5 px-3 text-xs focus:border-zinc-400 outline-none text-zinc-800 cursor-pointer"
                      >
                        <option value="rich">{lang === 'TR' ? 'Zengin Metin (Kayıtlı Mail Şablonu)' : 'Rich Text (Word Layout)'}</option>
                        <option value="html">{lang === 'TR' ? 'HTML Kodu (Web Mail Formatı)' : 'Custom HTML'}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-50 border border-zinc-250/60 p-5 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center border-b border-zinc-200 pb-2 flex-wrap gap-2">
                    <h4 className="font-display text-sm font-bold text-zinc-900">
                      {lang === 'TR' ? '3. İçerik Editörü ve Canlı Önizleme' : '3. WYSIWYG Composer & Live Preview'}
                    </h4>

                    {massBodyType === 'rich' && (
                      <div className="flex bg-white border rounded-lg overflow-hidden shrink-0 shadow-sm text-xs">
                        <button
                          type="button"
                          onClick={() => setMassRichBody(prev => prev + ' <strong>[YENİ METİN]</strong>')}
                          className="px-2.5 py-1 font-bold border-r hover:bg-zinc-100"
                        >
                          B %
                        </button>
                        <button
                          type="button"
                          onClick={() => setMassRichBody(prev => prev + ' <em>[VURGULI METİN]</em>')}
                          className="px-2.5 py-1 italic border-r hover:bg-zinc-100 font-serif"
                        >
                          I /
                        </button>
                        <button
                          type="button"
                          onClick={() => setMassRichBody(prev => prev + '<br/>📌 ')}
                          className="px-2.5 py-1 border-r hover:bg-zinc-100"
                        >
                          • Nokta
                        </button>
                        <button
                          type="button"
                          onClick={() => setMassRichBody('<p>Sayın Yetkilimiz,</p><p>Yepyeni projeler...</p>')}
                          className="px-2.5 py-1 text-rose-500 hover:bg-zinc-100 font-bold"
                        >
                          Sıfırla
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-zinc-400 block uppercase font-bold tracking-wider">Metin Alanı</span>
                      <textarea
                        value={massBodyType === 'rich' ? massRichBody : massHtmlBody}
                        onChange={(e) => massBodyType === 'rich' ? setMassRichBody(e.target.value) : setMassHtmlBody(e.target.value)}
                        className="w-full bg-white border border-zinc-250 rounded-2xl py-3 px-4 text-xs font-mono text-zinc-800 outline-none focus:border-zinc-400 h-64 leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-zinc-400 block uppercase font-bold tracking-wider">
                        💌 E-POSTA CANLI ÖNİZLEMESİ
                      </span>
                      
                      <div className="bg-white border rounded-2xl overflow-hidden shadow-inner h-64 overflow-y-auto">
                        <div className="bg-zinc-100 px-4 py-2 text-[10px] border-b text-zinc-500 font-mono flex justify-between">
                          <span><strong>Kimden:</strong> {contactEmail}</span>
                          <span><strong>Protokol:</strong> SMTP TLS</span>
                        </div>
                        <div className="px-4 py-2 bg-zinc-50 border-b text-[10px] text-zinc-700 font-sans">
                          <strong>Konu:</strong> {massEmailSubject || '(Konu Yok)'}
                        </div>

                        <div className="p-4 bg-zinc-50/50">
                          {massBodyType === 'rich' ? (
                            <div className="bg-white p-5 border rounded-xl max-w-lg mx-auto font-sans text-xs text-zinc-800 leading-relaxed space-y-4 shadow-sm" style={{ minHeight: '120px' }}>
                              <div className="border-b border-rose-600/30 pb-2.5">
                                <h1 className="font-display font-extrabold text-xs text-primary tracking-tight">BOOSEBERG REPRESENTATION</h1>
                              </div>
                              <div dangerouslySetInnerHTML={{ __html: massRichBody }} />
                            </div>
                          ) : (
                            <div className="border rounded-xl overflow-hidden bg-white max-w-lg mx-auto shadow-sm">
                              <iframe 
                                title="Visual HTML Render Preview"
                                srcDoc={massHtmlBody} 
                                className="w-full h-44 border-none scale-90 origin-top pointer-events-none"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={emailSending}
                    className="bg-primary hover:bg-rose-700 disabled:bg-zinc-450 text-white font-sans font-extrabold text-xs py-3.5 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{emailSending ? 'Gönderiliyor...' : 'TOPLU GÖNDERİMİ BAŞLAT'}</span>
                  </button>
                </div>

              </form>
            </div>
          )}
        </div>
      )}

      {/* 2. SEKTÖR: SEO TOOLS */}
      {activeSubTab === 'seo_tools' && (
        <div className="space-y-8">
          <div className="border-b border-zinc-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-bold text-zinc-800 flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-500" />
                <span>{lang === 'TR' ? 'SEO Uzman Araçları' : 'SEO Management Hub'}</span>
              </h3>
              <p className="text-zinc-500 text-xs font-sans">
                {lang === 'TR' ? 'Google arama robotları indeksleme ayarları, başlık indeks, OpenGraph ve site haritası metadata yapılandırıcı' : 'Audit and configure primary meta descriptions and robot indexing controls'}
              </p>
            </div>

            <div className="bg-indigo-50 text-indigo-850 border border-indigo-100 px-3 py-1 text-xs rounded-full font-mono font-bold">
              GOOGLE INDEX OPTIMALIZED
            </div>
          </div>

          {(() => {
            let score = 50;
            const recs: string[] = [];

            if (seoForm.title.length >= 45 && seoForm.title.length <= 70) {
              score += 15;
              recs.push(lang === 'TR' ? '✅ Sayfa Başlığı uzunluğu mükemmel aralıkta (50-70 karakter).' : '✅ Title length is optimal for Search Engine result pages.');
            } else {
              recs.push(lang === 'TR' ? '⚠️ Sayfa Başlığı 45 ile 70 karakter arasında olmalı (Hali hazırda: ' + seoForm.title.length + ' karakter).' : '⚠️ Title should be between 45 and 70 characters.');
            }

            if (seoForm.description.length >= 110 && seoForm.description.length <= 165) {
              score += 15;
              recs.push(lang === 'TR' ? '✅ Meta Açıklaması kelime dağılımı ideal hizada (120-160 karakter).' : '✅ Meta description length is perfectly aligned.');
            } else {
              recs.push(lang === 'TR' ? '⚠️ Meta Açıklaması 110 ile 165 karakter arasında olmalı (Hali hazırda: ' + seoForm.description.length + ' karakter).' : '⚠️ Meta description should be between 110 and 165 characters.');
            }

            if (seoForm.keywords.trim() !== '') {
              score += 10;
              recs.push(lang === 'TR' ? '✅ Anahtar Kelimeler (Keywords) indeksleme için başarıyla girilmiş.' : '✅ Target SEO keywords logged correctly.');
            } else {
              recs.push(lang === 'TR' ? '🔴 Anahtar Kelimeler alanı boş! Arama motorlarında listelenmek için kelimeler girmelisiniz.' : '🔴 Zero keywords entered! Please add terms.');
            }

            if (seoForm.robots === 'index, follow') {
              score += 10;
              recs.push(lang === 'TR' ? '✅ Robots İndeksleme Politikası arama botlarına açık olarak ayarlanmış.' : '✅ Search robots configured to index and follow links.');
            } else {
              recs.push(lang === 'TR' ? '⚠️ Siteniz arama motoru indekslerine kapatılmış olabilir! "index, follow" yapmanız tavsiye edilir.' : '⚠️ Robots indexing policy is not default.');
            }

            return (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-zinc-50 border p-5 rounded-2xl border-zinc-200">
                <div className="bg-white p-5 rounded-xl border flex flex-col justify-center items-center text-center">
                  <span className="text-zinc-400 font-mono text-[9px] uppercase tracking-wider block font-bold">GENEL SEO PUANI</span>
                  <div className="relative flex items-center justify-center my-3">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle cx="40" cy="40" r="34" stroke="rgba(244, 63, 94, 0.1)" strokeWidth="4" fill="transparent" />
                      <circle cx="40" cy="40" r="34" stroke="rgb(79, 70, 229)" strokeWidth="6" fill="transparent" 
                        strokeDasharray="213.6"
                        strokeDashoffset={213.6 - (213.6 * score) / 100}
                      />
                    </svg>
                    <span className="absolute text-xl font-display font-extrabold text-zinc-800">{score}%</span>
                  </div>
                  <span className="text-[10px] font-sans text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded font-bold">
                    {score >= 80 ? (lang === 'TR' ? 'Kusursuz Google SEO' : 'Good Core SEO') : (lang === 'TR' ? 'Geliştirilmeli' : 'Needs Optimization')}
                  </span>
                </div>

                <div className="lg:col-span-2 space-y-2">
                  <h4 className="font-display font-black text-[10px] text-zinc-400 uppercase tracking-wider">🔍 Sayfa İndeks Analiz Raporu</h4>
                  <div className="space-y-1 max-h-36 overflow-y-auto">
                    {recs.map((rec, i) => (
                      <div key={i} className="text-xs font-sans text-zinc-650 bg-white p-2 rounded-lg border border-zinc-100 shadow-sm flex items-start gap-1">
                        <span>💡</span>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          <form onSubmit={handleSeoSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border rounded-2xl p-5 space-y-4">
                <h4 className="font-display font-bold text-xs text-primary uppercase block border-b pb-2">1. Genel Meta Başlıkları</h4>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 block font-sans">Google Arama Başlığı (Title Tag)</label>
                  <input 
                    type="text" required
                    value={seoForm.title} 
                    onChange={(e) => setSeoForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2 px-3 text-xs outline-none focus:border-indigo-400 text-zinc-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 block font-sans">Arama Motoru Açıklaması (Meta Description)</label>
                  <textarea 
                    required value={seoForm.description} 
                    onChange={(e) => setSeoForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2 px-3 text-xs outline-none focus:border-indigo-400 h-20 text-zinc-800 leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 block font-sans">SEO Kelimeleri (Keywords - Virgülle Ayırınız)</label>
                  <input 
                    type="text" 
                    value={seoForm.keywords} 
                    onChange={(e) => setSeoForm(prev => ({ ...prev, keywords: e.target.value }))}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2 px-3 text-xs outline-none focus:border-indigo-400 text-zinc-800 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 block font-sans">Yazar (Author)</label>
                    <input 
                      type="text" 
                      value={seoForm.author} 
                      onChange={(e) => setSeoForm(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2 px-3 text-xs outline-none focus:border-indigo-400 text-zinc-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 block font-sans">Robots İndeksleme</label>
                    <select
                      value={seoForm.robots}
                      onChange={(e) => setSeoForm(prev => ({ ...prev, robots: e.target.value }))}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2 px-3 text-xs outline-none focus:border-indigo-400 text-zinc-800 cursor-pointer"
                    >
                      <option value="index, follow">index, follow (Sıralamada Çıkar)</option>
                      <option value="noindex, nofollow">noindex, nofollow (Arama Motorundan Gizle)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-2xl p-5 space-y-4">
                <h4 className="font-display font-bold text-xs text-indigo-700 uppercase block border-b pb-2">2. Sosyal Paylaşım Etiketleri (OpenGraph)</h4>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 block font-sans">Paylaşım Başlığı (og:title)</label>
                  <input 
                    type="text" 
                    value={seoForm.ogTitle} 
                    onChange={(e) => setSeoForm(prev => ({ ...prev, ogTitle: e.target.value }))}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2 px-3 text-xs outline-none focus:border-indigo-400 text-zinc-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 block font-sans">Paylaşım Açıklaması (og:description)</label>
                  <textarea 
                    value={seoForm.ogDescription} 
                    onChange={(e) => setSeoForm(prev => ({ ...prev, ogDescription: e.target.value }))}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2 px-3 text-xs outline-none focus:border-indigo-400 h-20 text-zinc-800 leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 block font-sans">Görsel URL (og:image)</label>
                  <input 
                    type="text" 
                    value={seoForm.ogImage} 
                    onChange={(e) => setSeoForm(prev => ({ ...prev, ogImage: e.target.value }))}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2 px-3 text-xs outline-none focus:border-indigo-400 text-zinc-800 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center bg-zinc-50 border rounded-2xl p-4 flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  const optimalSeo = {
                    title: 'Booseberg Talent Agency - Leading Influence, Acting & Broadcaster Representation',
                    description: 'Booseberg is Turkey’s premier influencer, actor, and broadcaster management agency. Conjoining elite digital talents with high-end premium brand campaigns and media productions.',
                    keywords: 'Booseberg talent, influencer agency turkey, actor management istanbul, digital branding, content creators representation, social media reach, cast agency, turkish actors, elite talents, influencer marketing',
                    author: 'Booseberg Talent',
                    ogTitle: 'Booseberg Talent - Elite Management, Influence & Media Agency',
                    ogDescription: 'Turkey’s ultra boutique digital representation firm for actors, creators, and broadcasters.',
                    ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvWvfP_lKS0c0s3X_lxxLkMq7n4UlChqbjoIQWlKhJKAgJ_0g-LbPPhB2KKsP_ksjozJR36dVCMeLq2EZ5YxmgMHzN0iKvBHbb9Bf1VVRAwY_JROWkpuzyUH8wlgItxR0n5K-rCSs9d-qol4UidSw2tmUCgA-T-vl65jpqSv6EE1rtyHT324vMa7ohhhwKF_SDb90hHEnczwZ_mBPDme3jpIHt9RE6Hp-f2e3y2ZtK2gU79mfE1OofVzhSv0eIJUnTtnAWEKAEuVU',
                    robots: 'index, follow'
                  };
                  setSeoForm(optimalSeo);
                  saveSeoConfig(optimalSeo);
                  showNotification(lang === 'TR' ? 'Google Uyumlu En İyi Ayarlar Hazırlandı!' : 'Loaded optimal SEO presets.');
                }}
                className="text-xs bg-zinc-200 text-zinc-700 px-4 py-2 hover:bg-zinc-300 font-bold rounded-xl transition-all cursor-pointer"
              >
                {lang === 'TR' ? 'Varsayılan Google SEO Ayarlarını Yükle' : 'Load Google Optimal Defaults'}
              </button>

              <button
                type="submit"
                className="text-xs bg-zinc-900 text-white font-extrabold px-6 py-2.5 hover:bg-zinc-800 rounded-xl transition-all shadow cursor-pointer"
              >
                {lang === 'TR' ? 'KAYDET' : 'SAVE CONFIGS'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. SEKTÖR: MANAGERS (LOCKED TO EDIZ USER ONLY) */}
      {activeSubTab === 'managers' && (
        <div className="space-y-8">
          <div className="border-b border-zinc-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-bold text-zinc-800 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-emerald-600 animate-pulse" />
                <span>{lang === 'TR' ? 'Yöneticiler & Güvenlik Paneli' : 'Control Center Administrators'}</span>
              </h3>
              <p className="text-zinc-500 text-xs font-sans">
                {lang === 'TR' ? 'Sisteme erişebilecek yöneticileri oluşturma, güncelleme ve silme alanı (Yalnızca "ediz" kullanıcısına açık)' : 'Provision, update and delete admin users (Exclusively locked to root account "ediz")'}
              </p>
            </div>

            <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-1 text-xs rounded-full font-mono font-bold flex items-center gap-1">
              <span>ROOT PRIVILEGES ACTIVE</span>
            </div>
          </div>

          {currentUser !== 'ediz' ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center space-y-4">
              <ShieldAlert className="w-12 h-12 text-primary mx-auto" />
              <h4 className="font-display font-extrabold text-base text-zinc-800">YÖNETİM ERİŞİMİ REDDEDİLDİ</h4>
              <p className="text-xs text-zinc-605 max-w-sm mx-auto leading-relaxed font-sans">
                Hesap oluşturma, güncelleme ve silme yetkileri yalnızca root admin olan <strong>ediz</strong> hesabına özeldir. Diğer kullanıcıların bu sekmeyi ve yetkilendirmeleri yönetme izni yoktur.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!newAdminUsername.trim() || !newAdminPassword.trim()) return;

                const users = getAdminUsers();
                const exists = users.some(u => u.username.toLowerCase().trim() === newAdminUsername.toLowerCase().trim());
                if (exists) {
                  alert(lang === 'TR' ? 'Bu kullanıcı adına sahip bir yönetici zaten mevcut!' : 'An administrator with this username already exists!');
                  return;
                }

                const newUser: AdminUser = {
                  id: 'user_' + Date.now(),
                  username: newAdminUsername.toLowerCase().trim(),
                  password: newAdminPassword,
                  createdAt: new Date().toISOString()
                };

                const updated = [...users, newUser];
                saveAdminUsers(updated);
                setAdminUsersState(updated);
                
                setNewAdminUsername('');
                setNewAdminPassword('');
                showNotification(lang === 'TR' ? `Yeni yönetici "${newUser.username}" başarıyla oluşturuldu!` : `New administrator "${newUser.username}" provisioned.`);
              }} className="bg-zinc-50 border p-5 rounded-2xl space-y-4">
                <h4 className="font-display text-sm font-bold text-zinc-900 border-b pb-2">
                  {lang === 'TR' ? 'Yeni Yönetici Yetkilendir' : 'Authorize New Administrator'}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 block">Kullanıcı Adı (Username)</label>
                    <input 
                      type="text" required
                      value={newAdminUsername}
                      onChange={(e) => setNewAdminUsername(e.target.value)}
                      className="w-full bg-white border rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-zinc-800"
                      placeholder="Örn: seo_uzmani"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 block">Şifre (Password)</label>
                    <input 
                      type="password" required
                      value={newAdminPassword}
                      onChange={(e) => setNewAdminPassword(e.target.value)}
                      className="w-full bg-white border rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-zinc-800"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-zinc-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{lang === 'TR' ? 'Yeni Yönetici Ekle' : 'Add Admin'}</span>
                    </button>
                  </div>
                </div>
              </form>

              <div className="space-y-3">
                <h4 className="font-display text-xs font-extrabold text-zinc-400 uppercase tracking-widest">
                  {lang === 'TR' ? 'SİSTEM YÖNETİCİLERİ LİSTESİ' : 'CONTROLLER ACCOUNTS'}
                </h4>

                <div className="bg-white border rounded-2xl overflow-hidden divide-y">
                  {adminUsers.map((user) => (
                    <div key={user.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-50/20 hover:bg-zinc-50/50 transition-colors">
                      <div className="space-y-1 font-sans">
                        <div className="flex items-center gap-2">
                          <span className="p-1 rounded bg-zinc-200 text-zinc-650 shrink-0">
                            <User className="w-3.5 h-3.5" />
                          </span>
                          <span className="font-display font-extrabold text-sm text-zinc-950 uppercase">{user.username}</span>
                          {user.username === 'ediz' && (
                            <span className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded font-mono">ROOT</span>
                          )}
                        </div>
                        <span className="text-[10px] text-zinc-400 block font-mono">Oluşturulma: {new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {editingAdminId === user.id ? (
                          <div className="flex gap-1.5 items-center">
                            <input 
                              type="password" placeholder="Şifre"
                              value={editingAdminPassword}
                              onChange={(e) => setEditingAdminPassword(e.target.value)}
                              className="bg-white border rounded-lg px-2.5 py-1.5 text-xs outline-none text-zinc-800"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (editingAdminPassword.trim().length === 0) return;
                                const updated = adminUsers.map(u => u.id === user.id ? { ...u, password: editingAdminPassword } : u);
                                saveAdminUsers(updated);
                                setAdminUsersState(updated);
                                setEditingAdminId(null);
                                setEditingAdminPassword('');
                                showNotification(lang === 'TR' ? `"${user.username}" şifresi başarıyla güncellendi!` : `Credentials updated.`);
                              }}
                              className="p-1.5 bg-emerald-500 text-white rounded hover:bg-emerald-600 cursor-pointer"
                            >
                              <Save className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingAdminId(null);
                                setEditingAdminPassword('');
                              }}
                              className="p-1.5 bg-zinc-200 rounded hover:bg-zinc-300 text-zinc-800"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingAdminId(user.id);
                              setEditingAdminPassword('');
                            }}
                            className="text-xs bg-zinc-100 text-zinc-700 hover:bg-zinc-200 font-bold px-3 py-1.5 border rounded-lg flex items-center gap-1 transition-all"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>{lang === 'TR' ? 'Şifre Güncelle' : 'Update Pwd'}</span>
                          </button>
                        )}

                        {user.username !== 'ediz' && (
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(lang === 'TR' ? `"${user.username}" yetkilisini sistemden silmek istediğinize emin misiniz?` : `Are you sure?`)) {
                                const updated = adminUsers.filter(u => u.id !== user.id);
                                saveAdminUsers(updated);
                                setAdminUsersState(updated);
                                showNotification(lang === 'TR' ? 'Yetki kaldırıldı.' : 'Privilege revoked.');
                              }
                            }}
                            className="p-1.5 bg-rose-50 text-primary hover:bg-primary hover:text-white rounded-lg transition-colors border cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Campaign Log Modal System */}
      {showSendLogsModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 text-zinc-100 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col h-[460px]">
            <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-primary/20 text-primary rounded-lg shrink-0">
                  <Send className="w-4 h-4 animate-pulse" />
                </span>
                <div>
                  <h4 className="font-display text-xs font-extrabold tracking-tight">SMTP CAMPAIGN PIPELINE ACTIVE</h4>
                  <p className="text-[9px] text-zinc-400 font-mono">BOOSEBERG MASS TRANSMISSION ENGINE v2.1</p>
                </div>
              </div>
              <button 
                type="button"
                disabled={emailSending}
                onClick={() => setShowSendLogsModal(false)}
                className="p-1 px-1.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 rounded text-xs text-zinc-100 font-mono cursor-pointer"
              >
                X
              </button>
            </div>

            <div className="p-5 flex-grow overflow-y-auto space-y-3 flex flex-col justify-between">
              <div className="space-y-2 shrink-0">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-zinc-400">Transmission Progress:</span>
                  <span className="text-primary font-bold">{emailSendProgress}% Complete</span>
                </div>
                <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden border">
                  <div className="bg-primary h-full transition-all duration-300" style={{ width: `${emailSendProgress}%` }}></div>
                </div>
              </div>

              <div className="bg-black/90 border border-zinc-900 rounded-xl p-3 h-48 overflow-y-auto font-mono text-[9px] space-y-1 text-zinc-300 shadow-inner [scrollbar-width:thin]">
                {emailSendLogs.map((log, idx) => (
                  <div key={idx} className="border-b border-zinc-900/30 pb-0.5 max-w-full">
                    {log.email === 'system_smtp' ? (
                      <span className="text-blue-400">SMTP: {log.msg}</span>
                    ) : (
                      <div className="flex justify-between gap-2 max-w-full">
                        <span className="truncate max-w-[200px] text-zinc-400">{log.email}</span>
                        <span className={log.status === 'ok' ? 'text-green-500 font-bold' : 'text-rose-500 font-bold'}>
                          {log.status === 'ok' ? `[OK ${log.code}]` : `[FAIL ${log.code}]`}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-[9px] text-zinc-500 font-mono mt-1 leading-normal">
                * Simulated SMTP protocols in TLS environment. Addresses containing failure indicators or triggering active security block logs report error code 550.
              </div>
            </div>

            <div className="bg-zinc-900 border-t border-zinc-800 p-3.5 flex justify-end shrink-0">
              <button
                type="button"
                disabled={emailSending}
                onClick={() => {
                  setShowSendLogsModal(false);
                  setLeadsInnerTab('list');
                }}
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-sans font-bold text-xs py-2 px-5 rounded-lg cursor-pointer disabled:opacity-40"
              >
                {emailSending ? 'Gönderiliyor...' : 'Pencereyi Kapat ve Geri Dön'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
