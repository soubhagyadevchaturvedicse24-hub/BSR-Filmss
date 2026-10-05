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
  Copy,
  MapPin,
  Sparkles,
  Download,
  ArrowLeft,
  MessageSquare,
  Building2,
  Calendar,
  Languages,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface StatItem {
  number: string;
  label: string;
  sub: string;
}

const stats: StatItem[] = [
  { number: "30+", label: "वर्षों का अनुभव", sub: "आकाशवाणी एवं मीडिया सेवा" },
  { number: "600+", label: "वीडियो स्पॉट्स", sub: "विज्ञापन एवं जनहित संदेश" },
  { number: "300+", label: "वृत्तचित्र व फिल्में", sub: "डॉक्यूमेंट्री व लघु फिल्में" },
  { number: "500+", label: "रेडियो एपिसोड्स", sub: "हिंदी एवं छत्तीसगढ़ी धारावाहिक" },
  { number: "80+", label: "दूरदर्शन स्पॉट्स", sub: "प्रथम वीडियो स्पॉट सहित" },
  { number: "06", label: "भाषाएं एवं बोलियां", sub: "हिंदी, छत्तीसगढ़ी, गोंडी, हल्बी..." },
];

const roles = [
  "लेखक (Writer)",
  "निर्देशक (Director)",
  "निर्माता (Producer)",
  "गीतकार (Lyricist)",
  "कवि (Poet)",
  "मंच संचालक (Compère)",
  "सांस्कृतिक एवं सामाजिक सेवक",
];

const tabs = [
  { id: "overview", label: "समग्र परिचय", icon: Sparkles },
  { id: "air", label: "आकाशवाणी यात्रा", icon: Radio },
  { id: "dd", label: "दूरदर्शन कृतित्व", icon: Tv },
  { id: "bsr", label: "बी.एस.आर. फिल्म्स व अभियान", icon: Film },
  { id: "culture", label: "शिक्षा, लोकसंस्कृति व दायित्व", icon: BookOpen },
];

