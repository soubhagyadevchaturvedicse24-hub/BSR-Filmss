"use client";

import { useRef, useState, useCallback, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

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

type FieldErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^\+?[0-9]{1,4}[\s\-()0-9]{6,14}$/;
const COOLDOWN_MS = 30_000; // 30-second rate limit after submission

function validateForm(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const phone = form.phone.trim();
  const message = form.message.trim();

  if (!name || name.length < 2) errors.name = "Name must be at least 2 characters.";
  if (name.length > 100) errors.name = "Name must be under 100 characters.";
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_REGEX.test(email)) errors.email = "Please enter a valid email address.";
  if (phone && !PHONE_REGEX.test(phone)) errors.phone = "Please enter a valid phone number.";
  if (!message || message.length < 10) errors.message = "Please describe your project (min 10 characters).";
  if (message.length > 2000) errors.message = "Message must be under 2000 characters.";

  return errors;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const isMobile = useIsMobile();

  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [cooldown, setCooldown] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const startCooldown = useCallback(() => {
    setCooldown(true);
    setTimeout(() => setCooldown(false), COOLDOWN_MS);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    const errors = validateForm(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // Rate-limit guard
    if (cooldown) {
      setError("Please wait before submitting again.");
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!apiKey) {
      setError("Form configuration error. Please contact us directly via email.");
      return;
    }

    setSending(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: apiKey,
          subject: `New Project Brief from ${form.name.trim()}`,
          from_name: "BSR Films Website",
          name: form.name.trim(),
          organization: form.org.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          project_type: form.projectType,
          message: form.message.trim(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setForm(initialForm);
        setFieldErrors({});
        startCooldown();
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
      className="section-padding relative overflow-hidden section-gradient-primary"
      aria-label="Contact BSR Films for your project"
    >
      {/* Decorative reel-dot pattern */}
      <div className="absolute inset-0 reel-dots opacity-30 pointer-events-none" aria-hidden="true" />
      {/* Ambient gold glow */}
      <div aria-hidden="true" className="absolute top-0 right-0 w-[200px] sm:w-[300px] md:w-[500px] h-[200px] sm:h-[300px] md:h-[500px] pointer-events-none radial-glow-gold-subtle" />

      <div className="relative max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={isMobile ? { opacity: 0, y: 12 } : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: isMobile ? 0.35 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8 sm:mb-10 md:mb-16"
        >
          <p className="text-[#E3A652] text-[0.65rem] sm:text-xs md:text-sm font-semibold tracking-[0.18em] sm:tracking-[0.2em] uppercase mb-1.5 sm:mb-2 md:mb-3">
            Let&apos;s Create Together
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white gold-underline mx-auto inline-block mb-3 sm:mb-4 md:mb-6 text-cinema">
            Start Your <span className="gold-text">Project</span>
          </h2>
          <p className="text-white/50 text-xs sm:text-sm md:text-lg max-w-xl mx-auto mt-3 sm:mt-5 md:mt-8 leading-relaxed px-2">
            Have a story to tell? Let&apos;s talk. Brief us about your project and
            our team will get back within 24 hours.
          </p>
        </motion.div>

        {/* Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-20">
          {/* ── Left: Contact Info ─────────────────────────────────── */}
          <motion.div
            initial={isMobile ? { opacity: 0, y: 12 } : { opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.35 : 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-between gap-6 sm:gap-8 md:gap-10"
          >
            <div>
              <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 md:mb-8">
                Reach Us Directly
              </h3>

              <ul className="flex flex-col gap-4 sm:gap-5 md:gap-7" role="list">
                <li className="flex gap-3 sm:gap-4 items-start group">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#E3A652]/10 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:bg-[#E3A652]/20 group-hover:shadow-[0_0_16px_rgba(227,166,82,0.2)]">
                    <Mail size={18} className="text-[#E3A652] sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[0.6rem] sm:text-xs uppercase tracking-widest mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:info@bsrfilms.in"
                      className="text-white text-sm sm:text-base font-semibold hover:text-[#E3A652] transition-colors active:text-[#E3A652]"
                      aria-label="Send email to BSR Films"
                    >
                      info@bsrfilms.in
                    </a>
                  </div>
                </li>

                <li className="flex gap-3 sm:gap-4 items-start group">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#E3A652]/10 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:bg-[#E3A652]/20 group-hover:shadow-[0_0_16px_rgba(227,166,82,0.2)]">
                    <Phone size={18} className="text-[#E3A652] sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[0.6rem] sm:text-xs uppercase tracking-widest mb-1">
                      Phone
                    </p>
                    <a
                      href="tel:+917712345678"
                      className="text-white text-sm sm:text-base font-semibold hover:text-[#E3A652] transition-colors active:text-[#E3A652]"
                      aria-label="Call BSR Films"
                    >
                      +91 771 234 5678
                    </a>
                  </div>
                </li>

                <li className="flex gap-3 sm:gap-4 items-start group">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#E3A652]/10 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:bg-[#E3A652]/20 group-hover:shadow-[0_0_16px_rgba(227,166,82,0.2)]">
                    <MapPin size={18} className="text-[#E3A652] sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-white/40 text-[0.6rem] sm:text-xs uppercase tracking-widest mb-1">
                      Address
                    </p>
                    <address className="text-white text-sm sm:text-base font-semibold not-italic leading-relaxed">
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

          {/* ── Right: Contact Form ────────────────────────────────── */}
          <motion.div
            initial={isMobile ? { opacity: 0, y: 12 } : { opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.35 : 0.9, delay: isMobile ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[350px] sm:min-h-[400px] text-center px-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#E3A652]/15 flex items-center justify-center mb-5 sm:mb-6">
                  <ArrowRight size={24} className="text-[#E3A652] sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-white text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                  Message Received!
                </h3>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-sm">
                  Thank you for reaching out. Our team will review your brief
                  and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 sm:mt-8 text-[#E3A652] font-semibold text-sm hover:underline active:underline min-h-[44px]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 sm:gap-6 md:gap-7"
                noValidate
                aria-label="Project brief contact form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-7">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-white/35 text-[0.6rem] sm:text-xs uppercase tracking-widest block mb-1.5 sm:mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      maxLength={100}
                      autoComplete="name"
                      placeholder="Rajesh Kumar"
                      value={form.name}
                      onChange={handleChange}
                      className={`form-input ${fieldErrors.name ? 'border-red-400/50' : ''}`}
                      aria-required="true"
                      {...(fieldErrors.name ? { "aria-invalid": "true" } : {})}
                    />
                    {fieldErrors.name && <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="org"
                      className="text-white/35 text-[0.6rem] sm:text-xs uppercase tracking-widest block mb-1.5 sm:mb-2"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-7">
                  <div>
                    <label
                      htmlFor="email"
                      className="text-white/35 text-[0.6rem] sm:text-xs uppercase tracking-widest block mb-1.5 sm:mb-2"
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
                      className={`form-input ${fieldErrors.email ? 'border-red-400/50' : ''}`}
                      aria-required="true"
                      {...(fieldErrors.email ? { "aria-invalid": "true" } : {})}
                    />
                    {fieldErrors.email && <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="text-white/35 text-[0.6rem] sm:text-xs uppercase tracking-widest block mb-1.5 sm:mb-2"
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
                      className={`form-input ${fieldErrors.phone ? 'border-red-400/50' : ''}`}
                      {...(fieldErrors.phone ? { "aria-invalid": "true" } : {})}
                    />
                    {fieldErrors.phone && <p className="text-red-400 text-xs mt-1">{fieldErrors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="projectType"
                    className="text-white/35 text-[0.6rem] sm:text-xs uppercase tracking-widest block mb-1.5 sm:mb-2"
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
                    className="text-white/35 text-[0.6rem] sm:text-xs uppercase tracking-widest block mb-1.5 sm:mb-2"
                  >
                    Project Brief *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    maxLength={2000}
                    placeholder="Tell us about your project — scope, timeline, goals…"
                    value={form.message}
                    onChange={handleChange}
                    className={`form-input resize-none ${fieldErrors.message ? 'border-red-400/50' : ''}`}
                    aria-required="true"
                    {...(fieldErrors.message ? { "aria-invalid": "true" } : {})}
                  />
                  {fieldErrors.message && <p className="text-red-400 text-xs mt-1">{fieldErrors.message}</p>}
                  <p className="text-white/20 text-xs mt-1 text-right">{form.message.length} / 2000</p>
                </div>

                {error && (
                  <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending || cooldown}
                  className="self-start inline-flex items-center gap-2 sm:gap-3 text-[#050608] font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:scale-105 active:scale-[0.98] transition-all duration-300 text-xs sm:text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 btn-gold-gradient min-h-[44px]"
                  aria-label="Submit your project brief"
                >
                  <Send size={14} className={sending ? "animate-pulse" : ""} />
                  {sending ? "Sending…" : cooldown ? "Please wait…" : "Send Project Brief"}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* ── Footer Bar ─────────────────────────────────────────── */}
        <div className="mt-10 sm:mt-14 md:mt-20 mb-1 sm:mb-2">
          <div className="section-divider" />
        </div>
        <div className="pt-4 sm:pt-6 md:pt-8 flex flex-col items-center gap-3 sm:gap-4 md:gap-6">
          {/* Social Media */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-5 flex-wrap justify-center">
            <p className="text-white/30 text-[0.55rem] sm:text-[0.6rem] md:text-xs tracking-[0.12em] sm:tracking-[0.15em] uppercase font-semibold mr-0.5 sm:mr-1 md:mr-2">Follow Us</p>
            {/* YouTube */}
            <a
              href="https://www.youtube.com/@bsrfilmsoriginal2461"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:scale-95 icon-bg-youtube"
              aria-label="BSR Films on YouTube"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:scale-110 sm:w-5 sm:h-5">
                <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.81z" fill="#FF0000" />
                <path d="M9.75 15.02l6.25-3.52-6.25-3.52v7.04z" fill="white" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://www.facebook.com/people/BSR-Films/100064075840334/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:scale-95 icon-bg-facebook"
              aria-label="BSR Films on Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:scale-110 sm:w-5 sm:h-5">
                <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.875V12h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.99 24 12z" fill="#1877F2" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/bsrfilms"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:scale-95 icon-bg-instagram"
              aria-label="BSR Films on Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:scale-110 sm:w-5 sm:h-5">
                <defs>
                  <radialGradient id="ig-footer" cx="30%" cy="107%" r="150%">
                    <stop offset="0%" stopColor="#fdf497" />
                    <stop offset="5%" stopColor="#fdf497" />
                    <stop offset="45%" stopColor="#fd5949" />
                    <stop offset="60%" stopColor="#d6249f" />
                    <stop offset="90%" stopColor="#285AEB" />
                  </radialGradient>
                </defs>
                <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-footer)" />
                <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" fill="none" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
              </svg>
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3 sm:gap-4 text-center sm:text-left">
            <p className="text-white/30 text-xs sm:text-sm">
              &copy; {new Date().getFullYear()} BSR Films. All rights reserved.
              Raipur, Chhattisgarh, India.
            </p>
            <p className="text-white/25 text-xs sm:text-sm">
              Empanelled with{" "}
              <span className="text-white/40">NFDC &middot; AIR Central Sales Unit &middot; Chhattisgarh Samvad</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
