
import React from 'react';
import { TECH_ROLES } from '../../constants';
import * as LucideIcons from 'lucide-react';
import { Briefcase, TrendingUp, Zap, ChevronRight } from 'lucide-react';

const RolesExplorer: React.FC = () => {
  const renderIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || Briefcase;
    return <Icon className="w-6 h-6 text-accent" />;
  };

  return (
    <div className="flex-1 pb-24 animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 p-10 md:p-16">
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 rounded-full text-accent text-xs font-black uppercase tracking-widest border border-accent/30">
            Catalogue des Métiers
          </div>
          <h1 className="text-4xl md:text-6xl font-sora font-black text-white leading-tight">
            Explore les opportunités <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">du numérique.</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed font-medium">
            Du développement à la gestion de produit, découvre les rôles qui façonnent l'écosystème tech béninois.
          </p>
        </div>
        <Briefcase className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TECH_ROLES.map((role) => (
          <div key={role.id} className="group bg-card/40 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/5 hover:border-accent/40 transition-all flex flex-col h-full shadow-xl hover:shadow-accent/5">
            <div className="flex items-center justify-between mb-8">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20 group-hover:scale-110 transition-transform">
                {renderIcon(role.icon)}
              </div>
              <div className="px-3 py-1 bg-white/5 rounded-full border border-white/5 text-[10px] font-black text-white/30 uppercase tracking-widest">
                Tech Role
              </div>
            </div>

            <h3 className="text-2xl font-sora font-black text-white mb-4 group-hover:text-accent transition-colors">
              {role.title}
            </h3>
            
            <p className="text-sm text-white/50 leading-relaxed mb-8 line-clamp-3 font-medium">
              {role.description}
            </p>

            <div className="mt-auto space-y-6">
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white/70">{role.salary}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {role.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold text-white/40 uppercase tracking-tight">
                    {skill}
                  </span>
                ))}
              </div>

              <button className="w-full py-4 bg-white/5 hover:bg-accent text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn">
                Détails du rôle
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RolesExplorer;
