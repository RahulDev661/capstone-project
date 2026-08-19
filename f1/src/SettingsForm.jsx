import React, { useState, useCallback } from "react";
import { Check, AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";

/**
 * SettingsForm
 * A self-contained account settings form with section-based layout
 * and field-level validation (required, format, length, match rules).
 *
 * Drop this into any React app. Styling uses inline CSS variables so
 * it carries its own look without a Tailwind config.
 */

const TOKENS = {
  bg: "#F6F4EF",
  panel: "#FFFFFF",
  ink: "#211F1C",
  inkSoft: "#6B6660",
  line: "#E5E1D8",
  accent: "#2F4B3F", // deep pine
  accentSoft: "#EAF0EC",
  error: "#B3432B",
  errorSoft: "#FBEDE8",
  success: "#3D6B4F",
  radius: "10px",
  fontDisplay:
    "'Iowan Old Style', 'Palatino Linotype', Georgia, 'Times New Roman', serif",
  fontBody:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Helvetica, Arial, sans-serif",
};

const initialValues = {
  fullName: "",
  email: "",
  username: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  notifyEmail: true,
  notifyProduct: false,
  theme: "system",
};

function validate(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Enter your full name.";
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = "Name must be at least 2 characters.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter an email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "That email address doesn't look right.";
  }

  if (!values.username.trim()) {
    errors.username = "Choose a username.";
  } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(values.username.trim())) {
    errors.username =
      "3–20 characters: letters, numbers, and underscores only.";
  }

  // Password fields are only required if the user is trying to change it
  const changingPassword =
    values.currentPassword || values.newPassword || values.confirmPassword;

  if (changingPassword) {
    if (!values.currentPassword) {
      errors.currentPassword = "Enter your current password.";
    }
    if (!values.newPassword) {
      errors.newPassword = "Enter a new password.";
    } else if (values.newPassword.length < 8) {
      errors.newPassword = "Use at least 8 characters.";
    } else if (!/[A-Z]/.test(values.newPassword) || !/[a-z]/.test(values.newPassword) || !/[0-9]/.test(values.newPassword)) {
      errors.newPassword = "Mix uppercase, lowercase, and a number.";
    }
    if (values.newPassword && values.currentPassword && values.newPassword === values.currentPassword) {
      errors.newPassword = "New password must differ from the current one.";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm your new password.";
    } else if (values.confirmPassword !== values.newPassword) {
      errors.confirmPassword = "Passwords don't match.";
    }
  }

  return errors;
}

function Field({ label, htmlFor, error, hint, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label
        htmlFor={htmlFor}
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 600,
          color: TOKENS.ink,
          marginBottom: 6,
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </label>
      {children}
      {error ? (
        <div
          role="alert"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginTop: 6,
            fontSize: 12.5,
            color: TOKENS.error,
          }}
        >
          <AlertCircle size={13} strokeWidth={2.5} />
          <span>{error}</span>
        </div>
      ) : hint ? (
        <div style={{ marginTop: 6, fontSize: 12.5, color: TOKENS.inkSoft }}>
          {hint}
        </div>
      ) : null}
    </div>
  );
}

function inputStyle(hasError) {
  return {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    fontSize: 14.5,
    fontFamily: TOKENS.fontBody,
    color: TOKENS.ink,
    background: TOKENS.panel,
    border: `1.5px solid ${hasError ? TOKENS.error : TOKENS.line}`,
    borderRadius: 8,
    outline: "none",
    transition: "border-color 120ms ease, box-shadow 120ms ease",
  };
}

