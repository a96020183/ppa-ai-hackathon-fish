# -*- coding: utf-8 -*-
import json, io, sys, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

SRC = r"C:\Users\Fung N2\.kiro\sessions\51577e5f83023bb1\sess_b67207ff-b5c4-47b6-8807-c1159589af6b\messages.jsonl"
OUT = r"C:\Users\Fung N2\AWS\對話紀錄_逐字稿.md"

lines = open(SRC, encoding='utf-8').read().splitlines()

out = ["# Kiro 對話逐字稿 — PPA AI Hackathon（團隊 fish）",
       "",
       "> 由 messages.jsonl 匯出，僅保留使用者訊息與 Kiro 回覆（略過內部思考、工具呼叫、圖片 base64）。",
       ""]

def ts(rec):
    t = rec.get('timestamp')
    if not t:
        return ''
    return str(t)

user_n = 0
ai_n = 0
for l in lines:
    try:
        rec = json.loads(l)
    except Exception:
        continue
    p = rec.get('payload', {})
    typ = p.get('type')
    if typ == 'user':
        content = (p.get('content') or '').strip()
        if not content:
            continue
        imgs = p.get('images') or []
        docs = p.get('documents') or []
        extra = ''
        if imgs: extra += f"（附 {len(imgs)} 張圖片）"
        if docs: extra += f"（附 {len(docs)} 份文件）"
        user_n += 1
        out.append(f"\n---\n\n### 🧑 使用者 {extra}\n")
        out.append(content)
    elif typ == 'assistant' and p.get('operationType') == 'Say':
        content = (p.get('content') or '').strip()
        if not content:
            continue
        ai_n += 1
        out.append(f"\n**🤖 Kiro：**\n")
        out.append(content)

text = "\n".join(out) + "\n"
with io.open(OUT, 'w', encoding='utf-8') as f:
    f.write(text)

print("WROTE:", OUT)
print("使用者訊息:", user_n, " Kiro 回覆:", ai_n, " 總字元:", len(text))
