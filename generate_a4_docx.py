import os
import sys
import docx
from docx.shared import Inches, Pt, RGBColor, Mm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn
import fitz

BASE_DIR = r"D:\Local Codebase\BSR Films"
OUT_DIR = r"C:\Users\Soubhagya\.gemini\antigravity\brain\eb81d130-1154-4f36-95c8-f4a050062af1"
OUT_DOCX = os.path.join(OUT_DIR, "BSR_Films_Print_Portfolio_A4.docx")
TARGET_DOCX = os.path.join(BASE_DIR, "public", "BSR_Films_Print_Portfolio_A4.docx")

# Generate high-resolution seal from SVG
svg_seal_big = """<svg width="160" height="160" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="40" r="37" stroke="#8C4E00" stroke-width="3.2" stroke-dasharray="4 2.5" fill="#FFFDF8"/>
  <circle cx="40" cy="40" r="30" stroke="#8C4E00" stroke-width="2.4" fill="#FAF2E3"/>
  <circle cx="40" cy="40" r="22" stroke="#8C4E00" stroke-width="2" fill="#FFFFFF"/>
  <path d="M40 24L43 32.5L52 33.8L45.5 40.2L47.2 49.2L40 44.8L32.8 49.2L34.5 40.2L28 33.8L37 32.5L40 24Z" fill="#8C4E00"/>
  <circle cx="40" cy="13" r="2" fill="#8C4E00"/>
  <circle cx="40" cy="67" r="2" fill="#8C4E00"/>
  <circle cx="13" cy="40" r="2" fill="#8C4E00"/>
  <circle cx="67" cy="40" r="2" fill="#8C4E00"/>
</svg>"""

seal_png_path = os.path.join(OUT_DIR, "seal_300dpi.png")
svg_doc = fitz.open(stream=svg_seal_big.encode('utf-8'), filetype='svg')
pix = svg_doc[0].get_pixmap(dpi=300)
pix.save(seal_png_path)
print(f"Generated 300 DPI Seal PNG at: {seal_png_path}")

# Vector Crest
svg_crest_big = """<svg width="120" height="120" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 8L60 16V36C60 52 40 70 40 70C40 70 20 52 20 36V16L40 8Z" fill="#FAF2E3" stroke="#8C4E00" stroke-width="3.2" stroke-linejoin="round"/>
  <path d="M30 30C35 27 45 27 50 30V48C45 45 35 45 30 48V30Z" fill="#FFFFFF" stroke="#8C4E00" stroke-width="2.4"/>
  <line x1="40" y1="28" x2="40" y2="47" stroke="#8C4E00" stroke-width="2.4"/>
  <circle cx="40" cy="20" r="4" fill="#8C4E00"/>
</svg>"""

crest_png_path = os.path.join(OUT_DIR, "crest_300dpi.png")
svg_doc2 = fitz.open(stream=svg_crest_big.encode('utf-8'), filetype='svg')
pix2 = svg_doc2[0].get_pixmap(dpi=300)
pix2.save(crest_png_path)
print(f"Generated 300 DPI Crest PNG at: {crest_png_path}")

# Assets
cm_img_path = os.path.join(BASE_DIR, "public", "cm-award.jpg")
bhishma_img_path = os.path.join(BASE_DIR, "public", "team", "bhishma.png")
logo_img_path = os.path.join(BASE_DIR, "public", "bsr-logo-clean.png")
icon_img_path = os.path.join(BASE_DIR, "public", "bsr-icon.png")

# Palette
COLOR_GOLD = RGBColor(140, 78, 0)      # #8C4E00
COLOR_DARK = RGBColor(10, 10, 10)      # #0A0A0A
COLOR_BODY = RGBColor(26, 26, 26)      # #1A1A1A
COLOR_MUTED = RGBColor(85, 85, 85)     # #555555
COLOR_BORDER_GOLD = "8C4E00"
COLOR_BG_CARD = "FAF6F0"
COLOR_BG_HIGHLIGHT = "FAF2E3"
COLOR_BG_WHITE = "FFFFFF"
COLOR_BG_PILL = "FAF2E3"
FONT_DEVANAGARI = "Noto Sans Devanagari"

def set_cell_background(cell, hex_color):
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    cell._tc.get_or_add_tcPr().append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=140, right=140):
    tcMar = parse_xml(f'''
        <w:tcMar {nsdecls("w")}>
            <w:top w:w="{top}" w:type="dxa"/>
            <w:bottom w:w="{bottom}" w:type="dxa"/>
            <w:left w:w="{left}" w:type="dxa"/>
            <w:right w:w="{right}" w:type="dxa"/>
        </w:tcMar>
    ''')
    cell._tc.get_or_add_tcPr().append(tcMar)

def set_cell_borders(cell, top=None, bottom=None, left=None, right=None):
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(f'<w:tcBorders {nsdecls("w")}/>')
    
    borders_dict = {'top': top, 'bottom': bottom, 'left': left, 'right': right}
    for side, border in borders_dict.items():
        if border:
            val, sz, color = border
            el = parse_xml(f'<w:{side} {nsdecls("w")} w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>')
            borders.append(el)
        else:
            el = parse_xml(f'<w:{side} {nsdecls("w")} w:val="none"/>')
            borders.append(el)
    tcPr.append(borders)

def style_run(run, font_name=FONT_DEVANAGARI, size_pt=9.5, bold=False, italic=False, color_rgb=COLOR_BODY):
    run.font.name = font_name
    run.font.size = Pt(size_pt)
    run.bold = bold
    run.italic = italic
    if color_rgb:
        run.font.color.rgb = color_rgb

def style_paragraph(p, space_before=0, space_after=1.5, line_spacing=1.12, align=WD_ALIGN_PARAGRAPH.LEFT):
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = line_spacing
    p.alignment = align

