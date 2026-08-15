import React from "react";

/**
 * FormField
 * Wraps a form control with an associated <label>, an optional hint,
 * and an accessible error message.
 *
 * Accessibility contract:
 * - `htmlFor` on the label matches the control's `id`.
 * - When `error` is set, the error text gets an id and the caller
 *   must pass that same id to the control's `aria-describedby`
 *   (see TextInput, which does this automatically via `errorId`).
 * - The error region uses `role="alert"` + `aria-live="polite"` so
 *   assistive tech announces it as soon as it appears, without
 *   requiring focus to move.
 * - Errors are shown with an icon + text, not color alone.
 */
export default function FormField({ label, htmlFor, error, hint, children }) {
  const errorId = `${htmlFor}-error`;
  const hintId = `${htmlFor}-hint`;

  return (
    <div className="form-field">
      <label htmlFor={htmlFor} className="form-field__label">
        {label}
      </label>

      {children}

      {error ? (
        <p id={errorId} role="alert" className="form-field__error">
          <span aria-hidden="true" className="form-field__error-icon">
            ⚠
          </span>
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p id={hintId} className="form-field__hint">
          {hint}
        </p>
      ) : null}

      <style>{`
        .form-field {
          margin-bottom: 20px;
        }
        .form-field__label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--color-ink);
          margin-bottom: 6px;
          letter-spacing: 0.01em;
        }
        .form-field__error {
          display: flex;
          align-items: center;
          gap: 6px;
          margin: 6px 0 0;
          font-size: 12.5px;
          color: var(--color-error);
          font-weight: 500;
        }
        .form-field__error-icon {
          font-size: 12px;
        }
        .form-field__hint {
          margin: 6px 0 0;
          font-size: 12.5px;
          color: var(--color-ink-soft);
        }
      `}</style>
    </div>
  );
}

/** Helper so inputs can compute the same ids FormField uses. */
export function getFieldDescribedBy(htmlFor, hasError, hasHint) {
  if (hasError) return `${htmlFor}-error`;
  if (hasHint) return `${htmlFor}-hint`;
  return undefined;
}
