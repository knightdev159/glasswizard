"use client";

import { useState, type FormEvent } from "react";
import { company } from "@/data/company";
import { products } from "@/data/products";

/**
 * No transactional email provider is connected to this project yet, so rather
 * than POST into a void the form composes a pre-filled message and hands it to
 * the customer's mail client. That genuinely works today.
 *
 * To move it server-side: replace `handleSubmit` with a server action that
 * sends via Resend/Postmark/SES and keep the markup as it is.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const model = String(data.get("model") ?? "");

    const body = [
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Email: ${data.get("email")}`,
      `Delivery ZIP: ${data.get("zip")}`,
      model ? `Model of interest: ${model}` : null,
      "",
      String(data.get("message") ?? ""),
    ]
      .filter((line) => line !== null)
      .join("\n");

    const subject = model
      ? `Enquiry — ${model}`
      : `Enquiry from ${data.get("name")}`;

    window.location.href = `mailto:${company.contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-fit rounded-card border border-ink-200 p-6 sm:p-8"
    >
      <h2 className="text-lg font-bold text-ink-950">Send us a message</h2>
      <p className="mt-1.5 text-sm text-ink-600">
        We reply within one business day. For same-day delivery scheduling, please call.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="sm:col-span-2"
        />
        <Field
          label="Delivery ZIP"
          name="zip"
          inputMode="numeric"
          pattern="[0-9]{5}"
          placeholder="33157"
          autoComplete="postal-code"
        />

        <label className="block text-sm">
          <span className="font-medium text-ink-800">Model of interest</span>
          <select
            name="model"
            defaultValue=""
            className="mt-1.5 h-11 w-full rounded-lg border border-ink-300 bg-white px-3 text-sm text-ink-900 focus:border-frost-500"
          >
            <option value="">Not sure yet</option>
            {products.map((p) => (
              <option key={p.sku} value={`${p.brand} ${p.model}`}>
                {p.brand} {p.model}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-ink-800">
            Message <span className="text-red-600">*</span>
          </span>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Opening is 35½ inches wide and 69 inches tall — will the LG fit?"
            className="mt-1.5 w-full rounded-lg border border-ink-300 px-3 py-2.5 text-sm text-ink-900 focus:border-frost-500"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-lg bg-frost-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-frost-800"
      >
        Send message
      </button>

      {sent && (
        <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status">
          Your mail client should have opened with the message ready to send. If nothing
          happened, email us directly at{" "}
          <a href={`mailto:${company.contact.email}`} className="font-semibold underline">
            {company.contact.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  className = "",
  required,
  ...rest
}: {
  label: string;
  name: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="font-medium text-ink-800">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <input
        name={name}
        required={required}
        className="mt-1.5 h-11 w-full rounded-lg border border-ink-300 px-3 text-sm text-ink-900 focus:border-frost-500"
        {...rest}
      />
    </label>
  );
}
