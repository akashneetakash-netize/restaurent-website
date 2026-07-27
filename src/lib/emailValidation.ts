/**
 * Strict email validation helper for Haven Auth system.
 * Validates email format according to standard RFC 5322 pattern.
 * Requirements: user@domain.tld format, no leading/trailing spaces, valid domain extension.
 */
export function validateEmail(email: string): { isValid: boolean; error: string | null } {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email address is required' };
  }

  const trimmed = email.trim();

  if (trimmed.includes(' ')) {
    return { isValid: false, error: 'Email address cannot contain spaces' };
  }

  // Strict email regex pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address (e.g. user@example.com)' };
  }

  return { isValid: true, error: null };
}
