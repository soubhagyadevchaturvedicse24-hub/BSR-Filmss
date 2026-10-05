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
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import CustomCursor from "./CustomCursor";
import { useLanguage } from "@/context/LanguageContext";

interface StatItem {
  number: string;
  label: { hi: string; en: string };
  sub: { hi: string; en: string };
}

const stats: StatItem[] = [
  {
    number: "30+",
    label: { hi: "वर्षों का अनुभव", en: "Years Experience" },
    sub: { hi: "आकाशवाणी एवं मीडिया सेवा", en: "AIR & Media Service" },
  },
  {
    number: "600+",
    label: { hi: "वीडियो स्पॉट्स", en: "Video Spots" },
    sub: { hi: "विज्ञापन एवं जनहित संदेश", en: "Commercials & Public TVCs" },
  },
  {
    number: "300+",
    label: { hi: "वृत्तचित्र व फिल्में", en: "Documentaries" },
    sub: { hi: "डॉक्यूमेंट्री व लघु फिल्में", en: "Docudramas & Short Films" },
  },
  {
    number: "500+",
    label: { hi: "रेडियो एपिसोड्स", en: "Radio Episodes" },
    sub: { hi: "हिंदी एवं छत्तीसगढ़ी धारावाहिक", en: "Hindi & Chhattisgarhi Serials" },
  },
  {
    number: "80+",
    label: { hi: "दूरदर्शन स्पॉट्स", en: "Doordarshan Spots" },
    sub: { hi: "प्रथम वीडियो स्पॉट सहित", en: "Incl. 1st DD Raipur Spot" },
  },
  {
    number: "06",
    label: { hi: "भाषाएं एवं बोलियां", en: "Dialects & Languages" },
    sub: { hi: "हिंदी, छत्तीसगढ़ी, गोंडी, हल्बी...", en: "Hindi, Chhattisgarhi, Gondi..." },
  },
];

const rolesData = {
  hi: [
    "लेखक (Writer)",
    "निर्देशक (Director)",
    "निर्माता (Producer)",
    "गीतकार (Lyricist)",
    "कवि (Poet)",
    "मंच संचालक (Compère)",
    "सांस्कृतिक एवं सामाजिक सेवक",
  ],
  en: [
    "Author & Screenwriter",
    "Film Director",
    "Creative Producer",
    "Lyricist & Poet",
    "TV / Radio Anchor",
    "Cultural Steward",
    "Social Worker",
  ],
};

const tabsData = [
  { id: "overview", label: { hi: "समग्र परिचय", en: "Overview" }, icon: Sparkles },
  { id: "air", label: { hi: "आकाशवाणी यात्रा", en: "AIR Raipur Legacy" }, icon: Radio },
  { id: "dd", label: { hi: "दूरदर्शन कृतित्व", en: "Doordarshan" }, icon: Tv },
  { id: "bsr", label: { hi: "बी.एस.आर. फिल्म्स व अभियान", en: "BSR Films & Campaigns" }, icon: Film },
  { id: "culture", label: { hi: "शिक्षा, लोकसंस्कृति व दायित्व", en: "Education & Leadership" }, icon: BookOpen },
];

