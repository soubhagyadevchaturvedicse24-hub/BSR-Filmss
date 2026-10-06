"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Radio,
  Tv,
  Film,
  BookOpen,
  Heart,
  Phone,
  Mail,
  Globe,
  Share2,
  Check,
  MapPin,
  Sparkles,
  Download,
  ArrowLeft,
  MessageSquare,
  Building2,
  Languages,
  CheckCircle2,
  ExternalLink,
  Printer,
  FileText,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import CustomCursor from "./CustomCursor";
import { useLanguage } from "@/context/LanguageContext";

interface StatItem {
  number: string;
  label: string;
  sub: string;
}

const milestoneStats: StatItem[] = [
  {
    number: "650+",
    label: "वीडियो स्पॉट्स",
    sub: "विज्ञापन व जनहित संदेश निर्माण",
  },
  {
    number: "350+",
    label: "डॉक्यूमेंट्री / वृत्तचित्र",
    sub: "डॉक्यूड्रामा व लघु वृत्तचित्र निर्माण",
  },
  {
    number: "550+",
    label: "रेडियो एपिसोड्स",
    sub: "हिंदी एवं छत्तीसगढ़ी धारावाहिक",
  },
  {
    number: "437+",
    label: "जिंगल व वीडियो स्पॉट्स",
    sub: "रेडियो जिंगल और वीडियो स्पॉट",
  },
  {
    number: "12+",
    label: "3D एनिमेशन",
    sub: "थ्री डी एनिमेशन फिल्म निर्माण",
  },
  {
    number: "30+ वर्ष",
    label: "आकाशवाणी कंपियर",
    sub: "चौपाल व श्रमिक जगत प्रसारण",
  },
];

const rolesList = [
  "लेखक",
  "निर्देशक (डायरेक्टर)",
  "निर्माता (प्रोडयूसर)",
  "गीतकार",
  "कवि",
  "मंच संचालन",
  "समाजसेवा",
];

const languagesList = [
  "हिंदी",
  "छत्तीसगढ़ी",
  "गोंडी",
  "हल्बी",
  "सरगुजिहा",
  "अंग्रेजी",
];

