import { getAllModules } from "@/lib/modules";
import ModulePortalClient from "@/components/ModulePortalClient";
import { Building2, Layers, ShieldCheck, Sparkles, BookOpen } from "lucide-react";

export default function HomePage() {
  const modules = getAllModules();

  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-100 selection:bg-indigo-500 selection:text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-1/4 left-1/3 w-[650px] h-[650px] bg-indigo-600/30 rounded-full blur-[170px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Header Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Project 02: SILKWG06 Enterprise Study Web Portal
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            실크로드(SILKWG06) 인사/급여 모듈 학습 포털
          </h1>
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
            병원 및 기업용 인사/급여 솔루션의 29개 핵심 모듈(WAGE1000 ~ WAGE9500), 3-Tier 데이터 흐름 및 DB 암호화 아키텍처 가이드 포털
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-extrabold text-indigo-400">29개</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">학습 HTML 모듈</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-extrabold text-emerald-400">3-Tier</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">C# WinForms 아키텍처</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-extrabold text-cyan-400">5대 시리즈</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">WAGE 업무 분류</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-extrabold text-amber-400">0.05초</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">Vercel SSG 정적 배포</div>
            </div>
          </div>
        </section>

        {/* Main Interactive Client Portal */}
        <ModulePortalClient initialModules={modules} />
      </div>
    </main>
  );
}
