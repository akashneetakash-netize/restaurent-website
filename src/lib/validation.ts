/**
 * Validation utilities for Haven Sanctuary Indian Restaurant SaaS
 */

/**
 * Validates Indian Phone Numbers (+91 9876543210, 9876543210, 09876543210, +91-9876543210)
 */
export function validateIndianPhone(phone: string): { isValid: boolean; error: string | null } {
  if (!phone || phone.trim() === '') {
    return { isValid: false, error: 'Phone number is required' };
  }

  const cleanPhone = phone.trim().replace(/[\s\-()]/g, '');
  // Matches +919876543210, 919876543210, 09876543210, 9876543210 (starts with 6, 7, 8, 9)
  const indianPhoneRegex = /^(\+91|91|0)?[6789]\d{9}$/;

  if (!indianPhoneRegex.test(cleanPhone)) {
    return {
      isValid: false,
      error: 'Please enter a valid 10-digit Indian mobile number (e.g. +91 98765 43210)',
    };
  }

  return { isValid: true, error: null };
}

/**
 * Validates reservation date — cannot be in the past, cannot exceed maxDays ahead (default 90)
 */
export function validateReservationDate(
  dateStr: string,
  maxDays: number = 90
): { isValid: boolean; error: string | null } {
  if (!dateStr || dateStr.trim() === '') {
    return { isValid: false, error: 'Please select a reservation date' };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = new Date(dateStr);
  selectedDate.setHours(0, 0, 0, 0);

  if (isNaN(selectedDate.getTime())) {
    return { isValid: false, error: 'Invalid date format' };
  }

  if (selectedDate < today) {
    return { isValid: false, error: 'Reservation date cannot be in the past' };
  }

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + maxDays);

  if (selectedDate > maxDate) {
    return { isValid: false, error: `Reservations can only be made up to ${maxDays} days in advance` };
  }

  return { isValid: true, error: null };
}

/**
 * Validates Email format according to standard RFC 5322
 */
export function validateEmail(email: string): { isValid: boolean; error: string | null } {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email address is required' };
  }

  const trimmed = email.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address (e.g. guest@example.com)' };
  }

  return { isValid: true, error: null };
}