export default function FounderProfile() {
  const { isHindi } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    // Clear initial loading class to guarantee instant display on direct URL load
    document.body.classList.remove("loading");
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleShare = async () => {
    const shareData = {
      title: "भीष्मदेव चतुर्वेदी | संस्थापक एवं निर्देशक — BSR Films",
      text: "श्री भीष्मदेव चतुर्वेदी — लेखक, निर्देशक, निर्माता। 30+ वर्षों का आकाशवाणी व दूरदर्शन अनुभव। विस्तृत प्रोफ़ाइल देखें:",
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
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 pb-24 md:pb-16 selection:bg-[#E3A652]/30 selection:text-white print:p-0 print:bg-white print:text-black">
      {/* Luxury Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Print-Only Executive Letterhead / Dossier Header */}
      <div className="hidden print:flex items-center justify-between pb-6 mb-8 border-b-2 border-[#8C4E00]">
        <div className="flex items-center gap-4">
          <Image
            src="/bsr-icon.webp"
            alt="BSR Films Logo"
            width={64}
            height={64}
            className="w-16 h-16 object-contain"
          />
          <div>
            <h1 className="text-2xl font-black tracking-tight text-black">बी.एस.आर. फिल्म्स रायपुर</h1>
            <p className="text-xs text-[#8C4E00] font-bold uppercase tracking-wider">
              BSR FILMS RAIPUR • आधिकारिक परिचय संचिका (OFFICIAL DOSSIER)
            </p>
          </div>
        </div>
        <div className="text-right text-xs text-neutral-800 leading-snug">
          <p className="font-bold text-black text-sm">www.bsrfilms.com</p>
          <p>+91 7000866323 • +91 9826167533</p>
          <p>bsrfilms2017@gmail.com</p>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#12141c] text-white border border-[#E3A652]/50 px-5 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-2.5 text-xs sm:text-sm font-medium backdrop-blur-md no-print"
          >
            <Check className="w-4 h-4 text-[#E3A652]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Floating Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-white/10 transition-colors no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold tracking-wide text-white/80 hover:text-[#E3A652] transition-colors group flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform flex-shrink-0" />
            <span className="hidden sm:inline">बी.एस.आर. फिल्म्स मुख्य पृष्ठ</span>
            <span className="inline sm:hidden">मुख्य पृष्ठ</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bilingual Switcher */}
            <LanguageToggle />

            {/* Dark / Light Theme Switcher */}
            <ThemeToggle />

            {/* Direct PDF Download Button */}
            <a
              href="/Bhishmdev_Chaturvedi_Portfolio.pdf"
              download="Bhishmdev_Chaturvedi_Portfolio.pdf"
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#E3A652] hover:bg-[#F4D090] text-[#050608] shadow-md shadow-[#E3A652]/20 transition-all active:scale-95 cursor-pointer"
              title="पोर्टफोलियो PDF सीधे डाउनलोड करें"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF डाउनलोड</span>
            </a>

            {/* Print / Save as PDF Button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all active:scale-95 cursor-pointer"
              title="प्रोफ़ाइल प्रिंट करें या PDF सहेजें"
            >
              <Printer className="w-3.5 h-3.5 text-[#E3A652]" />
              <span className="hidden sm:inline">PDF प्रिंट</span>
              <span className="inline sm:hidden">प्रिंट</span>
            </button>

            {/* Share Profile Button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#E3A652]/15 hover:bg-[#E3A652]/25 text-[#E3A652] border border-[#E3A652]/30 transition-all active:scale-95 cursor-pointer"
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
                  <span className="hidden sm:inline">साझा करें</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section: Portrait & Lineage */}
      <section className="relative pt-6 sm:pt-10 pb-8 sm:pb-12 px-4 sm:px-6 overflow-hidden">
        {/* Subtle Ambient Background Gradients */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#E3A652]/10 via-[#E3A652]/5 to-transparent blur-3xl pointer-events-none -z-10"
        />

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Founder Portrait Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-5 flex flex-col items-center text-center"
            >
              <div className="relative group">
                {/* Golden Animated Rim */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#E3A652] via-[#F4D090] to-[#E3A652]/40 rounded-3xl blur-sm opacity-70 group-hover:opacity-100 transition duration-700" />

                <div className="relative w-56 sm:w-64 md:w-72 aspect-[4/5] rounded-2xl overflow-hidden bg-[#0A0C10] border border-[#E3A652]/40 shadow-2xl">
                  <Image
                    src="/team/bhishma.webp"
                    alt="भीष्मदेव चतुर्वेदी - संस्थापक, बी.एस.आर. फिल्म्स"
                    fill
                    sizes="(max-width: 768px) 256px, 288px"
                    priority
                    className="object-cover object-top filter contrast-[1.02] brightness-[1.01]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Badge over photo */}
                  <div className="absolute bottom-3 inset-x-3 text-center">
                    <span className="inline-block px-3 py-1 rounded-full text-[0.7rem] sm:text-xs font-bold uppercase tracking-wider bg-[#E3A652] text-[#050608] shadow-md">
                      संस्थापक एवं निर्देशक (BSR Films)
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Contact Action Pills under photo */}
              <div className="mt-5 flex flex-wrap justify-center gap-2 no-print">
                <a
                  href="tel:7000866323"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E3A652]" />
                  <span>7000866323</span>
                </a>
                <a
                  href="tel:9826167533"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E3A652]" />
                  <span>9826167533</span>
                </a>
                <a
                  href={`https://wa.me/917000866323?text=${encodeURIComponent(
                    "नमस्ते भीष्मदेव जी, मैं आपकी प्रोफ़ाइल देखकर संपर्क कर रहा हूँ।"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 transition-all active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>व्हाट्सएप</span>
                </a>
                <button
                  onClick={downloadVCard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#E3A652]/10 hover:bg-[#E3A652]/20 text-[#E3A652] border border-[#E3A652]/30 transition-all active:scale-95 cursor-pointer"
                  title="संपर्क सहेजें (.vcf)"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>vCard सहेजें</span>
                </button>
              </div>
            </motion.div>

            {/* Founder Biography & Exact Credentials Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="md:col-span-7 flex flex-col justify-center text-left"
            >
              {/* Institution Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-[#E3A652]/15 text-[#E3A652] border border-[#E3A652]/30 w-fit mb-3.5 shadow-sm">
                <Building2 className="w-4 h-4" />
                <span>फर्म - बी.एस.आर.फिल्मस रायपुर</span>
              </div>

              {/* Exact Name */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-2 font-serif leading-tight drop-shadow-md">
                भीष्मदेव चतुर्वेदी
              </h1>

              {/* Lineage Card (Exact Text Preserved Verbatim) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/15 my-3 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#E3A652]" />
                <p className="text-base sm:text-lg text-white/95 leading-relaxed font-bold">
                  पिता - स्व.श्री दीनानाथ चतुर्वेदी
                </p>
                <p className="text-sm sm:text-base text-white/85 mt-1 leading-relaxed font-medium">
                  ( स्वयं सेवक RSS, सेवा निवृत शिक्षक, रामायणविद, पूर्व मंडल अध्यक्ष भाजपा )
                </p>
              </div>

              {/* Exact Roles Pills (Verbatim) */}
              <div className="flex flex-wrap gap-2 my-3">
                {rolesList.map((r) => (
                  <span
                    key={r}
                    className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-[#E3A652]/15 text-[#E3A652] border border-[#E3A652]/30 shadow-sm"
                  >
                    {r}
                  </span>
                ))}
              </div>

              {/* Quick Contact Strip */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 mt-2 space-y-1 text-xs sm:text-sm text-white/80">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#E3A652] flex-shrink-0" />
                  <span>राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 4920013 ( छ ग)</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#E3A652] flex-shrink-0" />
                  <span className="font-mono">मोबाइल: 7000866323, 9826167533</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#E3A652] flex-shrink-0" />
                  <span className="font-mono">मेल: bsrfilms2017@gmail.com</span>
                  <span className="mx-1">•</span>
                  <Globe className="w-3.5 h-3.5 text-[#E3A652] flex-shrink-0" />
                  <span>Web: www.bsrfilms.com</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Numbers / Milestone Stats Bento Grid */}
      <section className="py-6 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {milestoneStats.map((s, idx) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/15 transition-all text-center flex flex-col justify-center shadow-md break-inside-avoid"
              >
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#E3A652] font-mono leading-none mb-1.5">
                  {s.number}
                </span>
                <span className="text-sm sm:text-base font-extrabold text-white leading-tight">
                  {s.label}
                </span>
                <span className="text-xs text-white/70 mt-1 leading-snug">
                  {s.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Section Jump Anchors (No clicking required to reveal content, everything is in one page) */}
      <section className="sticky top-14 sm:top-16 z-30 bg-[var(--bg-primary)]/95 backdrop-blur-md border-y border-white/10 py-2.5 px-4 sm:px-6 no-print">
        <div className="max-w-5xl mx-auto overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max text-xs sm:text-sm font-bold">
            <span className="text-[#E3A652] mr-1 hidden sm:inline">त्वरित अवलोकन:</span>
            <a
              href="#firm"
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#E3A652] text-white hover:text-black transition-all border border-white/10"
            >
              फर्म मान्यताएं
            </a>
            <a
              href="#air"
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#E3A652] text-white hover:text-black transition-all border border-white/10"
            >
              आकाशवाणी रायपुर
            </a>
            <a
              href="#dd"
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#E3A652] text-white hover:text-black transition-all border border-white/10"
            >
              दूरदर्शन केंद्र
            </a>
            <a
              href="#campaigns"
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#E3A652] text-white hover:text-black transition-all border border-white/10"
            >
              अभियान व अनुभव
            </a>
            <a
              href="#education"
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#E3A652] text-white hover:text-black transition-all border border-white/10"
            >
              शिक्षा
            </a>
            <a
              href="#culture"
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#E3A652] text-white hover:text-black transition-all border border-white/10"
            >
              सांस्कृतिक दायित्व
            </a>
            <a
              href="#contact"
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#E3A652] text-white hover:text-black transition-all border border-white/10"
            >
              संपर्क
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTINUOUS SINGLE-PAGE DOSSIER (ALL SECTIONS FULLY VISIBLE)
          ═══════════════════════════════════════════════════════════════════ */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-10">

        {/* ── 1. फर्म - बी.एस.आर.फिल्मस रायपुर (संस्थागत परिचय व मान्यताएं) ── */}
        <section id="firm" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden break-inside-avoid shadow-lg">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#E3A652]/15 flex items-center justify-center text-[#E3A652] flex-shrink-0">
              <Film className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
                फर्म - बी.एस.आर.फिल्मस रायपुर
              </h2>
              <p className="text-sm sm:text-base text-[#E3A652] font-bold mt-0.5">
                2000 से निरंतर आज पर्यंत कार्यशील
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 break-inside-avoid shadow-sm">
              <p className="text-xs sm:text-sm font-bold text-[#E3A652] uppercase tracking-wide">
                छत्तीसगढ़ संवाद
              </p>
              <p className="text-base sm:text-lg font-bold text-white mt-1">
                छत्तीसगढ़ संवाद से &quot; ब &quot; श्रेणी में इम्पेनल्ड
              </p>
              <p className="text-xs sm:text-sm text-white/75 mt-1.5 leading-relaxed font-normal">
                ( छत्तीसगढ़ संवाद में 2008 से आज पर्यंत ऑडियो वीडियो निर्माण हेतु पंजीकृत फर्म )
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 break-inside-avoid shadow-sm">
              <p className="text-xs sm:text-sm font-bold text-[#E3A652] uppercase tracking-wide">
                राष्ट्रीय अनुसूचित संस्था
              </p>
              <p className="text-base sm:text-lg font-bold text-white mt-1">
                NFDC ( नेशनल फिल्म डेवलपमेंट कार्पोरेशन, नई दिल्ली) में अनुसूचित (एनलिस्टेड)
              </p>
              <p className="text-xs sm:text-sm text-white/75 mt-1.5 leading-relaxed font-normal">
                भारत सरकार के राष्ट्रीय फिल्म विकास निगम में आधिकारिक रूप से सूचीबद्ध।
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 break-inside-avoid shadow-sm">
              <p className="text-xs sm:text-sm font-bold text-[#E3A652] uppercase tracking-wide">
                प्रसार भारती
              </p>
              <p className="text-base sm:text-lg font-bold text-white mt-1">
                प्रसार भारती के केंद्रीय विक्रय एकांश में पंजीकृत एजेंसी
              </p>
              <p className="text-xs sm:text-sm text-white/75 mt-1.5 leading-relaxed font-normal">
                दूरदर्शन एवं आकाशवाणी नेटवर्क पर राष्ट्रीय प्रसारण हेतु पंजीकृत।
              </p>
            </div>
          </div>

          {/* कार्यक्षेत्र भाषाएं एवं बोलियां */}
          <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center gap-3 break-inside-avoid">
            <span className="text-sm font-bold text-[#E3A652] flex items-center gap-1.5">
              <Languages className="w-4 h-4" /> कार्यक्षेत्र भाषाएं एवं बोलियां:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {languagesList.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 rounded-lg text-xs sm:text-sm font-bold bg-[#E3A652]/15 text-white border border-[#E3A652]/30"
                >
                  {lang}
                </span>
              ))}
              <span className="text-xs sm:text-sm text-white/80 font-medium">
                (हिंदी, छत्तीसगढ़ी, गोंडी, हल्बी, सरगुजिहा और अंग्रेजी भाषा/बोलियों में कार्य)
              </span>
            </div>
          </div>
        </section>

        {/* ── 2. अनुभव — आकाशवाणी रायपुर ── */}
        <section id="air" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden break-inside-avoid shadow-lg">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#E3A652]/15 flex items-center justify-center text-[#E3A652] flex-shrink-0">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
                अनुभव — आकाशवाणी रायपुर
              </h2>
              <p className="text-sm sm:text-base text-[#E3A652] font-bold mt-0.5">
                तीन दशकों की रेडियो प्रसारण, नाटक एवं रूपक यात्रा
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 break-inside-avoid">
              <div className="flex items-center gap-2 text-[#E3A652]">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">नैमेत्तिक कंपियर</span>
              </div>
              <p className="text-base sm:text-lg text-white font-bold leading-snug">
                नैमेत्तिक कंपियर - ( लगभग 30 वर्ष )
              </p>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                (आकाशवाणी रायपुर में चौपाल और श्रमिक जगत कार्यक्रम में अनुबंधित)
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 break-inside-avoid">
              <div className="flex items-center gap-2 text-[#E3A652]">
                <Award className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">नाट्य कलाकार</span>
              </div>
              <p className="text-base sm:text-lg text-white font-bold leading-snug">
                आकाशवाणी रायपुर से नाटक में &quot; बी हाइग्रेड &quot; कलाकार
              </p>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                प्रसार भारती द्वारा आधिकारिक रूप से वर्गीकृत उच्च श्रेणी रेडियो नाट्य अभिनेता।
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 break-inside-avoid">
              <div className="flex items-center gap-2 text-[#E3A652]">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">रेडियो रूपक</span>
              </div>
              <p className="text-base sm:text-lg text-white font-bold leading-snug">
                आकाशवाणी रायपुर के लिए 50 रेडियो रूपक लेखन निर्माण अनुबंध
              </p>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                विभिन्न सामाजिक, लोक एवं सांस्कृतिक विषयों पर 50 रेडियो रूपकों का लेखन व सफल निर्माण।
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 break-inside-avoid">
              <div className="flex items-center gap-2 text-[#E3A652]">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">रेडियो नाटक</span>
              </div>
              <p className="text-base sm:text-lg text-white font-bold leading-snug">
                आकाशवाणी रायपुर के लिए 10 नाटकों का लेखन व निर्माण अनुबंध
              </p>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                10 संपूर्ण रेडियो नाटकों का आधिकारिक लेखन एवं निर्माण अनुबंध सफलतापूर्वक संपन्न।
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/10 md:col-span-2 space-y-2 break-inside-avoid">
              <div className="flex items-center gap-2 text-[#E3A652]">
                <Sparkles className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">ऐतिहासिक रेडियो धारावाहिक</span>
              </div>
              <p className="text-base sm:text-lg text-white font-bold leading-snug">
                आकाशवाणी रायपुर से प्रथम रेडियो सीरियल सहित 6 रेडियो सीरियल (हिंदी एवं छत्तीसगढ़ी) लेखन के लिए अनुबंध
              </p>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                आकाशवाणी रायपुर के इतिहास के प्रथम धारावाहिक सहित 6 धारावाहिकों में 500 से अधिक कड़ियों का प्रसारण।
              </p>
            </div>
          </div>
        </section>

        {/* ── 3. अनुभव — दूरदर्शन केंद्र रायपुर ── */}
        <section id="dd" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden break-inside-avoid shadow-lg">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#E3A652]/15 flex items-center justify-center text-[#E3A652] flex-shrink-0">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
                दूरदर्शन केंद्र रायपुर
              </h2>
              <p className="text-sm sm:text-base text-[#E3A652] font-bold mt-0.5">
                टेलीफिल्म, धारावाहिक, वीडियो स्पॉट्स एवं प्रतिष्ठित मुख्य एंकरिंग
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center break-inside-avoid shadow-sm">
              <p className="text-4xl sm:text-5xl font-black text-[#E3A652] font-mono">15</p>
              <p className="text-base sm:text-lg font-bold text-white mt-1">
                15 टेलीफिल्म लेखन व निर्देशन
              </p>
              <p className="text-xs sm:text-sm text-white/70 mt-1">
                दूरदर्शन केंद्र रायपुर हेतु पूर्ण लेखन व निर्देशन
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center break-inside-avoid shadow-sm">
              <p className="text-4xl sm:text-5xl font-black text-[#E3A652] font-mono">5</p>
              <p className="text-base sm:text-lg font-bold text-white mt-1">
                5 सीरियल लेखन व निर्देशन व संचालन
              </p>
              <p className="text-xs sm:text-sm text-white/70 mt-1">
                लोकप्रिय धारावाहिकों का लेखन, निर्देशन व संचालन
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center sm:col-span-2 lg:col-span-1 break-inside-avoid shadow-sm">
              <p className="text-4xl sm:text-5xl font-black text-[#E3A652] font-mono">80+</p>
              <p className="text-base sm:text-lg font-bold text-white mt-1">
                80 से अधिक वीडियो स्पॉट्स
              </p>
              <p className="text-xs sm:text-sm text-white/70 mt-1">
                दूरदर्शन रायपुर का प्रथम वीडियो स्पॉट लेखन व निर्देशन सहित
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 mb-6 break-inside-avoid">
            <p className="text-base sm:text-lg font-bold text-white mb-1">
              विभिन्न राष्ट्रीय और क्षेत्रीय कार्यक्रमों का लेखन व निर्देशन
            </p>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
              राज्य एवं राष्ट्रीय स्तर के प्रतिष्ठित आयोजनों, विशेष प्रसारणों एवं सांस्कृतिक कार्यक्रमों का कुशल संयोजन व निर्देशन।
            </p>
          </div>

          {/* एंकरिंग के प्रमुख कार्यक्रम */}
          <div className="pt-4 border-t border-white/10 break-inside-avoid">
            <h3 className="text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E3A652]" />
              <span>दूरदर्शन रायपुर के प्रमुख कार्यक्रम (एंकर):</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                "एंकर - परिक्रमा",
                "हमर गांव",
                "नववर्ष विशेष कार्यक्रम",
                "भुइयां के गोठ",
                "कृषि दर्शन कार्यक्रम",
              ].map((show) => (
                <div
                  key={show}
                  className="px-4 py-3 rounded-xl bg-[#E3A652]/10 border border-[#E3A652]/30 text-xs sm:text-sm font-bold text-white flex items-center gap-2 shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-[#E3A652] flex-shrink-0" />
                  <span>{show}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. अनुभव — निर्माण, ऐतिहासिक चुनाव व अंतरराष्ट्रीय अभियान ── */}
        <section id="campaigns" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden break-inside-avoid shadow-lg">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#E3A652]/15 flex items-center justify-center text-[#E3A652] flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
                अनुभव — निर्माण, ऐतिहासिक चुनाव व अंतरराष्ट्रीय अभियान
              </h2>
              <p className="text-sm sm:text-base text-[#E3A652] font-bold mt-0.5">
                विशाल प्रोडक्शन परिमाण एवं राज्य/राष्ट्रीय स्तर के अभियान
              </p>
            </div>
          </div>

          {/* प्रोडक्शन सांख्यिकी कार्ड्स (Exact Text) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 break-inside-avoid">
              <p className="text-xs font-bold text-[#E3A652] uppercase">वीडियो स्पॉट्स</p>
              <p className="text-base sm:text-lg font-bold text-white mt-1">
                लगभग 600 वीडियो स्पॉट्स का निर्माण
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 break-inside-avoid">
              <p className="text-xs font-bold text-[#E3A652] uppercase">डॉक्यूमेंट्री व वृत्तचित्र</p>
              <p className="text-base sm:text-lg font-bold text-white mt-1">
                लगभग 300 डॉक्यूमेंट्री/डॉक्यूड्रामा/लघु वृत्तचित्र का निर्माण
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 break-inside-avoid">
              <p className="text-xs font-bold text-[#E3A652] uppercase">एनिमेशन फिल्म्स</p>
              <p className="text-base sm:text-lg font-bold text-white mt-1">
                10 थ्री डी एनिमेशन फिल्म निर्माण
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 break-inside-avoid">
              <p className="text-xs font-bold text-[#E3A652] uppercase">रेडियो धारावाहिक</p>
              <p className="text-base sm:text-lg font-bold text-white mt-1">
                हिंदी एवं छत्तीसगढ़ी रेडियो सीरियल लगभग 500 एपिसोड्स
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 break-inside-avoid sm:col-span-2">
              <p className="text-xs font-bold text-[#E3A652] uppercase">रेडियो जिंगल व स्पॉट्स</p>
              <p className="text-base sm:text-lg font-bold text-white mt-1">
                रेडियो जिंगल और वीडियो स्पॉट - 400
              </p>
            </div>
          </div>

          {/* चुनाव व संस्थागत अभियान (Exact Sentences) */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
              ऐतिहासिक चुनावी व सामाजिक अभियान:
            </h3>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5 break-inside-avoid shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm sm:text-base font-bold text-[#E3A652]">
                  विधान सभा चुनाव सन् 2013
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#E3A652]/20 text-[#E3A652] font-bold">
                  06 आकाशवाणी केंद्र
                </span>
              </div>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                विधान सभा चुनाव सन् 2013 में रेडियो के माध्यम से प्रदेश के 06 आकाशवाणी केन्द्रों से भारतीय जनता पार्टी के चुनाव प्रचार हेतु रेडियो जिंगल निर्माण व प्रसारण हेतु अनुबंधित एजेंसी ।
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5 break-inside-avoid shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm sm:text-base font-bold text-[#E3A652]">
                  लोक सभा चुनाव सन् 2014
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-[#E3A652]/20 text-[#E3A652] font-bold">
                  06 आकाशवाणी केंद्र
                </span>
              </div>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                लोक सभा चुनाव सन् 2014 में रेडियो के माध्यम से प्रदेश के 06 आकाशवाणी केन्द्रों से भारतीय जनता पार्टी के चुनाव प्रचार हेतु रेडियो जिंगल निर्माण व प्रसारण हेतु अनुबंधित एजेंसी ।
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5 break-inside-avoid shadow-sm">
              <span className="text-sm sm:text-base font-bold text-[#E3A652] block">
                एनजीओ एवं जन जागरूकता यात्रा
              </span>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                विभिन्न एनजीओ के साथ प्रचार - प्रसार फिल्म और रेडियो कार्यक्रम निर्माण का अनुभव। जन जागरूकता यात्रा में संयोजन।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1 break-inside-avoid shadow-sm">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E3A652]">
                  यूनिसेफ (UNICEF)
                </span>
                <p className="text-base sm:text-lg font-bold text-white">
                  यूनिसेफ के लिए वीडियो स्पॉट निर्माण
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1 break-inside-avoid shadow-sm">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E3A652]">
                  वर्ल्ड बैंक (World Bank)
                </span>
                <p className="text-base sm:text-lg font-bold text-white">
                  वर्ल्ड बैंक वित्तपोषित योजनाओं के प्रचार प्रसार के लिए फिल्म व रेडियो सीरियल निर्माण
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. शिक्षा (Academic Credentials) ── */}
        <section id="education" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden break-inside-avoid shadow-lg">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#E3A652]/15 flex items-center justify-center text-[#E3A652] flex-shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
                शिक्षा
              </h2>
              <p className="text-sm sm:text-base text-[#E3A652] font-bold mt-0.5">
                शैक्षणिक योग्यता, पत्रकारिता, लोक संगीत एवं प्रसारण दीक्षा
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5 break-inside-avoid shadow-sm">
              <p className="text-xs sm:text-sm font-bold text-[#E3A652] uppercase tracking-wider">
                स्नातकोत्तर डिग्री
              </p>
              <p className="text-base sm:text-lg font-bold text-white">
                शिक्षा - एम.ए.राजनीति शास्त्र
              </p>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                राजनीतिक व सामाजिक संरचना की गहन शैक्षणिक समझ।
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5 break-inside-avoid shadow-sm">
              <p className="text-xs sm:text-sm font-bold text-[#E3A652] uppercase tracking-wider">
                पत्रकारिता स्नातक
              </p>
              <p className="text-base sm:text-lg font-bold text-white">
                बी जे एमसी ( पं. रविशंकर विश्वविद्यालय रायपुर)
              </p>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                मास कम्युनिकेशन एवं प्रिंट/इलेक्ट्रॉनिक मीडिया में औपचारिक स्नातक उपाधि।
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5 break-inside-avoid shadow-sm">
              <p className="text-xs sm:text-sm font-bold text-[#E3A652] uppercase tracking-wider">
                संगीत दीक्षा
              </p>
              <p className="text-base sm:text-lg font-bold text-white">
                डिप्लोमा इन लोक संगीत ( इंदिरा कला संगीत विश्वविद्यालय खैरागढ़)
              </p>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                एशिया के प्रतिष्ठित कला विश्वविद्यालय से पारंपरिक लोक संगीत में विशेषज्ञता।
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5 break-inside-avoid shadow-sm">
              <p className="text-xs sm:text-sm font-bold text-[#E3A652] uppercase tracking-wider">
                प्रसारण प्रमाणन
              </p>
              <p className="text-base sm:text-lg font-bold text-white">
                वाणी कोर्स ( प्रसार भारती )
              </p>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                प्रसार भारती नई दिल्ली से वाचन, उद्घोषणा एवं प्रसारण का आधिकारिक कोर्स।
              </p>
            </div>
          </div>
        </section>

        {/* ── 6. संगठनात्मक दायित्व एवं सांस्कृतिक निष्ठा ── */}
        <section id="culture" className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden break-inside-avoid shadow-lg">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#E3A652]/15 flex items-center justify-center text-[#E3A652] flex-shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-serif">
                संगठनात्मक दायित्व एवं सांस्कृतिक निष्ठा
              </h2>
              <p className="text-sm sm:text-base text-[#E3A652] font-bold mt-0.5">
                सिने संगठन, सामाजिक दायित्व एवं लोक संस्कार के प्रति आजीवन समर्पण
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3.5 break-inside-avoid shadow-sm">
              <div className="p-2.5 rounded-xl bg-[#E3A652]/10 text-[#E3A652] mt-0.5 flex-shrink-0">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-white leading-snug">
                  CCTPA ( Chhattisgarh Cine And Television Producers Association ) का फाउंडर सदस्य
                </p>
                <p className="text-xs sm:text-sm text-white/75 mt-1 leading-relaxed">
                  प्रदेश के सिने व टेलीविजन उत्पादक संघ के संस्थापक सदस्य के रूप में उद्योग के उत्थान में निरंतर सक्रिय।
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3.5 break-inside-avoid shadow-sm">
              <div className="p-2.5 rounded-xl bg-[#E3A652]/10 text-[#E3A652] mt-0.5 flex-shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-white leading-snug">
                  विद्यार्थी परिषद द्वारा निर्मित भगवान शिव मंदिर समिति &quot; प्रबंध समिति कैलाश धाम &quot; भरदा का अध्यक्ष
                </p>
                <p className="text-xs sm:text-sm text-white/75 mt-1 leading-relaxed">
                  अखिल भारतीय विद्यार्थी परिषद (ABVP) द्वारा निर्मित ऐतिहासिक शिव मंदिर की प्रबंध समिति के अध्यक्ष पद का दायित्व।
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-[#E3A652]/10 border border-[#E3A652]/30 flex items-start gap-3.5 break-inside-avoid shadow-sm">
              <div className="p-2.5 rounded-xl bg-[#E3A652]/20 text-[#E3A652] mt-0.5 flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                  भारतीय कला, संस्कृति, साहित्य, अध्यात्म, राजनीति में विशेष रुचि। छत्तीसगढ़ी भाषा , लोक कला, संस्कृति, संस्कार का आजीवन विद्यार्थी।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. आधिकारिक संपर्क विवरण (Official Address & Contact Dossier) ── */}
        <section id="contact" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-[#E3A652]/30 relative overflow-hidden shadow-2xl break-inside-avoid">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3A652]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#E3A652]">
                  आधिकारिक संपर्क विवरण
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-serif mt-1">
                  संपर्क एवं स्टूडियो कार्यालय
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 no-print">
                <a
                  href="/Bhishmdev_Chaturvedi_Portfolio.pdf"
                  download="Bhishmdev_Chaturvedi_Portfolio.pdf"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#E3A652] hover:bg-[#F4D090] text-[#050608] shadow-lg shadow-[#E3A652]/20 transition-all active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>PDF डाउनलोड करें</span>
                </a>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#E3A652]" />
                  <span>PDF प्रिंट करें</span>
                </button>
                <button
                  onClick={downloadVCard}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all active:scale-95 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#E3A652]" />
                  <span>vCard सहेजें</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Address */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2 break-inside-avoid">
                <div className="flex items-center gap-2 text-[#E3A652] mb-1">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">पता</span>
                </div>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                  राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 4920013 ( छ ग)
                </p>
              </div>

              {/* Mobile */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2 break-inside-avoid">
                <div className="flex items-center gap-2 text-[#E3A652] mb-1">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">मोबाइल</span>
                </div>
                <p className="text-sm sm:text-base text-white/95 font-mono font-bold">
                  <a href="tel:7000866323" className="hover:text-[#E3A652] transition-colors block">
                    7000866323
                  </a>
                  <a href="tel:9826167533" className="hover:text-[#E3A652] transition-colors block mt-1">
                    9826167533
                  </a>
                </p>
              </div>

              {/* Email */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2 break-inside-avoid">
                <div className="flex items-center gap-2 text-[#E3A652] mb-1">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">मेल</span>
                </div>
                <p className="text-xs sm:text-sm text-white/95 font-mono break-all font-bold">
                  <a href="mailto:bsrfilms2017@gmail.com" className="hover:text-[#E3A652] transition-colors">
                    bsrfilms2017@gmail.com
                  </a>
                </p>
              </div>

              {/* Website */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2 break-inside-avoid">
                <div className="flex items-center gap-2 text-[#E3A652] mb-1">
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">Web</span>
                </div>
                <p className="text-xs sm:text-sm text-white/95 font-semibold">
                  <a
                    href="https://www.bsrfilms.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#E3A652] transition-colors flex items-center gap-1.5"
                  >
                    <span>www.bsrfilms.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Print-Only Dossier Official Footer */}
        <div className="hidden print:block pt-12 mt-12 border-t-2 border-[#8C4E00] text-center text-xs text-neutral-600 space-y-1.5 break-inside-avoid">
          <p className="font-bold text-[#8C4E00] text-sm tracking-wide">
            बी.एस.आर. फिल्म्स रायपुर (BSR Films Raipur) • आधिकारिक परिचय संचिका (OFFICIAL EXECUTIVE DOSSIER)
          </p>
          <p className="text-neutral-700">
            राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर रायपुर, पोस्ट सुंदर नगर , पिन - 4920013 ( छ ग) • फोन: 7000866323, 9826167533 • मेल: bsrfilms2017@gmail.com • Web: www.bsrfilms.com
          </p>
          <p className="text-[10px] text-neutral-500 font-medium">
            © बी.एस.आर. फिल्म्स रायपुर (BSR Films) • छत्तीसगढ़ संवाद &apos;ब&apos; श्रेणी एवं NFDC अनुसूचित संस्था
          </p>
        </div>
      </main>

      {/* Sticky Mobile Quick Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0A0C10]/95 backdrop-blur-xl border-t border-white/10 px-3 py-2.5 md:hidden flex items-center justify-around gap-1.5 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] no-print">
        <a
          href="tel:7000866323"
          className="flex-1 flex flex-col items-center justify-center py-1 text-white hover:text-[#E3A652] transition-colors"
        >
          <Phone className="w-4 h-4 text-[#E3A652] mb-0.5" />
          <span className="text-[0.65rem] font-bold">कॉल करें</span>
        </a>

        <a
          href={`https://wa.me/917000866323?text=${encodeURIComponent(
            "नमस्ते भीष्मदेव जी, मैं आपकी प्रोफ़ाइल देखकर संपर्क कर रहा हूँ।"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1 text-white hover:text-[#25D366] transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366] mb-0.5" />
          <span className="text-[0.65rem] font-bold">व्हाट्सएप</span>
        </a>

        <a
          href="/Bhishmdev_Chaturvedi_Portfolio.pdf"
          download="Bhishmdev_Chaturvedi_Portfolio.pdf"
          className="flex-1 flex flex-col items-center justify-center py-1 text-white hover:text-[#E3A652] transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#E3A652] mb-0.5" />
          <span className="text-[0.65rem] font-bold">PDF डाउनलोड</span>
        </a>

        <button
          onClick={handlePrint}
          className="flex-1 flex flex-col items-center justify-center py-1 text-white hover:text-[#E3A652] transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4 text-[#E3A652] mb-0.5" />
          <span className="text-[0.65rem] font-bold">प्रिंट</span>
        </button>

        <button
          onClick={handleShare}
          className="flex-1 flex flex-col items-center justify-center py-1 text-white hover:text-[#E3A652] transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-[#E3A652] mb-0.5" />
          <span className="text-[0.65rem] font-bold">शेयर</span>
        </button>
      </div>
    </div>
  );
}
