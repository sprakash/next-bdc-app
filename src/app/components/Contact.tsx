"use client";

import { useState } from "react";
import { Contact } from 'lucide-react';

export default function ContactArea() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="border-t py-20 px-6 md:px-16 lg:px-24 bg-neutral-50 shadow-[gainsboro_0px_0px_20px_1px]">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-3xl uppercase tracking-wide mb-6 text-neutral-700">
          Contact
        </h3>

        <p className="text-neutral-600 mb-10">
          Have a question or collaboration idea? We'd love to hear from you.
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
            disabled={status === "loading"}
            className="w-full bg-black text-white uppercase tracking-wide py-3 hover:opacity-80 transition disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-green-600 text-sm">
              Thank you. Your message has been sent.
            </p>
          )}

          {status === "error" && (
            <p className="text-red-600 text-sm">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}