export default function SettingsForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | saving | saved

  const focusRing = (hasError) => (e) => {
    e.target.style.borderColor = hasError ? TOKENS.error : TOKENS.accent;
    e.target.style.boxShadow = `0 0 0 3px ${hasError ? TOKENS.errorSoft : TOKENS.accentSoft}`;
  };
  const blurRing = (hasError) => (e) => {
    e.target.style.borderColor = hasError ? TOKENS.error : TOKENS.line;
    e.target.style.boxShadow = "none";
  };

  const handleChange = useCallback((field) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [field]: val }));
  }, []);

  const handleBlur = useCallback((field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate({ ...values }));
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({
      fullName: true,
      email: true,
      username: true,
      currentPassword: true,
      newPassword: true,
      confirmPassword: true,
    });

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      const el = document.getElementById(firstField);
      if (el) el.focus();
      return;
    }

    setStatus("saving");
    // Simulated save — replace with your API call.
    setTimeout(() => {
      setStatus("saved");
      setValues((v) => ({
        ...v,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setTimeout(() => setStatus("idle"), 2500);
    }, 900);
  };

  const err = (field) => (touched[field] ? errors[field] : undefined);

  return (
    <div
      style={{
        background: TOKENS.bg,
        minHeight: "100%",
        padding: "40px 16px",
        fontFamily: TOKENS.fontBody,
      }}
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        style={{
          maxWidth: 520,
          margin: "0 auto",
          background: TOKENS.panel,
          border: `1px solid ${TOKENS.line}`,
          borderRadius: TOKENS.radius,
          padding: "32px 32px 28px",
          boxShadow: "0 1px 2px rgba(33,31,28,0.04), 0 8px 24px rgba(33,31,28,0.05)",
        }}
      >
        <h1
          style={{
            fontFamily: TOKENS.fontDisplay,
            fontSize: 26,
            fontWeight: 500,
            color: TOKENS.ink,
            margin: "0 0 4px",
            letterSpacing: "-0.01em",
          }}
        >
          Account settings
        </h1>
        <p style={{ fontSize: 14, color: TOKENS.inkSoft, margin: "0 0 28px" }}>
          Update your profile, password, and notification preferences.
        </p>

        {/* Profile */}
        <SectionLabel>Profile</SectionLabel>

        <Field label="Full name" htmlFor="fullName" error={err("fullName")}>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={handleChange("fullName")}
            onBlur={handleBlur("fullName")}
            onFocus={focusRing(!!err("fullName"))}
            onBlurCapture={blurRing(!!err("fullName"))}
            style={inputStyle(!!err("fullName"))}
            placeholder="Jordan Ellis"
          />
        </Field>

        <Field label="Email address" htmlFor="email" error={err("email")}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            onFocus={focusRing(!!err("email"))}
            onBlurCapture={blurRing(!!err("email"))}
            style={inputStyle(!!err("email"))}
            placeholder="jordan@example.com"
          />
        </Field>

        <Field
          label="Username"
          htmlFor="username"
          error={err("username")}
          hint={!err("username") ? "3–20 characters. Letters, numbers, underscores." : undefined}
        >
          <input
            id="username"
            type="text"
            autoComplete="username"
            value={values.username}
            onChange={handleChange("username")}
            onBlur={handleBlur("username")}
            onFocus={focusRing(!!err("username"))}
            onBlurCapture={blurRing(!!err("username"))}
            style={inputStyle(!!err("username"))}
            placeholder="jordanellis"
          />
        </Field>

        {/* Password */}
        <SectionLabel style={{ marginTop: 8 }}>Password</SectionLabel>
        <p style={{ fontSize: 12.5, color: TOKENS.inkSoft, margin: "-6px 0 16px" }}>
          Leave blank to keep your current password.
        </p>

        <Field label="Current password" htmlFor="currentPassword" error={err("currentPassword")}>
          <div style={{ position: "relative" }}>
            <input
              id="currentPassword"
              type={showCurrent ? "text" : "password"}
              autoComplete="current-password"
              value={values.currentPassword}
              onChange={handleChange("currentPassword")}
              onBlur={handleBlur("currentPassword")}
              onFocus={focusRing(!!err("currentPassword"))}
              onBlurCapture={blurRing(!!err("currentPassword"))}
              style={{ ...inputStyle(!!err("currentPassword")), paddingRight: 40 }}
            />
            <ToggleVisibility show={showCurrent} onClick={() => setShowCurrent((s) => !s)} />
          </div>
        </Field>

        <Field
          label="New password"
          htmlFor="newPassword"
          error={err("newPassword")}
          hint={!err("newPassword") ? "At least 8 characters, with upper, lower, and a number." : undefined}
        >
          <div style={{ position: "relative" }}>
            <input
              id="newPassword"
              type={showNew ? "text" : "password"}
              autoComplete="new-password"
              value={values.newPassword}
              onChange={handleChange("newPassword")}
              onBlur={handleBlur("newPassword")}
              onFocus={focusRing(!!err("newPassword"))}
              onBlurCapture={blurRing(!!err("newPassword"))}
              style={{ ...inputStyle(!!err("newPassword")), paddingRight: 40 }}
            />
            <ToggleVisibility show={showNew} onClick={() => setShowNew((s) => !s)} />
          </div>
        </Field>

        <Field label="Confirm new password" htmlFor="confirmPassword" error={err("confirmPassword")}>
          <input
            id="confirmPassword"
            type={showNew ? "text" : "password"}
            autoComplete="new-password"
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            onFocus={focusRing(!!err("confirmPassword"))}
            onBlurCapture={blurRing(!!err("confirmPassword"))}
            style={inputStyle(!!err("confirmPassword"))}
          />
        </Field>

        {/* Preferences */}
        <SectionLabel style={{ marginTop: 8 }}>Preferences</SectionLabel>

        <label style={checkboxRow}>
          <input
            type="checkbox"
            checked={values.notifyEmail}
            onChange={handleChange("notifyEmail")}
            style={{ accentColor: TOKENS.accent, width: 16, height: 16 }}
          />
          <span>
            <strong style={{ fontWeight: 600 }}>Email notifications</strong>
            <div style={{ fontSize: 12.5, color: TOKENS.inkSoft }}>
              Security alerts and account activity.
            </div>
          </span>
        </label>

        <label style={{ ...checkboxRow, marginBottom: 20 }}>
          <input
            type="checkbox"
            checked={values.notifyProduct}
            onChange={handleChange("notifyProduct")}
            style={{ accentColor: TOKENS.accent, width: 16, height: 16 }}
          />
          <span>
            <strong style={{ fontWeight: 600 }}>Product updates</strong>
            <div style={{ fontSize: 12.5, color: TOKENS.inkSoft }}>
              Occasional news about new features.
            </div>
          </span>
        </label>

        <Field label="Theme" htmlFor="theme">
          <select
            id="theme"
            value={values.theme}
            onChange={handleChange("theme")}
            style={{ ...inputStyle(false), appearance: "auto" }}
          >
            <option value="system">Match system</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </Field>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "saving"}
          style={{
            width: "100%",
            marginTop: 8,
            padding: "12px 16px",
            fontSize: 14.5,
            fontWeight: 600,
            color: "#FFFFFF",
            background: status === "saved" ? TOKENS.success : TOKENS.accent,
            border: "none",
            borderRadius: 8,
            cursor: status === "saving" ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            opacity: status === "saving" ? 0.85 : 1,
            transition: "background 150ms ease",
          }}
        >
          {status === "saving" && <Loader2 size={16} className="spin" style={{ animation: "spin 0.8s linear infinite" }} />}
          {status === "saved" && <Check size={16} strokeWidth={2.5} />}
          {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : "Save changes"}
        </button>

        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </form>
    </div>
  );
}

function SectionLabel({ children, style }) {
  return (
    <div
      style={{
        fontSize: 11.5,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: TOKENS.accent,
        borderBottom: `1px solid ${TOKENS.line}`,
        paddingBottom: 8,
        marginBottom: 16,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ToggleVisibility({ show, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={-1}
      style={{
        position: "absolute",
        right: 8,
        top: "50%",
        transform: "translateY(-50%)",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: TOKENS.inkSoft,
        padding: 4,
        display: "flex",
      }}
      aria-label={show ? "Hide password" : "Show password"}
    >
      {show ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  );
}

const checkboxRow = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  marginBottom: 14,
  fontSize: 13.5,
  color: TOKENS.ink,
  cursor: "pointer",
};
