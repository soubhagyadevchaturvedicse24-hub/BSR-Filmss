import os
import sys
import pptx
from pptx.util import Inches, Pt, Mm
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR

BASE_DIR = r"D:\Local Codebase\BSR Films"
OUT_DIR = r"C:\Users\Soubhagya\.gemini\antigravity\brain\eb81d130-1154-4f36-95c8-f4a050062af1"
OUT_PPTX = os.path.join(OUT_DIR, "BSR_Films_Print_Portfolio_A4.pptx")

# Asset Paths
cm_img_path = os.path.join(BASE_DIR, "public", "cm-award.jpg")
bhishma_img_path = os.path.join(BASE_DIR, "public", "team", "bhishma.png")
logo_img_path = os.path.join(BASE_DIR, "public", "bsr-logo-clean.png")
icon_img_path = os.path.join(BASE_DIR, "public", "bsr-icon.png")
seal_img_path = os.path.join(OUT_DIR, "seal_300dpi.png")
crest_img_path = os.path.join(OUT_DIR, "crest_300dpi.png")

# Palette
COLOR_GOLD = RGBColor(140, 78, 0)      # #8C4E00
COLOR_DARK = RGBColor(10, 10, 10)      # #0A0A0A
COLOR_BODY = RGBColor(26, 26, 26)      # #1A1A1A
COLOR_MUTED = RGBColor(85, 85, 85)     # #555555
COLOR_BORDER_GOLD = RGBColor(140, 78, 0)
COLOR_BORDER_SUBTLE = RGBColor(214, 198, 175) # #D6C6AF
COLOR_BG_HIGHLIGHT = RGBColor(250, 242, 227)  # #FAF2E3
COLOR_BG_CARD = RGBColor(250, 246, 240)       # #FAF6F0
COLOR_BG_WHITE = RGBColor(255, 255, 255)
FONT_DEVANAGARI = "Noto Sans Devanagari"

prs = pptx.Presentation()
prs.slide_width = Mm(210)
prs.slide_height = Mm(297)
blank_layout = prs.slide_layouts[6]

def add_box(slide, left_mm, top_mm, width_mm, height_mm, bg_color=None, border_color=None, border_width_pt=1):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Mm(left_mm), Mm(top_mm), Mm(width_mm), Mm(height_mm))
    if bg_color:
        shape.fill.solid()
        shape.fill.fore_color.rgb = bg_color
    else:
        shape.fill.background()
    
    if border_color:
        shape.line.color.rgb = border_color
        shape.line.width = Pt(border_width_pt)
    else:
        shape.line.fill.background()
    return shape

def add_textbox(slide, left_mm, top_mm, width_mm, height_mm, margin_mm=1):
    txBox = slide.shapes.add_textbox(Mm(left_mm), Mm(top_mm), Mm(width_mm), Mm(height_mm))
    tf = txBox.text_frame
    tf.word_wrap = True
    tf.margin_top = Mm(margin_mm)
    tf.margin_bottom = Mm(margin_mm)
    tf.margin_left = Mm(margin_mm)
    tf.margin_right = Mm(margin_mm)
    return tf

def append_run(paragraph, text, font_size=8, bold=False, color_rgb=COLOR_BODY, font_name=FONT_DEVANAGARI):
    r = paragraph.add_run()
    r.text = text
    r.font.name = font_name
    r.font.size = Pt(font_size)
    r.bold = bold
    r.font.color.rgb = color_rgb
    return r

