import modulesData from "@/data/modules.json";

export interface StudyModule {
  id: string;
  filename: string;
  title: string;
  category: string;
  summary: string;
  full_html: string;
  code_snippets: string[];
}

export function getAllModules(): StudyModule[] {
  return modulesData as StudyModule[];
}

export function getModuleById(id: string): StudyModule | null {
  const modules = getAllModules();
  return modules.find((m) => m.id.toLowerCase() === id.toLowerCase()) || null;
}