# Create Document
doc = docx.Document()
section = doc.sections[0]
section.page_width = Mm(210)
section.page_height = Mm(297)
section.top_margin = Mm(7)
section.bottom_margin = Mm(6)
section.left_margin = Mm(11)
section.right_margin = Mm(11)

print("Configured A4 margins.")

# Helper to add section headers
def add_section_header(doc, title_text, sub_text):
    tbl = doc.add_table(rows=1, cols=2)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    c_left, c_right = tbl.rows[0].cells
    c_left.width = Mm(130)
    c_right.width = Mm(58)
    set_cell_margins(c_left, top=30, bottom=40, left=0, right=0)
    set_cell_margins(c_right, top=30, bottom=40, left=0, right=0)
    set_cell_borders(c_left, bottom=('single', '12', COLOR_BORDER_GOLD))
    set_cell_borders(c_right, bottom=('single', '12', COLOR_BORDER_GOLD))
    
    p_l = c_left.paragraphs[0]
    style_paragraph(p_l, space_before=2, space_after=1)
    r_l = p_l.add_run(title_text)
    style_run(r_l, size_pt=10.5, bold=True, color_rgb=COLOR_DARK)
    
    p_r = c_right.paragraphs[0]
    style_paragraph(p_r, space_before=2, space_after=1, align=WD_ALIGN_PARAGRAPH.RIGHT)
    r_r = p_r.add_run(sub_text)
    style_run(r_r, size_pt=8.5, bold=True, color_rgb=COLOR_GOLD)

# Helper to build Page Header
def add_page_header(doc, p_num):
    header_tbl = doc.add_table(rows=1, cols=2)
    header_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    c1, c2 = header_tbl.rows[0].cells
    c1.width = Mm(135)
    c2.width = Mm(53)
    set_cell_margins(c1, top=0, bottom=40, left=0, right=0)
    set_cell_margins(c2, top=0, bottom=40, left=0, right=0)
    set_cell_borders(c1, bottom=('single', '16', COLOR_BORDER_GOLD))
    set_cell_borders(c2, bottom=('single', '16', COLOR_BORDER_GOLD))
    
    p1 = c1.paragraphs[0]
    style_paragraph(p1, space_before=0, space_after=1)
    r_icon = p1.add_run()
    r_icon.add_picture(icon_img_path, width=Mm(9.5))
    r_title = p1.add_run("  बी.एस.आर. फिल्मस\n")
    style_run(r_title, size_pt=16, bold=True, color_rgb=COLOR_DARK)
    if p_num == 1:
        r_sub = p1.add_run("फिल्म, टीवी, वृत्तचित्र एवं मीडिया प्रोडक्शन हाउस")
    else:
        r_sub = p1.add_run("संस्थापक नेतृत्व, प्रतिष्ठित क्लाइंट्स एवं प्रमाणीकरण")
    style_run(r_sub, size_pt=8.5, bold=True, color_rgb=COLOR_GOLD)
    
    p2 = c2.paragraphs[0]
    style_paragraph(p2, space_before=2, space_after=1, align=WD_ALIGN_PARAGRAPH.RIGHT)
    if p_num == 1:
        r_meta = p2.add_run("25+ वर्ष मीडिया उत्कृष्टता\nसंवाद 'ब' श्रेणी • NFDC एनलिस्टेड")
    else:
        r_meta = p2.add_run("24+ प्रमुख संस्थाएं\nवैधानिक प्रमाणीकरण संचिका")
    style_run(r_meta, size_pt=8.2, bold=True, color_rgb=COLOR_MUTED)

# Helper to build Page Footer
def add_page_footer(doc, p_num):
    ft_tbl = doc.add_table(rows=1, cols=2)
    ft_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    c1, c2 = ft_tbl.rows[0].cells
    c1.width = Mm(140)
    c2.width = Mm(48)
    set_cell_margins(c1, top=30, bottom=0, left=0, right=0)
    set_cell_margins(c2, top=30, bottom=0, left=0, right=0)
    set_cell_borders(c1, top=('single', '8', 'CCCCCC'))
    set_cell_borders(c2, top=('single', '8', 'CCCCCC'))
    
    p1 = c1.paragraphs[0]
    style_paragraph(p1, space_before=1, space_after=0)
    r1 = p1.add_run("बी.एस.आर. फिल्मस ")
    style_run(r1, size_pt=8, bold=True, color_rgb=COLOR_GOLD)
    r2 = p1.add_run("• आधिकारिक कॉरपोरेट प्रोफाइल • www.bsrfilms.com")
    style_run(r2, size_pt=7.8, color_rgb=COLOR_MUTED)
    
    p2 = c2.paragraphs[0]
    style_paragraph(p2, space_before=1, space_after=0, align=WD_ALIGN_PARAGRAPH.RIGHT)
    r_pg = p2.add_run(f"पृष्ठ {p_num} / 2")
    style_run(r_pg, size_pt=7.8, bold=True, color_rgb=COLOR_DARK)

# ═══════════════════════════════════════════════════════════════════
# PAGE 1 OF 2
# ═══════════════════════════════════════════════════════════════════
add_page_header(doc, 1)

# Top Hero Table: CM Award Photo Centerpiece + Brand Showcase
hero_tbl = doc.add_table(rows=1, cols=2)
hero_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
c_img, c_text = hero_tbl.rows[0].cells
c_img.width = Mm(30)
c_text.width = Mm(158)
c_img.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
c_text.vertical_alignment = WD_ALIGN_VERTICAL.CENTER

