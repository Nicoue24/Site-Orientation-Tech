
import React, { useState, useMemo } from 'react';
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
  Filter,
  X,
  Check
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
    <div className="bg-card/40 backdrop-blur-xl p-8 rounded-[3rem] border border-white/5 hover:border-accent/40 transition-all group flex flex-col gap-6 relative overflow-hidden shadow-xl hover:shadow-accent/5 h-full">
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
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  // Dynamically extract cities and domains from the data
  const cities = useMemo(() => {
    const allCities = UNIVERSITIES.map(u => {
      const parts = u.location.split(',');
      return parts[parts.length - 1].trim();
    });
    return Array.from(new Set(allCities)).sort();
  }, []);

  const domains = useMemo(() => {
    const allDomains = UNIVERSITIES.flatMap(u => u.specialties);
    return Array.from(new Set(allDomains)).sort();
  }, []);

  const filteredUniversities = UNIVERSITIES.filter(uni => {
    const matchesSearch = 
      uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      uni.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = !selectedCity || uni.location.toLowerCase().includes(selectedCity.toLowerCase());
    const matchesDomain = !selectedDomain || uni.specialties.some(s => s === selectedDomain);

    return matchesSearch && matchesCity && matchesDomain;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCity(null);
    setSelectedDomain(null);
  };

  return (
    <div className="flex-1 pb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-12">
      {/* Header Premium */}
      <div className="relative overflow-hidden rounded-[4rem] bg-slate-900 border border-white/5 p-12 md:p-20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-purple-500/10 opacity-50"></div>
        <div className="relative z-10 flex flex-col gap-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 text-center md:text-left max-w-2xl">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-accent/10 rounded-full text-accent text-[10px] font-black uppercase tracking-[0.4em] border border-accent/20">
                <School className="w-4 h-4" /> Annuaire Officiel
              </div>
              <h1 className="text-4xl md:text-7xl font-sora font-black text-white tracking-tighter leading-[1.1]">
                Où se former <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">à la Tech au Bénin ?</span>
              </h1>
              <p className="text-white/40 text-lg leading-relaxed font-medium">
                Explorez les meilleurs établissements du pays. Utilisez les filtres avancés pour trouver l'école parfaite.
              </p>
            </div>

            <div className="w-full max-w-sm space-y-4">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-accent transition-colors" />
                <input 
                  type="text" 
                  placeholder="Rechercher par nom..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-16 pr-8 text-white focus:outline-none focus:ring-4 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-white/20 font-bold"
                />
              </div>
              {(selectedCity || selectedDomain || searchTerm) && (
                <button 
                  onClick={clearFilters}
                  className="flex items-center gap-2 mx-auto text-[10px] font-black text-accent uppercase tracking-widest hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" /> Réinitialiser les filtres
                </button>
              )}
            </div>
          </div>

          {/* Advanced Filters Area */}
          <div className="space-y-6 border-t border-white/5 pt-8">
            {/* City Filters */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] px-2">
                <MapPin className="w-3 h-3" /> Filtrer par Ville
              </div>
              <div className="flex flex-wrap gap-2">
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(selectedCity === city ? null : city)}
                    className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                      selectedCity === city 
                        ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20' 
                        : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Domain Filters */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] px-2">
                <Filter className="w-3 h-3" /> Filtrer par Domaine
              </div>
              <div className="flex flex-wrap gap-2">
                {domains.slice(0, 15).map(domain => (
                  <button
                    key={domain}
                    onClick={() => setSelectedDomain(selectedDomain === domain ? null : domain)}
                    className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                      selectedDomain === domain 
                        ? 'bg-purple-500 border-purple-500 text-white shadow-lg shadow-purple-500/20' 
                        : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-4">
        <h2 className="text-2xl font-sora font-black text-white">
          {filteredUniversities.length} {filteredUniversities.length > 1 ? 'Établissements' : 'Établissement'}
        </h2>
        <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-widest">
          Trié par pertinence
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
        <div className="py-24 text-center space-y-8 bg-card/20 rounded-[4rem] border border-dashed border-white/10">
           <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-10 h-10 text-white/10" />
           </div>
           <div className="space-y-3">
              <h3 className="text-3xl font-sora font-black">Aucun établissement trouvé</h3>
              <p className="text-white/30 text-lg max-w-md mx-auto leading-relaxed">
                Ajustez vos filtres ou effectuez une recherche plus large pour trouver ce que vous cherchez.
              </p>
           </div>
           <button 
            onClick={clearFilters} 
            className="px-10 py-4 bg-accent text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-accent/20"
           >
             Réinitialiser tout
           </button>
        </div>
      )}

      {/* Footer / Call to Action */}
      <div className="p-16 rounded-[4rem] bg-gradient-to-br from-accent/5 to-purple-500/5 border border-white/5 text-center relative overflow-hidden group">
        <div className="relative z-10 space-y-6">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
            <School className="w-8 h-8 text-accent" />
          </div>
          <h4 className="text-3xl font-sora font-black text-white">Votre établissement n'est pas répertorié ?</h4>
          <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">
            Nous enrichissons continuellement notre base de données. Si vous représentez une université ou un centre de formation tech au Bénin, contactez-nous pour figurer sur la plateforme.
          </p>
          <button className="mt-6 px-12 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center gap-3 mx-auto group/btn">
             Nous Contacter <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent/10 blur-[120px] rounded-full group-hover:bg-accent/20 transition-all duration-700"></div>
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-500/10 blur-[120px] rounded-full group-hover:bg-purple-500/20 transition-all duration-700"></div>
      </div>
    </div>
  );
};

export default UniversitiesExplorer;