export default function FounderProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    // Ensure loading class is cleared if navigated directly
    document.body.classList.remove("loading");
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleShare = async () => {
    const shareData = {
      title: "भीष्मदेव चतुर्वेदी | संस्थापक एवं निर्देशक — BSR Films",
      text: "श्री भीष्मदेव चतुर्वेदी — लेखक, निर्देशक, निर्माता एवं 30+ वर्षों की आकाशवाणी, दूरदर्शन व छत्तीसगढ़ी मीडिया यात्रा। विस्तृत प्रोफ़ाइल देखें:",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or share failed, fallback to copy
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    showToast("प्रोफ़ाइल लिंक कॉपी हो गया! आप इसे कहीं भी साझा कर सकते हैं।");
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
    showToast("डिजिटल संपर्क (vCard) डाउनलोड हो गया!");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 pb-24 md:pb-16 selection:bg-[#E3A652]/30 selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#12141c] text-white border border-[#E3A652]/50 px-5 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-2.5 text-xs sm:text-sm font-medium backdrop-blur-md"
          >
            <Check className="w-4 h-4 text-[#E3A652]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Floating Navigation */}
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-white/10 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide text-white/80 hover:text-[#E3A652] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>बी.एस.आर. फिल्म्स मुख्य पृष्ठ</span>
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <ThemeToggle />
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold bg-[#E3A652]/15 hover:bg-[#E3A652]/25 text-[#E3A652] border border-[#E3A652]/30 transition-all active:scale-95"
              title="प्रोफ़ाइल शेयर करें"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>कॉपी हुआ</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>साझा करें</span>
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
                    <span className="inline-block px-3 py-1 rounded-full text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider bg-[#E3A652] text-[#050608] shadow-md">
                      संस्थापक एवं निर्देशक (Founder)
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
                  href="https://wa.me/917000866323?text=नमस्ते%20भीष्मदेव%20जी,%20मैं%20आपकी%20प्रोफ़ाइल%20देखकर%20संपर्क%20कर%20रहा%20हूँ।"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 transition-all active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>व्हाट्सएप</span>
                </a>
                <button
                  onClick={downloadVCard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#E3A652]/10 hover:bg-[#E3A652]/20 text-[#E3A652] border border-[#E3A652]/30 transition-all active:scale-95"
                  title="संपर्क सहेजें (.vcf)"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>vCard सहेजें</span>
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.7rem] font-semibold tracking-wider uppercase bg-[#E3A652]/10 text-[#E3A652] border border-[#E3A652]/20 w-fit mb-3">
                <Building2 className="w-3.5 h-3.5" />
                <span>बी.एस.आर. फिल्म्स रायपुर (स्थापना 2000)</span>
              </div>

              {/* Name */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2 font-serif leading-tight">
                भीष्मदेव चतुर्वेदी
              </h1>
              <p className="text-sm sm:text-base text-[#E3A652] font-semibold tracking-wide mb-4">
                Bhishmdev Chaturvedi — Senior Media Producer, Director & Author
              </p>

              {/* पितृ-स्मृति एवं संस्कार (Lineage & Heritage Card) */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#E3A652]" />
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                  <span className="text-[#E3A652] font-bold">पिता:</span> स्व. श्री दीनानाथ चतुर्वेदी
                </p>
                <p className="text-xs text-white/60 mt-1 leading-relaxed">
                  (राष्ट्रसेवी स्वयंसेवक - RSS, सेवानिवृत्त शिक्षक, प्रख्यात रामायणविद, पूर्व मंडल अध्यक्ष - भारतीय जनता पार्टी)
                </p>
              </div>

              {/* बहुआयामी भूमिकाएं (Roles Pills) */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
                {roles.map((r) => (
                  <span
                    key={r}
                    className="px-2.5 py-1 rounded-md text-[0.7rem] sm:text-xs font-medium bg-white/[0.05] text-white/80 border border-white/10 hover:border-[#E3A652]/40 transition-colors"
                  >
                    {r}
                  </span>
                ))}
              </div>

              {/* Philosophy Quote */}
              <blockquote className="border-l-2 border-[#E3A652] pl-3.5 py-1 text-xs sm:text-sm italic text-white/75 leading-relaxed bg-[#E3A652]/[0.02] rounded-r-lg">
                &quot;भारतीय कला, संस्कृति, साहित्य और लोक संस्कारों की अविरल धारा — हमर छत्तीसगढ़ की माटी, बोली और अस्मिता के प्रति आजीवन समर्पित।&quot;
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
                key={s.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all text-center flex flex-col justify-center"
              >
                <span className="text-2xl sm:text-3xl font-extrabold text-[#E3A652] font-mono leading-none mb-1">
                  {s.number}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                  {s.label}
                </span>
                <span className="text-[0.65rem] text-white/50 mt-1 leading-snug">
                  {s.sub}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Tabs for Clean Mobile & Desktop Navigation */}
      <section className="sticky top-14 sm:top-16 z-30 bg-[var(--bg-primary)]/95 backdrop-blur-md border-y border-white/10 py-2 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#E3A652] text-[#050608] shadow-md shadow-[#E3A652]/20 font-bold"
                      : "bg-white/[0.03] text-white/70 hover:text-white hover:bg-white/[0.07]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Area based on Tabs */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <AnimatePresence mode="wait">
          {/* TAB 1: OVERVIEW & SUMMARY */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Executive Summary Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#E3A652]/15 flex items-center justify-center text-[#E3A652]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
                    सांस्कृतिक एवं मीडिया यात्रा का संक्षिप्त परिचय
                  </h2>
                </div>
                <div className="space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed">
                  <p>
                    <strong className="text-white">श्री भीष्मदेव चतुर्वेदी</strong> छत्तीसगढ़ के कला, साहित्य, दूरदर्शन एवं प्रसारण जगत के एक अत्यंत सम्मानित और वरिष्ठ हस्ताक्षर हैं। पिछले तीन दशकों से अधिक समय से उन्होंने राज्य की माटी, लोकसंस्कृति और सामाजिक सरोकारों को अपनी लेखनी, वाणी और निर्देशन के माध्यम से राष्ट्रीय क्षितिज पर स्थापित किया है।
                  </p>
                  <p>
                    सन् 2000 में उन्होंने <strong className="text-[#E3A652]">बी.एस.आर. फिल्म्स (BSR Films)</strong> की स्थापना रायपुर में की, जो आज राष्ट्रीय फिल्म विकास निगम (NFDC), छत्तीसगढ़ संवाद (&apos;ब&apos; श्रेणी) तथा प्रसार भारती के केंद्रीय विक्रय एकांश में पंजीकृत छत्तीसगढ़ की एक प्रमुख एवं विश्वसनीय प्रोडक्शन संस्था है।
                  </p>
                  <p>
                    आकाशवाणी रायपुर में 30 वर्षों तक नैमेत्तिक कंपियर (चौपाल एवं श्रमिक जगत) के रूप में कार्य करने, &apos;बी हाई-ग्रेड&apos; नाट्य कलाकार होने और दूरदर्शन केंद्र रायपुर के लिए प्रथम वीडियो स्पॉट सहित 15 टेलीफिल्म्स व 5 धारावाहिकों के लेखन-निर्देशन का अनूठा कीर्तिमान उनके नाम है।
                  </p>
                </div>
              </div>

              {/* Quick Glance Bento Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3 text-[#E3A652]">
                    <Radio className="w-5 h-5" />
                    <h3 className="text-base sm:text-lg font-bold text-white">प्रसारण एवं मीडिया प्रभुत्व</h3>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E3A652] flex-shrink-0 mt-0.5" />
                      <span>आकाशवाणी रायपुर: 30 वर्ष कंपियर, 50 रूपक, 10 नाटक, 6 सीरियल्स अनुबंध।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E3A652] flex-shrink-0 mt-0.5" />
                      <span>दूरदर्शन रायपुर: प्रथम वीडियो स्पॉट, 80+ स्पॉट्स, 15 टेलीफिल्म्स, 5 धारावाहिक।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E3A652] flex-shrink-0 mt-0.5" />
                      <span>प्रसिद्ध एंकर: परिक्रमा, हमर गांव, भुइयां के गोठ, कृषि दर्शन।</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                  <div className="flex items-center gap-3 mb-3 text-[#E3A652]">
                    <Award className="w-5 h-5" />
                    <h3 className="text-base sm:text-lg font-bold text-white">राष्ट्रीय अभियान एवं मान्यताएं</h3>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-white/70">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E3A652] flex-shrink-0 mt-0.5" />
                      <span>NFDC नई दिल्ली में अनुसूचित (Enlisted) फिल्म प्रोडक्शन फर्म।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E3A652] flex-shrink-0 mt-0.5" />
                      <span>विधान सभा 2013 एवं लोक सभा 2014 चुनाव में 6 आकाशवाणी केन्द्रों से आधिकारिक रेडियो जिंगल प्रसारण।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E3A652] flex-shrink-0 mt-0.5" />
                      <span>यूनिसेफ (UNICEF) एवं वर्ल्ड बैंक (World Bank) योजनाओं के लिए वृत्तचित्र व रेडियो निर्माण।</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: ALL INDIA RADIO (आकाशवाणी रायपुर) */}
          {activeTab === "air" && (
            <motion.div
              key="air"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E3A652]/15 flex items-center justify-center text-[#E3A652]">
                    <Radio className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
                      आकाशवाणी रायपुर (All India Radio) — तीन दशकों की विरासत
                    </h2>
                    <p className="text-xs sm:text-sm text-[#E3A652] font-medium">
                      नैमेत्तिक कंपियर, नाटककार, रूपक लेखक एवं &apos;बी हाई-ग्रेड&apos; कलाकार
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E3A652]">नैमेत्तिक कंपियर (लगभग 30 वर्ष)</span>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      आकाशवाणी रायपुर के सर्वाधिक लोकप्रिय कार्यक्रमों <strong className="text-white">&apos;चौपाल&apos;</strong> और <strong className="text-white">&apos;श्रमिक जगत&apos;</strong> में तीन दशकों तक अनुबंधित उद्घोषक व कंपियर के रूप में जन-जन की आवाज बने रहे।
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E3A652]">&apos;बी हाई-ग्रेड&apos; कलाकार (B-High Grade)</span>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      आकाशवाणी से नाटकों में आधिकारिक रूप से प्रतिष्ठित &apos;बी हाई-ग्रेड&apos; कलाकार के रूप में वर्गीकृत, अनगिनत रेडियो नाटकों में जीवंत अभिनय का परिचय दिया।
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E3A652]">50 रेडियो रूपक (Radio Features)</span>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      आकाशवाणी रायपुर के लिए 50 रेडियो रूपकों का विशिष्ट शोध, आलेखन एवं निर्माण अनुबंध सफलता पूर्वक संपन्न किया।
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E3A652]">10 नाटकों का लेखन व निर्माण</span>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      सामाजिक, ऐतिहासिक और सांस्कृतिक विषयों पर आधारित 10 संपूर्ण रेडियो नाटकों का लेखन एवं निर्माण।
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 md:col-span-2 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E3A652]">ऐतिहासिक रेडियो धारावाहिक (Radio Serials)</span>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      आकाशवाणी रायपुर के इतिहास का <strong className="text-white">प्रथम रेडियो सीरियल</strong> सहित कुल 6 धारावाहिकों (हिंदी एवं छत्तीसगढ़ी) का लेखन अनुबंध तथा 500 से अधिक कड़ियों (Episodes) का विशाल प्रसारण।
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: DOORDARSHAN (दूरदर्शन केंद्र रायपुर) */}
          {activeTab === "dd" && (
            <motion.div
              key="dd"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E3A652]/15 flex items-center justify-center text-[#E3A652]">
                    <Tv className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
                      दूरदर्शन केंद्र रायपुर — टेलीफिल्म्स, धारावाहिक एवं एंकरिंग
                    </h2>
                    <p className="text-xs sm:text-sm text-[#E3A652] font-medium">
                      टेलीफिल्म लेखक-निर्देशक एवं प्रतिष्ठित मुख्य एंकर
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                    <p className="text-3xl font-extrabold text-[#E3A652] font-mono">15</p>
                    <p className="text-xs sm:text-sm font-bold text-white mt-1">टेलीफिल्म्स</p>
                    <p className="text-[0.7rem] text-white/50 mt-0.5">संपूर्ण लेखन व निर्देशन</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                    <p className="text-3xl font-extrabold text-[#E3A652] font-mono">05</p>
                    <p className="text-xs sm:text-sm font-bold text-white mt-1">धारावाहिक (Serials)</p>
                    <p className="text-[0.7rem] text-white/50 mt-0.5">लेखन, निर्देशन व संचालन</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                    <p className="text-3xl font-extrabold text-[#E3A652] font-mono">80+</p>
                    <p className="text-xs sm:text-sm font-bold text-white mt-1">वीडियो स्पॉट्स</p>
                    <p className="text-[0.7rem] text-white/50 mt-0.5">डीडी रायपुर का प्रथम स्पॉट सहित</p>
                  </div>
                </div>

                {/* Iconic Anchor Shows */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h3 className="text-sm sm:text-base font-bold text-white mb-3">
                    दूरदर्शन रायपुर के प्रमुख कार्यक्रम, जिनका आपने मुख्य संचालन/एंकरिंग किया:
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {["परिक्रमा", "हमर गांव", "भुइयां के गोठ", "कृषि दर्शन", "नववर्ष विशेष कार्यक्रम", "राष्ट्रीय/क्षेत्रीय विशेष आयोजन"].map((show) => (
                      <div
                        key={show}
                        className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/5 text-xs font-semibold text-white/90 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E3A652]" />
                        <span>{show}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: BSR FILMS & CAMPAIGNS */}
          {activeTab === "bsr" && (
            <motion.div
              key="bsr"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E3A652]/15 flex items-center justify-center text-[#E3A652]">
                    <Film className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
                      बी.एस.आर. फिल्म्स — संस्थागत मान्यताएं एवं ऐतिहासिक अभियान
                    </h2>
                    <p className="text-xs sm:text-sm text-[#E3A652] font-medium">
                      वर्ष 2000 से निरंतर कार्यरत | NFDC एवं छत्तीसगढ़ संवाद पंजीकृत
                    </p>
                  </div>
                </div>

                {/* Institutional Empanelment */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-6">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-xs font-bold text-[#E3A652] uppercase">छत्तीसगढ़ संवाद</p>
                    <p className="text-sm font-bold text-white mt-1">&apos;ब&apos; श्रेणी में इम्पेनल्ड</p>
                    <p className="text-xs text-white/60 mt-1">2008 से आज पर्यंत ऑडियो-वीडियो निर्माण हेतु पंजीकृत फर्म।</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-xs font-bold text-[#E3A652] uppercase">NFDC नई दिल्ली</p>
                    <p className="text-sm font-bold text-white mt-1">अनुसूचित (Enlisted) एजेंसी</p>
                    <p className="text-xs text-white/60 mt-1">नेशनल फिल्म डेवलपमेंट कॉर्पोरेशन, नई दिल्ली में सूचीबद्ध।</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-xs font-bold text-[#E3A652] uppercase">प्रसार भारती</p>
                    <p className="text-sm font-bold text-white mt-1">केंद्रीय विक्रय एकांश</p>
                    <p className="text-xs text-white/60 mt-1">प्रसार भारती सेंट्रल सेल्स यूनिट में अधिकृत पंजीकृत एजेंसी।</p>
                  </div>
                </div>

                {/* Election Campaigns */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-sm sm:text-base font-bold text-white">ऐतिहासिक चुनावी व सामाजिक अभियान:</h3>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#E3A652]">विधान सभा चुनाव 2013</span>
                      <span className="text-[0.65rem] px-2 py-0.5 rounded bg-[#E3A652]/20 text-[#E3A652]">रेडियो अभियान</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      प्रदेश के <strong className="text-white">06 आकाशवाणी केन्द्रों</strong> से भारतीय जनता पार्टी के आधिकारिक चुनाव प्रचार हेतु रेडियो जिंगल निर्माण एवं प्रसारण की अनुबंधित एजेंसी।
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#E3A652]">लोक सभा चुनाव 2014</span>
                      <span className="text-[0.65rem] px-2 py-0.5 rounded bg-[#E3A652]/20 text-[#E3A652]">रेडियो अभियान</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      प्रदेश के 06 आकाशवाणी केन्द्रों से भारतीय जनता पार्टी के राष्ट्रीय प्रचार अभियान हेतु रेडियो जिंगल निर्माण व व्यापक प्रसारण।
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#E3A652]">अंतरराष्ट्रीय एवं एनजीओ प्रोजेक्ट्स</span>
                      <span className="text-[0.65rem] px-2 py-0.5 rounded bg-white/10 text-white/80">वैश्विक सहयोग</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      <strong className="text-white">यूनिसेफ (UNICEF)</strong> हेतु वीडियो स्पॉट्स एवं <strong className="text-white">वर्ल्ड बैंक (World Bank)</strong> वित्तपोषित योजनाओं के प्रचार-प्रसार के लिए वृत्तचित्र एवं रेडियो सीरियल निर्माण। विभिन्न एनजीओ के साथ जन-जागरूकता यात्राओं का कुशल संयोजन।
                    </p>
                  </div>
                </div>

                {/* Multilingual Expertise */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#E3A652] mr-2 flex items-center gap-1.5">
                    <Languages className="w-4 h-4" /> कार्यक्षेत्र भाषाएं:
                  </span>
                  {["हिंदी", "छत्तीसगढ़ी", "गोंडी", "हल्बी", "सरगुजिहा", "अंग्रेजी"].map((lang) => (
                    <span key={lang} className="px-2.5 py-1 rounded-md text-xs bg-white/5 text-white/80 border border-white/10">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: CULTURE, EDUCATION & LEADERSHIP */}
          {activeTab === "culture" && (
            <motion.div
              key="culture"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Education & Credentials */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#E3A652]/15 flex items-center justify-center text-[#E3A652]">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white font-serif">
                      शिक्षा, संगीत दीक्षा एवं संगठनात्मक नेतृत्व
                    </h2>
                    <p className="text-xs sm:text-sm text-[#E3A652] font-medium">
                      शैक्षणिक योग्यता, सांस्कृतिक दायित्व एवं सामाजिक सरोकार
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-xs font-bold text-[#E3A652] uppercase">एम.ए. राजनीति शास्त्र</p>
                    <p className="text-sm font-bold text-white mt-0.5">M.A. Political Science</p>
                    <p className="text-xs text-white/60 mt-1">राजनीतिक, प्रशासनिक एवं सामाजिक संरचना की सूक्ष्म समझ।</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-xs font-bold text-[#E3A652] uppercase">बी.जे.एम.सी. (BJMC)</p>
                    <p className="text-sm font-bold text-white mt-0.5">पं. रविशंकर शुक्ल विश्वविद्यालय, रायपुर</p>
                    <p className="text-xs text-white/60 mt-1">पत्रकारिता एवं जनसंचार में स्नातक उपाधि।</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-xs font-bold text-[#E3A652] uppercase">डिप्लोमा इन लोक संगीत</p>
                    <p className="text-sm font-bold text-white mt-0.5">इंदिरा कला संगीत विश्वविद्यालय, खैरागढ़</p>
                    <p className="text-xs text-white/60 mt-1">एशिया के विख्यात कला विश्वविद्यालय से पारंपरिक लोक संगीत में विशेष योग्यता।</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <p className="text-xs font-bold text-[#E3A652] uppercase">वाणी पाठ्यक्रम (Vani Course)</p>
                    <p className="text-sm font-bold text-white mt-0.5">प्रसार भारती, नई दिल्ली</p>
                    <p className="text-xs text-white/60 mt-1">प्रसारण, वाचन एवं उच्चार प्रामाणिकता का आधिकारिक प्रशिक्षण।</p>
                  </div>
                </div>

                {/* Cultural & Social Leadership */}
                <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                  <h3 className="text-base font-bold text-white">सामाजिक एवं सांस्कृतिक दायित्व:</h3>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#E3A652]/10 text-[#E3A652] mt-0.5">
                      <Film className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        CCTPA (Chhattisgarh Cine And Television Producers Association)
                      </p>
                      <p className="text-xs text-white/70 mt-0.5">
                        संस्थापक सदस्य (Founder Member) — प्रदेश के सिने व टेलीविजन उत्पादकों के सशक्तिकरण में महत्वपूर्ण भूमिका।
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#E3A652]/10 text-[#E3A652] mt-0.5">
                      <Heart className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        प्रबंध समिति &quot;कैलाश धाम&quot; भरदा — अध्यक्ष
                      </p>
                      <p className="text-xs text-white/70 mt-0.5">
                        अखिल भारतीय विद्यार्थी परिषद (ABVP) द्वारा निर्मित भगवान शिव मंदिर समिति के अध्यक्ष पद का निष्ठापूर्वक निर्वहन।
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#E3A652]/10 text-[#E3A652] mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        सनातन संस्कृति व लोकसंस्कार के आजीवन विद्यार्थी
                      </p>
                      <p className="text-xs text-white/70 mt-0.5">
                        भारतीय कला, संस्कृति, साहित्य, अध्यात्म, दर्शन एवं राजनीति में विशेष अभिरुचि। छत्तीसगढ़ी लोक कला और जीवन मूल्यों के सतत संवाहक।
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Digital Visiting Card & Direct Contact Details */}
        <section className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-[#E3A652]/30 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3A652]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[0.65rem] sm:text-xs font-bold tracking-widest uppercase text-[#E3A652]">
                  आधिकारिक संपर्क विवरण
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
                  संपर्क एवं संवाद
                </h3>
              </div>

              <button
                onClick={downloadVCard}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#E3A652] hover:bg-[#F4D090] text-[#050608] shadow-lg shadow-[#E3A652]/20 transition-all active:scale-95 w-fit"
              >
                <Download className="w-4 h-4" />
                <span>फोन में संपर्क सहेजें (Save Contact)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Address */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-[#E3A652] mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">स्थाई पता</span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  राजकुमार कॉलेज के पीछे, सोनकर बड़ी, अश्वनी नगर, रायपुर, पोस्ट: सुंदर नगर, पिन - 492013 (छ.ग.)
                </p>
              </div>

              {/* Mobile */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-[#E3A652] mb-1">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">दूरभाष / मोबाइल</span>
                </div>
                <p className="text-xs text-white/90 font-mono font-medium">
                  <a href="tel:7000866323" className="hover:text-[#E3A652] transition-colors block">
                    +91 7000866323
                  </a>
                  <a href="tel:9826167533" className="hover:text-[#E3A652] transition-colors block mt-0.5">
                    +91 9826167533
                  </a>
                </p>
              </div>

              {/* Email */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-[#E3A652] mb-1">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">ईमेल</span>
                </div>
                <p className="text-xs text-white/90 font-mono break-all font-medium">
                  <a href="mailto:bsrfilms2017@gmail.com" className="hover:text-[#E3A652] transition-colors">
                    bsrfilms2017@gmail.com
                  </a>
                </p>
              </div>

              {/* Website */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <div className="flex items-center gap-2 text-[#E3A652] mb-1">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">वेबसाइट</span>
                </div>
                <p className="text-xs text-white/90 font-medium">
                  <Link href="/" className="hover:text-[#E3A652] transition-colors flex items-center gap-1">
                    <span>www.bsrfilms.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky Mobile Quick Action Bar (Thumb-Accessible Bottom Bar) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0A0C10]/95 backdrop-blur-xl border-t border-white/10 px-4 py-2.5 md:hidden flex items-center justify-around gap-2 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <a
          href="tel:7000866323"
          className="flex-1 flex flex-col items-center justify-center py-1 text-white hover:text-[#E3A652] transition-colors"
        >
          <Phone className="w-4 h-4 text-[#E3A652] mb-0.5" />
          <span className="text-[0.65rem] font-bold">कॉल करें</span>
        </a>

        <a
          href="https://wa.me/917000866323?text=नमस्ते%20भीष्मदेव%20जी,%20मैं%20आपकी%20प्रोफ़ाइल%20देखकर%20संपर्क%20कर%20रहा%20हूँ।"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1 text-white hover:text-[#25D366] transition-colors"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366] mb-0.5" />
          <span className="text-[0.65rem] font-bold">व्हाट्सएप</span>
        </a>

        <button
          onClick={handleShare}
          className="flex-1 flex flex-col items-center justify-center py-1 text-white hover:text-[#E3A652] transition-colors"
        >
          <Share2 className="w-4 h-4 text-[#E3A652] mb-0.5" />
          <span className="text-[0.65rem] font-bold">शेयर करें</span>
        </button>

        <button
          onClick={downloadVCard}
          className="flex-1 flex flex-col items-center justify-center py-1 text-white hover:text-[#E3A652] transition-colors"
        >
          <Download className="w-4 h-4 text-[#E3A652] mb-0.5" />
          <span className="text-[0.65rem] font-bold">सहेजें</span>
        </button>
      </div>
    </div>
  );
}
