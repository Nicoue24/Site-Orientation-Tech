
import React, { useState } from 'react';
import { ScoreSet, Question } from '../../types';
import { ChevronRight, ArrowLeft, Sparkles, BrainCircuit } from 'lucide-react';

interface QuizComponentProps {
  onFinish: (scores: ScoreSet) => void;
  customQuestions: Question[];
  roleTitle?: string;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ onFinish, customQuestions, roleTitle }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [accumulatedScores, setAccumulatedScores] = useState<ScoreSet>({
    Com: 0, Tech: 0, Créa: 0, Struct: 0, Lead: 0, Ana: 0, Rel: 0, Vision: 0
  });

  const questions = customQuestions;
  const currentQuestion = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;

  const handleSelect = (points: Partial<ScoreSet>) => {
    const newScores = { ...accumulatedScores };
    (Object.keys(points) as (keyof ScoreSet)[]).forEach((key) => {
      newScores[key] += points[key] || 0;
    });
    setAccumulatedScores(newScores);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onFinish(newScores);
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full py-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Quiz Header */}
      <div className="mb-12 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/20">
              <BrainCircuit className="w-5 h-5 text-accent" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-accent">Analyse IA : {currentIdx + 1} / {questions.length}</span>
              <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest">Cible : {roleTitle || 'Tech Profil'}</span>
            </div>
          </div>
          <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{Math.round(progress)}% complété</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-accent via-blue-400 to-indigo-500 rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(59,130,246,0.3)]" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Section */}
      <div className="mb-12 space-y-4">
        <h2 className="text-2xl md:text-3xl font-sora font-extrabold leading-[1.3] text-white tracking-tight">
          {currentQuestion.title}
        </h2>
        <div className="flex items-center gap-2">
           <div className="w-8 h-1 bg-accent rounded-full opacity-50"></div>
           <span className="text-[10px] text-accent font-black uppercase tracking-widest">{currentQuestion.category}</span>
        </div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 gap-5">
        {currentQuestion.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.points)}
            className="group flex items-center gap-6 p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:border-accent/40 hover:bg-accent/[0.03] transition-all text-left active:scale-[0.98] relative overflow-hidden"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-lg font-black font-sora text-white/40 group-hover:bg-accent group-hover:text-white transition-all duration-300">
              {option.id}
            </div>
            <div className="flex-1">
              <p className="text-lg font-medium leading-relaxed text-white/80 group-hover:text-white transition-colors">
                {option.text}
              </p>
            </div>
            <div className="absolute right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <ChevronRight className="w-5 h-5 text-accent" />
              </div>
            </div>
            
            {/* Subtle hover line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between">
        {currentIdx > 0 ? (
          <button 
            onClick={() => setCurrentIdx(currentIdx - 1)}
            className="flex items-center gap-3 text-white/30 hover:text-white transition-all text-xs font-black uppercase tracking-widest group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Précédent</span>
          </button>
        ) : <div />}
        
        <p className="text-[10px] text-white/10 font-bold uppercase tracking-widest">
          Orientation Tech Bénin — Diagnostic Neutre (IA Modèle Flash)
        </p>
      </div>
    </div>
  );
};

export default QuizComponent;
