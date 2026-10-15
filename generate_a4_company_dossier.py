import base64
import os
import subprocess
import fitz

# Load image assets as Base64 strings
with open('public/team/bhishma.png', 'rb') as f:
    bhishma_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('public/bsr-icon.png', 'rb') as f:
    icon_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('public/bsr-logo-clean.png', 'rb') as f:
    logo_b64 = base64.b64encode(f.read()).decode('utf-8')

# High-resolution vector SVGs for print fidelity
svg_camera_big = """<svg width="68" height="68" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="24" width="44" height="36" rx="6" fill="#FAF2E3" stroke="#8C4E00" stroke-width="3"/>
  <circle cx="30" cy="42" r="10" stroke="#8C4E00" stroke-width="3" fill="#FFFFFF"/>
  <circle cx="30" cy="42" r="5" fill="#8C4E00"/>
  <path d="M52 34L72 22V62L52 50V34Z" fill="#FAF2E3" stroke="#8C4E00" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="18" cy="14" r="8" fill="#FAF2E3" stroke="#8C4E00" stroke-width="2.8"/>
  <circle cx="18" cy="14" r="3.5" fill="#8C4E00"/>
  <circle cx="38" cy="14" r="8" fill="#FAF2E3" stroke="#8C4E00" stroke-width="2.8"/>
  <circle cx="38" cy="14" r="3.5" fill="#8C4E00"/>
  <path d="M18 60L12 74M42 60L48 74M30 60V74" stroke="#8C4E00" stroke-width="3" stroke-linecap="round"/>
</svg>"""

svg_mic_big = """<svg width="68" height="68" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="28" y="10" width="24" height="38" rx="12" fill="#FAF2E3" stroke="#8C4E00" stroke-width="3.2"/>
  <line x1="34" y1="20" x2="46" y2="20" stroke="#8C4E00" stroke-width="2.6"/>
  <line x1="34" y1="28" x2="46" y2="28" stroke="#8C4E00" stroke-width="2.6"/>
  <line x1="34" y1="36" x2="46" y2="36" stroke="#8C4E00" stroke-width="2.6"/>
  <path d="M18 34C18 46.15 27.85 56 40 56C52.15 56 62 46.15 62 34" stroke="#8C4E00" stroke-width="3.2" stroke-linecap="round"/>
  <line x1="40" y1="56" x2="40" y2="70" stroke="#8C4E00" stroke-width="3.6"/>
  <line x1="24" y1="70" x2="56" y2="70" stroke="#8C4E00" stroke-width="3.6" stroke-linecap="round"/>
  <path d="M10 26C7 31 7 37 10 42M70 26C73 31 73 37 70 42" stroke="#D5A04A" stroke-width="3" stroke-linecap="round"/>
  <path d="M4 20C0 27 0 41 4 48M76 20C80 27 80 41 76 48" stroke="#D5A04A" stroke-width="2.5" stroke-linecap="round"/>
</svg>"""

svg_tv_big = """<svg width="68" height="68" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="20" width="64" height="42" rx="7" fill="#FAF2E3" stroke="#8C4E00" stroke-width="3.2"/>
  <rect x="14" y="26" width="42" height="30" rx="4" fill="#FFFFFF" stroke="#8C4E00" stroke-width="2.6"/>
  <circle cx="63" cy="33" r="3.5" fill="#8C4E00"/>
  <circle cx="63" cy="44" r="3.5" fill="#8C4E00"/>
  <line x1="59" y1="52" x2="67" y2="52" stroke="#8C4E00" stroke-width="2.6"/>
  <path d="M26 10L40 20L54 10" stroke="#8C4E00" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22 62L16 72M58 62L64 72" stroke="#8C4E00" stroke-width="3.2" stroke-linecap="round"/>
</svg>"""

svg_award_big = """<svg width="68" height="68" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="30" r="22" fill="#FAF2E3" stroke="#8C4E00" stroke-width="3.2"/>
  <circle cx="40" cy="30" r="14" stroke="#8C4E00" stroke-width="2.4" fill="#FFFDF8"/>
  <path d="M40 20L43.5 27L51 28L45.5 33.5L47 41L40 37.5L33 41L34.5 33.5L29 28L36.5 27L40 20Z" fill="#8C4E00"/>
  <path d="M30 48L22 72L40 64L58 72L50 48" fill="#FAF2E3" stroke="#8C4E00" stroke-width="3" stroke-linejoin="round"/>
</svg>"""

svg_crest_big = """<svg width="68" height="68" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 8L60 16V36C60 52 40 70 40 70C40 70 20 52 20 36V16L40 8Z" fill="#FAF2E3" stroke="#8C4E00" stroke-width="3.2" stroke-linejoin="round"/>
  <path d="M30 30C35 27 45 27 50 30V48C45 45 35 45 30 48V30Z" fill="#FFFFFF" stroke="#8C4E00" stroke-width="2.4"/>
  <line x1="40" y1="28" x2="40" y2="47" stroke="#8C4E00" stroke-width="2.4"/>
  <circle cx="40" cy="20" r="4" fill="#8C4E00"/>
</svg>"""

