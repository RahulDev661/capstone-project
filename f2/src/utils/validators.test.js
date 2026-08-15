import { describe, it, expect } from "vitest";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateSettingsForm,
  hasErrors,
} from "./validators";

describe("validateName", () => {
  it("returns an error for an empty string", () => {
    expect(validateName("")).toBe("Name is required");
  });

  it("returns an error for whitespace only", () => {
    expect(validateName("   ")).toBe("Name is required");
  });

  it("returns no error for a valid name", () => {
    expect(validateName("Jordan Ellis")).toBe("");
  });
});

describe("validateEmail", () => {
  it("returns an error for an empty string", () => {
    expect(validateEmail("")).toBe("Email is required");
  });

  it("returns an error for an invalid format", () => {
    expect(validateEmail("not-an-email")).toBe("Enter a valid email address");
    expect(validateEmail("missing@domain")).toBe(
      "Enter a valid email address"
    );
    expect(validateEmail("@nouser.com")).toBe("Enter a valid email address");
  });

  it("returns no error for a valid email", () => {
    expect(validateEmail("jordan@example.com")).toBe("");
  });
});

describe("validatePhone", () => {
  it("returns an error for an empty string", () => {
    expect(validatePhone("")).toBe("Phone is required");
  });

  it("returns an error when fewer than 10 digits", () => {
    expect(validatePhone("123456789")).toBe(
      "Enter a valid 10-digit phone number"
    );
  });

  it("returns an error when more than 10 digits", () => {
    expect(validatePhone("123456789012")).toBe(
      "Enter a valid 10-digit phone number"
    );
  });

  it("accepts a plain 10-digit number", () => {
    expect(validatePhone("5551234567")).toBe("");
  });

  it("accepts common formatting around 10 digits", () => {
    expect(validatePhone("(555) 123-4567")).toBe("");
    expect(validatePhone("555-123-4567")).toBe("");
    expect(validatePhone("555.123.4567")).toBe("");
  });
});

describe("validateSettingsForm / hasErrors", () => {
  it("collects an error per invalid field", () => {
    const errors = validateSettingsForm({ name: "", email: "", phone: "" });
    expect(errors.name).toBe("Name is required");
    expect(errors.email).toBe("Email is required");
    expect(errors.phone).toBe("Phone is required");
    expect(hasErrors(errors)).toBe(true);
  });

  it("produces no errors for a fully valid form", () => {
    const errors = validateSettingsForm({
      name: "Jordan Ellis",
      email: "jordan@example.com",
      phone: "5551234567",
    });
    expect(errors.name).toBe("");
    expect(errors.email).toBe("");
    expect(errors.phone).toBe("");
    expect(hasErrors(errors)).toBe(false);
  });
});
