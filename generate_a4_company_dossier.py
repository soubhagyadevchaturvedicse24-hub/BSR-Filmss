import base64
import os
import subprocess
import fitz

# Load image assets as Base64 strings
with open('public/cm-award.jpg', 'rb') as f:
    cm_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('public/team/bhishma.png', 'rb') as f:
    bhishma_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('public/bsr-icon.png', 'rb') as f:
    icon_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('public/bsr-logo-clean.png', 'rb') as f:
    logo_b64 = base64.b64encode(f.read()).decode('utf-8')

# High-resolution vector SVGs for print fidelity
svg_crest_big = """<svg width="52" height="52" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 8L60 16V36C60 52 40 70 40 70C40 70 20 52 20 36V16L40 8Z" fill="#FAF2E3" stroke="#8C4E00" stroke-width="3.2" stroke-linejoin="round"/>
  <path d="M30 30C35 27 45 27 50 30V48C45 45 35 45 30 48V30Z" fill="#FFFFFF" stroke="#8C4E00" stroke-width="2.4"/>
  <line x1="40" y1="28" x2="40" y2="47" stroke="#8C4E00" stroke-width="2.4"/>
  <circle cx="40" cy="20" r="4" fill="#8C4E00"/>
</svg>"""

svg_seal_big = """<svg width="78" height="78" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="40" r="37" stroke="#8C4E00" stroke-width="3.2" stroke-dasharray="4 2.5" fill="#FFFDF8"/>
  <circle cx="40" cy="40" r="30" stroke="#8C4E00" stroke-width="2.4" fill="#FAF2E3"/>
  <circle cx="40" cy="40" r="22" stroke="#8C4E00" stroke-width="2" fill="#FFFFFF"/>
  <path d="M40 24L43 32.5L52 33.8L45.5 40.2L47.2 49.2L40 44.8L32.8 49.2L34.5 40.2L28 33.8L37 32.5L40 24Z" fill="#8C4E00"/>
  <circle cx="40" cy="13" r="2" fill="#8C4E00"/>
  <circle cx="40" cy="67" r="2" fill="#8C4E00"/>
  <circle cx="13" cy="40" r="2" fill="#8C4E00"/>
  <circle cx="67" cy="40" r="2" fill="#8C4E00"/>
</svg>"""

