
import React from 'react';
import { Zap, Target, BrainCircuit, Clock, Rocket, Armchair } from 'lucide-react';

interface QuizMode {
  id: 'rapido' | 'pro';
  title: string;
  emoji: string;
  icon: React.ReactNode;
  questionsCount: number;
  duration: string;
  description: string;
  badge: string;
  buttonLabel: string;
  colorClass: string;
  bgClass: string;
}

interface QuizModeSelectorProps {
  onSelect: (mode: 'rapido' | 'pro', questionsCount: number) => void;
}

const MODES: QuizMode[] = [
  {
    id: 'rapido',
    title: 'Mode Rapido',
    emoji: '⚡',
    icon: <Zap className="w-12 h-12 text-orange-500 fill-orange-500/20" />,
    questionsCount: 15,
    duration: '~2 min',
    description: 'Tu veux une première idée de ton profil ? C\'est parti pour un quiz rapide et fun !',
    badge: 'Le plus fun !',
    buttonLabel: 'Go ! 🚀',
    colorClass: 'border-orange-200/50 hover:border-orange-400 shadow-orange-500/5',
    bgClass: 'bg-gradient-to-br from-orange-50/10 to-transparent'
  },
  {
    id: 'pro',
    title: 'Mode Pro',
    emoji: '🎯',
    icon: <Target className="w-12 h-12 text-purple-500 fill-purple-500/20" />,
    questionsCount: 55,
    duration: '~8 min',
    description: 'Tu veux vraiment savoir quel métier est fait pour toi ? Ce mode te donne LA réponse la plus précise !',
    badge: 'Pour les pros',
    buttonLabel: 'Je suis prêt ! 💪',
    colorClass: 'border-purple-200/50 hover:border-purple-400 shadow-purple-500/5',
    bgClass: 'bg-gradient-to-br from-purple-50/10 to-transparent'
  }
];

const QuizModeSelector: React.FC<QuizModeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-2xl md:text-3xl font-sora font-medium text-white/80">
          Rapide ou complet, c'est toi qui choisis !
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onSelect(mode.id, mode.questionsCount)}
            className={`group relative p-10 md:p-12 rounded-[3rem] border-2 transition-all text-left flex flex-col gap-8 h-full overflow-hidden ${mode.bgClass} ${mode.colorClass} hover:scale-[1.02] active:scale-[0.98] shadow-2xl`}
          >
            {/* Badge */}
            <div className={`absolute top-8 right-8 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
              mode.id === 'rapido' ? 'bg-orange-500/20 text-orange-400' : 'bg-purple-500/20 text-purple-400'
            }`}>
              {mode.badge}
            </div>

            {/* Icon/Emoji area */}
            <div className="p-4 bg-white/5 rounded-[2rem] w-fit">
              {mode.icon}
            </div>

            <div className="space-y-6">
              <h3 className="text-4xl font-sora font-black text-white flex items-center gap-3">
                {mode.title} <span className="text-3xl">{mode.emoji}</span>
              </h3>
              
              <div className="flex items-center gap-6 text-white/40">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4" />
                  <span className="text-sm font-bold">{mode.questionsCount} questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-bold">{mode.duration}</span>
                </div>
              </div>

              <p className="text-lg text-white/60 leading-relaxed font-medium">
                {mode.description}
              </p>
            </div>

            <div className={`mt-auto pt-8 flex items-center gap-3 font-sora font-black text-xl transition-all group-hover:translate-x-2 ${
              mode.id === 'rapido' ? 'text-orange-400' : 'text-purple-400'
            }`}>
              {mode.buttonLabel}
            </div>
            
            {/* Background decor */}
            <div className={`absolute -bottom-10 -right-10 w-40 h-40 blur-3xl rounded-full opacity-10 ${
              mode.id === 'rapido' ? 'bg-orange-500' : 'bg-purple-500'
            }`}></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizModeSelector;
