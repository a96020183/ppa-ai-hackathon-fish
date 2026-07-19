# -*- coding: utf-8 -*-
import pandas as pd
import sys, io
from collections import Counter

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
path = r"C:\Users\Fung N2\AWS\PPA ｜AWS_Hackathon_Data_Set.xlsx"
xl = pd.ExcelFile(path)
ask   = xl.parse('AI提問')
conv  = xl.parse('AI對話')
watch = xl.parse('會員觀看紀錄')
chal  = xl.parse('會員個人挑戰資料')
course= xl.parse('課程內容資料')
beh   = xl.parse('會員首次使用AI前後行為')

def line(): print("="*64)

# ---------- 1. 對話深度 ----------
line(); print("[1] AI 對話深度（驗證 Gemini 的 6.68 輪 / 40% 2 輪內）")
n_conv = conv['對話ID'].nunique()
print("AI對話 總訊息列數:", len(conv), " 不重複對話數:", n_conv)
msgs_per = conv.groupby('對話ID').size()
user_per = conv[conv['訊息角色']=='user'].groupby('對話ID').size()
print("每對話『總訊息數』 mean=%.2f median=%.1f max=%d" % (msgs_per.mean(), msgs_per.median(), msgs_per.max()))
print("每對話『user 發問次數』 mean=%.2f median=%.1f max=%d" % (user_per.mean(), user_per.median(), user_per.max()))
# 輪數定義：一來一回=1輪 ~ user訊息數
print("role 分布:", conv['訊息角色'].value_counts().to_dict())
le2_msg = (msgs_per<=2).mean()*100
u1 = (user_per<=1).mean()*100
u2 = (user_per<=2).mean()*100
print("總訊息<=2 的對話比例: %.1f%%" % le2_msg)
print("user 只發問 1 次的對話比例: %.1f%%" % u1)
print("user 發問 <=2 次的對話比例: %.1f%%" % u2)

# ---------- 2. 前後行為 ----------
line(); print("[2] 會員首次使用AI前後行為")
print("總事件:", len(beh), " 不重複會員:", beh['會員 ID'].nunique())
print("\n行為類別 分布:\n", beh['行為類別'].value_counts().to_string())
print("\n頁面說明 Top10:\n", beh['頁面說明'].value_counts().head(10).to_string())
other = (beh['頁面說明'].astype(str).str.contains('其他')).mean()*100
print("\n頁面說明=其他 佔比: %.1f%%" % other)
print("\n事件翻譯 Top10:\n", beh['事件翻譯'].value_counts().head(10).to_string())

# ---------- 3. 會員數 & 滲透 ----------
line(); print("[3] 會員數與 AI 滲透")
m_watch = set(watch['會員ID'])
m_ask   = set(ask['會員 ID'])
m_beh   = set(beh['會員 ID'])
m_chal  = set(chal['會員ID'])
allm = m_watch|m_ask|m_beh|m_chal
print("不重複會員: 觀看=%d 提問AI=%d 前後行為=%d 挑戰=%d 全部聯集=%d" %
      (len(m_watch),len(m_ask),len(m_beh),len(m_chal),len(allm)))

# ---------- 4. 有用AI vs 沒用AI 的看課量 ----------
line(); print("[4] 有用AI vs 沒用AI 的看課行為（觀看紀錄）")
wc = watch.groupby('會員ID').size()
ai_users = m_ask
grp_ai = wc[[m for m in wc.index if m in ai_users]]
grp_no = wc[[m for m in wc.index if m not in ai_users]]
print("有問過AI的會員: n=%d, 平均觀看筆數=%.1f, 中位數=%.1f" % (len(grp_ai), grp_ai.mean(), grp_ai.median()))
print("沒問過AI的會員: n=%d, 平均觀看筆數=%.1f, 中位數=%.1f" % (len(grp_no), grp_no.mean(), grp_no.median()))
if len(grp_no) and grp_no.mean():
    print("倍數(平均): %.2fx" % (grp_ai.mean()/grp_no.mean()))

# ---------- 5. 挑戰分類分布 ----------
line(); print("[5] 知識挑戰分類總量（47位會員）")
cat = Counter()
for s in chal['挑戰分類'].dropna():
    for part in str(s).split(';'):
        if ':' in part:
            k,v = part.split(':')
            try: cat[k.strip()] += int(v)
            except: pass
tot = sum(cat.values())
print("總挑戰次數:", tot)
for k,v in cat.most_common():
    print("  %s: %d (%.1f%%)" % (k, v, v/tot*100))

# ---------- 6. 課程觀看熱度 ----------
line(); print("[6] 課程內容資料")
print("內容數:", len(course), " 分類數:", course['分類'].nunique())
print("近7天觀看數: sum=%d mean=%.1f max=%d" % (course['近7天觀看數'].sum(), course['近7天觀看數'].mean(), course['近7天觀看數'].max()))
print("\n分類 Top10（依內容數）:\n", course['分類'].value_counts().head(10).to_string())
