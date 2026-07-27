/**
 * Credit Card Validation Utilities for Haven Sanctuary Payment
 * Uses the Luhn algorithm for realistic card number validation
 */

/** Luhn Algorithm — validates card numbers used by Visa, Mastercard, etc. */
export function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\s+/g, '').replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let alternate = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }

  return sum % 10 === 0;
}

/** Detect card network from number prefix */
export function detectCardType(cardNumber: string): 'visa' | 'mastercard' | 'amex' | 'rupay' | 'unknown' {
  const digits = cardNumber.replace(/\s+/g, '');
  if (/^4/.test(digits)) return 'visa';
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return 'mastercard';
  if (/^3[47]/.test(digits)) return 'amex';
  if (/^6[0-9]/.test(digits)) return 'rupay';
  return 'unknown';
}

/** Validate expiry date — must be current or future MM/YY */
export function validateExpiry(expiry: string): { valid: boolean; error: string | null } {
  const match = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return { valid: false, error: 'Enter expiry as MM/YY' };

  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10) + 2000;

  if (month < 1 || month > 12) return { valid: false, error: 'Month must be 01–12' };

  const now = new Date();
  const cardDate = new Date(year, month - 1, 1);
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  if (cardDate < thisMonth) return { valid: false, error: 'Card has expired' };

  return { valid: true, error: null };
}

/** Validate CVV — 3 digits for Visa/MC/RuPay, 4 for Amex */
export function validateCvv(cvv: string, cardType: string): { valid: boolean; error: string | null } {
  const digits = cvv.replace(/\D/g, '');
  const expectedLen = cardType === 'amex' ? 4 : 3;
  if (digits.length !== expectedLen) {
    return { valid: false, error: `CVV must be ${expectedLen} digits` };
  }
  return { valid: true, error: null };
}

/** Validate cardholder name */
export function validateCardName(name: string): { valid: boolean; error: string | null } {
  const trimmed = name.trim();
  if (!trimmed || trimmed.length < 2) return { valid: false, error: 'Enter cardholder name' };
  if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) return { valid: false, error: 'Name may only contain letters' };
  return { valid: true, error: null };
}

export interface CardValidationResult {
  isValid: boolean;
  cardType: 'visa' | 'mastercard' | 'amex' | 'rupay' | 'unknown';
  errors: {
    cardName?: string;
    cardNumber?: string;
    expiry?: string;
    cvv?: string;
  };
}

/** Full card validation — runs all checks */
export function validateCard(
  cardName: string,
  cardNumber: string,
  expiry: string,
  cvv: string
): CardValidationResult {
  const digits = cardNumber.replace(/\s+/g, '');
  const cardType = detectCardType(digits);

  const nameCheck = validateCardName(cardName);
  const expiryCheck = validateExpiry(expiry);
  const cvvCheck = validateCvv(cvv, cardType);

  const luhnValid = luhnCheck(digits);
  const numberError = !digits
    ? 'Card number is required'
    : digits.length < 15
    ? 'Card number is too short'
    : !luhnValid
    ? 'Invalid card number'
    : undefined;

  const errors: CardValidationResult['errors'] = {};
  if (!nameCheck.valid) errors.cardName = nameCheck.error!;
  if (numberError) errors.cardNumber = numberError;
  if (!expiryCheck.valid) errors.expiry = expiryCheck.error!;
  if (!cvvCheck.valid) errors.cvv = cvvCheck.error!;

  return {
    isValid: Object.keys(errors).length === 0,
    cardType,
    errors,
  };
}
