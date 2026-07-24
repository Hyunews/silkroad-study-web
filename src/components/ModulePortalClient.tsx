"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { StudyModule } from "@/lib/modules";
import {
  Search,
  BookOpen,
  FolderOpen,
  Code,
  Layers,
  FileCode,
  ArrowRight,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Building2,
} from "lucide-react";

interface Props {
  initialModules: StudyModule[];
}

export default function ModulePortalClient({ initialModules }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "All", label: "전체 모듈 (All)" },
    { id: "WAGE1000 시리즈 (시스템/환경 설정)", label: "⚙️ WAGE1000 (시스템/기초)" },
    { id: "WAGE2000 시리즈 (인사/증명서 관리)", label: "👥 WAGE2000 (인사/증명서)" },
    { id: "WAGE3000 시리즈 (근태/급상여 관리)", label: "💰 WAGE3000 (급여/근태)" },
    { id: "WAGE4000 시리즈 (연말정산/보고서)", label: "📊 WAGE4000 (정산/보고서)" },
    { id: "WAGE9000 시리즈 (특수/유틸리티)", label: "🔧 WAGE9000 (유틸리티)" },
  ];

  // Filter modules
  const filteredModules = useMemo(() => {
    return initialModules.filter((module) => {
      const q = searchQuery.trim().toLowerCase();

      if (q.length > 0) {
        const matchesTitle = module.title.toLowerCase().includes(q);
        const matchesId = module.id.toLowerCase().includes(q);
        const matchesSummary = module.summary.toLowerCase().includes(q);
        const matchesCat = module.category.toLowerCase().includes(q);
        return matchesTitle || matchesId || matchesSummary || matchesCat;
      }

      return selectedCategory === "All" || module.category === selectedCategory;
    });
  }, [initialModules, selectedCategory, searchQuery]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT STICKY SIDEBAR (3-Cols) */}
      <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-8">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/30 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2 text-sm font-bold text-indigo-300 uppercase tracking-wider mb-4 pb-3 border-b border-slate-800">
            <FolderOpen className="w-4.5 h-4.5 text-indigo-400" />
            WAGE 모듈 카테고리
          </div>

          <div className="space-y-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id && searchQuery === "";
              const count =
                cat.id === "All"
                  ? initialModules.length
                  : initialModules.filter((m) => m.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSearchQuery("");
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    active
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 border border-indigo-400/40"
                      : "bg-slate-800/40 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  <span className="truncate">{cat.label}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-mono ml-2 shrink-0 ${
                      active ? "bg-indigo-800 text-white" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* System Architecture Quick Stats Box */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
          <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3 pb-2 border-b border-slate-800 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-400" />
            실크로드 시스템 아키텍처
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>C# WinForms 3-Tier 아키텍처</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>BaseCode & DataProc 공통 모듈</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>MS-SQL / Oracle 암호화 연동</span>
            </li>
          </ul>
        </div>
      </aside>

      {/* RIGHT MAIN MODULES GRID (9-Cols) */}
      <main className="lg:col-span-9 space-y-6">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="relative w-full flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="모듈 ID (WG2100 등), 모듈명, SQL 키워드 검색..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
              />
            </div>
            {(searchQuery || selectedCategory !== "All") && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                초기화
              </button>
            )}
          </div>
        </div>

        {/* Filter Status */}
        <div className="text-xs font-medium text-slate-400 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {searchQuery ? (
              <span>
                키워드 <strong className="text-indigo-400">"{searchQuery}"</strong> 검색 결과:{" "}
                <strong className="text-emerald-400">{filteredModules.length}개 모듈</strong>
              </span>
            ) : (
              <span>
                선택된 시리즈 <strong className="text-indigo-400">[{selectedCategory}]</strong>:{" "}
                <strong className="text-emerald-400">{filteredModules.length}개 모듈</strong>
              </span>
            )}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((mod) => (
            <div
              key={mod.id}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between group border border-slate-800/80 shadow-xl"
            >
              <div>
                {/* Module Badge & ID */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold uppercase tracking-wider font-mono">
                    {mod.id}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    HTML Guide
                  </span>
                </div>

                {/* Module Title Link */}
                <Link href={`/modules/${mod.id}`} className="block">
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-2 mb-2.5">
                    {mod.title}
                  </h3>
                </Link>

                {/* Category & Summary */}
                <div className="text-xs text-indigo-300 font-semibold mb-2">
                  {mod.category}
                </div>
                <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                  {mod.summary}
                </p>
              </div>

              <div>
                <Link
                  href={`/modules/${mod.id}`}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 hover:bg-indigo-600 text-slate-200 hover:text-white transition-all text-xs font-semibold border border-slate-800 hover:border-indigo-500"
                >
                  <span>상세 아키텍처 포털 보기</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
