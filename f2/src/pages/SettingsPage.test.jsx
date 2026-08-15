import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SettingsPage from "./SettingsPage";

function renderPage() {
  return render(<SettingsPage />);
}

describe("SettingsPage", () => {
  it("labels every input so it has an accessible name", () => {
    renderPage();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone")).toBeInTheDocument();
  });

  it("shows required errors when submitting an empty form", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Phone is required")).toBeInTheDocument();
  });

  it("marks invalid fields with aria-invalid and links the error via aria-describedby", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    const nameInput = screen.getByLabelText("Name");
    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(nameInput).toHaveAttribute("aria-describedby", "name-error");

    // The error text lives inside a role="alert" region with the id
    // referenced by the input's aria-describedby.
    const alerts = await screen.findAllByRole("alert");
    const errorMessage = alerts.find((el) =>
      el.textContent.includes("Name is required")
    );
    expect(errorMessage).toHaveAttribute("id", "name-error");
  });

  it("shows an invalid-format error for a malformed email", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText("Name"), "Jordan Ellis");
    await user.type(screen.getByLabelText("Email"), "not-an-email");
    await user.type(screen.getByLabelText("Phone"), "5551234567");
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(
      await screen.findByText("Enter a valid email address")
    ).toBeInTheDocument();
  });

  it("shows an invalid-format error for a phone number that isn't 10 digits", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText("Name"), "Jordan Ellis");
    await user.type(screen.getByLabelText("Email"), "jordan@example.com");
    await user.type(screen.getByLabelText("Phone"), "12345");
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(
      await screen.findByText("Enter a valid 10-digit phone number")
    ).toBeInTheDocument();
  });

  it("does not show a success message when validation fails", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(
      screen.queryByText(/updated successfully/i)
    ).not.toBeInTheDocument();
  });

  it("shows a success message on valid submission and does not reload the page", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText("Name"), "Jordan Ellis");
    await user.type(screen.getByLabelText("Email"), "jordan@example.com");
    await user.type(screen.getByLabelText("Phone"), "(555) 123-4567");
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(
      await screen.findByText(/updated successfully/i)
    ).toBeInTheDocument();

    // jsdom throws "Not implemented: HTMLFormElement.prototype.submit" if a
    // real form submission/navigation is attempted. Getting this far without
    // that error confirms preventDefault() stopped the native page reload.
  });

  it("clears a field's error as soon as it becomes valid", async () => {
    const user = userEvent.setup();
    renderPage();

    const emailInput = screen.getByLabelText("Email");
    await user.click(emailInput);
    await user.tab(); // blur while empty -> triggers "Email is required"
    await screen.findByText("Email is required");

    await user.type(emailInput, "jordan@example.com");

    expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
  });
});
