import { getModuleById, getAllModules } from "@/lib/modules";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles, FolderOpen, ChevronRight } from "lucide-react";
import "./original-style.css";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const modules = getAllModules();
  return modules.map((mod) => ({
    id: mod.id,
  }));
}

export default async function ModuleDetailPage({ params }: Props) {
  const { id } = await params;
  const mod = getModuleById(id);

  if (!mod) {
    notFound();
  }

  const allModules = getAllModules();

  // Group modules for left sidebar
  const categories = [
    { id: "WAGE1000 시리즈 (시스템/환경 설정)", label: "⚙️ WAGE1000 시리즈" },
    { id: "WAGE2000 시리즈 (인사/증명서 관리)", label: "👥 WAGE2000 시리즈" },
    { id: "WAGE3000 시리즈 (근태/급상여 관리)", label: "💰 WAGE3000 시리즈" },
    { id: "WAGE4000 시리즈 (연말정산/보고서)", label: "📊 WAGE4000 시리즈" },
    { id: "WAGE9000 시리즈 (특수/유틸리티)", label: "🔧 WAGE9000 시리즈" },
  ];

  const groupedModules = categories.map((cat) => ({
    ...cat,
    modules: allModules.filter((m) => m.category === cat.id),
  }));

  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-100 selection:bg-indigo-500 selection:text-white py-8 px-4 sm:px-6 lg:px-8">
      {/* Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-800 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            실크로드 학습 포털 메인으로 돌아가기
          </Link>
          <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-mono font-bold">
            {mod.id}.html (Normalized 1:1 Render)
          </span>
        </div>

        {/* 2-Column Responsive Layout: Left Sidebar + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Category Sidebar (3-Cols) */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-8">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/30 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-300 uppercase tracking-wider mb-4 pb-3 border-b border-slate-800">
                <FolderOpen className="w-4.5 h-4.5 text-indigo-400" />
                모듈 학습 네비게이션
              </div>

              <div className="space-y-4">
                {groupedModules.map((cat) => (
                  <div key={cat.id} className="space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1">
                      {cat.label}
                    </div>
                    <ul className="space-y-1 pl-1">
                      {cat.modules.map((m) => {
                        const isCurrent = m.id === mod.id;
                        return (
                          <li key={m.id}>
                            <Link
                              href={`/modules/${m.id}`}
                              className={`flex items-center gap-1.5 p-2 rounded-lg text-xs transition-all ${
                                isCurrent
                                  ? "bg-indigo-600 text-white font-bold shadow-md"
                                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                              }`}
                            >
                              <ChevronRight
                                className={`w-3 h-3 shrink-0 ${
                                  isCurrent ? "text-white" : "text-slate-500"
                                }`}
                              />
                              <span className="truncate">{m.id} ({m.title.slice(0, 14)})</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Main Content (9-Cols) - Exact 1:1 Normalized Original Render */}
          <article className="lg:col-span-9 glass-card rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
            {/* Render 1:1 Normalized Original HTML Content with original-html-scope */}
            <div
              className="original-html-scope"
              dangerouslySetInnerHTML={{ __html: mod.main_html || mod.full_html }}
            />
          </article>
        </div>
      </div>
    </main>
  );
}
