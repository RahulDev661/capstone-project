const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateName(name) {
  if (!name || !name.trim()) {
    return "Name is required";
  }
  return "";
}

export function validateEmail(email) {
  if (!email || !email.trim()) {
    return "Email is required";
  }
  if (!EMAIL_PATTERN.test(email.trim())) {
    return "Enter a valid email address";
  }
  return "";
}

export function validatePhone(phone) {
  if (!phone || !phone.trim()) {
    return "Phone is required";
  }
  // Accept common formatting (spaces, dashes, parens, dots) and validate
  // on the underlying digit count so "(555) 123-4567" and "5551234567"
  // both pass, but anything without exactly 10 digits fails.
  const digitsOnly = phone.replace(/\D/g, "");
  if (digitsOnly.length !== 10) {
    return "Enter a valid 10-digit phone number";
  }
  return "";
}

/**
 * Validates the full settings form.
 * @param {{name: string, email: string, phone: string}} values
 * @returns {{name?: string, email?: string, phone?: string}} error map;
 *   a field is omitted (falsy) when it's valid.
 */
export function validateSettingsForm(values) {
  return {
    name: validateName(values.name),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone),
  };
}

export function hasErrors(errors) {
  return Object.values(errors).some(Boolean);
}
