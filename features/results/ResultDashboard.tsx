
import React, { useRef, useState } from 'react';
import { PROFILES, UNIVERSITIES, TECH_ROLES } from '../../constants';
import { ScoreSet, User, RoadmapYear, University, JobMatch, TechRole } from '../../types';
import { 
  MapPin, 
  Phone,
  RefreshCw,
  Rocket,
  Calendar,
  FileText,
  ShieldCheck,
  Mail,
  Search,
  Globe,
  TrendingUp,
  Award,
  Briefcase,
  CheckCircle2,
  Cpu,
  Zap,
  Layers,
  Banknote,
  Info,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  PhoneCall,
  School,
  Code,
  Palette,
  BarChart3,
  Users,
  Megaphone,
  Shield
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { GoogleGenAI } from "@google/genai";

interface ResultDashboardProps {
  scores: ScoreSet;
  user: User;
}

const STRENGTH_COLORS: Record<string, string> = {
  Com: '#10b981',
  Tech: '#3b82f6',
  Créa: '#a855f7',
  Struct: '#f59e0b',
  Lead: '#6366f1',
  Ana: '#06b6d4',
  Rel: '#ec4899',
  Vision: '#f97316',
};

const LogoOTB = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="shadow-lg shadow-accent/20">
    <rect width="48" height="48" rx="14" fill="url(#paint0_linear_otb)" />
    <circle cx="16" cy="24" r="6" stroke="white" strokeWidth="3" />
    <path d="M28 18V30M25 18H31" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <path d="M34 18V30M34 18H37C38.5 18 39.5 19 39.5 20.5C39.5 22 38.5 23 37 23H34M34 23H38C39.5 23 40.5 24 40.5 25.5C40.5 27 39.5 30 38 30H34" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="paint0_linear_otb" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3b82f6" />
        <stop offset="1" stopColor="#1d4ed8" />
      </linearGradient>
    </defs>
  </svg>
);

const RadialProgress: React.FC<{ percentage: number; label: string; color?: string }> = ({ percentage, label, color = "#3b82f6" }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3 group">
      <div className="relative w-20 h-20 md:w-24 md:h-24">
        <svg className="w-full h-full -rotate-90">
          <circle cx="50%" cy="50%" r={radius} className="stroke-white/5 fill-none" strokeWidth="8" />
          <circle
            cx="50%" cy="50%" r={radius}
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="fill-none transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm md:text-lg font-black font-sora text-white">{percentage}%</span>
        </div>
      </div>
      <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] text-center group-hover:text-accent transition-colors">
        {label}
      </span>
    </div>
  );
};