set_cell_background(c_img, COLOR_BG_HIGHLIGHT)
set_cell_background(c_text, COLOR_BG_HIGHLIGHT)
set_cell_margins(c_img, top=60, bottom=60, left=80, right=60)
set_cell_margins(c_text, top=60, bottom=60, left=60, right=80)
set_cell_borders(c_img,
    top=('single', '14', COLOR_BORDER_GOLD),
    bottom=('single', '14', COLOR_BORDER_GOLD),
    left=('single', '14', COLOR_BORDER_GOLD))
set_cell_borders(c_text,
    top=('single', '14', COLOR_BORDER_GOLD),
    bottom=('single', '14', COLOR_BORDER_GOLD),
    right=('single', '14', COLOR_BORDER_GOLD))

# Image cell
p_im = c_img.paragraphs[0]
style_paragraph(p_im, space_before=0, space_after=2, align=WD_ALIGN_PARAGRAPH.CENTER)
r_cm = p_im.add_run()
r_cm.add_picture(cm_img_path, width=Mm(25.5))

p_im_cap = c_img.add_paragraph()
style_paragraph(p_im_cap, space_before=1, space_after=0, align=WD_ALIGN_PARAGRAPH.CENTER)
r_cap1 = p_im_cap.add_run("मा. मुख्यमंत्री द्वारा सम्मान\n")
style_run(r_cap1, size_pt=7, bold=True, color_rgb=COLOR_GOLD)
r_cap2 = p_im_cap.add_run("'दीदी के गोठ' राज्य कार्यक्रम")
style_run(r_cap2, size_pt=6.5, bold=True, color_rgb=COLOR_MUTED)

# Text cell
p_t1 = c_text.paragraphs[0]
style_paragraph(p_t1, space_before=0, space_after=1)
r_bname = p_t1.add_run("बी.एस.आर. फिल्मस  ")
style_run(r_bname, size_pt=16, bold=True, color_rgb=COLOR_DARK)
r_blogo = p_t1.add_run()
r_blogo.add_picture(logo_img_path, width=Mm(28))

p_t2 = c_text.add_paragraph()
style_paragraph(p_t2, space_before=0, space_after=2)
r_tag = p_t2.add_run("सेंट्रल इंडिया का प्रतिष्ठित मीडिया प्रोडक्शन हाउस")
style_run(r_tag, size_pt=8.8, bold=True, color_rgb=COLOR_GOLD)

p_t3 = c_text.add_paragraph()
style_paragraph(p_t3, space_before=0, space_after=2)
r_lead = p_t3.add_run("माननीय मुख्यमंत्री श्री विष्णु देव साय जी द्वारा सम्मानित • संस्कृति, सृजनात्मकता एवं प्रसारण तकनीक का 25+ वर्षों का अटूट विश्वास।")
style_run(r_lead, size_pt=8.2, bold=True, color_rgb=COLOR_BODY)

p_pills = c_text.add_paragraph()
style_paragraph(p_pills, space_before=1, space_after=0)
pills_text = [
    "छत्तीसगढ़ संवाद 'ब' श्रेणी",
    "NFDC एनलिस्टेड एजेंसी (निदेशक अनुबंध)",
    "प्रसार भारती / दूरदर्शन वीडियो स्पॉट",
    "आकाशवाणी 06 केंद्र प्रसारण",
    "केंद्रीय विक्रय एकांश में पंजीकृत",
    "MSME रजिस्टर्ड"
]
for p_idx, pt in enumerate(pills_text):
    r_pill = p_pills.add_run(f"[{pt}]  ")
    style_run(r_pill, size_pt=7.5, bold=True, color_rgb=COLOR_GOLD)

# Stats Section (3 cols x 2 rows)
add_section_header(doc, "प्रमुख सांख्यिकी एवं उपलब्धियां", "प्रमाणित मीडिया परिमाण")

stats_tbl = doc.add_table(rows=2, cols=3)
stats_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
stats_data = [
    [("650+", "विज्ञापन स्पॉट्स", "Commercial Ads & Promos"),
     ("350+", "वृत्तचित्र निर्माण", "Research Documentaries"),
     ("500+", "ऑडियो कार्यक्रम", "Jingles & Radio Serials")],
    [("400+", "रेडियो जिंगल्स", "शासकीय, निगम व कॉर्पोरेट"),
     ("32+", "वर्ष मीडिया अनुभव", "Industry Leadership"),
     ("10+", "एनिमेशन व ग्राफिक्स", "2D / 3D Motion VFX")]
]

for r_idx in range(2):
    for c_idx in range(3):
        num, lbl, sub = stats_data[r_idx][c_idx]
        cell = stats_tbl.rows[r_idx].cells[c_idx]
        cell.width = Mm(62.6)
        set_cell_background(cell, COLOR_BG_CARD)
        set_cell_margins(cell, top=30, bottom=30, left=40, right=40)
        set_cell_borders(cell,
            top=('single', '6', 'E6DEC8'),
            bottom=('single', '6', 'E6DEC8'),
            left=('single', '6', 'E6DEC8'),
            right=('single', '6', 'E6DEC8'))
        
        p = cell.paragraphs[0]
        style_paragraph(p, space_before=1, space_after=1, align=WD_ALIGN_PARAGRAPH.CENTER)
        r_num = p.add_run(f"{num}\n")
        style_run(r_num, size_pt=14, bold=True, color_rgb=COLOR_GOLD)
        r_lbl = p.add_run(f"{lbl}\n")
        style_run(r_lbl, size_pt=8.5, bold=True, color_rgb=COLOR_DARK)
        r_sub = p.add_run(sub)
        style_run(r_sub, size_pt=7, color_rgb=COLOR_MUTED)

