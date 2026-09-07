import { useState } from "react";

export default function Disclosure() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="accessibility-content"
      >
        {isOpen ? "▼" : "▶"} What is accessibility?
      </button>

      {isOpen && (
        <div id="accessibility-content">
          <p>
            Accessibility means designing websites and applications so they can
            be used by everyone, including people using keyboards and assistive
            technologies.
          </p>
        </div>
      )}
    </div>
  );
}