import React, { useState, useRef } from 'react';
import {
  X,
  CheckCircle,
  ArrowRight,
  Handshake,
  Building2,
  Landmark,
  GraduationCap,
  AlertCircle,
  Check,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';
import { Logo } from './Logo';
import {
  validateEmail,
  validatePhone,
  validateRequired,
  validateMessage,
} from '../utils/formValidation';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [partnerType, setPartnerType] = useState('Commercial Collaboration');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    organization: '',
    contactPerson: '',
    email: '',
    phone: '',
    message: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const orgInputRef = useRef<HTMLInputElement>(null);
  const personInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  if (!isOpen) return null;

  // Real-time error evaluation
  const errors = {
    organization: validateRequired(formData.organization, 'Organization name', 2),
    contactPerson: validateRequired(formData.contactPerson, 'Contact person', 2),
    email: validateEmail(formData.email),
    phone: validatePhone(formData.phone),
    message: validateMessage(formData.message, 10),
  };

  const hasErrors = Boolean(
    errors.organization ||
    errors.contactPerson ||
    errors.email ||
    errors.phone ||
    errors.message
  );

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    setTouched({
      organization: true,
      contactPerson: true,
      email: true,
      phone: true,
      message: true,
    });

    if (hasErrors) {
      if (errors.organization) orgInputRef.current?.focus();
      else if (errors.contactPerson) personInputRef.current?.focus();
      else if (errors.email) emailInputRef.current?.focus();
      else if (errors.phone) phoneInputRef.current?.focus();
      else if (errors.message) messageInputRef.current?.focus();
      return;
    }

    setSubmitted(true);
  };

  const partnerCategories = [
    { label: 'Commercial Collaboration', icon: Handshake },
    { label: 'Agribusiness Investment', icon: Landmark },
    { label: 'Academic & Research', icon: GraduationCap },
    { label: 'Processing & Off-take', icon: Building2 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-[#FBFBFA] border border-[#D9D6CC] max-w-2xl w-full rounded-xs shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-[#143727] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-1 cursor-pointer focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3.5 mb-3">
            <Logo size="sm" className="bg-white/10 p-0.5 rounded-full" />
            <div className="inline-block px-2.5 py-0.5 bg-[#C89D4B]/20 text-[#C89D4B] text-[11px] font-semibold tracking-widest uppercase rounded-xs">
              Strategic Engagement
            </div>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Partner With Genius Dairy Farms
          </h2>
          <p className="text-[#B9CEC2] text-sm mt-1 max-w-lg">
            Collaborate with Southwest Nigeria's premier dairy and livestock development enterprise to expand domestic supply, genetic resilience, and training.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#143727]/10 text-[#143727] flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#143727]" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#151A18]">
                Partnership Inquiry Received
              </h3>
              <p className="text-sm text-[#556059] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.contactPerson || 'Partner'}</strong>. Our executive team at Genius Dairy Farms Limited will review your proposal regarding <strong>{partnerType}</strong> and reach out shortly.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-[#143727] text-white text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer hover:bg-[#0D261B]"
                >
                  Close Window
                </button>
                <a
                  href={COMPANY_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-[#EFECE6] text-[#143727] text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#E3DFD5]"
                >
                  Message Executive on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {submitAttempted && hasErrors && (
                <div
                  id="partner-form-error-summary"
                  role="alert"
                  className="p-3.5 bg-red-50/90 border border-red-200 rounded-xs text-xs text-red-900 flex items-start gap-2.5 animate-fadeIn shadow-2xs"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-red-900">
                      Please correct the following before submitting:
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 text-red-700 text-[11px]">
                      {errors.organization && <li>{errors.organization}</li>}
                      {errors.contactPerson && <li>{errors.contactPerson}</li>}
                      {errors.email && <li>{errors.email}</li>}
                      {errors.phone && <li>{errors.phone}</li>}
                      {errors.message && <li>{errors.message}</li>}
                    </ul>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-2">
                  Select Partnership Focus
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {partnerCategories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = partnerType === cat.label;
                    return (
                      <button
                        type="button"
                        key={cat.label}
                        onClick={() => setPartnerType(cat.label)}
                        className={`p-3 text-left border rounded-xs transition-all flex items-center gap-2 cursor-pointer ${
                          isSelected
                            ? 'border-[#143727] bg-[#143727]/5 text-[#143727] font-semibold'
                            : 'border-[#E0DDD5] hover:border-[#B5B0A2] text-[#4A554F]'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#C89D4B]' : 'text-[#8A968F]'}`} />
                        <span className="text-xs">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Organization */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="partner-org-input"
                      className="block text-xs font-medium text-[#4A554F]"
                    >
                      Organization / Entity Name *
                    </label>
                    {touched.organization && !errors.organization && formData.organization.trim() && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <Check className="w-3 h-3 text-emerald-600" />
                        Valid
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      ref={orgInputRef}
                      id="partner-org-input"
                      type="text"
                      placeholder="e.g. AgriCorp West Africa"
                      value={formData.organization}
                      onChange={(e) => handleChange('organization', e.target.value)}
                      onBlur={() => handleBlur('organization')}
                      aria-invalid={Boolean((touched.organization || submitAttempted) && errors.organization)}
                      aria-describedby={
                        (touched.organization || submitAttempted) && errors.organization
                          ? 'partner-org-error'
                          : undefined
                      }
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xs transition-colors focus:outline-none ${
                        (touched.organization || submitAttempted) && errors.organization
                          ? 'border border-red-500 bg-red-50/20 text-[#151A18] focus:border-red-600 focus:ring-1 focus:ring-red-500/30'
                          : touched.organization && formData.organization.trim()
                          ? 'border border-emerald-600/70 bg-emerald-50/15 focus:border-emerald-700'
                          : 'border border-[#D5D2C8] bg-white focus:border-[#143727]'
                      }`}
                    />
                    {(touched.organization || submitAttempted) && errors.organization && (
                      <AlertCircle className="w-4 h-4 text-red-500 absolute right-3 top-3 pointer-events-none" />
                    )}
                  </div>
                  {(touched.organization || submitAttempted) && errors.organization && (
                    <p
                      id="partner-org-error"
                      role="alert"
                      className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0 text-red-500" />
                      <span>{errors.organization}</span>
                    </p>
                  )}
                </div>

                {/* Contact Person */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="partner-person-input"
                      className="block text-xs font-medium text-[#4A554F]"
                    >
                      Contact Person *
                    </label>
                    {touched.contactPerson && !errors.contactPerson && formData.contactPerson.trim() && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <Check className="w-3 h-3 text-emerald-600" />
                        Valid
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      ref={personInputRef}
                      id="partner-person-input"
                      type="text"
                      placeholder="Full Name"
                      value={formData.contactPerson}
                      onChange={(e) => handleChange('contactPerson', e.target.value)}
                      onBlur={() => handleBlur('contactPerson')}
                      aria-invalid={Boolean((touched.contactPerson || submitAttempted) && errors.contactPerson)}
                      aria-describedby={
                        (touched.contactPerson || submitAttempted) && errors.contactPerson
                          ? 'partner-person-error'
                          : undefined
                      }
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xs transition-colors focus:outline-none ${
                        (touched.contactPerson || submitAttempted) && errors.contactPerson
                          ? 'border border-red-500 bg-red-50/20 text-[#151A18] focus:border-red-600 focus:ring-1 focus:ring-red-500/30'
                          : touched.contactPerson && formData.contactPerson.trim()
                          ? 'border border-emerald-600/70 bg-emerald-50/15 focus:border-emerald-700'
                          : 'border border-[#D5D2C8] bg-white focus:border-[#143727]'
                      }`}
                    />
                    {(touched.contactPerson || submitAttempted) && errors.contactPerson && (
                      <AlertCircle className="w-4 h-4 text-red-500 absolute right-3 top-3 pointer-events-none" />
                    )}
                  </div>
                  {(touched.contactPerson || submitAttempted) && errors.contactPerson && (
                    <p
                      id="partner-person-error"
                      role="alert"
                      className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0 text-red-500" />
                      <span>{errors.contactPerson}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Work Email */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="partner-email-input"
                      className="block text-xs font-medium text-[#4A554F]"
                    >
                      Work Email *
                    </label>
                    {touched.email && !errors.email && formData.email.trim() && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <Check className="w-3 h-3 text-emerald-600" />
                        Valid
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      ref={emailInputRef}
                      id="partner-email-input"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      aria-invalid={Boolean((touched.email || submitAttempted) && errors.email)}
                      aria-describedby={
                        (touched.email || submitAttempted) && errors.email
                          ? 'partner-email-error'
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
                      id="partner-email-error"
                      role="alert"
                      className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0 text-red-500" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="partner-phone-input"
                      className="block text-xs font-medium text-[#4A554F]"
                    >
                      Phone / WhatsApp *
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
                      id="partner-phone-input"
                      type="tel"
                      placeholder="+234 ..."
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      aria-invalid={Boolean((touched.phone || submitAttempted) && errors.phone)}
                      aria-describedby={
                        (touched.phone || submitAttempted) && errors.phone
                          ? 'partner-phone-error'
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
                      id="partner-phone-error"
                      role="alert"
                      className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0 text-red-500" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="partner-message-input"
                    className="block text-xs font-medium text-[#4A554F]"
                  >
                    Partnership Objectives / Brief *
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
                          : 'text-[#7A867F]'
                      }`}
                    >
                      {formData.message.trim().length}/10 min chars
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    ref={messageInputRef}
                    id="partner-message-input"
                    rows={3}
                    placeholder="Outline your prospective collaboration, dairy development initiative, or offtake inquiry..."
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    aria-invalid={Boolean((touched.message || submitAttempted) && errors.message)}
                    aria-describedby={
                      (touched.message || submitAttempted) && errors.message
                        ? 'partner-message-error'
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
                    id="partner-message-error"
                    role="alert"
                    className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium"
                  >
                    <AlertCircle className="w-3 h-3 shrink-0 text-red-500" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <div className="text-[11px] text-[#7A867F]">
                  Direct: <span className="font-semibold text-[#143727]">{COMPANY_DETAILS.email}</span>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors cursor-pointer"
                >
                  <span>Submit Partnership Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C89D4B]" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
