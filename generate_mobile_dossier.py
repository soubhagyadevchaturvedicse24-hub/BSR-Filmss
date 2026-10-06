import base64
import os

with open('public/team/bhishma.png', 'rb') as f:
    bhishma_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('public/bsr-icon.png', 'rb') as f:
    icon_b64 = base64.b64encode(f.read()).decode('utf-8')

# High quality SVG decorative badges
svg_camera = """<svg width="42" height="42" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="6" y="14" width="24" height="22" rx="4" fill="#FAF2E3" stroke="#8C4E00" stroke-width="2.5"/>
  <circle cx="18" cy="25" r="5.5" stroke="#8C4E00" stroke-width="2.2" fill="#FFFFFF"/>
  <circle cx="18" cy="25" r="2.5" fill="#8C4E00"/>
  <path d="M30 20L40 13V35L30 28V20Z" fill="#FAF2E3" stroke="#8C4E00" stroke-width="2.5" stroke-linejoin="round"/>
  <circle cx="11" cy="9" r="4.5" fill="#FAF2E3" stroke="#8C4E00" stroke-width="2"/>
  <circle cx="23" cy="9" r="4.5" fill="#FAF2E3" stroke="#8C4E00" stroke-width="2"/>
</svg>"""

svg_mic = """<svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="18" y="6" width="12" height="22" rx="6" fill="#FAF2E3" stroke="#8C4E00" stroke-width="2.5"/>
  <line x1="22" y1="12" x2="26" y2="12" stroke="#8C4E00" stroke-width="2"/>
  <line x1="22" y1="17" x2="26" y2="17" stroke="#8C4E00" stroke-width="2"/>
  <line x1="22" y1="22" x2="26" y2="22" stroke="#8C4E00" stroke-width="2"/>
  <path d="M12 20C12 26.6274 17.3726 32 24 32C30.6274 32 36 26.6274 36 20" stroke="#8C4E00" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="24" y1="32" x2="24" y2="40" stroke="#8C4E00" stroke-width="2.5"/>
  <line x1="16" y1="40" x2="32" y2="40" stroke="#8C4E00" stroke-width="2.5" stroke-linecap="round"/>
</svg>"""

svg_award = """<svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="24" cy="18" r="12" fill="#FAF2E3" stroke="#8C4E00" stroke-width="2.5"/>
  <circle cx="24" cy="18" r="6" stroke="#8C4E00" stroke-width="1.8" fill="#FFFDF8"/>
  <path d="M18 28L14 42L24 37L34 42L30 28" fill="#FAF2E3" stroke="#8C4E00" stroke-width="2.2" stroke-linejoin="round"/>
</svg>"""

svg_tv = """<svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="6" y="14" width="36" height="24" rx="4" fill="#FAF2E3" stroke="#8C4E00" stroke-width="2.5"/>
  <rect x="10" y="18" width="22" height="16" rx="2" fill="#FFFFFF" stroke="#8C4E00" stroke-width="1.8"/>
  <circle cx="37" cy="22" r="2" fill="#8C4E00"/>
  <circle cx="37" cy="28" r="2" fill="#8C4E00"/>
  <path d="M16 8L24 14L32 8" stroke="#8C4E00" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>"""

