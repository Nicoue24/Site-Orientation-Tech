
import React, { useState } from 'react';
import { UNIVERSITIES } from '../../constants';
import { 
  MapPin, 
  Phone, 
  Mail, 
  School, 
  Search, 
  MessageCircle, 
  PhoneCall, 
  Globe, 
  RefreshCw, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { University } from '../../types';
import { GoogleGenAI } from "@google/genai";

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
        contents: `Fournis l'adresse physique exacte, le téléphone et l'email de l'université ${uni.name} au Bénin.`,
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
    <div className="bg-card/40 backdrop-blur-xl p-8 rounded-[3rem] border border-white/5 hover:border-accent/40 transition-all group flex flex-col gap-6 relative overflow-hidden shadow-xl hover:shadow-accent/5">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <h4 className="font-sora font-black text-white text-xl leading-tight group-hover:text-accent transition-colors">{uni.name}</h4>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Établissement Agréé</span>
          </div>
        </div>
        <button 
          onClick={fetchLatestInfo}
          disabled={isSearching}
          className="p-3 rounded-2xl bg-white/5 hover:bg-accent text-white/30 hover:text-white transition-all disabled:opacity-50 shadow-inner"
        >
          {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
        </button>
      </div>
      
      {liveInfo ? (
        <div className="p-5 bg-accent/10 border border-accent/20 rounded-[2rem] animate-in fade-in zoom-in-95 duration-300">
           <div className="flex items-center gap-2 mb-3 text-[9px] font-black text-accent uppercase tracking-widest">
              <Globe className="w-3.5 h-3.5" /> Google Search Grounding
           </div>
           <p className="text-xs text-white/80 leading-relaxed font-medium mb-4 whitespace-pre-wrap">{liveInfo}</p>
           
           {sources.length > 0 && (
             <div className="space-y-2 mb-4">
               {sources.slice(0, 2).map((source, idx) => (
                 <a key={idx} href={source.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] text-accent hover:underline group/link truncate">
                   <ExternalLink className="w-3 h-3 shrink-0" />
                   <span className="truncate">{source.title}</span>
                 </a>
               ))}
             </div>
           )}

           <button onClick={() => { setLiveInfo(null); setSources([]); }} className="text-[9px] font-black text-white/30 hover:text-white uppercase tracking-widest underline underline-offset-4">
              Retour aux infos locales
           </button>
        </div>
      ) : (
        <div className="space-y-5">
           <div className="flex items-start gap-4 group/item">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover/item:border-accent/30 transition-colors">
                <MapPin className="w-4 h-4 text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Adresse Physique</span>
                <span className="text-sm text-white/80 leading-relaxed font-medium">{uni.location}</span>
              </div>
           </div>
           <div className="flex items-center gap-4 group/item">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover/item:border-accent/30 transition-colors">
                <Mail className="w-4 h-4 text-accent" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Email Académique</span>
                <span className="text-sm text-white/80 truncate font-medium">{uni.email}</span>
              </div>
           </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mt-auto">
        <a href={`tel:${cleanPhone(uni.phone)}`} className="flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-[10px] font-black text-white uppercase tracking-widest transition-all active:scale-95">
          <PhoneCall className="w-4 h-4 text-accent" />
          Appeler
        </a>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-4 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-2xl border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest transition-all active:scale-95">
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
        {uni.specialties.map((s, idx) => (
          <span key={idx} className="px-3 py-1.5 bg-accent/10 rounded-xl text-[9px] font-black text-accent uppercase tracking-tighter border border-accent/20">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};

const UniversitiesExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUniversities = UNIVERSITIES.filter(uni => 
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
    uni.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 pb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-12">
      {/* Header Premium */}
      <div className="relative overflow-hidden rounded-[4rem] bg-slate-900 border border-white/5 p-12 md:p-20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-purple-500/10 opacity-50"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-6 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-accent/10 rounded-full text-accent text-[10px] font-black uppercase tracking-[0.4em] border border-accent/20">
              <School className="w-4 h-4" /> Annuaire Officiel
            </div>
            <h1 className="text-4xl md:text-7xl font-sora font-black text-white tracking-tighter leading-[1.1]">
              Où se former <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">à la Tech au Bénin ?</span>
            </h1>
            <p className="text-white/40 text-lg leading-relaxed font-medium">
              Explorez les meilleurs établissements du pays. Trouvez l'adresse exacte et contactez-les directement via WhatsApp ou appel.
            </p>
          </div>

          <div className="w-full max-w-sm space-y-4">
             <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
                <input 
                  type="text" 
                  placeholder="Rechercher une école, un domaine..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-16 pr-8 text-white focus:outline-none focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-white/20 font-bold"
                />
             </div>
             <div className="flex items-center justify-between px-4">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{filteredUniversities.length} établissements trouvés</span>
                <div className="flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-widest cursor-pointer hover:underline">
                   <Filter className="w-3 h-3" /> Filtrer par ville
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Grid des universités */}
      {filteredUniversities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUniversities.map((uni) => (
            <UniversityCard key={uni.id} uni={uni} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-6 bg-card/20 rounded-[3rem] border border-dashed border-white/10">
           <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-10 h-10 text-white/10" />
           </div>
           <div className="space-y-2">
              <h3 className="text-2xl font-sora font-black">Aucun résultat</h3>
              <p className="text-white/30 text-sm">Réessayez avec d'autres mots-clés ou parcourez la liste complète.</p>
           </div>
           <button onClick={() => setSearchTerm('')} className="px-8 py-3 bg-accent text-white rounded-xl font-black text-xs uppercase tracking-widest">Voir tout</button>
        </div>
      )}

      {/* Footer / Call to Action */}
      <div className="p-12 rounded-[3rem] bg-gradient-to-r from-accent/5 to-purple-500/5 border border-white/5 text-center relative overflow-hidden group">
        <div className="relative z-10 space-y-4">
          <h4 className="text-xl font-sora font-black text-white">Votre établissement n'est pas répertorié ?</h4>
          <p className="text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
            Nous mettons à jour notre annuaire régulièrement. Contactez notre équipe pour ajouter votre université ou centre de formation à la plateforme.
          </p>
          <button className="mt-4 px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 mx-auto">
             Nous Contacter <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/10 blur-[100px] rounded-full group-hover:bg-accent/20 transition-all"></div>
      </div>
    </div>
  );
};

export default UniversitiesExplorer;