def add_header(slide, page_num):
    # Header logo
    slide.shapes.add_picture(icon_img_path, Mm(11), Mm(7), width=Mm(9.5))
    
    # Header Title
    tf_l = add_textbox(slide, 22, 5.5, 120, 11, margin_mm=0)
    p1 = tf_l.paragraphs[0]
    p1.text = "बी.एस.आर. फिल्मस"
    p1.font.name = FONT_DEVANAGARI
    p1.font.size = Pt(15.5)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_DARK
    
    p2 = tf_l.add_paragraph()
    if page_num == 1:
        p2.text = "फिल्म, टीवी, वृत्तचित्र एवं मीडिया प्रोडक्शन हाउस"
    else:
        p2.text = "संस्थापक नेतृत्व, प्रतिष्ठित क्लाइंट्स एवं प्रमाणीकरण"
    p2.font.name = FONT_DEVANAGARI
    p2.font.size = Pt(8.5)
    p2.font.bold = True
    p2.font.color.rgb = COLOR_GOLD

    # Header Meta
    tf_r = add_textbox(slide, 135, 6, 64, 11, margin_mm=0)
    p_r1 = tf_r.paragraphs[0]
    p_r1.alignment = PP_ALIGN.RIGHT
    if page_num == 1:
        p_r1.text = "25+ वर्ष मीडिया उत्कृष्टता\nसंवाद 'ब' श्रेणी • NFDC एनलिस्टेड"
    else:
        p_r1.text = "24+ प्रमुख संस्थाएं\nवैधानिक प्रमाणीकरण संचिका"
    p_r1.font.name = FONT_DEVANAGARI
    p_r1.font.size = Pt(8.2)
    p_r1.font.bold = True
    p_r1.font.color.rgb = COLOR_MUTED
    
    # Gold divider line
    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Mm(11), Mm(17.5), Mm(188), Mm(0.6))
    line.fill.solid()
    line.fill.fore_color.rgb = COLOR_GOLD
    line.line.fill.background()

def add_footer(slide, page_num):
    # Divider line
    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Mm(11), Mm(288), Mm(188), Mm(0.3))
    line.fill.solid()
    line.fill.fore_color.rgb = COLOR_BORDER_SUBTLE
    line.line.fill.background()
    
    tf = add_textbox(slide, 11, 289, 140, 5, margin_mm=0)
    p = tf.paragraphs[0]
    p.text = "बी.एस.आर. फिल्मस • आधिकारिक कॉरपोरेट प्रोफाइल • www.bsrfilms.com"
    p.font.name = FONT_DEVANAGARI
    p.font.size = Pt(7.8)
    p.font.bold = True
    p.font.color.rgb = COLOR_GOLD
    
    tf_r = add_textbox(slide, 155, 289, 44, 5, margin_mm=0)
    p_r = tf_r.paragraphs[0]
    p_r.alignment = PP_ALIGN.RIGHT
    p_r.text = f"पृष्ठ {page_num} / 2"
    p_r.font.name = FONT_DEVANAGARI
    p_r.font.size = Pt(7.8)
    p_r.font.bold = True
    p_r.font.color.rgb = COLOR_DARK

def add_sec_title(slide, top_mm, title, sub):
    tf = add_textbox(slide, 11, top_mm, 188, 5.5, margin_mm=0)
    p = tf.paragraphs[0]
    append_run(p, title, font_size=10.5, bold=True, color_rgb=COLOR_DARK)
    append_run(p, f"  —  {sub}", font_size=8.5, bold=True, color_rgb=COLOR_GOLD)
    
    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Mm(11), Mm(top_mm + 5.5), Mm(188), Mm(0.4))
    line.fill.solid()
    line.fill.fore_color.rgb = COLOR_GOLD
    line.line.fill.background()

# ═══════════════════════════════════════════════════════════════════
# SLIDE 1 (A4 PAGE 1)
# ═══════════════════════════════════════════════════════════════════
slide1 = prs.slides.add_slide(blank_layout)
add_header(slide1, 1)

# 1. Top Hero Box (CM Award Centerpiece)
add_box(slide1, 11, 19.5, 188, 35, bg_color=COLOR_BG_HIGHLIGHT, border_color=COLOR_BORDER_GOLD, border_width_pt=1.5)

# CM Photo
slide1.shapes.add_picture(cm_img_path, Mm(13.5), Mm(21), width=Mm(23.5), height=Mm(31.5))
add_box(slide1, 13.5, 21, 23.5, 31.5, border_color=COLOR_BORDER_GOLD, border_width_pt=1.2)

# Photo Caption & Brand Showcase
tf_c = add_textbox(slide1, 39, 21, 158, 32, margin_mm=1)
p_t = tf_c.paragraphs[0]
append_run(p_t, "बी.एस.आर. फिल्मस", font_size=16, bold=True, color_rgb=COLOR_DARK)
append_run(p_t, "   •   सेंट्रल इंडिया का प्रतिष्ठित मीडिया प्रोडक्शन हाउस\n", font_size=8.8, bold=True, color_rgb=COLOR_GOLD)
append_run(p_t, "माननीय मुख्यमंत्री श्री विष्णु देव साय जी द्वारा सम्मानित • 'दीदी के गोठ' राज्य कार्यक्रम\nसंस्कृति, सृजनात्मकता एवं प्रसारण तकनीक का 25+ वर्षों का अटूट विश्वास।\n", font_size=8.2, bold=False, color_rgb=COLOR_BODY)
append_run(p_t, "[छत्तीसगढ़ संवाद 'ब' श्रेणी]  [NFDC एनलिस्टेड (निदेशक अनुबंध)]  [दूरदर्शन वीडियो स्पॉट]  [आकाशवाणी 06 केंद्र]  [केंद्रीय विक्रय एकांश]  [MSME]", font_size=7.5, bold=True, color_rgb=COLOR_GOLD)