# Services Section (2 cols x 3 rows)
add_section_header(doc, "व्यावसायिक मीडिया सेवाएं — 6 प्रमुख कार्यक्षेत्र", "स्क्रिप्ट से स्क्रीन तक सम्पूर्ण निर्माण")

srv_tbl = doc.add_table(rows=3, cols=2)
srv_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
srv_data = [
    [("① • शोध एवं विकास", "350+ निर्मित", "वृत्तचित्र निर्माण (Documentary Films)", "शोध-आधारित, सामाजिक, जनजातीय एवं विकासात्मक डाक्यूमेंट्रीज। राज्य शासन व अंतरराष्ट्रीय संस्थाओं की फ्लैगशिप योजनाओं का प्रामाणिक दस्तावेजीकरण।"),
     ("② • शासकीय / कॉर्पोरेट संचार", "650+ निर्मित", "विज्ञापन व वीडियो स्पॉट्स (Commercials)", "हाई-इम्पैक्ट टीवी कमर्शियल्स, विज्ञापन, डिजिटल प्रोमोज एवं सोशल मीडिया रील्स। शासकीय योजनाओं व ब्रांड्स हेतु सशक्त विजुअल स्टोरीटेलिंग।")],
    [("③ • साउंड एवं ब्रॉडकास्ट", "500+ निर्मित", "ऑडियो कार्यक्रम व जिंगल्स (Audio Jingles)", "रेडियो जिंगल्स, जन-जागरूकता धारावाहिक, लोकगीत व पॉडकास्ट। आकाशवाणी के 6 केंद्रों हेतु विशेष ऑडियो कंटेंट, साउंड डिजाइनिंग व प्रभावी प्रसारण।"),
     ("④ • विजुअल इफेक्ट्स", "10+ प्रोजेक्ट्स", "2D / 3D एनिमेशन व वीएफएक्स (Animation)", "एक्सप्लेनर वीडियो, 3D आर्किटेक्चरल वॉकथ्रू, मोशन इंफोग्राफिक्स, कैरेक्टर एनीमेशन एवं उन्नत वीएफएक्स जो जटिल संदेशों को सहज बनाते हैं।")],
    [("⑤ • रेडियो प्रचार प्रसार", "400+ जिंगल्स", "रेडियो जिंगल्स निर्माण (Radio Jingles)", "400+ रेडियो जिंगल्स का निर्माण विभिन्न शासकीय विभागों, निगमों, मंडलों एवं कॉर्पोरेट संस्थानों हेतु आकाशवाणी द्वारा व्यापक प्रसारण।"),
     ("⑥ • लाइव इवेंट्स कवरेज", "4K मल्टी-कैमरा", "मल्टी-कैमरा लाइव प्रसारण (Multi-Cam Live)", "राज्योत्सव, राष्ट्रीय सम्मेलनों, शासकीय उत्सवों, खेल व सांस्कृतिक समारोहों का 4K मल्टी-कैमरा ब्रॉडकास्ट सेटअप एवं सीमलेस लाइव वेबकास्टिंग।")]
]

for r_idx in range(3):
    for c_idx in range(2):
        tag, b_txt, s_title, s_desc = srv_data[r_idx][c_idx]
        cell = srv_tbl.rows[r_idx].cells[c_idx]
        cell.width = Mm(94)
        set_cell_background(cell, COLOR_BG_WHITE)
        set_cell_margins(cell, top=30, bottom=30, left=50, right=50)
        set_cell_borders(cell,
            top=('single', '6', 'E6DEC8'),
            bottom=('single', '6', 'E6DEC8'),
            left=('single', '6', 'E6DEC8'),
            right=('single', '6', 'E6DEC8'))
        
        p = cell.paragraphs[0]
        style_paragraph(p, space_before=1, space_after=1)
        r_tag = p.add_run(f"{tag} • [{b_txt}]\n")
        style_run(r_tag, size_pt=7.2, bold=True, color_rgb=COLOR_GOLD)
        r_title = p.add_run(f"{s_title}\n")
        style_run(r_title, size_pt=8.8, bold=True, color_rgb=COLOR_GOLD)
        r_desc = p.add_run(s_desc)
        style_run(r_desc, size_pt=7.6, color_rgb=COLOR_BODY)

# Studio Infrastructure & Cinema Gear Summary
infra_tbl = doc.add_table(rows=1, cols=2)
infra_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
c_inf1, c_inf2 = infra_tbl.rows[0].cells
c_inf1.width = Mm(94)
c_inf2.width = Mm(94)
for cell in (c_inf1, c_inf2):
    set_cell_background(cell, COLOR_BG_CARD)
    set_cell_margins(cell, top=30, bottom=30, left=50, right=50)
    set_cell_borders(cell,
        top=('single', '8', COLOR_BORDER_GOLD),
        bottom=('single', '8', COLOR_BORDER_GOLD),
        left=('single', '8', COLOR_BORDER_GOLD),
        right=('single', '8', COLOR_BORDER_GOLD))

p_inf1 = c_inf1.paragraphs[0]
style_paragraph(p_inf1, space_before=1, space_after=1)
r_t_inf1 = p_inf1.add_run("सिनेमा उपकरण एवं लाइटिंग:\n")
style_run(r_t_inf1, size_pt=8, bold=True, color_rgb=COLOR_GOLD)
r_d_inf1 = p_inf1.add_run("• Sony FX Cinema Line / FX6 / FX3, Blackmagic 6K Pro, सिने प्राइम लेंस, Ronin RS3 Pro।\n• Aputure, Godox Pro LED पैनल्स, 1200W/600W COB, कटर्स एवं जनरेटर बैकअप।")
style_run(r_d_inf1, size_pt=7.5, color_rgb=COLOR_BODY)

