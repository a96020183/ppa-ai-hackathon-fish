import sys, io
from pypdf import PdfReader

path = r"C:\Users\Fung N2\AWS\PPA ｜AWS Hackathon.pdf"
reader = PdfReader(path)
out = []
for i, page in enumerate(reader.pages):
    out.append(f"----- PAGE {i+1} -----")
    try:
        out.append(page.extract_text() or "")
    except Exception as e:
        out.append(f"[extract error: {e}]")
text = "\n".join(out)
with io.open(r"C:\Users\Fung N2\AWS\sso\pdf_text.txt", "w", encoding="utf-8") as f:
    f.write(text)
print("PAGES:", len(reader.pages))
print("CHARS:", len(text))
