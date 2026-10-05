import type { Metadata } from "next";
import FounderProfile from "@/components/FounderProfile";

export const metadata: Metadata = {
  title: "भीष्मदेव चतुर्वेदी | संस्थापक एवं निर्देशक — BSR Films",
  description:
    "श्री भीष्मदेव चतुर्वेदी — लेखक, निर्देशक, निर्माता, गीतकार, कवि एवं वरिष्ठ मीडिया विशेषज्ञ। 30+ वर्षों का आकाशवाणी व दूरदर्शन अनुभव, 600+ वीडियो स्पॉट्स, 300+ डॉक्यूमेंट्री, NFDC व छत्तीसगढ़ संवाद पंजीकृत बी.एस.आर. फिल्म्स रायपुर के संस्थापक।",
  keywords: [
    "भीष्मदेव चतुर्वेदी",
    "Bhishmdev Chaturvedi",
    "BSR Films",
    "BSR Films Raipur",
    "छत्तीसगढ़ फिल्म निर्माता",
    "आकाशवाणी रायपुर",
    "दूरदर्शन रायपुर",
    "NFDC Enlisted Film Producer",
    "Chhattisgarh Media House",
    "Documentary Filmmaker Raipur",
  ],
  alternates: {
    canonical: "https://bsrfilms.com/founder",
  },
  openGraph: {
    title: "भीष्मदेव चतुर्वेदी | संस्थापक एवं निर्देशक — BSR Films",
    description:
      "लेखक, निर्देशक, निर्माता, गीतकार एवं 30+ वर्षों की आकाशवाणी व दूरदर्शन यात्रा। 600+ वीडियो स्पॉट्स, 300+ वृत्तचित्र। बी.एस.आर. फिल्म्स रायपुर।",
    url: "https://bsrfilms.com/founder",
    siteName: "BSR Films",
    locale: "hi_IN",
    type: "profile",
    images: [
      {
        url: "/team/bhishma.png",
        width: 800,
        height: 1000,
        alt: "भीष्मदेव चतुर्वेदी - संस्थापक, बी.एस.आर. फिल्म्स रायपुर",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "भीष्मदेव चतुर्वेदी | संस्थापक एवं निर्देशक — BSR Films",
    description:
      "30+ वर्षों की आकाशवाणी, दूरदर्शन एवं वृत्तचित्र निर्माण यात्रा। बी.एस.आर. फिल्म्स रायपुर के संस्थापक की विस्तृत प्रोफ़ाइल।",
    images: ["/team/bhishma.png"],
  },
};

export default function FounderPage() {
  return <FounderProfile />;
}