p_inf2 = c_inf2.paragraphs[0]
style_paragraph(p_inf2, space_before=1, space_after=1)
r_t_inf2 = p_inf2.add_run("साउंड स्टूडियो एवं पोस्ट-प्रोडक्शन:\n")
style_run(r_t_inf2, size_pt=8, bold=True, color_rgb=COLOR_GOLD)
r_d_inf2 = p_inf2.add_run("• पूर्णतः एकॉस्टिक साउंडप्रूफ स्टूडियो, Neumann U87 / Sennheiser माइक्स, ProTools DAW।\n• Apple Mac Studio, DaVinci Resolve Studio 4K HDR, DJI 4K/5.1K सिनेमैटिक ड्रोन।")
style_run(r_d_inf2, size_pt=7.5, color_rgb=COLOR_BODY)

# Office Coordinates Box
addr_tbl = doc.add_table(rows=1, cols=1)
addr_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
c_addr = addr_tbl.rows[0].cells[0]
c_addr.width = Mm(188)
set_cell_background(c_addr, COLOR_BG_HIGHLIGHT)
set_cell_margins(c_addr, top=35, bottom=35, left=60, right=60)
set_cell_borders(c_addr,
    top=('single', '10', COLOR_BORDER_GOLD),
    bottom=('single', '10', COLOR_BORDER_GOLD),
    left=('single', '10', COLOR_BORDER_GOLD),
    right=('single', '10', COLOR_BORDER_GOLD))

p_ad = c_addr.paragraphs[0]
style_paragraph(p_ad, space_before=1, space_after=1)
r_ad_t = p_ad.add_run("कार्यालय एवं प्रोडक्शन स्टूडियो:  ")
style_run(r_ad_t, size_pt=8.2, bold=True, color_rgb=COLOR_GOLD)
r_ad_b = p_ad.add_run("राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 492013 (छ.ग.)\n")
style_run(r_ad_b, size_pt=7.8, color_rgb=COLOR_BODY)
r_ad_c = p_ad.add_run("दूरभाष: +91 7000866323, +91 9826167533  •  ईमेल: bsrfilms2017@gmail.com  •  वेबसाइट: www.bsrfilms.com")
style_run(r_ad_c, size_pt=7.8, bold=True, color_rgb=COLOR_DARK)

# Excellence Banner
ban_tbl = doc.add_table(rows=1, cols=2)
ban_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
c_b1, c_b2 = ban_tbl.rows[0].cells
c_b1.width = Mm(14)
c_b2.width = Mm(174)
c_b1.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
c_b2.vertical_alignment = WD_ALIGN_VERTICAL.CENTER

set_cell_background(c_b1, COLOR_BG_CARD)
set_cell_background(c_b2, COLOR_BG_CARD)
set_cell_margins(c_b1, top=30, bottom=30, left=40, right=20)
set_cell_margins(c_b2, top=30, bottom=30, left=20, right=50)
set_cell_borders(c_b1,
    top=('single', '8', COLOR_BORDER_GOLD),
    bottom=('single', '8', COLOR_BORDER_GOLD),
    left=('single', '8', COLOR_BORDER_GOLD))
set_cell_borders(c_b2,
    top=('single', '8', COLOR_BORDER_GOLD),
    bottom=('single', '8', COLOR_BORDER_GOLD),
    right=('single', '8', COLOR_BORDER_GOLD))

p_bi = c_b1.paragraphs[0]
style_paragraph(p_bi, space_before=0, space_after=0, align=WD_ALIGN_PARAGRAPH.CENTER)
r_cr = p_bi.add_run()
r_cr.add_picture(crest_png_path, width=Mm(10))

p_bt = c_b2.paragraphs[0]
style_paragraph(p_bt, space_before=0, space_after=0)
r_btt = p_bt.add_run("25+ वर्षों की अनवरत मीडिया उत्कृष्टता एवं विश्वसनीयता: ")
style_run(r_btt, size_pt=8, bold=True, color_rgb=COLOR_GOLD)
r_btd = p_bt.add_run("बी.एस.आर. फिल्मस मध्य भारत का अग्रणी प्रोडक्शन हाउस है, जो शासकीय एवं कॉर्पोरेट क्षेत्र में उच्च-गुणवत्ता पूर्ण फिल्म निर्माण, विज्ञापन एवं व्यापक प्रसारण अभियानों हेतु पूर्णतः समर्पित व प्रमाणित है।")
style_run(r_btd, size_pt=7.6, color_rgb=COLOR_BODY)

# Page 1 Footer
add_page_footer(doc, 1)

# Page Break
doc.add_page_break()

# ═══════════════════════════════════════════════════════════════════
# PAGE 2 OF 2
# ═══════════════════════════════════════════════════════════════════
add_page_header(doc, 2)

# Top Hero Table: Founder Executive Portrait Centerpiece
hero2_tbl = doc.add_table(rows=1, cols=2)
hero2_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
c2_img, c2_text = hero2_tbl.rows[0].cells
c2_img.width = Mm(30)
c2_text.width = Mm(158)
c2_img.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
c2_text.vertical_alignment = WD_ALIGN_VERTICAL.CENTER

set_cell_background(c2_img, COLOR_BG_HIGHLIGHT)
set_cell_background(c2_text, COLOR_BG_HIGHLIGHT)
set_cell_margins(c2_img, top=60, bottom=60, left=80, right=60)
set_cell_margins(c2_text, top=60, bottom=60, left=60, right=80)
set_cell_borders(c2_img,
    top=('single', '14', COLOR_BORDER_GOLD),
    bottom=('single', '14', COLOR_BORDER_GOLD),
    left=('single', '14', COLOR_BORDER_GOLD))
