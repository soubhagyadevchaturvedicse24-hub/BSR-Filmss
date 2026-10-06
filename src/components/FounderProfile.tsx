"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Globe,
  Share2,
  Check,
  Download,
  ArrowLeft,
  MessageSquare,
  ExternalLink,
  Printer,
  FileText,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import CustomCursor from "./CustomCursor";

// SVG Vectors identical to the high-resolution PDF dossier
const SvgCamera = () => (
  <svg width="68" height="68" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <rect x="8" y="24" width="44" height="36" rx="6" fill="#FAF2E3" stroke="#8C4E00" strokeWidth="3"/>
    <circle cx="30" cy="42" r="10" stroke="#8C4E00" strokeWidth="3" fill="#FFFFFF"/>
    <circle cx="30" cy="42" r="5" fill="#8C4E00"/>
    <path d="M52 34L72 22V62L52 50V34Z" fill="#FAF2E3" stroke="#8C4E00" strokeWidth="3" strokeLinejoin="round"/>
    <circle cx="18" cy="14" r="8" fill="#FAF2E3" stroke="#8C4E00" strokeWidth="2.8"/>
    <circle cx="18" cy="14" r="3.5" fill="#8C4E00"/>
    <circle cx="38" cy="14" r="8" fill="#FAF2E3" stroke="#8C4E00" strokeWidth="2.8"/>
    <circle cx="38" cy="14" r="3.5" fill="#8C4E00"/>
    <path d="M18 60L12 74M42 60L48 74M30 60V74" stroke="#8C4E00" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

const SvgMic = () => (
  <svg width="66" height="66" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <rect x="28" y="10" width="24" height="38" rx="12" fill="#FAF2E3" stroke="#8C4E00" strokeWidth="3.2"/>
    <line x1="34" y1="20" x2="46" y2="20" stroke="#8C4E00" strokeWidth="2.6"/>
    <line x1="34" y1="28" x2="46" y2="28" stroke="#8C4E00" strokeWidth="2.6"/>
    <line x1="34" y1="36" x2="46" y2="36" stroke="#8C4E00" strokeWidth="2.6"/>
    <path d="M18 34C18 46.15 27.85 56 40 56C52.15 56 62 46.15 62 34" stroke="#8C4E00" strokeWidth="3.2" strokeLinecap="round"/>
    <line x1="40" y1="56" x2="40" y2="70" stroke="#8C4E00" strokeWidth="3.6"/>
    <line x1="24" y1="70" x2="56" y2="70" stroke="#8C4E00" strokeWidth="3.6" strokeLinecap="round"/>
    <path d="M10 26C7 31 7 37 10 42M70 26C73 31 73 37 70 42" stroke="#D5A04A" strokeWidth="3" strokeLinecap="round"/>
    <path d="M4 20C0 27 0 41 4 48M76 20C80 27 80 41 76 48" stroke="#D5A04A" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const SvgTv = () => (
  <svg width="68" height="68" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <rect x="8" y="20" width="64" height="42" rx="7" fill="#FAF2E3" stroke="#8C4E00" strokeWidth="3.2"/>
    <rect x="14" y="26" width="42" height="30" rx="4" fill="#FFFFFF" stroke="#8C4E00" strokeWidth="2.6"/>
    <circle cx="63" cy="33" r="3.5" fill="#8C4E00"/>
    <circle cx="63" cy="44" r="3.5" fill="#8C4E00"/>
    <line x1="59" y1="52" x2="67" y2="52" stroke="#8C4E00" strokeWidth="2.6"/>
    <path d="M26 10L40 20L54 10" stroke="#8C4E00" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 62L16 72M58 62L64 72" stroke="#8C4E00" strokeWidth="3.2" strokeLinecap="round"/>
  </svg>
);

const SvgAward = () => (
  <svg width="66" height="66" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <circle cx="40" cy="30" r="22" fill="#FAF2E3" stroke="#8C4E00" strokeWidth="3.2"/>
    <circle cx="40" cy="30" r="14" stroke="#8C4E00" strokeWidth="2.4" fill="#FFFDF8"/>
    <path d="M40 20L43.5 27L51 28L45.5 33.5L47 41L40 37.5L33 41L34.5 33.5L29 28L36.5 27L40 20Z" fill="#8C4E00"/>
    <path d="M30 48L22 72L40 64L58 72L50 48" fill="#FAF2E3" stroke="#8C4E00" strokeWidth="3" strokeLinejoin="round"/>
  </svg>
);

const SvgCrest = () => (
  <svg width="66" height="66" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <path d="M40 8L60 16V36C60 52 40 70 40 70C40 70 20 52 20 36V16L40 8Z" fill="#FAF2E3" stroke="#8C4E00" strokeWidth="3.2" strokeLinejoin="round"/>
    <path d="M30 30C35 27 45 27 50 30V48C45 45 35 45 30 48V30Z" fill="#FFFFFF" stroke="#8C4E00" strokeWidth="2.4"/>
    <line x1="40" y1="28" x2="40" y2="47" stroke="#8C4E00" strokeWidth="2.4"/>
    <circle cx="40" cy="20" r="4" fill="#8C4E00"/>
  </svg>
);

const SvgSeal = () => (
  <svg width="78" height="78" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
    <circle cx="40" cy="40" r="37" stroke="#8C4E00" strokeWidth="3.2" strokeDasharray="4 2.5" fill="#FFFDF8"/>
    <circle cx="40" cy="40" r="30" stroke="#8C4E00" strokeWidth="2.4" fill="#FAF2E3"/>
    <circle cx="40" cy="40" r="22" stroke="#8C4E00" strokeWidth="2" fill="#FFFFFF"/>
    <path d="M40 24L43 32.5L52 33.8L45.5 40.2L47.2 49.2L40 44.8L32.8 49.2L34.5 40.2L28 33.8L37 32.5L40 24Z" fill="#8C4E00"/>
    <circle cx="40" cy="13" r="2" fill="#8C4E00"/>
    <circle cx="40" cy="67" r="2" fill="#8C4E00"/>
    <circle cx="13" cy="40" r="2" fill="#8C4E00"/>
    <circle cx="67" cy="40" r="2" fill="#8C4E00"/>
  </svg>
);

const HL = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-black text-[#0A0A0A] border-b-[1.5px] border-[#D5A04A]/70 pb-[0.5px] drop-shadow-[0_0.5px_1px_rgba(0,0,0,0.15)]">
    {children}
  </strong>
);

export default function FounderProfile() {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    document.body.classList.remove("loading");
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleShare = async () => {
    const shareData = {
      title: "भीष्मदेव चतुर्वेदी | संस्थापक एवं निर्देशक — BSR Films",
      text: "श्री भीष्मदेव चतुर्वेदी — लेखक, निर्देशक, निर्माता। 30+ वर्षों का आकाशवाणी व दूरदर्शन अनुभव। संपूर्ण पोर्टफोलियो देखें:",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    showToast("प्रोफ़ाइल लिंक कॉपी हो गया!");
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:भीष्मदेव चतुर्वेदी (Bhishmdev Chaturvedi)
ORG:बी.एस.आर.फिल्मस रायपुर (BSR Films Raipur)
TITLE:लेखक, निर्देशक (डायरेक्टर), निर्माता (प्रोडयूसर), गीतकार, कवि, मंच संचालन, समाजसेवा
TEL;TYPE=CELL,VOICE:+917000866323
TEL;TYPE=WORK,VOICE:+919826167533
EMAIL;TYPE=PREF,INTERNET:bsrfilms2017@gmail.com
URL:https://www.bsrfilms.com
ADR;TYPE=WORK:;;राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर, पोस्ट सुंदर नगर;रायपुर;छ ग;4920013;India
NOTE:फर्म - बी.एस.आर.फिल्मस रायपुर। 2000 से निरंतर आज पर्यंत कार्यशील। छत्तीसगढ़ संवाद 'ब' श्रेणी एवं NFDC अनुसूचित फर्म।
END:VCARD`;

    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Bhishmdev_Chaturvedi_BSR_Films.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("डिजिटल संपर्क (vCard) डाउनलोड हो गया!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F3EFEA] text-[#111111] transition-colors duration-500 pb-24 md:pb-16 selection:bg-[#8C4E00]/20 selection:text-black print:p-0 print:bg-white print:text-black">
      <CustomCursor />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#12141c] text-white border border-[#8C4E00] px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-medium backdrop-blur-md no-print"
          >
            <Check className="w-4 h-4 text-[#E3A652]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Floating Control Bar */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/90 backdrop-blur-xl border-b border-[#D8CDB8] shadow-sm transition-colors no-print">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold tracking-wide text-[#333333] hover:text-[#8C4E00] transition-colors group flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform flex-shrink-0" />
            <span className="hidden sm:inline">मुख्य पृष्ठ (Home)</span>
            <span className="inline sm:hidden">मुख्य</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle />
            <ThemeToggle />

            {/* Direct PDF Download */}
            <a
              href="/Bhishmdev_Chaturvedi_Portfolio.pdf"
              download="Bhishmdev_Chaturvedi_Portfolio.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#8C4E00] hover:bg-[#6E3C00] text-white shadow-md transition-all active:scale-95 cursor-pointer"
              title="पोर्टफोलियो PDF सीधे डाउनलोड करें"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF डाउनलोड</span>
            </a>

            {/* Print / Save as PDF */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FAF2E3] hover:bg-[#F2E5CE] text-[#663300] border border-[#C89038] transition-all active:scale-95 cursor-pointer"
              title="प्रोफ़ाइल प्रिंट करें या PDF सहेजें"
            >
              <Printer className="w-3.5 h-3.5 text-[#8C4E00]" />
              <span className="hidden sm:inline">PDF प्रिंट</span>
              <span className="inline sm:hidden">प्रिंट</span>
            </button>

            {/* Share Profile */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FAF2E3] hover:bg-[#F2E5CE] text-[#8C4E00] border border-[#D5A04A] transition-all active:scale-95 cursor-pointer"
              title="प्रोफ़ाइल लिंक साझा करें"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>कॉपी हुआ</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">शेयर</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Single-Page Continuous Dossier (Matching PDF 100% Verbatim with Zero Click Required) */}
      <main className="max-w-[460px] sm:max-w-xl md:max-w-2xl mx-auto px-3 sm:px-4 pt-6 space-y-6">

        {/* ═══════════════════════════════════════════════════════════════════
            SCREEN 1: OWNER COVER SCREEN + KEY STATS + ADDRESS
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-2 border-[#8C4E00] rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden break-inside-avoid print:border-none print:shadow-none print:rounded-none print:mb-12">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#8C4E00] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Image
                src="/bsr-icon.webp"
                alt="Logo"
                width={34}
                height={34}
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
              />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#0A0A0A] leading-tight">भीष्मदेव चतुर्वेदी</h2>
                <p className="text-[10px] sm:text-xs font-bold text-[#8C4E00] uppercase tracking-wide">
                  बी.एस.आर. फिल्म्स रायपुर • संस्थापक एवं निर्देशक
                </p>
              </div>
            </div>
            <div className="text-right text-[10px] sm:text-xs text-[#333333] font-bold leading-tight">
              आधिकारिक परिचय<br />
              मो: 7000866323
            </div>
          </div>

          {/* Centered Photo with Overlapping Badge */}
          <div className="flex flex-col items-center justify-center w-full my-2">
            <div className="relative flex flex-col items-center">
              <div className="relative w-32 h-40 sm:w-36 sm:h-44 rounded-xl overflow-hidden border-[2.5px] border-[#8C4E00] shadow-md bg-[#FAF2E3]">
                <Image
                  src="/team/bhishma.webp"
                  alt="भीष्मदेव चतुर्वेदी"
                  fill
                  priority
                  className="object-cover object-top filter contrast-[1.03]"
                />
              </div>
              <div className="bg-[#8C4E00] text-white text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full -mt-3 z-10 shadow-md whitespace-nowrap">
                संस्थापक एवं निर्देशक (Founder & Director)
              </div>
            </div>
          </div>

          {/* Owner Name */}
          <div className="text-center my-1.5">
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
              भीष्मदेव चतुर्वेदी
            </h1>
          </div>

          {/* Lineage Box */}
          <div className="bg-[#F8F4EC] border-l-4 border-[#8C4E00] p-2.5 sm:p-3 rounded-r-lg mb-2.5">
            <p className="text-sm sm:text-base font-bold text-[#0A0A0A]">
              पिता - स्व.श्री दीनानाथ चतुर्वेदी
            </p>
            <p className="text-xs sm:text-sm font-semibold text-[#333333] mt-0.5 leading-snug">
              ( स्वयं सेवक RSS, सेवा निवृत शिक्षक, रामायणविद, पूर्व मंडल अध्यक्ष भाजपा )
            </p>
          </div>

          {/* Roles Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-3">
            {[
              "लेखक",
              "निर्देशक (डायरेक्टर)",
              "निर्माता (प्रोडयूसर)",
              "गीतकार",
              "कवि",
              "मंच संचालन",
              "समाजसेवा",
            ].map((role) => (
              <span
                key={role}
                className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-xs font-bold px-2.5 py-1 rounded-md"
              >
                {role}
              </span>
            ))}
          </div>

          {/* Key Milestone Stats on Page 1 */}
          <div className="mb-3">
            <div className="flex items-center justify-between border-b-[1.8px] border-[#8C4E00] pb-1 mb-2">
              <span className="text-sm sm:text-base font-black text-[#0A0A0A]">प्रमुख सांख्यिकी एवं उपलब्धियां</span>
              <span className="text-[11px] font-bold text-[#8C4E00]">प्रमाणित मीडिया परिमाण</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-1.5">
              <div className="bg-[#FDFBF7] border border-[#D5A04A] rounded-lg p-2 text-center">
                <p className="text-lg sm:text-xl font-black text-[#8C4E00] leading-none">650+</p>
                <p className="text-xs font-bold text-[#0A0A0A] mt-1">वीडियो स्पॉट्स</p>
                <p className="text-[10px] text-[#555555] font-semibold">विज्ञापन व जनहित</p>
              </div>
              <div className="bg-[#FDFBF7] border border-[#D5A04A] rounded-lg p-2 text-center">
                <p className="text-lg sm:text-xl font-black text-[#8C4E00] leading-none">350+</p>
                <p className="text-xs font-bold text-[#0A0A0A] mt-1">डॉक्यूमेंट्री</p>
                <p className="text-[10px] text-[#555555] font-semibold">वृत्तचित्र निर्माण</p>
              </div>
              <div className="bg-[#FDFBF7] border border-[#D5A04A] rounded-lg p-2 text-center">
                <p className="text-lg sm:text-xl font-black text-[#8C4E00] leading-none">550+</p>
                <p className="text-xs font-bold text-[#0A0A0A] mt-1">रेडियो कड़ियां</p>
                <p className="text-[10px] text-[#555555] font-semibold">धारावाहिक एपिसोड्स</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              <div className="bg-[#FDFBF7] border border-[#D5A04A] rounded-lg p-2 text-center">
                <p className="text-lg sm:text-xl font-black text-[#8C4E00] leading-none">437+</p>
                <p className="text-xs font-bold text-[#0A0A0A] mt-1">जिंगल व स्पॉट्स</p>
                <p className="text-[10px] text-[#555555] font-semibold">रेडियो जिंगल निर्माण</p>
              </div>
              <div className="bg-[#FDFBF7] border border-[#D5A04A] rounded-lg p-2 text-center">
                <p className="text-lg sm:text-xl font-black text-[#8C4E00] leading-none">12+</p>
                <p className="text-xs font-bold text-[#0A0A0A] mt-1">3D एनिमेशन</p>
                <p className="text-[10px] text-[#555555] font-semibold">एनिमेशन फिल्म्स</p>
              </div>
              <div className="bg-[#FDFBF7] border border-[#D5A04A] rounded-lg p-2 text-center">
                <p className="text-lg sm:text-xl font-black text-[#8C4E00] leading-none">30+ वर्ष</p>
                <p className="text-xs font-bold text-[#0A0A0A] mt-1">कंपियर</p>
                <p className="text-[10px] text-[#555555] font-semibold">आकाशवाणी रायपुर</p>
              </div>
            </div>
          </div>

          {/* Address Box */}
          <div className="bg-[#FFFDF8] border-2 border-[#8C4E00] rounded-xl p-3">
            <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wider block">कार्यालय एवं संपर्क विवरण</span>
            <div className="text-xs sm:text-sm text-[#111111] leading-relaxed mt-1">
              <p><strong>पता:</strong> राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 4920013 ( छ ग)</p>
              <p className="mt-1">
                <strong>मोबाइल:</strong>{" "}
                <span className="text-sm font-black text-[#0A0A0A]">
                  <a href="tel:7000866323" className="hover:underline">7000866323</a>,{" "}
                  <a href="tel:9826167533" className="hover:underline">9826167533</a>
                </span>
              </p>
              <p className="mt-0.5">
                <strong>मेल:</strong> bsrfilms2017@gmail.com • <strong>Web:</strong> www.bsrfilms.com
              </p>
            </div>
          </div>

          {/* Screen 1 Footer */}
          <div className="border-t border-[#D5A04A] pt-2 mt-3 flex justify-between text-[11px] font-bold text-[#444444]">
            <span>बी.एस.आर. फिल्म्स रायपुर • <strong className="text-[#8C4E00]">भीष्मदेव चतुर्वेदी</strong></span>
            <span>1 / 7</span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCREEN 2: EDUCATION (शिक्षा) & LEADERSHIP (दायित्व)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-2 border-[#8C4E00] rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden break-inside-avoid print:border-none print:shadow-none print:rounded-none print:mb-12">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#8C4E00] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Image src="/bsr-icon.webp" alt="Logo" width={34} height={34} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#0A0A0A] leading-tight">भीष्मदेव चतुर्वेदी</h2>
                <p className="text-[10px] sm:text-xs font-bold text-[#8C4E00] uppercase tracking-wide">
                  शिक्षा एवं संगठनात्मक दायित्व
                </p>
              </div>
            </div>
            <div className="text-right text-[10px] sm:text-xs text-[#333333] font-bold leading-tight">
              शैक्षणिक योग्यता<br />एवं नेतृत्व
            </div>
          </div>

          {/* Studies Grid */}
          <div className="mb-4">
            <div className="flex items-center justify-between border-b-[1.8px] border-[#8C4E00] pb-1 mb-2.5">
              <span className="text-sm sm:text-base font-black text-[#0A0A0A]">शिक्षा</span>
              <span className="text-[11px] font-bold text-[#8C4E00]">डिग्री, पत्रकारिता, लोक संगीत व वाणी दीक्षा</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">स्नातकोत्तर डिग्री</span>
                <p className="text-sm sm:text-base font-bold text-[#0A0A0A] mt-0.5">शिक्षा - एम.ए.राजनीति शास्त्र</p>
              </div>

              <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">पत्रकारिता स्नातक</span>
                <p className="text-sm sm:text-base font-bold text-[#0A0A0A] mt-0.5">बी जे एमसी ( पं. रविशंकर विश्वविद्यालय रायपुर)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">संगीत दीक्षा</span>
                <p className="text-sm sm:text-base font-bold text-[#0A0A0A] mt-0.5">डिप्लोमा इन लोक संगीत ( इंदिरा कला संगीत विश्वविद्यालय खैरागढ़)</p>
              </div>

              <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">प्रसारण प्रमाणन</span>
                <p className="text-sm sm:text-base font-bold text-[#0A0A0A] mt-0.5">वाणी कोर्स ( प्रसार भारती )</p>
              </div>
            </div>
          </div>

          {/* Organizational Leadership */}
          <div className="mb-4">
            <div className="border-b-[1.8px] border-[#8C4E00] pb-1 mb-2.5">
              <span className="text-sm sm:text-base font-black text-[#0A0A0A]">संगठनात्मक दायित्व, संस्कृति एवं संस्कार</span>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5 mb-2.5">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">सिने संघ नेतृत्व</span>
                <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">संस्थापक सदस्य</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0A0A0A]">
                CCTPA ( Chhattisgarh Cine And Television Producers Association ) का फाउंडर सदस्य
              </p>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">मंदिर प्रबंध समिति</span>
                <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">अध्यक्ष</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0A0A0A]">
                विद्यार्थी परिषद द्वारा निर्मित भगवान शिव मंदिर समिति &quot; प्रबंध समिति कैलाश धाम &quot; भरदा का अध्यक्ष
              </p>
            </div>
          </div>

          {/* Big Heritage Crest Banner */}
          <div className="flex items-center gap-3.5 bg-[#FFFDF8] border-2 border-[#D5A04A] rounded-xl p-3.5 shadow-sm">
            <SvgCrest />
            <div className="text-xs sm:text-sm text-[#333333] leading-relaxed font-semibold">
              <strong className="text-sm font-black text-[#8C4E00] block mb-0.5">शैक्षणिक गरिमा एवं सांस्कृतिक निष्ठा:</strong>
              <HL>राजनीति शास्त्र में स्नातकोत्तर</HL>, <HL>पत्रकारिता (BJMC)</HL>, <HL>खैरागढ़ विश्वविद्यालय</HL> से <HL>लोक संगीत दीक्षा</HL> एवं <HL>प्रसार भारती</HL> से <HL>वाणी प्रमाणन</HL> का दुर्लभ व प्रतिष्ठित समन्वय।
            </div>
          </div>

          {/* Screen 2 Footer */}
          <div className="border-t border-[#D5A04A] pt-2 mt-3 flex justify-between text-[11px] font-bold text-[#444444]">
            <span>बी.एस.आर. फिल्म्स रायपुर • <strong className="text-[#8C4E00]">भीष्मदेव चतुर्वेदी</strong></span>
            <span>2 / 7</span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCREEN 3: FIRM - BSR FILMS RAIPUR
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-2 border-[#8C4E00] rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden break-inside-avoid print:border-none print:shadow-none print:rounded-none print:mb-12">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#8C4E00] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Image src="/bsr-icon.webp" alt="Logo" width={34} height={34} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#0A0A0A] leading-tight">भीष्मदेव चतुर्वेदी</h2>
                <p className="text-[10px] sm:text-xs font-bold text-[#8C4E00] uppercase tracking-wide">
                  बी.एस.आर. फिल्म्स रायपुर • संस्थागत पंजीयन
                </p>
              </div>
            </div>
            <div className="text-right text-[10px] sm:text-xs text-[#333333] font-bold leading-tight">
              स्थापना सन् 2000<br />NFDC & संवाद
            </div>
          </div>

          <div className="mb-3.5">
            <div className="flex items-center justify-between border-b-[1.8px] border-[#8C4E00] pb-1 mb-2.5">
              <span className="text-sm sm:text-base font-black text-[#0A0A0A]">फर्म - बी.एस.आर.फिल्मस रायपुर</span>
              <span className="text-[11px] font-bold text-[#8C4E00]">2000 से निरंतर आज पर्यंत कार्यशील</span>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5 mb-2.5">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">राज्य शासन मान्यता</span>
                <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">श्रेणी &apos;ब&apos;</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0A0A0A]">छत्तीसगढ़ संवाद से &quot; ब &quot; श्रेणी में इम्पेनल्ड</p>
              <p className="text-xs sm:text-sm text-[#444444] mt-1 font-medium">( छत्तीसगढ़ संवाद में 2008 से आज पर्यंत ऑडियो वीडियो निर्माण हेतु पंजीकृत फर्म )</p>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5 mb-2.5">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">राष्ट्रीय अनुसूचित संस्था</span>
                <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">भारत सरकार</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0A0A0A]">NFDC ( नेशनल फिल्म डेवलपमेंट कार्पोरेशन, नई दिल्ली) में अनुसूचित (एनलिस्टेड)</p>
              <p className="text-xs sm:text-sm text-[#444444] mt-1 font-medium">राष्ट्रीय स्तर के वृत्तचित्र, विज्ञापन व सिनेमा निर्माण हेतु आधिकारिक रूप से सूचीबद्ध।</p>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5 mb-2.5">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">केंद्रीय प्रसारण पंजीयन</span>
                <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">प्रसार भारती</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0A0A0A]">प्रसार भारती के केंद्रीय विक्रय एकांश में पंजीकृत एजेंसी</p>
              <p className="text-xs sm:text-sm text-[#444444] mt-1 font-medium">दूरदर्शन एवं आकाशवाणी नेटवर्क पर राष्ट्रीय प्रसारण हेतु अधिकृत एजेंसी।</p>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5">
              <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide block mb-1">कार्यक्षेत्र भाषाएं एवं बोलियां</span>
              <p className="text-xs sm:text-sm font-bold text-[#0A0A0A]">
                हिंदी, छत्तीसगढ़ी, गोंडी, हल्बी, सरगुजिहा और अंग्रेजी भाषा/बोलियों में कार्य
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["हिंदी", "छत्तीसगढ़ी", "गोंडी", "हल्बी", "सरगुजिहा", "अंग्रेजी"].map((lang) => (
                  <span key={lang} className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-xs font-bold px-2.5 py-1 rounded-md">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Big Cinema Camera Banner */}
          <div className="flex items-center gap-3.5 bg-[#FFFDF8] border-2 border-[#D5A04A] rounded-xl p-3.5 shadow-sm">
            <SvgCamera />
            <div className="text-xs sm:text-sm text-[#333333] leading-relaxed font-semibold">
              <strong className="text-sm font-black text-[#8C4E00] block mb-0.5">25+ वर्षों की संस्थागत विश्वसनीयता:</strong>
              <HL>छत्तीसगढ़ संवाद (&apos;ब&apos; श्रेणी)</HL>, <HL>NFDC</HL> एवं <HL>प्रसार भारती</HL> से मान्यता प्राप्त। <HL>6 प्रमुख भाषाओं व बोलियों</HL> में <HL>650+ विज्ञापन स्पॉट्स</HL> एवं <HL>350+ वृत्तचित्रों</HL> के निर्माण का ऐतिहासिक कीर्तिमान।
            </div>
          </div>

          {/* Screen 3 Footer */}
          <div className="border-t border-[#D5A04A] pt-2 mt-3 flex justify-between text-[11px] font-bold text-[#444444]">
            <span>बी.एस.आर. फिल्म्स रायपुर • <strong className="text-[#8C4E00]">भीष्मदेव चतुर्वेदी</strong></span>
            <span>3 / 7</span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCREEN 4: ALL INDIA RADIO (AIR RAIPUR)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-2 border-[#8C4E00] rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden break-inside-avoid print:border-none print:shadow-none print:rounded-none print:mb-12">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#8C4E00] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Image src="/bsr-icon.webp" alt="Logo" width={34} height={34} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#0A0A0A] leading-tight">भीष्मदेव चतुर्वेदी</h2>
                <p className="text-[10px] sm:text-xs font-bold text-[#8C4E00] uppercase tracking-wide">
                  आकाशवाणी रायपुर प्रसारण विरासत
                </p>
              </div>
            </div>
            <div className="text-right text-[10px] sm:text-xs text-[#333333] font-bold leading-tight">
              30+ वर्ष अनुभव<br />AIR Raipur
            </div>
          </div>

          <div className="mb-3.5">
            <div className="flex items-center justify-between border-b-[1.8px] border-[#8C4E00] pb-1 mb-2.5">
              <span className="text-sm sm:text-base font-black text-[#0A0A0A]">अनुभव — आकाशवाणी रायपुर</span>
              <span className="text-[11px] font-bold text-[#8C4E00]">तीन दशकों की रेडियो प्रसारण यात्रा</span>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5 mb-2.5">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">उद्घोषणा व संचालन</span>
                <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">लगभग 30 वर्ष</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0A0A0A]">नैमेत्तिक कंपियर - ( लगभग 30 वर्ष )</p>
              <p className="text-xs sm:text-sm text-[#444444] mt-0.5 font-medium">(आकाशवाणी रायपुर में चौपाल और श्रमिक जगत कार्यक्रम में अनुबंधित)</p>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5 mb-2.5">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">नाट्य कलाकार</span>
                <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">बी हाइग्रेड</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0A0A0A]">आकाशवाणी रायपुर से नाटक में &quot; बी हाइग्रेड &quot; कलाकार</p>
              <p className="text-xs sm:text-sm text-[#444444] mt-0.5 font-medium">प्रसार भारती द्वारा आधिकारिक रूप से वर्गीकृत उच्च कोटि के नाट्य अभिनेता।</p>
            </div>

            {/* 2-Column Grid for Features & Plays (Clean, Uncluttered) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-2.5">
              <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">रेडियो रूपक</span>
                  <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-1.5 py-0.5 rounded">50 अनुबंध</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#0A0A0A]">50 रेडियो रूपक लेखन निर्माण अनुबंध</p>
                <p className="text-[11px] text-[#555555] mt-1 font-medium">विभिन्न सामाजिक व लोक विषयों पर 50 रूपकों का सफल निर्माण।</p>
              </div>

              <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">रेडियो नाटक</span>
                  <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-1.5 py-0.5 rounded">10 नाटक</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#0A0A0A]">10 नाटकों का लेखन व निर्माण अनुबंध</p>
                <p className="text-[11px] text-[#555555] mt-1 font-medium">साहित्यिक विषयों पर 10 पूर्ण नाटकों का आधिकारिक निर्माण।</p>
              </div>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">ऐतिहासिक धारावाहिक</span>
                <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">6 धारावाहिक</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0A0A0A]">
                आकाशवाणी रायपुर से प्रथम रेडियो सीरियल सहित 6 रेडियो सीरियल (हिंदी एवं छत्तीसगढ़ी) लेखन के लिए अनुबंध
              </p>
            </div>
          </div>

          {/* Big Ribbon Mic Banner */}
          <div className="flex items-center gap-3.5 bg-[#FFFDF8] border-2 border-[#D5A04A] rounded-xl p-3.5 shadow-sm">
            <SvgMic />
            <div className="text-xs sm:text-sm text-[#333333] leading-relaxed font-semibold">
              <strong className="text-sm font-black text-[#8C4E00] block mb-0.5">रेडियो प्रसारण की अविस्मरणीय आवाज:</strong>
              <HL>तीन दशकों तक</HL> <HL>आकाशवाणी रायपुर</HL> के सर्वाधिक लोकप्रिय कार्यक्रमों <HL>&apos;चौपाल&apos;</HL> व <HL>&apos;श्रमिक जगत&apos;</HL> की पहचान। <HL>50 रूपक</HL>, <HL>10 नाटक</HL> एवं <HL>6 धारावाहिकों</HL> का सफल निर्माण।
            </div>
          </div>

          {/* Screen 4 Footer */}
          <div className="border-t border-[#D5A04A] pt-2 mt-3 flex justify-between text-[11px] font-bold text-[#444444]">
            <span>बी.एस.आर. फिल्म्स रायपुर • <strong className="text-[#8C4E00]">भीष्मदेव चतुर्वेदी</strong></span>
            <span>4 / 7</span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCREEN 5: DOORDARSHAN KENDRA RAIPUR
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-2 border-[#8C4E00] rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden break-inside-avoid print:border-none print:shadow-none print:rounded-none print:mb-12">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#8C4E00] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Image src="/bsr-icon.webp" alt="Logo" width={34} height={34} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#0A0A0A] leading-tight">भीष्मदेव चतुर्वेदी</h2>
                <p className="text-[10px] sm:text-xs font-bold text-[#8C4E00] uppercase tracking-wide">
                  दूरदर्शन केंद्र रायपुर कृतित्व एवं एंकरिंग
                </p>
              </div>
            </div>
            <div className="text-right text-[10px] sm:text-xs text-[#333333] font-bold leading-tight">
              टेलीफिल्म व धारावाहिक<br />DD Raipur
            </div>
          </div>

          <div className="mb-3.5">
            <div className="flex items-center justify-between border-b-[1.8px] border-[#8C4E00] pb-1 mb-2.5">
              <span className="text-sm sm:text-base font-black text-[#0A0A0A]">दूरदर्शन केंद्र रायपुर</span>
              <span className="text-[11px] font-bold text-[#8C4E00]">टेलीफिल्म, धारावाहिक व एंकरिंग</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mb-2.5">
              <div className="bg-[#FDFBF7] border border-[#D5A04A] rounded-xl p-3 text-center">
                <p className="text-2xl sm:text-3xl font-black text-[#8C4E00] leading-none">15</p>
                <p className="text-xs sm:text-sm font-bold text-[#0A0A0A] mt-1">15 टेलीफिल्म</p>
                <p className="text-[11px] text-[#555555] font-semibold">लेखन व निर्देशन • दूरदर्शन</p>
              </div>
              <div className="bg-[#FDFBF7] border border-[#D5A04A] rounded-xl p-3 text-center">
                <p className="text-2xl sm:text-3xl font-black text-[#8C4E00] leading-none">5</p>
                <p className="text-xs sm:text-sm font-bold text-[#0A0A0A] mt-1">5 सीरियल</p>
                <p className="text-[11px] text-[#555555] font-semibold">लेखन, निर्देशन व संचालन</p>
              </div>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5 mb-2.5">
              <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide block mb-1">वीडियो स्पॉट्स निर्माण</span>
              <p className="text-xs sm:text-sm font-bold text-[#0A0A0A]">
                दूरदर्शन रायपुर का प्रथम वीडियो स्पॉट लेखन व निर्देशन सहित 80 से अधिक वीडियो स्पॉट्स
              </p>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5 mb-2.5">
              <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide block mb-1">विशेष प्रसारण</span>
              <p className="text-xs sm:text-sm font-bold text-[#0A0A0A]">विभिन्न राष्ट्रीय और क्षेत्रीय कार्यक्रमों का लेखन व निर्देशन</p>
              <p className="text-xs text-[#444444] mt-1 font-medium">राज्य एवं राष्ट्रीय स्तर के प्रतिष्ठित आयोजनों का संयोजन व निर्देशन।</p>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5">
              <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide block mb-1">दूरदर्शन रायपुर के प्रमुख कार्यक्रम (एंकर):</span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[
                  "एंकर - परिक्रमा",
                  "हमर गांव",
                  "नववर्ष विशेष कार्यक्रम",
                  "भुइयां के गोठ",
                  "कृषि दर्शन कार्यक्रम",
                ].map((show) => (
                  <span key={show} className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-xs font-bold px-2.5 py-1 rounded-md">
                    {show}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Big TV Studio Banner */}
          <div className="flex items-center gap-3.5 bg-[#FFFDF8] border-2 border-[#D5A04A] rounded-xl p-3.5 shadow-sm">
            <SvgTv />
            <div className="text-xs sm:text-sm text-[#333333] leading-relaxed font-semibold">
              <strong className="text-sm font-black text-[#8C4E00] block mb-0.5">दूरदर्शन केंद्र रायपुर का गौरव:</strong>
              छत्तीसगढ़ के <HL>टेलीविजन इतिहास के प्रथम वीडियो स्पॉट</HL> से लेकर <HL>&apos;परिक्रमा&apos;</HL>, <HL>&apos;हमर गांव&apos;</HL> व <HL>&apos;कृषि दर्शन&apos;</HL> जैसे प्रमुख कार्यक्रमों के <HL>मुख्य संचालक</HL> एवं <HL>15 टेलीफिल्म्स के निर्देशक</HL>।
            </div>
          </div>

          {/* Screen 5 Footer */}
          <div className="border-t border-[#D5A04A] pt-2 mt-3 flex justify-between text-[11px] font-bold text-[#444444]">
            <span>बी.एस.आर. फिल्म्स रायपुर • <strong className="text-[#8C4E00]">भीष्मदेव चतुर्वेदी</strong></span>
            <span>5 / 7</span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCREEN 6: HISTORIC CAMPAIGNS & GLOBAL MISSIONS
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-2 border-[#8C4E00] rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden break-inside-avoid print:border-none print:shadow-none print:rounded-none print:mb-12">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#8C4E00] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Image src="/bsr-icon.webp" alt="Logo" width={34} height={34} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#0A0A0A] leading-tight">भीष्मदेव चतुर्वेदी</h2>
                <p className="text-[10px] sm:text-xs font-bold text-[#8C4E00] uppercase tracking-wide">
                  ऐतिहासिक चुनाव व सामाजिक अभियान
                </p>
              </div>
            </div>
            <div className="text-right text-[10px] sm:text-xs text-[#333333] font-bold leading-tight">
              राष्ट्रीय अभियान<br />UNICEF / World Bank
            </div>
          </div>

          <div className="mb-3.5">
            <div className="flex items-center justify-between border-b-[1.8px] border-[#8C4E00] pb-1 mb-2.5">
              <span className="text-sm sm:text-base font-black text-[#0A0A0A]">अनुभव — ऐतिहासिक चुनावी व सामाजिक अभियान</span>
              <span className="text-[11px] font-bold text-[#8C4E00]">राज्य व राष्ट्रीय स्तर के अभियान</span>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5 mb-2.5">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">विधान सभा चुनाव 2013</span>
                <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">06 आकाशवाणी केंद्र</span>
              </div>
              <p className="text-xs sm:text-sm text-[#111111] font-semibold leading-relaxed">
                विधान सभा चुनाव सन् 2013 में रेडियो के माध्यम से प्रदेश के 06 आकाशवाणी केन्द्रों से भारतीय जनता पार्टी के चुनाव प्रचार हेतु रेडियो जिंगल निर्माण व प्रसारण हेतु अनुबंधित एजेंसी ।
              </p>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5 mb-2.5">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">लोक सभा चुनाव 2014</span>
                <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">06 आकाशवाणी केंद्र</span>
              </div>
              <p className="text-xs sm:text-sm text-[#111111] font-semibold leading-relaxed">
                लोक सभा चुनाव सन् 2014 में रेडियो के माध्यम से प्रदेश के 06 आकाशवाणी केन्द्रों से भारतीय जनता पार्टी के चुनाव प्रचार हेतु रेडियो जिंगल निर्माण व प्रसारण हेतु अनुबंधित एजेंसी ।
              </p>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5 mb-2.5">
              <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide block mb-1">सामाजिक अभियान (जन जागरूकता)</span>
              <p className="text-xs sm:text-sm text-[#111111] font-semibold leading-relaxed">
                विभिन्न एनजीओ के साथ प्रचार - प्रसार फिल्म और रेडियो कार्यक्रम निर्माण का अनुभव। जन जागरूकता यात्रा में संयोजन।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide block mb-1">यूनिसेफ (UNICEF)</span>
                <p className="text-xs sm:text-sm font-bold text-[#8C4E00]">यूनिसेफ के लिए वीडियो स्पॉट निर्माण</p>
              </div>

              <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide block mb-1">वर्ल्ड बैंक (WORLD BANK)</span>
                <p className="text-xs sm:text-sm font-bold text-[#8C4E00]">वर्ल्ड बैंक वित्तपोषित योजनाओं के प्रचार हेतु फिल्म व रेडियो सीरियल निर्माण</p>
              </div>
            </div>
          </div>

          {/* Big Victory Medal Banner */}
          <div className="flex items-center gap-3.5 bg-[#FFFDF8] border-2 border-[#D5A04A] rounded-xl p-3.5 shadow-sm">
            <SvgAward />
            <div className="text-xs sm:text-sm text-[#333333] leading-relaxed font-semibold">
              <strong className="text-sm font-black text-[#8C4E00] block mb-0.5">राष्ट्रीय एवं वैश्विक अभियानों का सशक्त संचार:</strong>
              <HL>2013 विधानसभा</HL> एवं <HL>2014 लोकसभा चुनावों</HL> में <HL>6 आकाशवाणी केंद्रों</HL> से व्यापक चुनावी प्रचार, तथा <HL>UNICEF</HL> एवं <HL>World Bank</HL> की जनहितकारी योजनाओं का <HL>व्यापक प्रसारण</HL>।
            </div>
          </div>

          {/* Screen 6 Footer */}
          <div className="border-t border-[#D5A04A] pt-2 mt-3 flex justify-between text-[11px] font-bold text-[#444444]">
            <span>बी.एस.आर. फिल्म्स रायपुर • <strong className="text-[#8C4E00]">भीष्मदेव चतुर्वेदी</strong></span>
            <span>6 / 7</span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCREEN 7: OFFICIAL CONTACT & ROYAL SEAL SIGN-OFF
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-2 border-[#8C4E00] rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden break-inside-avoid print:border-none print:shadow-none print:rounded-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#8C4E00] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Image src="/bsr-icon.webp" alt="Logo" width={34} height={34} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#0A0A0A] leading-tight">भीष्मदेव चतुर्वेदी</h2>
                <p className="text-[10px] sm:text-xs font-bold text-[#8C4E00] uppercase tracking-wide">
                  आधिकारिक संपर्क एवं कार्यालय विवरण
                </p>
              </div>
            </div>
            <div className="text-right text-[10px] sm:text-xs text-[#333333] font-bold leading-tight">
              राजधानी रायपुर<br />छत्तीसगढ़
            </div>
          </div>

          <div className="mb-4">
            <div className="border-b-[1.8px] border-[#8C4E00] pb-1 mb-3">
              <span className="text-sm sm:text-base font-black text-[#0A0A0A]">आधिकारिक संपर्क एवं स्टूडियो कार्यालय</span>
              <span className="text-[11px] font-bold text-[#8C4E00] float-right">राजधानी रायपुर (छ.ग.)</span>
            </div>

            <div className="bg-[#FFFDF8] border-2 border-[#8C4E00] rounded-xl p-4 mb-3 leading-relaxed text-xs sm:text-sm text-[#111111]">
              <p className="mb-2">
                <strong className="text-[#8C4E00] text-xs block mb-0.5">स्थाई कार्यालय पता:</strong>
                राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 4920013 ( छ ग)
              </p>
              <p className="mb-2">
                <strong className="text-[#8C4E00] text-xs block mb-0.5">दूरभाष / मोबाइल संपर्क:</strong>
                <span className="text-base sm:text-lg font-black text-[#0A0A0A] block">
                  <a href="tel:7000866323" className="hover:text-[#8C4E00]">7000866323</a>,{" "}
                  <a href="tel:9826167533" className="hover:text-[#8C4E00]">9826167533</a>
                </span>
              </p>
              <p className="mb-2">
                <strong className="text-[#8C4E00] text-xs block mb-0.5">आधिकारिक ईमेल:</strong>
                <a href="mailto:bsrfilms2017@gmail.com" className="text-sm font-bold text-[#0A0A0A] hover:text-[#8C4E00]">
                  bsrfilms2017@gmail.com
                </a>
              </p>
              <p>
                <strong className="text-[#8C4E00] text-xs block mb-0.5">आधिकारिक वेबसाइट:</strong>
                <a href="https://www.bsrfilms.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#0A0A0A] hover:text-[#8C4E00] inline-flex items-center gap-1">
                  <span>www.bsrfilms.com</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C4E00]" />
                </a>
              </p>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5">
              <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide block mb-1">आजीवन सांस्कृतिक संकल्प</span>
              <p className="text-xs sm:text-sm font-bold text-[#0A0A0A] leading-relaxed">
                भारतीय कला, संस्कृति, साहित्य, अध्यात्म, राजनीति में विशेष रुचि। छत्तीसगढ़ी भाषा , लोक कला, संस्कृति, संस्कार का आजीवन विद्यार्थी।
              </p>
            </div>
          </div>

          {/* Big Royal Executive Seal & Authorized Signature Block */}
          <div className="flex items-center justify-between bg-[#FFFDF8] border-2 border-[#D5A04A] rounded-xl p-3.5 shadow-sm">
            <SvgSeal />
            <div className="text-right flex-1 pl-3.5">
              <p className="text-[10px] text-[#555555] mb-1">
                <HL>प्रमाणित:</HL> परिचय संचिका में अंकित समस्त विवरण <HL>अधिकृत अभिलेखों एवं अनुबंधों</HL> पर आधारित हैं।
              </p>
              <p className="text-lg sm:text-xl font-black text-[#8C4E00] leading-tight">
                ( भीष्मदेव चतुर्वेदी )
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#111111] mt-0.5">
                संस्थापक एवं निर्देशक • बी.एस.आर. फिल्म्स रायपुर
              </p>
            </div>
          </div>

          {/* Screen 7 Footer */}
          <div className="border-t border-[#D5A04A] pt-2 mt-3 flex justify-between text-[11px] font-bold text-[#444444]">
            <span>बी.एस.आर. फिल्म्स रायपुर • <strong className="text-[#8C4E00]">भीष्मदेव चतुर्वेदी</strong></span>
            <span>7 / 7</span>
          </div>
        </section>

      </main>

      {/* Sticky Mobile Quick Action Bar (Bottom of Screen on Mobile Phones) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-xl border-t border-[#D5A04A] px-3 py-2 md:hidden flex items-center justify-around gap-1.5 shadow-[0_-8px_25px_rgba(0,0,0,0.12)] no-print">
        <a
          href="tel:7000866323"
          className="flex-1 flex flex-col items-center justify-center py-1 text-[#333333] hover:text-[#8C4E00] transition-colors"
        >
          <Phone className="w-4 h-4 text-[#8C4E00] mb-0.5" />
          <span className="text-[0.65rem] font-bold">कॉल करें</span>
        </a>

        <a
          href={`https://wa.me/917000866323?text=${encodeURIComponent(
            "नमस्ते भीष्मदेव जी, मैं आपकी आधिकारिक प्रोफ़ाइल देखकर संपर्क कर रहा हूँ।"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1 text-[#333333] hover:text-[#25D366] transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366] mb-0.5" />
          <span className="text-[0.65rem] font-bold">व्हाट्सएप</span>
        </a>

        <a
          href="/Bhishmdev_Chaturvedi_Portfolio.pdf"
          download="Bhishmdev_Chaturvedi_Portfolio.pdf"
          className="flex-1 flex flex-col items-center justify-center py-1 text-[#8C4E00] hover:text-[#6E3C00] transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#8C4E00] mb-0.5" />
          <span className="text-[0.65rem] font-bold">PDF डाउनलोड</span>
        </a>

        <button
          onClick={handlePrint}
          className="flex-1 flex flex-col items-center justify-center py-1 text-[#333333] hover:text-[#8C4E00] transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4 text-[#8C4E00] mb-0.5" />
          <span className="text-[0.65rem] font-bold">प्रिंट</span>
        </button>

        <button
          onClick={handleShare}
          className="flex-1 flex flex-col items-center justify-center py-1 text-[#333333] hover:text-[#8C4E00] transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-[#8C4E00] mb-0.5" />
          <span className="text-[0.65rem] font-bold">शेयर</span>
        </button>
      </div>
    </div>
  );
}