mobile_html = f"""<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>भीष्मदेव चतुर्वेदी - आधिकारिक मोबाइल पोर्टफोलियो | BSR Films Raipur</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800;900&family=Rozha+One&display=swap" rel="stylesheet">
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
      line-height: 1.35;
      font-size: 10pt;
    }}
    .page {{
      width: 108mm;
      min-height: 196mm;
      height: 196mm;
      max-height: 196mm;
      margin: 0 auto;
      background: #FFFFFF;
      padding: 4.5mm 6mm 4mm 6mm;
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

    /* Prominent Owner Header on Every Page */
    .header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #8C4E00;
      padding-bottom: 3.5px;
      margin-bottom: 4px;
    }}
    .header-left {{
      display: flex;
      align-items: center;
      gap: 7px;
    }}
    .header-logo {{
      width: 32px;
      height: 32px;
      object-fit: contain;
    }}
    .header-owner-name {{
      font-size: 13.5pt;
      font-weight: 900;
      color: #0A0A0A;
      line-height: 1.1;
      letter-spacing: -0.2px;
    }}
    .header-owner-sub {{
      font-size: 6.8pt;
      font-weight: 800;
      color: #8C4E00;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }}
    .header-meta {{
      text-align: right;
      font-size: 7.2pt;
      color: #333333;
      font-weight: 700;
      line-height: 1.25;
    }}

    /* Compact Mobile Footer */
    .footer {{
      border-top: 1.2px solid #D5A04A;
      padding-top: 2.5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 7.2pt;
      color: #444444;
      font-weight: 700;
      margin-top: 2px;
    }}
    .footer strong {{
      color: #8C4E00;
    }}

    /* Section Titles */
    .section-title {{
      font-size: 11.5pt;
      font-weight: 900;
      color: #0A0A0A;
      border-bottom: 1.5px solid #8C4E00;
      padding-bottom: 2px;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }}
    .section-sub {{
      font-size: 7.2pt;
      font-weight: 800;
      color: #8C4E00;
    }}

    /* Cards */
    .card {{
      background: #FDFBF7;
      border: 1.2px solid #D8CDB8;
      border-radius: 6px;
      padding: 4.5px 7px;
      margin-bottom: 3.5px;
    }}
    .card-highlight {{
      background: #FFFDF8;
      border: 1.5px solid #8C4E00;
    }}
    .card-tag {{
      font-size: 7pt;
      font-weight: 800;
      color: #8C4E00;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }}
    .card-badge {{
      background: #FAF2E3;
      border: 1px solid #C89038;
      color: #663300;
      font-size: 6.8pt;
      font-weight: 800;
      padding: 1px 5px;
      border-radius: 3px;
    }}
    .card-title-bold {{
      font-size: 10pt;
      font-weight: 800;
      color: #0A0A0A;
      line-height: 1.28;
      margin-top: 1px;
    }}
    .card-desc {{
      font-size: 8.5pt;
      font-weight: 500;
      color: #2D2822;
      line-height: 1.34;
      margin-top: 1.5px;
    }}

    /* Grid Layouts for Mobile */
    .grid-2 {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4.5px;
      margin-bottom: 3.5px;
    }}
    .grid-3 {{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 4px;
      margin-bottom: 3.5px;
    }}
    .stat-box {{
      background: #FDFBF7;
      border: 1.2px solid #D5A04A;
      border-radius: 6px;
      padding: 4px 5px;
      text-align: center;
    }}
    .stat-num {{
      font-size: 15.5pt;
      font-weight: 900;
      color: #8C4E00;
      line-height: 1.1;
    }}
    .stat-label {{
      font-size: 8.5pt;
      font-weight: 800;
      color: #0A0A0A;
      margin-top: 1px;
    }}
    .stat-sub {{
      font-size: 6.5pt;
      color: #555555;
      font-weight: 500;
      line-height: 1.18;
    }}

    /* Pills */
    .pill-wrap {{
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
      margin: 2.5px 0;
    }}
    .pill {{
      background: #FAF2E3;
      border: 1px solid #C89038;
      color: #5A2D00;
      font-size: 7.8pt;
      font-weight: 800;
      padding: 1.8px 6.5px;
      border-radius: 4px;
    }}

    /* Decorative Feature Box for Visual Richness */
    .deco-box {{
      display: flex;
      align-items: center;
      gap: 9px;
      background: #FFFDF8;
      border: 1px dashed #D5A04A;
      border-radius: 6px;
      padding: 5px 8px;
      margin-top: 3px;
    }}
    .deco-text {{
      font-size: 7.8pt;
      color: #444444;
      line-height: 1.3;
      font-weight: 600;
    }}
    .deco-text strong {{
      color: #8C4E00;
      font-weight: 800;
    }}
  </style>
</head>
<body>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 1: OWNER COVER SCREEN + ADDRESS BOX (NO GAP!)
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-left">
          <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
          <div>
            <div class="header-owner-name">भीष्मदेव चतुर्वेदी</div>
            <div class="header-sub">बी.एस.आर. फिल्म्स रायपुर • संस्थापक एवं निर्देशक</div>
          </div>
        </div>
        <div class="header-meta">
          आधिकारिक परिचय<br>
          मो: 7000866323
        </div>
      </div>

      <!-- Significantly Larger Photo of Founder -->
      <div style="text-align: center; margin: 3px 0 5px 0;">
        <div style="display: inline-block; position: relative;">
          <img src="data:image/png;base64,{bhishma_b64}" style="width: 130px; height: 160px; object-fit: cover; object-position: top center; border-radius: 12px; border: 2.5px solid #8C4E00; box-shadow: 0 5px 14px rgba(0,0,0,0.18); display: block;" alt="भीष्मदेव चतुर्वेदी">
          <div style="background: #8C4E00; color: #FFFFFF; font-size: 7.8pt; font-weight: 800; padding: 2.5px 10px; border-radius: 12px; margin-top: 3.5px; display: inline-block; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
            संस्थापक एवं निर्देशक (Founder & Director)
          </div>
        </div>
      </div>

      <!-- Large Prominent Owner Name -->
      <div style="text-align: center; margin-bottom: 3px;">
        <div style="font-size: 21pt; font-weight: 900; color: #0A0A0A; line-height: 1.1; letter-spacing: -0.3px;">
          भीष्मदेव चतुर्वेदी
        </div>
      </div>

      <!-- Lineage Box -->
      <div style="background: #F8F4EC; border-left: 3.5px solid #8C4E00; padding: 4.5px 7px; border-radius: 0 6px 6px 0; margin-bottom: 4px;">
        <div style="font-size: 10pt; font-weight: 800; color: #0A0A0A;">
          पिता - स्व.श्री दीनानाथ चतुर्वेदी
        </div>
        <div style="font-size: 8pt; font-weight: 600; color: #333333; margin-top: 1px; line-height: 1.25;">
          ( स्वयं सेवक RSS, सेवा निवृत शिक्षक, रामायणविद, पूर्व मंडल अध्यक्ष भाजपा )
        </div>
      </div>

      <!-- Roles Pills -->
      <div class="pill-wrap" style="justify-content: center; margin-bottom: 4px;">
        <span class="pill">लेखक</span>
        <span class="pill">निर्देशक (डायरेक्टर)</span>
        <span class="pill">निर्माता (प्रोडयूसर)</span>
        <span class="pill">गीतकार</span>
        <span class="pill">कवि</span>
        <span class="pill">मंच संचालन</span>
        <span class="pill">समाजसेवा</span>
      </div>

      <!-- Address Box Placed on Page 1 (Completely Filling the Old Gap!) -->
      <div class="card card-highlight" style="padding: 5px 7.5px; margin-top: 2px;">
        <div class="card-tag">कार्यालय एवं संपर्क विवरण</div>
        <div style="font-size: 8.2pt; color: #111111; line-height: 1.36; margin-top: 1.5px;">
          <strong>पता:</strong> राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 4920013 ( छ ग)<br>
          <strong>मोबाइल:</strong> <span style="font-size: 10pt; font-weight: 900; color: #0A0A0A;">7000866323, 9826167533</span><br>
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
       MOBILE PAGE 2: STUDIES (शिक्षा) & LEADERSHIP (दायित्व) + STATS
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-left">
          <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
          <div>
            <div class="header-owner-name">भीष्मदेव चतुर्वेदी</div>
            <div class="header-sub">शिक्षा, सांख्यिकी एवं संगठनात्मक दायित्व</div>
          </div>
        </div>
        <div class="header-meta">
          शैक्षणिक योग्यता<br>
          एवं नेतृत्व
        </div>
      </div>

      <!-- Section: Studies (शिक्षा) Moved Directly Here as Requested -->
      <div class="section-title">
        <span>शिक्षा</span>
        <span class="section-sub">डिग्री, पत्रकारिता, लोक संगीत व वाणी दीक्षा</span>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-tag">स्नातकोत्तर डिग्री</div>
          <div class="card-title-bold">शिक्षा - एम.ए.राजनीति शास्त्र</div>
        </div>

        <div class="card">
          <div class="card-tag">पत्रकारिता स्नातक</div>
          <div class="card-title-bold">बी जे एमसी ( पं. रविशंकर विश्वविद्यालय रायपुर)</div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-tag">संगीत दीक्षा</div>
          <div class="card-title-bold">डिप्लोमा इन लोक संगीत ( इंदिरा कला संगीत विश्वविद्यालय खैरागढ़)</div>
        </div>

        <div class="card">
          <div class="card-tag">प्रसारण प्रमाणन</div>
          <div class="card-title-bold">वाणी कोर्स ( प्रसार भारती )</div>
        </div>
      </div>

      <!-- Section: Updated Milestone Stats with Exact Numbers -->
      <div class="section-title" style="margin-top: 3px;">
        <span>प्रमुख सांख्यिकी एवं उपलब्धियां</span>
        <span class="section-sub">प्रमाणित मीडिया परिमाण</span>
      </div>

      <div class="grid-3">
        <div class="stat-box">
          <div class="stat-num">650+</div>
          <div class="stat-label">वीडियो स्पॉट्स</div>
          <div class="stat-sub">विज्ञापन व जनहित संदेश</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">350+</div>
          <div class="stat-label">डॉक्यूमेंट्री</div>
          <div class="stat-sub">वृत्तचित्र व लघु फिल्में</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">550+</div>
          <div class="stat-label">रेडियो कड़ियां</div>
          <div class="stat-sub">धारावाहिक एपिसोड्स</div>
        </div>
      </div>

      <div class="grid-3">
        <div class="stat-box">
          <div class="stat-num">437+</div>
          <div class="stat-label">जिंगल व स्पॉट्स</div>
          <div class="stat-sub">रेडियो जिंगल / स्पॉट्स</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">12+</div>
          <div class="stat-label">3D एनिमेशन</div>
          <div class="stat-sub">एनिमेशन फिल्म निर्माण</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">30+ वर्ष</div>
          <div class="stat-label">कंपियर</div>
          <div class="stat-sub">आकाशवाणी चौपाल/श्रमिक</div>
        </div>
      </div>

      <!-- Section: Organizational Leadership -->
      <div class="section-title" style="margin-top: 3px;">
        <span>संगठनात्मक दायित्व, संस्कृति एवं संस्कार</span>
      </div>

      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="card-tag">सिने संघ नेतृत्व</span>
          <span class="card-badge">संस्थापक सदस्य</span>
        </div>
        <div class="card-title-bold">CCTPA ( Chhattisgarh Cine And Television Producers Association ) का फाउंडर सदस्य</div>
      </div>

      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="card-tag">मंदिर प्रबंध समिति</span>
          <span class="card-badge">अध्यक्ष</span>
        </div>
        <div class="card-title-bold">विद्यार्थी परिषद द्वारा निर्मित भगवान शिव मंदिर समिति &quot; प्रबंध समिति कैलाश धाम &quot; भरदा का अध्यक्ष</div>
      </div>
    </div>

    <div class="footer">
      <div>बी.एस.आर. फिल्म्स रायपुर • <strong>भीष्मदेव चतुर्वेदी</strong></div>
      <div>2 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 3: FIRM - BSR FILMS RAIPUR
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-left">
          <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
          <div>
            <div class="header-owner-name">भीष्मदेव चतुर्वेदी</div>
            <div class="header-sub">बी.एस.आर. फिल्म्स रायपुर • संस्थागत पंजीयन</div>
          </div>
        </div>
        <div class="header-meta">
          स्थापना सन् 2000<br>
          NFDC & संवाद
        </div>
      </div>

      <div class="section-title">
        <span>फर्म - बी.एस.आर.फिल्मस रायपुर</span>
        <span class="section-sub">2000 से निरंतर आज पर्यंत कार्यशील</span>
      </div>

      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="card-tag">राज्य शासन मान्यता</span>
          <span class="card-badge">श्रेणी &apos;ब&apos;</span>
        </div>
        <div class="card-title-bold">छत्तीसगढ़ संवाद से &quot; ब &quot; श्रेणी में इम्पेनल्ड</div>
        <div class="card-desc">( छत्तीसगढ़ संवाद में 2008 से आज पर्यंत ऑडियो वीडियो निर्माण हेतु पंजीकृत फर्म )</div>
      </div>

      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="card-tag">राष्ट्रीय अनुसूचित संस्था</span>
          <span class="card-badge">भारत सरकार</span>
        </div>
        <div class="card-title-bold">NFDC ( नेशनल फिल्म डेवलपमेंट कार्पोरेशन, नई दिल्ली) में अनुसूचित (एनलिस्टेड)</div>
        <div class="card-desc">राष्ट्रीय स्तर के वृत्तचित्र, विज्ञापन व सिनेमा निर्माण हेतु आधिकारिक रूप से सूचीबद्ध।</div>
      </div>

      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="card-tag">केंद्रीय प्रसारण पंजीयन</span>
          <span class="card-badge">प्रसार भारती</span>
        </div>
        <div class="card-title-bold">प्रसार भारती के केंद्रीय विक्रय एकांश में पंजीकृत एजेंसी</div>
        <div class="card-desc">दूरदर्शन एवं आकाशवाणी नेटवर्क पर राष्ट्रीय प्रसारण हेतु अधिकृत एजेंसी।</div>
      </div>

      <div class="card">
        <div class="card-tag">कार्यक्षेत्र भाषाएं एवं बोलियां</div>
        <div class="card-title-bold" style="font-size: 8.8pt; margin-top: 1.5px;">
          हिंदी, छत्तीसगढ़ी, गोंडी, हल्बी, सरगुजिहा और अंग्रेजी भाषा/बोलियों में कार्य
        </div>
        <div class="pill-wrap" style="margin-top: 3px;">
          <span class="pill">हिंदी</span>
          <span class="pill">छत्तीसगढ़ी</span>
          <span class="pill">गोंडी</span>
          <span class="pill">हल्बी</span>
          <span class="pill">सरगुजिहा</span>
          <span class="pill">अंग्रेजी</span>
        </div>
      </div>

      <!-- Decorative Cinema Camera Feature Box Filling Any Gap -->
      <div class="deco-box">
        {svg_camera}
        <div class="deco-text">
          <strong>बी.एस.आर. फिल्म्स:</strong> राज्य एवं राष्ट्रीय स्तर पर पिछले 25+ वर्षों से उच्च-गुणवत्ता ऑडियो-वीडियो निर्माण, वृत्तचित्र एवं सामाजिक संदेशों के निर्माण में अग्रणी संस्था।
        </div>
      </div>
    </div>

    <div class="footer">
      <div>बी.एस.आर. फिल्म्स रायपुर • <strong>भीष्मदेव चतुर्वेदी</strong></div>
      <div>3 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 4: ALL INDIA RADIO (AIR RAIPUR)
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-left">
          <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
          <div>
            <div class="header-owner-name">भीष्मदेव चतुर्वेदी</div>
            <div class="header-sub">आकाशवाणी रायपुर प्रसारण विरासत</div>
          </div>
        </div>
        <div class="header-meta">
          30+ वर्ष अनुभव<br>
          AIR Raipur
        </div>
      </div>

      <div class="section-title">
        <span>अनुभव — आकाशवाणी रायपुर</span>
        <span class="section-sub">तीन दशकों की रेडियो प्रसारण यात्रा</span>
      </div>

      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="card-tag">उद्घोषणा व संचालन</span>
          <span class="card-badge">लगभग 30 वर्ष</span>
        </div>
        <div class="card-title-bold">नैमेत्तिक कंपियर - ( लगभग 30 वर्ष )</div>
        <div class="card-desc">(आकाशवाणी रायपुर में चौपाल और श्रमिक जगत कार्यक्रम में अनुबंधित)</div>
      </div>

      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="card-tag">नाट्य कलाकार</span>
          <span class="card-badge">बी हाइग्रेड</span>
        </div>
        <div class="card-title-bold">आकाशवाणी रायपुर से नाटक में &quot; बी हाइग्रेड &quot; कलाकार</div>
        <div class="card-desc">प्रसार भारती द्वारा आधिकारिक रूप से वर्गीकृत उच्च कोटि के नाट्य अभिनेता।</div>
      </div>

      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="card-tag">रेडियो रूपक</span>
          <span class="card-badge">50 अनुबंध</span>
        </div>
        <div class="card-title-bold">आकाशवाणी रायपुर के लिए 50 रेडियो रूपक लेखन निर्माण अनुबंध</div>
        <div class="card-desc">विभिन्न सामाजिक, लोक एवं सांस्कृतिक विषयों पर 50 रेडियो रूपकों का लेखन व सफल निर्माण।</div>
      </div>

      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="card-tag">रेडियो नाटक</span>
          <span class="card-badge">10 नाटक</span>
        </div>
        <div class="card-title-bold">आकाशवाणी रायपुर के लिए 10 नाटकों का लेखन व निर्माण अनुबंध</div>
        <div class="card-desc">सामाजिक एवं साहित्यिक विषयों पर 10 पूर्ण नाटकों का आधिकारिक लेखन व निर्माण।</div>
      </div>

      <!-- Specific User Correction: Replaced '500+ कड़ियां' with '5 धारावाहिक' -->
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="card-tag">ऐतिहासिक धारावाहिक</span>
          <span class="card-badge">5 धारावाहिक</span>
        </div>
        <div class="card-title-bold">आकाशवाणी रायपुर से प्रथम रेडियो सीरियल सहित 6 रेडियो सीरियल (हिंदी एवं छत्तीसगढ़ी) लेखन के लिए अनुबंध</div>
      </div>

      <!-- Decorative Broadcast Mic Feature Box Filling Space -->
      <div class="deco-box">
        {svg_mic}
        <div class="deco-text">
          <strong>रेडियो प्रसारण की आवाज:</strong> चौपाल एवं श्रमिक जगत के माध्यम से जनमानस की चेतना को जोड़ने वाली तीन दशकों की विश्वसनीय वाणी।
        </div>
      </div>
    </div>

    <div class="footer">
      <div>बी.एस.आर. फिल्म्स रायपुर • <strong>भीष्मदेव चतुर्वेदी</strong></div>
      <div>4 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 5: DOORDARSHAN KENDRA RAIPUR
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-left">
          <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
          <div>
            <div class="header-owner-name">भीष्मदेव चतुर्वेदी</div>
            <div class="header-sub">दूरदर्शन केंद्र रायपुर कृतित्व एवं एंकरिंग</div>
          </div>
        </div>
        <div class="header-meta">
          टेलीफिल्म व धारावाहिक<br>
          DD Raipur
        </div>
      </div>

      <div class="section-title">
        <span>दूरदर्शन केंद्र रायपुर</span>
        <span class="section-sub">टेलीफिल्म, धारावाहिक व एंकरिंग</span>
      </div>

      <div class="grid-2">
        <div class="stat-box">
          <div class="stat-num">15</div>
          <div class="stat-label">15 टेलीफिल्म लेखन व निर्देशन</div>
          <div class="stat-sub">दूरदर्शन केंद्र रायपुर</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">5</div>
          <div class="stat-label">5 सीरियल लेखन व निर्देशन व संचालन</div>
          <div class="stat-sub">लोकप्रिय धारावाहिक</div>
        </div>
      </div>

      <div class="card">
        <div class="card-tag">वीडियो स्पॉट्स निर्माण</div>
        <div class="card-title-bold">दूरदर्शन रायपुर का प्रथम वीडियो स्पॉट लेखन व निर्देशन सहित 80 से अधिक वीडियो स्पॉट्स</div>
      </div>

      <div class="card">
        <div class="card-tag">विशेष प्रसारण</div>
        <div class="card-title-bold">विभिन्न राष्ट्रीय और क्षेत्रीय कार्यक्रमों का लेखन व निर्देशन</div>
        <div class="card-desc">राज्य एवं राष्ट्रीय स्तर के आयोजनों का संयोजन व निर्देशन।</div>
      </div>

      <div class="card">
        <div class="card-tag">दूरदर्शन रायपुर के प्रमुख कार्यक्रम (एंकर):</div>
        <div class="pill-wrap" style="margin-top: 3.5px;">
          <span class="pill">एंकर - परिक्रमा</span>
          <span class="pill">हमर गांव</span>
          <span class="pill">नववर्ष विशेष कार्यक्रम</span>
          <span class="pill">भुइयां के गोठ</span>
          <span class="pill">कृषि दर्शन कार्यक्रम</span>
        </div>
      </div>

      <!-- Decorative TV Studio Feature Box -->
      <div class="deco-box">
        {svg_tv}
        <div class="deco-text">
          <strong>दूरदर्शन की पहचान:</strong> परिक्रमा, हमर गांव और भुइयां के गोठ जैसे ऐतिहासिक कार्यक्रमों के मुख्य एंकर एवं 15 टेलीफिल्म्स के निर्देशक।
        </div>
      </div>
    </div>

    <div class="footer">
      <div>बी.एस.आर. फिल्म्स रायपुर • <strong>भीष्मदेव चतुर्वेदी</strong></div>
      <div>5 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 6: HISTORIC CAMPAIGNS & GLOBAL MISSIONS
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-left">
          <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
          <div>
            <div class="header-owner-name">भीष्मदेव चतुर्वेदी</div>
            <div class="header-sub">ऐतिहासिक चुनाव व सामाजिक अभियान</div>
          </div>
        </div>
        <div class="header-meta">
          राष्ट्रीय अभियान<br>
          UNICEF / World Bank
        </div>
      </div>

      <div class="section-title">
        <span>अनुभव — ऐतिहासिक चुनावी व सामाजिक अभियान</span>
        <span class="section-sub">राज्य व राष्ट्रीय स्तर के अभियान</span>
      </div>

      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="card-tag">विधान सभा चुनाव 2013</span>
          <span class="card-badge">06 आकाशवाणी केंद्र</span>
        </div>
        <div class="card-desc" style="font-size: 8.2pt; color: #111111; font-weight: 600; margin-top: 1px;">
          विधान सभा चुनाव सन् 2013 में रेडियो के माध्यम से प्रदेश के 06 आकाशवाणी केन्द्रों से भारतीय जनता पार्टी के चुनाव प्रचार हेतु रेडियो जिंगल निर्माण व प्रसारण हेतु अनुबंधित एजेंसी ।
        </div>
      </div>

      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="card-tag">लोक सभा चुनाव 2014</span>
          <span class="card-badge">06 आकाशवाणी केंद्र</span>
        </div>
        <div class="card-desc" style="font-size: 8.2pt; color: #111111; font-weight: 600; margin-top: 1px;">
          लोक सभा चुनाव सन् 2014 में रेडियो के माध्यम से प्रदेश के 06 आकाशवाणी केन्द्रों से भारतीय जनता पार्टी के चुनाव प्रचार हेतु रेडियो जिंगल निर्माण व प्रसारण हेतु अनुबंधित एजेंसी ।
        </div>
      </div>

      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: baseline;">
          <span class="card-tag">सामाजिक अभियान</span>
          <span class="card-badge">जन जागरूकता</span>
        </div>
        <div class="card-desc" style="font-size: 8.2pt; color: #111111; font-weight: 600; margin-top: 1px;">
          विभिन्न एनजीओ के साथ प्रचार - प्रसार फिल्म और रेडियो कार्यक्रम निर्माण का अनुभव। जन जागरूकता यात्रा में संयोजन।
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-tag">यूनिसेफ (UNICEF)</div>
          <div class="card-title-bold" style="font-size: 8.5pt; color: #8C4E00;">
            यूनिसेफ के लिए वीडियो स्पॉट निर्माण
          </div>
        </div>

        <div class="card">
          <div class="card-tag">वर्ल्ड बैंक (WORLD BANK)</div>
          <div class="card-title-bold" style="font-size: 8.5pt; color: #8C4E00;">
            वर्ल्ड बैंक वित्तपोषित योजनाओं के प्रचार प्रसार के लिए फिल्म व रेडियो सीरियल निर्माण
          </div>
        </div>
      </div>

      <!-- Decorative Award Feature Box -->
      <div class="deco-box">
        {svg_award}
        <div class="deco-text">
          <strong>राष्ट्रीय एवं वैश्विक विश्वास:</strong> लोकतांत्रिक चुनावों से लेकर वैश्विक विकास संगठनों (UNICEF व World Bank) तक व्यापक प्रचार का सफल नेतृत्व।
        </div>
      </div>
    </div>

    <div class="footer">
      <div>बी.एस.आर. फिल्म्स रायपुर • <strong>भीष्मदेव चतुर्वेदी</strong></div>
      <div>6 / 7</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       MOBILE PAGE 7: OFFICIAL CONTACT & AUTHORIZED SIGN-OFF
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-left">
          <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
          <div>
            <div class="header-owner-name">भीष्मदेव चतुर्वेदी</div>
            <div class="header-sub">आधिकारिक संपर्क एवं कार्यालय विवरण</div>
          </div>
        </div>
        <div class="header-meta">
          राजधानी रायपुर<br>
          छत्तीसगढ़
        </div>
      </div>

      <div class="section-title">
        <span>आधिकारिक संपर्क एवं स्टूडियो कार्यालय</span>
        <span class="section-sub">राजधानी रायपुर (छ.ग.)</span>
      </div>

      <div class="card card-highlight" style="padding: 7px 9px; margin-bottom: 5px;">
        <div style="font-size: 8.5pt; line-height: 1.45; color: #111111;">
          <p style="margin-bottom: 4px;">
            <strong style="color: #8C4E00;">स्थाई पता:</strong><br>
            राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 4920013 ( छ ग)
          </p>
          <p style="margin-bottom: 4px;">
            <strong style="color: #8C4E00;">दूरभाष / मोबाइल:</strong><br>
            <span style="font-size: 11pt; font-weight: 900; color: #0A0A0A;">7000866323, 9826167533</span>
          </p>
          <p style="margin-bottom: 4px;">
            <strong style="color: #8C4E00;">आधिकारिक ईमेल:</strong><br>
            <span style="font-size: 9.5pt; font-weight: 800; color: #0A0A0A;">bsrfilms2017@gmail.com</span>
          </p>
          <p>
            <strong style="color: #8C4E00;">वेबसाइट:</strong><br>
            <span style="font-size: 9.5pt; font-weight: 800; color: #0A0A0A;">www.bsrfilms.com</span>
          </p>
        </div>
      </div>

      <div class="card" style="margin-bottom: 6px;">
        <div class="card-tag">आजीवन सांस्कृतिक संकल्प</div>
        <div style="font-size: 8.5pt; color: #0A0A0A; font-weight: 700; line-height: 1.35; margin-top: 2px;">
          भारतीय कला, संस्कृति, साहित्य, अध्यात्म, राजनीति में विशेष रुचि। छत्तीसगढ़ी भाषा , लोक कला, संस्कृति, संस्कार का आजीवन विद्यार्थी।
        </div>
      </div>

      <!-- Official Authorization Seal Stamp -->
      <div style="border-top: 1.5px dashed #D5A04A; padding-top: 6px; text-align: right;">
        <div style="font-size: 7.2pt; color: #555555; text-align: left; margin-bottom: 3.5px;">
          प्रमाणित: परिचय संचिका में अंकित समस्त विवरण अधिकृत अभिलेखों एवं अनुबंधों पर आधारित हैं।
        </div>
        <div style="font-size: 11pt; font-weight: 900; color: #8C4E00;">
          ( भीष्मदेव चतुर्वेदी )
        </div>
        <div style="font-size: 8.5pt; font-weight: 800; color: #333333;">
          संस्थापक एवं निर्देशक • बी.एस.आर. फिल्म्स रायपुर
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
    f.write(mobile_html)

print("Updated public/founder_mobile_dossier.html with owner-centric headers, consolidated layout, and decorative elements!")
