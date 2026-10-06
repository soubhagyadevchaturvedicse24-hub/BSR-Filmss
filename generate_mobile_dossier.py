import base64
import os
import subprocess
import fitz

with open('public/team/bhishma.png', 'rb') as f:
    bhishma_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('public/bsr-icon.png', 'rb') as f:
    icon_b64 = base64.b64encode(f.read()).decode('utf-8')

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
  <title>भीष्मदेव चतुर्वेदी - आधिकारिक मोबाइल पोर्टफोलियो | BSR Films Raipur</title>
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

    /* Prominent Owner Header on Every Page */
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
      width: 34px;
      height: 34px;
      object-fit: contain;
    }}
    .header-owner-name {{
      font-size: 14.5pt;
      font-weight: 900;
      color: #0A0A0A;
      line-height: 1.1;
      letter-spacing: -0.2px;
    }}
    .header-owner-sub {{
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
      border-radius: 4px;
    }}

    /* Big Feature Banner with Large SVG Elements */
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
      color: #333333;
      line-height: 1.38;
      font-weight: 600;
    }}
    .big-banner-text strong {{
      color: #8C4E00;
      font-weight: 900;
      font-size: 9.8pt;
      display: block;
      margin-bottom: 2.5px;
    }}
  </style>
</head>
<body>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 1: OWNER COVER SCREEN + STATS + ADDRESS (PERFECTLY CENTERED & BALANCED)
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-owner-name">भीष्मदेव चतुर्वेदी</div>
          <div class="header-owner-sub">बी.एस.आर. फिल्म्स रायपुर • संस्थापक एवं निर्देशक</div>
        </div>
      </div>
      <div class="header-meta">
        आधिकारिक परिचय<br>
        मो: 7000866323
      </div>
    </div>

    <div class="page-body">
      <!-- 100% Horizontally Centered Founder Portrait with Overlapping Badge -->
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; margin: 1px 0 3px 0;">
        <div style="position: relative; display: flex; flex-direction: column; align-items: center; text-align: center;">
          <img src="data:image/png;base64,{bhishma_b64}" style="width: 122px; height: 145px; object-fit: cover; object-position: center 18%; border-radius: 12px; border: 2.5px solid #8C4E00; box-shadow: 0 4px 14px rgba(0,0,0,0.18); display: block;" alt="भीष्मदेव चतुर्वेदी">
          <div style="background: #8C4E00; color: #FFFFFF; font-size: 7.8pt; font-weight: 800; padding: 2.5px 12px; border-radius: 12px; margin-top: -10px; z-index: 2; box-shadow: 0 2px 6px rgba(0,0,0,0.2); white-space: nowrap;">
            संस्थापक एवं निर्देशक (Founder & Director)
          </div>
        </div>
      </div>

      <!-- Centered Owner Name -->
      <div style="text-align: center; margin: 1px 0;">
        <div style="font-size: 21pt; font-weight: 900; color: #0A0A0A; line-height: 1.1; letter-spacing: -0.3px;">
          भीष्मदेव चतुर्वेदी
        </div>
      </div>

      <!-- Centered/Clean Lineage Box -->
      <div style="background: #F8F4EC; border-left: 3.5px solid #8C4E00; padding: 4px 8px; border-radius: 0 6px 6px 0; margin-bottom: 3px;">
        <div style="font-size: 9.8pt; font-weight: 800; color: #0A0A0A;">
          पिता - स्व.श्री दीनानाथ चतुर्वेदी
        </div>
        <div style="font-size: 8pt; font-weight: 600; color: #333333; margin-top: 1.5px; line-height: 1.25;">
          ( स्वयं सेवक RSS, सेवा निवृत शिक्षक, रामायणविद, पूर्व मंडल अध्यक्ष भाजपा )
        </div>
      </div>

      <!-- Roles Pills Centered -->
      <div class="pill-wrap" style="justify-content: center; gap: 4px; margin-bottom: 4px;">
        <span class="pill">लेखक</span>
        <span class="pill">निर्देशक (डायरेक्टर)</span>
        <span class="pill">निर्माता (प्रोडयूसर)</span>
        <span class="pill">गीतकार</span>
        <span class="pill">कवि</span>
        <span class="pill">मंच संचालन</span>
        <span class="pill">समाजसेवा</span>
      </div>

      <!-- Section: Key Milestone Stats on Page 1 -->
      <div style="margin-bottom: 3px;">
        <div class="section-title" style="font-size: 11.2pt; margin-bottom: 3.5px; padding-bottom: 1.5px;">
          <span>प्रमुख सांख्यिकी एवं उपलब्धियां</span>
          <span class="section-sub">प्रमाणित मीडिया परिमाण</span>
        </div>

        <div class="grid-3" style="margin-bottom: 4px; gap: 4.5px;">
          <div class="stat-box" style="padding: 3.5px 3px;">
            <div class="stat-num" style="font-size: 14.5pt;">650+</div>
            <div class="stat-label" style="font-size: 7.8pt;">वीडियो स्पॉट्स</div>
            <div class="stat-sub" style="font-size: 6.2pt;">विज्ञापन व जनहित</div>
          </div>
          <div class="stat-box" style="padding: 3.5px 3px;">
            <div class="stat-num" style="font-size: 14.5pt;">350+</div>
            <div class="stat-label" style="font-size: 7.8pt;">डॉक्यूमेंट्री</div>
            <div class="stat-sub" style="font-size: 6.2pt;">वृत्तचित्र निर्माण</div>
          </div>
          <div class="stat-box" style="padding: 3.5px 3px;">
            <div class="stat-num" style="font-size: 14.5pt;">550+</div>
            <div class="stat-label" style="font-size: 7.8pt;">रेडियो कड़ियां</div>
            <div class="stat-sub" style="font-size: 6.2pt;">धारावाहिक एपिसोड्स</div>
          </div>
        </div>

        <div class="grid-3" style="gap: 4.5px;">
          <div class="stat-box" style="padding: 3.5px 3px;">
            <div class="stat-num" style="font-size: 14.5pt;">437+</div>
            <div class="stat-label" style="font-size: 7.8pt;">जिंगल व स्पॉट्स</div>
            <div class="stat-sub" style="font-size: 6.2pt;">रेडियो जिंगल निर्माण</div>
          </div>
          <div class="stat-box" style="padding: 3.5px 3px;">
            <div class="stat-num" style="font-size: 14.5pt;">12+</div>
            <div class="stat-label" style="font-size: 7.8pt;">3D एनिमेशन</div>
            <div class="stat-sub" style="font-size: 6.2pt;">एनिमेशन फिल्म्स</div>
          </div>
          <div class="stat-box" style="padding: 3.5px 3px;">
            <div class="stat-num" style="font-size: 14.5pt;">30+ वर्ष</div>
            <div class="stat-label" style="font-size: 7.8pt;">कंपियर</div>
            <div class="stat-sub" style="font-size: 6.2pt;">आकाशवाणी रायपुर</div>
          </div>
        </div>
      </div>

      <!-- Address Box Placed on Page 1 -->
      <div class="card card-highlight" style="padding: 6px 9px; margin-bottom: 0;">
        <div class="card-tag">कार्यालय एवं संपर्क विवरण</div>
        <div style="font-size: 8.5pt; color: #111111; line-height: 1.36; margin-top: 1.5px;">
          <strong>पता:</strong> राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 4920013 ( छ ग)<br>
          <strong>मोबाइल:</strong> <span style="font-size: 10.5pt; font-weight: 900; color: #0A0A0A;">7000866323, 9826167533</span><br>
          <strong>मेल:</strong> bsrfilms2017@gmail.com • <strong>Web:</strong> www.bsrfilms.com
        </div>
      </div>
    </div>

    <div class="footer">
      <div>बी.एस.आर. फिल्म्स रायपुर • <strong>भीष्मदेव चतुर्वेदी</strong></div>
      <div>1 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 2: STUDIES (शिक्षा) & LEADERSHIP (दायित्व) + HERITAGE (UNCLUTTERED!)
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-owner-name">भीष्मदेव चतुर्वेदी</div>
          <div class="header-owner-sub">शिक्षा एवं संगठनात्मक दायित्व</div>
        </div>
      </div>
      <div class="header-meta">
        शैक्षणिक योग्यता<br>
        एवं नेतृत्व
      </div>
    </div>

    <div class="page-body">
      <!-- Section: Studies (शिक्षा) with Spacious Cards -->
      <div>
        <div class="section-title">
          <span>शिक्षा</span>
          <span class="section-sub">डिग्री, पत्रकारिता, लोक संगीत व वाणी दीक्षा</span>
        </div>

        <div class="grid-2" style="gap: 8px; margin-bottom: 8px;">
          <div class="card" style="padding: 10px 11px; margin-bottom: 0;">
            <div class="card-tag">स्नातकोत्तर डिग्री</div>
            <div class="card-title-bold" style="font-size: 10.5pt;">शिक्षा - एम.ए.राजनीति शास्त्र</div>
          </div>

          <div class="card" style="padding: 10px 11px; margin-bottom: 0;">
            <div class="card-tag">पत्रकारिता स्नातक</div>
            <div class="card-title-bold" style="font-size: 10.5pt;">बी जे एमसी ( पं. रविशंकर विश्वविद्यालय रायपुर)</div>
          </div>
        </div>

        <div class="grid-2" style="gap: 8px; margin-bottom: 0;">
          <div class="card" style="padding: 10px 11px; margin-bottom: 0;">
            <div class="card-tag">संगीत दीक्षा</div>
            <div class="card-title-bold" style="font-size: 10.5pt;">डिप्लोमा इन लोक संगीत ( इंदिरा कला संगीत विश्वविद्यालय खैरागढ़)</div>
          </div>

          <div class="card" style="padding: 10px 11px; margin-bottom: 0;">
            <div class="card-tag">प्रसारण प्रमाणन</div>
            <div class="card-title-bold" style="font-size: 10.5pt;">वाणी कोर्स ( प्रसार भारती )</div>
          </div>
        </div>
      </div>

      <!-- Section: Organizational Leadership with Spacious Cards -->
      <div>
        <div class="section-title">
          <span>संगठनात्मक दायित्व, संस्कृति एवं संस्कार</span>
        </div>

        <div class="card" style="padding: 11px 13px; margin-bottom: 8.5px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span class="card-tag">सिने संघ नेतृत्व</span>
            <span class="card-badge">संस्थापक सदस्य</span>
          </div>
          <div class="card-title-bold" style="font-size: 11.2pt; margin-top: 3px;">
            CCTPA ( Chhattisgarh Cine And Television Producers Association ) का फाउंडर सदस्य
          </div>
        </div>

        <div class="card" style="padding: 11px 13px; margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span class="card-tag">मंदिर प्रबंध समिति</span>
            <span class="card-badge">अध्यक्ष</span>
          </div>
          <div class="card-title-bold" style="font-size: 11.2pt; margin-top: 3px;">
            विद्यार्थी परिषद द्वारा निर्मित भगवान शिव मंदिर समिति &quot; प्रबंध समिति कैलाश धाम &quot; भरदा का अध्यक्ष
          </div>
        </div>
      </div>

      <!-- Big Crest Feature Banner -->
      <div class="big-banner" style="padding: 11px 14px; gap: 14px;">
        <div class="big-banner-icon">{svg_crest_big}</div>
        <div class="big-banner-text">
          <strong>शैक्षणिक गरिमा एवं सांस्कृतिक निष्ठा:</strong>
          राजनीति शास्त्र में स्नातकोत्तर, पत्रकारिता (BJMC), खैरागढ़ विश्वविद्यालय से शास्त्रीय लोक संगीत दीक्षा एवं प्रसार भारती से वाणी प्रमाणन का दुर्लभ व प्रतिष्ठित समन्वय।
        </div>
      </div>
    </div>

    <div class="footer">
      <div>बी.एस.आर. फिल्म्स रायपुर • <strong>भीष्मदेव चतुर्वेदी</strong></div>
      <div>2 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 3: FIRM - BSR FILMS RAIPUR (UNCLUTTERED & SPACIOUS)
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-owner-name">भीष्मदेव चतुर्वेदी</div>
          <div class="header-owner-sub">बी.एस.आर. फिल्म्स रायपुर • संस्थागत पंजीयन</div>
        </div>
      </div>
      <div class="header-meta">
        स्थापना सन् 2000<br>
        NFDC & संवाद
      </div>
    </div>

    <div class="page-body">
      <div>
        <div class="section-title">
          <span>फर्म - बी.एस.आर.फिल्मस रायपुर</span>
          <span class="section-sub">2000 से निरंतर आज पर्यंत कार्यशील</span>
        </div>

        <div class="card" style="padding: 9px 12px; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span class="card-tag">राज्य शासन मान्यता</span>
            <span class="card-badge">श्रेणी &apos;ब&apos;</span>
          </div>
          <div class="card-title-bold">छत्तीसगढ़ संवाद से &quot; ब &quot; श्रेणी में इम्पेनल्ड</div>
          <div class="card-desc">( छत्तीसगढ़ संवाद में 2008 से आज पर्यंत ऑडियो वीडियो निर्माण हेतु पंजीकृत फर्म )</div>
        </div>

        <div class="card" style="padding: 9px 12px; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span class="card-tag">राष्ट्रीय अनुसूचित संस्था</span>
            <span class="card-badge">भारत सरकार</span>
          </div>
          <div class="card-title-bold">NFDC ( नेशनल फिल्म डेवलपमेंट कार्पोरेशन, नई दिल्ली) में अनुसूचित (एनलिस्टेड)</div>
          <div class="card-desc">राष्ट्रीय स्तर के वृत्तचित्र, विज्ञापन व सिनेमा निर्माण हेतु आधिकारिक रूप से सूचीबद्ध।</div>
        </div>

        <div class="card" style="padding: 9px 12px; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span class="card-tag">केंद्रीय प्रसारण पंजीयन</span>
            <span class="card-badge">प्रसार भारती</span>
          </div>
          <div class="card-title-bold">प्रसार भारती के केंद्रीय विक्रय एकांश में पंजीकृत एजेंसी</div>
          <div class="card-desc">दूरदर्शन एवं आकाशवाणी नेटवर्क पर राष्ट्रीय प्रसारण हेतु अधिकृत एजेंसी।</div>
        </div>

        <div class="card" style="padding: 9px 12px; margin-bottom: 0;">
          <div class="card-tag">कार्यक्षेत्र भाषाएं एवं बोलियां</div>
          <div class="card-title-bold" style="font-size: 9.6pt; margin-top: 2px;">
            हिंदी, छत्तीसगढ़ी, गोंडी, हल्बी, सरगुजिहा और अंग्रेजी भाषा/बोलियों में कार्य
          </div>
          <div class="pill-wrap" style="margin-top: 4px; gap: 5px;">
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
          छत्तीसगढ़ संवाद ('ब' श्रेणी), NFDC एवं प्रसार भारती से मान्यता प्राप्त। 6 प्रमुख भाषाओं व बोलियों में 650+ विज्ञापन स्पॉट्स एवं 350+ वृत्तचित्रों के निर्माण का ऐतिहासिक कीर्तिमान।
        </div>
      </div>
    </div>

    <div class="footer">
      <div>बी.एस.आर. फिल्म्स रायपुर • <strong>भीष्मदेव चतुर्वेदी</strong></div>
      <div>3 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 4: ALL INDIA RADIO (AIR RAIPUR) (BALANCED & SPACIOUS)
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-owner-name">भीष्मदेव चतुर्वेदी</div>
          <div class="header-owner-sub">आकाशवाणी रायपुर प्रसारण विरासत</div>
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

        <!-- 2-Column Grid for Features & Plays (Saves Vertical Clutter!) -->
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
          तीन दशकों तक आकाशवाणी रायपुर के सर्वाधिक लोकप्रिय कार्यक्रमों 'चौपाल' व 'श्रमिक जगत' की पहचान। 50 रूपक, 10 नाटक एवं 6 धारावाहिकों का सफल निर्माण।
        </div>
      </div>
    </div>

    <div class="footer">
      <div>बी.एस.आर. फिल्म्स रायपुर • <strong>भीष्मदेव चतुर्वेदी</strong></div>
      <div>4 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 5: DOORDARSHAN KENDRA RAIPUR (UNCLUTTERED & SPACIOUS)
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-owner-name">भीष्मदेव चतुर्वेदी</div>
          <div class="header-owner-sub">दूरदर्शन केंद्र रायपुर कृतित्व एवं एंकरिंग</div>
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
          छत्तीसगढ़ के टेलीविजन इतिहास के प्रथम वीडियो स्पॉट से लेकर 'परिक्रमा', 'हमर गांव' व 'कृषि दर्शन' जैसे प्रमुख कार्यक्रमों के मुख्य संचालक एवं 15 टेलीफिल्म्स के निर्देशक।
        </div>
      </div>
    </div>

    <div class="footer">
      <div>बी.एस.आर. फिल्म्स रायपुर • <strong>भीष्मदेव चतुर्वेदी</strong></div>
      <div>5 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 6: HISTORIC CAMPAIGNS & GLOBAL MISSIONS (SPACIOUS)
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-owner-name">भीष्मदेव चतुर्वेदी</div>
          <div class="header-owner-sub">ऐतिहासिक चुनाव व सामाजिक अभियान</div>
        </div>
      </div>
      <div class="header-meta">
        राष्ट्रीय अभियान<br>
        UNICEF / World Bank
      </div>
    </div>

    <div class="page-body">
      <div>
        <div class="section-title">
          <span>अनुभव — ऐतिहासिक चुनावी व सामाजिक अभियान</span>
          <span class="section-sub">राज्य व राष्ट्रीय स्तर के अभियान</span>
        </div>

        <div class="card" style="padding: 9.5px 12px; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span class="card-tag">विधान सभा चुनाव 2013</span>
            <span class="card-badge">06 आकाशवाणी केंद्र</span>
          </div>
          <div class="card-desc" style="font-size: 9.2pt; color: #111111; font-weight: 600; margin-top: 2px;">
            विधान सभा चुनाव सन् 2013 में रेडियो के माध्यम से प्रदेश के 06 आकाशवाणी केन्द्रों से भारतीय जनता पार्टी के चुनाव प्रचार हेतु रेडियो जिंगल निर्माण व प्रसारण हेतु अनुबंधित एजेंसी ।
          </div>
        </div>

        <div class="card" style="padding: 9.5px 12px; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span class="card-tag">लोक सभा चुनाव 2014</span>
            <span class="card-badge">06 आकाशवाणी केंद्र</span>
          </div>
          <div class="card-desc" style="font-size: 9.2pt; color: #111111; font-weight: 600; margin-top: 2px;">
            लोक सभा चुनाव सन् 2014 में रेडियो के माध्यम से प्रदेश के 06 आकाशवाणी केन्द्रों से भारतीय जनता पार्टी के चुनाव प्रचार हेतु रेडियो जिंगल निर्माण व प्रसारण हेतु अनुबंधित एजेंसी ।
          </div>
        </div>

        <div class="card" style="padding: 9.5px 12px; margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span class="card-tag">सामाजिक अभियान</span>
            <span class="card-badge">जन जागरूकता</span>
          </div>
          <div class="card-desc" style="font-size: 9.2pt; color: #111111; font-weight: 600; margin-top: 2px;">
            विभिन्न एनजीओ के साथ प्रचार - प्रसार फिल्म और रेडियो कार्यक्रम निर्माण का अनुभव। जन जागरूकता यात्रा में संयोजन।
          </div>
        </div>

        <div class="grid-2" style="gap: 8px; margin-bottom: 0;">
          <div class="card" style="padding: 9px 10px; margin-bottom: 0;">
            <div class="card-tag">यूनिसेफ (UNICEF)</div>
            <div class="card-title-bold" style="font-size: 9.8pt; color: #8C4E00; margin-top: 2px;">
              यूनिसेफ के लिए वीडियो स्पॉट निर्माण
            </div>
          </div>

          <div class="card" style="padding: 9px 10px; margin-bottom: 0;">
            <div class="card-tag">वर्ल्ड बैंक (WORLD BANK)</div>
            <div class="card-title-bold" style="font-size: 9.8pt; color: #8C4E00; margin-top: 2px;">
              वर्ल्ड बैंक योजनाओं हेतु फिल्म व रेडियो सीरियल निर्माण
            </div>
          </div>
        </div>
      </div>

      <!-- Big Campaign Shield Banner -->
      <div class="big-banner" style="padding: 10px 13px; gap: 14px;">
        <div class="big-banner-icon">{svg_award_big}</div>
        <div class="big-banner-text">
          <strong>राष्ट्रीय एवं वैश्विक अभियानों का सशक्त संचार:</strong>
          2013 विधानसभा एवं 2014 लोकसभा चुनावों में 6 आकाशवाणी केंद्रों से व्यापक चुनावी प्रचार, तथा UNICEF एवं World Bank की जनहितकारी योजनाओं का व्यापक प्रसारण।
        </div>
      </div>
    </div>

    <div class="footer">
      <div>बी.एस.आर. फिल्म्स रायपुर • <strong>भीष्मदेव चतुर्वेदी</strong></div>
      <div>6 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 7: OFFICIAL CONTACT & AUTHORIZED SIGN-OFF (SPACIOUS & REGAL)
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
        <div>
          <div class="header-owner-name">भीष्मदेव चतुर्वेदी</div>
          <div class="header-owner-sub">आधिकारिक संपर्क एवं कार्यालय विवरण</div>
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
          <span>आधिकारिक संपर्क एवं स्टूडियो कार्यालय</span>
          <span class="section-sub">राजधानी रायपुर (छ.ग.)</span>
        </div>

        <div class="card card-highlight" style="padding: 12px 14px; margin-bottom: 9px;">
          <div style="font-size: 9.6pt; line-height: 1.52; color: #111111;">
            <p style="margin-bottom: 7px;">
              <strong style="color: #8C4E00; font-size: 9.2pt;">स्थाई कार्यालय पता:</strong><br>
              राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 4920013 ( छ ग)
            </p>
            <p style="margin-bottom: 7px;">
              <strong style="color: #8C4E00; font-size: 9.2pt;">दूरभाष / मोबाइल संपर्क:</strong><br>
              <span style="font-size: 13pt; font-weight: 900; color: #0A0A0A;">7000866323, 9826167533</span>
            </p>
            <p style="margin-bottom: 7px;">
              <strong style="color: #8C4E00; font-size: 9.2pt;">आधिकारिक ईमेल:</strong><br>
              <span style="font-size: 11pt; font-weight: 800; color: #0A0A0A;">bsrfilms2017@gmail.com</span>
            </p>
            <p>
              <strong style="color: #8C4E00; font-size: 9.2pt;">आधिकारिक वेबसाइट:</strong><br>
              <span style="font-size: 11pt; font-weight: 800; color: #0A0A0A;">www.bsrfilms.com</span>
            </p>
          </div>
        </div>

        <div class="card" style="padding: 11px 13px; margin-bottom: 0;">
          <div class="card-tag">आजीवन सांस्कृतिक संकल्प</div>
          <div style="font-size: 9.8pt; color: #0A0A0A; font-weight: 700; line-height: 1.42; margin-top: 3px;">
            भारतीय कला, संस्कृति, साहित्य, अध्यात्म, राजनीति में विशेष रुचि। छत्तीसगढ़ी भाषा , लोक कला, संस्कृति, संस्कार का आजीवन विद्यार्थी।
          </div>
        </div>
      </div>

      <!-- Big Royal Executive Seal Stamp & Signature Banner -->
      <div style="display: flex; align-items: center; justify-content: space-between; background: #FFFDF8; border: 1.8px solid #D5A04A; border-radius: 9px; padding: 11px 14px;">
        <div style="flex-shrink: 0; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
          {svg_seal_big}
        </div>
        <div style="text-align: right; flex: 1; padding-left: 14px;">
          <div style="font-size: 8.2pt; color: #555555; margin-bottom: 4px;">
            प्रमाणित: परिचय संचिका में अंकित समस्त विवरण अधिकृत अभिलेखों एवं अनुबंधों पर आधारित हैं।
          </div>
          <div style="font-size: 14.5pt; font-weight: 900; color: #8C4E00; line-height: 1.15;">
            ( भीष्मदेव चतुर्वेदी )
          </div>
          <div style="font-size: 10pt; font-weight: 800; color: #111111; margin-top: 2.5px;">
            संस्थापक एवं निर्देशक • बी.एस.आर. फिल्म्स रायपुर
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div>बी.एस.आर. फिल्म्स रायपुर • <strong>भीष्मदेव चतुर्वेदी</strong></div>
      <div>7 / 7</div>
    </div>
  </div>

</body>
</html>
"""

with open('public/founder_mobile_dossier.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Saved public/founder_mobile_dossier.html!")

# Compile to PDF using Edge
res = subprocess.run([
    r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    r'--print-to-pdf=D:\Local Codebase\BSR Films\public\Bhishmdev_Chaturvedi_Portfolio.pdf',
    r'D:\Local Codebase\BSR Films\public\founder_mobile_dossier.html'
], capture_output=True, text=True)

print("Edge PDF generation return code:", res.returncode)

doc = fitz.open('public/Bhishmdev_Chaturvedi_Portfolio.pdf')
print(f"Total PDF pages: {len(doc)}")
for i, page in enumerate(doc):
    pix = page.get_pixmap(dpi=150)
    out_path = f'public/mobile_pdf_page_{i+1}.png'
    pix.save(out_path)
    print(f"Saved {out_path} ({pix.width}x{pix.height})")
