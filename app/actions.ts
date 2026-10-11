"use server";

import { getPublishedContent } from "@/lib/content";
import { readFields, validate, type FieldRule, type FormState } from "@/lib/forms";

async function deliver(subject: string, values: Record<string, string>, siteName: string) {
  const lines = Object.entries(values)
    .filter(([k, v]) => v && k !== "website")
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!key || !to) {
    // No email provider configured yet — keep the submission visible in server logs.
    console.log(`[contact] ${subject}\n${lines}`);
    return true;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? `${siteName} <onboarding@resend.dev>`,
      to: [to],
      reply_to: values.email || undefined,
      subject,
      text: lines,
    }),
  });
  return res.ok;
}

async function handle(
  formData: FormData,
  names: string[],
  rules: Record<string, FieldRule>,
  subject: (v: Record<string, string>) => string,
  success: (c: Awaited<ReturnType<typeof getPublishedContent>>["contact"]) => string,
): Promise<FormState> {
  const values = readFields(formData, names);
  const { contact } = await getPublishedContent();

  // Honeypot: bots fill the hidden field, humans never see it.
  if (formData.get("website")) return { ok: true, message: success(contact) };

  const errors = validate(values, rules);
  if (formData.get("agree") !== "on" && "agree" in rules) errors.agree = "Please accept the terms to continue.";
  if (Object.keys(errors).length) {
    return { ok: false, message: "Please fix the highlighted fields.", errors, values };
  }

  const { settings } = await getPublishedContent();
  try {
    if (!(await deliver(subject(values), values, settings.name))) throw new Error("delivery failed");
  } catch {
    return {
      ok: false,
      message: `Sorry, something went wrong. Please call us on ${settings.phone}.`,
      values,
    };
  }
  return { ok: true, message: success(contact) };
}

export async function bookTrial(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle(
    formData,
    ["name", "age", "phone", "email", "program", "time", "experience", "notes"],
    {
      name: { required: true, label: "Full name", max: 100 },
      age: { required: true, label: "Age group" },
      phone: { required: true, type: "phone", label: "Phone number" },
      email: { required: true, type: "email", label: "Email" },
      program: { required: true, label: "Program" },
      agree: { label: "Terms" },
    },
    (v) => `Free trial request — ${v.name}`,
    (c) => c.trialSuccess,
  );
}

export async function requestCallback(_prev: FormState, formData: FormData): Promise<FormState> {
  return handle(
    formData,
    ["name", "phone", "email", "bestTime", "program", "message"],
    {
      name: { required: true, label: "Full name", max: 100 },
      phone: { required: true, type: "phone", label: "Phone number" },
      email: { type: "email", label: "Email" },
      message: { required: true, label: "Message", max: 2000 },
    },
    (v) => `Call-back request — ${v.name}`,
    (c) => c.callbackSuccess,
  );
}