slide1.shapes.add_picture(logo_img_path, Mm(167), Mm(21), width=Mm(29))

# 2. Stats Section
add_sec_title(slide1, 56.5, "प्रमुख सांख्यिकी एवं उपलब्धियां", "प्रमाणित मीडिया परिमाण")

stats_data = [
    [("650+", "विज्ञापन स्पॉट्स", "Commercial Ads & Promos"),
     ("350+", "वृत्तचित्र निर्माण", "Research Documentaries"),
     ("500+", "ऑडियो कार्यक्रम", "Jingles & Radio Serials")],
    [("400+", "रेडियो जिंगल्स", "शासकीय, निगम व कॉर्पोरेट"),
     ("32+", "वर्ष मीडिया अनुभव", "Industry Leadership"),
     ("10+", "एनिमेशन व ग्राफिक्स", "2D / 3D Motion VFX")]
]

y_stat = 63.5
for row in stats_data:
    x_stat = 11
    for num, lbl, sub in row:
        add_box(slide1, x_stat, y_stat, 61, 13.5, bg_color=COLOR_BG_CARD, border_color=COLOR_BORDER_SUBTLE, border_width_pt=0.8)
        tf_s = add_textbox(slide1, x_stat, y_stat, 61, 13.5, margin_mm=0.5)
        p = tf_s.paragraphs[0]
        p.alignment = PP_ALIGN.CENTER
        append_run(p, f"{num}  ", font_size=13, bold=True, color_rgb=COLOR_GOLD)
        append_run(p, f"{lbl}\n", font_size=8.2, bold=True, color_rgb=COLOR_DARK)
        append_run(p, sub, font_size=7, color_rgb=COLOR_MUTED)
        x_stat += 63.5
    y_stat += 15

# 3. Services Section
add_sec_title(slide1, 95.5, "व्यावसायिक मीडिया सेवाएं — 6 प्रमुख कार्यक्षेत्र", "स्क्रिप्ट से स्क्रीन तक सम्पूर्ण इन-हाउस निर्माण")

services_data = [
    [("① • शोध एवं विकास [350+ निर्मित]", "वृत्तचित्र निर्माण (Documentary Films)", "शोध-आधारित, सामाजिक, जनजातीय एवं विकासात्मक डाक्यूमेंट्रीज। राज्य शासन व अंतरराष्ट्रीय संस्थाओं की फ्लैगशिप योजनाओं का प्रामाणिक दस्तावेजीकरण।"),
     ("② • शासकीय / कॉर्पोरेट संचार [650+ निर्मित]", "विज्ञापन व वीडियो स्पॉट्स (Commercials)", "हाई-इम्पैक्ट टीवी कमर्शियल्स, विज्ञापन, डिजिटल प्रोमोज एवं सोशल मीडिया रील्स। शासकीय योजनाओं व ब्रांड्स हेतु सशक्त विजुअल स्टोरीटेलिंग।")],
    [("③ • साउंड एवं ब्रॉडकास्ट [500+ निर्मित]", "ऑडियो कार्यक्रम व जिंगल्स (Audio Jingles)", "रेडियो जिंगल्स, जन-जागरूकता धारावाहिक, लोकगीत व पॉडकास्ट। आकाशवाणी के 6 केंद्रों हेतु विशेष ऑडियो कंटेंट, साउंड डिजाइनिंग व प्रभावी प्रसारण।"),
     ("④ • विजुअल इफेक्ट्स [10+ प्रोजेक्ट्स]", "2D / 3D एनिमेशन व वीएफएक्स (Animation)", "एक्सप्लेनर वीडियो, 3D आर्किटेक्चरल वॉकथ्रू, मोशन इंफोग्राफिक्स, कैरेक्टर एनीमेशन एवं उन्नत वीएफएक्स जो जटिल संदेशों को सहज बनाते हैं।")],
    [("⑤ • रेडियो प्रचार प्रसार [400+ जिंगल्स]", "रेडियो जिंगल्स निर्माण (Radio Jingles)", "400+ रेडियो जिंगल्स का निर्माण विभिन्न शासकीय विभागों, निगमों, मंडलों एवं कॉर्पोरेट संस्थानों हेतु आकाशवाणी द्वारा व्यापक प्रसारण।"),
     ("⑥ • लाइव इवेंट्स कवरेज [4K मल्टी-कैमरा]", "मल्टी-कैमरा लाइव प्रसारण (Multi-Cam Live)", "राज्योत्सव, राष्ट्रीय सम्मेलनों, शासकीय उत्सवों, खेल व सांस्कृतिक समारोहों का 4K मल्टी-कैमरा ब्रॉडकास्ट सेटअप एवं सीमलेस लाइव वेबकास्टिंग।")]
]

