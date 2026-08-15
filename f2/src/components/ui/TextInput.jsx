import React from "react";
import { getFieldDescribedBy } from "./FormField";

/**
 * TextInput
 * Styled input that wires up aria-invalid / aria-describedby based on
 * whether the field currently has an error, so every consumer gets
 * consistent accessible behavior for free.
 */
const TextInput = React.forwardRef(function TextInput(
  { id, error, hint, ...props },
  ref
) {
  return (
    <input
      id={id}
      ref={ref}
      aria-invalid={error ? "true" : "false"}
      aria-describedby={getFieldDescribedBy(id, !!error, !!hint)}
      className="text-input"
      {...props}
    />
  );
});

export default TextInput;
