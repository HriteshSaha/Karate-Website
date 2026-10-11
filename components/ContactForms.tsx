"use client";

import { useActionState, useState, type ComponentType, type ReactNode } from "react";
import { AlertCircle, ArrowRight, LoaderCircle, Mail, MessageSquare, Phone, RotateCcw, User } from "lucide-react";
import { bookTrial, requestCallback } from "@/app/actions";
import { initialFormState, type FormState } from "@/lib/forms";

type Tone = "dark" | "light";
type IconType = ComponentType<{ className?: string }>;

const input = (tone: Tone, hasIcon: boolean, error?: boolean) =>
  `w-full resize-none rounded-xl border py-3.5 text-base outline-none transition-all duration-200 sm:py-3 sm:text-[0.95rem] ${
    hasIcon ? "pl-11 pr-4" : "px-4"
  } ${
    tone === "dark"
      ? "border-white/15 bg-white/[0.07] text-white placeholder:text-zinc-500 hover:border-white/30 focus:border-brand focus:bg-white/10 focus:ring-4 focus:ring-brand/25"
      : "border-zinc-200 bg-zinc-50 text-ink placeholder:text-zinc-400 hover:border-zinc-300 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15"
  } ${error ? "!border-red-500" : ""}`;

const labelCls = (tone: Tone) =>
  `mb-1.5 block text-xs font-semibold uppercase tracking-wider ${tone === "dark" ? "text-zinc-300" : "text-zinc-600"}`;

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
      <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" /> {children}
    </p>
  );
}

function TextField({
  tone,
  id,
  name,
  label,
  icon: Icon,
  type = "text",
  placeholder,
  required,
  autoComplete,
  rows,
  error,
  defaultValue,
}: {
  tone: Tone;
  id: string;
  name: string;
  label: string;
  icon?: IconType;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  rows?: number;
  error?: string;
  defaultValue?: string;
}) {
  const common = {
    id,
    name,
    defaultValue,
    placeholder,
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: input(tone, !!Icon, !!error),
  };
  return (
    <div>
      <label htmlFor={id} className={labelCls(tone)}>
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className={`pointer-events-none absolute left-3.5 size-[1.15rem] ${rows ? "top-4" : "top-1/2 -translate-y-1/2"} ${
              tone === "dark" ? "text-zinc-400" : "text-zinc-400"
            }`}
          />
        )}
        {rows ? <textarea {...common} rows={rows} /> : <input {...common} type={type} />}
      </div>
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
  );
}

/** Radio buttons styled as tap-friendly chips. */
function ChipGroup({
  tone,
  name,
  label,
  options,
  required,
  error,
  defaultValue,
}: {
  tone: Tone;
  name: string;
  label: string;
  options: string[];
  required?: boolean;
  error?: string;
  defaultValue?: string;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className={labelCls(tone)}>
        {label}
        {required && <span className="text-brand"> *</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o}
              defaultChecked={defaultValue === o}
              className="peer sr-only"
            />
            <span
              className={`block select-none rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 active:scale-95 peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-checked:shadow-md peer-checked:shadow-brand/30 peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2 ${
                tone === "dark"
                  ? "border-white/20 text-zinc-200 hover:border-white/50 hover:bg-white/10 peer-focus-visible:ring-offset-zinc-950"
                  : "border-zinc-300 bg-white text-ink hover:border-brand hover:text-brand peer-checked:hover:text-white"
              }`}
            >
              {o}
            </span>
          </label>
        ))}
      </div>
      <ErrorText id={`${name}-error`}>{error}</ErrorText>
    </fieldset>
  );
}

function StepTitle({ n, children, tone }: { n: number; children: ReactNode; tone: Tone }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-7 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">{n}</span>
      <p className={`text-sm font-bold uppercase tracking-wider ${tone === "dark" ? "text-white" : "text-ink"}`}>{children}</p>
      <span className={`h-px flex-1 ${tone === "dark" ? "bg-white/10" : "bg-black/10"}`} />
    </div>
  );
}

/** Hidden from people, tempting to bots. */
function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function SubmitButton({ pending, label, tone }: { pending: boolean; label: string; tone: Tone }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={`group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70 ${
        tone === "dark"
          ? "bg-brand shadow-brand/30 hover:bg-brand-dark hover:shadow-brand/50"
          : "bg-ink shadow-black/20 hover:bg-brand hover:shadow-brand/40"
      } before:absolute before:-left-1/3 before:top-0 before:h-full before:w-1/4 before:-skew-x-[20deg] before:bg-white/25 before:opacity-0 hover:before:opacity-100 hover:before:animate-[shine_0.9s_ease]`}
    >
      {pending ? (
        <>
          <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> Sending…
        </>
      ) : (
        <>
          {label}
          <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </>
      )}
    </button>
  );
}

function Success({ message, tone, onReset }: { message: string; tone: Tone; onReset: () => void }) {
  return (
    <div role="status" className="flex flex-col items-center py-6 text-center sm:py-10">
      <svg viewBox="0 0 52 52" className="size-20" aria-hidden="true" style={{ animation: "pop 0.5s ease-out" }}>
        <circle className="tick-circle" cx="26" cy="26" r="24" fill="none" stroke="#10b981" strokeWidth="3" />
        <path className="tick-check" d="M15 27l8 8 15-17" fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h3 className={`display mt-5 text-3xl ${tone === "dark" ? "text-white" : "text-ink"}`}>You&apos;re all set!</h3>
      <p className={`mt-2 max-w-sm leading-7 ${tone === "dark" ? "text-zinc-300" : "text-zinc-600"}`}>{message}</p>
      <button
        type="button"
        onClick={onReset}
        className={`mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
          tone === "dark" ? "border-white/25 text-white hover:bg-white/10" : "border-zinc-300 text-ink hover:border-brand hover:text-brand"
        }`}
      >
        <RotateCcw className="size-4" aria-hidden="true" /> Send another
      </button>
    </div>
  );
}

