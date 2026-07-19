import fitz  # PyMuPDF

path = r"C:\Users\Fung N2\AWS\PPA ｜AWS Hackathon.pdf"
doc = fitz.open(path)
# render the garbled/important pages: 3,4,5,6,7,11,12 (1-indexed) -> 2..11 idx
pages = [2, 3, 4, 5, 6, 10, 11]  # 0-indexed for pages 3,4,5,6,7,11,12
for idx in pages:
    page = doc[idx]
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
    out = rf"C:\Users\Fung N2\AWS\sso\page_{idx+1}.png"
    pix.save(out)
    print("saved", out)
