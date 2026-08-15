import React, { useState } from "react";
import FormField from "../components/ui/FormField";
import TextInput from "../components/ui/TextInput";
import Button from "../components/ui/Button";
import { validateSettingsForm, hasErrors } from "../utils/validators";

const initialValues = { name: "", email: "", phone: "" };
const initialErrors = { name: "", email: "", phone: "" };

export default function SettingsPage() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setValues((prev) => ({ ...prev, [field]: value }));
    // Once a field has been touched, re-validate live so the message
    // clears as soon as the user fixes it.
    if (touched[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateSettingsForm({ ...values, [field]: value })[field],
      }));
    }
    if (submitted) setSubmitted(false);
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateSettingsForm(values)[field],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateSettingsForm(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, phone: true });

    if (hasErrors(nextErrors)) {
      setSubmitted(false);
      // Move focus to the first invalid field for keyboard/screen-reader users.
      const firstInvalidField = ["name", "email", "phone"].find(
        (field) => nextErrors[field]
      );
      if (firstInvalidField) {
        const el = document.getElementById(firstInvalidField);
        if (el) el.focus();
      }
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="settings-page">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="settings-page__card"
        aria-labelledby="settings-heading"
      >
        <h1 id="settings-heading" className="settings-page__title">
          Account settings
        </h1>
        <p className="settings-page__subtitle">
          Update your name, email, and phone number.
        </p>

        {submitted && (
          <div
            role="status"
            aria-live="polite"
            className="settings-page__success"
          >
            <span aria-hidden="true">✓</span>
            <span>Your settings have been updated successfully.</span>
          </div>
        )}

        <FormField label="Name" htmlFor="name" error={errors.name}>
          <TextInput
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            error={errors.name}
          />
        </FormField>

        <FormField label="Email" htmlFor="email" error={errors.email}>
          <TextInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
          />
        </FormField>

        <FormField
          label="Phone"
          htmlFor="phone"
          error={errors.phone}
          hint={!errors.phone ? "10 digits, e.g. (555) 123-4567" : undefined}
        >
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={handleChange("phone")}
            onBlur={handleBlur("phone")}
            error={errors.phone}
          />
        </FormField>

        <Button type="submit" className="settings-page__submit">
          Save changes
        </Button>
      </form>

      <style>{`
        .settings-page {
          min-height: 100%;
          padding: 40px 16px;
        }
        .settings-page__card {
          max-width: 480px;
          margin: 0 auto;
          background: var(--color-panel);
          border: 1px solid var(--color-line);
          border-radius: var(--radius);
          padding: 32px 32px 28px;
          box-shadow: 0 1px 2px rgba(33, 31, 28, 0.04),
            0 8px 24px rgba(33, 31, 28, 0.05);
        }
        .settings-page__title {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 500;
          margin: 0 0 4px;
          letter-spacing: -0.01em;
        }
        .settings-page__subtitle {
          font-size: 14px;
          color: var(--color-ink-soft);
          margin: 0 0 24px;
        }
        .settings-page__success {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--color-success-soft);
          color: var(--color-success);
          border: 1px solid var(--color-success);
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 13.5px;
          font-weight: 500;
          margin-bottom: 20px;
        }
        .settings-page__submit {
          width: 100%;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
}