y_srv = 102.5
for row in services_data:
    x_srv = 11
    for tag, title, desc in row:
        add_box(slide1, x_srv, y_srv, 92.5, 26, bg_color=COLOR_BG_WHITE, border_color=COLOR_BORDER_SUBTLE, border_width_pt=0.8)
        tf_sv = add_textbox(slide1, x_srv + 1, y_srv + 0.5, 90.5, 25, margin_mm=1)
        p = tf_sv.paragraphs[0]
        append_run(p, f"{tag}\n", font_size=7.4, bold=True, color_rgb=COLOR_GOLD)
        append_run(p, f"{title}\n", font_size=8.6, bold=True, color_rgb=COLOR_GOLD)
        append_run(p, desc, font_size=7.6, color_rgb=COLOR_BODY)
        x_srv += 95.5
    y_srv += 27.5

# 4. Studio Infrastructure Card
add_box(slide1, 11, 187, 188, 22, bg_color=COLOR_BG_CARD, border_color=COLOR_BORDER_GOLD, border_width_pt=1)
tf_inf1 = add_textbox(slide1, 12, 187.5, 92, 21, margin_mm=1)
p_i1 = tf_inf1.paragraphs[0]
append_run(p_i1, "सिनेमा उपकरण एवं लाइटिंग:\n", font_size=8, bold=True, color_rgb=COLOR_GOLD)
append_run(p_i1, "• Sony FX Cinema Line / FX6 / FX3, Blackmagic 6K Pro, सिने प्राइम लेंस, Ronin RS3 Pro।\n• Aputure, Godox Pro LED पैनल्स, 1200W/600W COB, कटर्स एवं जनरेटर बैकअप।", font_size=7.5, color_rgb=COLOR_BODY)

tf_inf2 = add_textbox(slide1, 105, 187.5, 92, 21, margin_mm=1)
p_i2 = tf_inf2.paragraphs[0]
append_run(p_i2, "साउंड स्टूडियो एवं पोस्ट-प्रोडक्शन:\n", font_size=8, bold=True, color_rgb=COLOR_GOLD)
append_run(p_i2, "• पूर्णतः एकॉस्टिक साउंडप्रूफ स्टूडियो, Neumann U87 / Sennheiser माइक्स, ProTools DAW।\n• Apple Mac Studio, DaVinci Resolve Studio 4K HDR, DJI 4K/5.1K सिनेमैटिक ड्रोन।", font_size=7.5, color_rgb=COLOR_BODY)

# 5. Studio Office Coordinates Box
add_box(slide1, 11, 211, 188, 17, bg_color=COLOR_BG_HIGHLIGHT, border_color=COLOR_BORDER_GOLD, border_width_pt=1)
tf_ad = add_textbox(slide1, 13, 211.5, 184, 16, margin_mm=1)
p_ad = tf_ad.paragraphs[0]
append_run(p_ad, "कार्यालय एवं प्रोडक्शन स्टूडियो:  ", font_size=8.2, bold=True, color_rgb=COLOR_GOLD)
append_run(p_ad, "राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 492013 (छ.ग.)\n", font_size=7.8, color_rgb=COLOR_BODY)
append_run(p_ad, "दूरभाष: +91 7000866323, +91 9826167533   •   ईमेल: bsrfilms2017@gmail.com   •   वेबसाइट: www.bsrfilms.com", font_size=7.8, bold=True, color_rgb=COLOR_DARK)