const UniversityCard: React.FC<{ uni: University }> = ({ uni }) => {
  const [liveInfo, setLiveInfo] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [sources, setSources] = useState<{title: string, uri: string}[]>([]);

  const fetchLatestInfo = async () => {
    setIsSearching(true);
    setSources([]);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Fournis uniquement l'adresse physique exacte, le numéro de téléphone officiel et l'adresse email de contact de l'université ${uni.name} au Bénin.`,
        config: { tools: [{ googleSearch: {} }] }
      });
      setLiveInfo(response.text || "Non trouvé.");
      
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const extracted = chunks
          .filter((c: any) => c.web && c.web.uri)
          .map((c: any) => ({ title: c.web.title || c.web.uri, uri: c.web.uri }));
        setSources(extracted);
      }
    } catch (err) {
      console.error(err);
      setLiveInfo("Erreur de recherche.");
    } finally {
      setIsSearching(false);
    }
  };

  const cleanPhone = (p: string) => p.replace(/\s+/g, '').replace(/[^\d+]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone(uni.phone).replace('+', '')}`;

  return (
    <div className="bg-card/50 p-6 rounded-[2.5rem] border border-white/5 hover:border-accent/40 transition-all group flex flex-col gap-6 relative overflow-hidden backdrop-blur-md">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h4 className="font-sora font-bold text-white text-lg leading-tight">{uni.name}</h4>
          <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Établissement Recommandé</span>
        </div>
        <button 
          onClick={fetchLatestInfo}
          disabled={isSearching}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-accent text-white/30 hover:text-white transition-all disabled:opacity-50"
        >
          {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </button>
      </div>
      
      {liveInfo ? (
        <div className="p-4 bg-accent/10 border border-accent/20 rounded-2xl animate-in fade-in">
           <div className="flex items-center gap-2 mb-2 text-[9px] font-black text-accent uppercase tracking-widest">
              <Globe className="w-3 h-3" /> Données Google Search
           </div>
           <p className="text-xs text-white/80 leading-relaxed font-medium mb-2 whitespace-pre-wrap">{liveInfo}</p>
           {sources.length > 0 && (
             <div className="space-y-1">
               {sources.slice(0, 2).map((s, i) => (
                 <a key={i} href={s.uri} target="_blank" className="text-[10px] text-accent block truncate underline">{s.title}</a>
               ))}
             </div>
           )}
           <button onClick={() => setLiveInfo(null)} className="mt-2 text-[9px] font-bold text-white/30 hover:text-white uppercase tracking-widest">Retour</button>
        </div>
      ) : (
        <div className="space-y-4">
           <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Adresse</span>
                <span className="text-xs text-white/80 leading-relaxed font-medium">{uni.location}</span>
              </div>
           </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mt-auto">
        <a href={`tel:${cleanPhone(uni.phone)}`} className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-[10px] font-black text-white uppercase tracking-widest transition-all">
          <PhoneCall className="w-3.5 h-3.5 text-accent" /> Appeler
        </a>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest transition-all">
          <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
        </a>
      </div>

      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
        {uni.specialties.slice(0, 3).map((s, idx) => (
          <span key={idx} className="px-2.5 py-1 bg-white/5 rounded-lg text-[8px] font-bold text-white/40 uppercase tracking-tighter">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};

const ResultDashboard: React.FC<ResultDashboardProps> = ({ scores, user }) => {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const getDominantProfileKey = () => {
    const keys = Object.keys(PROFILES);
    const scoresArray = keys.map(k => ({ key: k, value: scores[k as keyof ScoreSet] || 0 }));
    const max = scoresArray.reduce((prev, current) => (prev.value > current.value) ? prev : current);
    return max.key;
  };

  const profileKey = getDominantProfileKey();
  const profile = PROFILES[profileKey] || PROFILES.Vision;

  const getRoleData = (jobTitle: string): TechRole | null => {
    const found = TECH_ROLES.find(r => 
      r.title.toLowerCase() === jobTitle.toLowerCase() || 
      jobTitle.toLowerCase().includes(r.title.toLowerCase()) ||
      r.title.toLowerCase().includes(jobTitle.toLowerCase())
    );
    return found || null;
  };

  const getSkillIcon = (skill: string) => {
    const s = skill.toLowerCase();
    if (s.includes('react') || s.includes('node') || s.includes('code') || s.includes('python') || s.includes('flutter')) return <Code className="w-3 h-3 text-accent" />;
    if (s.includes('data') || s.includes('sql') || s.includes('analyt') || s.includes('stat')) return <BarChart3 className="w-3 h-3 text-accent" />;
    if (s.includes('design') || s.includes('ui') || s.includes('ux') || s.includes('figma') || s.includes('palette')) return <Palette className="w-3 h-3 text-accent" />;
    if (s.includes('manage') || s.includes('lead') || s.includes('scrum') || s.includes('team') || s.includes('users')) return <Users className="w-3 h-3 text-accent" />;
    if (s.includes('cyber') || s.includes('secu') || s.includes('pentest') || s.includes('shield')) return <Shield className="w-3 h-3 text-accent" />;
    if (s.includes('market') || s.includes('ads') || s.includes('seo') || s.includes('pitch')) return <Megaphone className="w-3 h-3 text-accent" />;
    return <CheckCircle2 className="w-3 h-3 text-accent" />;
  };

  const handleDownloadJPG = async () => {
    if (!dashboardRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(dashboardRef.current, {
        backgroundColor: '#0f172a',
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.9);
      const link = document.createElement('a');
      link.download = `Orientation_Tech_Benin_${user.email.split('@')[0]}.jpg`;
      link.href = imgData;
      link.click();
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const renderIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || Briefcase;
    return <Icon className="w-5 h-5 text-accent" />;
  };

  return (
    <div className="flex-1 pb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div id="capture-area" ref={dashboardRef} className="space-y-12 p-4 md:p-10 bg-background rounded-[3rem]">
        
        <div className="flex items-center justify-between border-b border-white/5 pb-8 no-print">
          <div className="flex items-center gap-4">
            <LogoOTB />
            <div>
              <h1 className="text-2xl font-sora font-black text-white leading-none">Profil d'Aptitude</h1>
              <p className="text-[10px] text-white/20 uppercase font-black tracking-[0.4em] mt-2">Dossier Certifié — {user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleDownloadJPG} 
            disabled={isExporting}
            className="flex items-center gap-3 px-6 py-3 bg-white text-background rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/90 transition-all shadow-xl disabled:opacity-50"
          >
            {isExporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
            <span>{isExporting ? 'Capture...' : 'Télécharger (.jpg)'}</span>
          </button>
        </div>

        <div className="relative overflow-hidden rounded-[4rem] bg-slate-900 border border-white/5 p-12 md:p-24 text-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="px-5 py-2 bg-accent/10 rounded-full border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.4em]">
              VOTRE ARCHÉTYPE DOMINANT
            </div>
            <h2 className="text-5xl md:text-8xl font-sora font-black text-white tracking-tighter leading-none">
              {profile.name}
            </h2>
            <p className="text-xl text-white/40 max-w-2xl mx-auto leading-relaxed italic font-medium">
              "{profile.description}"
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-5xl">
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 backdrop-blur-sm">
                <TrendingUp className="w-6 h-6 text-accent mx-auto mb-3" />
                <p className="text-[10px] text-white/20 uppercase font-black tracking-widest mb-2">Salaire Potentiel</p>
                <p className="text-2xl font-black text-white">{profile.salaryRange}</p>
              </div>
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 backdrop-blur-sm">
                <Rocket className="w-6 h-6 text-purple-400 mx-auto mb-3" />
                <p className="text-[10px] text-white/20 uppercase font-black tracking-widest mb-2">Potentiel Tech</p>
                <p className="text-2xl font-black text-white">Stratégique</p>
              </div>
              <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 backdrop-blur-sm">
                <Award className="w-6 h-6 text-orange-400 mx-auto mb-3" />
                <p className="text-[10px] text-white/20 uppercase font-black tracking-widest mb-2">Indice Rareté</p>
                <p className="text-2xl font-black text-white">Élevé</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card/30 backdrop-blur-xl p-12 rounded-[4rem] border border-white/5">
          <div className="flex flex-col items-center gap-3 mb-16 text-center">
            <h3 className="text-3xl font-sora font-black text-white tracking-tight">Analyse des 8 Forces</h3>
            <p className="text-xs text-white/20 uppercase tracking-[0.5em] font-black">Psychométrie de vos talents au Bénin</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 gap-x-10">
            {(['Com', 'Tech', 'Créa', 'Struct', 'Lead', 'Ana', 'Rel', 'Vision'] as const).map((key) => (
              <RadialProgress 
                key={key} 
                percentage={Math.min(Math.round(((scores[key] || 0) / 45) * 100), 100)} 
                label={key} 
                color={STRENGTH_COLORS[key]}
              />
            ))}
          </div>
        </div>

        <div className="bg-slate-900/40 p-12 rounded-[4rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30"></div>
          <div className="flex flex-col items-center gap-4 mb-16 text-center">
            <div className="w-16 h-16 rounded-[1.5rem] bg-accent/10 flex items-center justify-center border border-accent/20 mb-2">
              <Cpu className="w-8 h-8 text-accent animate-pulse" />
            </div>
            <h3 className="text-3xl font-sora font-black text-white">Métiers Recommandés (Marché Béninois)</h3>
            <p className="text-xs text-white/20 uppercase tracking-[0.5em] font-black">Top 3 des carrières faites pour vous</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {profile.jobs.map((job: JobMatch, index: number) => {
              const roleData = getRoleData(job.title);
              const skills = roleData ? roleData.skills.slice(0, 3) : ["Communication", "Analyse", "Adaptabilité"];
              const finalDescription = roleData ? roleData.description : job.description;
              const finalSalary = roleData ? roleData.salary : profile.salaryRange;
              const finalIcon = roleData ? roleData.icon : 'Briefcase';

              return (
                <div key={index} className="bg-white/[0.03] p-10 rounded-[3rem] border border-white/5 hover:bg-white/[0.06] transition-all group/card flex flex-col h-full shadow-lg">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20 group-hover/card:scale-110 transition-transform">
                      {renderIcon(finalIcon)}
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black text-accent bg-accent/10 px-3 py-1 rounded-full uppercase tracking-widest mb-1">
                        {job.match}% Match
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="text-2xl font-sora font-black text-white mb-4 leading-tight group-hover/card:text-accent transition-colors">{job.title}</h4>
                  
                  <div className="mb-6 p-5 bg-accent/5 rounded-[1.5rem] border border-accent/10 relative">
                    <div className="absolute top-0 left-4 -translate-y-1/2 px-3 py-0.5 bg-accent text-[8px] font-black text-white uppercase tracking-widest rounded-full">
                      Résumé
                    </div>
                    <p className="text-xs text-white/80 leading-relaxed font-bold italic">
                      "{finalDescription}"
                    </p>
                  </div>

                  <div className="mb-8 p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Banknote className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[8px] font-black text-emerald-400/50 uppercase tracking-widest">Salaire Estimé (Bénin)</span>
                       <span className="text-sm font-black text-white">{finalSalary}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mt-auto">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Compétences Clés</span>
                      <Zap className="w-3 h-3 text-accent animate-pulse" />
                    </div>
                    <div className="space-y-2.5">
                      {skills.map((skill, sIndex) => (
                        <div key={sIndex} className="flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/5 hover:border-accent/20 transition-all">
                          <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                            {getSkillIcon(skill)}
                          </div>
                          <span className="text-xs text-white/80 font-bold">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center border border-accent/10">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-sora font-black">Plan de Carrière (3 ans)</h3>
            </div>
            <div className="space-y-6">
              {profile.roadmap.map((step: RoadmapYear) => (
                <div key={step.year} className="relative pl-12 pb-8 group">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-background font-black text-sm z-10">
                    {step.year}
                  </div>
                  <div className="absolute left-5 top-10 bottom-0 w-px bg-white/5 group-last:hidden"></div>
                  <div className="bg-white/5 border border-white/5 p-8 rounded-[2rem] hover:bg-white/[0.08] transition-all">
                    <h4 className="font-black text-white text-lg mb-4">{step.goal}</h4>
                    <div className="flex flex-wrap gap-2">
                      {step.milestones.map((m, i) => (
                        <span key={i} className="px-3 py-1 bg-accent/10 rounded-lg text-[10px] text-accent font-black uppercase tracking-widest">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-500/10">
                <School className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-sora font-black">Où se former au Bénin ?</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
               {UNIVERSITIES.slice(0, 4).map(uni => (
                 <UniversityCard key={uni.id} uni={uni} />
               ))}
            </div>
          </div>
        </div>

        <div className="text-center pt-12 border-t border-white/5 opacity-20">
          <p className="text-[10px] uppercase tracking-[0.8em] font-black">Orientation Tech Bénin — Version 2.5 — Marché Local</p>
        </div>
      </div>
    </div>
  );
};

export default ResultDashboard;
