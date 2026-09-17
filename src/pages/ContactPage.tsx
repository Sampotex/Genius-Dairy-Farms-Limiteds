import React, { useState, useRef } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ShieldCheck,
  Building,
  HelpCircle,
  AlertCircle,
  Check,
} from 'lucide-react';
import { PageId, ContactFormState, EnquiryType } from '../types';
import { COMPANY_DETAILS } from '../data/companyData';
import { Logo } from '../components/Logo';
import { IseyinSiteLocationHighlight } from '../components/IseyinSiteLocationHighlight';
import {
  validateEmail,
  validatePhone,
  validateRequired,
  validateMessage,
} from '../utils/formValidation';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  defaultEnquiryType?: EnquiryType;
}

export const ContactPage: React.FC<ContactPageProps> = ({ defaultEnquiryType }) => {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    enquiryType: defaultEnquiryType || 'General Enquiry',
    message: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const subjectInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const enquiryTypes: EnquiryType[] = [
    'General Enquiry',
    'Farm Visit',
    'Partnership',
    'Investment',
    'Udderfall Distribution',
    'Academy Training',
    'Media',
    'Other',
  ];

  // Real-time error evaluation
  const errors = {
    name: validateRequired(formData.name, 'Full name', 2),
    email: validateEmail(formData.email),
    phone: validatePhone(formData.phone),
    subject: validateRequired(formData.subject, 'Subject', 3),
    message: validateMessage(formData.message, 10),
  };

  const hasErrors = Boolean(
    errors.name || errors.email || errors.phone || errors.subject || errors.message
  );

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field: keyof ContactFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
    });

    if (hasErrors) {
      // Focus first field with an error
      if (errors.name) nameInputRef.current?.focus();
      else if (errors.email) emailInputRef.current?.focus();
      else if (errors.phone) phoneInputRef.current?.focus();
      else if (errors.subject) subjectInputRef.current?.focus();
      else if (errors.message) messageInputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    // Simulate real brief network transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      enquiryType: 'General Enquiry',
      message: '',
    });
    setTouched({});
    setSubmitAttempted(false);
    setIsSubmitted(false);
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="bg-[#0D261B] text-white py-20 sm:py-24 border-b border-[#1C3A2B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C89D4B_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-block px-3 py-1 bg-[#163B29] text-[#C89D4B] text-xs font-semibold uppercase tracking-widest rounded-xs mb-4">
            Corporate Engagement & Inquiries
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl leading-tight">
            Contact Genius Dairy Farms Limited
          </h1>
          <p className="text-base sm:text-lg text-[#CBDDD2] max-w-2xl mt-4 leading-relaxed">
            Whether you are looking to partner on dairy development, distribute Udderfall products, register for the Academy, or schedule a technical farm visit, we welcome your communication.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              id="header-jump-to-iseyin-map"
              href="#iseyin-site-location-highlight"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-[#C89D4B] border border-[#C89D4B]/40 rounded-xs text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Explore Iseyin Site Location & Directions</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Contact Details */}
      <section className="py-20 sm:py-28 bg-[#FBFBFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-xs border border-[#E0DDD5] shadow-xs">
              <span className="text-xs uppercase tracking-[0.2em] text-[#2D6A4F] font-bold block mb-2">
                Official Correspondence
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#151A18] mb-6">
                Send an Official Enquiry
              </h2>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#143727]/10 text-[#143727] mx-auto flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[#143727]" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-[#151A18]">
                    Message Successfully Sent
                  </h3>
                  <p className="text-sm text-[#55625B] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Your inquiry regarding <strong>{formData.enquiryType}</strong> has been transmitted directly to our corporate desk at Genius Dairy Farms Limited. We typically respond within 24 business hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 bg-[#143727] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#0D261B] transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {submitAttempted && hasErrors && (
                    <div
                      id="contact-form-error-summary"
                      role="alert"
                      className="p-4 bg-red-50/90 border border-red-200 rounded-xs text-xs text-red-900 flex items-start gap-3 animate-fadeIn shadow-2xs"
                    >
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-bold text-red-900">
                          Please correct the highlighted fields before submitting:
                        </p>
                        <ul className="list-disc list-inside space-y-0.5 text-red-700 text-[11px]">
                          {errors.name && <li>{errors.name}</li>}
                          {errors.email && <li>{errors.email}</li>}
                          {errors.phone && <li>{errors.phone}</li>}
                          {errors.subject && <li>{errors.subject}</li>}
                          {errors.message && <li>{errors.message}</li>}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label
                          htmlFor="contact-name-input"
                          className="block text-xs font-bold text-[#151A18] uppercase tracking-wider"
                        >
                          Your Full Name *
                        </label>
                        {touched.name && !errors.name && formData.name.trim() && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                            <Check className="w-3 h-3 text-emerald-600" />
                            Valid
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          ref={nameInputRef}
                          id="contact-name-input"
                          type="text"
                          placeholder="e.g. Moyosore Rafiu"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          onBlur={() => handleBlur('name')}
                          aria-invalid={Boolean((touched.name || submitAttempted) && errors.name)}
                          aria-describedby={
                            (touched.name || submitAttempted) && errors.name
                              ? 'contact-name-error'
                              : undefined
                          }
                          className={`w-full px-3.5 py-2.5 text-sm rounded-xs transition-colors focus:outline-none ${
                            (touched.name || submitAttempted) && errors.name
                              ? 'border border-red-500 bg-red-50/20 text-[#151A18] focus:border-red-600 focus:ring-1 focus:ring-red-500/30'
                              : touched.name && formData.name.trim()
                              ? 'border border-emerald-600/70 bg-emerald-50/15 focus:border-emerald-700'
                              : 'border border-[#D5D2C8] bg-white focus:border-[#143727]'
                          }`}
                        />
                        {(touched.name || submitAttempted) && errors.name && (
                          <AlertCircle className="w-4 h-4 text-red-500 absolute right-3 top-3 pointer-events-none" />
                        )}
                      </div>
                      {(touched.name || submitAttempted) && errors.name && (
                        <p
                          id="contact-name-error"
                          role="alert"
                          className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label
                          htmlFor="contact-email-input"
                          className="block text-xs font-bold text-[#151A18] uppercase tracking-wider"
                        >
                          Email Address *
                        </label>
                        {touched.email && !errors.email && formData.email.trim() && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                            <Check className="w-3 h-3 text-emerald-600" />
                            Valid Format
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          ref={emailInputRef}
                          id="contact-email-input"
                          type="email"
                          placeholder="name@organization.com"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                          aria-invalid={Boolean((touched.email || submitAttempted) && errors.email)}
                          aria-describedby={
                            (touched.email || submitAttempted) && errors.email
                              ? 'contact-email-error'
                              : undefined
                          }
                          className={`w-full px-3.5 py-2.5 text-sm rounded-xs transition-colors focus:outline-none ${
                            (touched.email || submitAttempted) && errors.email
                              ? 'border border-red-500 bg-red-50/20 text-[#151A18] focus:border-red-600 focus:ring-1 focus:ring-red-500/30'
                              : touched.email && formData.email.trim()
                              ? 'border border-emerald-600/70 bg-emerald-50/15 focus:border-emerald-700'
                              : 'border border-[#D5D2C8] bg-white focus:border-[#143727]'
                          }`}
                        />
                        {(touched.email || submitAttempted) && errors.email && (
                          <AlertCircle className="w-4 h-4 text-red-500 absolute right-3 top-3 pointer-events-none" />
                        )}
                      </div>
                      {(touched.email || submitAttempted) && errors.email && (
                        <p
                          id="contact-email-error"
                          role="alert"
                          className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label
                          htmlFor="contact-phone-input"
                          className="block text-xs font-bold text-[#151A18] uppercase tracking-wider"
                        >
                          Phone / WhatsApp Number *
                        </label>
                        {touched.phone && !errors.phone && formData.phone.trim() && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                            <Check className="w-3 h-3 text-emerald-600" />
                            Valid
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          ref={phoneInputRef}
                          id="contact-phone-input"
                          type="tel"
                          placeholder="+234 803 000 0000"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          onBlur={() => handleBlur('phone')}
                          aria-invalid={Boolean((touched.phone || submitAttempted) && errors.phone)}
                          aria-describedby={
                            (touched.phone || submitAttempted) && errors.phone
                              ? 'contact-phone-error'
                              : undefined
                          }
                          className={`w-full px-3.5 py-2.5 text-sm rounded-xs transition-colors focus:outline-none ${
                            (touched.phone || submitAttempted) && errors.phone
                              ? 'border border-red-500 bg-red-50/20 text-[#151A18] focus:border-red-600 focus:ring-1 focus:ring-red-500/30'
                              : touched.phone && formData.phone.trim()
                              ? 'border border-emerald-600/70 bg-emerald-50/15 focus:border-emerald-700'
                              : 'border border-[#D5D2C8] bg-white focus:border-[#143727]'
                          }`}
                        />
                        {(touched.phone || submitAttempted) && errors.phone && (
                          <AlertCircle className="w-4 h-4 text-red-500 absolute right-3 top-3 pointer-events-none" />
                        )}
                      </div>
                      {(touched.phone || submitAttempted) && errors.phone && (
                        <p
                          id="contact-phone-error"
                          role="alert"
                          className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Enquiry Type */}
                    <div>
                      <label
                        htmlFor="contact-enquiry-select"
                        className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1"
                      >
                        Enquiry Type *
                      </label>
                      <select
                        id="contact-enquiry-select"
                        value={formData.enquiryType}
                        onChange={(e) => handleChange('enquiryType', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none"
                      >
                        {enquiryTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label
                        htmlFor="contact-subject-input"
                        className="block text-xs font-bold text-[#151A18] uppercase tracking-wider"
                      >
                        Subject *
                      </label>
                      {touched.subject && !errors.subject && formData.subject.trim() && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                          <Check className="w-3 h-3 text-emerald-600" />
                          Valid
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        ref={subjectInputRef}
                        id="contact-subject-input"
                        type="text"
                        placeholder="Brief summary of your inquiry"
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        onBlur={() => handleBlur('subject')}
                        aria-invalid={Boolean((touched.subject || submitAttempted) && errors.subject)}
                        aria-describedby={
                          (touched.subject || submitAttempted) && errors.subject
                            ? 'contact-subject-error'
                            : undefined
                        }
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xs transition-colors focus:outline-none ${
                          (touched.subject || submitAttempted) && errors.subject
                            ? 'border border-red-500 bg-red-50/20 text-[#151A18] focus:border-red-600 focus:ring-1 focus:ring-red-500/30'
                            : touched.subject && formData.subject.trim()
                            ? 'border border-emerald-600/70 bg-emerald-50/15 focus:border-emerald-700'
                            : 'border border-[#D5D2C8] bg-white focus:border-[#143727]'
                        }`}
                      />
                      {(touched.subject || submitAttempted) && errors.subject && (
                        <AlertCircle className="w-4 h-4 text-red-500 absolute right-3 top-3 pointer-events-none" />
                      )}
                    </div>
                    {(touched.subject || submitAttempted) && errors.subject && (
                      <p
                        id="contact-subject-error"
                        role="alert"
                        className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Detailed Message */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label
                        htmlFor="contact-message-input"
                        className="block text-xs font-bold text-[#151A18] uppercase tracking-wider"
                      >
                        Detailed Message *
                      </label>
                      <div className="flex items-center gap-2 text-[11px]">
                        {touched.message && !errors.message && formData.message.trim() ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                            <Check className="w-3 h-3 text-emerald-600" />
                            Valid
                          </span>
                        ) : null}
                        <span
                          className={`font-mono ${
                            formData.message.trim().length >= 10
                              ? 'text-emerald-700 font-semibold'
                              : formData.message.trim().length > 0
                              ? 'text-amber-700 font-medium'
                              : 'text-[#7A8780]'
                          }`}
                        >
                          {formData.message.trim().length}/10 min chars
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <textarea
                        ref={messageInputRef}
                        id="contact-message-input"
                        rows={5}
                        placeholder="Provide full details regarding your question, proposal, requested visit date, or order volume..."
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        onBlur={() => handleBlur('message')}
                        aria-invalid={Boolean((touched.message || submitAttempted) && errors.message)}
                        aria-describedby={
                          (touched.message || submitAttempted) && errors.message
                            ? 'contact-message-error'
                            : undefined
                        }
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xs transition-colors focus:outline-none resize-none ${
                          (touched.message || submitAttempted) && errors.message
                            ? 'border border-red-500 bg-red-50/20 text-[#151A18] focus:border-red-600 focus:ring-1 focus:ring-red-500/30'
                            : touched.message && formData.message.trim().length >= 10
                            ? 'border border-emerald-600/70 bg-emerald-50/15 focus:border-emerald-700'
                            : 'border border-[#D5D2C8] bg-white focus:border-[#143727]'
                        }`}
                      />
                    </div>
                    {(touched.message || submitAttempted) && errors.message && (
                      <p
                        id="contact-message-error"
                        role="alert"
                        className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-[#7A8780]">
                      All official communications are confidential.
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                      <Send className="w-3.5 h-3.5 text-[#C89D4B]" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Direct Information & Fast Actions */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Card */}
              <div className="bg-[#143727] text-white p-8 rounded-xs border border-[#234D37] shadow-md space-y-6">
                <div className="flex items-center gap-4 border-b border-[#234D37] pb-4">
                  <Logo size="md" className="bg-white/10 p-0.5 rounded-full" />
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-[#C89D4B] font-bold block">
                      Direct Corporate Desk
                    </span>
                    <h3 className="font-heading font-extrabold text-xl text-white leading-tight">
                      Genius Dairy Farms Limited
                    </h3>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-[#CBDDD2]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C89D4B] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-medium block">60-Acre Facility Location</span>
                      <span className="text-xs text-[#CBDDD2] leading-relaxed block mt-0.5">
                        {COMPANY_DETAILS.address}
                      </span>
                      <a
                        href="#iseyin-site-location-highlight"
                        className="text-[11px] text-[#E0BA6E] hover:underline inline-flex items-center gap-1 mt-1 font-semibold"
                      >
                        <span>View site map & transit details ↓</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#C89D4B] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-medium block">Phone / WhatsApp</span>
                      <a
                        href={COMPANY_DETAILS.phoneTel}
                        className="text-xs font-mono text-[#E0BA6E] hover:underline"
                      >
                        {COMPANY_DETAILS.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#C89D4B] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-white font-medium block">Corporate Email</span>
                      <a
                        href={`mailto:${COMPANY_DETAILS.email}`}
                        className="text-xs text-[#E0BA6E] hover:underline"
                      >
                        {COMPANY_DETAILS.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Instant Action Buttons */}
                <div className="pt-4 border-t border-white/20 grid grid-cols-2 gap-3">
                  <a
                    href={COMPANY_DETAILS.phoneTel}
                    className="px-4 py-3 bg-white text-[#143727] hover:bg-[#F4F4F0] text-xs font-bold uppercase tracking-wider rounded-xs text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Us</span>
                  </a>
                  <a
                    href={COMPANY_DETAILS.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider rounded-xs text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Operating Protocols & Biosecurity */}
              <div className="bg-white p-7 rounded-xs border border-[#E0DDD5] shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#143727]">
                  <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                  <span>Farm Biosecurity & Visiting Hours</span>
                </div>
                <p className="text-xs text-[#525F58] leading-relaxed">
                  To protect our herd against communicable bovine pathologies, all facility visitors must pass through vehicle disinfestation and footbaths at the main gate. Prior appointment confirmation is mandatory.
                </p>
                <div className="text-xs text-[#7A8780] pt-2 border-t border-[#EAE7DE] flex justify-between">
                  <span>Administrative Hours:</span>
                  <span className="font-semibold text-[#151A18]">Monday – Saturday, 8:00 AM – 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Iseyin Site Visual Location Map and Address Highlight */}
          <IseyinSiteLocationHighlight className="mt-16 sm:mt-20" />
        </div>
      </section>
    </div>
  );
};
