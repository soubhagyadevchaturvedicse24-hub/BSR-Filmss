import base64
import subprocess
import os

with open('public/team/bhishma.png', 'rb') as f:
    bhishma_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('public/bsr-icon.png', 'rb') as f:
    icon_b64 = base64.b64encode(f.read()).decode('utf-8')

html_content = f"""<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <title>भीष्मदेव चतुर्वेदी - आधिकारिक पोर्टफोलियो | BSR Films Raipur</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800;900&family=Yantramanav:wght@400;500;700;900&display=swap" rel="stylesheet">
  <style>
    @page {{
      size: A4 portrait;
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
      font-family: 'Noto Sans Devanagari', 'Yantramanav', 'Nirmala UI', sans-serif;
      background: #E5E0D8;
      color: #111111;
      line-height: 1.42;
      font-size: 10.5pt;
    }}
    .page {{
      width: 210mm;
      min-height: 297mm;
      height: 297mm;
      max-height: 297mm;
      margin: 0 auto;
      background: #FFFFFF;
      padding: 12mm 14mm 12mm 14mm;
      position: relative;
      page-break-after: always;
      page-break-inside: avoid;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-bottom: 1px solid #CCC;
    }}
    @media print {{
      body {{ background: transparent; }}
      .page {{ border-bottom: none; }}
    }}

    /* Top Letterhead Header */
    .header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #8C4E00;
      padding-bottom: 6px;
      margin-bottom: 10px;
    }}
    .header-logo-group {{
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
      font-size: 18pt;
      font-weight: 900;
      color: #0A0A0A;
      letter-spacing: -0.3px;
      line-height: 1.1;
    }}
    .header-sub {{
      font-size: 7.5pt;
      font-weight: 800;
      color: #8C4E00;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      margin-top: 2px;
    }}
    .header-meta {{
      text-align: right;
      font-size: 7.5pt;
      color: #333333;
      line-height: 1.35;
      font-weight: 500;
    }}
    .header-meta strong {{
      color: #0A0A0A;
      font-weight: 800;
    }}

    /* Bottom Page Footer */
    .footer {{
      border-top: 1.5px solid #8C4E00;
      padding-top: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 7.5pt;
      color: #444444;
      font-weight: 600;
      margin-top: 6px;
    }}
    .footer-left strong {{
      color: #8C4E00;
    }}

    /* Hero Profile Section on Page 1 */
    .profile-card {{
      display: flex;
      gap: 16px;
      align-items: center;
      background: #FDFBF7;
      border: 1.5px solid #D5A04A;
      border-radius: 12px;
      padding: 12px 14px;
      margin-bottom: 10px;
    }}
    .photo-container {{
      width: 135px;
      flex-shrink: 0;
      text-align: center;
    }}
    .founder-photo {{
      width: 130px;
      height: 160px;
      object-fit: cover;
      object-position: top center;
      border-radius: 10px;
      border: 2px solid #8C4E00;
      box-shadow: 0 4px 10px rgba(0,0,0,0.12);
      display: block;
      margin: 0 auto;
    }}
    .photo-badge {{
      display: inline-block;
      margin-top: 5px;
      background: #8C4E00;
      color: #FFFFFF;
      font-size: 6.5pt;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 10px;
      letter-spacing: 0.3px;
    }}
    .profile-details {{
      flex: 1;
    }}
    .profile-name {{
      font-size: 22pt;
      font-weight: 900;
      color: #0A0A0A;
      line-height: 1.1;
      margin-bottom: 2px;
    }}
    .lineage-box {{
      background: #F8F4EC;
      border-left: 3.5px solid #8C4E00;
      padding: 5px 8px;
      border-radius: 0 8px 8px 0;
      margin: 5px 0;
    }}
    .lineage-title {{
      font-size: 10pt;
      font-weight: 800;
      color: #0A0A0A;
    }}
    .lineage-desc {{
      font-size: 8pt;
      font-weight: 600;
      color: #444444;
      line-height: 1.3;
      margin-top: 1px;
    }}
    .roles-wrap {{
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin: 6px 0;
    }}
    .role-pill {{
      background: #FAF2E3;
      border: 1px solid #C89038;
      color: #663300;
      font-size: 7.5pt;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 5px;
    }}
    .contact-compact {{
      font-size: 7.5pt;
      color: #333333;
      line-height: 1.35;
      background: #FFFFFF;
      border: 1px solid #E5DEC9;
      border-radius: 6px;
      padding: 4px 7px;
      margin-top: 4px;
    }}

    /* Section Cards & Bento */
    .section-title {{
      font-size: 13pt;
      font-weight: 900;
      color: #0A0A0A;
      border-bottom: 2px solid #8C4E00;
      padding-bottom: 3px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }}
    .section-title-sub {{
      font-size: 8pt;
      font-weight: 700;
      color: #8C4E00;
    }}
    .bento-grid {{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 7px;
      margin-bottom: 9px;
    }}
    .bento-grid-2 {{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      margin-bottom: 9px;
    }}
    .stat-card {{
      background: #FDFBF7;
      border: 1px solid #D5A04A;
      border-radius: 8px;
      padding: 6px 8px;
      text-align: center;
    }}
    .stat-num {{
      font-size: 15pt;
      font-weight: 900;
      color: #8C4E00;
      line-height: 1.1;
    }}
    .stat-lbl {{
      font-size: 8.5pt;
      font-weight: 800;
      color: #0A0A0A;
      margin-top: 2px;
    }}
    .stat-sub {{
      font-size: 7pt;
      color: #555555;
      font-weight: 500;
    }}

    .card {{
      background: #FDFBF7;
      border: 1px solid #D8CDB8;
      border-radius: 8px;
      padding: 7px 10px;
      margin-bottom: 6px;
    }}
    .card-highlight {{
      background: #FFFDF8;
      border: 1.5px solid #8C4E00;
    }}
    .card-header {{
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }}
    .card-tag {{
      font-size: 7pt;
      font-weight: 800;
      color: #8C4E00;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }}
    .card-badge {{
      background: #FAF2E3;
      border: 1px solid #C89038;
      color: #663300;
      font-size: 6.5pt;
      font-weight: 800;
      padding: 1px 5px;
      border-radius: 4px;
    }}
    .card-text-bold {{
      font-size: 9.5pt;
      font-weight: 800;
      color: #0A0A0A;
      line-height: 1.3;
    }}
    .card-text-sub {{
      font-size: 8pt;
      font-weight: 500;
      color: #333333;
      line-height: 1.35;
      margin-top: 2px;
    }}
    .pill-list {{
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 4px;
    }}
    .pill-item {{
      background: #FAF2E3;
      border: 1px solid #C89038;
      color: #4A2400;
      font-size: 8pt;
      font-weight: 800;
      padding: 2.5px 8px;
      border-radius: 5px;
    }}
  </style>
</head>
<body>

  <!-- ═══════════════════════════════════════════════════════════════════
       PAGE 1: FOUNDER PORTRAIT, PERSONAL CREDENTIALS & STATS
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-logo-group">
          <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
          <div>
            <div class="header-title">बी.एस.आर. फिल्म्स रायपुर</div>
            <div class="header-sub">BSR FILMS RAIPUR • आधिकारिक परिचय संचिका</div>
          </div>
        </div>
        <div class="header-meta">
          <strong>संस्थापक एवं निर्देशक प्रोफ़ाइल</strong><br>
          मो: 7000866323, 9826167533<br>
          bsrfilms2017@gmail.com
        </div>
      </div>

      <!-- Hero Profile Card with Guaranteed Photo -->
      <div class="profile-card">
        <div class="photo-container">
          <img src="data:image/png;base64,{bhishma_b64}" class="founder-photo" alt="भीष्मदेव चतुर्वेदी">
          <span class="photo-badge">संस्थापक एवं निर्देशक</span>
        </div>
        <div class="profile-details">
          <div class="profile-name">भीष्मदेव चतुर्वेदी</div>
          
          <div class="lineage-box">
            <div class="lineage-title">पिता - स्व.श्री दीनानाथ चतुर्वेदी</div>
            <div class="lineage-desc">( स्वयं सेवक RSS, सेवा निवृत शिक्षक, रामायणविद, पूर्व मंडल अध्यक्ष भाजपा )</div>
          </div>

          <div class="roles-wrap">
            <span class="role-pill">लेखक</span>
            <span class="role-pill">निर्देशक (डायरेक्टर)</span>
            <span class="role-pill">निर्माता (प्रोडयूसर)</span>
            <span class="role-pill">गीतकार</span>
            <span class="role-pill">कवि</span>
            <span class="role-pill">मंच संचालन</span>
            <span class="role-pill">समाजसेवा</span>
          </div>

          <div class="contact-compact">
            <strong>पता:</strong> राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 4920013 ( छ ग)<br>
            <strong>मोबाइल:</strong> 7000866323, 9826167533 &nbsp;•&nbsp; <strong>मेल:</strong> bsrfilms2017@gmail.com &nbsp;•&nbsp; <strong>Web:</strong> www.bsrfilms.com
          </div>
        </div>
      </div>

      <!-- Milestone Metrics Bento Grid -->
      <div class="section-title">
        <span>प्रमुख सांख्यिकी एवं प्रोडक्शन उपलब्धियां</span>
        <span class="section-title-sub">30+ वर्षों का मीडिया नेतृत्व</span>
      </div>

      <div class="bento-grid">
        <div class="stat-card">
          <div class="stat-num">लगभग 600</div>
          <div class="stat-lbl">वीडियो स्पॉट्स</div>
          <div class="stat-sub">विज्ञापन व जनहित संदेश निर्माण</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">लगभग 300</div>
          <div class="stat-lbl">डॉक्यूमेंट्री / वृत्तचित्र</div>
          <div class="stat-sub">डॉक्यूड्रामा व लघु वृत्तचित्र निर्माण</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">500+</div>
          <div class="stat-lbl">रेडियो एपिसोड्स</div>
          <div class="stat-sub">हिंदी एवं छत्तीसगढ़ी धारावाहिक</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">400</div>
          <div class="stat-lbl">जिंगल व स्पॉट्स</div>
          <div class="stat-sub">रेडियो जिंगल और वीडियो स्पॉट</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">10</div>
          <div class="stat-lbl">3D एनिमेशन</div>
          <div class="stat-sub">थ्री डी एनिमेशन फिल्म निर्माण</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">30 वर्ष</div>
          <div class="stat-lbl">आकाशवाणी कंपियर</div>
          <div class="stat-sub">चौपाल व श्रमिक जगत प्रसारण</div>
        </div>
      </div>

      <!-- Quick Executive Summary -->
      <div class="card card-highlight">
        <div class="card-tag">संस्थापक उद्घोष</div>
        <div class="card-text-bold" style="font-size: 10pt; color: #8C4E00; margin-top: 2px;">
          भारतीय कला, संस्कृति, साहित्य, अध्यात्म, राजनीति में विशेष रुचि। छत्तीसगढ़ी भाषा , लोक कला, संस्कृति, संस्कार का आजीवन विद्यार्थी।
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-left">बी.एस.आर. फिल्म्स रायपुर • <strong>भीष्मदेव चतुर्वेदी परिचय संचिका</strong></div>
      <div>पृष्ठ 1 / 4</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       PAGE 2: BSR FILMS & ALL INDIA RADIO (AIR RAIPUR)
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-logo-group">
          <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
          <div>
            <div class="header-title">बी.एस.आर. फिल्म्स रायपुर</div>
            <div class="header-sub">संस्थागत पंजीयन एवं आकाशवाणी प्रसारण विरासत</div>
          </div>
        </div>
        <div class="header-meta">
          <strong>संस्थापक: भीष्मदेव चतुर्वेदी</strong><br>
          www.bsrfilms.com
        </div>
      </div>

      <!-- Section: Firm Details -->
      <div class="section-title">
        <span>फर्म - बी.एस.आर.फिल्मस रायपुर</span>
        <span class="section-title-sub">2000 से निरंतर आज पर्यंत कार्यशील</span>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-tag">राज्य शासन मान्यता</span>
          <span class="card-badge">श्रेणी &apos;ब&apos;</span>
        </div>
        <div class="card-text-bold">छत्तीसगढ़ संवाद से &quot; ब &quot; श्रेणी में इम्पेनल्ड</div>
        <div class="card-text-sub">( छत्तीसगढ़ संवाद में 2008 से आज पर्यंत ऑडियो वीडियो निर्माण हेतु पंजीकृत फर्म )</div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-tag">राष्ट्रीय अनुसूचित संस्था</span>
          <span class="card-badge">भारत सरकार</span>
        </div>
        <div class="card-text-bold">NFDC ( नेशनल फिल्म डेवलपमेंट कार्पोरेशन, नई दिल्ली) में अनुसूचित (एनलिस्टेड)</div>
        <div class="card-text-sub">राष्ट्रीय स्तर के वृत्तचित्र, विज्ञापन एवं सिनेमाई निर्माण हेतु अधिकृत व सूचीबद्ध संस्था।</div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-tag">केंद्रीय प्रसारण पंजीयन</span>
          <span class="card-badge">प्रसार भारती</span>
        </div>
        <div class="card-text-bold">प्रसार भारती के केंद्रीय विक्रय एकांश में पंजीकृत एजेंसी</div>
        <div class="card-text-sub">दूरदर्शन एवं आकाशवाणी नेटवर्क पर राष्ट्रीय प्रसारण हेतु अधिकृत एजेंसी।</div>
      </div>

      <div class="card" style="margin-bottom: 14px;">
        <div class="card-tag">कार्यक्षेत्र भाषाएं एवं बोलियां</div>
        <div class="card-text-bold" style="margin-top: 2px;">हिंदी, छत्तीसगढ़ी, गोंडी, हल्बी, सरगुजिहा और अंग्रेजी भाषा/बोलियों में कार्य</div>
        <div class="pill-list">
          <span class="pill-item">हिंदी</span>
          <span class="pill-item">छत्तीसगढ़ी</span>
          <span class="pill-item">गोंडी</span>
          <span class="pill-item">हल्बी</span>
          <span class="pill-item">सरगुजिहा</span>
          <span class="pill-item">अंग्रेजी</span>
        </div>
      </div>

      <!-- Section: AIR Raipur -->
      <div class="section-title">
        <span>अनुभव — आकाशवाणी रायपुर</span>
        <span class="section-title-sub">तीन दशकों की रेडियो प्रसारण यात्रा</span>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-tag">उद्घोषणा व संचालन</span>
          <span class="card-badge">लगभग 30 वर्ष</span>
        </div>
        <div class="card-text-bold">नैमेत्तिक कंपियर - ( लगभग 30 वर्ष )</div>
        <div class="card-text-sub">(आकाशवाणी रायपुर में चौपाल और श्रमिक जगत कार्यक्रम में अनुबंधित)</div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-tag">रेडियो नाट्य कलाकार</span>
          <span class="card-badge">बी हाइग्रेड</span>
        </div>
        <div class="card-text-bold">आकाशवाणी रायपुर से नाटक में &quot; बी हाइग्रेड &quot; कलाकार</div>
        <div class="card-text-sub">प्रसार भारती द्वारा आधिकारिक रूप से वर्गीकृत उच्च कोटि के नाट्य अभिनेता।</div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-tag">रेडियो रूपक निर्माण</span>
          <span class="card-badge">50 अनुबंध</span>
        </div>
        <div class="card-text-bold">आकाशवाणी रायपुर के लिए 50 रेडियो रूपक लेखन निर्माण अनुबंध</div>
        <div class="card-text-sub">लोक संस्कृति, इतिहास एवं जनसरोकारों पर 50 विशिष्ट रेडियो रूपकों का लेखन व निर्माण।</div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-tag">रेडियो नाटक</span>
          <span class="card-badge">10 नाटक</span>
        </div>
        <div class="card-text-bold">आकाशवाणी रायपुर के लिए 10 नाटकों का लेखन व निर्माण अनुबंध</div>
        <div class="card-text-sub">सामाजिक एवं साहित्यिक विषयों पर 10 पूर्ण नाटकों का आधिकारिक लेखन व निर्माण।</div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-tag">ऐतिहासिक धारावाहिक</span>
          <span class="card-badge">500+ कड़ियां</span>
        </div>
        <div class="card-text-bold">आकाशवाणी रायपुर से प्रथम रेडियो सीरियल सहित 6 रेडियो सीरियल (हिंदी एवं छत्तीसगढ़ी) लेखन के लिए अनुबंध</div>
        <div class="card-text-sub">आकाशवाणी रायपुर के इतिहास के प्रथम रेडियो सीरियल सहित 6 धारावाहिकों का विशाल प्रसारण।</div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-left">बी.एस.आर. फिल्म्स रायपुर • <strong>भीष्मदेव चतुर्वेदी परिचय संचिका</strong></div>
      <div>पृष्ठ 2 / 4</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       PAGE 3: DOORDARSHAN & HISTORIC CAMPAIGNS
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-logo-group">
          <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
          <div>
            <div class="header-title">बी.एस.आर. फिल्म्स रायपुर</div>
            <div class="header-sub">दूरदर्शन कृतित्व एवं ऐतिहासिक चुनावी व सामाजिक अभियान</div>
          </div>
        </div>
        <div class="header-meta">
          <strong>संस्थापक: भीष्मदेव चतुर्वेदी</strong><br>
          www.bsrfilms.com
        </div>
      </div>

      <!-- Section: Doordarshan Kendra Raipur -->
      <div class="section-title">
        <span>दूरदर्शन केंद्र रायपुर</span>
        <span class="section-title-sub">टेलीफिल्म, धारावाहिक एवं मुख्य एंकरिंग</span>
      </div>

      <div class="bento-grid">
        <div class="stat-card">
          <div class="stat-num">15</div>
          <div class="stat-lbl">15 टेलीफिल्म लेखन व निर्देशन</div>
          <div class="stat-sub">दूरदर्शन केंद्र रायपुर</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">5</div>
          <div class="stat-lbl">5 सीरियल लेखन व निर्देशन व संचालन</div>
          <div class="stat-sub">लोकप्रिय धारावाहिक</div>
        </div>
        <div class="stat-card">
          <div class="stat-num">80+</div>
          <div class="stat-lbl">80 से अधिक वीडियो स्पॉट्स</div>
          <div class="stat-sub">डीडी रायपुर का प्रथम स्पॉट सहित</div>
        </div>
      </div>

      <div class="card">
        <div class="card-tag">विशेष प्रसारण</div>
        <div class="card-text-bold">विभिन्न राष्ट्रीय और क्षेत्रीय कार्यक्रमों का लेखन व निर्देशन</div>
        <div class="card-text-sub">दूरदर्शन रायपुर का प्रथम वीडियो स्पॉट लेखन व निर्देशन सहित 80 से अधिक वीडियो स्पॉट्स।</div>
      </div>

      <div class="card" style="margin-bottom: 14px;">
        <div class="card-tag">दूरदर्शन रायपुर के प्रमुख कार्यक्रम (एंकर):</div>
        <div class="pill-list" style="margin-top: 4px;">
          <span class="pill-item">एंकर - परिक्रमा</span>
          <span class="pill-item">हमर गांव</span>
          <span class="pill-item">नववर्ष विशेष कार्यक्रम</span>
          <span class="pill-item">भुइयां के गोठ</span>
          <span class="pill-item">कृषि दर्शन कार्यक्रम</span>
        </div>
      </div>

      <!-- Section: Campaigns & Global Missions -->
      <div class="section-title">
        <span>अनुभव — निर्माण, ऐतिहासिक चुनाव व अंतरराष्ट्रीय अभियान</span>
        <span class="section-title-sub">राज्य व राष्ट्रीय स्तर के अभियान</span>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-tag">विधान सभा चुनाव 2013</span>
          <span class="card-badge">06 आकाशवाणी केंद्र</span>
        </div>
        <div class="card-text-bold">विधान सभा चुनाव सन् 2013 में रेडियो के माध्यम से प्रदेश के 06 आकाशवाणी केन्द्रों से भारतीय जनता पार्टी के चुनाव प्रचार हेतु रेडियो जिंगल निर्माण व प्रसारण हेतु अनुबंधित एजेंसी ।</div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-tag">लोक सभा चुनाव 2014</span>
          <span class="card-badge">06 आकाशवाणी केंद्र</span>
        </div>
        <div class="card-text-bold">लोक सभा चुनाव सन् 2014 में रेडियो के माध्यम से प्रदेश के 06 आकाशवाणी केन्द्रों से भारतीय जनता पार्टी के चुनाव प्रचार हेतु रेडियो जिंगल निर्माण व प्रसारण हेतु अनुबंधित एजेंसी ।</div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-tag">सामाजिक अभियान व एनजीओ</span>
          <span class="card-badge">जन जागरूकता यात्रा</span>
        </div>
        <div class="card-text-bold">विभिन्न एनजीओ के साथ प्रचार - प्रसार फिल्म और रेडियो कार्यक्रम निर्माण का अनुभव। जन जागरूकता यात्रा में संयोजन।</div>
      </div>

      <div class="bento-grid-2">
        <div class="card">
          <div class="card-tag">अंतरराष्ट्रीय संगठन</div>
          <div class="card-text-bold" style="color: #8C4E00;">यूनिसेफ के लिए वीडियो स्पॉट निर्माण</div>
          <div class="card-text-sub">UNICEF समर्थित जन स्वास्थ्य एवं बाल सुरक्षा अभियान।</div>
        </div>
        <div class="card">
          <div class="card-tag">विश्व बैंक वित्तपोषण</div>
          <div class="card-text-bold" style="color: #8C4E00;">वर्ल्ड बैंक वित्तपोषित योजनाओं के प्रचार प्रसार के लिए फिल्म व रेडियो सीरियल निर्माण</div>
          <div class="card-text-sub">World Bank विकास परियोजनाओं हेतु व्यापक मीडिया निर्माण।</div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-left">बी.एस.आर. फिल्म्स रायपुर • <strong>भीष्मदेव चतुर्वेदी परिचय संचिका</strong></div>
      <div>पृष्ठ 3 / 4</div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════
       PAGE 4: EDUCATION, LEADERSHIP & OFFICIAL CONTACT
       ═══════════════════════════════════════════════════════════════════ -->
  <div class="page">
    <div>
      <div class="header">
        <div class="header-logo-group">
          <img src="data:image/png;base64,{icon_b64}" class="header-logo" alt="Logo">
          <div>
            <div class="header-title">बी.एस.आर. फिल्म्स रायपुर</div>
            <div class="header-sub">शिक्षा, सामाजिक दायित्व एवं आधिकारिक संपर्क</div>
          </div>
        </div>
        <div class="header-meta">
          <strong>संस्थापक: भीष्मदेव चतुर्वेदी</strong><br>
          bsrfilms2017@gmail.com
        </div>
      </div>

      <!-- Section: Education -->
      <div class="section-title">
        <span>शिक्षा</span>
        <span class="section-title-sub">शैक्षणिक योग्यता एवं कला दीक्षा</span>
      </div>

      <div class="bento-grid-2">
        <div class="card">
          <div class="card-tag">स्नातकोत्तर डिग्री</div>
          <div class="card-text-bold">शिक्षा - एम.ए.राजनीति शास्त्र</div>
          <div class="card-text-sub">राजनीति, शासन एवं सामाजिक संरचना का गहन अध्ययन।</div>
        </div>

        <div class="card">
          <div class="card-tag">पत्रकारिता स्नातक</div>
          <div class="card-text-bold">बी जे एमसी ( पं. रविशंकर विश्वविद्यालय रायपुर)</div>
          <div class="card-text-sub">पत्रकारिता एवं जनसंचार में औपचारिक स्नातक उपाधि।</div>
        </div>

        <div class="card">
          <div class="card-tag">संगीत दीक्षा</div>
          <div class="card-text-bold">डिप्लोमा इन लोक संगीत ( इंदिरा कला संगीत विश्वविद्यालय खैरागढ़)</div>
          <div class="card-text-sub">एशिया के ख्यात कला विश्वविद्यालय से पारंपरिक लोक संगीत में विशेष योग्यता।</div>
        </div>

        <div class="card">
          <div class="card-tag">प्रसारण प्रमाणन</div>
          <div class="card-text-bold">वाणी कोर्स ( प्रसार भारती )</div>
          <div class="card-text-sub">प्रसार भारती द्वारा वाचन, भाषा एवं उद्घोषणा का आधिकारिक प्रशिक्षण।</div>
        </div>
      </div>

      <!-- Section: Organizational Leadership -->
      <div class="section-title" style="margin-top: 10px;">
        <span>संगठनात्मक दायित्व, संस्कृति एवं संस्कार</span>
        <span class="section-title-sub">सामाजिक एवं सांस्कृतिक दायित्व</span>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-tag">सिने संघ नेतृत्व</span>
          <span class="card-badge">संस्थापक सदस्य</span>
        </div>
        <div class="card-text-bold">CCTPA ( Chhattisgarh Cine And Television Producers Association ) का फाउंडर सदस्य</div>
        <div class="card-text-sub">प्रदेश के सिनेमा एवं टेलीविजन निर्माताओं के संगठन के संस्थापक सदस्य के रूप में सशक्त भूमिका।</div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-tag">धार्मिक एवं सामाजिक दायित्व</span>
          <span class="card-badge">अध्यक्ष</span>
        </div>
        <div class="card-text-bold">विद्यार्थी परिषद द्वारा निर्मित भगवान शिव मंदिर समिति &quot; प्रबंध समिति कैलाश धाम &quot; भरदा का अध्यक्ष</div>
        <div class="card-text-sub">अखिल भारतीय विद्यार्थी परिषद द्वारा स्थापित शिव मंदिर समिति के अध्यक्ष पद का निष्ठापूर्वक निर्वहन।</div>
      </div>

      <div class="card card-highlight">
        <div class="card-tag">आजीवन सांस्कृतिक संकल्प</div>
        <div class="card-text-bold" style="font-size: 10pt; line-height: 1.35; color: #0A0A0A; margin-top: 2px;">
          भारतीय कला, संस्कृति, साहित्य, अध्यात्म, राजनीति में विशेष रुचि। छत्तीसगढ़ी भाषा , लोक कला, संस्कृति, संस्कार का आजीवन विद्यार्थी।
        </div>
      </div>

      <!-- Official Contact & Office Box -->
      <div class="section-title" style="margin-top: 10px;">
        <span>आधिकारिक संपर्क एवं स्टूडियो कार्यालय</span>
        <span class="section-title-sub">राजधानी रायपुर (छ.ग.)</span>
      </div>

      <div class="card" style="background: #FDFBF7; border: 1.5px solid #8C4E00; padding: 10px 14px;">
        <table style="width: 100%; font-size: 8.5pt; line-height: 1.45;">
          <tr>
            <td style="width: 12%; font-weight: 800; color: #8C4E00; vertical-align: top;">पता:</td>
            <td style="font-weight: 600; color: #111111;">राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 4920013 ( छ ग)</td>
          </tr>
          <tr>
            <td style="font-weight: 800; color: #8C4E00; padding-top: 4px;">मोबाइल:</td>
            <td style="font-weight: 800; color: #0A0A0A; padding-top: 4px;">7000866323, 9826167533</td>
          </tr>
          <tr>
            <td style="font-weight: 800; color: #8C4E00; padding-top: 4px;">ईमेल:</td>
            <td style="font-weight: 700; color: #0A0A0A; padding-top: 4px;">bsrfilms2017@gmail.com</td>
          </tr>
          <tr>
            <td style="font-weight: 800; color: #8C4E00; padding-top: 4px;">वेबसाइट:</td>
            <td style="font-weight: 700; color: #0A0A0A; padding-top: 4px;">www.bsrfilms.com</td>
          </tr>
        </table>
      </div>
    </div>

    <!-- Authorized Sign Off -->
    <div style="display: flex; justify-content: space-between; align-items: flex-end; padding: 0 10px 6px 10px;">
      <div style="font-size: 7.5pt; color: #555555; line-height: 1.3;">
        प्रमाणित: परिचय संचिका में अंकित समस्त विवरण अधिकृत अभिलेखों एवं अनुबंधों पर आधारित हैं।<br>
        <strong>बी.एस.आर. फिल्म्स रायपुर (छ.ग.)</strong>
      </div>
      <div style="text-align: right; min-width: 140px;">
        <div style="font-size: 8pt; font-weight: 800; color: #8C4E00;">( भीष्मदेव चतुर्वेदी )</div>
        <div style="font-size: 7pt; font-weight: 600; color: #444444;">संस्थापक एवं निर्देशक • BSR Films</div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-left">बी.एस.आर. फिल्म्स रायपुर • <strong>भीष्मदेव चतुर्वेदी परिचय संचिका</strong></div>
      <div>पृष्ठ 4 / 4</div>
    </div>
  </div>

</body>
</html>
"""

with open('public/founder_dossier.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Generated public/founder_dossier.html successfully!")
