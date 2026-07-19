# -*- coding: utf-8 -*-
import hashlib, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

target = "51577e5f83023bb1"
path = r"c:\Users\Fung N2\AWS"

# 各種路徑字串變體
variants = set()
bases = [
    r"c:\Users\Fung N2\AWS",
    r"C:\Users\Fung N2\AWS",
    "c:/Users/Fung N2/AWS",
    "C:/Users/Fung N2/AWS",
    "/c:/Users/Fung N2/AWS",
    "file:///c:/Users/Fung N2/AWS",
    "file:///C:/Users/Fung N2/AWS",
    "vscode-remote://...",  # placeholder
]
for b in bases:
    variants.add(b)
    variants.add(b + "\\")
    variants.add(b + "/")
    variants.add(b.lower())
    variants.add(b.upper())
    variants.add(b.lower() + "\\")
    variants.add(b.lower() + "/")

algos = ['md5', 'sha1', 'sha256', 'sha512', 'sha3_256', 'blake2b', 'blake2s']
encs = ['utf-8', 'utf-16-le']

found = False
for v in variants:
    for enc in encs:
        try:
            data = v.encode(enc)
        except Exception:
            continue
        for a in algos:
            h = hashlib.new(a, data).hexdigest()
            # 檢查前16 / 後16 是否命中
            if h[:16] == target or h[-16:] == target:
                print("HIT!", a, enc, repr(v), "full=", h)
                found = True

if not found:
    print("no direct hit. 印出幾個候選供比對：")
    for v in [path, path.lower(), path+"\\"]:
        for a in ['md5','sha1','sha256']:
            print(a, repr(v), '->', hashlib.new(a, v.encode('utf-8')).hexdigest()[:16])