set_cell_borders(c2_text,
    top=('single', '14', COLOR_BORDER_GOLD),
    bottom=('single', '14', COLOR_BORDER_GOLD),
    right=('single', '14', COLOR_BORDER_GOLD))

# Founder Image
p2_im = c2_img.paragraphs[0]
style_paragraph(p2_im, space_before=0, space_after=2, align=WD_ALIGN_PARAGRAPH.CENTER)
r2_bh = p2_im.add_run()
r2_bh.add_picture(bhishma_img_path, width=Mm(25.5))

p2_im_cap = c2_img.add_paragraph()
style_paragraph(p2_im_cap, space_before=1, space_after=0, align=WD_ALIGN_PARAGRAPH.CENTER)
r2_cap1 = p2_im_cap.add_run("भीष्मदेव चतुर्वेदी\n")
style_run(r2_cap1, size_pt=7.5, bold=True, color_rgb=COLOR_GOLD)
r2_cap2 = p2_im_cap.add_run("संस्थापक एवं निर्देशक")
style_run(r2_cap2, size_pt=6.8, bold=True, color_rgb=COLOR_MUTED)

# Founder Text
p2_t1 = c2_text.paragraphs[0]
style_paragraph(p2_t1, space_before=0, space_after=1)
r2_name = p2_t1.add_run("भीष्मदेव चतुर्वेदी  ")
style_run(r2_name, size_pt=14.5, bold=True, color_rgb=COLOR_DARK)
r2_role_badge = p2_t1.add_run("[एंकर / डायरेक्टर / राइटर • प्रोड्यूसर]")
style_run(r2_role_badge, size_pt=8, bold=True, color_rgb=COLOR_GOLD)

p2_t2 = c2_text.add_paragraph()
style_paragraph(p2_t2, space_before=0, space_after=2)
r2_sub = p2_t2.add_run("संस्थापक, मुख्य निर्माता एवं वरिष्ठ फिल्म निर्देशक")
style_run(r2_sub, size_pt=8.8, bold=True, color_rgb=COLOR_GOLD)

p2_t3 = c2_text.add_paragraph()
style_paragraph(p2_t3, space_before=0, space_after=2)
r2_bio = p2_t3.add_run("32 से अधिक वर्षों से भारतीय सिनेमा, वृत्तचित्र एवं जनसंचार के क्षेत्र में सक्रिय सृजनात्मक नेतृत्व। राज्य एवं राष्ट्रीय स्तर पर सम्मानित मीडिया व्यक्तित्व।")
style_run(r2_bio, size_pt=8, color_rgb=COLOR_BODY)

p2_pills = c2_text.add_paragraph()
style_paragraph(p2_pills, space_before=1, space_after=2)
pills_f = [
    "अनुमोदित एंकर / राइटर / 'ए' ग्रेड कलाकार (AIR व दूरदर्शन)",
    "32+ वर्ष मीडिया अनुभव",
    "विषयों के विशेषज्ञ के रूप में सम्मानित व्यक्तित्व (के साथ हम कदम)"
]
for p_idx, pt in enumerate(pills_f):
    r_pill = p2_pills.add_run(f"[{pt}]  ")
    style_run(r_pill, size_pt=7.4, bold=True, color_rgb=COLOR_GOLD)

p2_bullets = c2_text.add_paragraph()
style_paragraph(p2_bullets, space_before=1, space_after=0)
r_b1 = p2_bullets.add_run("• सांस्कृतिक संरक्षण: 350+ वृत्तचित्र व फिल्मों का प्रामाणिक निर्देशन।\n• मार्गदर्शन: युवा फिल्मकारों व तकनीशियनों को व्यावसायिक प्रशिक्षण व मेंटरशिप।")
style_run(r_b1, size_pt=7.8, bold=True, color_rgb=COLOR_MUTED)

# Section: Statutory Registration & Empanelments
add_section_header(doc, "वैधानिक पंजीकरण, इम्पैनलमेंट एवं बैंकिंग साख", "आधिकारिक अधिकृत संस्थाएं")

reg_tbl = doc.add_table(rows=1, cols=2)
reg_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
c_r1, c_r2 = reg_tbl.rows[0].cells
c_r1.width = Mm(94)
c_r2.width = Mm(94)

for cell in (c_r1, c_r2):
    set_cell_background(cell, COLOR_BG_CARD)
    set_cell_margins(cell, top=30, bottom=30, left=50, right=50)
    set_cell_borders(cell,
        top=('single', '8', COLOR_BORDER_GOLD),
        bottom=('single', '8', COLOR_BORDER_GOLD),
        left=('single', '8', COLOR_BORDER_GOLD),
        right=('single', '8', COLOR_BORDER_GOLD))

p_r1 = c_r1.paragraphs[0]
style_paragraph(p_r1, space_before=1, space_after=1)
r_r1_t = p_r1.add_run("शासकीय एवं राष्ट्रीय इम्पैनलमेंट:\n")
style_run(r_r1_t, size_pt=8, bold=True, color_rgb=COLOR_GOLD)
r_r1_d = p_r1.add_run("• छत्तीसगढ़ संवाद: 'ब' श्रेणी अधिकृत प्रोडक्शन हाउस।\n• NFDC: राष्ट्रीय फिल्म विकास निगम एनलिस्टेड (निदेशक अनुबंध)।\n• दूरदर्शन व आकाशवाणी: वीडियो स्पॉट एवं 06 केंद्र प्रसारण अनुबंध।")
style_run(r_r1_d, size_pt=7.5, color_rgb=COLOR_BODY)

