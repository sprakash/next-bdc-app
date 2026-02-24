"use client";

import { useState } from "react";

export default function ContactArea() {
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    // Let browser validation run first
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const subject = encodeURIComponent(`Website Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href = `mailto:bdcnewyork@gmail.com?subject=${subject}&body=${body}`;

    form.reset();
  }

  return (
    <section className="border-t py-20 px-6 md:px-16 lg:px-24 bg-neutral-50 shadow-[gainsboro_0px_0px_20px_1px]">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-3xl uppercase tracking-wide mb-6 text-neutral-700">
          Contact
        </h3>

        <p className="text-neutral-600 mb-10">
          Have a question or collaboration idea? We&apos;d love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <input
            name="name"
            required
            placeholder="Name"
            className="w-full border border-neutral-300 px-4 py-3 focus:outline-none focus:border-black transition"
          />

          <input
            name="email"
            required
            type="email"
            placeholder="Email"
            className="w-full border border-neutral-300 px-4 py-3 focus:outline-none focus:border-black transition"
          />

          <textarea
            name="message"
            required
            rows={5}
            placeholder="Message"
            className="w-full border border-neutral-300 px-4 py-3 focus:outline-none focus:border-black transition"
          />

          <button
            type="submit"
            className="w-full bg-black text-white uppercase tracking-wide py-3 hover:opacity-80 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}