function FormError({ state }: { state: FormState }) {
  if (!state.message || state.ok) return null;
  return (
    <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm font-medium text-red-400">
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {state.message}
    </p>
  );
}

/* ------------------------------------------------------------------ */

type TrialProps = {
  ageGroups: string[];
  programOptions: string[];
  classTimes: string[];
  experienceLevels: string[];
  submitLabel: string;
};

export function TrialForm(props: TrialProps) {
  // Changing the key remounts the form with fresh state ("Send another").
  const [key, setKey] = useState(0);
  return <TrialFormInner key={key} {...props} onReset={() => setKey((k) => k + 1)} />;
}

function TrialFormInner({ ageGroups, programOptions, classTimes, experienceLevels, submitLabel, onReset }: TrialProps & { onReset: () => void }) {
  const [state, action, pending] = useActionState(bookTrial, initialFormState);
  const tone: Tone = "dark";
  const v = state.values ?? {};
  const e = state.errors ?? {};

  if (state.ok) return <Success message={state.message} tone={tone} onReset={onReset} />;

  return (
    <form action={action} noValidate className="relative space-y-6">
      <Honeypot />

      <StepTitle n={1} tone={tone}>About you</StepTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField tone={tone} id="trial-name" name="name" label="Full name" icon={User} required autoComplete="name" placeholder="Your full name" error={e.name} defaultValue={v.name} />
        <TextField tone={tone} id="trial-phone" name="phone" label="Phone" icon={Phone} type="tel" required autoComplete="tel" placeholder="(123) 456-7890" error={e.phone} defaultValue={v.phone} />
        <div className="sm:col-span-2">
          <TextField tone={tone} id="trial-email" name="email" label="Email" icon={Mail} type="email" required autoComplete="email" placeholder="you@email.com" error={e.email} defaultValue={v.email} />
        </div>
      </div>
      <ChipGroup tone={tone} name="age" label="Student age group" options={ageGroups} required error={e.age} defaultValue={v.age} />

      <StepTitle n={2} tone={tone}>Your training</StepTitle>
      <ChipGroup tone={tone} name="program" label="Program interest" options={programOptions} required error={e.program} defaultValue={v.program} />
      <ChipGroup tone={tone} name="experience" label="Experience" options={experienceLevels} defaultValue={v.experience} />
      <ChipGroup tone={tone} name="time" label="Preferred class time" options={classTimes} defaultValue={v.time} />
      <TextField tone={tone} id="trial-notes" name="notes" label="Anything else? (optional)" icon={MessageSquare} rows={3} placeholder="Tell us about goals, injuries or questions…" defaultValue={v.notes} />

      <div>
        <label className="flex cursor-pointer items-start gap-3 py-1 text-sm text-zinc-300">
          <input type="checkbox" name="agree" className="mt-0.5 size-5 shrink-0 cursor-pointer accent-brand" />
          <span>
            I agree to the Terms of Service and Privacy Policy <span className="text-brand">*</span>
          </span>
        </label>
        <ErrorText id="agree-error">{e.agree}</ErrorText>
      </div>

      <FormError state={state} />
      <SubmitButton pending={pending} label={submitLabel} tone={tone} />
    </form>
  );
}

/* ------------------------------------------------------------------ */

type CallbackProps = { callTimes: string[]; programOptions: string[]; submitLabel: string };

export function CallbackForm(props: CallbackProps) {
  const [key, setKey] = useState(0);
  return <CallbackFormInner key={key} {...props} onReset={() => setKey((k) => k + 1)} />;
}

function CallbackFormInner({ callTimes, programOptions, submitLabel, onReset }: CallbackProps & { onReset: () => void }) {
  const [state, action, pending] = useActionState(requestCallback, initialFormState);
  const tone: Tone = "light";
  const v = state.values ?? {};
  const e = state.errors ?? {};

  if (state.ok) return <Success message={state.message} tone={tone} onReset={onReset} />;

  return (
    <form action={action} noValidate className="relative space-y-6">
      <Honeypot />

      <StepTitle n={1} tone={tone}>How can we reach you?</StepTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField tone={tone} id="call-name" name="name" label="Full name" icon={User} required autoComplete="name" placeholder="Your full name" error={e.name} defaultValue={v.name} />
        <TextField tone={tone} id="call-phone" name="phone" label="Phone" icon={Phone} type="tel" required autoComplete="tel" placeholder="(123) 456-7890" error={e.phone} defaultValue={v.phone} />
        <div className="sm:col-span-2">
          <TextField tone={tone} id="call-email" name="email" label="Email (optional)" icon={Mail} type="email" autoComplete="email" placeholder="you@email.com" error={e.email} defaultValue={v.email} />
        </div>
      </div>
      <ChipGroup tone={tone} name="bestTime" label="Best time to call" options={callTimes} defaultValue={v.bestTime} />

      <StepTitle n={2} tone={tone}>Your question</StepTitle>
      <ChipGroup tone={tone} name="program" label="Interested in (optional)" options={programOptions} defaultValue={v.program} />
      <TextField tone={tone} id="call-message" name="message" label="Message" icon={MessageSquare} rows={4} required placeholder="How can we help you?" error={e.message} defaultValue={v.message} />

      <FormError state={state} />
      <SubmitButton pending={pending} label={submitLabel} tone={tone} />
    </form>
  );
}
