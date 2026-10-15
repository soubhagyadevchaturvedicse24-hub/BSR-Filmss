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
  Building2,
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

export default function CompanyProfile() {
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    document.body.classList.remove("loading");
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast(`${label} कॉपी किया गया!`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("कॉपी करने में असमर्थ");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "बी.एस.आर. फिल्म्स | कॉरपोरेट पोर्टफोलियो",
      text: "बी.एस.आर. फिल्म्स — फिल्म, टीवी, वृत्तचित्र एवं मीडिया प्रोडक्शन हाउस। 25+ वर्षों की संस्थागत विश्वसनीयता।",
      url: typeof window !== "undefined" ? window.location.href : "https://bsrfilms.com/company",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          handleCopy(shareData.url, "पोर्टफोलियो लिंक");
        }
      }
    } else {
      handleCopy(shareData.url, "पोर्टफोलियो लिंक");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-[#111111] font-sans antialiased pb-20 md:pb-12 select-text selection:bg-[#8C4E00] selection:text-white">
      <CustomCursor />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#0A0A0A] text-[#FAF2E3] border border-[#8C4E00] px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-2xl flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-[#C89038]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Floating Command Bar */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-xl border-b border-[#D5A04A] shadow-sm no-print">
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

            {/* A4 Print PDF Download */}
            <a
              href="/BSR_Films_Print_Portfolio_A4.pdf"
              download="BSR_Films_Print_Portfolio_A4.pdf"
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#8C4E00] hover:bg-[#6E3C00] text-white shadow-md transition-all active:scale-95 cursor-pointer"
              title="बी.एस.आर. फिल्म्स A4 प्रिंट संस्करण PDF डाउनलोड करें"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>A4 प्रिंट PDF</span>
            </a>

            {/* Direct PDF Download: Company Portfolio (Mobile/Digital) */}
            <a
              href="/BSR_Films_Business_Portfolio.pdf"
              download="BSR_Films_Business_Portfolio.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#FAF2E3] hover:bg-[#F2E5CE] text-[#5A2D00] border border-[#C89038] shadow-sm transition-all active:scale-95 cursor-pointer"
              title="बी.एस.आर. फिल्म्स मोबाइल डिजिटल PDF डाउनलोड करें"
            >
              <Download className="w-3.5 h-3.5 text-[#8C4E00]" />
              <span>मोबाइल PDF</span>
            </a>

            {/* Founder Portfolio Link */}
            <Link
              href="/founder"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#FAF2E3] hover:bg-[#F2E5CE] text-[#5A2D00] border border-[#C89038] shadow-sm transition-all active:scale-95"
              title="संस्थापक प्रोफाइल देखें"
            >
              <FileText className="w-3.5 h-3.5 text-[#8C4E00]" />
              <span className="hidden sm:inline">संस्थापक प्रोफाइल</span>
              <span className="inline sm:hidden">संस्थापक</span>
            </Link>

            {/* Print / Save as PDF */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FAF2E3] hover:bg-[#F2E5CE] text-[#663300] border border-[#C89038] transition-all active:scale-95 cursor-pointer"
              title="प्रोफ़ाइल प्रिंट करें या PDF सहेजें"
            >
              <Printer className="w-3.5 h-3.5 text-[#8C4E00]" />
              <span className="hidden sm:inline">प्रिंट</span>
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

      {/* Main Single-Page Continuous Dossier (Matching Company PDF 100% Verbatim) */}
      <main className="max-w-[460px] sm:max-w-xl md:max-w-2xl mx-auto px-3 sm:px-4 pt-6 space-y-6">

        {/* ═══════════════════════════════════════════════════════════════════
            SCREEN 1: BSR FILMS - CORPORATE OVERVIEW, LOGO SHOWCASE & CREDENTIALS
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-2 border-[#8C4E00] rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden break-inside-avoid print:border-none print:shadow-none print:rounded-none print:mb-12">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#8C4E00] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Image
                src="/bsr-icon.webp"
                alt="Logo"
                width={36}
                height={36}
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
              />
              <div>
                <h1 className="text-lg sm:text-xl font-black text-[#0A0A0A] leading-tight">बी.एस.आर. फिल्म्स</h1>
                <p className="text-[10px] sm:text-xs font-bold text-[#8C4E00] uppercase tracking-wide">
                  फिल्म, टीवी, वृत्तचित्र एवं मीडिया प्रोडक्शन हाउस
                </p>
              </div>
            </div>
            <div className="text-right text-[10px] sm:text-xs text-[#333333] font-bold leading-tight">
              25+ वर्ष उत्कृष्टता<br />
              संवाद &apos;ब&apos; श्रेणी • NFDC
            </div>
          </div>

          {/* Prominent Brand Logo Showcase Box */}
          <div className="bg-gradient-to-br from-[#FAF2E3] to-[#FFFDF8] border-2 border-[#8C4E00] rounded-xl p-3.5 text-center mb-3 shadow-sm">
            <div className="flex justify-center items-center mb-2">
              <Image
                src="/bsr-logo-clean.png"
                alt="बी.एस.आर. फिल्म्स Logo"
                width={180}
                height={68}
                className="h-12 w-auto max-w-[175px] object-contain drop-shadow-[0_2px_4px_rgba(140,78,0,0.22)]"
                priority
              />
            </div>
            <h2 className="text-lg sm:text-xl font-black text-[#0A0A0A] leading-tight">
              बी.एस.आर. फिल्म्स
            </h2>
            <p className="text-[11px] sm:text-xs font-bold text-[#8C4E00] uppercase tracking-wide mt-0.5">
              सेंट्रल इंडिया का प्रतिष्ठित मीडिया प्रोडक्शन हाउस
            </p>
            <p className="text-[11px] text-[#444444] font-medium mt-1">
              संस्कृति, सृजनात्मकता एवं अत्याधुनिक प्रसारण तकनीक का 25+ वर्षों का विश्वास
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 mt-2.5">
              <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full">
                छत्तीसगढ़ संवाद &apos;ब&apos; श्रेणी (पंजीयन सं. 489)
              </span>
              <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full">
                NFDC इम्पैनल्ड
              </span>
              <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full">
                प्रसार भारती अधिकृत
              </span>
            </div>
          </div>

          {/* 6 Key Production Metrics */}
          <div className="mb-3.5">
            <div className="flex items-center justify-between border-b-[1.8px] border-[#8C4E00] pb-1 mb-2.5">
              <span className="text-sm sm:text-base font-black text-[#0A0A0A]">प्रमुख सांख्यिकी एवं उपलब्धियां</span>
              <span className="text-[11px] font-bold text-[#8C4E00]">प्रमाणित मीडिया परिमाण</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="bg-[#FDFBF7] border border-[#D5A04A] rounded-xl p-2.5 text-center">
                <span className="text-xl sm:text-2xl font-black text-[#8C4E00] block leading-none">650+</span>
                <span className="text-xs sm:text-sm font-bold text-[#0A0A0A] block mt-1">विज्ञापन स्पॉट्स</span>
                <span className="text-[10px] text-[#555555] font-medium">Ad Films & Promos</span>
              </div>
              <div className="bg-[#FDFBF7] border border-[#D5A04A] rounded-xl p-2.5 text-center">
                <span className="text-xl sm:text-2xl font-black text-[#8C4E00] block leading-none">350+</span>
                <span className="text-xs sm:text-sm font-bold text-[#0A0A0A] block mt-1">वृत्तचित्र निर्माण</span>
                <span className="text-[10px] text-[#555555] font-medium">Research Docs</span>
              </div>
              <div className="bg-[#FDFBF7] border border-[#D5A04A] rounded-xl p-2.5 text-center">
                <span className="text-xl sm:text-2xl font-black text-[#8C4E00] block leading-none">500+</span>
                <span className="text-xs sm:text-sm font-bold text-[#0A0A0A] block mt-1">ऑडियो कार्यक्रम</span>
                <span className="text-[10px] text-[#555555] font-medium">Jingles & Radio</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#FDFBF7] border border-[#D5A04A] rounded-xl p-2.5 text-center">
                <span className="text-xl sm:text-2xl font-black text-[#8C4E00] block leading-none">400+</span>
                <span className="text-xs sm:text-sm font-bold text-[#0A0A0A] block mt-1">एनिमेशन व VFX</span>
                <span className="text-[10px] text-[#555555] font-medium">2D/3D Motion</span>
              </div>
              <div className="bg-[#FDFBF7] border border-[#D5A04A] rounded-xl p-2.5 text-center">
                <span className="text-xl sm:text-2xl font-black text-[#8C4E00] block leading-none">25+</span>
                <span className="text-xs sm:text-sm font-bold text-[#0A0A0A] block mt-1">वर्ष अनुभव</span>
                <span className="text-[10px] text-[#555555] font-medium">Industry Trust</span>
              </div>
              <div className="bg-[#FDFBF7] border border-[#D5A04A] rounded-xl p-2.5 text-center">
                <span className="text-xl sm:text-2xl font-black text-[#8C4E00] block leading-none">06</span>
                <span className="text-xs sm:text-sm font-bold text-[#0A0A0A] block mt-1">भाषाएं व बोलियां</span>
                <span className="text-[10px] text-[#555555] font-medium">Regional & National</span>
              </div>
            </div>
          </div>

          {/* Central Production Office on Page 1 */}
          <div className="bg-[#FFFDF8] border-2 border-[#8C4E00] rounded-xl p-3 sm:p-3.5 text-xs sm:text-sm text-[#111111]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">कार्यालय एवं प्रोडक्शन स्टूडियो</span>
              <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">राजधानी रायपुर</span>
            </div>
            <p className="leading-snug">
              <strong>पता:</strong> राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 492013 (छ.ग.)
            </p>
            <p className="mt-1.5 leading-snug">
              <strong>दूरभाष:</strong>{" "}
              <span className="font-bold text-[#0A0A0A]">
                <a href="tel:7000866323" className="hover:underline">7000866323</a>,{" "}
                <a href="tel:9826167533" className="hover:underline">9826167533</a>
              </span>
              {" • "}
              <strong>ईमेल:</strong> bsrfilms2017@gmail.com
            </p>
            <p className="mt-1">
              <strong>वेबसाइट:</strong> <span className="text-[#8C4E00] font-bold">www.bsrfilms.com</span>
            </p>
          </div>

          {/* Screen 1 Footer */}
          <div className="border-t border-[#D5A04A] pt-2 mt-3 flex justify-between text-[11px] font-bold text-[#444444]">
            <span><strong>बी.एस.आर. फिल्म्स</strong> • कॉरपोरेट प्रोफाइल • www.bsrfilms.com</span>
            <span>1 / 7</span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCREEN 2: PRODUCTION CAPABILITIES & INSTITUTIONAL CREDENTIALS
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-2 border-[#8C4E00] rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden break-inside-avoid print:border-none print:shadow-none print:rounded-none print:mb-12">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#8C4E00] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Image src="/bsr-icon.webp" alt="Logo" width={34} height={34} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#0A0A0A] leading-tight">बी.एस.आर. फिल्म्स</h2>
                <p className="text-[10px] sm:text-xs font-bold text-[#8C4E00] uppercase tracking-wide">
                  संस्थागत कार्यक्षेत्र, विधाएं एवं पंजीयन
                </p>
              </div>
            </div>
            <div className="text-right text-[10px] sm:text-xs text-[#333333] font-bold leading-tight">
              मल्टीमीडिया प्रोडक्शन<br />6 प्रमुख भाषाएं
            </div>
          </div>

          <div className="mb-3.5 space-y-2.5">
            <div className="flex items-center justify-between border-b-[1.8px] border-[#8C4E00] pb-1">
              <span className="text-sm sm:text-base font-black text-[#0A0A0A]">उत्पादन विधाएं एवं संस्थागत मान्यताएं</span>
              <span className="text-[11px] font-bold text-[#8C4E00]">पंजीकृत व अनुबंधित</span>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">संस्थागत पंजीयन (छत्तीसगढ़ संवाद)</span>
                <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">&apos;ब&apos; श्रेणी पंजीकृत</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0A0A0A]">
                छत्तीसगढ़ संवाद &apos;ब&apos; श्रेणी पंजीयन सं. 489
              </p>
              <p className="text-xs text-[#555555] mt-1">
                छत्तीसगढ़ शासन के सूचना एवं जनसंपर्क विभाग के अंतर्गत विज्ञापन, वीडियो स्पॉट्स एवं वृत्तचित्र निर्माण हेतु आधिकारिक रूप से पंजीकृत।
              </p>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5">
              <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide block mb-1">निर्माण विधाएं (Production Disciplines)</span>
              <p className="text-sm font-bold text-[#0A0A0A]">
                वृत्तचित्र, वीडियो स्पॉट्स, जिंगल्स, धारावाहिक व 3D एनिमेशन
              </p>
              <p className="text-xs text-[#555555] mt-1">
                सरकारी व गैर-सरकारी योजनाओं, सांस्कृतिक धरोहरों व कॉर्पोरेट अभियानों हेतु एंड-टू-एंड ऑडियो-विजुअल समाधान।
              </p>
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

          {/* Screen 2 Footer */}
          <div className="border-t border-[#D5A04A] pt-2 mt-3 flex justify-between text-[11px] font-bold text-[#444444]">
            <span><strong>बी.एस.आर. फिल्म्स</strong> • कॉरपोरेट प्रोफाइल • www.bsrfilms.com</span>
            <span>2 / 7</span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCREEN 3: TELEVISION BROADCAST & TELEFILM WING (DD RAIPUR)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-2 border-[#8C4E00] rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden break-inside-avoid print:border-none print:shadow-none print:rounded-none print:mb-12">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#8C4E00] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Image src="/bsr-icon.webp" alt="Logo" width={34} height={34} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#0A0A0A] leading-tight">बी.एस.आर. फिल्म्स</h2>
                <p className="text-[10px] sm:text-xs font-bold text-[#8C4E00] uppercase tracking-wide">
                  दूरदर्शन केंद्र रायपुर प्रसारण विंग
                </p>
              </div>
            </div>
            <div className="text-right text-[10px] sm:text-xs text-[#333333] font-bold leading-tight">
              टेलीफिल्म व धारावाहिक<br />DD Raipur
            </div>
          </div>

          <div className="mb-3.5 space-y-2.5">
            <div className="flex items-center justify-between border-b-[1.8px] border-[#8C4E00] pb-1">
              <span className="text-sm sm:text-base font-black text-[#0A0A0A]">दूरदर्शन केंद्र रायपुर</span>
              <span className="text-[11px] font-bold text-[#8C4E00]">टेलीफिल्म, धारावाहिक व एंकरिंग</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#FDFBF7] border border-[#D5A04A] rounded-xl p-3 text-center">
                <span className="text-3xl font-black text-[#8C4E00] block leading-none">15</span>
                <span className="text-sm font-bold text-[#0A0A0A] block mt-1">15 टेलीफिल्म</span>
                <span className="text-[11px] text-[#555555] font-medium">लेखन व निर्देशन • दूरदर्शन</span>
              </div>
              <div className="bg-[#FDFBF7] border border-[#D5A04A] rounded-xl p-3 text-center">
                <span className="text-3xl font-black text-[#8C4E00] block leading-none">5</span>
                <span className="text-sm font-bold text-[#0A0A0A] block mt-1">5 सीरियल</span>
                <span className="text-[11px] text-[#555555] font-medium">लेखन, निर्देशन व संचालन</span>
              </div>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5">
              <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide block mb-1">वीडियो स्पॉट्स निर्माण</span>
              <p className="text-sm sm:text-base font-bold text-[#0A0A0A]">
                दूरदर्शन रायपुर का प्रथम वीडियो स्पॉट लेखन व निर्देशन सहित 80 से अधिक वीडियो स्पॉट्स
              </p>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5">
              <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide block mb-1">विशेष प्रसारण</span>
              <p className="text-sm font-bold text-[#0A0A0A]">
                विभिन्न राष्ट्रीय और क्षेत्रीय कार्यक्रमों का लेखन व निर्देशन
              </p>
              <p className="text-xs text-[#555555] mt-1">
                राज्य एवं राष्ट्रीय स्तर के प्रतिष्ठित आयोजनों का संयोजन व निर्देशन।
              </p>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5">
              <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide block mb-1.5">दूरदर्शन रायपुर के प्रमुख कार्यक्रम (एंकर):</span>
              <div className="flex flex-wrap gap-1.5">
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

          {/* Screen 3 Footer */}
          <div className="border-t border-[#D5A04A] pt-2 mt-3 flex justify-between text-[11px] font-bold text-[#444444]">
            <span><strong>बी.एस.आर. फिल्म्स</strong> • कॉरपोरेट प्रोफाइल • www.bsrfilms.com</span>
            <span>3 / 7</span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCREEN 4: AUDIO, RADIO BROADCASTING & SOUND PRODUCTION
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-2 border-[#8C4E00] rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden break-inside-avoid print:border-none print:shadow-none print:rounded-none print:mb-12">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#8C4E00] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Image src="/bsr-icon.webp" alt="Logo" width={34} height={34} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#0A0A0A] leading-tight">बी.एस.आर. फिल्म्स</h2>
                <p className="text-[10px] sm:text-xs font-bold text-[#8C4E00] uppercase tracking-wide">
                  आकाशवाणी रायपुर एवं ऑडियो विंग
                </p>
              </div>
            </div>
            <div className="text-right text-[10px] sm:text-xs text-[#333333] font-bold leading-tight">
              30+ वर्ष अनुभव<br />AIR Raipur
            </div>
          </div>

          <div className="mb-3.5 space-y-2.5">
            <div className="flex items-center justify-between border-b-[1.8px] border-[#8C4E00] pb-1">
              <span className="text-sm sm:text-base font-black text-[#0A0A0A]">अनुभव — आकाशवाणी रायपुर</span>
              <span className="text-[11px] font-bold text-[#8C4E00]">तीन दशकों की रेडियो प्रसारण यात्रा</span>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">उद्घोषणा व संचालन</span>
                <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">लगभग 30 वर्ष</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0A0A0A]">नैमेत्तिक कंपियर - ( लगभग 30 वर्ष )</p>
              <p className="text-xs text-[#555555] mt-1">(आकाशवाणी रायपुर में चौपाल और श्रमिक जगत कार्यक्रम में अनुबंधित)</p>
            </div>

            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3.5">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">नाट्य कलाकार</span>
                <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">बी हाइग्रेड</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#0A0A0A]">आकाशवाणी रायपुर से नाटक में &quot; बी हाइग्रेड &quot; कलाकार</p>
              <p className="text-xs text-[#555555] mt-1">प्रसार भारती द्वारा आधिकारिक रूप से वर्गीकृत उच्च कोटि के नाट्य अभिनेता।</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">रेडियो रूपक</span>
                  <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">50 अनुबंध</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#0A0A0A]">50 रेडियो रूपक लेखन निर्माण अनुबंध</p>
                <p className="text-[11px] text-[#555555] mt-1 font-medium">विभिन्न सामाजिक व लोक विषयों पर 50 रूपकों का सफल निर्माण।</p>
              </div>

              <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">रेडियो नाटक</span>
                  <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">10 नाटक</span>
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
            <span><strong>बी.एस.आर. फिल्म्स</strong> • कॉरपोरेट प्रोफाइल • www.bsrfilms.com</span>
            <span>4 / 7</span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCREEN 5: STRATEGIC CAMPAIGNS & GLOBAL MISSIONS
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-2 border-[#8C4E00] rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden break-inside-avoid print:border-none print:shadow-none print:rounded-none print:mb-12">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#8C4E00] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Image src="/bsr-icon.webp" alt="Logo" width={34} height={34} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#0A0A0A] leading-tight">बी.एस.आर. फिल्म्स</h2>
                <p className="text-[10px] sm:text-xs font-bold text-[#8C4E00] uppercase tracking-wide">
                  प्रतिष्ठित क्लाइंट्स, संस्थाएं एवं राष्ट्रीय अभियान
                </p>
              </div>
            </div>
            <div className="text-right text-[10px] sm:text-xs text-[#333333] font-bold leading-tight">
              24+ प्रमुख संस्थाएं<br />राष्ट्रीय व वैश्विक क्लाइंट्स
            </div>
          </div>

          <div className="mb-3.5 space-y-2.5">
            <div className="flex items-center justify-between border-b-[1.8px] border-[#8C4E00] pb-1">
              <span className="text-sm sm:text-base font-black text-[#0A0A0A]">प्रतिष्ठित क्लाइंट्स, शासकीय विभाग एवं राष्ट्रीय अभियान</span>
              <span className="text-[11px] font-bold text-[#8C4E00]">24+ प्रमाणित संस्थाएं</span>
            </div>

            {/* 1. International & National Organizations (10) */}
            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-[10px] sm:text-xs font-bold text-[#8C4E00] uppercase tracking-wide">अंतर्राष्ट्रीय एवं राष्ट्रीय संगठन (10 संस्थाएं)</span>
                <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded">Global & National Bodies</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['World Bank', 'NABARD', 'UNICEF', 'SHRC', 'CHRI', 'IFFCO', 'Birla Group', 'DDUGKY', 'SRLM', 'PRIYA NGO'].map((org) => (
                  <span key={org} className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-md">
                    {org}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Government Departments & Agencies (14) */}
            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-[10px] sm:text-xs font-bold text-[#8C4E00] uppercase tracking-wide">शासकीय विभाग एवं राज्य आयोग (14 विभाग)</span>
                <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded">Government & Public Sector</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'जनसंपर्क विभाग (DPR)',
                  'श्रम विभाग (Labour)',
                  'पंचायत एवं ग्रामीण विकास',
                  'लोक स्वास्थ्य यांत्रिकी (PHED)',
                  'नगरीय प्रशासन',
                  'स्वास्थ्य एवं परिवार कल्याण',
                  'महिला एवं बाल विकास',
                  'स्कूल शिक्षा विभाग',
                  'जल संसाधन विभाग',
                  'कृषि विभाग',
                  'वन विभाग',
                  'समाज कल्याण विभाग',
                  'छत्तीसगढ़ पुलिस (CG Police)',
                  'छत्तीसगढ़ राज्य महिला आयोग'
                ].map((dept) => (
                  <span key={dept} className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10.5px] sm:text-xs font-bold px-2 py-0.5 rounded-md">
                    {dept}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Historic Election Campaigns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">विधान सभा चुनाव 2013</span>
                  <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">06 आकाशवाणी केंद्र</span>
                </div>
                <p className="text-xs text-[#111111] font-semibold leading-relaxed">
                  प्रदेश के 06 आकाशवाणी केन्द्रों से रेडियो जिंगल निर्माण व व्यापक प्रसारण हेतु अनुबंधित अधिकृत एजेंसी।
                </p>
              </div>

              <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">लोक सभा चुनाव 2014</span>
                  <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">06 आकाशवाणी केंद्र</span>
                </div>
                <p className="text-xs text-[#111111] font-semibold leading-relaxed">
                  प्रदेश के 06 आकाशवाणी केन्द्रों से रेडियो जिंगल निर्माण व राष्ट्रव्यापी प्रसारण समन्वय हेतु अनुबंधित एजेंसी।
                </p>
              </div>
            </div>
          </div>

          {/* Big Victory Medal Banner */}
          <div className="flex items-center gap-3.5 bg-[#FFFDF8] border-2 border-[#D5A04A] rounded-xl p-3.5 shadow-sm">
            <SvgAward />
            <div className="text-xs sm:text-sm text-[#333333] leading-relaxed font-semibold">
              <strong className="text-sm font-black text-[#8C4E00] block mb-0.5">प्रतिष्ठित क्लाइंट्स व राष्ट्रीय अभियानों का सशक्त संचार:</strong>
              <HL>World Bank</HL>, <HL>UNICEF</HL>, <HL>NABARD</HL>, <HL>Birla Group</HL> सहित <HL>24+ राष्ट्रीय संस्थाओं व शासकीय विभागों</HL> हेतु वृत्तचित्र, जिंगल व प्रचार स्पॉट्स निर्माण, तथा <HL>2013 विधानसभा</HL> व <HL>2014 लोकसभा चुनावों</HL> में <HL>6 आकाशवाणी केंद्रों</HL> से व्यापक प्रसारण।
            </div>
          </div>

          {/* Screen 5 Footer */}
          <div className="border-t border-[#D5A04A] pt-2 mt-3 flex justify-between text-[11px] font-bold text-[#444444]">
            <span><strong>बी.एस.आर. फिल्म्स</strong> • कॉरपोरेट प्रोफाइल • www.bsrfilms.com</span>
            <span>5 / 7</span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCREEN 6: FOUNDER & CREATIVE DIRECTOR - LEADERSHIP
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-2 border-[#8C4E00] rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden break-inside-avoid print:border-none print:shadow-none print:rounded-none print:mb-12">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#8C4E00] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Image src="/bsr-icon.webp" alt="Logo" width={34} height={34} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#0A0A0A] leading-tight">बी.एस.आर. फिल्म्स</h2>
                <p className="text-[10px] sm:text-xs font-bold text-[#8C4E00] uppercase tracking-wide">
                  संस्थापक एवं सृजनात्मक नेतृत्व
                </p>
              </div>
            </div>
            <div className="text-right text-[10px] sm:text-xs text-[#333333] font-bold leading-tight">
              क्रिएटिव विज़न<br />भीष्मदेव चतुर्वेदी
            </div>
          </div>

          {/* Founder Executive Card */}
          <div className="flex items-center gap-3 bg-[#FFFDF8] border-2 border-[#8C4E00] rounded-xl p-3 mb-3 shadow-sm">
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-[#D5A04A] flex-shrink-0 bg-[#FAF2E3] shadow-md">
              <Image src="/team/bhishma.webp" alt="भीष्मदेव चतुर्वेदी" fill className="object-cover object-top" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#0A0A0A] leading-tight">भीष्मदेव चतुर्वेदी</h3>
              <p className="text-[11px] font-bold text-[#8C4E00] uppercase">संस्थापक एवं मुख्य निर्देशक • बी.एस.आर. फिल्म्स</p>
              <p className="text-[10px] text-[#444444] font-semibold mt-1">
                लेखक • निर्देशक • निर्माता • गीतकार • कवि • मंच संचालन • समाजसेवा
              </p>
            </div>
          </div>

          {/* Studies Grid */}
          <div className="mb-3 space-y-2">
            <div className="flex items-center justify-between border-b-[1.8px] border-[#8C4E00] pb-1">
              <span className="text-sm sm:text-base font-black text-[#0A0A0A]">शिक्षा एवं शैक्षणिक योग्यता</span>
              <span className="text-[11px] font-bold text-[#8C4E00]">डिग्री, पत्रकारिता, लोक संगीत व वाणी दीक्षा</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                <p className="text-sm sm:text-base font-bold text-[#0A0A0A] mt-0.5">डिप्लोमा इन लोक संगीत ( इंदिरा कला संगीत वि.वि. खैरागढ़)</p>
              </div>

              <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">प्रसारण प्रमाणन</span>
                <p className="text-sm sm:text-base font-bold text-[#0A0A0A] mt-0.5">वाणी कोर्स ( प्रसार भारती )</p>
              </div>
            </div>
          </div>

          {/* Organizational Leadership (Free of RSS/ABVP) */}
          <div className="mb-3.5 space-y-2">
            <div className="bg-[#FDFBF7] border border-[#D8CDB8] rounded-xl p-3">
              <div className="flex justify-between items-baseline mb-0.5">
                <span className="text-[10px] font-bold text-[#8C4E00] uppercase tracking-wide">सिनेमा व टेलीविजन प्रोड्यूसर्स संगठन</span>
                <span className="bg-[#FAF2E3] border border-[#C89038] text-[#5A2D00] text-[10px] font-bold px-2 py-0.5 rounded">संस्थापक सदस्य</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#0A0A0A]">
                CCTPA ( Chhattisgarh Cine And Television Producers Association ) का फाउंडर सदस्य
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

          {/* Screen 6 Footer */}
          <div className="border-t border-[#D5A04A] pt-2 mt-3 flex justify-between text-[11px] font-bold text-[#444444]">
            <span><strong>बी.एस.आर. फिल्म्स</strong> • कॉरपोरेट प्रोफाइल • www.bsrfilms.com</span>
            <span>6 / 7</span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SCREEN 7: OFFICIAL CONTACT, STUDIO INFRASTRUCTURE & ROYAL SEAL
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="bg-white border-2 border-[#8C4E00] rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden break-inside-avoid print:border-none print:shadow-none print:rounded-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#8C4E00] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Image src="/bsr-icon.webp" alt="Logo" width={34} height={34} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#0A0A0A] leading-tight">बी.एस.आर. फिल्म्स</h2>
                <p className="text-[10px] sm:text-xs font-bold text-[#8C4E00] uppercase tracking-wide">
                  आधिकारिक संपर्क, स्टूडियो एवं संचिका
                </p>
              </div>
            </div>
            <div className="text-right text-[10px] sm:text-xs text-[#333333] font-bold leading-tight">
              राजधानी रायपुर<br />छत्तीसगढ़
            </div>
          </div>

          <div className="mb-4">
            <div className="border-b-[1.8px] border-[#8C4E00] pb-1 mb-3">
              <span className="text-sm sm:text-base font-black text-[#0A0A0A]">आधिकारिक संपर्क एवं प्रोडक्शन स्टूडियो</span>
              <span className="text-[11px] font-bold text-[#8C4E00] float-right">राजधानी रायपुर (छ.ग.)</span>
            </div>

            <div className="bg-[#FFFDF8] border-2 border-[#8C4E00] rounded-xl p-4 mb-3 leading-relaxed text-xs sm:text-sm text-[#111111]">
              <p className="mb-2">
                <strong className="text-[#8C4E00] text-xs block mb-0.5">स्थाई कार्यालय पता:</strong>
                राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 492013 ( छ ग)
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

          {/* Big Royal Corporate Seal & Authorized Signature Block */}
          <div className="flex items-center justify-between bg-[#FFFDF8] border-2 border-[#D5A04A] rounded-xl p-3.5 shadow-sm">
            <SvgSeal />
            <div className="text-right flex-1 pl-3.5">
              <p className="text-[10px] text-[#555555] mb-1">
                <HL>प्रमाणित:</HL> संचिका में अंकित समस्त विवरण बी.एस.आर. फिल्म्स के <HL>अधिकृत अभिलेखों एवं अनुबंधों</HL> पर आधारित हैं।
              </p>
              <p className="text-lg sm:text-xl font-black text-[#8C4E00] leading-tight">
                बी.एस.आर. फिल्म्स
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#111111] mt-0.5">
                अधिकृत हस्ताक्षरकर्ता • संस्थापक एवं निर्देशक
              </p>
            </div>
          </div>

          {/* Screen 7 Footer */}
          <div className="border-t border-[#D5A04A] pt-2 mt-3 flex justify-between text-[11px] font-bold text-[#444444]">
            <span><strong>बी.एस.आर. फिल्म्स</strong> • कॉरपोरेट प्रोफाइल • www.bsrfilms.com</span>
            <span>7 / 7</span>
          </div>
        </section>

      </main>

      {/* Sticky Mobile Quick Action Bar */}
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
            "नमस्ते, मैं बी.एस.आर. फिल्म्स की कॉरपोरेट प्रोफ़ाइल देखकर संपर्क कर रहा हूँ।"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1 text-[#333333] hover:text-[#25D366] transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366] mb-0.5" />
          <span className="text-[0.65rem] font-bold">व्हाट्सएप</span>
        </a>

        <a
          href="/BSR_Films_Print_Portfolio_A4.pdf"
          download="BSR_Films_Print_Portfolio_A4.pdf"
          className="flex-1 flex flex-col items-center justify-center py-1 text-[#8C4E00] hover:text-[#6E3C00] transition-colors cursor-pointer"
          title="A4 प्रिंट PDF डाउनलोड करें"
        >
          <Printer className="w-4 h-4 text-[#8C4E00] mb-0.5" />
          <span className="text-[0.65rem] font-bold">A4 प्रिंट</span>
        </a>

        <Link
          href="/founder"
          className="flex-1 flex flex-col items-center justify-center py-1 text-[#333333] hover:text-[#8C4E00] transition-colors cursor-pointer"
        >
          <FileText className="w-4 h-4 text-[#8C4E00] mb-0.5" />
          <span className="text-[0.65rem] font-bold">संस्थापक</span>
        </Link>

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