export default function FounderProfile() {
  const { lang, isHindi } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
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
      title: isHindi
        ? "भीष्मदेव चतुर्वेदी | संस्थापक एवं निर्देशक — BSR Films"
        : "Bhishmdev Chaturvedi | Founder & Director — BSR Films Raipur",
      text: isHindi
        ? "श्री भीष्मदेव चतुर्वेदी — लेखक, निर्देशक, निर्माता एवं 30+ वर्षों की आकाशवाणी, दूरदर्शन व मीडिया यात्रा। विस्तृत प्रोफ़ाइल देखें:"
        : "Bhishmdev Chaturvedi — Senior Media Producer, Director & Author with 30+ years of All India Radio & Doordarshan legacy. View executive profile:",
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
    showToast(isHindi ? "प्रोफ़ाइल लिंक कॉपी हो गया!" : "Profile link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:भीष्मदेव चतुर्वेदी (Bhishmdev Chaturvedi)
ORG:BSR Films Raipur
TITLE:Founder & Director | लेखक, निर्देशक, निर्माता
TEL;TYPE=CELL,VOICE:+917000866323
TEL;TYPE=WORK,VOICE:+919826167533
EMAIL;TYPE=PREF,INTERNET:bsrfilms2017@gmail.com
URL:https://bsrfilms.com
ADR;TYPE=WORK:;;राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर, पोस्ट सुंदर नगर;रायपुर;छत्तीसगढ़;492013;India
NOTE:वरिष्ठ लेखक, निर्देशक, निर्माता। 30+ वर्ष आकाशवाणी व दूरदर्शन अनुभव। NFDC व छत्तीसगढ़ संवाद पंजीकृत बी.एस.आर. फिल्म्स रायपुर के संस्थापक।
END:VCARD`;

    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Bhishmdev_Chaturvedi_BSR_Films.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(isHindi ? "डिजिटल संपर्क (vCard) डाउनलोड हो गया!" : "Digital Contact (.vcf) downloaded!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 pb-24 md:pb-16 selection:bg-[#E3A652]/30 selection:text-white print:p-0 print:bg-white print:text-black">
      {/* Luxury Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Print-Only Executive Letterhead / Dossier Header */}
      <div className="hidden print:flex items-center justify-between pb-5 mb-8 border-b-2 border-[#8C4E00]">
        <div className="flex items-center gap-4">
          <Image
            src="/bsr-icon.webp"
            alt="BSR Films Logo"
            width={56}
            height={56}
            className="w-14 h-14 object-contain"
          />
          <div>
            <h1 className="text-2xl font-black tracking-tight text-black">BSR FILMS RAIPUR</h1>
            <p className="text-xs text-[#8C4E00] font-bold uppercase tracking-wider">
              {isHindi ? "संस्थापक एवं निर्देशक प्रोफ़ाइल" : "Founder & Managing Director Dossier"}
            </p>
          </div>
        </div>
        <div className="text-right text-xs text-gray-700 leading-snug">
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
            <span className="hidden sm:inline">{isHindi ? "बी.एस.आर. फिल्म्स मुख्य पृष्ठ" : "BSR Films Home"}</span>
            <span className="inline sm:hidden">{isHindi ? "मुख्य पृष्ठ" : "Home"}</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bilingual Switcher */}
            <LanguageToggle />

            {/* Dark / Light Theme Switcher */}
            <ThemeToggle />

            {/* Print / Save as PDF Button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#E3A652] hover:bg-[#F4D090] text-[#050608] shadow-md shadow-[#E3A652]/20 transition-all active:scale-95 cursor-pointer"
              title={isHindi ? "प्रोफ़ाइल PDF प्रिंट करें या सहेजें" : "Print or Save Profile as PDF"}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isHindi ? "PDF प्रिंट" : "Print PDF"}</span>
            </button>

            {/* Share Profile Button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#E3A652]/15 hover:bg-[#E3A652]/25 text-[#E3A652] border border-[#E3A652]/30 transition-all active:scale-95 cursor-pointer"
              title={isHindi ? "प्रोफ़ाइल साझा करें" : "Share Profile"}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{isHindi ? "कॉपी हुआ" : "Copied"}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{isHindi ? "साझा करें" : "Share"}</span>
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
                    alt={isHindi ? "भीष्मदेव चतुर्वेदी - संस्थापक, बी.एस.आर. फिल्म्स" : "Bhishmdev Chaturvedi - Founder, BSR Films"}
                    fill
                    sizes="(max-width: 768px) 256px, 288px"
                    priority
                    className="object-cover object-top filter contrast-[1.02] brightness-[1.01]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050608]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Badge over photo */}
                  <div className="absolute bottom-3 inset-x-3 text-center">
                    <span className="inline-block px-3 py-1 rounded-full text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider bg-[#E3A652] text-[#050608] shadow-md">
                      {isHindi ? "संस्थापक एवं निर्देशक (Founder)" : "Founder & Managing Director"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Contact Action Pills under photo */}
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <a
                  href="tel:7000866323"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E3A652]" />
                  <span>7000866323</span>
                </a>
                <a
                  href={`https://wa.me/917000866323?text=${encodeURIComponent(
                    isHindi
                      ? "नमस्ते भीष्मदेव जी, मैं आपकी प्रोफ़ाइल देखकर संपर्क कर रहा हूँ।"
                      : "Hello Bhishmdev Sir, I am reaching out after viewing your executive portfolio."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 transition-all active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{isHindi ? "व्हाट्सएप" : "WhatsApp"}</span>
                </a>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#E3A652]/15 hover:bg-[#E3A652]/25 text-[#E3A652] border border-[#E3A652]/40 transition-all active:scale-95 cursor-pointer no-print"
                  title={isHindi ? "PDF प्रिंट करें" : "Print Profile as PDF"}
                >
                  <Printer className="w-3.5 h-3.5 text-[#E3A652]" />
                  <span>{isHindi ? "PDF प्रिंट" : "Print PDF"}</span>
                </button>
                <button
                  onClick={downloadVCard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#E3A652]/10 hover:bg-[#E3A652]/20 text-[#E3A652] border border-[#E3A652]/30 transition-all active:scale-95 cursor-pointer no-print"
                  title={isHindi ? "संपर्क सहेजें (.vcf)" : "Save Contact (.vcf)"}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isHindi ? "vCard सहेजें" : "Save vCard"}</span>
                </button>
              </div>
            </motion.div>

            {/* Founder Biography & Credentials Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="md:col-span-7 flex flex-col justify-center text-left"
            >
              {/* Institution Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-[#E3A652]/15 text-[#E3A652] border border-[#E3A652]/30 w-fit mb-3.5 shadow-sm">
                <Building2 className="w-4 h-4" />
                <span>{isHindi ? "बी.एस.आर. फिल्म्स रायपुर (स्थापना 2000)" : "BSR Films Raipur (Est. 2000)"}</span>
              </div>

              {/* Name */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-2 font-serif leading-tight drop-shadow-md">
                {isHindi ? "भीष्मदेव चतुर्वेदी" : "Bhishmdev Chaturvedi"}
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-[#E3A652] font-bold tracking-wide mb-4">
                {isHindi
                  ? "वरिष्ठ लेखक, निर्देशक, निर्माता, गीतकार एवं उद्घोषक"
                  : "Senior Media Producer, Film Director, Screenwriter & Cultural Steward"}
              </p>

              {/* Lineage & Heritage Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/15 mb-5 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#E3A652]" />
                <p className="text-sm sm:text-base text-white/95 leading-relaxed font-semibold">
                  <span className="text-[#E3A652] font-bold">{isHindi ? "पिता:" : "Father:"}</span>{" "}
                  {isHindi ? "स्व. श्री दीनानाथ चतुर्वेदी" : "Late Shri Dinanath Chaturvedi"}
                </p>
                <p className="text-xs sm:text-sm text-white/80 mt-1.5 leading-relaxed font-normal">
                  {isHindi
                    ? "(राष्ट्रसेवी स्वयंसेवक - RSS, सेवानिवृत्त शिक्षक, प्रख्यात रामायणविद, पूर्व मंडल अध्यक्ष - भारतीय जनता पार्टी)"
                    : "(Social Worker - RSS, Retired Educator, Scholar of Ramayana, Former BJP Mandal President)"}
                </p>
              </div>

              {/* Roles Pills */}
              <div className="flex flex-wrap gap-2 mb-5">
                {(rolesData[lang] || rolesData.en).map((r) => (
                  <span
                    key={r}
                    className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-white/[0.06] text-white/90 border border-white/15 hover:border-[#E3A652]/50 transition-all shadow-sm"
                  >
                    {r}
                  </span>
                ))}
              </div>

              {/* Philosophy Quote */}
              <blockquote className="border-l-3 border-[#E3A652] pl-4 py-2 text-sm sm:text-base italic text-white/85 leading-relaxed bg-[#E3A652]/[0.03] rounded-r-xl">
                {isHindi
                  ? '“भारतीय कला, संस्कृति, साहित्य और लोक संस्कारों की अविरल धारा — हमर छत्तीसगढ़ की माटी, बोली और अस्मिता के प्रति आजीवन समर्पित।”'
                  : '“Dedicated for life to the soil, folklore, languages and living cultural soul of Chhattisgarh — bringing regional stories to the national stage.”'}
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Numbers / Milestone Stats Bento */}
      <section className="py-6 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {stats.map((s, idx) => (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/15 transition-all text-center flex flex-col justify-center shadow-md"
              >
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#E3A652] font-mono leading-none mb-1.5">
                  {s.number}
                </span>
                <span className="text-sm sm:text-base font-extrabold text-white leading-tight">
                  {s.label[lang] || s.label.en}
                </span>
                <span className="text-xs text-white/60 mt-1 leading-snug">
                  {s.sub[lang] || s.sub.en}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Tabs for Clean Mobile & Desktop Navigation */}
      <section className="sticky top-14 sm:top-16 z-30 bg-[var(--bg-primary)]/95 backdrop-blur-md border-y border-white/10 py-2.5 px-4 sm:px-6 no-print">
        <div className="max-w-5xl mx-auto overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-max">
            {tabsData.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const labelText = tab.label[lang] || tab.label.en;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm md:text-base font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#E3A652] text-[#050608] shadow-md shadow-[#E3A652]/30 font-extrabold scale-[1.02]"
                      : "bg-white/[0.04] text-white/75 hover:text-white hover:bg-white/[0.08] border border-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{labelText}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Tabbed Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        {/* TAB 1: OVERVIEW */}
        <div className={activeTab === "overview" ? "block space-y-8" : "hidden print:block space-y-8"}>
          {/* Executive Summary Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden break-inside-avoid shadow-lg">
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#E3A652]/15 flex items-center justify-center text-[#E3A652] flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                {isHindi ? "सांस्कृतिक एवं मीडिया यात्रा का संक्षिप्त परिचय" : "Executive Overview & Career Journey"}
              </h2>
            </div>
            <div className="space-y-4 text-sm sm:text-base md:text-lg text-white/85 leading-relaxed font-normal">
              {isHindi ? (
                <>
                  <p>
                    <strong className="text-white font-bold">श्री भीष्मदेव चतुर्वेदी</strong> छत्तीसगढ़ के कला, साहित्य, दूरदर्शन एवं प्रसारण जगत के एक अत्यंत सम्मानित और वरिष्ठ हस्ताक्षर हैं। पिछले तीन दशकों से अधिक समय से उन्होंने राज्य की माटी, लोकसंस्कृति और सामाजिक सरोकारों को अपनी लेखनी, वाणी और निर्देशन के माध्यम से राष्ट्रीय क्षितिज पर स्थापित किया है।
                  </p>
                  <p>
                    सन् 2000 में उन्होंने <strong className="text-[#E3A652] font-bold">बी.एस.आर. फिल्म्स (BSR Films)</strong> की स्थापना रायपुर में की, जो आज राष्ट्रीय फिल्म विकास निगम (NFDC), छत्तीसगढ़ संवाद (&apos;ब&apos; श्रेणी) तथा प्रसार भारती के केंद्रीय विक्रय एकांश में पंजीकृत छत्तीसगढ़ की एक प्रमुख एवं विश्वसनीय प्रोडक्शन संस्था है।
                  </p>
                  <p>
                    आकाशवाणी रायपुर में 30 वर्षों तक नैमेत्तिक कंपियर (चौपाल एवं श्रमिक जगत) के रूप में कार्य करने, &apos;बी हाई-ग्रेड&apos; नाट्य कलाकार होने और दूरदर्शन केंद्र रायपुर के लिए प्रथम वीडियो स्पॉट सहित 15 टेलीफिल्म्स व 5 धारावाहिकों के लेखन-निर्देशन का अनूठा कीर्तिमान उनके नाम है।
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong className="text-white font-bold">Bhishmdev Chaturvedi</strong> is one of the most venerated figures in Chhattisgarh’s media, television, literature, and broadcasting landscapes. For over three decades, he has been instrumental in elevating regional narratives, tribal folklore, and public awareness campaigns onto premier national stages.
                  </p>
                  <p>
                    In the year 2000, he founded <strong className="text-[#E3A652] font-bold">BSR Films Raipur</strong>, which has grown into a premier media production house empanelled in Category &apos;B&apos; with Chhattisgarh Samvad since 2008, enlisted with the National Film Development Corporation (NFDC, New Delhi), and registered with Prasar Bharati’s Central Sales Unit.
                  </p>
                  <p>
                    With 30 years as an empanelled compère for All India Radio Raipur (&apos;Chaupal&apos; & &apos;Shramik Jagat&apos;), an official &apos;B-High Grade&apos; drama artist, and writer-director of 15 telefilms and 5 television serials for Doordarshan Raipur, his career encompasses the pinnacle of regional audio-visual storytelling.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Quick Glance Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 break-inside-avoid shadow-md">
              <div className="flex items-center gap-3 mb-4 text-[#E3A652]">
                <Radio className="w-6 h-6 flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {isHindi ? "प्रसारण एवं मीडिया प्रभुत्व" : "Broadcasting & Television"}
                </h3>
              </div>
              <ul className="space-y-3.5 text-sm sm:text-base text-white/80 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#E3A652] flex-shrink-0 mt-0.5" />
                  <span>
                    {isHindi
                      ? "आकाशवाणी रायपुर: 30 वर्ष कंपियर, 50 रूपक, 10 नाटक, 6 सीरियल्स अनुबंध।"
                      : "AIR Raipur: 30-year compère, 50 radio features, 10 dramas, 6 serial contracts."}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#E3A652] flex-shrink-0 mt-0.5" />
                  <span>
                    {isHindi
                      ? "दूरदर्शन रायपुर: प्रथम वीडियो स्पॉट, 80+ स्पॉट्स, 15 टेलीफिल्म्स, 5 धारावाहिक।"
                      : "DD Raipur: 1st video spot, 80+ spots, 15 telefilms written & directed, 5 serials."}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#E3A652] flex-shrink-0 mt-0.5" />
                  <span>
                    {isHindi
                      ? "प्रमुख एंकर: परिक्रमा, हमर गांव, भुइयां के गोठ, कृषि दर्शन।"
                      : "Anchor of landmark shows: Parikrama, Hamar Gaon, Bhuiyan Ke Goth, Krishi Darshan."}
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10 break-inside-avoid shadow-md">
              <div className="flex items-center gap-3 mb-4 text-[#E3A652]">
                <Award className="w-6 h-6 flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {isHindi ? "राष्ट्रीय अभियान एवं मान्यताएं" : "National Campaigns & Institutional Trust"}
                </h3>
              </div>
              <ul className="space-y-3.5 text-sm sm:text-base text-white/80 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#E3A652] flex-shrink-0 mt-0.5" />
                  <span>
                    {isHindi
                      ? "NFDC नई दिल्ली में अनुसूचित (Enlisted) एवं छत्तीसगढ़ संवाद 'ब' श्रेणी पंजीकृत।"
                      : "Enlisted with NFDC New Delhi; Category 'B' empanelled with CG Samvad since 2008."}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#E3A652] flex-shrink-0 mt-0.5" />
                  <span>
                    {isHindi
                      ? "विधान सभा 2013 एवं लोक सभा 2014 चुनाव: 6 आकाशवाणी केन्द्रों से रेडियो प्रचार एजेंसी।"
                      : "2013 Assembly & 2014 Lok Sabha Elections: Lead agency across 6 AIR stations."}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#E3A652] flex-shrink-0 mt-0.5" />
                  <span>
                    {isHindi
                      ? "यूनिसेफ (UNICEF) एवं वर्ल्ड बैंक (World Bank) योजनाओं हेतु वृत्तचित्र व धारावाहिक।"
                      : "Produced public health & social campaigns for UNICEF & World Bank funded missions."}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* TAB 2: ALL INDIA RADIO */}
        <div className={activeTab === "air" ? "block space-y-6" : "hidden print:block space-y-6"}>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 break-inside-avoid shadow-lg">
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-11 h-11 rounded-xl bg-[#E3A652]/15 flex items-center justify-center text-[#E3A652] flex-shrink-0">
                <Radio className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                  {isHindi
                    ? "आकाशवाणी रायपुर (All India Radio) — तीन दशकों की विरासत"
                    : "All India Radio (AIR Raipur) — Three Decades of Broadcasting"}
                </h2>
                <p className="text-sm sm:text-base text-[#E3A652] font-bold mt-0.5">
                  {isHindi
                    ? "नैमेत्तिक कंपियर, नाटककार, रूपक लेखक एवं 'बी हाई-ग्रेड' कलाकार"
                    : "Compère, Dramatist, Feature Writer & 'B-High Grade' Radio Artist"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              <div className="p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5 break-inside-avoid">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E3A652] block">
                  {isHindi ? "नैमेत्तिक कंपियर (लगभग 30 वर्ष)" : "Casual Compère (~30 Years)"}
                </span>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  {isHindi
                    ? "आकाशवाणी रायपुर के सर्वाधिक लोकप्रिय कार्यक्रमों 'चौपाल' और 'श्रमिक जगत' में तीन दशकों तक अनुबंधित उद्घोषक व कंपियर के रूप में जन-जन की आवाज बने रहे।"
                    : "Empanelled compère for nearly 30 years hosting flagships 'Chaupal' and 'Shramik Jagat', connecting rural and working communities with cultural discourse."}
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5 break-inside-avoid">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E3A652] block">
                  {isHindi ? "'बी हाई-ग्रेड' कलाकार (B-High Grade)" : "Officially Graded 'B-High' Artist"}
                </span>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  {isHindi
                    ? "आकाशवाणी से नाटकों में आधिकारिक रूप से प्रतिष्ठित 'बी हाई-ग्रेड' कलाकार के रूप में वर्गीकृत, अनगिनत रेडियो नाटकों में जीवंत अभिनय का परिचय दिया।"
                    : "Graded 'B-High' Radio Drama Artist by All India Radio, performing lead character roles in dozens of historic radio plays."}
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5 break-inside-avoid">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E3A652] block">
                  {isHindi ? "50 रेडियो रूपक (Radio Features)" : "50 Radio Features Authored"}
                </span>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  {isHindi
                    ? "आकाशवाणी रायपुर के लिए 50 रेडियो रूपकों का विशिष्ट शोध, आलेखन एवं निर्माण अनुबंध सफलतापूर्वक संपन्न किया।"
                    : "Researched, scripted and produced 50 comprehensive radio documentaries and feature specials on tribal history and folklore."}
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5 break-inside-avoid">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E3A652] block">
                  {isHindi ? "10 नाटकों का लेखन व निर्माण" : "10 Full-Length Radio Dramas"}
                </span>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  {isHindi
                    ? "सामाजिक, ऐतिहासिक और सांस्कृतिक विषयों पर आधारित 10 संपूर्ण रेडियो नाटकों का लेखन एवं निर्माण।"
                    : "Contracted writer and director for 10 complete radio plays broadcasting across regional All India Radio networks."}
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/10 md:col-span-2 space-y-2.5 break-inside-avoid">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E3A652] block">
                  {isHindi ? "ऐतिहासिक रेडियो धारावाहिक (Radio Serials)" : "Pioneering Radio Serials (500+ Episodes)"}
                </span>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  {isHindi
                    ? "आकाशवाणी रायपुर के इतिहास का प्रथम रेडियो सीरियल सहित कुल 6 धारावाहिकों (हिंदी एवं छत्तीसगढ़ी) का लेखन अनुबंध तथा 500 से अधिक कड़ियों (Episodes) का विशाल प्रसारण।"
                    : "Authored and directed the historic very first radio serial broadcast by AIR Raipur, among 6 total serials encompassing over 500 broadcast episodes in Hindi and Chhattisgarhi."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TAB 3: DOORDARSHAN */}
        <div className={activeTab === "dd" ? "block space-y-6" : "hidden print:block space-y-6"}>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 break-inside-avoid shadow-lg">
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-11 h-11 rounded-xl bg-[#E3A652]/15 flex items-center justify-center text-[#E3A652] flex-shrink-0">
                <Tv className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                  {isHindi
                    ? "दूरदर्शन केंद्र रायपुर — टेलीफिल्म्स, धारावाहिक एवं एंकरिंग"
                    : "Doordarshan Kendra Raipur — Telefilms, Serials & Anchoring"}
                </h2>
                <p className="text-sm sm:text-base text-[#E3A652] font-bold mt-0.5">
                  {isHindi
                    ? "टेलीफिल्म लेखक-निर्देशक एवं प्रतिष्ठित मुख्य एंकर"
                    : "Telefilm Director, Screenwriter & Lead Television Anchor"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-6">
              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center break-inside-avoid shadow-md">
                <p className="text-4xl sm:text-5xl font-black text-[#E3A652] font-mono">15</p>
                <p className="text-base sm:text-lg font-bold text-white mt-1.5">
                  {isHindi ? "टेलीफिल्म्स" : "Telefilms"}
                </p>
                <p className="text-xs sm:text-sm text-white/60 mt-1">
                  {isHindi ? "संपूर्ण लेखन व निर्देशन" : "Written & Directed"}
                </p>
              </div>
              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center break-inside-avoid shadow-md">
                <p className="text-4xl sm:text-5xl font-black text-[#E3A652] font-mono">05</p>
                <p className="text-base sm:text-lg font-bold text-white mt-1.5">
                  {isHindi ? "धारावाहिक (Serials)" : "TV Serials"}
                </p>
                <p className="text-xs sm:text-sm text-white/60 mt-1">
                  {isHindi ? "लेखन, निर्देशन व संचालन" : "Directed & Produced"}
                </p>
              </div>
              <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center break-inside-avoid shadow-md">
                <p className="text-4xl sm:text-5xl font-black text-[#E3A652] font-mono">80+</p>
                <p className="text-base sm:text-lg font-bold text-white mt-1.5">
                  {isHindi ? "वीडियो स्पॉट्स" : "Video Spots"}
                </p>
                <p className="text-xs sm:text-sm text-white/60 mt-1">
                  {isHindi ? "डीडी रायपुर का प्रथम स्पॉट सहित" : "Incl. 1st DD Raipur spot"}
                </p>
              </div>
            </div>

            {/* Iconic Anchor Shows */}
            <div className="mt-8 pt-6 border-t border-white/10 break-inside-avoid">
              <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                {isHindi
                  ? "दूरदर्शन रायपुर के प्रमुख कार्यक्रम, जिनका आपने मुख्य संचालन/एंकरिंग किया:"
                  : "Landmark television shows anchored and hosted on Doordarshan:"}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { hi: "परिक्रमा", en: "Parikrama" },
                  { hi: "हमर गांव", en: "Hamar Gaon" },
                  { hi: "भुइयां के गोठ", en: "Bhuiyan Ke Goth" },
                  { hi: "कृषि दर्शन", en: "Krishi Darshan" },
                  { hi: "नववर्ष विशेष कार्यक्रम", en: "New Year Specials" },
                  { hi: "राष्ट्रीय/क्षेत्रीय विशेष आयोजन", en: "National & State Events" },
                ].map((show) => (
                  <div
                    key={show.en}
                    className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm font-bold text-white/95 flex items-center gap-2.5 shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#E3A652] flex-shrink-0" />
                    <span>{show[lang] || show.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TAB 4: BSR FILMS & CAMPAIGNS */}
        <div className={activeTab === "bsr" ? "block space-y-6" : "hidden print:block space-y-6"}>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 break-inside-avoid shadow-lg">
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-11 h-11 rounded-xl bg-[#E3A652]/15 flex items-center justify-center text-[#E3A652] flex-shrink-0">
                <Film className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                  {isHindi
                    ? "बी.एस.आर. फिल्म्स — संस्थागत मान्यताएं एवं ऐतिहासिक अभियान"
                    : "BSR Films — Institutional Accreditations & Landmark Campaigns"}
                </h2>
                <p className="text-sm sm:text-base text-[#E3A652] font-bold mt-0.5">
                  {isHindi
                    ? "वर्ष 2000 से निरंतर कार्यरत | NFDC एवं छत्तीसगढ़ संवाद पंजीकृत"
                    : "Active Since 2000 | Enlisted with NFDC & Empanelled with CG Samvad"}
                </p>
              </div>
            </div>

            {/* Institutional Empanelment */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 break-inside-avoid shadow-sm">
                <p className="text-xs sm:text-sm font-bold text-[#E3A652] uppercase tracking-wide">
                  {isHindi ? "छत्तीसगढ़ संवाद" : "CG Samvad"}
                </p>
                <p className="text-base sm:text-lg font-bold text-white mt-1">
                  {isHindi ? "'ब' श्रेणी में इम्पेनल्ड" : "Category 'B' Empanelled"}
                </p>
                <p className="text-xs sm:text-sm text-white/70 mt-1.5 leading-relaxed">
                  {isHindi
                    ? "2008 से आज पर्यंत ऑडियो-वीडियो निर्माण हेतु पंजीकृत फर्म।"
                    : "Registered for audio-visual media production since 2008."}
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 break-inside-avoid shadow-sm">
                <p className="text-xs sm:text-sm font-bold text-[#E3A652] uppercase tracking-wide">
                  {isHindi ? "NFDC नई दिल्ली" : "NFDC New Delhi"}
                </p>
                <p className="text-base sm:text-lg font-bold text-white mt-1">
                  {isHindi ? "अनुसूचित (Enlisted) एजेंसी" : "Enlisted Media House"}
                </p>
                <p className="text-xs sm:text-sm text-white/70 mt-1.5 leading-relaxed">
                  {isHindi
                    ? "नेशनल फिल्म डेवलपमेंट कॉर्पोरेशन, नई दिल्ली में सूचीबद्ध।"
                    : "Enlisted with National Film Development Corporation of India."}
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 break-inside-avoid shadow-sm">
                <p className="text-xs sm:text-sm font-bold text-[#E3A652] uppercase tracking-wide">
                  {isHindi ? "प्रसार भारती" : "Prasar Bharati"}
                </p>
                <p className="text-base sm:text-lg font-bold text-white mt-1">
                  {isHindi ? "केंद्रीय विक्रय एकांश" : "Central Sales Unit"}
                </p>
                <p className="text-xs sm:text-sm text-white/70 mt-1.5 leading-relaxed">
                  {isHindi
                    ? "प्रसार भारती सेंट्रल सेल्स यूनिट में अधिकृत पंजीकृत एजेंसी।"
                    : "Officially registered agency with Prasar Bharati CSU."}
                </p>
              </div>
            </div>

            {/* Election Campaigns */}
            <div className="space-y-4 pt-6 border-t border-white/10 break-inside-avoid">
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                {isHindi ? "ऐतिहासिक चुनावी व सामाजिक अभियान:" : "Historic Election & Social Campaigns:"}
              </h3>

              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 break-inside-avoid shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm sm:text-base font-bold text-[#E3A652]">
                    {isHindi ? "विधान सभा चुनाव 2013" : "2013 Chhattisgarh Assembly Election"}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-[#E3A652]/20 text-[#E3A652] font-bold">
                    {isHindi ? "रेडियो अभियान" : "AIR Radio Campaign"}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  {isHindi
                    ? "प्रदेश के 06 आकाशवाणी केन्द्रों से भारतीय जनता पार्टी के आधिकारिक चुनाव प्रचार हेतु रेडियो जिंगल निर्माण एवं प्रसारण की अनुबंधित एजेंसी।"
                    : "Sole contracted agency for producing and broadcasting official radio campaign jingles across all 6 All India Radio stations in Chhattisgarh."}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 break-inside-avoid shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm sm:text-base font-bold text-[#E3A652]">
                    {isHindi ? "लोक सभा चुनाव 2014" : "2014 National Parliamentary Election"}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-[#E3A652]/20 text-[#E3A652] font-bold">
                    {isHindi ? "रेडियो अभियान" : "AIR Radio Campaign"}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  {isHindi
                    ? "प्रदेश के 06 आकाशवाणी केन्द्रों से भारतीय जनता पार्टी के राष्ट्रीय प्रचार अभियान हेतु रेडियो जिंगल निर्माण व व्यापक प्रसारण।"
                    : "Lead creative agency for producing BJP's election broadcast jingles across 6 AIR stations during the 2014 national elections."}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 break-inside-avoid shadow-sm">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm sm:text-base font-bold text-[#E3A652]">
                    {isHindi ? "अंतरराष्ट्रीय एवं एनजीओ प्रोजेक्ट्स" : "Global Organizations (UNICEF & World Bank)"}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-white/10 text-white/90 font-bold">
                    {isHindi ? "वैश्विक सहयोग" : "Global Impact"}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                  {isHindi
                    ? "यूनिसेफ (UNICEF) हेतु वीडियो स्पॉट्स एवं वर्ल्ड बैंक (World Bank) वित्तपोषित योजनाओं के प्रचार-प्रसार के लिए वृत्तचित्र एवं रेडियो सीरियल निर्माण। विभिन्न एनजीओ के साथ जन-जागरूकता यात्राओं का कुशल संयोजन।"
                    : "Video spot creation for UNICEF; documentary and radio serial production for World Bank-funded missions; leadership of mass public awareness travel campaigns across tribal districts."}
                </p>
              </div>
            </div>

            {/* Multilingual Expertise */}
            <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center gap-2.5 break-inside-avoid">
              <span className="text-xs sm:text-sm font-bold text-[#E3A652] mr-2 flex items-center gap-1.5">
                <Languages className="w-4 h-4" /> {isHindi ? "कार्यक्षेत्र भाषाएं:" : "Production Languages:"}
              </span>
              {[
                { hi: "हिंदी", en: "Hindi" },
                { hi: "छत्तीसगढ़ी", en: "Chhattisgarhi" },
                { hi: "गोंडी", en: "Gondi" },
                { hi: "हल्बी", en: "Halbi" },
                { hi: "सरगुजिहा", en: "Surgujia" },
                { hi: "अंग्रेजी", en: "English" },
              ].map((item) => (
                <span
                  key={item.en}
                  className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-white/5 text-white/90 border border-white/10"
                >
                  {item[lang] || item.en}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* TAB 5: CULTURE, EDUCATION & LEADERSHIP */}
        <div className={activeTab === "culture" ? "block space-y-6" : "hidden print:block space-y-6"}>
          {/* Education & Credentials */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 break-inside-avoid shadow-lg">
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-11 h-11 rounded-xl bg-[#E3A652]/15 flex items-center justify-center text-[#E3A652] flex-shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                  {isHindi ? "शिक्षा, संगीत दीक्षा एवं संगठनात्मक नेतृत्व" : "Academic Credentials, Music & Cultural Leadership"}
                </h2>
                <p className="text-sm sm:text-base text-[#E3A652] font-bold mt-0.5">
                  {isHindi ? "शैक्षणिक योग्यता एवं सामाजिक दायित्व" : "Degrees, Classical Folk Music Training & Associations"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5 break-inside-avoid shadow-sm">
                <p className="text-xs sm:text-sm font-bold text-[#E3A652] uppercase tracking-wider">
                  {isHindi ? "एम.ए. राजनीति शास्त्र" : "M.A. Political Science"}
                </p>
                <p className="text-base sm:text-lg font-bold text-white">Postgraduate Degree</p>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {isHindi
                    ? "राजनीतिक, प्रशासनिक एवं सामाजिक संरचना की सूक्ष्म समझ।"
                    : "Deep foundational study of governance, public policy, and socio-political dynamics."}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5 break-inside-avoid shadow-sm">
                <p className="text-xs sm:text-sm font-bold text-[#E3A652] uppercase tracking-wider">
                  {isHindi ? "बी.जे.एम.सी. (BJMC)" : "Bachelor of Journalism (BJMC)"}
                </p>
                <p className="text-base sm:text-lg font-bold text-white">Pt. Ravishankar Shukla Univ., Raipur</p>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {isHindi
                    ? "पत्रकारिता एवं जनसंचार में प्रतिष्ठित स्नातक उपाधि।"
                    : "Formal graduation in journalism and mass communication."}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5 break-inside-avoid shadow-sm">
                <p className="text-xs sm:text-sm font-bold text-[#E3A652] uppercase tracking-wider">
                  {isHindi ? "डिप्लोमा इन लोक संगीत" : "Diploma in Folk Music"}
                </p>
                <p className="text-base sm:text-lg font-bold text-white">Indira Kala Sangeet Vishwavidyalaya, Khairagarh</p>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {isHindi
                    ? "एशिया के विख्यात कला विश्वविद्यालय से पारंपरिक लोक संगीत में विशेष योग्यता।"
                    : "Specialized qualification in indigenous folk traditions from Asia's premier music university."}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1.5 break-inside-avoid shadow-sm">
                <p className="text-xs sm:text-sm font-bold text-[#E3A652] uppercase tracking-wider">
                  {isHindi ? "वाणी पाठ्यक्रम (Vani Course)" : "Vani Broadcasting Certification"}
                </p>
                <p className="text-base sm:text-lg font-bold text-white">Prasar Bharati, New Delhi</p>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {isHindi
                    ? "प्रसारण, वाचन एवं उच्चार प्रामाणिकता का आधिकारिक प्रशिक्षण।"
                    : "Official high-level training in vocal delivery, pronunciation, and broadcast production."}
                </p>
              </div>
            </div>

            {/* Cultural & Social Leadership */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-4 break-inside-avoid">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {isHindi ? "सामाजिक एवं सांस्कृतिक दायित्व:" : "Organizational & Cultural Leadership Roles:"}
              </h3>

              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3.5 break-inside-avoid shadow-sm">
                <div className="p-2.5 rounded-xl bg-[#E3A652]/10 text-[#E3A652] mt-0.5 flex-shrink-0">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-bold text-white">
                    CCTPA (Chhattisgarh Cine And Television Producers Association)
                  </p>
                  <p className="text-sm text-white/75 mt-1 leading-relaxed">
                    {isHindi
                      ? "संस्थापक सदस्य (Founder Member) — प्रदेश के सिने व टेलीविजन उत्पादकों के सशक्तिकरण में महत्वपूर्ण भूमिका।"
                      : "Founder Member — playing a pivotal role in organizing and advancing the regional film & TV industry."}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3.5 break-inside-avoid shadow-sm">
                <div className="p-2.5 rounded-xl bg-[#E3A652]/10 text-[#E3A652] mt-0.5 flex-shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-bold text-white">
                    {isHindi ? "प्रबंध समिति 'कैलाश धाम' भरदा — अध्यक्ष" : "President — Kailash Dham Managing Committee, Bharda"}
                  </p>
                  <p className="text-sm text-white/75 mt-1 leading-relaxed">
                    {isHindi
                      ? "अखिल भारतीय विद्यार्थी परिषद (ABVP) द्वारा निर्मित भगवान शिव मंदिर समिति के अध्यक्ष पद का निष्ठापूर्वक निर्वहन।"
                      : "President of the historic Lord Shiva temple managing committee initiated by ABVP."}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3.5 break-inside-avoid shadow-sm">
                <div className="p-2.5 rounded-xl bg-[#E3A652]/10 text-[#E3A652] mt-0.5 flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-bold text-white">
                    {isHindi ? "सनातन संस्कृति व लोकसंस्कार के आजीवन विद्यार्थी" : "Lifelong Student of Indic Heritage & Living Traditions"}
                  </p>
                  <p className="text-sm text-white/75 mt-1 leading-relaxed">
                    {isHindi
                      ? "भारतीय कला, संस्कृति, साहित्य, अध्यात्म, दर्शन एवं राजनीति में विशेष अभिरुचि। छत्तीसगढ़ी लोक कला और जीवन मूल्यों के सतत संवाहक।"
                      : "Committed to preserving the philosophy, poetry, and indigenous ethos of Central India for upcoming generations."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Business Card & Direct Contact Details */}
        <section className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-[#E3A652]/30 relative overflow-hidden shadow-2xl break-inside-avoid">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3A652]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#E3A652]">
                  {isHindi ? "आधिकारिक संपर्क विवरण" : "Official Executive Contact"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
                  {isHindi ? "संपर्क एवं संवाद" : "Direct Connect & Studio Office"}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 shadow-md transition-all active:scale-95 cursor-pointer no-print"
                >
                  <Printer className="w-4 h-4 text-[#E3A652]" />
                  <span>{isHindi ? "PDF प्रिंट / सहेजें" : "Print / Save PDF"}</span>
                </button>
                <button
                  onClick={downloadVCard}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#E3A652] hover:bg-[#F4D090] text-[#050608] shadow-lg shadow-[#E3A652]/20 transition-all active:scale-95 cursor-pointer no-print"
                >
                  <Download className="w-4 h-4" />
                  <span>{isHindi ? "संपर्क सहेजें (vCard)" : "Download Contact (vCard)"}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Address */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2 break-inside-avoid">
                <div className="flex items-center gap-2 text-[#E3A652] mb-1">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">{isHindi ? "स्थाई पता" : "Studio Address"}</span>
                </div>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                  {isHindi
                    ? "राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर, रायपुर, पोस्ट: सुंदर नगर, पिन - 492013 (छ.ग.)"
                    : "Behind Rajkumar College, Sonkar Badi, Ashwani Nagar, Raipur, Post: Sunder Nagar, PIN - 492013 (C.G.)"}
                </p>
              </div>

              {/* Mobile */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2 break-inside-avoid">
                <div className="flex items-center gap-2 text-[#E3A652] mb-1">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">{isHindi ? "दूरभाष / मोबाइल" : "Mobile Phone"}</span>
                </div>
                <p className="text-sm sm:text-base text-white/95 font-mono font-bold">
                  <a href="tel:7000866323" className="hover:text-[#E3A652] transition-colors block">
                    +91 7000866323
                  </a>
                  <a href="tel:9826167533" className="hover:text-[#E3A652] transition-colors block mt-1">
                    +91 9826167533
                  </a>
                </p>
              </div>

              {/* Email */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2 break-inside-avoid">
                <div className="flex items-center gap-2 text-[#E3A652] mb-1">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">{isHindi ? "ईमेल" : "Email Address"}</span>
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
                  <span className="text-xs font-bold uppercase tracking-wider">{isHindi ? "वेबसाइट" : "Website"}</span>
                </div>
                <p className="text-xs sm:text-sm text-white/95 font-semibold">
                  <Link href="/" className="hover:text-[#E3A652] transition-colors flex items-center gap-1.5">
                    <span>www.bsrfilms.com</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Print-Only Dossier Official Footer */}
        <div className="hidden print:block pt-12 mt-12 border-t-2 border-[#8C4E00] text-center text-xs text-neutral-600 space-y-1.5 break-inside-avoid">
          <p className="font-bold text-[#8C4E00] text-sm tracking-wide">
            बी.एस.आर. फिल्म्स रायपुर (BSR Films Raipur) • आधिकारिक परिचय संचिका (Executive Dossier)
          </p>
          <p className="text-neutral-700">
            राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर, रायपुर (छ.ग.) 492013 • फोन: +91 7000866323, 9826167533 • ईमेल: bsrfilms2017@gmail.com
          </p>
          <p className="text-[10px] text-neutral-500 font-medium">
            © BSR Films Raipur • 25+ Years of Dedicated Media & Cultural Excellence | Empanelled with NFDC, AIR & CG Samvad
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
          <span className="text-[0.65rem] font-bold">{isHindi ? "कॉल करें" : "Call"}</span>
        </a>

        <a
          href={`https://wa.me/917000866323?text=${encodeURIComponent(
            isHindi
              ? "नमस्ते भीष्मदेव जी, मैं आपकी प्रोफ़ाइल देखकर संपर्क कर रहा हूँ।"
              : "Hello Bhishmdev Sir, I am reaching out after viewing your executive portfolio."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1 text-white hover:text-[#25D366] transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366] mb-0.5" />
          <span className="text-[0.65rem] font-bold">{isHindi ? "व्हाट्सएप" : "WhatsApp"}</span>
        </a>

        <button
          onClick={handlePrint}
          className="flex-1 flex flex-col items-center justify-center py-1 text-white hover:text-[#E3A652] transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4 text-[#E3A652] mb-0.5" />
          <span className="text-[0.65rem] font-bold">{isHindi ? "पीडीएफ" : "PDF"}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex-1 flex flex-col items-center justify-center py-1 text-white hover:text-[#E3A652] transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-[#E3A652] mb-0.5" />
          <span className="text-[0.65rem] font-bold">{isHindi ? "शेयर करें" : "Share"}</span>
        </button>

        <button
          onClick={downloadVCard}
          className="flex-1 flex flex-col items-center justify-center py-1 text-white hover:text-[#E3A652] transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#E3A652] mb-0.5" />
          <span className="text-[0.65rem] font-bold">{isHindi ? "सहेजें" : "Save"}</span>
        </button>
      </div>
    </div>
  );
}
