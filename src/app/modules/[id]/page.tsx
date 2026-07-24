import { getModuleById, getAllModules } from "@/lib/modules";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Code2, FileCode, Layers, Sparkles, Building2 } from "lucide-react";

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

  return (
    <main className="min-h-screen bg-[#0b0f19] text-slate-100 selection:bg-indigo-500 selection:text-white py-8 px-4 sm:px-6 lg:px-8">
      {/* Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        {/* Navigation Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-800 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            실크로드 학습 포털 메인으로 돌아가기
          </Link>
          <span className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-mono font-bold">
            {mod.id}.html
          </span>
        </div>

        {/* Module Detail Card Container */}
        <article className="glass-card rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl space-y-8">
          {/* Header Info */}
          <div className="space-y-4 border-b border-slate-800 pb-8">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              {mod.category}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              {mod.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 italic border-l-4 border-l-indigo-500 pl-4 py-1 bg-indigo-500/10 rounded-r-xl">
              "{mod.summary}"
            </p>
          </div>

          {/* HTML Content Render Window */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm font-bold text-indigo-300 uppercase tracking-wider pb-2 border-b border-slate-800">
              <FileCode className="w-4.5 h-4.5 text-indigo-400" />
              실크로드 모듈 원본 가이드 문서 (HTML Content)
            </div>

            <div
              className="prose prose-invert max-w-none text-slate-200 text-base leading-relaxed bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800/90 overflow-x-auto shadow-inner"
              dangerouslySetInnerHTML={{ __html: mod.full_html }}
            />
          </div>

          {/* Code Snippets Section if present */}
          {mod.code_snippets && mod.code_snippets.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-300 uppercase tracking-wider">
                <Code2 className="w-4.5 h-4.5 text-indigo-400" />
                추출된 핵심 SQL 및 C# 로직 코드
              </div>
              {mod.code_snippets.map((snippet, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden border border-slate-800 bg-[#080b12]"
                >
                  <div className="bg-[#121826] px-4 py-2 text-xs font-mono text-indigo-300 border-b border-slate-800 flex items-center justify-between">
                    <span>Snippet #{idx + 1}</span>
                    <span className="text-[10px] text-slate-500 uppercase">Code</span>
                  </div>
                  <pre className="p-5 font-mono text-sm text-indigo-100 overflow-x-auto leading-relaxed">
                    <code>{snippet}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}
        </article>
      </div>
    </main>
  );
}
