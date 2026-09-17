import React, { useState, useRef } from 'react';
import { X, CheckCircle, Package, Send, ShieldCheck, AlertCircle, Check } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';
import { Logo } from './Logo';
import {
  validateEmail,
  validatePhone,
  validateRequired,
} from '../utils/formValidation';

interface WholesaleQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: 'mozzarella' | 'yogurt' | 'all';
}

export const WholesaleQuoteModal: React.FC<WholesaleQuoteModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'mozzarella',
}) => {
  const [productCategory, setProductCategory] = useState<'mozzarella' | 'yogurt' | 'all'>(
    initialCategory
  );
  const [packagingType, setPackagingType] = useState('Blocks (Commercial 1kg–5kg)');
  const [monthlyVolume, setMonthlyVolume] = useState('100kg – 500kg / month');
  const [businessType, setBusinessType] = useState('Pizzeria / Restaurant');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    deliveryRequirements: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const businessInputRef = useRef<HTMLInputElement>(null);
  const contactInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Real-time error evaluation
  const errors = {
    businessName: validateRequired(formData.businessName, 'Business name', 2),
    contactName: validateRequired(formData.contactName, 'Contact name', 2),
    phone: validatePhone(formData.phone),
    email: validateEmail(formData.email),
    city: validateRequired(formData.city, 'City / Location', 2),
  };

  const hasErrors = Boolean(
    errors.businessName ||
    errors.contactName ||
    errors.phone ||
    errors.email ||
    errors.city
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
      businessName: true,
      contactName: true,
      phone: true,
      email: true,
      city: true,
    });

    if (hasErrors) {
      if (errors.businessName) businessInputRef.current?.focus();
      else if (errors.contactName) contactInputRef.current?.focus();
      else if (errors.phone) phoneInputRef.current?.focus();
      else if (errors.email) emailInputRef.current?.focus();
      else if (errors.city) cityInputRef.current?.focus();
      return;
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setTouched({});
    setSubmitAttempted(false);
    onClose();
  };

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
              Udderfall Commercial Supply
            </div>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Request a Wholesale Dairy Quote
          </h2>
          <p className="text-[#B9CEC2] text-sm mt-1 max-w-lg">
            Direct supply of commercial Mozzarella, artisan cheese, and cultured yogurt from our Iseyin facility for pizzerias, hotels, bakeries, and food-service operators.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#143727]/10 text-[#143727] flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#143727]" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#151A18]">
                Wholesale Request Transmitted
              </h3>
              <p className="text-sm text-[#55625B] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.contactName}</strong> from <strong>{formData.businessName}</strong>. Our commercial B2B desk will review your {productCategory} volume requirements ({monthlyVolume}) and provide wholesale pricing within 24 hours.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={COMPANY_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#1EBE5D] transition-colors"
                >
                  Expedite via WhatsApp Desk
                </a>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 bg-[#143727] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#0D261B] transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {submitAttempted && hasErrors && (
                <div
                  id="quote-form-error-summary"
                  role="alert"
                  className="p-3.5 bg-red-50/90 border border-red-200 rounded-xs text-xs text-red-900 flex items-start gap-2.5 animate-fadeIn shadow-2xs"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-red-900">
                      Please correct the following before requesting a quote:
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 text-red-700 text-[11px]">
                      {errors.businessName && <li>{errors.businessName}</li>}
                      {errors.contactName && <li>{errors.contactName}</li>}
                      {errors.phone && <li>{errors.phone}</li>}
                      {errors.email && <li>{errors.email}</li>}
                      {errors.city && <li>{errors.city}</li>}
                    </ul>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1">
                    Product Line *
                  </label>
                  <select
                    value={productCategory}
                    onChange={(e) =>
                      setProductCategory(e.target.value as 'mozzarella' | 'yogurt' | 'all')
                    }
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none cursor-pointer"
                  >
                    <option value="mozzarella">Commercial Mozzarella (Melt & Stretch)</option>
                    <option value="yogurt">Udderfall Fresh Yogurt (Bottles & Sachets)</option>
                    <option value="all">Full Dairy Portfolio (Mozzarella + Yogurt)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1">
                    Packaging Format *
                  </label>
                  <select
                    value={packagingType}
                    onChange={(e) => setPackagingType(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none cursor-pointer"
                  >
                    <option>Commercial Blocks (1kg–5kg)</option>
                    <option>Shredded Mozzarella (Pizza ready)</option>
                    <option>Vacuum Packs (Portioned)</option>
                    <option>Bottled Yogurt (250ml / 350ml / 500ml / 1L)</option>
                    <option>Sachet Yogurt (100ml / 200ml)</option>
                    <option>Bulk / Custom Institutional Spec</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1">
                    Business / Institution Type *
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none cursor-pointer"
                  >
                    <option>Pizzeria / Fast Food</option>
                    <option>Restaurant / Lounge</option>
                    <option>Hotel / Hospitality Group</option>
                    <option>Bakery / Pastry Shop</option>
                    <option>School / University Food Programme</option>
                    <option>Supermarket / Regional Retailer</option>
                    <option>Food-Service Distributor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1">
                    Estimated Monthly Volume *
                  </label>
                  <select
                    value={monthlyVolume}
                    onChange={(e) => setMonthlyVolume(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none cursor-pointer"
                  >
                    <option>50kg – 100kg / month</option>
                    <option>100kg – 500kg / month</option>
                    <option>500kg – 1,000kg / month</option>
                    <option>Over 1,000kg (Industrial Tier)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Business Name */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="quote-business-name"
                      className="block text-xs font-bold text-[#151A18] uppercase tracking-wider"
                    >
                      Business Name *
                    </label>
                    {touched.businessName && !errors.businessName && formData.businessName.trim() && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <Check className="w-3 h-3 text-emerald-600" />
                        Valid
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      ref={businessInputRef}
                      id="quote-business-name"
                      type="text"
                      placeholder="e.g. Lagos Crust Pizzeria"
                      value={formData.businessName}
                      onChange={(e) => handleChange('businessName', e.target.value)}
                      onBlur={() => handleBlur('businessName')}
                      aria-invalid={Boolean((touched.businessName || submitAttempted) && errors.businessName)}
                      aria-describedby={
                        (touched.businessName || submitAttempted) && errors.businessName
                          ? 'quote-business-name-error'
                          : undefined
                      }
                      className={`w-full px-3 py-2 text-sm rounded-xs transition-colors focus:outline-none ${
                        (touched.businessName || submitAttempted) && errors.businessName
                          ? 'border border-red-500 bg-red-50/20 text-[#151A18] focus:border-red-600 focus:ring-1 focus:ring-red-500/30'
                          : touched.businessName && formData.businessName.trim()
                          ? 'border border-emerald-600/70 bg-emerald-50/15 focus:border-emerald-700'
                          : 'border border-[#D5D2C8] bg-white focus:border-[#143727]'
                      }`}
                    />
                    {(touched.businessName || submitAttempted) && errors.businessName && (
                      <AlertCircle className="w-4 h-4 text-red-500 absolute right-3 top-2.5 pointer-events-none" />
                    )}
                  </div>
                  {(touched.businessName || submitAttempted) && errors.businessName && (
                    <p
                      id="quote-business-name-error"
                      role="alert"
                      className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0 text-red-500" />
                      <span>{errors.businessName}</span>
                    </p>
                  )}
                </div>

                {/* Contact Name */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="quote-contact-name"
                      className="block text-xs font-bold text-[#151A18] uppercase tracking-wider"
                    >
                      Contact Person *
                    </label>
                    {touched.contactName && !errors.contactName && formData.contactName.trim() && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <Check className="w-3 h-3 text-emerald-600" />
                        Valid
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      ref={contactInputRef}
                      id="quote-contact-name"
                      type="text"
                      placeholder="Full Name"
                      value={formData.contactName}
                      onChange={(e) => handleChange('contactName', e.target.value)}
                      onBlur={() => handleBlur('contactName')}
                      aria-invalid={Boolean((touched.contactName || submitAttempted) && errors.contactName)}
                      aria-describedby={
                        (touched.contactName || submitAttempted) && errors.contactName
                          ? 'quote-contact-name-error'
                          : undefined
                      }
                      className={`w-full px-3 py-2 text-sm rounded-xs transition-colors focus:outline-none ${
                        (touched.contactName || submitAttempted) && errors.contactName
                          ? 'border border-red-500 bg-red-50/20 text-[#151A18] focus:border-red-600 focus:ring-1 focus:ring-red-500/30'
                          : touched.contactName && formData.contactName.trim()
                          ? 'border border-emerald-600/70 bg-emerald-50/15 focus:border-emerald-700'
                          : 'border border-[#D5D2C8] bg-white focus:border-[#143727]'
                      }`}
                    />
                    {(touched.contactName || submitAttempted) && errors.contactName && (
                      <AlertCircle className="w-4 h-4 text-red-500 absolute right-3 top-2.5 pointer-events-none" />
                    )}
                  </div>
                  {(touched.contactName || submitAttempted) && errors.contactName && (
                    <p
                      id="quote-contact-name-error"
                      role="alert"
                      className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0 text-red-500" />
                      <span>{errors.contactName}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Phone */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="quote-phone"
                      className="block text-xs font-bold text-[#151A18] uppercase tracking-wider"
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
                      id="quote-phone"
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      aria-invalid={Boolean((touched.phone || submitAttempted) && errors.phone)}
                      aria-describedby={
                        (touched.phone || submitAttempted) && errors.phone
                          ? 'quote-phone-error'
                          : undefined
                      }
                      className={`w-full px-3 py-2 text-sm rounded-xs transition-colors focus:outline-none ${
                        (touched.phone || submitAttempted) && errors.phone
                          ? 'border border-red-500 bg-red-50/20 text-[#151A18] focus:border-red-600 focus:ring-1 focus:ring-red-500/30'
                          : touched.phone && formData.phone.trim()
                          ? 'border border-emerald-600/70 bg-emerald-50/15 focus:border-emerald-700'
                          : 'border border-[#D5D2C8] bg-white focus:border-[#143727]'
                      }`}
                    />
                    {(touched.phone || submitAttempted) && errors.phone && (
                      <AlertCircle className="w-4 h-4 text-red-500 absolute right-3 top-2.5 pointer-events-none" />
                    )}
                  </div>
                  {(touched.phone || submitAttempted) && errors.phone && (
                    <p
                      id="quote-phone-error"
                      role="alert"
                      className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0 text-red-500" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="quote-email"
                      className="block text-xs font-bold text-[#151A18] uppercase tracking-wider"
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
                      id="quote-email"
                      type="email"
                      placeholder="procurement@business.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      aria-invalid={Boolean((touched.email || submitAttempted) && errors.email)}
                      aria-describedby={
                        (touched.email || submitAttempted) && errors.email
                          ? 'quote-email-error'
                          : undefined
                      }
                      className={`w-full px-3 py-2 text-sm rounded-xs transition-colors focus:outline-none ${
                        (touched.email || submitAttempted) && errors.email
                          ? 'border border-red-500 bg-red-50/20 text-[#151A18] focus:border-red-600 focus:ring-1 focus:ring-red-500/30'
                          : touched.email && formData.email.trim()
                          ? 'border border-emerald-600/70 bg-emerald-50/15 focus:border-emerald-700'
                          : 'border border-[#D5D2C8] bg-white focus:border-[#143727]'
                      }`}
                    />
                    {(touched.email || submitAttempted) && errors.email && (
                      <AlertCircle className="w-4 h-4 text-red-500 absolute right-3 top-2.5 pointer-events-none" />
                    )}
                  </div>
                  {(touched.email || submitAttempted) && errors.email && (
                    <p
                      id="quote-email-error"
                      role="alert"
                      className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0 text-red-500" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="quote-city"
                      className="block text-xs font-bold text-[#151A18] uppercase tracking-wider"
                    >
                      City / Location *
                    </label>
                    {touched.city && !errors.city && formData.city.trim() && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                        <Check className="w-3 h-3 text-emerald-600" />
                        Valid
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      ref={cityInputRef}
                      id="quote-city"
                      type="text"
                      placeholder="e.g. Ibadan / Lagos"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      onBlur={() => handleBlur('city')}
                      aria-invalid={Boolean((touched.city || submitAttempted) && errors.city)}
                      aria-describedby={
                        (touched.city || submitAttempted) && errors.city
                          ? 'quote-city-error'
                          : undefined
                      }
                      className={`w-full px-3 py-2 text-sm rounded-xs transition-colors focus:outline-none ${
                        (touched.city || submitAttempted) && errors.city
                          ? 'border border-red-500 bg-red-50/20 text-[#151A18] focus:border-red-600 focus:ring-1 focus:ring-red-500/30'
                          : touched.city && formData.city.trim()
                          ? 'border border-emerald-600/70 bg-emerald-50/15 focus:border-emerald-700'
                          : 'border border-[#D5D2C8] bg-white focus:border-[#143727]'
                      }`}
                    />
                    {(touched.city || submitAttempted) && errors.city && (
                      <AlertCircle className="w-4 h-4 text-red-500 absolute right-3 top-2.5 pointer-events-none" />
                    )}
                  </div>
                  {(touched.city || submitAttempted) && errors.city && (
                    <p
                      id="quote-city-error"
                      role="alert"
                      className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0 text-red-500" />
                      <span>{errors.city}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="quote-requirements"
                  className="block text-xs font-bold text-[#151A18] uppercase tracking-wider mb-1"
                >
                  Specific Specifications or Questions (Optional)
                </label>
                <textarea
                  id="quote-requirements"
                  rows={2}
                  placeholder="e.g. Cold-chain delivery schedule, sample request, or private labeling requirement..."
                  value={formData.deliveryRequirements}
                  onChange={(e) =>
                    setFormData({ ...formData, deliveryRequirements: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D5D2C8] rounded-xs focus:border-[#143727] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#EAE7DE]">
                <div className="flex items-center gap-1.5 text-xs text-[#66726B]">
                  <ShieldCheck className="w-4 h-4 text-[#143727]" />
                  <span>Direct Factory Supply from Iseyin</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-[#66726B] hover:text-[#151A18] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#143727] hover:bg-[#0D261B] text-white text-xs font-bold uppercase tracking-wider rounded-xs cursor-pointer shadow-sm flex items-center gap-1.5"
                  >
                    <span>Submit Quote Request</span>
                    <Send className="w-3.5 h-3.5 text-[#C89D4B]" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