p_r2 = c_r2.paragraphs[0]
style_paragraph(p_r2, space_before=1, space_after=1)
r_r2_t = p_r2.add_run("वैधानिक अनुपालन एवं बैंकिंग:\n")
style_run(r_r2_t, size_pt=8, bold=True, color_rgb=COLOR_GOLD)
r_r2_d = p_r2.add_run("• आयकर (PAN) व GST: नियमित टैक्स फाइलिंग व इनवॉइसिंग सक्षम।\n• ट्रेड लाइसेंस व MSME: नगर निगम गुमाश्ता व सूक्ष्म-लघु उद्योग पंजीकृत।\n• बैंकिंग पार्टनर: बैंक ऑफ बड़ौदा (Bank of Baroda) चालू खाता।")
style_run(r_r2_d, size_pt=7.5, color_rgb=COLOR_BODY)

# Section: Clients & Institutions
add_section_header(doc, "विश्वसनीय भागीदारी — प्रतिष्ठित संस्थाएं एवं शासकीय विभाग", "24+ प्रमाणित संस्थाएं")

# Client Card A: International & National
cl_a_tbl = doc.add_table(rows=1, cols=1)
cl_a_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
c_cla = cl_a_tbl.rows[0].cells[0]
c_cla.width = Mm(188)
set_cell_background(c_cla, COLOR_BG_WHITE)
set_cell_margins(c_cla, top=30, bottom=30, left=50, right=50)
set_cell_borders(c_cla,
    top=('single', '6', 'E6DEC8'),
    bottom=('single', '6', 'E6DEC8'),
    left=('single', '6', 'E6DEC8'),
    right=('single', '6', 'E6DEC8'))

p_ca = c_cla.paragraphs[0]
style_paragraph(p_ca, space_before=1, space_after=1)
r_ca_t = p_ca.add_run("अंतर्राष्ट्रीय एवं राष्ट्रीय संगठन (10 संस्थाएं) • [वित्त पोषित सर्व शिक्षा]:\n")
style_run(r_ca_t, size_pt=8, bold=True, color_rgb=COLOR_GOLD)
intl_orgs = ["World Bank", "NABARD", "UNICEF", "SHRC", "CHRI", "IFFCO", "Birla Group", "DDUGKY", "SRLM", "PRIYA NGO"]
for o in intl_orgs:
    r_o = p_ca.add_run(f"[{o}]  ")
    style_run(r_o, size_pt=7.2, bold=True, color_rgb=COLOR_DARK)
p_ca_sub = c_cla.add_paragraph()
style_paragraph(p_ca_sub, space_before=1, space_after=1)
r_ca_d = p_ca_sub.add_run("विश्व बैंक, यूनिसेफ, नाबार्ड व बिड़ला ग्रुप जैसी वैश्विक संस्थाओं हेतु विकास, स्वास्थ्य व आजीविका आधारित वृत्तचित्र व वीडियो स्पॉट्स का निर्माण।")
style_run(r_ca_d, size_pt=7.2, color_rgb=COLOR_MUTED)

# Client Card B: Government Departments (22+ Depts with owner additions)
cl_b_tbl = doc.add_table(rows=1, cols=1)
cl_b_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
c_clb = cl_b_tbl.rows[0].cells[0]
c_clb.width = Mm(188)
set_cell_background(c_clb, COLOR_BG_WHITE)
set_cell_margins(c_clb, top=30, bottom=30, left=50, right=50)
set_cell_borders(c_clb,
    top=('single', '6', 'E6DEC8'),
    bottom=('single', '6', 'E6DEC8'),
    left=('single', '6', 'E6DEC8'),
    right=('single', '6', 'E6DEC8'))

p_cb = c_clb.paragraphs[0]
style_paragraph(p_cb, space_before=1, space_after=1)
r_cb_t = p_cb.add_run("शासकीय विभाग, आयोग एवं राज्य संस्थाएं (22+ विभाग):\n")
style_run(r_cb_t, size_pt=8, bold=True, color_rgb=COLOR_GOLD)
govt_depts = [
    "जनसंपर्क विभाग (DPR)", "श्रम विभाग", "पंचायत एवं ग्रामीण विकास", "लोक स्वास्थ्य यांत्रिकी (PHED)",
    "स्वास्थ्य एवं परिवार कल्याण", "महिला एवं बाल विकास", "स्कूल शिक्षा विभाग", "जल संसाधन",
    "कृषि विकास", "वन विभाग", "समाज कल्याण", "छत्तीसगढ़ पुलिस (CG Police)", "छत्तीसगढ़ राज्य महिला आयोग",
    "ट्राइबल विभाग", "नाफेड (NAFED)", "दिग्विजय कॉलेज", "देवभोग दुग्ध महासंघ छ.ग.", "योग आयोग",
    "ठाकुर प्यारेलाल सिंह संस्थान निमोरा", "छ.ग. राज्य स्वच्छ भारत मिशन", "एड्स कंट्रोल सोसायटी"
]
for g in govt_depts:
    r_g = p_cb.add_run(f"[{g}]  ")
    style_run(r_g, size_pt=7.2, bold=True, color_rgb=COLOR_DARK)

# Client Card C: Historic Election Campaigns
elect_tbl = doc.add_table(rows=1, cols=2)
elect_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
c_el1, c_el2 = elect_tbl.rows[0].cells
c_el1.width = Mm(94)
c_el2.width = Mm(94)

for cell in (c_el1, c_el2):
    set_cell_background(cell, COLOR_BG_CARD)
    set_cell_margins(cell, top=25, bottom=25, left=45, right=45)
    set_cell_borders(cell,
        top=('single', '6', 'E6DEC8'),
        bottom=('single', '6', 'E6DEC8'),
        left=('single', '6', 'E6DEC8'),
        right=('single', '6', 'E6DEC8'))

