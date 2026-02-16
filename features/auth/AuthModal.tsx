
import React, { useState } from 'react';
import { Mail, Globe, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  onAuthSuccess: (email: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onAuthSuccess(email);
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google Login
    setTimeout(() => {
      onAuthSuccess('utilisateur.google@gmail.com');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest px-1">Email</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-white/30 group-focus-within:text-accent transition-colors" />
            </div>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre.email@gmail.com"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              required
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-accent hover:bg-accent/90 disabled:opacity-50 text-white font-sora font-bold py-4 rounded-2xl shadow-xl shadow-accent/20 flex items-center justify-center gap-3 transition-all active:scale-95"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span>Continuer avec l'email</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <div className="relative flex items-center justify-center">
        <div className="flex-1 border-t border-white/5"></div>
        <span className="px-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Ou</span>
        <div className="flex-1 border-t border-white/5"></div>
      </div>

      <button 
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full bg-white text-background hover:bg-white/90 disabled:opacity-50 font-sora font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95"
      >
        <Globe className="w-5 h-5" />
        <span>S'inscrire avec Google</span>
      </button>

      <p className="text-[10px] text-center text-white/20 px-4 leading-relaxed uppercase tracking-tighter">
        En continuant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
      </p>
    </div>
  );
};

export default AuthModal;
