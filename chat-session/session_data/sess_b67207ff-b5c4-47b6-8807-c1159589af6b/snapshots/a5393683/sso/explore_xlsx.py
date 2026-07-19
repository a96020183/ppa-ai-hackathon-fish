# -*- coding: utf-8 -*-
import pandas as pd
import sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

path = r"C:\Users\Fung N2\AWS\PPA ｜AWS_Hackathon_Data_Set.xlsx"
xl = pd.ExcelFile(path)
print("SHEETS:", xl.sheet_names)
print("=" * 60)
for s in xl.sheet_names:
    df = xl.parse(s)
    print(f"\n##### SHEET: {s} #####")
    print("shape:", df.shape)
    print("columns:", list(df.columns))
    print("--- head(3) ---")
    print(df.head(3).to_string())
    print("--- dtypes ---")
    print(df.dtypes.to_string())
