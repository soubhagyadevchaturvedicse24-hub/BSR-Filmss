import type { Metadata } from "next";
import CompanyProfile from "@/components/CompanyProfile";

export const metadata: Metadata = {
  title: "बी.एस.आर. फिल्म्स रायपुर | कॉरपोरेट पोर्टफोलियो — BSR Films Raipur",
  description:
    "बी.एस.आर. फिल्म्स रायपुर — सेंट्रल इंडिया का प्रतिष्ठित मीडिया प्रोडक्शन हाउस। छत्तीसगढ़ संवाद 'ब' श्रेणी (पंजीयन 489), NFDC एवं प्रसार भारती मान्यता प्राप्त। 650+ विज्ञापन स्पॉट्स, 350+ वृत्तचित्र, 500+ ऑडियो कार्यक्रम।",
  keywords: [
    "BSR Films",
    "BSR Films Raipur",
    "बी.एस.आर. फिल्म्स",
    "छत्तीसगढ़ फिल्म प्रोडक्शन हाउस",
    "Chhattisgarh Media House",
    "Documentary Production Raipur",
    "TV Commercials Raipur",
    "NFDC Enlisted Film Producer",
    "Chhattisgarh Samwad Enlisted Agency",
  ],
  alternates: {
    canonical: "https://bsrfilms.com/company",
  },
  openGraph: {
    title: "बी.एस.आर. फिल्म्स रायपुर | कॉरपोरेट पोर्टफोलियो — BSR Films Raipur",
    description:
      "फिल्म, टेलीविजन, वृत्तचित्र एवं मीडिया प्रोडक्शन हाउस। 25+ वर्षों की संस्थागत विश्वसनीयता। छत्तीसगढ़ संवाद 'ब' श्रेणी, NFDC एवं प्रसार भारती अधिकृत।",
    url: "https://bsrfilms.com/company",
    siteName: "BSR Films",
    locale: "hi_IN",
    type: "website",
    images: [
      {
        url: "/bsr-brand.png",
        width: 1200,
        height: 630,
        alt: "बी.एस.आर. फिल्म्स रायपुर - कॉरपोरेट प्रोफाइल",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "बी.एस.आर. फिल्म्स रायपुर | कॉरपोरेट पोर्टफोलियो",
    description:
      "25+ वर्षों की संस्थागत विश्वसनीयता। 650+ विज्ञापन स्पॉट्स, 350+ वृत्तचित्र निर्माण का कीर्तिमान।",
    images: ["/bsr-brand.png"],
  },
};

export default function CompanyPage() {
  return <CompanyProfile />;
}