# 6. Excellence Banner
add_box(slide1, 11, 230, 188, 14, bg_color=COLOR_BG_CARD, border_color=COLOR_BORDER_GOLD, border_width_pt=1)
slide1.shapes.add_picture(crest_img_path, Mm(13), Mm(231), width=Mm(12))

tf_bn = add_textbox(slide1, 27, 230.5, 170, 13, margin_mm=1)
p_bn = tf_bn.paragraphs[0]
append_run(p_bn, "25+ वर्षों की अनवरत मीडिया उत्कृष्टता एवं विश्वसनीयता: ", font_size=8, bold=True, color_rgb=COLOR_GOLD)
append_run(p_bn, "बी.एस.आर. फिल्मस मध्य भारत का अग्रणी प्रोडक्शन हाउस है, जो शासकीय एवं कॉर्पोरेट क्षेत्र में उच्च-गुणवत्ता पूर्ण फिल्म निर्माण, विज्ञापन एवं व्यापक प्रसारण अभियानों हेतु पूर्णतः समर्पित व प्रमाणित है।", font_size=7.6, color_rgb=COLOR_BODY)

add_footer(slide1, 1)

# ═══════════════════════════════════════════════════════════════════
# SLIDE 2 (A4 PAGE 2)
# ═══════════════════════════════════════════════════════════════════
slide2 = prs.slides.add_slide(blank_layout)
add_header(slide2, 2)

# 1. Top Hero Box (Founder Executive Portrait Centerpiece)
add_box(slide2, 11, 19.5, 188, 35, bg_color=COLOR_BG_HIGHLIGHT, border_color=COLOR_BORDER_GOLD, border_width_pt=1.5)

# Founder Photo
slide2.shapes.add_picture(bhishma_img_path, Mm(13.5), Mm(21), width=Mm(23.5), height=Mm(31.5))
add_box(slide2, 13.5, 21, 23.5, 31.5, border_color=COLOR_BORDER_GOLD, border_width_pt=1.2)

# Founder Details
tf_f = add_textbox(slide2, 39, 20.5, 158, 33, margin_mm=1)
p_f = tf_f.paragraphs[0]
append_run(p_f, "भीष्मदेव चतुर्वेदी  ", font_size=14.5, bold=True, color_rgb=COLOR_DARK)
append_run(p_f, "[एंकर / डायरेक्टर / राइटर • प्रोड्यूसर]\n", font_size=8, bold=True, color_rgb=COLOR_GOLD)
append_run(p_f, "संस्थापक, मुख्य निर्माता एवं वरिष्ठ फिल्म निर्देशक\n", font_size=8.8, bold=True, color_rgb=COLOR_GOLD)
append_run(p_f, "32 से अधिक वर्षों से भारतीय सिनेमा, वृत्तचित्र एवं जनसंचार के क्षेत्र में सक्रिय सृजनात्मक नेतृत्व। राज्य एवं राष्ट्रीय स्तर पर सम्मानित मीडिया व्यक्तित्व।\n", font_size=8, color_rgb=COLOR_BODY)
append_run(p_f, "[अनुमोदित एंकर / राइटर / 'ए' ग्रेड कलाकार (AIR व दूरदर्शन)]  [32+ वर्ष मीडिया अनुभव]  [विषयों के विशेषज्ञ]", font_size=7.4, bold=True, color_rgb=COLOR_GOLD)

# 2. Statutory Standing Section
add_sec_title(slide2, 56.5, "वैधानिक पंजीकरण, इम्पैनलमेंट एवं बैंकिंग साख", "आधिकारिक अधिकृत संस्थाएं")

add_box(slide2, 11, 63.5, 92.5, 23, bg_color=COLOR_BG_CARD, border_color=COLOR_BORDER_GOLD, border_width_pt=0.8)
tf_rg1 = add_textbox(slide2, 12, 64, 90.5, 22, margin_mm=1)
p_rg1 = tf_rg1.paragraphs[0]
append_run(p_rg1, "शासकीय एवं राष्ट्रीय इम्पैनलमेंट:\n", font_size=8, bold=True, color_rgb=COLOR_GOLD)
append_run(p_rg1, "• छत्तीसगढ़ संवाद: 'ब' श्रेणी अधिकृत प्रोडक्शन हाउस।\n• NFDC: राष्ट्रीय फिल्म विकास निगम एनलिस्टेड (निदेशक अनुबंध)।\n• दूरदर्शन व आकाशवाणी: वीडियो स्पॉट एवं 06 केंद्र प्रसारण अनुबंध।", font_size=7.5, color_rgb=COLOR_BODY)

