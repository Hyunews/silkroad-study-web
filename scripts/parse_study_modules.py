import os
import re
import json

SOURCE_DIR = r"D:\silkroad\SILKWG06 (2)\_study"
OUTPUT_JSON = r"C:\Users\kilak\Desktop\PJ_Harness\01_projects\02_silkroad-study-web\src\data\modules.json"

def clean_html_tags(raw_html):
    clean = re.sub(r'<[^>]+>', ' ', raw_html)
    clean = re.sub(r'\s+', ' ', clean).strip()
    return clean

def normalize_links(html_content):
    """
    Convert relative html links like index.html -> / and WG1000.html -> /modules/WG1000
    so Next.js routing never throws 404/400 errors!
    """
    # 1. Convert index.html -> /
    html = re.sub(r'href=["\'](?:.*?/)?index\.html["\']', 'href="/"', html_content, flags=re.IGNORECASE)
    
    # 2. Convert WGxxxx.html -> /modules/WGxxxx
    def replace_module_link(match):
        mod_id = match.group(1).upper()
        return f'href="/modules/{mod_id}"'

    html = re.sub(r'href=["\'](?:.*?/)?(WG\d+[A-Z0-9]*)\.html["\']', replace_module_link, html, flags=re.IGNORECASE)
    return html

def extract_main_content(raw_html):
    """
    Extract exact <div class="main-content">...</div> or body content from original HTML
    """
    main_match = re.search(r'<div[^>]*class=["\'][^"\']*main-content[^"\']*["\'][^>]*>(.*?)</div>\s*</body>', raw_html, re.IGNORECASE | re.DOTALL)
    if main_match:
        return main_match.group(1).strip()
    
    body_match = re.search(r'<body[^>]*>(.*?)</body>', raw_html, re.IGNORECASE | re.DOTALL)
    if body_match:
        # Remove sidebar from body if present to avoid duplication
        body = body_match.group(1)
        body_clean = re.sub(r'<div[^>]*class=["\'][^"\']*sidebar[^"\']*["\'][^>]*>.*?</div>', '', body, flags=re.IGNORECASE | re.DOTALL)
        return body_clean.strip()
        
    return raw_html.strip()

def parse_html_files():
    os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)
    modules = []

    files = [f for f in os.listdir(SOURCE_DIR) if f.endswith(".html")]

    for filename in sorted(files):
        filepath = os.path.join(SOURCE_DIR, filename)
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()

        # Normalize links for Next.js routing
        normalized_content = normalize_links(content)

        title_match = re.search(r'<title>(.*?)</title>', normalized_content, re.IGNORECASE | re.DOTALL)
        title = title_match.group(1).strip() if title_match else filename

        h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', normalized_content, re.IGNORECASE | re.DOTALL)
        main_title = clean_html_tags(h1_match.group(1)) if h1_match else title

        module_id = os.path.splitext(filename)[0].upper()
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

        paragraphs = re.findall(r'<p[^>]*>(.*?)</p>', normalized_content, re.IGNORECASE | re.DOTALL)
        clean_paragraphs = [clean_html_tags(p) for p in paragraphs if len(clean_html_tags(p)) > 10]
        summary = clean_paragraphs[0] if clean_paragraphs else "SILKWG06 핵심 업무 모듈 상세 가이드"

        code_blocks = re.findall(r'<code[^>]*>(.*?)</code>', normalized_content, re.IGNORECASE | re.DOTALL)
        clean_code_blocks = [clean_html_tags(c) for c in code_blocks if len(clean_html_tags(c)) > 5]

        main_html = extract_main_content(normalized_content)

        modules.append({
            "id": module_id,
            "filename": filename,
            "title": main_title,
            "category": category,
            "summary": summary[:160],
            "main_html": main_html,
            "full_html": normalized_content,
            "code_snippets": clean_code_blocks[:5]
        })

    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(modules, f, ensure_ascii=False, indent=2)

    print(f"Normalized links and extracted main content for {len(modules)} HTML modules into {OUTPUT_JSON}")

if __name__ == "__main__":
    parse_html_files()
