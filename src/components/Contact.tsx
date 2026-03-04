"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";

const projectTypes = [
  "Documentary",
  "Corporate Film",
  "Ad Film / TVC",
  "Government Campaign",
  "Feature Film",
  "Radio / Audio Production",
  "Animation / VFX",
  "Social Media Campaign",
  "Mobile Application",
  "Other",
];

interface FormState {
  name: string;
  org: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  org: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "0ba34f6c-78ab-4c2e-8c14-05afcb7da401",
          subject: `New Project Brief from ${form.name}`,
          from_name: "BSR Films Website",
          name: form.name,
          organization: form.org,
          email: form.email,
          phone: form.phone,
          project_type: form.projectType,
          message: form.message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setForm(initialForm);
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050608 0%, #080a0e 50%, #050608 100%)" }}
      aria-label="Contact BSR Films for your project"
    >
      {/* Decorative reel-dot pattern */}
      <div className="absolute inset-0 reel-dots opacity-30 pointer-events-none" aria-hidden="true" />
      {/* Ambient gold glow - top right */}
      <div aria-hidden="true" className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(227,166,82,0.03) 0%, transparent 70%)" }} />

      <div className="relative max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[#E3A652] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Let’s Create Together
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white gold-underline mx-auto inline-block mb-6 text-cinema">
            Start Your <span style={{ color: "#E3A652" }}>Project</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto mt-8 leading-relaxed">
            Have a story to tell? Let's talk. Brief us about your project and
            our team will get back within 24 hours.
          </p>
        </motion.div>

        {/* Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* â”€â”€ Left: Contact Info â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between gap-10"
          >
            <div>
              <h3 className="text-white text-2xl font-bold mb-8">
                Reach Us Directly
              </h3>

              <ul className="flex flex-col gap-7" role="list">
                <li className="flex gap-4 items-start group">
                  <div className="w-11 h-11 rounded-xl bg-[#E3A652]/10 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:bg-[#E3A652]/20 group-hover:shadow-[0_0_16px_rgba(227,166,82,0.2)]">
                    <Mail size={20} className="text-[#E3A652]" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:info@bsrfilms.in"
                      className="text-white text-base font-semibold hover:text-[#E3A652] transition-colors"
                      aria-label="Send email to BSR Films"
                    >
                      info@bsrfilms.in
                    </a>
                  </div>
                </li>

                <li className="flex gap-4 items-start group">
                  <div className="w-11 h-11 rounded-xl bg-[#E3A652]/10 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:bg-[#E3A652]/20 group-hover:shadow-[0_0_16px_rgba(227,166,82,0.2)]">
                    <Phone size={20} className="text-[#E3A652]" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                      Phone
                    </p>
                    <a
                      href="tel:+917712345678"
                      className="text-white text-base font-semibold hover:text-[#E3A652] transition-colors"
                      aria-label="Call BSR Films"
                    >
                      +91 771 234 5678
                    </a>
                  </div>
                </li>

                <li className="flex gap-4 items-start group">
                  <div className="w-11 h-11 rounded-xl bg-[#E3A652]/10 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:bg-[#E3A652]/20 group-hover:shadow-[0_0_16px_rgba(227,166,82,0.2)]">
                    <MapPin size={20} className="text-[#E3A652]" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                      Address
                    </p>
                    <address className="text-white text-base font-semibold not-italic leading-relaxed">
                      BSR Films, Media Hub,
                      <br />
                      Raipur, Chhattisgarh — 492001
                      <br />
                      India
                    </address>
                  </div>
                </li>
              </ul>
            </div>

            {/* Decorative bottom accent */}
            <div className="hidden lg:block">
              <div className="h-px bg-gradient-to-r from-[#E3A652]/40 to-transparent mb-6" />
              <p className="text-white/30 text-sm leading-relaxed">
                BSR Films — empanelled with NFDC, All India Radio Central Sales
                Unit, and Chhattisgarh Samvad (Dept. of Public Relations).
              </p>
            </div>
          </motion.div>

          {/* â”€â”€ Right: Contact Form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                <div className="w-16 h-16 rounded-full bg-[#E3A652]/15 flex items-center justify-center mb-6">
                  <ArrowRight size={28} className="text-[#E3A652]" />
                </div>
                <h3 className="text-white text-2xl font-bold mb-3">
                  Message Received!
                </h3>
                <p className="text-white/50 leading-relaxed max-w-sm">
                  Thank you for reaching out. Our team will review your brief
                  and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-[#E3A652] font-semibold text-sm hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-7"
                noValidate
                aria-label="Project brief contact form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-white/35 text-xs uppercase tracking-widest block mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Rajesh Kumar"
                      value={form.name}
                      onChange={handleChange}
                      className="form-input"
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="org"
                      className="text-white/35 text-xs uppercase tracking-widest block mb-2"
                    >
                      Organization
                    </label>
                    <input
                      id="org"
                      name="org"
                      type="text"
                      autoComplete="organization"
                      placeholder="Your company / dept."
                      value={form.org}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <div>
                    <label
                      htmlFor="email"
                      className="text-white/35 text-xs uppercase tracking-widest block mb-2"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="form-input"
                      aria-required="true"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="text-white/35 text-xs uppercase tracking-widest block mb-2"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="projectType"
                    className="text-white/35 text-xs uppercase tracking-widest block mb-2"
                  >
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className="form-input"
                    aria-label="Select project type"
                  >
                    <option value="" disabled>
                      Select a category…
                    </option>
                    {projectTypes.map((pt) => (
                      <option key={pt} value={pt}>
                        {pt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-white/35 text-xs uppercase tracking-widest block mb-2"
                  >
                    Project Brief *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your project — scope, timeline, goals…"
                    value={form.message}
                    onChange={handleChange}
                    className="form-input resize-none"
                    aria-required="true"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="self-start inline-flex items-center gap-3 text-[#050608] font-bold px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background: "linear-gradient(135deg, #E3A652 0%, #D4913E 50%, #EDB96A 100%)",
                    boxShadow: "0 6px 20px rgba(227,166,82,0.35), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.25)",
                    textShadow: "0 1px 0 rgba(255,255,255,0.2)",
                  }}
                  aria-label="Submit your project brief"
                >
                  <Send size={16} className={sending ? "animate-pulse" : ""} />
                  {sending ? "Sending…" : "Send Project Brief"}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* â”€â”€ Footer Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="mt-20 mb-2">
          <div className="section-divider" />
        </div>
        <div className="pt-8 flex flex-col items-center gap-6">
          {/* Social Media */}
          <div className="flex items-center gap-5">
            <p className="text-white/30 text-xs tracking-[0.15em] uppercase font-semibold mr-2">Follow Us</p>
            {/* YouTube */}
            <a
              href="https://www.youtube.com/@bsrfilms"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, rgba(255,0,0,0.12) 0%, rgba(255,0,0,0.04) 100%)", border: "1px solid rgba(255,0,0,0.15)", boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
              aria-label="BSR Films on YouTube"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:scale-110">
                <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.81z" fill="#FF0000"/>
                <path d="M9.75 15.02l6.25-3.52-6.25-3.52v7.04z" fill="white"/>
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://www.facebook.com/bsrfilms"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, rgba(24,119,242,0.12) 0%, rgba(24,119,242,0.04) 100%)", border: "1px solid rgba(24,119,242,0.15)", boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
              aria-label="BSR Films on Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:scale-110">
                <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12z" fill="#1877F2"/>
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/bsrfilms"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, rgba(225,48,108,0.12) 0%, rgba(252,175,69,0.04) 100%)", border: "1px solid rgba(225,48,108,0.15)", boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
              aria-label="BSR Films on Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:scale-110">
                <defs>
                  <radialGradient id="ig-footer" cx="30%" cy="107%" r="150%">
                    <stop offset="0%" stopColor="#fdf497"/>
                    <stop offset="5%" stopColor="#fdf497"/>
                    <stop offset="45%" stopColor="#fd5949"/>
                    <stop offset="60%" stopColor="#d6249f"/>
                    <stop offset="90%" stopColor="#285AEB"/>
                  </radialGradient>
                </defs>
                <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-footer)"/>
                <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" fill="none"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
              </svg>
            </a>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
            <p className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} BSR Films. All rights reserved.
              Raipur, Chhattisgarh, India.
            </p>
            <p className="text-white/25 text-sm">
              Empanelled with{" "}
              <span className="text-white/40">NFDC &middot; AIR Central Sales Unit &middot; Chhattisgarh Samvad</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