add_box(slide2, 106.5, 63.5, 92.5, 23, bg_color=COLOR_BG_CARD, border_color=COLOR_BORDER_GOLD, border_width_pt=0.8)
tf_rg2 = add_textbox(slide2, 107.5, 64, 90.5, 22, margin_mm=1)
p_rg2 = tf_rg2.paragraphs[0]
append_run(p_rg2, "वैधानिक अनुपालन एवं बैंकिंग:\n", font_size=8, bold=True, color_rgb=COLOR_GOLD)
append_run(p_rg2, "• आयकर (PAN) व GST: नियमित टैक्स फाइलिंग व इनवॉइसिंग सक्षम।\n• ट्रेड लाइसेंस व MSME: नगर निगम गुमाश्ता व सूक्ष्म-लघु उद्योग पंजीकृत।\n• बैंकिंग पार्टनर: बैंक ऑफ बड़ौदा (Bank of Baroda) चालू खाता।", font_size=7.5, color_rgb=COLOR_BODY)

# 3. Clients Section
add_sec_title(slide2, 88.5, "विश्वसनीय भागीदारी — प्रतिष्ठित संस्थाएं एवं शासकीय विभाग", "24+ प्रमाणित संस्थाएं")

# Client Card A: International
add_box(slide2, 11, 95.5, 188, 22, bg_color=COLOR_BG_WHITE, border_color=COLOR_BORDER_SUBTLE, border_width_pt=0.8)
tf_cla = add_textbox(slide2, 13, 96, 184, 21, margin_mm=1)
p_ca = tf_cla.paragraphs[0]
append_run(p_ca, "अंतर्राष्ट्रीय एवं राष्ट्रीय संगठन (10 संस्थाएं) • [वित्त पोषित सर्व शिक्षा]:\n", font_size=8, bold=True, color_rgb=COLOR_GOLD)
append_run(p_ca, "[World Bank]  [NABARD]  [UNICEF]  [SHRC]  [CHRI]  [IFFCO]  [Birla Group]  [DDUGKY]  [SRLM]  [PRIYA NGO]\n", font_size=7.4, bold=True, color_rgb=COLOR_DARK)
append_run(p_ca, "विश्व बैंक, यूनिसेफ, नाबार्ड व बिड़ला ग्रुप जैसी वैश्विक संस्थाओं हेतु विकास, स्वास्थ्य व आजीविका आधारित वृत्तचित्र व वीडियो स्पॉट्स का निर्माण।", font_size=7.2, color_rgb=COLOR_MUTED)

# Client Card B: Government Departments
add_box(slide2, 11, 119.5, 188, 42, bg_color=COLOR_BG_WHITE, border_color=COLOR_BORDER_SUBTLE, border_width_pt=0.8)
tf_clb = add_textbox(slide2, 13, 120, 184, 41, margin_mm=1)
p_cb = tf_clb.paragraphs[0]
append_run(p_cb, "शासकीय विभाग, आयोग एवं राज्य संस्थाएं (22+ विभाग):\n", font_size=8, bold=True, color_rgb=COLOR_GOLD)

govt_text = (
    "[जनसंपर्क विभाग (DPR)]  [श्रम विभाग]  [पंचायत एवं ग्रामीण विकास]  [लोक स्वास्थ्य यांत्रिकी (PHED)]  "
    "[स्वास्थ्य एवं परिवार कल्याण]  [महिला एवं बाल विकास]  [स्कूल शिक्षा विभाग]  [जल संसाधन]  [कृषि विकास]  [वन विभाग]  "
    "[समाज कल्याण]  [छत्तीसगढ़ पुलिस (CG Police)]  [छत्तीसगढ़ राज्य महिला आयोग]\n"
    "★ नवीन जोड़े गए विभाग: [ट्राइबल विभाग]  [नाफेड (NAFED)]  [दिग्विजय कॉलेज]  [देवभोग दुग्ध महासंघ छ.ग.]  "
    "[योग आयोग]  [ठाकुर प्यारेलाल सिंह संस्थान निमोरा]  [छ.ग. राज्य स्वच्छ भारत मिशन]  [एड्स कंट्रोल सोसायटी]"
)
append_run(p_cb, govt_text, font_size=7.4, color_rgb=COLOR_DARK)

