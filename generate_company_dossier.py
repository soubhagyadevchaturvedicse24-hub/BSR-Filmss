import base64
import os
import subprocess
import fitz

with open('public/team/bhishma.png', 'rb') as f:
    bhishma_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('public/bsr-icon.png', 'rb') as f:
    icon_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('public/bsr-logo-clean.png', 'rb') as f:
    logo_b64 = base64.b64encode(f.read()).decode('utf-8')

# High-resolution, BIG vector SVGs (70px - 85px) for brand compliance & space coverage
svg_camera_big = """<svg width="72" height="72" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
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

svg_mic_big = """<svg width="70" height="70" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
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

svg_tv_big = """<svg width="72" height="72" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="20" width="64" height="42" rx="7" fill="#FAF2E3" stroke="#8C4E00" stroke-width="3.2"/>
  <rect x="14" y="26" width="42" height="30" rx="4" fill="#FFFFFF" stroke="#8C4E00" stroke-width="2.6"/>
  <circle cx="63" cy="33" r="3.5" fill="#8C4E00"/>
  <circle cx="63" cy="44" r="3.5" fill="#8C4E00"/>
  <line x1="59" y1="52" x2="67" y2="52" stroke="#8C4E00" stroke-width="2.6"/>
  <path d="M26 10L40 20L54 10" stroke="#8C4E00" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M22 62L16 72M58 62L64 72" stroke="#8C4E00" stroke-width="3.2" stroke-linecap="round"/>
</svg>"""

svg_award_big = """<svg width="70" height="70" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="30" r="22" fill="#FAF2E3" stroke="#8C4E00" stroke-width="3.2"/>
  <circle cx="40" cy="30" r="14" stroke="#8C4E00" stroke-width="2.4" fill="#FFFDF8"/>
  <path d="M40 20L43.5 27L51 28L45.5 33.5L47 41L40 37.5L33 41L34.5 33.5L29 28L36.5 27L40 20Z" fill="#8C4E00"/>
  <path d="M30 48L22 72L40 64L58 72L50 48" fill="#FAF2E3" stroke="#8C4E00" stroke-width="3" stroke-linejoin="round"/>
</svg>"""

svg_crest_big = """<svg width="70" height="70" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 8L60 16V36C60 52 40 70 40 70C40 70 20 52 20 36V16L40 8Z" fill="#FAF2E3" stroke="#8C4E00" stroke-width="3.2" stroke-linejoin="round"/>
  <path d="M30 30C35 27 45 27 50 30V48C45 45 35 45 30 48V30Z" fill="#FFFFFF" stroke="#8C4E00" stroke-width="2.4"/>
  <line x1="40" y1="28" x2="40" y2="47" stroke="#8C4E00" stroke-width="2.4"/>
  <circle cx="40" cy="20" r="4" fill="#8C4E00"/>
</svg>"""

