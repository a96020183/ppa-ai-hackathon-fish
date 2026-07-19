# -*- coding: utf-8 -*-
import pandas as pd
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
path = r"C:\Users\Fung N2\AWS\PPA ｜AWS_Hackathon_Data_Set.xlsx"
xl = pd.ExcelFile(path)
ask   = xl.parse('AI提問'); conv = xl.parse('AI對話')
watch = xl.parse('會員觀看紀錄'); beh = xl.parse('會員首次使用AI前後行為')

print("=== A. 對話深度 double-check ===")
msgs = conv.groupby('對話ID').size()
usr  = conv[conv['訊息角色']=='user'].groupby('對話ID').size()
print("對話數=%d 訊息列=%d" % (conv['對話ID'].nunique(), len(conv)))
print("每對話訊息數 mean=%.3f median=%.1f" % (msgs.mean(), msgs.median()))
print("每對話user發問 mean=%.3f median=%.1f" % (usr.mean(), usr.median()))
print("僅1則user(問完就走) = %d/%d = %.1f%%" % ((usr<=1).sum(), len(usr), (usr<=1).mean()*100))

print("\n=== B. 前後行為『其他』double-check ===")
tot = len(beh)
c_other = (beh['行為類別']=='其他').sum()
p_other = beh['頁面說明'].astype(str).str.fullmatch('其他').sum()
print("總事件=%d" % tot)
print("行為類別=其他: %d (%.1f%%)" % (c_other, c_other/tot*100))
print("頁面說明=其他(精確): %d (%.1f%%)" % (p_other, p_other/tot*100))
print("學習中: %d (%.1f%%)  購買轉換: %d (%.1f%%)  AI助教: %d (%.1f%%)" % (
    (beh['行為類別']=='學習中').sum(), (beh['行為類別']=='學習中').mean()*100,
    (beh['行為類別']=='購買轉換').sum(), (beh['行為類別']=='購買轉換').mean()*100,
    (beh['行為類別']=='AI 助教').sum(), (beh['行為類別']=='AI 助教').mean()*100))

print("\n=== C. AI用戶 vs 非用戶 看課量（穩健度檢查）===")
wc = watch.groupby('會員ID').size()
ai = set(ask['會員 ID'])
g_ai = wc[[m for m in wc.index if m in ai]]
g_no = wc[[m for m in wc.index if m not in ai]]
for name,g in [("AI用戶",g_ai),("非AI",g_no)]:
    print("%s: n=%d mean=%.1f median=%.1f p75=%.1f 重度(>=50筆)佔比=%.1f%%" % (
        name, len(g), g.mean(), g.median(), g.quantile(.75), (g>=50).mean()*100))
print("mean倍數=%.2fx  median倍數=%.2fx" % (g_ai.mean()/g_no.mean(), g_ai.median()/g_no.median()))

# 相關性：問AI次數 vs 看課筆數
ask_cnt = ask.groupby('會員 ID').size()
df = pd.DataFrame({'ask':ask_cnt}).join(pd.DataFrame({'watch':wc}), how='inner')
print("問AI次數 與 看課筆數 相關係數 r=%.3f (n=%d)" % (df['ask'].corr(df['watch']), len(df)))