# Client Card C: Election Campaigns
add_box(slide2, 11, 163.5, 92.5, 20, bg_color=COLOR_BG_CARD, border_color=COLOR_BORDER_SUBTLE, border_width_pt=0.8)
tf_el1 = add_textbox(slide2, 12, 164, 90.5, 19, margin_mm=1)
p_e1 = tf_el1.paragraphs[0]
append_run(p_e1, "विधान सभा चुनाव 2013 • [06 आकाशवाणी केंद्र]:\n", font_size=7.6, bold=True, color_rgb=COLOR_GOLD)
append_run(p_e1, "प्रदेश के 06 आकाशवाणी केन्द्रों से भाजपा चुनाव प्रचार हेतु रेडियो जिंगल निर्माण व व्यापक प्रसारण अनुबंधित एजेंसी (सर्व वित्त पोषित)।", font_size=7.2, color_rgb=COLOR_BODY)

add_box(slide2, 106.5, 163.5, 92.5, 20, bg_color=COLOR_BG_CARD, border_color=COLOR_BORDER_SUBTLE, border_width_pt=0.8)
tf_el2 = add_textbox(slide2, 107.5, 164, 90.5, 19, margin_mm=1)
p_e2 = tf_el2.paragraphs[0]
append_run(p_e2, "लोक सभा चुनाव 2014 • [06 आकाशवाणी केंद्र]:\n", font_size=7.6, bold=True, color_rgb=COLOR_GOLD)
append_run(p_e2, "प्रदेश के 06 आकाशवाणी केन्द्रों से भाजपा चुनाव प्रचार हेतु रेडियो जिंगल निर्माण व राष्ट्रव्यापी प्रसारण समन्वय एजेंसी (सर्व वित्त पोषित)।", font_size=7.2, color_rgb=COLOR_BODY)

# 4. Official Declaration & Grand Corporate Seal
add_sec_title(slide2, 185.5, "आधिकारिक घोषणा एवं प्रामाणिकता पत्र (Official Declaration)", "सत्यापित संचिका")

add_box(slide2, 11, 192.5, 188, 17, bg_color=COLOR_BG_WHITE, border_color=COLOR_BORDER_GOLD, border_width_pt=1)
tf_dec = add_textbox(slide2, 13, 193, 184, 16, margin_mm=1)
p_d = tf_dec.paragraphs[0]
append_run(p_d, "यह प्रमाणित किया जाता है कि ", font_size=7.8, bold=True, color_rgb=COLOR_DARK)
append_run(p_d, "इस कॉरपोरेट पोर्टफोलियो संचिका में अंकित समस्त संस्थागत विवरण, शासकीय इम्पैनलमेंट, 24+ क्लाइंट सूचियां, तकनीकी उपकरण, वित्तीय साख एवं उत्पादन सांख्यिकी बी.एस.आर. फिल्मस के वास्तविक, अधिकृत अभिलेखों एवं वैध अनुबंधों पर पूर्णतः आधारित हैं।", font_size=7.6, color_rgb=COLOR_BODY)

# Grand Corporate Seal Box
add_box(slide2, 11, 211.5, 188, 23, bg_color=COLOR_BG_HIGHLIGHT, border_color=COLOR_BORDER_GOLD, border_width_pt=1.5)
slide2.shapes.add_picture(seal_img_path, Mm(13.5), Mm(213), width=Mm(20))

tf_sl = add_textbox(slide2, 38, 212, 158, 22, margin_mm=1)
p_sl = tf_sl.paragraphs[0]
p_sl.alignment = PP_ALIGN.RIGHT
append_run(p_sl, "प्रमाणित: संचिका में अंकित समस्त विवरण बी.एस.आर. फिल्मस के अधिकृत अभिलेखों एवं अनुबंधों पर आधारित हैं।\n", font_size=7.4, color_rgb=COLOR_MUTED)
append_run(p_sl, "बी.एस.आर. फिल्मस\n", font_size=13, bold=True, color_rgb=COLOR_GOLD)
append_run(p_sl, "अधिकृत हस्ताक्षरकर्ता • संस्थापक एवं प्रबंध निर्देशक • रायपुर, छत्तीसगढ़ (भारत)", font_size=7.8, bold=True, color_rgb=COLOR_DARK)

add_footer(slide2, 2)

prs.save(OUT_PPTX)
print(f"Generated PPTX successfully at: {OUT_PPTX} (Size: {os.path.getsize(OUT_PPTX)} bytes)")
