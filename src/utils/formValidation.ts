/**
 * Real-time form validation utilities for Genius Dairy corporate enquiry forms
 */

// RFC 5322 compliant regex approximation for email validation
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone number regex allowing optional leading +, numbers, spaces, parentheses, hyphens, min 7 digits
const PHONE_CLEAN_REGEX = /[^0-9]/g;

export function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) {
    return 'Email address is required';
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return 'Please enter a valid email format (e.g. name@domain.com)';
  }
  return null;
}

export function validateRequired(
  value: string,
  fieldName: string,
  minLength = 2
): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return `${fieldName} is required`;
  }
  if (trimmed.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
}

export function validatePhone(phone: string): string | null {
  const trimmed = phone.trim();
  if (!trimmed) {
    return 'Phone / WhatsApp number is required';
  }
  // Strip non-digit characters to count actual digits
  const digits = trimmed.replace(PHONE_CLEAN_REGEX, '');
  if (digits.length < 8) {
    return 'Please enter a valid phone number (minimum 8 digits)';
  }
  if (digits.length > 16) {
    return 'Phone number cannot exceed 16 digits';
  }
  return null;
}

export function validateMessage(
  message: string,
  minLength = 10
): string | null {
  const trimmed = message.trim();
  if (!trimmed) {
    return 'Please provide details for your message';
  }
  if (trimmed.length < minLength) {
    return `Message must be at least ${minLength} characters (currently ${trimmed.length})`;
  }
  return null;
}
