
import React, { useState } from 'react';
import { GraduationCap, Briefcase, BookOpen, School, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Persona {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  emoji: string;
}

interface PersonaSelectorProps {
  onConfirm: (personaId: string) => void;
}

const PERSONAS: Persona[] = [
  {
    id: 'college',
    title: 'Collégien·ne',
    description: 'Je suis au collège et je découvre les métiers',
    icon: <School className="w-6 h-6 text-pink-500" />,
    emoji: '🎒'
  },
  {
    id: 'lycee',
    title: 'Lycéen·ne',
    description: 'Je suis au lycée et je prépare mon orientation',
    icon: <BookOpen className="w-6 h-6 text-blue-400" />,
    emoji: '📚'
  },
  {
    id: 'etudiant',
    title: 'Étudiant·e',
    description: 'Je suis dans le supérieur et je cherche ma voie',
    icon: <GraduationCap className="w-6 h-6 text-purple-400" />,
    emoji: '🎓'
  },
  {
    id: 'reconversion',
    title: 'En reconversion',
    description: 'Je veux changer de carrière vers la tech',
    icon: <Briefcase className="w-6 h-6 text-orange-400" />,
    emoji: '💼'
  }
];

const PersonaSelector: React.FC<PersonaSelectorProps> = ({ onConfirm }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-2xl md:text-3xl font-sora font-medium text-white/80">
          Pour personnaliser ton expérience, dis-nous qui tu es 👋
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {PERSONAS.map((persona) => (
          <button
            key={persona.id}
            onClick={() => setSelected(persona.id)}
            className={`group relative p-8 rounded-[2rem] border-2 transition-all text-left flex items-start gap-6 ${
              selected === persona.id
                ? 'bg-white/10 border-accent shadow-[0_0_30px_rgba(59,130,246,0.1)]'
                : 'bg-card/40 border-white/5 hover:border-white/10'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${
              selected === persona.id ? 'bg-accent/20' : 'bg-white/5'
            }`}>
              {persona.emoji}
            </div>
            
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-sora font-bold text-white leading-tight">
                {persona.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed font-medium">
                {persona.description}
              </p>
            </div>

            <div className="absolute top-6 right-6">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selected === persona.id 
                  ? 'border-accent bg-accent' 
                  : 'border-white/10 bg-transparent'
              }`}>
                {selected === persona.id && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          disabled={!selected}
          onClick={() => selected && onConfirm(selected)}
          className={`px-12 py-5 rounded-full font-sora font-bold text-lg flex items-center gap-3 transition-all ${
            selected 
              ? 'bg-white text-background hover:scale-105 active:scale-95 shadow-2xl' 
              : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
          }`}
        >
          C'est parti ! <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PersonaSelector;