svg_seal_big = """<svg width="84" height="84" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <title>बी.एस.आर. फिल्म्स - आधिकारिक कॉरपोरेट पोर्टफोलियो (A4 प्रिंट संस्करण) | BSR Films</title>
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
      color: #111111;
      line-height: 1.42;
      font-size: 10.5pt;
    }}
    .page {{
      width: 210mm;
      height: 297mm;
      min-height: 297mm;
      max-height: 297mm;
      margin: 0 auto;
      background: #FFFFFF;
      padding: 12mm 15mm 10mm 15mm;
      position: relative;
      page-break-after: always;
      page-break-inside: avoid;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-bottom: 3px solid #8C4E00;
    }}
    @media print {{
      body {{ background: transparent; }}
      .page {{ border-bottom: none; }}
    }}

    /* Main Page Body: Balanced Vertical Flow */
    .page-body {{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      margin: 6px 0 5px 0;
    }}

    /* Prominent Business Header */
    .header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2.5px solid #8C4E00;
      padding-bottom: 6px;
      margin-bottom: 5px;
    }}
    .header-left {{
      display: flex;
      align-items: center;
      gap: 12px;
    }}
    .header-logo {{
      width: 48px;
      height: 48px;
      object-fit: contain;
    }}
    .header-title {{
      font-size: 19pt;
      font-weight: 900;
      color: #0A0A0A;
      line-height: 1.1;
      letter-spacing: -0.3px;
    }}
    .header-sub {{
      font-size: 10.5pt;
      font-weight: 800;
      color: #8C4E00;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      margin-top: 2px;
    }}
    .header-meta {{
      text-align: right;
      font-size: 9.8pt;
      color: #333333;
      font-weight: 700;
      line-height: 1.35;
    }}

    /* Section Titles */
    .section-title {{
      font-size: 13.5pt;
      font-weight: 900;
      color: #0A0A0A;
      border-bottom: 2px solid #8C4E00;
      padding-bottom: 3px;
      margin-bottom: 9px;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }}
    .section-sub {{
      font-size: 9.8pt;
      font-weight: 800;
      color: #8C4E00;
    }}

    /* Card Containers */
    .card {{
      background: #FDFBF7;
      border: 1.4px solid #D8CDB8;
      border-radius: 9px;
      padding: 10px 14px;
      margin-bottom: 9px;
    }}
    .card-highlight {{
      background: #FFFDF8;
      border: 1.8px solid #8C4E00;
      box-shadow: 0 2px 6px rgba(140, 78, 0, 0.08);
    }}
    .card-title-bold {{
      font-size: 11.5pt;
      font-weight: 800;
      color: #8C4E00;
      line-height: 1.25;
    }}
    .card-desc {{
      font-size: 10pt;
      color: #222222;
      line-height: 1.4;
      font-weight: 500;
      margin-top: 3px;
    }}
    .card-tag {{
      display: inline-block;
      font-size: 9.5pt;
      font-weight: 800;
      color: #8C4E00;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }}
    .card-badge {{
      background: #FAF2E3;
      border: 1px solid #C89038;
      color: #5A2D00;
      font-size: 9pt;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 4px;
      white-space: nowrap;
    }}

    /* Grids */
    .grid-2 {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 9px;
    }}
    .grid-3 {{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
      margin-bottom: 9px;
    }}

    /* Statistics Boxes */
    .stat-box {{
      background: #FDFBF7;
      border: 1.5px solid #D5A04A;
      border-radius: 9px;
      padding: 10px 8px;
      text-align: center;
    }}
    .stat-num {{
      font-size: 24pt;
      font-weight: 900;
      color: #8C4E00;
      line-height: 1.1;
    }}
    .stat-label {{
      font-size: 10.8pt;
      font-weight: 800;
      color: #0A0A0A;
      margin-top: 2px;
    }}
    .stat-sub {{
      font-size: 8.5pt;
      color: #555555;
      font-weight: 600;
      line-height: 1.25;
      margin-top: 1px;
    }}

    /* Pill Badges */
    .pill-wrap {{
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 4px 0;
    }}
    .pill {{
      background: #FAF2E3;
      border: 1.2px solid #C89038;
      color: #5A2D00;
      font-size: 9.2pt;
      font-weight: 800;
      padding: 3px 10px;
      border-radius: 6px;
      display: inline-block;
    }}

    /* Big Feature Symbol Banner Cards at Bottom of Pages */
    .big-banner {{
      display: flex;
      align-items: center;
      gap: 16px;
      background: #FFFDF8;
      border: 1.8px solid #D5A04A;
      border-radius: 10px;
      padding: 12px 16px;
      box-shadow: 0 3px 8px rgba(140, 78, 0, 0.07);
    }}
    .big-banner-icon {{
      flex-shrink: 0;
      width: 72px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
    }}
    .big-banner-text {{
      font-size: 10.2pt;
      color: #333333;
      line-height: 1.45;
      font-weight: 500;
    }}
    .big-banner-text strong {{
      color: #8C4E00;
      font-weight: 900;
      font-size: 11.2pt;
      display: block;
      margin-bottom: 3px;
    }}
    .hl {{
      color: #080808;
      font-weight: 900;
      border-bottom: 1.6px solid rgba(200, 144, 56, 0.6);
      padding-bottom: 0.5px;
    }}

    /* Running Footer */
    .footer {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1.6px solid #D5A04A;
      padding-top: 6px;
      margin-top: 5px;
      font-size: 9.5pt;
      font-weight: 700;
      color: #444444;
    }}
  </style>
</head>
<body>

  <!-- ═══════════════════════════════════════════════════════════════════
       A4 PAGE 1: BSR FILMS - CORPORATE OVERVIEW, LOGO SHOWCASE & CREDENTIALS
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
        संवाद 'ब' श्रेणी (489) • NFDC
      </div>
    </div>

    <div class="page-body">
      <!-- Prominent Brand Logo & Cover Showcase Box -->
      <div style="background: linear-gradient(135deg, #FAF2E3 0%, #FFFDF8 100%); border: 2.2px solid #8C4E00; border-radius: 12px; padding: 16px 20px; text-align: center; box-shadow: 0 3px 10px rgba(140, 78, 0, 0.09);">
        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 6px;">
          <img src="data:image/png;base64,{logo_b64}" style="height: 62px; width: auto; max-width: 240px; object-fit: contain; filter: drop-shadow(0 2px 5px rgba(140, 78, 0, 0.25));" alt="बी.एस.आर. फिल्म्स Logo">
        </div>
        <div style="font-size: 21pt; font-weight: 900; color: #0A0A0A; line-height: 1.15; letter-spacing: -0.3px;">
          बी.एस.आर. फिल्म्स
        </div>
        <div style="font-size: 11pt; font-weight: 800; color: #8C4E00; text-transform: uppercase; letter-spacing: 0.8px; margin-top: 3px;">
          सेंट्रल इंडिया का प्रतिष्ठित मीडिया प्रोडक्शन हाउस
        </div>
        <div style="font-size: 9.8pt; color: #444444; font-weight: 600; margin-top: 3px;">
          संस्कृति, सृजनात्मकता एवं अत्याधुनिक प्रसारण तकनीक का 25+ वर्षों का अटूट विश्वास
        </div>
        <div class="pill-wrap" style="justify-content: center; gap: 8px; margin-top: 8px;">
          <span class="pill" style="font-size: 9.5pt; padding: 3px 12px;">छत्तीसगढ़ संवाद 'ब' श्रेणी (पंजीयन: 489)</span>
          <span class="pill" style="font-size: 9.5pt; padding: 3px 12px;">NFDC इम्पैनल्ड एजेंसी</span>
          <span class="pill" style="font-size: 9.5pt; padding: 3px 12px;">प्रसार भारती / दूरदर्शन अधिकृत</span>
          <span class="pill" style="font-size: 9.5pt; padding: 3px 12px;">आकाशवाणी 06 केंद्र अनुबंधित</span>
        </div>
      </div>

      <!-- 6 Key Business & Production Metrics -->
      <div>
        <div class="section-title">
          <span>प्रमुख सांख्यिकी एवं उपलब्धियां</span>
          <span class="section-sub">प्रमाणित मीडिया परिमाण</span>
        </div>
        <div class="grid-3" style="margin-bottom: 8px;">
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
            <div class="stat-label">एनिमेशन व ग्राफिक्स</div>
            <div class="stat-sub">2D / 3D Motion VFX</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">25+</div>
            <div class="stat-label">वर्ष व्यावसायिक अनुभव</div>
            <div class="stat-sub">Quarter Century of Excellence</div>
          </div>
          <div class="stat-box">
            <div class="stat-num">06</div>
            <div class="stat-label">भाषाएं व बोलियां</div>
            <div class="stat-sub">Regional & National Dialects</div>
          </div>
        </div>
      </div>

      <!-- Production Office & Studio Contact Box -->
      <div class="card card-highlight" style="padding: 12px 16px; margin-bottom: 0;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
          <span class="card-tag" style="font-size: 10.5pt;">कार्यालय एवं प्रोडक्शन स्टूडियो</span>
          <span class="card-badge" style="font-size: 9.5pt;">राजधानी रायपुर (छ.ग.)</span>
        </div>
        <div style="font-size: 9.8pt; color: #111111; line-height: 1.45;">
          <p><strong>पता:</strong> राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 492013 (छ.ग.)</p>
          <p style="margin-top: 3px;">
            <strong>दूरभाष:</strong> <span style="font-weight: 800; font-size: 11pt; color: #0A0A0A;">+91 7000866323, +91 9826167533</span>
            &nbsp;•&nbsp; <strong>ईमेल:</strong> bsrfilms2017@gmail.com
            &nbsp;•&nbsp; <strong>वेबसाइट:</strong> <span style="color: #8C4E00; font-weight: 800;">www.bsrfilms.com</span>
          </p>
        </div>
      </div>

      <!-- Bottom Feature Shield Banner -->
      <div class="big-banner">
        <div class="big-banner-icon">{svg_crest_big}</div>
        <div class="big-banner-text">
          <strong>25+ वर्षों की अविचल मीडिया उत्कृष्टता एवं विश्वसनीयता:</strong>
          बी.एस.आर. फिल्म्स मध्य भारत का अग्रणी एवं प्रतिष्ठित प्रोडक्शन हाउस है, जो <b class="hl">शासकीय एवं कॉर्पोरेट क्षेत्र</b> में उच्च-गुणवत्ता पूर्ण <b class="hl">फिल्म निर्माण, विज्ञापन एवं व्यापक प्रसारण अभियानों</b> हेतु पूर्णतः समर्पित व प्रमाणित है।
        </div>
      </div>
    </div>

    <div class="footer">
      <div><strong>बी.एस.आर. फिल्म्स</strong> • आधिकारिक कॉरपोरेट प्रोफाइल • www.bsrfilms.com</div>
      <div>1 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       A4 PAGE 2: OFFICIAL EMPANELMENTS & STATUTORY REGISTRATIONS
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-title">बी.एस.आर. फिल्म्स</div>
          <div class="header-sub">वैधानिक पंजीकरण एवं आधिकारिक मान्यताएं</div>
        </div>
      </div>
      <div class="header-meta">
        संवाद 'ब' श्रेणी (489)<br>
        NFDC • प्रसार भारती
      </div>
    </div>

    <div class="page-body">
      <div>
        <div class="section-title">
          <span>शासकीय एवं राष्ट्रीय संस्थाओं में इम्पैनलमेंट</span>
          <span class="section-sub">आधिकारिक पंजीयन एवं अधिकृत संस्थाएं</span>
        </div>

        <div class="grid-2">
          <div class="card card-highlight">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-tag">छत्तीसगढ़ संवाद 'ब' श्रेणी पंजीकरण</span>
              <span class="card-badge">पंजीयन क्र. 489</span>
            </div>
            <div class="card-title-bold" style="margin-top: 3px;">
              राज्य शासन के जनसंपर्क एवं प्रचार अभियानों हेतु मान्यता प्राप्त
            </div>
            <div class="card-desc">
              छत्तीसगढ़ संवाद (सूचना एवं जनसंपर्क विभाग) में वृत्तचित्र, लघु फिल्म, विज्ञापन, ऑडियो-वीडियो निर्माण एवं प्रसारण कार्यों हेतु <strong>'ब' श्रेणी (Category B)</strong> में अधिकृत एजेंसी के रूप में विधिवत पंजीकृत।
            </div>
          </div>

          <div class="card card-highlight">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-tag">NFDC (राष्ट्रीय फिल्म विकास निगम)</span>
              <span class="card-badge">सूचना एवं प्रसारण मंत्रालय</span>
            </div>
            <div class="card-title-bold" style="margin-top: 3px;">
              राष्ट्रीय फिल्म विकास निगम इम्पैनल्ड प्रोडक्शन हाउस
            </div>
            <div class="card-desc">
              सूचना एवं प्रसारण मंत्रालय, भारत सरकार के अधीन राष्ट्रीय फिल्म विकास निगम (NFDC) में राष्ट्रीय स्तर की वृत्तचित्रों, शैक्षणिक फिल्मों एवं सामाजिक जागरूकता अभियानों हेतु अधिकृत।
            </div>
          </div>
        </div>

        <div class="grid-2">
          <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-tag">प्रसार भारती / दूरदर्शन अधिकृत</span>
              <span class="card-badge">राष्ट्रीय प्रसारण</span>
            </div>
            <div class="card-title-bold" style="margin-top: 3px;">
              दूरदर्शन एवं सेटेलाइट धारावाहिक निर्माण
            </div>
            <div class="card-desc">
              प्रसार भारती व दूरदर्शन हेतु धारावाहिक, टेलीफिल्म, वृत्तचित्र एवं सामाजिक अभियानों के निर्माण हेतु अधिकृत। राज्य व राष्ट्रीय स्तर पर व्यापक प्रसारण का अनुभव।
            </div>
          </div>

          <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-tag">आकाशवाणी (AIR) प्रसारण नेटवर्क</span>
              <span class="card-badge">06 आकाशवाणी केंद्र</span>
            </div>
            <div class="card-title-bold" style="margin-top: 3px;">
              रेडियो जिंगल्स एवं ड्रामा प्रसारण अनुबंध
            </div>
            <div class="card-desc">
              प्रदेश के 06 प्रमुख आकाशवाणी केन्द्रों (रायपुर, बिलासपुर, जगदलपुर, अंबिकापुर, रायगढ़, सरायपाली) से विशेष प्रसारण, जिंगल्स एवं जागरूकता कार्यक्रमों का अनुबंध व अनुभव।
            </div>
          </div>
        </div>

        <!-- Statutory Details Card -->
        <div class="card" style="padding: 12px 16px; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
            <span class="card-tag" style="font-size: 10.5pt;">वैधानिक एवं वित्तीय साख (Statutory Compliance)</span>
            <span class="card-badge">पूर्णतः प्रमाणित</span>
          </div>
          <div class="grid-2" style="gap: 8px; margin-bottom: 0;">
            <div style="font-size: 9.8pt; color: #222222; line-height: 1.4;">
              <p>• <strong>आयकर (PAN):</strong> स्थायी खाता संख्या एवं नियमित आयकर रिटर्न (ITR) अनुपालन।</p>
              <p style="margin-top: 3px;">• <strong>वस्तु एवं सेवा कर (GST):</strong> नियमित टैक्स फाइलिंग एवं शासकीय इनवॉइसिंग सक्षम।</p>
            </div>
            <div style="font-size: 9.8pt; color: #222222; line-height: 1.4;">
              <p>• <strong>ट्रेड लाइसेंस / गुमाश्ता:</strong> नगर पालिक निगम रायपुर द्वारा विधिवत नवीनीकृत एवं वैध।</p>
              <p style="margin-top: 3px;">• <strong>बैंकिंग पार्टनर:</strong> भारतीय स्टेट बैंक (SBI), सुंदर नगर शाखा, रायपुर (चालू खाता)।</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Feature Award Banner -->
      <div class="big-banner">
        <div class="big-banner-icon">{svg_award_big}</div>
        <div class="big-banner-text">
          <strong>पूर्णतः वैधानिक व वित्तीय रूप से सशक्त प्रोडक्शन हाउस:</strong>
          बी.एस.आर. फिल्म्स शासन के सभी <b class="hl">वित्तीय व तकनीकी निविदा (Tender) मापदंडों</b> पर 100% प्रमाणित, बैंक ऑडिटेड एवं अनुबंधित कार्यों के समयबद्ध निष्पादन हेतु पूर्णतः सक्षम है।
        </div>
      </div>
    </div>

    <div class="footer">
      <div><strong>बी.एस.आर. फिल्म्स</strong> • आधिकारिक कॉरपोरेट प्रोफाइल • www.bsrfilms.com</div>
      <div>2 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       A4 PAGE 3: CORE PRODUCTION SERVICES & EXPERTISE
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-title">बी.एस.आर. फिल्म्स</div>
          <div class="header-sub">मीडिया सेवाएं एवं प्रोडक्शन विशेषज्ञता</div>
        </div>
      </div>
      <div class="header-meta">
        टर्नकी मीडिया सॉल्यूशंस<br>
        स्क्रिप्ट से स्क्रीन तक
      </div>
    </div>

    <div class="page-body">
      <div>
        <div class="section-title">
          <span>व्यावसायिक मीडिया सेवाएं — 6 प्रमुख कार्यक्षेत्र</span>
          <span class="section-sub">इन-हाउस सम्पूर्ण निर्माण सुविधाएं</span>
        </div>

        <div class="grid-2">
          <div class="card">
            <div class="card-tag">01 • शोध एवं विकास</div>
            <div class="card-title-bold" style="margin-top: 2px;">वृत्तचित्र निर्माण (Documentary Films)</div>
            <div class="card-desc">
              350+ शोध-आधारित, सामाजिक, ऐतिहासिक, पुरातात्विक, जनजातीय एवं विकासात्मक डाक्यूमेंट्रीज। राज्य शासन एवं अंतरराष्ट्रीय संस्थाओं की फ्लैगशिप योजनाओं का प्रामाणिक दस्तावेजीकरण।
            </div>
          </div>

          <div class="card">
            <div class="card-tag">02 • मनोरंजन एवं संस्कृति</div>
            <div class="card-title-bold" style="margin-top: 2px;">टीवी धारावाहिक व टेलीफिल्म्स (TV Serials)</div>
            <div class="card-desc">
              दूरदर्शन एवं प्रमुख सेटेलाइट चैनलों हेतु उच्च टीआरपी धारावाहिकों व टेलीफिल्म्स का भव्य निर्माण। उत्कृष्ट पटकथा, मंझे हुए कलाकार व क्षेत्रीय संस्कृति का सजीव चित्रण।
            </div>
          </div>
        </div>

        <div class="grid-2">
          <div class="card">
            <div class="card-tag">03 • कॉर्पोरेट एवं जनसंचार</div>
            <div class="card-title-bold" style="margin-top: 2px;">विज्ञापन व वीडियो स्पॉट्स (Ad Commercials)</div>
            <div class="card-desc">
              650+ हाई-इम्पैक्ट टीवी कमर्शियल्स, सिनेमा हॉल विज्ञापन, डिजिटल प्रोमोज एवं सोशल मीडिया रील्स। लक्षित दर्शकों को त्वरित प्रभावित करने वाली सशक्त विजुअल स्टोरीटेलिंग।
            </div>
          </div>

          <div class="card">
            <div class="card-tag">04 • साउंड एवं ब्रॉडकास्ट</div>
            <div class="card-title-bold" style="margin-top: 2px;">ऑडियो कार्यक्रम व जिंगल्स (Audio Jingles)</div>
            <div class="card-desc">
              500+ रेडियो जिंगल्स, जागरूकता धारावाहिक, लोकगीत व पॉडकास्ट। आकाशवाणी के 6 केंद्रों हेतु विशेष ऑडियो कंटेंट, साउंड डिजाइनिंग व राष्ट्रव्यापी प्रसारण।
            </div>
          </div>
        </div>

        <div class="grid-2" style="margin-bottom: 0;">
          <div class="card" style="margin-bottom: 0;">
            <div class="card-tag">05 • विजुअल इफेक्ट्स</div>
            <div class="card-title-bold" style="margin-top: 2px;">2D / 3D एनिमेशन व वीएफएक्स (Animation)</div>
            <div class="card-desc">
              400+ एक्सप्लेनर वीडियो, 3D आर्किटेक्चरल वॉकथ्रू, मोशन इंफोग्राफिक्स, कैरेक्टर एनीमेशन एवं उन्नत वीएफएक्स (VFX) जो जटिल संदेशों को सहज बनाते हैं।
            </div>
          </div>

          <div class="card" style="margin-bottom: 0;">
            <div class="card-tag">06 • लाइव इवेंट्स कवरेज</div>
            <div class="card-title-bold" style="margin-top: 2px;">मल्टी-कैमरा लाइव प्रसारण (Live Telecast)</div>
            <div class="card-desc">
              राज्योत्सव, राष्ट्रीय सम्मेलनों, शासकीय उत्सवों, खेल व सांस्कृतिक समारोहों का 4K मल्टी-कैमरा ब्रॉडकास्ट सेटअप, ओबी वैन एवं सीमलेस लाइव वेबकास्टिंग।
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Feature Camera Banner -->
      <div class="big-banner">
        <div class="big-banner-icon">{svg_camera_big}</div>
        <div class="big-banner-text">
          <strong>सृजनात्मक निर्देशन एवं अत्याधुनिक तकनीक का अद्वितीय समन्वय:</strong>
          अवधारणा (Concept), शोध एवं पटकथा लेखन से लेकर शूटिंग, संपादन, संगीत संयोजन, डबिंग एवं <b class="hl">ब्रॉडकास्ट डिलीवरी तक की समस्त सेवाएं</b> एक ही छत के नीचे अनुभवी विशेषज्ञों द्वारा उपलब्ध कराई जाती हैं।
        </div>
      </div>
    </div>

    <div class="footer">
      <div><strong>बी.एस.आर. फिल्म्स</strong> • आधिकारिक कॉरपोरेट प्रोफाइल • www.bsrfilms.com</div>
      <div>3 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       A4 PAGE 4: STATE-OF-THE-ART STUDIO INFRASTRUCTURE & CINEMA GEAR
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-title">बी.एस.आर. फिल्म्स</div>
          <div class="header-sub">स्टूडियो इंफ्रास्ट्रक्चर एवं सिनेमाई उपकरण</div>
        </div>
      </div>
      <div class="header-meta">
        इन-हाउस 4K / 6K फैसिलिटी<br>
        सिनेमाई ब्रॉडकास्ट गियर
      </div>
    </div>

    <div class="page-body">
      <div>
        <div class="section-title">
          <span>प्रोडक्शन इंफ्रास्ट्रक्चर — अत्याधुनिक उपकरण एवं सुविधाएं</span>
          <span class="section-sub">विश्वस्तरीय सिनेमाई तकनीक</span>
        </div>

        <div class="grid-2">
          <div class="card">
            <div class="card-tag">सिनेमैटोग्राफी</div>
            <div class="card-title-bold" style="margin-top: 2px;">हाई-एंड सिनेमा कैमरा सेटअप (4K/6K Digital Cinema)</div>
            <div class="card-desc">
              Sony FX Cinema Line / FX6 / FX3 एवं Blackmagic 6K Pro कैमरे। उच्च गुणवत्ता वाले सिने प्राइम व टेलीफोटो लेंस, Ronin RS3 Pro गिंबल्स एवं वायरलेस वीडियो ट्रांसमिशन।
            </div>
          </div>

          <div class="card">
            <div class="card-tag">प्रकाश व्यवस्था</div>
            <div class="card-title-bold" style="margin-top: 2px;">स्टूडियो एवं आउटडोर लाइटिंग (Broadcast Lighting)</div>
            <div class="card-desc">
              Aputure, Godox Pro LED पैनल्स, 1200W/600W COB लाइट्स, फ्रेस्नेल्स, सॉफ्टबॉक्सेज, सी-स्टैंड्स, कटर, डिफ्यूजन फ्लैग्स एवं पोर्टेबल ऑन-लोकेशन जनरेटर बैकअप।
            </div>
          </div>
        </div>

        <div class="grid-2">
          <div class="card">
            <div class="card-tag">ध्वनि रिकॉर्डिंग</div>
            <div class="card-title-bold" style="margin-top: 2px;">एकॉस्टिक साउंड स्टूडियो व डबिंग (Sound Studio)</div>
            <div class="card-desc">
              पूर्णतः साउंडप्रूफ एकॉस्टिक स्टूडियो, Neumann U87 / Sennheiser MKH 416 कंडेंसर माइक्स, ProTools / Nuendo DAW, 5.1 सराउंड मॉनिटरिंग एवं वॉयस-ओवर बूथ।
            </div>
          </div>

          <div class="card">
            <div class="card-tag">संपादन व ग्रेडिंग</div>
            <div class="card-title-bold" style="margin-top: 2px;">पोस्ट-प्रोडक्शन एवं कलर ग्रेडिंग (Editing Suites)</div>
            <div class="card-desc">
              Apple Mac Studio M-Series वर्कस्टेशंस, DaVinci Resolve Studio (4K HDR कलर ग्रेडिंग पैनल), Adobe Creative Cloud (Premiere, After Effects), अल्ट्रा-फास्ट NVMe RAID।
            </div>
          </div>
        </div>

        <div class="grid-2" style="margin-bottom: 0;">
          <div class="card" style="margin-bottom: 0;">
            <div class="card-tag">एरियल कवरेज</div>
            <div class="card-title-bold" style="margin-top: 2px;">एरियल ड्रोन सिनेमैटोग्राफी (Aerial Drone 4K)</div>
            <div class="card-desc">
              DJI Mavic 3 Pro / Inspire सिनेमैटिक 4K/5.1K ड्रोन्स, DGCA अधिकृत पायलट, विहंगम लैंडस्केप, मेगा इंफ्रास्ट्रक्चर व एरियल सर्वे कवरेज।
            </div>
          </div>

          <div class="card" style="margin-bottom: 0;">
            <div class="card-tag">विशेषज्ञ मानव संसाधन</div>
            <div class="card-title-bold" style="margin-top: 2px;">अनुभवी तकनीकी क्रू एवं विशेषज्ञ टीम (Crew & Experts)</div>
            <div class="card-desc">
              सीनियर सिनेमैटोग्राफर्स, साउंड इंजीनियर्स, क्रिएटिव डायरेक्टर्स, एडिटर, स्क्रिप्ट राइटर्स, वीएफएक्स आर्टिस्ट्स एवं अनुभवी प्रोडक्शन मैनेजर्स।
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Feature TV Banner -->
      <div class="big-banner">
        <div class="big-banner-icon">{svg_tv_big}</div>
        <div class="big-banner-text">
          <strong>विश्वस्तरीय सिनेमाई मानकों का पूर्ण इन-हाउस ढांचा:</strong>
          अंतरराष्ट्रीय ब्रॉडकास्ट मानकों (<b class="hl">Doordarshan & Satellite Broadcast Specs</b>) के अनुरूप अत्याधुनिक सिनेमाई उपकरण एवं कुशल मानव संसाधन किसी भी बड़े प्रोजेक्ट को <b class="hl">समयसीमा के भीतर उच्चतम गुणवत्ता</b> से निष्पादित करने में सक्षम हैं।
        </div>
      </div>
    </div>

    <div class="footer">
      <div><strong>बी.एस.आर. फिल्म्स</strong> • आधिकारिक कॉरपोरेट प्रोफाइल • www.bsrfilms.com</div>
      <div>4 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       A4 PAGE 5: 24 PRESTIGIOUS CLIENTS, GOVT DEPARTMENTS & CAMPAIGNS
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-title">बी.एस.आर. फिल्म्स</div>
          <div class="header-sub">प्रतिष्ठित क्लाइंट्स, संस्थाएं एवं राष्ट्रीय अभियान</div>
        </div>
      </div>
      <div class="header-meta">
        24+ प्रमुख संस्थाएं<br>
        राष्ट्रीय व वैश्विक क्लाइंट्स
      </div>
    </div>

    <div class="page-body">
      <div>
        <div class="section-title">
          <span>विश्वसनीय भागीदारी — 24 प्रतिष्ठित संस्थाएं, शासकीय विभाग एवं चुनाव अभियान</span>
          <span class="section-sub">24 प्रमाणित संस्थाएं</span>
        </div>

        <!-- 1. International & National Organizations (10) -->
        <div class="card" style="padding: 11px 16px; margin-bottom: 9px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
            <span class="card-tag" style="font-size: 10.5pt;">अंतर्राष्ट्रीय एवं राष्ट्रीय संगठन (10 प्रमुख संस्थाएं)</span>
            <span class="card-badge">Global & National Bodies</span>
          </div>
          <div class="pill-wrap" style="gap: 6px; margin: 4px 0 6px 0;">
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
          <div class="card-desc" style="font-size: 9.6pt; color: #444444; margin-top: 4px;">
            विश्व बैंक, यूनिसेफ, नाबार्ड व बिड़ला ग्रुप जैसी वैश्विक व राष्ट्रीय संस्थाओं हेतु स्वास्थ्य, ग्रामीण विकास, पोषण व आजीविका पर आधारित वृत्तचित्र, वीडियो स्पॉट्स एवं रेडियो सीरियल्स का प्रामाणिक निर्माण।
          </div>
        </div>

        <!-- 2. Government Departments & Agencies (14) -->
        <div class="card" style="padding: 11px 16px; margin-bottom: 9px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
            <span class="card-tag" style="font-size: 10.5pt;">शासकीय विभाग एवं राज्य आयोग (14 प्रमुख विभाग)</span>
            <span class="card-badge">Government & Public Sector</span>
          </div>
          <div class="pill-wrap" style="gap: 6px; margin: 4px 0 6px 0;">
            <span class="pill">जनसंपर्क विभाग (DPR)</span>
            <span class="pill">श्रम विभाग (Labour)</span>
            <span class="pill">पंचायत एवं ग्रामीण विकास विभाग</span>
            <span class="pill">लोक स्वास्थ्य यांत्रिकी (PHED)</span>
            <span class="pill">नगरीय प्रशासन एवं विकास</span>
            <span class="pill">स्वास्थ्य एवं परिवार कल्याण विभाग</span>
            <span class="pill">महिला एवं बाल विकास विभाग</span>
            <span class="pill">स्कूल शिक्षा विभाग</span>
            <span class="pill">जल संसाधन विभाग</span>
            <span class="pill">कृषि विकास एवं किसान कल्याण</span>
            <span class="pill">वन एवं जलवायु परिवर्तन विभाग</span>
            <span class="pill">समाज कल्याण विभाग</span>
            <span class="pill">छत्तीसगढ़ पुलिस (CG Police)</span>
            <span class="pill">छत्तीसगढ़ राज्य महिला आयोग</span>
          </div>
          <div class="card-desc" style="font-size: 9.6pt; color: #444444; margin-top: 4px;">
            छत्तीसगढ़ शासन के शीर्ष विभागों की जनकल्याणकारी नीतियों, फ्लैगशिप योजनाओं, कानून-व्यवस्था एवं जन-जागरूकता यात्राओं हेतु आधिकारिक फिल्म, विज्ञापन व प्रचार अभियान निर्माण।
          </div>
        </div>

        <!-- 3. Historic Election Campaigns -->
        <div class="grid-2" style="margin-bottom: 0;">
          <div class="card" style="padding: 11px 14px; margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-tag">विधान सभा चुनाव 2013</span>
              <span class="card-badge">06 आकाशवाणी केंद्र</span>
            </div>
            <div class="card-desc" style="font-size: 9.8pt; color: #111111; font-weight: 600; margin-top: 3px;">
              विधान सभा चुनाव सन् 2013 में रेडियो के माध्यम से प्रदेश के 06 आकाशवाणी केन्द्रों से भारतीय जनता पार्टी के चुनाव प्रचार हेतु रेडियो जिंगल निर्माण व व्यापक प्रसारण हेतु अनुबंधित अधिकृत एजेंसी।
            </div>
          </div>

          <div class="card" style="padding: 11px 14px; margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-tag">लोक सभा चुनाव 2014</span>
              <span class="card-badge">06 आकाशवाणी केंद्र</span>
            </div>
            <div class="card-desc" style="font-size: 9.8pt; color: #111111; font-weight: 600; margin-top: 3px;">
              लोक सभा चुनाव सन् 2014 में रेडियो के माध्यम से प्रदेश के 06 आकाशवाणी केन्द्रों से भारतीय जनता पार्टी के चुनाव प्रचार हेतु रेडियो जिंगल निर्माण व राष्ट्रव्यापी प्रसारण समन्वय हेतु अनुबंधित अधिकृत एजेंसी।
            </div>
          </div>
        </div>
      </div>

      <!-- Big Campaign Shield Banner -->
      <div class="big-banner">
        <div class="big-banner-icon">{svg_award_big}</div>
        <div class="big-banner-text">
          <strong>प्रतिष्ठित क्लाइंट्स व राष्ट्रीय अभियानों का सशक्त संचार:</strong>
          <b class="hl">World Bank</b>, <b class="hl">UNICEF</b>, <b class="hl">NABARD</b>, <b class="hl">Birla Group</b> सहित <b class="hl">24+ राष्ट्रीय संस्थाओं व शासकीय विभागों</b> हेतु वृत्तचित्र, जिंगल व प्रचार स्पॉट्स निर्माण, तथा <b class="hl">2013 विधानसभा</b> व <b class="hl">2014 लोकसभा चुनावों</b> में <b class="hl">6 आकाशवाणी केंद्रों</b> से व्यापक प्रसारण।
        </div>
      </div>
    </div>

    <div class="footer">
      <div><strong>बी.एस.आर. फिल्म्स</strong> • आधिकारिक कॉरपोरेट प्रोफाइल • www.bsrfilms.com</div>
      <div>5 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       A4 PAGE 6: FOUNDER & CREATIVE DIRECTOR - LEADERSHIP
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-title">बी.एस.आर. फिल्म्स</div>
          <div class="header-sub">संस्थापक एवं सृजनात्मक नेतृत्व</div>
        </div>
      </div>
      <div class="header-meta">
        क्रिएटिव विज़न<br>
        भीष्मदेव चतुर्वेदी
      </div>
    </div>

    <div class="page-body">
      <div>
        <div class="section-title">
          <span>सृजनात्मक नेतृत्व एवं विज़न — भीष्मदेव चतुर्वेदी</span>
          <span class="section-sub">25+ वर्षों का निर्देशन अनुभव</span>
        </div>

        <!-- Founder Profile Card with High-Res Photo & Credentials -->
        <div class="card card-highlight" style="display: flex; gap: 16px; align-items: center; padding: 14px 18px; margin-bottom: 10px;">
          <img src="data:image/png;base64,{bhishma_b64}" style="width: 105px; height: 125px; object-fit: cover; border-radius: 8px; border: 2.5px solid #8C4E00; box-shadow: 0 4px 8px rgba(140, 78, 0, 0.2); flex-shrink: 0;" alt="भीष्मदेव चतुर्वेदी">
          <div>
            <div style="font-size: 16pt; font-weight: 900; color: #0A0A0A; line-height: 1.15;">
              भीष्मदेव चतुर्वेदी
            </div>
            <div style="font-size: 10.5pt; font-weight: 800; color: #8C4E00; margin-top: 2px;">
              संस्थापक, मुख्य निर्माता एवं वरिष्ठ फिल्म निर्देशक
            </div>
            <div style="font-size: 9.8pt; color: #222222; margin-top: 5px; line-height: 1.42;">
              25 से अधिक वर्षों से भारतीय सिनेमा, वृत्तचित्र एवं जनसंचार के क्षेत्र में सक्रिय। आकाशवाणी (AIR) अनुमोदित ड्रामा डायरेक्टर, दूरदर्शन ग्रेडेड आर्टिस्ट एवं क्षेत्रीय सिनेमा के प्रतिष्ठित मार्गदर्शक।
            </div>
            <div class="pill-wrap" style="margin-top: 6px;">
              <span class="pill" style="font-size: 8.8pt; padding: 2px 9px;">AIR अनुमोदित ड्रामा डायरेक्टर</span>
              <span class="pill" style="font-size: 8.8pt; padding: 2px 9px;">दूरदर्शन ग्रेडेड आर्टिस्ट</span>
              <span class="pill" style="font-size: 8.8pt; padding: 2px 9px;">25+ वर्ष मीडिया अनुभव</span>
            </div>
          </div>
        </div>

        <!-- 4 Pillars of Leadership -->
        <div class="grid-2">
          <div class="card">
            <div class="card-tag">01 • सांस्कृतिक संरक्षण</div>
            <div class="card-title-bold" style="margin-top: 2px;">सांस्कृतिक एवं क्षेत्रीय सिनेमा का पुनर्जागरण</div>
            <div class="card-desc">
              छत्तीसगढ़ की समृद्ध लोक संस्कृति, हल्बी, गोंडी व छत्तीसगढ़ी बोलियों में 350+ प्रामाणिक वृत्तचित्रों व फिल्मों का निर्माण कर क्षेत्रीय अस्मिता को वैश्विक पटल पर स्थापित किया।
            </div>
          </div>

          <div class="card">
            <div class="card-tag">02 • राष्ट्रीय पहचान</div>
            <div class="card-title-bold" style="margin-top: 2px;">राष्ट्रीय सम्मान एवं जूरी सहभागिता</div>
            <div class="card-desc">
              विभिन्न राष्ट्रीय एवं राज्यस्तरीय फिल्म समारोहों में सम्मानित। कला, संस्कृति एवं दृश्य-श्रव्य जनसंचार के क्षेत्र में शासन व अकादमिक संस्थाओं के आधिकारिक सलाहकार।
            </div>
          </div>
        </div>

        <div class="grid-2" style="margin-bottom: 0;">
          <div class="card" style="margin-bottom: 0;">
            <div class="card-tag">03 • जन जागरूकता</div>
            <div class="card-title-bold" style="margin-top: 2px;">प्रभावी जनसंवाद एवं जनहितैषी अभियान</div>
            <div class="card-desc">
              यूनिसेफ, वर्ल्ड बैंक एवं राज्य शासन के दर्जनों वृहद जन-जागरूकता अभियानों का सफल निर्देशन, जिससे नीतियों का लाभ जमीनी स्तर तक आम जनता तक पहुंचा।
            </div>
          </div>

          <div class="card" style="margin-bottom: 0;">
            <div class="card-tag">04 • उद्योग मार्गदर्शन</div>
            <div class="card-title-bold" style="margin-top: 2px;">तकनीकी नवाचार एवं युवा प्रतिभाओं का संवर्धन</div>
            <div class="card-desc">
              नई पीढ़ी के सिनेमैटोग्राफर्स, एडिटर्स व तकनीशियनों को आधुनिकतम सिनेमाई उपकरणों में दक्ष बनाकर मध्य भारत के फिल्म उद्योग को तकनीकी रूप से सशक्त बनाया।
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Feature Crest Banner -->
      <div class="big-banner">
        <div class="big-banner-icon">{svg_crest_big}</div>
        <div class="big-banner-text">
          <strong>अनुभव, समर्पण और विज़न का स्वर्णिम समन्वय:</strong>
          भीष्मदेव चतुर्वेदी के सृजनात्मक मार्गदर्शन में बी.एस.आर. फिल्म्स ने <b class="hl">गुणवत्ता, सांस्कृतिक निष्ठा एवं समयबद्धता</b> के उच्चतम प्रतिमान स्थापित कर भारतीय मीडिया जगत में अपनी अमिट पहचान बनाई है।
        </div>
      </div>
    </div>

    <div class="footer">
      <div><strong>बी.एस.आर. फिल्म्स</strong> • आधिकारिक कॉरपोरेट प्रोफाइल • www.bsrfilms.com</div>
      <div>6 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       A4 PAGE 7: PRODUCTION STUDIO NETWORK, CONTACT & ROYAL CORPORATE SEAL
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-title">बी.एस.आर. फिल्म्स</div>
          <div class="header-sub">अधिकृत संपर्क एवं वैधानिक प्रमाणीकरण</div>
        </div>
      </div>
      <div class="header-meta">
        कार्यालय एवं स्टूडियो<br>
        अधिकृत सत्यापन मुहर
      </div>
    </div>

    <div class="page-body">
      <div>
        <div class="section-title">
          <span>कार्यालय संपर्क, कार्यप्रणाली एवं अधिकृत प्रमाणीकरण</span>
          <span class="section-sub">प्रमाणित कॉरपोरेट संचिका</span>
        </div>

        <div class="grid-2">
          <div class="card card-highlight">
            <div class="card-tag">सेंट्रल प्रोडक्शन स्टूडियो एवं रजिस्टर्ड कार्यालय</div>
            <div style="font-size: 10.2pt; color: #111111; line-height: 1.48; margin-top: 5px;">
              <p><strong>पता:</strong> राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 492013 (छ.ग.)</p>
              <p style="margin-top: 4px;"><strong>दूरभाष:</strong> <span style="font-weight: 800; font-size: 11pt; color: #8C4E00;">+91 7000866323, +91 9826167533</span></p>
              <p style="margin-top: 3px;"><strong>ईमेल:</strong> bsrfilms2017@gmail.com</p>
              <p style="margin-top: 3px;"><strong>वेबसाइट:</strong> <span style="font-weight: 800; color: #0A0A0A;">www.bsrfilms.com</span></p>
            </div>
          </div>

          <div class="card">
            <div class="card-tag">कार्यप्रणाली एवं गुणवत्ता संकल्प (Work Philosophy)</div>
            <div style="font-size: 9.8pt; color: #222222; line-height: 1.45; margin-top: 5px;">
              <p>• <strong>समयबद्ध निष्पादन:</strong> प्रत्येक अनुबंध की निर्धारित समयसीमा का शत-प्रतिशत पालन।</p>
              <p style="margin-top: 3px;">• <strong>ओरिजिनल कंटेंट:</strong> कॉपीराइट-मुक्त संगीत, प्रामाणिक रिसर्च व हाई-रेजोल्यूशन फुटेज।</p>
              <p style="margin-top: 3px;">• <strong>ब्रॉडकास्ट मानक:</strong> 4K UHD एवं टीवी/रेडियो प्रसारण हेतु पूर्णतः अनुकूलित मापदंड।</p>
              <p style="margin-top: 3px;">• <strong>पारदर्शी ऑडिट:</strong> शासकीय निविदा नियमों व ऑडिट प्रक्रियाओं का पूर्ण अनुपालन।</p>
            </div>
          </div>
        </div>

        <!-- Official Declaration Card -->
        <div class="card" style="padding: 12px 18px; margin-bottom: 10px; background: #FFFDF8; border: 1.6px solid #C89038;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
            <span class="card-tag" style="font-size: 10.5pt;">आधिकारिक घोषणा एवं प्रामाणिकता पत्र (Official Declaration)</span>
            <span class="card-badge">सत्यापित संचिका</span>
          </div>
          <div style="font-size: 9.8pt; color: #222222; line-height: 1.45;">
            <strong>यह प्रमाणित किया जाता है कि</strong> इस कॉरपोरेट पोर्टफोलियो संचिका में अंकित समस्त संस्थागत विवरण, शासकीय इम्पैनलमेंट, 24+ क्लाइंट सूचियां, तकनीकी उपकरण, वित्तीय साख एवं उत्पादन सांख्यिकी बी.एस.आर. फिल्म्स के वास्तविक, अधिकृत अभिलेखों एवं वैध अनुबंधों पर पूर्णतः आधारित हैं। हम किसी भी निविदा या कार्य हेतु आवश्यक मूल दस्तावेज प्रस्तुत करने हेतु प्रतिबद्ध हैं।
          </div>
        </div>

        <!-- Big Royal Corporate Seal Stamp & Signature Banner -->
        <div style="display: flex; align-items: center; justify-content: space-between; background: #FFFDF8; border: 2.2px solid #D5A04A; border-radius: 12px; padding: 14px 20px; box-shadow: 0 3px 8px rgba(140, 78, 0, 0.08);">
          <div style="flex-shrink: 0; width: 90px; height: 90px; display: flex; align-items: center; justify-content: center;">
            {svg_seal_big}
          </div>
          <div style="text-align: right; flex: 1; padding-left: 20px;">
            <div style="font-size: 9.5pt; color: #555555; margin-bottom: 4px;">
              <b class="hl">प्रमाणित:</b> संचिका में अंकित समस्त विवरण बी.एस.आर. फिल्म्स के <b class="hl">अधिकृत अभिलेखों एवं अनुबंधों</b> पर आधारित हैं।
            </div>
            <div style="font-size: 18pt; font-weight: 900; color: #8C4E00; line-height: 1.15;">
              बी.एस.आर. फिल्म्स
            </div>
            <div style="font-size: 11pt; font-weight: 800; color: #111111; margin-top: 3px;">
              अधिकृत हस्ताक्षरकर्ता • संस्थापक एवं प्रबंध निर्देशक
            </div>
            <div style="font-size: 9.2pt; color: #666666; margin-top: 1px;">
              रायपुर, छत्तीसगढ़ (भारत)
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Cooperation Banner -->
      <div class="big-banner" style="margin-top: 5px;">
        <div class="big-banner-icon">{svg_award_big}</div>
        <div class="big-banner-text">
          <strong>सहयोग एवं मीडिया साझेदारी हेतु संपर्क करें:</strong>
          आपके मीडिया अभियानों, शासकीय वृत्तचित्रों, विज्ञापन फिल्मों एवं रचनात्मक विजन को साकार करने हेतु <b class="hl">बी.एस.आर. फिल्म्स की समर्पित टीम</b> सदैव तत्पर है।
        </div>
      </div>
    </div>

    <div class="footer">
      <div><strong>बी.एस.आर. फिल्म्स</strong> • आधिकारिक कॉरपोरेट प्रोफाइल • www.bsrfilms.com</div>
      <div>7 / 7</div>
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