html_content = f"""<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>बी.एस.आर. फिल्म्स - आधिकारिक कॉरपोरेट पोर्टफोलियो (A4 2-पृष्ठ प्रिंट संस्करण) | BSR Films</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @page {{
      size: 210mm 297mm;
      margin: 0;
    }}
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}
    body {{
      font-family: 'Noto Sans Devanagari', 'Nirmala UI', sans-serif;
      background: #EAE6DF;
      color: #0A0A0A;
      line-height: 1.44;
      font-size: 9.8pt;
      letter-spacing: 0.15px;
      word-spacing: 0.5px;
    }}
    .page {{
      width: 210mm;
      height: 297mm;
      min-height: 297mm;
      max-height: 297mm;
      margin: 0 auto;
      background: #FFFFFF;
      padding: 6.5mm 12mm 5.5mm 12mm;
      position: relative;
      page-break-after: always;
      page-break-inside: avoid;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
    }}
    @media print {{
      body {{ background: transparent; }}
      .page {{ border-bottom: none; }}
    }}

    .page-body {{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      margin: 2px 0 2px 0;
    }}

    /* Header */
    .header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2.2px solid #8C4E00;
      padding-bottom: 3.5px;
      margin-bottom: 2.5px;
    }}
    .header-left {{
      display: flex;
      align-items: center;
      gap: 10px;
    }}
    .header-logo {{
      width: 42px;
      height: 42px;
      object-fit: contain;
    }}
    .header-title {{
      font-size: 18pt;
      font-weight: 900;
      color: #0A0A0A;
      line-height: 1.15;
      letter-spacing: 0.2px;
    }}
    .header-sub {{
      font-size: 9.4pt;
      font-weight: 800;
      color: #8C4E00;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 1px;
    }}
    .header-meta {{
      text-align: right;
      font-size: 9.2pt;
      color: #222222;
      font-weight: 800;
      line-height: 1.3;
    }}

    /* Section Titles */
    .section-title {{
      font-size: 11.8pt;
      font-weight: 900;
      color: #0A0A0A;
      border-bottom: 1.8px solid #8C4E00;
      padding-bottom: 2px;
      margin: 3px 0 4px 0;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      letter-spacing: 0.2px;
    }}
    .section-sub {{
      font-size: 9pt;
      font-weight: 800;
      color: #8C4E00;
      letter-spacing: 0.3px;
    }}

    /* Cards */
    .card {{
      background: #FDFBF7;
      border: 1.2px solid #D8CDB8;
      border-radius: 7px;
      padding: 6px 9px;
      margin-bottom: 4px;
    }}
    .card-highlight {{
      background: #FFFDF8;
      border: 1.6px solid #8C4E00;
      box-shadow: 0 2px 6px rgba(140, 78, 0, 0.08);
    }}
    .card-title-bold {{
      font-size: 10.4pt;
      font-weight: 800;
      color: #8C4E00;
      line-height: 1.3;
      margin-top: 1px;
    }}
    .card-desc {{
      font-size: 9pt;
      color: #1A1A1A;
      line-height: 1.4;
      font-weight: 600;
      margin-top: 2px;
      letter-spacing: 0.15px;
    }}
    .card-tag {{
      display: inline-block;
      font-size: 8.8pt;
      font-weight: 900;
      color: #8C4E00;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }}
    .card-badge {{
      background: #FAF2E3;
      border: 1px solid #C89038;
      color: #5A2D00;
      font-size: 8.5pt;
      font-weight: 800;
      padding: 1.5px 6.5px;
      border-radius: 4px;
      white-space: nowrap;
    }}

    /* Grids */
    .grid-2 {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6.5px;
      margin-bottom: 4px;
    }}
    .grid-3 {{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 6px;
      margin-bottom: 4px;
    }}

    /* Stat Box */
    .stat-box {{
      background: #FDFBF7;
      border: 1.3px solid #D5A04A;
      border-radius: 7px;
      padding: 5px 4px;
      text-align: center;
    }}
    .stat-num {{
      font-size: 21pt;
      font-weight: 900;
      color: #8C4E00;
      line-height: 1.05;
    }}
    .stat-label {{
      font-size: 9.8pt;
      font-weight: 900;
      color: #0A0A0A;
      margin-top: 1.5px;
      letter-spacing: 0.2px;
    }}
    .stat-sub {{
      font-size: 8pt;
      color: #555555;
      font-weight: 700;
      line-height: 1.22;
      margin-top: 1px;
    }}

    /* Pills */
    .pill-wrap {{
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin: 2px 0;
    }}
    .pill {{
      background: #FAF2E3;
      border: 1.1px solid #C89038;
      color: #4A2400;
      font-size: 8.8pt;
      font-weight: 800;
      padding: 2px 7.5px;
      border-radius: 4px;
      display: inline-block;
      letter-spacing: 0.15px;
    }}
    .pill-gold {{
      background: #8C4E00;
      color: #FFFFFF;
      border: 1px solid #6E3C00;
    }}

    /* Feature Banner */
    .big-banner {{
      display: flex;
      align-items: center;
      gap: 12px;
      background: #FFFDF8;
      border: 1.5px solid #D5A04A;
      border-radius: 8px;
      padding: 6px 11px;
      box-shadow: 0 2px 5px rgba(140, 78, 0, 0.05);
    }}
    .big-banner-icon {{
      flex-shrink: 0;
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
    }}
    .big-banner-text {{
      font-size: 9.2pt;
      color: #222222;
      line-height: 1.4;
      font-weight: 600;
      letter-spacing: 0.15px;
    }}
    .big-banner-text strong {{
      color: #8C4E00;
      font-weight: 900;
      font-size: 10.2pt;
      display: block;
      margin-bottom: 1.5px;
      letter-spacing: 0.2px;
    }}
    .hl {{
      color: #080808;
      font-weight: 900;
      border-bottom: 1.4px solid rgba(200, 144, 56, 0.6);
      padding-bottom: 0.5px;
    }}

    /* Footer */
    .footer {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1.5px solid #D5A04A;
      padding-top: 3.5px;
      margin-top: 2px;
      font-size: 8.8pt;
      font-weight: 800;
      color: #444444;
      letter-spacing: 0.2px;
    }}
  </style>
</head>
<body>

  <!-- ═══════════════════════════════════════════════════════════════════
       A4 PAGE 1 OF 2: CM AWARD PHOTO CENTERPIECE, BRAND IDENTITY & SERVICES
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-title">बी.एस.आर. फिल्म्स</div>
          <div class="header-sub">फिल्म, टीवी, वृत्तचित्र एवं मीडिया प्रोडक्शन हाउस</div>
        </div>
      </div>
      <div class="header-meta">
        25+ वर्ष मीडिया उत्कृष्टता<br>
        संवाद 'ब' श्रेणी • NFDC एनलिस्टेड
      </div>
    </div>

    <div class="page-body">
      <!-- 1. PAGE 1 TOP CENTERPIECE: HON'BLE CM AWARD PHOTO & BRAND SHOWCASE -->
      <div class="card card-highlight" style="display: flex; gap: 14px; align-items: center; padding: 7px 12px; margin-bottom: 4px; background: linear-gradient(135deg, #FAF2E3 0%, #FFFDF8 100%);">
        <!-- Centerpiece Photo: Hon'ble CM of Chhattisgarh Honoring Founder with Award -->
        <div style="text-align: center; flex-shrink: 0;">
          <img src="data:image/jpeg;base64,{cm_b64}" style="width: 102px; height: 136px; object-fit: cover; border-radius: 7px; border: 2.4px solid #8C4E00; box-shadow: 0 4px 10px rgba(140, 78, 0, 0.28); display: block;" alt="माननीय मुख्यमंत्री द्वारा सम्मानित">
          <div style="font-size: 7.8pt; font-weight: 900; color: #8C4E00; margin-top: 2.5px; line-height: 1.2; max-width: 104px;">
            मा. मुख्यमंत्री द्वारा सम्मान<br><span style="font-size: 7pt; color: #444444; font-weight: 700;">'दीदी के गोठ' राज्य कार्यक्रम</span>
          </div>
        </div>

        <!-- Brand Showcase & Accreditations Alongside Centerpiece Photo -->
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
            <div>
              <div style="font-size: 18pt; font-weight: 900; color: #0A0A0A; line-height: 1.1; letter-spacing: -0.2px;">
                बी.एस.आर. फिल्म्स
              </div>
              <div style="font-size: 9.6pt; font-weight: 900; color: #8C4E00; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 1px;">
                सेंट्रल इंडिया का प्रतिष्ठित मीडिया प्रोडक्शन हाउस
              </div>
            </div>
            <img src="data:image/png;base64,{logo_b64}" style="height: 38px; width: auto; max-width: 135px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(140, 78, 0, 0.2));" alt="बी.एस.आर. फिल्म्स Logo">
          </div>

          <div style="font-size: 8.8pt; color: #2A2A2A; font-weight: 700; margin-top: 2px; line-height: 1.36;">
            माननीय मुख्यमंत्री श्री विष्णु देव साय जी द्वारा सम्मानित • संस्कृति, सृजनात्मकता एवं प्रसारण तकनीक का 25+ वर्षों का विश्वास।
          </div>

          <!-- Accreditations & Empanelments Pills -->
          <div class="pill-wrap" style="margin-top: 4px; gap: 4px;">
            <span class="pill">छत्तीसगढ़ संवाद 'ब' श्रेणी</span>
            <span class="pill">NFDC एनलिस्टेड एजेंसी (निदेशक अनुबंध)</span>
            <span class="pill">प्रसार भारती / दूरदर्शन (वीडियो स्पॉट अनुबंध)</span>
            <span class="pill">आकाशवाणी 06 केंद्र (प्रोडक्शन - प्रसारण)</span>
            <span class="pill pill-gold">केंद्रीय विक्रय एकांश में पंजीकृत फर्म</span>
            <span class="pill">MSME रजिस्टर्ड</span>
          </div>
        </div>
      </div>

      <!-- 2. Key Production Statistics (3x2 Grid - Big Bold Numbers) -->
      <div>
        <div class="section-title">
          <span>प्रमुख सांख्यिकी एवं उपलब्धियां</span>
          <span class="section-sub">प्रमाणित मीडिया परिमाण</span>
        </div>
        <div class="grid-3" style="margin-bottom: 4px;">
          <div class="stat-box">
            <div class="stat-num">650+</div>
            <div class="stat-label">विज्ञापन स्पॉट्स</div>
            <div class="stat-sub">Commercial Ads & Promos</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">350+</div>
            <div class="stat-label">वृत्तचित्र निर्माण</div>
            <div class="stat-sub">Research Documentaries</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">500+</div>
            <div class="stat-label">ऑडियो कार्यक्रम</div>
            <div class="stat-sub">Jingles & Radio Serials</div>
          </div>
        </div>

        <div class="grid-3" style="margin-bottom: 0;">
          <div class="stat-box">
            <div class="stat-num">400+</div>
            <div class="stat-label">रेडियो जिंगल्स</div>
            <div class="stat-sub">शासकीय, निगम व कॉर्पोरेट</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">32+</div>
            <div class="stat-label">वर्ष मीडिया अनुभव</div>
            <div class="stat-sub">Industry Leadership</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">10+</div>
            <div class="stat-label">एनिमेशन व ग्राफिक्स</div>
            <div class="stat-sub">2D / 3D Motion VFX</div>
          </div>
        </div>
      </div>

      <!-- 3. Core Media Production Services (Numbered ① to ⑥ - Concise & Big Font) -->
      <div>
        <div class="section-title">
          <span>व्यावसायिक मीडिया सेवाएं — 6 प्रमुख कार्यक्षेत्र</span>
          <span class="section-sub">स्क्रिप्ट से स्क्रीन तक सम्पूर्ण इन-हाउस निर्माण</span>
        </div>
        <div class="grid-2" style="gap: 5px; margin-bottom: 4px;">
          <div class="card" style="padding: 5px 8px; margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-tag">① • शोध एवं विकास</span>
              <span class="card-badge">350+ निर्मित</span>
            </div>
            <div class="card-title-bold">वृत्तचित्र निर्माण (Documentary Films)</div>
            <div class="card-desc">
              शोध-आधारित, सामाजिक, जनजातीय एवं विकासात्मक डाक्यूमेंट्रीज। राज्य शासन व अंतरराष्ट्रीय संस्थाओं की फ्लैगशिप योजनाओं का प्रामाणिक दस्तावेजीकरण।
            </div>
          </div>

          <div class="card" style="padding: 5px 8px; margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-tag">② • शासकीय / कॉर्पोरेट संचार</span>
              <span class="card-badge">650+ निर्मित</span>
            </div>
            <div class="card-title-bold">विज्ञापन व वीडियो स्पॉट्स (Commercials & Promos)</div>
            <div class="card-desc">
              हाई-इम्पैक्ट टीवी कमर्शियल्स, विज्ञापन, डिजिटल प्रोमोज एवं सोशल मीडिया रील्स। शासकीय योजनाओं व ब्रांड्स हेतु सशक्त विजुअल स्टोरीटेलिंग।
            </div>
          </div>
        </div>

        <div class="grid-2" style="gap: 5px; margin-bottom: 4px;">
          <div class="card" style="padding: 5px 8px; margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-tag">③ • साउंड एवं ब्रॉडकास्ट</span>
              <span class="card-badge">500+ निर्मित</span>
            </div>
            <div class="card-title-bold">ऑडियो कार्यक्रम व जिंगल्स (Audio Jingles)</div>
            <div class="card-desc">
              रेडियो जिंगल्स, जन-जागरूकता धारावाहिक, लोकगीत व पॉडकास्ट। आकाशवाणी के 6 केंद्रों हेतु विशेष ऑडियो कंटेंट, साउंड डिजाइनिंग व प्रभावी प्रसारण।
            </div>
          </div>

          <div class="card" style="padding: 5px 8px; margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-tag">④ • विजुअल इफेक्ट्स</span>
              <span class="card-badge">10+ प्रोजेक्ट्स</span>
            </div>
            <div class="card-title-bold">2D / 3D एनिमेशन व वीएफएक्स (Animation & VFX)</div>
            <div class="card-desc">
              एक्सप्लेनर वीडियो, 3D आर्किटेक्चरल वॉकथ्रू, मोशन इंफोग्राफिक्स, कैरेक्टर एनीमेशन एवं उन्नत वीएफएक्स जो जटिल संदेशों को सहज बनाते हैं।
            </div>
          </div>
        </div>

        <div class="grid-2" style="gap: 5px; margin-bottom: 0;">
          <div class="card" style="padding: 5px 8px; margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-tag">⑤ • रेडियो प्रचार प्रसार</span>
              <span class="card-badge">400+ जिंगल्स</span>
            </div>
            <div class="card-title-bold">रेडियो जिंगल्स निर्माण (Radio Jingles)</div>
            <div class="card-desc">
              400+ रेडियो जिंगल्स का निर्माण विभिन्न शासकीय विभागों, निगमों, मंडलों एवं कॉर्पोरेट संस्थानों हेतु आकाशवाणी द्वारा व्यापक प्रसारण।
            </div>
          </div>

          <div class="card" style="padding: 5px 8px; margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-tag">⑥ • लाइव इवेंट्स कवरेज</span>
              <span class="card-badge">4K मल्टी-कैमरा</span>
            </div>
            <div class="card-title-bold">मल्टी-कैमरा लाइव प्रसारण (Multi-Cam Live Telecast)</div>
            <div class="card-desc">
              राज्योत्सव, राष्ट्रीय सम्मेलनों, शासकीय उत्सवों, खेल व सांस्कृतिक समारोहों का 4K मल्टी-कैमरा ब्रॉडकास्ट सेटअप एवं सीमलेस लाइव वेबकास्टिंग।
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Studio Infrastructure & Cinema Gear Summary -->
      <div class="card" style="padding: 5px 9px; margin-bottom: 0;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
          <span class="card-tag">प्रोडक्शन इंफ्रास्ट्रक्चर एवं सिनेमाई उपकरण</span>
          <span class="card-badge">इन-हाउस 4K / 6K फैसिलिटी</span>
        </div>
        <div class="grid-2" style="gap: 6px; margin-bottom: 0; font-size: 8.8pt; color: #1A1A1A; font-weight: 600; line-height: 1.36;">
          <div>
            • <strong>कैमरा व गिंबल:</strong> Sony FX Cinema Line / FX6 / FX3, Blackmagic 6K Pro, सिने प्राइम लेंस, Ronin RS3 Pro।<br>
            • <strong>सिनेमा लाइटिंग:</strong> Aputure, Godox Pro LED पैनल्स, 1200W/600W COB, सॉफ्टबॉक्सेज, कटर्स एवं जनरेटर बैकअप।
          </div>
          <div>
            • <strong>साउंड स्टूडियो:</strong> पूर्णतः एकॉस्टिक साउंडप्रूफ स्टूडियो, Neumann U87 / Sennheiser माइक्स, ProTools DAW।<br>
            • <strong>एडिटिंग व ड्रोन:</strong> Apple Mac Studio, DaVinci Resolve Studio 4K HDR, DJI 4K/5.1K सिनेमैटिक ड्रोन।
          </div>
        </div>
      </div>

      <!-- 5. Studio Office Coordinates Box -->
      <div class="card card-highlight" style="padding: 5px 9px; margin-bottom: 0;">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="card-tag">कार्यालय एवं प्रोडक्शन स्टूडियो</span>
          <span class="card-badge">राजधानी रायपुर (छ.ग.)</span>
        </div>
        <div style="font-size: 9pt; color: #0A0A0A; line-height: 1.36; margin-top: 1.5px; font-weight: 600;">
          <p><strong>पता:</strong> राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 492013 (छ.ग.)</p>
          <p style="margin-top: 1px;">
            <strong>दूरभाष:</strong> <span style="font-weight: 900; color: #0A0A0A;">+91 7000866323, +91 9826167533</span>
            &nbsp;•&nbsp; <strong>ईमेल:</strong> bsrfilms2017@gmail.com
            &nbsp;•&nbsp; <strong>वेबसाइट:</strong> <span style="color: #8C4E00; font-weight: 900;">www.bsrfilms.com</span>
          </p>
        </div>
      </div>

      <!-- Bottom Feature Banner with 'अनवरत' -->
      <div class="big-banner">
        <div class="big-banner-icon">{svg_crest_big}</div>
        <div class="big-banner-text">
          <strong>25+ वर्षों की अनवरत मीडिया उत्कृष्टता एवं विश्वसनीयता:</strong>
          बी.एस.आर. फिल्म्स मध्य भारत का अग्रणी एवं प्रतिष्ठित प्रोडक्शन हाउस है, जो <b class="hl">शासकीय एवं कॉर्पोरेट क्षेत्र</b> में उच्च-गुणवत्ता पूर्ण <b class="hl">फिल्म निर्माण, विज्ञापन एवं व्यापक प्रसारण अभियानों</b> हेतु पूर्णतः समर्पित व प्रमाणित है।
        </div>
      </div>
    </div>

    <div class="footer">
      <div><strong>बी.एस.आर. फिल्म्स</strong> • आधिकारिक कॉरपोरेट प्रोफाइल • www.bsrfilms.com</div>
      <div>पृष्ठ 1 / 2</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       A4 PAGE 2 OF 2: OWNER PORTRAIT TOP CENTERPIECE, LEADERSHIP, CLIENTS & SEAL
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-title">बी.एस.आर. फिल्म्स</div>
          <div class="header-sub">संस्थापक नेतृत्व, प्रतिष्ठित क्लाइंट्स एवं प्रमाणीकरण</div>
        </div>
      </div>
      <div class="header-meta">
        24+ प्रमुख संस्थाएं<br>
        वैधानिक प्रमाणीकरण संचिका
      </div>
    </div>

    <div class="page-body">
      <!-- 1. PAGE 2 TOP CENTERPIECE: OWNER PORTRAIT & LEADERSHIP PROFILE -->
      <div class="card card-highlight" style="display: flex; gap: 14px; align-items: center; padding: 7px 12px; margin-bottom: 4px; background: linear-gradient(135deg, #FAF2E3 0%, #FFFDF8 100%);">
        <!-- Centerpiece Photo: Large Executive Portrait of the Owner -->
        <div style="text-align: center; flex-shrink: 0;">
          <img src="data:image/png;base64,{bhishma_b64}" style="width: 102px; height: 136px; object-fit: cover; border-radius: 7px; border: 2.4px solid #8C4E00; box-shadow: 0 4px 10px rgba(140, 78, 0, 0.28); display: block;" alt="भीष्मदेव चतुर्वेदी - संस्थापक">
          <div style="font-size: 8pt; font-weight: 900; color: #8C4E00; margin-top: 2.5px; line-height: 1.2; max-width: 104px;">
            भीष्मदेव चतुर्वेदी<br><span style="font-size: 7.2pt; color: #444444; font-weight: 700;">संस्थापक एवं निर्देशक</span>
          </div>
        </div>

        <!-- Founder Details & Leadership Credentials -->
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <div style="font-size: 15pt; font-weight: 900; color: #0A0A0A; line-height: 1.1;">
              भीष्मदेव चतुर्वेदी
            </div>
            <span class="card-badge" style="font-size: 8.8pt;">एंकर / डायरेक्टर / राइटर • प्रोड्यूसर</span>
          </div>
          <div style="font-size: 9.8pt; font-weight: 900; color: #8C4E00; margin-top: 1.5px;">
            संस्थापक, मुख्य निर्माता एवं वरिष्ठ फिल्म निर्देशक
          </div>
          <div style="font-size: 9pt; color: #1A1A1A; margin-top: 3px; line-height: 1.38; font-weight: 600;">
            32 से अधिक वर्षों से भारतीय सिनेमा, वृत्तचित्र एवं जनसंचार के क्षेत्र में सक्रिय सृजनात्मक नेतृत्व। राज्य एवं राष्ट्रीय स्तर पर सम्मानित मीडिया व्यक्तित्व।
          </div>
          <div class="pill-wrap" style="margin-top: 4px; gap: 4px;">
            <span class="pill">अनुमोदित एंकर / राइटर / 'ए' ग्रेड कलाकार (AIR व दूरदर्शन)</span>
            <span class="pill">32+ वर्ष मीडिया अनुभव</span>
            <span class="pill">विषयों के विशेषज्ञ के रूप में सम्मानित व्यक्तित्व (के साथ हम कदम)</span>
          </div>
          <div style="font-size: 8.8pt; color: #333333; font-weight: 700; margin-top: 3px; line-height: 1.34;">
            • <strong>सांस्कृतिक संरक्षण:</strong> 350+ वृत्तचित्र व फिल्मों का प्रामाणिक निर्देशन।<br>
            • <strong>मार्गदर्शन:</strong> युवा फिल्मकारों व तकनीशियनों को व्यावसायिक प्रशिक्षण।
          </div>
        </div>
      </div>

      <!-- 2. Official Empanelments & Statutory Standing (Compact 2-col) -->
      <div>
        <div class="section-title">
          <span>वैधानिक पंजीकरण, इम्पैनलमेंट एवं बैंकिंग साख</span>
          <span class="section-sub">आधिकारिक अधिकृत संस्थाएं</span>
        </div>
        <div class="grid-2" style="gap: 5px; margin-bottom: 3.5px;">
          <div class="card" style="padding: 4.5px 7.5px; margin-bottom: 0;">
            <div class="card-tag">शासकीय एवं राष्ट्रीय इम्पैनलमेंट</div>
            <div style="font-size: 8.8pt; color: #1A1A1A; line-height: 1.36; margin-top: 1.5px; font-weight: 600;">
              • <strong>छत्तीसगढ़ संवाद:</strong> 'ब' श्रेणी अधिकृत प्रोडक्शन हाउस।<br>
              • <strong>NFDC:</strong> राष्ट्रीय फिल्म विकास निगम एनलिस्टेड (निदेशक अनुबंध)।<br>
              • <strong>दूरदर्शन व आकाशवाणी:</strong> वीडियो स्पॉट एवं 06 केंद्र प्रसारण अनुबंध।
            </div>
          </div>

          <div class="card" style="padding: 4.5px 7.5px; margin-bottom: 0;">
            <div class="card-tag">वैधानिक अनुपालन एवं बैंकिंग</div>
            <div style="font-size: 8.8pt; color: #1A1A1A; line-height: 1.36; margin-top: 1.5px; font-weight: 600;">
              • <strong>आयकर (PAN) व GST:</strong> नियमित टैक्स फाइलिंग व इनवॉइसिंग सक्षम।<br>
              • <strong>ट्रेड लाइसेंस व MSME:</strong> नगर निगम गुमाश्ता व सूक्ष्म-लघु उद्योग पंजीकृत।<br>
              • <strong>बैंकिंग पार्टनर:</strong> <span style="font-weight: 900; color: #8C4E00;">बैंक ऑफ बड़ौदा (Bank of Baroda)</span> चालू खाता।
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Reputed Clients, Government Departments & Historical Campaigns -->
      <div>
        <div class="section-title">
          <span>विश्वसनीय भागीदारी — प्रतिष्ठित संस्थाएं एवं शासकीय विभाग</span>
          <span class="section-sub">24+ प्रमाणित संस्थाएं</span>
        </div>

        <!-- Card A: International & National Organizations -->
        <div class="card" style="padding: 4.5px 7.5px; margin-bottom: 3.5px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5px;">
            <span class="card-tag">अंतर्राष्ट्रीय एवं राष्ट्रीय संगठन (10 संस्थाएं)</span>
            <span class="card-badge">वित्त पोषित सर्व शिक्षा</span>
          </div>
          <div class="pill-wrap" style="gap: 3.5px; margin: 1px 0;">
            <span class="pill">World Bank</span>
            <span class="pill">NABARD</span>
            <span class="pill">UNICEF</span>
            <span class="pill">SHRC</span>
            <span class="pill">CHRI</span>
            <span class="pill">IFFCO</span>
            <span class="pill">Birla Group</span>
            <span class="pill">DDUGKY</span>
            <span class="pill">SRLM</span>
            <span class="pill">PRIYA NGO</span>
          </div>
          <div style="font-size: 8.2pt; color: #444444; font-weight: 600; margin-top: 1px; line-height: 1.3;">
            विश्व बैंक, यूनिसेफ, नाबार्ड व बिड़ला ग्रुप जैसी वैश्विक संस्थाओं हेतु विकास, स्वास्थ्य व आजीविका आधारित वृत्तचित्र व वीडियो स्पॉट्स का निर्माण।
          </div>
        </div>

        <!-- Card B: Government Departments & State Commissions (22+ Depts with Red Additions) -->
        <div class="card" style="padding: 4.5px 7.5px; margin-bottom: 3.5px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.5px;">
            <span class="card-tag">शासकीय विभाग, आयोग एवं राज्य संस्थाएं (22+ विभाग)</span>
            <span class="card-badge">Government & Public Sector</span>
          </div>
          <div class="pill-wrap" style="gap: 3.5px; margin: 1px 0;">
            <span class="pill">जनसंपर्क विभाग (DPR)</span>
            <span class="pill">श्रम विभाग</span>
            <span class="pill">पंचायत एवं ग्रामीण विकास</span>
            <span class="pill">लोक स्वास्थ्य यांत्रिकी (PHED)</span>
            <span class="pill">स्वास्थ्य एवं परिवार कल्याण</span>
            <span class="pill">महिला एवं बाल विकास</span>
            <span class="pill">स्कूल शिक्षा विभाग</span>
            <span class="pill">जल संसाधन</span>
            <span class="pill">कृषि विकास</span>
            <span class="pill">वन विभाग</span>
            <span class="pill">समाज कल्याण</span>
            <span class="pill">छत्तीसगढ़ पुलिस (CG Police)</span>
            <span class="pill">छत्तीसगढ़ राज्य महिला आयोग</span>
            <!-- Red-pen additions by owner -->
            <span class="pill pill-gold">ट्राइबल विभाग</span>
            <span class="pill pill-gold">नाफेड (NAFED)</span>
            <span class="pill pill-gold">दिग्विजय कॉलेज</span>
            <span class="pill pill-gold">देवभोग दुग्ध महासंघ छ.ग.</span>
            <span class="pill pill-gold">योग आयोग</span>
            <span class="pill pill-gold">ठाकुर प्यारेलाल सिंह संस्थान निमोरा</span>
            <span class="pill pill-gold">छ.ग. राज्य स्वच्छ भारत मिशन</span>
            <span class="pill pill-gold">एड्स कंट्रोल सोसायटी</span>
          </div>
        </div>

        <!-- Card C: Historic Election Campaigns -->
        <div class="grid-2" style="gap: 5px; margin-bottom: 0;">
          <div class="card" style="padding: 4px 7px; margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-tag" style="font-size: 8.4pt;">विधान सभा चुनाव 2013</span>
              <span class="card-badge" style="font-size: 8pt;">06 आकाशवाणी केंद्र</span>
            </div>
            <div class="card-desc" style="font-size: 8.2pt; line-height: 1.28; margin-top: 1px;">
              प्रदेश के 06 आकाशवाणी केन्द्रों से भाजपा चुनाव प्रचार हेतु रेडियो जिंगल निर्माण व व्यापक प्रसारण अनुबंधित एजेंसी (सर्व वित्त पोषित)।
            </div>
          </div>

          <div class="card" style="padding: 4px 7px; margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-tag" style="font-size: 8.4pt;">लोक सभा चुनाव 2014</span>
              <span class="card-badge" style="font-size: 8pt;">06 आकाशवाणी केंद्र</span>
            </div>
            <div class="card-desc" style="font-size: 8.2pt; line-height: 1.28; margin-top: 1px;">
              प्रदेश के 06 आकाशवाणी केन्द्रों से भाजपा चुनाव प्रचार हेतु रेडियो जिंगल निर्माण व राष्ट्रव्यापी प्रसारण समन्वय एजेंसी (सर्व वित्त पोषित)।
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Official Declaration & Grand Royal Corporate Seal -->
      <div>
        <div class="card" style="padding: 4.5px 8px; margin-bottom: 3.5px; background: #FFFDF8; border: 1.3px solid #C89038;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1px;">
            <span class="card-tag" style="font-size: 8.6pt;">आधिकारिक घोषणा एवं प्रामाणिकता पत्र (Official Declaration)</span>
            <span class="card-badge" style="font-size: 8pt;">सत्यापित संचिका</span>
          </div>
          <div style="font-size: 8.4pt; color: #1A1A1A; line-height: 1.32; font-weight: 600;">
            <strong>यह प्रमाणित किया जाता है कि</strong> इस कॉरपोरेट पोर्टफोलियो संचिका में अंकित समस्त संस्थागत विवरण, शासकीय इम्पैनलमेंट, 24+ क्लाइंट सूचियां, तकनीकी उपकरण, वित्तीय साख एवं उत्पादन सांख्यिकी बी.एस.आर. फिल्म्स के वास्तविक, अधिकृत अभिलेखों एवं वैध अनुबंधों पर पूर्णतः आधारित हैं।
          </div>
        </div>

        <!-- Royal Seal Stamp & Signature Banner -->
        <div style="display: flex; align-items: center; justify-content: space-between; background: #FFFDF8; border: 1.8px solid #D5A04A; border-radius: 9px; padding: 5.5px 12px; box-shadow: 0 2px 6px rgba(140, 78, 0, 0.07);">
          <div style="flex-shrink: 0; width: 76px; height: 76px; display: flex; align-items: center; justify-content: center;">
            {svg_seal_big}
          </div>
          <div style="text-align: right; flex: 1; padding-left: 14px;">
            <div style="font-size: 8.4pt; color: #444444; font-weight: 600; margin-bottom: 1.5px;">
              <b class="hl">प्रमाणित:</b> संचिका में अंकित समस्त विवरण बी.एस.आर. फिल्म्स के <b class="hl">अधिकृत अभिलेखों एवं अनुबंधों</b> पर आधारित हैं।
            </div>
            <div style="font-size: 16pt; font-weight: 900; color: #8C4E00; line-height: 1.1;">
              बी.एस.आर. फिल्म्स
            </div>
            <div style="font-size: 9.8pt; font-weight: 800; color: #0A0A0A; margin-top: 2px;">
              अधिकृत हस्ताक्षरकर्ता • संस्थापक एवं प्रबंध निर्देशक
            </div>
            <div style="font-size: 8.4pt; color: #555555; font-weight: 700; margin-top: 1px;">
              रायपुर, छत्तीसगढ़ (भारत)
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div><strong>बी.एस.आर. फिल्म्स</strong> • आधिकारिक कॉरपोरेट प्रोफाइल • www.bsrfilms.com</div>
      <div>पृष्ठ 2 / 2</div>
    </div>
  </div>

</body>
</html>
"""

# Save A4 HTML
with open('public/bsr_company_dossier_a4.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Saved public/bsr_company_dossier_a4.html!")

# Compile to PDF using Edge - Output as BSR_Films_Print_Portfolio_A4.pdf
res = subprocess.run([
    r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    r'--print-to-pdf=D:\Local Codebase\BSR Films\public\BSR_Films_Print_Portfolio_A4.pdf',
    r'D:\Local Codebase\BSR Films\public\bsr_company_dossier_a4.html'
], capture_output=True, text=True)

print("Edge PDF generation return code:", res.returncode)

# Check total pages in the output PDF
doc = fitz.open('public/BSR_Films_Print_Portfolio_A4.pdf')
print(f"Total A4 PDF pages: {len(doc)}")
for i, page in enumerate(doc):
    r = page.rect
    print(f"Page {i+1}: {r.width:.2f}pt x {r.height:.2f}pt ({r.width*25.4/72:.1f}mm x {r.height*25.4/72:.1f}mm)")