p_el1 = c_el1.paragraphs[0]
style_paragraph(p_el1, space_before=1, space_after=1)
r_el1_t = p_el1.add_run("विधान सभा चुनाव 2013 • [06 आकाशवाणी केंद्र]:\n")
style_run(r_el1_t, size_pt=7.6, bold=True, color_rgb=COLOR_GOLD)
r_el1_d = p_el1.add_run("प्रदेश के 06 आकाशवाणी केन्द्रों से भाजपा चुनाव प्रचार हेतु रेडियो जिंगल निर्माण व व्यापक प्रसारण अनुबंधित एजेंसी (सर्व वित्त पोषित)।")
style_run(r_el1_d, size_pt=7.2, color_rgb=COLOR_BODY)

p_el2 = c_el2.paragraphs[0]
style_paragraph(p_el2, space_before=1, space_after=1)
r_el2_t = p_el2.add_run("लोक सभा चुनाव 2014 • [06 आकाशवाणी केंद्र]:\n")
style_run(r_el2_t, size_pt=7.6, bold=True, color_rgb=COLOR_GOLD)
r_el2_d = p_el2.add_run("प्रदेश के 06 आकाशवाणी केन्द्रों से भाजपा चुनाव प्रचार हेतु रेडियो जिंगल निर्माण व राष्ट्रव्यापी प्रसारण समन्वय एजेंसी (सर्व वित्त पोषित)।")
style_run(r_el2_d, size_pt=7.2, color_rgb=COLOR_BODY)

# Section: Official Declaration & Seal
add_section_header(doc, "आधिकारिक घोषणा एवं प्रामाणिकता पत्र (Official Declaration)", "सत्यापित संचिका")

decl_tbl = doc.add_table(rows=1, cols=1)
decl_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
c_decl = decl_tbl.rows[0].cells[0]
c_decl.width = Mm(188)
set_cell_background(c_decl, COLOR_BG_WHITE)
set_cell_margins(c_decl, top=30, bottom=30, left=50, right=50)
set_cell_borders(c_decl,
    top=('single', '8', COLOR_BORDER_GOLD),
    bottom=('single', '8', COLOR_BORDER_GOLD),
    left=('single', '8', COLOR_BORDER_GOLD),
    right=('single', '8', COLOR_BORDER_GOLD))

p_dec = c_decl.paragraphs[0]
style_paragraph(p_dec, space_before=1, space_after=1)
r_dec_bold = p_dec.add_run("यह प्रमाणित किया जाता है कि ")
style_run(r_dec_bold, size_pt=7.8, bold=True, color_rgb=COLOR_DARK)
r_dec_text = p_dec.add_run("इस कॉरपोरेट पोर्टफोलियो संचिका में अंकित समस्त संस्थागत विवरण, शासकीय इम्पैनलमेंट, 24+ क्लाइंट सूचियां, तकनीकी उपकरण, वित्तीय साख एवं उत्पादन सांख्यिकी बी.एस.आर. फिल्मस के वास्तविक, अधिकृत अभिलेखों एवं वैध अनुबंधों पर पूर्णतः आधारित हैं।")
style_run(r_dec_text, size_pt=7.6, color_rgb=COLOR_BODY)

# Grand Corporate Seal Table
seal_tbl = doc.add_table(rows=1, cols=2)
seal_tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
c_sl1, c_sl2 = seal_tbl.rows[0].cells
c_sl1.width = Mm(26)
c_sl2.width = Mm(162)
c_sl1.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
c_sl2.vertical_alignment = WD_ALIGN_VERTICAL.CENTER

set_cell_background(c_sl1, COLOR_BG_HIGHLIGHT)
set_cell_background(c_sl2, COLOR_BG_HIGHLIGHT)
set_cell_margins(c_sl1, top=40, bottom=40, left=40, right=30)
set_cell_margins(c_sl2, top=40, bottom=40, left=30, right=50)
set_cell_borders(c_sl1,
    top=('single', '12', COLOR_BORDER_GOLD),
    bottom=('single', '12', COLOR_BORDER_GOLD),
    left=('single', '12', COLOR_BORDER_GOLD))
set_cell_borders(c_sl2,
    top=('single', '12', COLOR_BORDER_GOLD),
    bottom=('single', '12', COLOR_BORDER_GOLD),
    right=('single', '12', COLOR_BORDER_GOLD))

p_sli = c_sl1.paragraphs[0]
style_paragraph(p_sli, space_before=0, space_after=0, align=WD_ALIGN_PARAGRAPH.CENTER)
r_sl_img = p_sli.add_run()
r_sl_img.add_picture(seal_png_path, width=Mm(20))

p_slt = c_sl2.paragraphs[0]
style_paragraph(p_slt, space_before=0, space_after=1, align=WD_ALIGN_PARAGRAPH.RIGHT)
r_sl_c = p_slt.add_run("प्रमाणित: संचिका में अंकित समस्त विवरण बी.एस.आर. फिल्मस के अधिकृत अभिलेखों एवं अनुबंधों पर आधारित हैं।\n")
style_run(r_sl_c, size_pt=7.4, color_rgb=COLOR_MUTED)
r_sl_b = p_slt.add_run("बी.एस.आर. फिल्मस\n")
style_run(r_sl_b, size_pt=14, bold=True, color_rgb=COLOR_GOLD)
r_sl_s = p_slt.add_run("अधिकृत हस्ताक्षरकर्ता • संस्थापक एवं प्रबंध निर्देशक\nरायपुर, छत्तीसगढ़ (भारत)")
style_run(r_sl_s, size_pt=8, bold=True, color_rgb=COLOR_DARK)

# Page 2 Footer
add_page_footer(doc, 2)

# Save Document
doc.save(OUT_DOCX)
print(f"Generated DOCX at: {OUT_DOCX} (Size: {os.path.getsize(OUT_DOCX)} bytes)")
