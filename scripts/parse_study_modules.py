import os
import re
import json

SOURCE_DIR = r"D:\silkroad\SILKWG06 (2)\_study"
OUTPUT_JSON = r"C:\Users\kilak\Desktop\PJ_Harness\01_projects\02_silkroad-study-web\src\data\modules.json"

def clean_html_tags(raw_html):
    clean = re.sub(r'<[^>]+>', ' ', raw_html)
    clean = re.sub(r'\s+', ' ', clean).strip()
    return clean

def parse_html_files():
    os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)
    modules = []

    files = [f for f in os.listdir(SOURCE_DIR) if f.endswith(".html")]

    for filename in sorted(files):
        filepath = os.path.join(SOURCE_DIR, filename)
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()

        title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
        title = title_match.group(1).strip() if title_match else filename

        h1_match = re.search(r'<h1>(.*?)</h1>', content, re.IGNORECASE | re.DOTALL)
        main_title = clean_html_tags(h1_match.group(1)) if h1_match else title

        module_id = os.path.splitext(filename)[0]
        category = "기타 모듈"
        if module_id.startswith("WG1"):
            category = "WAGE1000 시리즈 (시스템/환경 설정)"
        elif module_id.startswith("WG2"):
            category = "WAGE2000 시리즈 (인사/증명서 관리)"
        elif module_id.startswith("WG3"):
            category = "WAGE3000 시리즈 (근태/급상여 관리)"
        elif module_id.startswith("WG4"):
            category = "WAGE4000 시리즈 (연말정산/보고서)"
        elif module_id.startswith("WG9"):
            category = "WAGE9000 시리즈 (특수/유틸리티)"

        paragraphs = re.findall(r'<p[^>]*>(.*?)</p>', content, re.IGNORECASE | re.DOTALL)
        clean_paragraphs = [clean_html_tags(p) for p in paragraphs if len(clean_html_tags(p)) > 10]
        summary = clean_paragraphs[0] if clean_paragraphs else "SILKWG06 핵심 업무 모듈 상세 가이드"

        code_blocks = re.findall(r'<code[^>]*>(.*?)</code>', content, re.IGNORECASE | re.DOTALL)
        clean_code_blocks = [clean_html_tags(c) for c in code_blocks if len(clean_html_tags(c)) > 5]

        modules.append({
            "id": module_id,
            "filename": filename,
            "title": main_title,
            "category": category,
            "summary": summary[:160],
            "full_html": content,
            "code_snippets": clean_code_blocks[:5]
        })

    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(modules, f, ensure_ascii=False, indent=2)

    print(f"Parsed {len(modules)} HTML modules successfully into {OUTPUT_JSON}")

if __name__ == "__main__":
    parse_html_files()
