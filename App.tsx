
import React, { useState } from 'react';
import { 
  Compass, 
  School, 
  Target, 
  BrainCircuit, 
  ChevronRight,
  Layout,
  BarChart3,
  Lock,
  Briefcase,
  History,
  ArrowRight
} from 'lucide-react';
import QuizComponent from './features/quiz/QuizComponent';
import QuizModeSelector from './features/quiz/QuizModeSelector';
import ResultDashboard from './features/results/ResultDashboard';
import AuthModal from './features/auth/AuthModal';
import UniversitiesExplorer from './features/universities/UniversitiesExplorer';
import RolesExplorer from './features/roles/RolesExplorer';
import PersonaSelector from './features/onboarding/PersonaSelector';
import { ScoreSet, User, Question } from './types';
import { GoogleGenAI, Type } from "@google/genai";

enum AppStep {
  Home,
  PersonaSelection,
  QuizModeSelection,
  AIGeneration,
  Quiz,
  AuthGate,
  Dashboard,
  Universities,
  Roles
}

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.Home);
  const [user, setUser] = useState<User>({ email: '', isLoggedIn: false });
  const [scores, setScores] = useState<ScoreSet | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  const startPersonaSelection = () => {
    setStep(AppStep.PersonaSelection);
  };

  const handlePersonaConfirm = (personaId: string) => {
    setSelectedPersona(personaId);
    setStep(AppStep.QuizModeSelection);
  };

  const startDiagnostic = async (mode: 'rapido' | 'pro', questionsCount: number) => {
    setStep(AppStep.AIGeneration);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const personaContext = {
        college: "collégien (découverte)",
        lycee: "lycéen (orientation BAC)",
        etudiant: "étudiant (spécialisation)",
        reconversion: "adulte en reconversion (recherche d'emploi)"
      }[selectedPersona as keyof typeof personaContext] || "étudiant";

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Génère un quiz de diagnostic d'aptitude technologique de ${questionsCount} questions pour un profil : ${personaContext}. 
        Le mode est "${mode}".
        Chaque question doit être une mise en situation professionnelle réaliste ancrée dans le contexte du Bénin.
        Propose 4 options (A, B, C, D) par question attribuant des points aux forces: Com, Tech, Créa, Struct, Lead, Ana, Rel, Vision.
        Retourne UNIQUEMENT un JSON.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    category: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          id: { type: Type.STRING },
                          text: { type: Type.STRING },
                          points: {
                            type: Type.OBJECT,
                            properties: {
                              Com: { type: Type.INTEGER },
                              Tech: { type: Type.INTEGER },
                              Créa: { type: Type.INTEGER },
                              Struct: { type: Type.INTEGER },
                              Lead: { type: Type.INTEGER },
                              Ana: { type: Type.INTEGER },
                              Rel: { type: Type.INTEGER },
                              Vision: { type: Type.INTEGER }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });

      const data = JSON.parse(response.text || '{"questions":[]}');
      setGeneratedQuestions(data.questions);
      setStep(AppStep.Quiz);
    } catch (error) {
      console.error("AI Error:", error);
      alert("Erreur lors de la préparation du quiz. Veuillez réessayer.");
      setStep(AppStep.Home);
    }
  };
  
  const handleQuizFinish = (finalScores: ScoreSet) => {
    setScores(finalScores);
    if (user.isLoggedIn) {
      setStep(AppStep.Dashboard);
    } else {
      setStep(AppStep.AuthGate);
    }
  };

  const handleLoginSuccess = (email: string) => {
    setUser({ email, isLoggedIn: true });
    setStep(AppStep.Dashboard);
  };

  const navigateToResults = () => {
    if (scores) {
      setStep(AppStep.Dashboard);
    } else {
      setStep(AppStep.AuthGate);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] text-white font-inter selection:bg-accent/30">
      {/* Header */}
      <header className="p-4 border-b border-white/5 sticky top-0 bg-[#0f172a]/80 backdrop-blur-xl z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setStep(AppStep.Home)}>
            <div className="bg-gradient-to-tr from-accent to-blue-600 p-2 rounded-xl shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
               <span className="font-sora font-black text-xl tracking-tighter leading-none">OTB</span>
               <span className="text-[8px] font-black uppercase tracking-[0.2em] text-accent">Bénin Tech</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {user.isLoggedIn ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,1)]"></div>
                <span className="text-xs font-bold text-white/70">{user.email}</span>
              </div>
            ) : (
              <button onClick={() => setStep(AppStep.AuthGate)} className="px-5 py-2 bg-accent hover:bg-accent/90 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-accent/20 transition-all active:scale-95">Connexion</button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 flex flex-col">
        {step === AppStep.Home && (
          <div className="flex-1 flex flex-col py-12 gap-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Hero */}
            <div className="text-center space-y-8 relative">
              <div className="absolute -inset-20 bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>
              <h1 className="relative text-6xl md:text-8xl font-sora font-black tracking-tighter leading-tight">
                Décode ton futur <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">dans la Tech.</span>
              </h1>
              <p className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                Découvre ton profil idéal, explore les formations au Bénin et trace ton plan de carrière.
              </p>
            </div>

            {/* Main Navigation Cards - "Les bails" */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
              <HomeCard 
                title="Accueil" 
                desc="Le point de départ de ton aventure vers le succès numérique."
                icon={<Layout />}
                onClick={() => setStep(AppStep.Home)}
                highlight
              />
              <HomeCard 
                title="Métiers" 
                desc="Explore le catalogue des rôles les plus demandés au Bénin."
                icon={<Briefcase />}
                onClick={() => setStep(AppStep.Roles)}
              />
              <HomeCard 
                title="Quiz" 
                desc="Passe notre diagnostic intelligent pour trouver ta voie."
                icon={<Target />}
                onClick={startPersonaSelection}
                accent
              />
              <HomeCard 
                title="Mes résultats" 
                desc="Consulte ton analyse personnalisée et ton plan d'action."
                icon={<BarChart3 />}
                onClick={navigateToResults}
              />
            </div>
          </div>
        )}

        {step === AppStep.PersonaSelection && (
          <PersonaSelector onConfirm={handlePersonaConfirm} />
        )}

        {step === AppStep.QuizModeSelection && (
          <QuizModeSelector onSelect={startDiagnostic} />
        )}

        {step === AppStep.AIGeneration && (
          <div className="flex-1 flex flex-col items-center justify-center gap-10 py-20 text-center animate-in fade-in duration-1000">
             <div className="relative w-32 h-32">
                <div className="absolute inset-0 bg-accent/30 blur-3xl rounded-full animate-pulse"></div>
                <div className="relative w-full h-full bg-card rounded-[2.5rem] border border-white/10 flex items-center justify-center shadow-2xl">
                   <BrainCircuit className="w-16 h-16 text-accent animate-bounce" />
                </div>
             </div>
             <div className="space-y-4">
                <h3 className="text-3xl font-sora font-black">L'IA prépare ton questionnaire...</h3>
                <div className="w-64 h-1.5 bg-white/5 rounded-full mx-auto overflow-hidden border border-white/10">
                   <div className="h-full bg-accent animate-[loading_2s_ease-in-out_infinite]"></div>
                </div>
                <p className="text-xs text-white/30 uppercase tracking-[0.4em]">Analyse personnalisée {generatedQuestions.length > 0 ? '(Assemblage)' : '(Génération)'}</p>
             </div>
          </div>
        )}

        {step === AppStep.Quiz && (
          <QuizComponent 
            onFinish={handleQuizFinish} 
            customQuestions={generatedQuestions} 
            roleTitle={`Diagnostic ${selectedPersona}`} 
          />
        )}

        {step === AppStep.Roles && (
          <RolesExplorer />
        )}

        {step === AppStep.AuthGate && (
          <div className="flex-1 flex flex-col items-center justify-center py-10 animate-in zoom-in-95 duration-500">
            <div className="w-full max-w-md bg-card p-12 rounded-[3rem] border border-white/5 shadow-2xl flex flex-col items-center gap-8 relative overflow-hidden">
              <div className="p-5 bg-accent/10 rounded-3xl border border-accent/20">
                <Lock className="w-10 h-10 text-accent" />
              </div>
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-sora font-black">Accès Restreint</h2>
                <p className="text-white/40 leading-relaxed">
                  Inscris-toi pour débloquer tes métiers recommandés et ton plan de carrière personnalisé.
                </p>
              </div>
              <AuthModal onAuthSuccess={handleLoginSuccess} />
            </div>
          </div>
        )}

        {step === AppStep.Dashboard && scores && (
          <ResultDashboard scores={scores} user={user} />
        )}

        {step === AppStep.Universities && (
          <UniversitiesExplorer />
        )}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 px-8 py-4 bg-slate-900/90 backdrop-blur-2xl border border-white/20 rounded-[3rem] z-50 flex items-center gap-8 md:gap-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <NavItem active={step === AppStep.Home} icon={<Layout />} label="Accueil" onClick={() => setStep(AppStep.Home)} />
        <NavItem active={step === AppStep.Roles} icon={<Briefcase />} label="Métiers" onClick={() => setStep(AppStep.Roles)} />
        <NavItem active={[AppStep.PersonaSelection, AppStep.QuizModeSelection, AppStep.AIGeneration, AppStep.Quiz].includes(step)} icon={<Target />} label="Quiz" onClick={startPersonaSelection} />
        <NavItem active={[AppStep.Dashboard, AppStep.AuthGate].includes(step)} icon={<BarChart3 />} label="Mes résultats" onClick={navigateToResults} />
        <NavItem active={step === AppStep.Universities} icon={<School />} label="Universités" onClick={() => setStep(AppStep.Universities)} />
      </nav>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); width: 30%; }
          50% { width: 60%; }
          100% { transform: translateX(300%); width: 30%; }
        }
      `}</style>
    </div>
  );
};

const HomeCard: React.FC<{ 
  title: string; 
  desc: string; 
  icon: React.ReactNode; 
  onClick: () => void; 
  highlight?: boolean; 
  accent?: boolean 
}> = ({ title, desc, icon, onClick, highlight, accent }) => (
  <button 
    onClick={onClick}
    className={`group relative p-8 rounded-[2.5rem] border transition-all text-left overflow-hidden ${
      accent 
        ? 'bg-accent/10 border-accent/30 hover:bg-accent/20' 
        : highlight 
          ? 'bg-white/5 border-white/20 hover:bg-white/10' 
          : 'bg-card/40 border-white/5 hover:border-white/10 hover:bg-card/60'
    }`}
  >
    <div className="relative z-10 flex flex-col gap-6">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 ${
        accent ? 'bg-accent text-white' : 'bg-white/10 text-white'
      }`}>
        {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-7 h-7' })}
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-sora font-black text-white flex items-center gap-2">
          "{title}" <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </h3>
        <p className="text-sm text-white/50 leading-relaxed font-medium">
          {desc}
        </p>
      </div>
    </div>
    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
  </button>
);

const NavItem: React.FC<{ active: boolean; icon: React.ReactNode; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1.5 group transition-all duration-300 relative ${active ? 'scale-110' : 'hover:scale-105'}`}
  >
    <div className={`transition-all duration-300 ${active ? 'text-accent' : 'text-white/40 group-hover:text-white'}`}>
      {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-5 h-5' })}
    </div>
    <span className={`text-[9px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${active ? 'text-accent' : 'text-white/40 group-hover:text-white'}`}>
      {label}
    </span>
    {active && (
      <div className="absolute -bottom-2 w-1 h-1 bg-accent rounded-full shadow-[0_0_8px_rgba(59,130,246,1)]"></div>
    )}
  </button>
);

export default App;