svg_seal_big = """<svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <title>बी.एस.आर. - आधिकारिक कॉरपोरेट पोर्टफोलियो | BSR Films</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @page {{
      size: 108mm 196mm;
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
      background: #E5E0D8;
      color: #111111;
      line-height: 1.36;
      font-size: 10pt;
    }}
    .page {{
      width: 108mm;
      height: 196mm;
      min-height: 196mm;
      max-height: 196mm;
      margin: 0 auto;
      background: #FFFFFF;
      padding: 4mm 5.5mm 3.5mm 5.5mm;
      position: relative;
      page-break-after: always;
      page-break-inside: avoid;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-bottom: 2px solid #8C4E00;
    }}
    @media print {{
      body {{ background: transparent; }}
      .page {{ border-bottom: none; }}
    }}

    /* Main Body Container: Natural Flow with Clean Breathing Room */
    .page-body {{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      margin: 3px 0 2px 0;
    }}

    /* Prominent Business Header on Every Page */
    .header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2.2px solid #8C4E00;
      padding-bottom: 3px;
      margin-bottom: 3px;
    }}
    .header-left {{
      display: flex;
      align-items: center;
      gap: 7px;
    }}
    .header-logo {{
      width: 35px;
      height: 35px;
      object-fit: contain;
    }}
    .header-title {{
      font-size: 14.5pt;
      font-weight: 900;
      color: #0A0A0A;
      line-height: 1.1;
      letter-spacing: -0.2px;
    }}
    .header-sub {{
      font-size: 7.2pt;
      font-weight: 800;
      color: #8C4E00;
      letter-spacing: 0.3px;
      text-transform: uppercase;
    }}
    .header-meta {{
      text-align: right;
      font-size: 7.6pt;
      color: #333333;
      font-weight: 700;
      line-height: 1.25;
    }}

    /* Compact Mobile Footer */
    .footer {{
      border-top: 1.5px solid #D5A04A;
      padding-top: 3px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 7.6pt;
      color: #444444;
      font-weight: 700;
      margin-top: 2px;
    }}
    .footer strong {{
      color: #8C4E00;
    }}

    /* Section Titles */
    .section-title {{
      font-size: 12.5pt;
      font-weight: 900;
      color: #0A0A0A;
      border-bottom: 2px solid #8C4E00;
      padding-bottom: 2px;
      margin-bottom: 7px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }}
    .section-sub {{
      font-size: 7.8pt;
      font-weight: 800;
      color: #8C4E00;
    }}

    /* Cards with Generous Spacing and Padding */
    .card {{
      background: #FDFBF7;
      border: 1.4px solid #D8CDB8;
      border-radius: 8px;
      padding: 8.5px 11px;
      margin-bottom: 7.5px;
    }}
    .card-highlight {{
      background: #FFFDF8;
      border: 1.8px solid #8C4E00;
    }}
    .card-tag {{
      font-size: 8pt;
      font-weight: 800;
      color: #8C4E00;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }}
    .card-badge {{
      background: #FAF2E3;
      border: 1.2px solid #C89038;
      color: #5A2D00;
      font-size: 7.5pt;
      font-weight: 800;
      padding: 2px 7.5px;
      border-radius: 4px;
    }}
    .card-title-bold {{
      font-size: 11pt;
      font-weight: 800;
      color: #0A0A0A;
      line-height: 1.32;
      margin-top: 2px;
    }}
    .card-desc {{
      font-size: 9.2pt;
      font-weight: 500;
      color: #2D2822;
      line-height: 1.38;
      margin-top: 2.5px;
    }}

    /* Grid Layouts for Mobile */
    .grid-2 {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
      margin-bottom: 7.5px;
    }}
    .grid-3 {{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 5.5px;
    }}
    .stat-box {{
      background: #FDFBF7;
      border: 1.4px solid #D5A04A;
      border-radius: 7px;
      padding: 5px 4px;
      text-align: center;
    }}
    .stat-num {{
      font-size: 16pt;
      font-weight: 900;
      color: #8C4E00;
      line-height: 1.1;
    }}
    .stat-label {{
      font-size: 8.8pt;
      font-weight: 800;
      color: #0A0A0A;
      margin-top: 1px;
    }}
    .stat-sub {{
      font-size: 6.8pt;
      color: #555555;
      font-weight: 600;
      line-height: 1.18;
    }}

    /* Pills */
    .pill-wrap {{
      display: flex;
      flex-wrap: wrap;
      gap: 4.5px;
      margin: 3.5px 0;
    }}
    .pill {{
      background: #FAF2E3;
      border: 1.2px solid #C89038;
      color: #5A2D00;
      font-size: 8.5pt;
      font-weight: 800;
      padding: 2.5px 8.5px;
      border-radius: 5px;
    }}

    /* Big Feature Symbol Banner Cards at Bottom of Pages */
    .big-banner {{
      display: flex;
      align-items: center;
      gap: 13px;
      background: #FFFDF8;
      border: 1.6px solid #D5A04A;
      border-radius: 9px;
      padding: 9px 12px;
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
      font-size: 9pt;
      color: #383838;
      line-height: 1.38;
      font-weight: 500;
    }}
    .big-banner-text strong {{
      color: #8C4E00;
      font-weight: 900;
      font-size: 9.8pt;
      display: block;
      margin-bottom: 2.5px;
    }}
    .hl {{
      color: #080808;
      font-weight: 900;
      text-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.15);
      border-bottom: 1.5px solid rgba(200, 144, 56, 0.55);
      padding-bottom: 0.5px;
    }}
  </style>
</head>
<body>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 1: BSR FILMS - CORPORATE OVERVIEW, LOGO SHOWCASE & CREDENTIALS
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-title">बी.एस.आर.</div>
          <div class="header-sub">फिल्म, टीवी, वृत्तचित्र एवं मीडिया प्रोडक्शन हाउस</div>
        </div>
      </div>
      <div class="header-meta">
        25+ वर्ष उत्कृष्टता<br>
        संवाद 'ब' श्रेणी • NFDC
      </div>
    </div>

    <div class="page-body">
      <!-- Prominent Brand Logo & Cover Showcase Box -->
      <div style="background: linear-gradient(135deg, #FAF2E3 0%, #FFFDF8 100%); border: 2px solid #8C4E00; border-radius: 9px; padding: 7px 10px; text-align: center; margin-bottom: 4px; box-shadow: 0 2px 8px rgba(140, 78, 0, 0.08);">
        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 3px;">
          <img src="data:image/png;base64,{logo_b64}" style="height: 48px; width: auto; max-width: 175px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(140, 78, 0, 0.22));" alt="बी.एस.आर. Logo">
        </div>
        <div style="font-size: 14.5pt; font-weight: 900; color: #0A0A0A; line-height: 1.15; letter-spacing: -0.2px;">
          बी.एस.आर.
        </div>
        <div style="font-size: 8.3pt; font-weight: 800; color: #8C4E00; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 1.5px;">
          सेंट्रल इंडिया का प्रतिष्ठित मीडिया प्रोडक्शन हाउस
        </div>
        <div style="font-size: 7.5pt; color: #444444; font-weight: 600; margin-top: 1px;">
          संस्कृति, सृजनात्मकता एवं अत्याधुनिक प्रसारण तकनीक का 25+ वर्षों का विश्वास
        </div>
        <div class="pill-wrap" style="justify-content: center; gap: 4px; margin-top: 4px; margin-bottom: 0;">
          <span class="pill" style="font-size: 7.5pt; padding: 1.5px 6.5px;">छत्तीसगढ़ संवाद 'ब' श्रेणी (पंजीयन: 489)</span>
          <span class="pill" style="font-size: 7.5pt; padding: 1.5px 6.5px;">NFDC इम्पैनल्ड</span>
          <span class="pill" style="font-size: 7.5pt; padding: 1.5px 6.5px;">प्रसार भारती अधिकृत</span>
        </div>
      </div>

      <!-- 6 Key Business & Production Metrics (Spacious & Bold) -->
      <div>
        <div class="section-title" style="margin-bottom: 5px; font-size: 11.5pt;">
          <span>प्रमुख सांख्यिकी एवं उपलब्धियां</span>
          <span class="section-sub">प्रमाणित मीडिया परिमाण</span>
        </div>
        <div class="grid-3" style="margin-bottom: 5px; gap: 6px;">
          <div class="stat-box" style="padding: 7px 4px;">
            <div class="stat-num" style="font-size: 17pt;">650+</div>
            <div class="stat-label">विज्ञापन स्पॉट्स</div>
            <div class="stat-sub">Ad Films & Promos</div>
          </div>
          <div class="stat-box" style="padding: 7px 4px;">
            <div class="stat-num" style="font-size: 17pt;">350+</div>
            <div class="stat-label">वृत्तचित्र निर्माण</div>
            <div class="stat-sub">Research Documentaries</div>
          </div>
          <div class="stat-box" style="padding: 7px 4px;">
            <div class="stat-num" style="font-size: 17pt;">500+</div>
            <div class="stat-label">ऑडियो कार्यक्रम</div>
            <div class="stat-sub">Jingles & Radio Spots</div>
          </div>
        </div>

        <div class="grid-3" style="margin-bottom: 0; gap: 6px;">
          <div class="stat-box" style="padding: 7px 4px;">
            <div class="stat-num" style="font-size: 17pt;">400+</div>
            <div class="stat-label">एनिमेशन व ग्राफिक्स</div>
            <div class="stat-sub">2D / 3D Motion VFX</div>
          </div>
          <div class="stat-box" style="padding: 7px 4px;">
            <div class="stat-num" style="font-size: 17pt;">25+</div>
            <div class="stat-label">वर्ष व्यावसायिक अनुभव</div>
            <div class="stat-sub">Industry Excellence</div>
          </div>
          <div class="stat-box" style="padding: 7px 4px;">
            <div class="stat-num" style="font-size: 17pt;">06</div>
            <div class="stat-label">भाषाएं व बोलियां</div>
            <div class="stat-sub">Regional & National</div>
          </div>
        </div>
      </div>

      <!-- Production Office & Studio Contact Box on Page 1 -->
      <div class="card card-highlight" style="padding: 8px 11px; margin-bottom: 0;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
          <span class="card-tag" style="font-size: 8.5pt;">कार्यालय एवं प्रोडक्शन स्टूडियो</span>
          <span class="card-badge">राजधानी रायपुर</span>
        </div>
        <div style="font-size: 8.5pt; color: #111111; line-height: 1.36;">
          <p><strong>पता:</strong> राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 492013 (छ.ग.)</p>
          <p style="margin-top: 2px;">
            <strong>दूरभाष:</strong> <span style="font-weight: 800; font-size: 9.8pt; color: #0A0A0A;">7000866323, 9826167533</span>
            &nbsp;•&nbsp; <strong>ईमेल:</strong> bsrfilms2017@gmail.com
          </p>
          <p style="margin-top: 1px;"><strong>वेबसाइट:</strong> <span style="color: #8C4E00; font-weight: 800;">www.bsrfilms.com</span></p>
        </div>
      </div>
    </div>

    <div class="footer">
      <div><strong>बी.एस.आर.</strong> • कॉरपोरेट प्रोफाइल • www.bsrfilms.com</div>
      <div>1 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 2: PRODUCTION CAPABILITIES & INSTITUTIONAL CREDENTIALS
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-title">बी.एस.आर.</div>
          <div class="header-sub">संस्थागत कार्यक्षेत्र, विधाएं एवं पंजीयन</div>
        </div>
      </div>
      <div class="header-meta">
        मल्टीमीडिया प्रोडक्शन<br>
        6 प्रमुख भाषाएं
      </div>
    </div>

    <div class="page-body">
      <div>
        <div class="section-title">
          <span>उत्पादन विधाएं एवं संस्थागत मान्यताएं</span>
          <span class="section-sub">पंजीकृत व अनुबंधित</span>
        </div>

        <div class="card" style="padding: 10px 12px; margin-bottom: 7.5px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span class="card-tag">संस्थागत पंजीयन (छत्तीसगढ़ संवाद)</span>
            <span class="card-badge">'ब' श्रेणी पंजीकृत</span>
          </div>
          <div class="card-title-bold">छत्तीसगढ़ संवाद 'ब' श्रेणी पंजीयन सं. 489</div>
          <div class="card-desc">
            छत्तीसगढ़ शासन के सूचना एवं जनसंपर्क विभाग के अंतर्गत विज्ञापन, वीडियो स्पॉट्स एवं वृत्तचित्र निर्माण हेतु आधिकारिक रूप से पंजीकृत।
          </div>
        </div>

        <div class="card" style="padding: 10px 12px; margin-bottom: 7.5px;">
          <div class="card-tag">निर्माण विधाएं (Production Disciplines)</div>
          <div class="card-title-bold" style="font-size: 10.5pt;">वृत्तचित्र, वीडियो स्पॉट्स, जिंगल्स, धारावाहिक व 3D एनिमेशन</div>
          <div class="card-desc">
            सरकारी व गैर-सरकारी योजनाओं, सांस्कृतिक धरोहरों व कॉर्पोरेट अभियानों हेतु एंड-टू-एंड ऑडियो-विजुअल समाधान।
          </div>
        </div>

        <div class="card" style="padding: 9.5px 12px; margin-bottom: 0;">
          <span class="card-tag block mb-1">कार्यक्षेत्र भाषाएं एवं बोलियां</span>
          <div class="card-title-bold" style="font-size: 10pt;">
            हिंदी, छत्तीसगढ़ी, गोंडी, हल्बी, सरगुजिहा और अंग्रेजी
          </div>
          <div class="pill-wrap" style="margin-top: 5px; gap: 5px;">
            <span class="pill">हिंदी</span>
            <span class="pill">छत्तीसगढ़ी</span>
            <span class="pill">गोंडी</span>
            <span class="pill">हल्बी</span>
            <span class="pill">सरगुजिहा</span>
            <span class="pill">अंग्रेजी</span>
          </div>
        </div>
      </div>

      <!-- Big 35mm Cinema Studio Camera Banner -->
      <div class="big-banner" style="padding: 10px 13px; gap: 14px;">
        <div class="big-banner-icon">{svg_camera_big}</div>
        <div class="big-banner-text">
          <strong>25+ वर्षों की संस्थागत विश्वसनीयता:</strong>
          <b class="hl">छत्तीसगढ़ संवाद ('ब' श्रेणी)</b>, <b class="hl">NFDC</b> एवं <b class="hl">प्रसार भारती</b> से मान्यता प्राप्त। <b class="hl">6 प्रमुख भाषाओं व बोलियों</b> में <b class="hl">650+ विज्ञापन स्पॉट्स</b> एवं <b class="hl">350+ वृत्तचित्रों</b> के निर्माण का ऐतिहासिक कीर्तिमान।
        </div>
      </div>
    </div>

    <div class="footer">
      <div><strong>बी.एस.आर.</strong> • कॉरपोरेट प्रोफाइल • www.bsrfilms.com</div>
      <div>2 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 3: TELEVISION BROADCAST & TELEFILM WING (DD RAIPUR)
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-title">बी.एस.आर.</div>
          <div class="header-sub">दूरदर्शन केंद्र रायपुर प्रसारण विंग</div>
        </div>
      </div>
      <div class="header-meta">
        टेलीफिल्म व धारावाहिक<br>
        DD Raipur
      </div>
    </div>

    <div class="page-body">
      <div>
        <div class="section-title">
          <span>दूरदर्शन केंद्र रायपुर</span>
          <span class="section-sub">टेलीफिल्म, धारावाहिक व एंकरिंग</span>
        </div>

        <div class="grid-2" style="gap: 8px; margin-bottom: 8.5px;">
          <div class="stat-box" style="padding: 9px 6px;">
            <div class="stat-num" style="font-size: 23pt;">15</div>
            <div class="stat-label" style="font-size: 10.2pt;">15 टेलीफिल्म</div>
            <div class="stat-sub" style="font-size: 8pt;">लेखन व निर्देशन • दूरदर्शन</div>
          </div>
          <div class="stat-box" style="padding: 9px 6px;">
            <div class="stat-num" style="font-size: 23pt;">5</div>
            <div class="stat-label" style="font-size: 10.2pt;">5 सीरियल</div>
            <div class="stat-sub" style="font-size: 8pt;">लेखन, निर्देशन व संचालन</div>
          </div>
        </div>

        <div class="card" style="padding: 9px 12px; margin-bottom: 8px;">
          <div class="card-tag">वीडियो स्पॉट्स निर्माण</div>
          <div class="card-title-bold">दूरदर्शन रायपुर का प्रथम वीडियो स्पॉट लेखन व निर्देशन सहित 80 से अधिक वीडियो स्पॉट्स</div>
        </div>

        <div class="card" style="padding: 9px 12px; margin-bottom: 8px;">
          <div class="card-tag">विशेष प्रसारण</div>
          <div class="card-title-bold">विभिन्न राष्ट्रीय और क्षेत्रीय कार्यक्रमों का लेखन व निर्देशन</div>
          <div class="card-desc">राज्य एवं राष्ट्रीय स्तर के प्रतिष्ठित आयोजनों का संयोजन व निर्देशन।</div>
        </div>

        <div class="card" style="padding: 9px 12px; margin-bottom: 0;">
          <div class="card-tag">दूरदर्शन रायपुर के प्रमुख कार्यक्रम (एंकर):</div>
          <div class="pill-wrap" style="margin-top: 4px; gap: 5px;">
            <span class="pill">एंकर - परिक्रमा</span>
            <span class="pill">हमर गांव</span>
            <span class="pill">नववर्ष विशेष कार्यक्रम</span>
            <span class="pill">भुइयां के गोठ</span>
            <span class="pill">कृषि दर्शन कार्यक्रम</span>
          </div>
        </div>
      </div>

      <!-- Big TV Studio Banner -->
      <div class="big-banner" style="padding: 10px 13px; gap: 14px;">
        <div class="big-banner-icon">{svg_tv_big}</div>
        <div class="big-banner-text">
          <strong>दूरदर्शन केंद्र रायपुर का गौरव:</strong>
          छत्तीसगढ़ के <b class="hl">टेलीविजन इतिहास के प्रथम वीडियो स्पॉट</b> से लेकर <b class="hl">'परिक्रमा'</b>, <b class="hl">'हमर गांव'</b> व <b class="hl">'कृषि दर्शन'</b> जैसे प्रमुख कार्यक्रमों के <b class="hl">मुख्य संचालक</b> एवं <b class="hl">15 टेलीफिल्म्स के निर्देशक</b>।
        </div>
      </div>
    </div>

    <div class="footer">
      <div><strong>बी.एस.आर.</strong> • कॉरपोरेट प्रोफाइल • www.bsrfilms.com</div>
      <div>3 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 4: AUDIO, RADIO BROADCASTING & SOUND PRODUCTION (AIR RAIPUR)
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-title">बी.एस.आर.</div>
          <div class="header-sub">आकाशवाणी रायपुर एवं ऑडियो विंग</div>
        </div>
      </div>
      <div class="header-meta">
        30+ वर्ष अनुभव<br>
        AIR Raipur
      </div>
    </div>

    <div class="page-body">
      <div>
        <div class="section-title">
          <span>अनुभव — आकाशवाणी रायपुर</span>
          <span class="section-sub">तीन दशकों की रेडियो प्रसारण यात्रा</span>
        </div>

        <div class="card" style="padding: 9px 12px; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span class="card-tag">उद्घोषणा व संचालन</span>
            <span class="card-badge">लगभग 30 वर्ष</span>
          </div>
          <div class="card-title-bold">नैमेत्तिक कंपियर - ( लगभग 30 वर्ष )</div>
          <div class="card-desc">(आकाशवाणी रायपुर में चौपाल और श्रमिक जगत कार्यक्रम में अनुबंधित)</div>
        </div>

        <div class="card" style="padding: 9px 12px; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span class="card-tag">नाट्य कलाकार</span>
            <span class="card-badge">बी हाइग्रेड</span>
          </div>
          <div class="card-title-bold">आकाशवाणी रायपुर से नाटक में &quot; बी हाइग्रेड &quot; कलाकार</div>
          <div class="card-desc">प्रसार भारती द्वारा आधिकारिक रूप से वर्गीकृत उच्च कोटि के नाट्य अभिनेता।</div>
        </div>

        <!-- 2-Column Grid for Features & Plays -->
        <div class="grid-2" style="gap: 8px; margin-bottom: 8px;">
          <div class="card" style="padding: 8.5px 10px; margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-tag">रेडियो रूपक</span>
              <span class="card-badge">50 अनुबंध</span>
            </div>
            <div class="card-title-bold" style="font-size: 10pt;">50 रेडियो रूपक लेखन निर्माण अनुबंध</div>
            <div class="card-desc" style="font-size: 8.5pt;">विभिन्न सामाजिक व लोक विषयों पर 50 रूपकों का सफल निर्माण।</div>
          </div>

          <div class="card" style="padding: 8.5px 10px; margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-tag">रेडियो नाटक</span>
              <span class="card-badge">10 नाटक</span>
            </div>
            <div class="card-title-bold" style="font-size: 10pt;">10 नाटकों का लेखन व निर्माण अनुबंध</div>
            <div class="card-desc" style="font-size: 8.5pt;">साहित्यिक विषयों पर 10 पूर्ण नाटकों का आधिकारिक निर्माण।</div>
          </div>
        </div>

        <div class="card" style="padding: 9px 12px; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span class="card-tag">ऐतिहासिक धारावाहिक</span>
            <span class="card-badge">6 धारावाहिक</span>
          </div>
          <div class="card-title-bold">आकाशवाणी रायपुर से प्रथम रेडियो सीरियल सहित 6 रेडियो सीरियल (हिंदी एवं छत्तीसगढ़ी) लेखन के लिए अनुबंध</div>
        </div>
      </div>

      <!-- Big Ribbon Mic Broadcast Banner -->
      <div class="big-banner" style="padding: 10px 13px; gap: 14px;">
        <div class="big-banner-icon">{svg_mic_big}</div>
        <div class="big-banner-text">
          <strong>रेडियो प्रसारण की अविस्मरणीय आवाज:</strong>
          <b class="hl">तीन दशकों तक</b> <b class="hl">आकाशवाणी रायपुर</b> के सर्वाधिक लोकप्रिय कार्यक्रमों <b class="hl">'चौपाल'</b> व <b class="hl">'श्रमिक जगत'</b> की पहचान। <b class="hl">50 रूपक</b>, <b class="hl">10 नाटक</b> एवं <b class="hl">6 धारावाहिकों</b> का सफल निर्माण।
        </div>
      </div>
    </div>

    <div class="footer">
      <div><strong>बी.एस.आर.</strong> • कॉरपोरेट प्रोफाइल • www.bsrfilms.com</div>
      <div>4 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 5: STRATEGIC CAMPAIGNS & GLOBAL MISSIONS
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-title">बी.एस.आर.</div>
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
          <span>प्रतिष्ठित क्लाइंट्स, शासकीय विभाग एवं राष्ट्रीय अभियान</span>
          <span class="section-sub">24+ प्रमाणित संस्थाएं</span>
        </div>

        <!-- 1. International & National Organizations (10) -->
        <div class="card" style="padding: 7px 10px; margin-bottom: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
            <span class="card-tag" style="font-size: 8.5pt;">अंतर्राष्ट्रीय एवं राष्ट्रीय संगठन (10 संस्थाएं)</span>
            <span class="card-badge" style="font-size: 7.2pt;">Global & National Bodies</span>
          </div>
          <div class="pill-wrap" style="gap: 4px; margin: 0;">
            <span class="pill" style="font-size: 7.8pt; padding: 2px 7.5px;">World Bank</span>
            <span class="pill" style="font-size: 7.8pt; padding: 2px 7.5px;">NABARD</span>
            <span class="pill" style="font-size: 7.8pt; padding: 2px 7.5px;">UNICEF</span>
            <span class="pill" style="font-size: 7.8pt; padding: 2px 7.5px;">SHRC</span>
            <span class="pill" style="font-size: 7.8pt; padding: 2px 7.5px;">CHRI</span>
            <span class="pill" style="font-size: 7.8pt; padding: 2px 7.5px;">IFFCO</span>
            <span class="pill" style="font-size: 7.8pt; padding: 2px 7.5px;">Birla Group</span>
            <span class="pill" style="font-size: 7.8pt; padding: 2px 7.5px;">DDUGKY</span>
            <span class="pill" style="font-size: 7.8pt; padding: 2px 7.5px;">SRLM</span>
            <span class="pill" style="font-size: 7.8pt; padding: 2px 7.5px;">PRIYA NGO</span>
          </div>
        </div>

        <!-- 2. Government Departments & Agencies (14) -->
        <div class="card" style="padding: 7px 10px; margin-bottom: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
            <span class="card-tag" style="font-size: 8.5pt;">शासकीय विभाग एवं राज्य आयोग (14 विभाग)</span>
            <span class="card-badge" style="font-size: 7.2pt;">Government & Public Sector</span>
          </div>
          <div class="pill-wrap" style="gap: 4px; margin: 0;">
            <span class="pill" style="font-size: 7.6pt; padding: 2px 6.5px;">जनसंपर्क विभाग (DPR)</span>
            <span class="pill" style="font-size: 7.6pt; padding: 2px 6.5px;">श्रम विभाग (Labour)</span>
            <span class="pill" style="font-size: 7.6pt; padding: 2px 6.5px;">पंचायत एवं ग्रामीण विकास</span>
            <span class="pill" style="font-size: 7.6pt; padding: 2px 6.5px;">लोक स्वास्थ्य यांत्रिकी (PHED)</span>
            <span class="pill" style="font-size: 7.6pt; padding: 2px 6.5px;">नगरीय प्रशासन</span>
            <span class="pill" style="font-size: 7.6pt; padding: 2px 6.5px;">स्वास्थ्य एवं परिवार कल्याण</span>
            <span class="pill" style="font-size: 7.6pt; padding: 2px 6.5px;">महिला एवं बाल विकास</span>
            <span class="pill" style="font-size: 7.6pt; padding: 2px 6.5px;">स्कूल शिक्षा विभाग</span>
            <span class="pill" style="font-size: 7.6pt; padding: 2px 6.5px;">जल संसाधन विभाग</span>
            <span class="pill" style="font-size: 7.6pt; padding: 2px 6.5px;">कृषि विभाग</span>
            <span class="pill" style="font-size: 7.6pt; padding: 2px 6.5px;">वन विभाग</span>
            <span class="pill" style="font-size: 7.6pt; padding: 2px 6.5px;">समाज कल्याण विभाग</span>
            <span class="pill" style="font-size: 7.6pt; padding: 2px 6.5px;">छत्तीसगढ़ पुलिस (CG Police)</span>
            <span class="pill" style="font-size: 7.6pt; padding: 2px 6.5px;">छत्तीसगढ़ राज्य महिला आयोग</span>
          </div>
        </div>

        <!-- 3. Historic Election Campaigns -->
        <div class="grid-2" style="gap: 6px; margin-bottom: 6px;">
          <div class="card" style="padding: 7px 9px; margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-tag" style="font-size: 8pt;">विधान सभा चुनाव 2013</span>
              <span class="card-badge" style="font-size: 6.8pt;">06 आकाशवाणी</span>
            </div>
            <div class="card-desc" style="font-size: 7.6pt; color: #111111; font-weight: 600; margin-top: 2px; line-height: 1.28;">
              प्रदेश के 06 आकाशवाणी केन्द्रों से रेडियो जिंगल निर्माण व व्यापक प्रसारण हेतु अनुबंधित अधिकृत एजेंसी।
            </div>
          </div>

          <div class="card" style="padding: 7px 9px; margin-bottom: 0;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <span class="card-tag" style="font-size: 8pt;">लोक सभा चुनाव 2014</span>
              <span class="card-badge" style="font-size: 6.8pt;">06 आकाशवाणी</span>
            </div>
            <div class="card-desc" style="font-size: 7.6pt; color: #111111; font-weight: 600; margin-top: 2px; line-height: 1.28;">
              प्रदेश के 06 आकाशवाणी केन्द्रों से रेडियो जिंगल निर्माण व राष्ट्रव्यापी प्रसारण समन्वय हेतु अनुबंधित एजेंसी।
            </div>
          </div>
        </div>
      </div>

      <!-- Big Campaign Shield Banner -->
      <div class="big-banner" style="padding: 8px 11px; gap: 12px; margin-top: 0;">
        <div class="big-banner-icon">{svg_award_big}</div>
        <div class="big-banner-text">
          <strong>प्रतिष्ठित क्लाइंट्स व राष्ट्रीय अभियानों का सशक्त संचार:</strong>
          <b class="hl">World Bank</b>, <b class="hl">UNICEF</b>, <b class="hl">NABARD</b>, <b class="hl">Birla Group</b> सहित <b class="hl">24+ राष्ट्रीय संस्थाओं व शासकीय विभागों</b> हेतु वृत्तचित्र, जिंगल व प्रचार स्पॉट्स निर्माण, तथा <b class="hl">2013 विधानसभा</b> व <b class="hl">2014 लोकसभा चुनावों</b> में <b class="hl">6 आकाशवाणी केंद्रों</b> से व्यापक प्रसारण।
        </div>
      </div>
    </div>

    <div class="footer">
      <div><strong>बी.एस.आर.</strong> • कॉरपोरेट प्रोफाइल • www.bsrfilms.com</div>
      <div>5 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 6: FOUNDER & CREATIVE DIRECTOR - LEADERSHIP
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-title">बी.एस.आर.</div>
          <div class="header-sub">संस्थापक एवं सृजनात्मक नेतृत्व</div>
        </div>
      </div>
      <div class="header-meta">
        क्रिएटिव विज़न<br>
        भीष्मदेव चतुर्वेदी
      </div>
    </div>

    <div class="page-body">
      <!-- Founder Compact Executive Card -->
      <div style="display: flex; align-items: center; gap: 12px; background: #FFFDF8; border: 1.8px solid #8C4E00; border-radius: 9px; padding: 7px 10px; margin-bottom: 6px;">
        <img src="data:image/png;base64,{bhishma_b64}" style="width: 58px; height: 58px; border-radius: 50%; object-fit: cover; object-position: top center; border: 2.2px solid #D5A04A; box-shadow: 0 2px 6px rgba(0,0,0,0.12);" alt="Founder Photo">
        <div>
          <div style="font-size: 13pt; font-weight: 900; color: #0A0A0A; line-height: 1.15;">भीष्मदेव चतुर्वेदी</div>
          <div style="font-size: 7.8pt; font-weight: 800; color: #8C4E00; text-transform: uppercase;">संस्थापक एवं मुख्य निर्देशक • बी.एस.आर.</div>
          <div style="font-size: 7.5pt; color: #444444; font-weight: 600; margin-top: 2px;">
            लेखक • निर्देशक • निर्माता • गीतकार • कवि • मंच संचालन • समाजसेवा
          </div>
        </div>
      </div>

      <!-- Section: Studies (शिक्षा) -->
      <div>
        <div class="section-title" style="margin-bottom: 5px;">
          <span>शिक्षा एवं शैक्षणिक योग्यता</span>
          <span class="section-sub">डिग्री, पत्रकारिता, लोक संगीत व वाणी दीक्षा</span>
        </div>

        <div class="grid-2" style="gap: 7px; margin-bottom: 7px;">
          <div class="card" style="padding: 8.5px 10px; margin-bottom: 0;">
            <div class="card-tag">स्नातकोत्तर डिग्री</div>
            <div class="card-title-bold" style="font-size: 10pt;">शिक्षा - एम.ए.राजनीति शास्त्र</div>
          </div>

          <div class="card" style="padding: 8.5px 10px; margin-bottom: 0;">
            <div class="card-tag">पत्रकारिता स्नातक</div>
            <div class="card-title-bold" style="font-size: 10pt;">बी जे एमसी ( पं. रविशंकर विश्वविद्यालय रायपुर)</div>
          </div>
        </div>

        <div class="grid-2" style="gap: 7px; margin-bottom: 7px;">
          <div class="card" style="padding: 8.5px 10px; margin-bottom: 0;">
            <div class="card-tag">संगीत दीक्षा</div>
            <div class="card-title-bold" style="font-size: 10pt;">डिप्लोमा इन लोक संगीत ( इंदिरा कला संगीत वि.वि. खैरागढ़)</div>
          </div>

          <div class="card" style="padding: 8.5px 10px; margin-bottom: 0;">
            <div class="card-tag">प्रसारण प्रमाणन</div>
            <div class="card-title-bold" style="font-size: 10pt;">वाणी कोर्स ( प्रसार भारती )</div>
          </div>
        </div>
      </div>

      <!-- Section: Organizational Leadership (Clean of RSS/ABVP) -->
      <div style="margin-bottom: 6px;">
        <div class="card" style="padding: 8px 11px; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span class="card-tag">सिनेमा व टेलीविजन प्रोड्यूसर्स संगठन</span>
            <span class="card-badge">संस्थापक सदस्य</span>
          </div>
          <div class="card-title-bold" style="font-size: 10.2pt; margin-top: 2px;">
            CCTPA ( Chhattisgarh Cine And Television Producers Association ) का फाउंडर सदस्य
          </div>
        </div>
      </div>

      <!-- Big Crest Feature Banner -->
      <div class="big-banner" style="padding: 10px 13px; gap: 14px;">
        <div class="big-banner-icon">{svg_crest_big}</div>
        <div class="big-banner-text">
          <strong>शैक्षणिक गरिमा एवं सांस्कृतिक निष्ठा:</strong>
          <b class="hl">राजनीति शास्त्र में स्नातकोत्तर</b>, <b class="hl">पत्रकारिता (BJMC)</b>, <b class="hl">खैरागढ़ विश्वविद्यालय</b> से <b class="hl">लोक संगीत दीक्षा</b> एवं <b class="hl">प्रसार भारती</b> से <b class="hl">वाणी प्रमाणन</b> का दुर्लभ व प्रतिष्ठित समन्वय।
        </div>
      </div>
    </div>

    <div class="footer">
      <div><strong>बी.एस.आर.</strong> • कॉरपोरेट प्रोफाइल • www.bsrfilms.com</div>
      <div>6 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 7: OFFICIAL CONTACT, STUDIO INFRASTRUCTURE & ROYAL SEAL
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-title">बी.एस.आर.</div>
          <div class="header-sub">आधिकारिक संपर्क, स्टूडियो एवं संचिका</div>
        </div>
      </div>
      <div class="header-meta">
        राजधानी रायपुर<br>
        छत्तीसगढ़
      </div>
    </div>

    <div class="page-body">
      <div>
        <div class="section-title">
          <span>आधिकारिक संपर्क एवं प्रोडक्शन स्टूडियो</span>
          <span class="section-sub">राजधानी रायपुर (छ.ग.)</span>
        </div>

        <div class="card card-highlight" style="padding: 11px 13px; margin-bottom: 8px;">
          <div style="font-size: 9.3pt; line-height: 1.48; color: #111111;">
            <p style="margin-bottom: 6px;">
              <strong style="color: #8C4E00; font-size: 9pt;">स्थाई कार्यालय एवं स्टूडियो पता:</strong><br>
              राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 492013 ( छ ग)
            </p>
            <p style="margin-bottom: 6px;">
              <strong style="color: #8C4E00; font-size: 9pt;">दूरभाष / मोबाइल संपर्क:</strong><br>
              <span style="font-size: 12.5pt; font-weight: 900; color: #0A0A0A;">7000866323, 9826167533</span>
            </p>
            <p style="margin-bottom: 6px;">
              <strong style="color: #8C4E00; font-size: 9pt;">आधिकारिक ईमेल:</strong><br>
              <span style="font-size: 10.5pt; font-weight: 800; color: #0A0A0A;">bsrfilms2017@gmail.com</span>
            </p>
            <p>
              <strong style="color: #8C4E00; font-size: 9pt;">आधिकारिक वेबसाइट:</strong><br>
              <span style="font-size: 10.5pt; font-weight: 800; color: #0A0A0A;">www.bsrfilms.com</span>
            </p>
          </div>
        </div>

        <div class="card" style="padding: 10px 12px; margin-bottom: 0;">
          <div class="card-tag">आजीवन सांस्कृतिक व व्यावसायिक संकल्प</div>
          <div style="font-size: 9.5pt; color: #0A0A0A; font-weight: 700; line-height: 1.4; margin-top: 3px;">
            भारतीय कला, संस्कृति, साहित्य, अध्यात्म, राजनीति में विशेष रुचि। छत्तीसगढ़ी भाषा, लोक कला, संस्कृति व जनसंचार के संवर्धन हेतु समर्पित।
          </div>
        </div>
      </div>

      <!-- Big Royal Corporate Seal Stamp & Signature Banner -->
      <div style="display: flex; align-items: center; justify-content: space-between; background: #FFFDF8; border: 1.8px solid #D5A04A; border-radius: 9px; padding: 11px 14px;">
        <div style="flex-shrink: 0; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
          {svg_seal_big}
        </div>
        <div style="text-align: right; flex: 1; padding-left: 14px;">
          <div style="font-size: 8.2pt; color: #555555; margin-bottom: 4px;">
            <b class="hl">प्रमाणित:</b> संचिका में अंकित समस्त विवरण बी.एस.आर. के <b class="hl">अधिकृत अभिलेखों एवं अनुबंधों</b> पर आधारित हैं।
          </div>
          <div style="font-size: 14.5pt; font-weight: 900; color: #8C4E00; line-height: 1.15;">
            बी.एस.आर.
          </div>
          <div style="font-size: 10pt; font-weight: 800; color: #111111; margin-top: 2.5px;">
            अधिकृत हस्ताक्षरकर्ता • संस्थापक एवं निर्देशक
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div><strong>बी.एस.आर.</strong> • कॉरपोरेट प्रोफाइल • www.bsrfilms.com</div>
      <div>7 / 7</div>
    </div>
  </div>

</body>
</html>
"""

with open('public/bsr_company_dossier.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Saved public/bsr_company_dossier.html!")

# Compile to PDF using Edge - Output as BSR_Films_Business_Portfolio.pdf
res = subprocess.run([
    r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    r'--print-to-pdf=D:\Local Codebase\BSR Films\public\BSR_Films_Business_Portfolio.pdf',
    r'D:\Local Codebase\BSR Films\public\bsr_company_dossier.html'
], capture_output=True, text=True)

print("Edge PDF generation return code:", res.returncode)

doc = fitz.open('public/BSR_Films_Business_Portfolio.pdf')
print(f"Total Company PDF pages: {len(doc)}")
for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=150)
    out_path = f'public/business_pdf_page_{i+1}.png'
    pix.save(out_path)
    print(f"Saved {out_path} ({pix.width}x{pix.height})")
