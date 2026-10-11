export type FormState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
};

export const initialFormState: FormState = { ok: false, message: "" };

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[0-9+()\-.\s]{7,20}$/;

export type FieldRule = { required?: boolean; type?: "email" | "phone"; label: string; max?: number };

export function readFields(formData: FormData, names: string[]) {
  const values: Record<string, string> = {};
  for (const n of names) values[n] = String(formData.get(n) ?? "").trim();
  return values;
}

export function validate(values: Record<string, string>, rules: Record<string, FieldRule>) {
  const errors: Record<string, string> = {};
  for (const [name, rule] of Object.entries(rules)) {
    const v = values[name] ?? "";
    if (rule.required && !v) errors[name] = `${rule.label} is required.`;
    else if (v && rule.type === "email" && !emailRe.test(v)) errors[name] = "Enter a valid email address.";
    else if (v && rule.type === "phone" && !phoneRe.test(v)) errors[name] = "Enter a valid phone number.";
    else if (v && v.length > (rule.max ?? 2000)) errors[name] = `${rule.label} is too long.`;
  }
  return errors;
}
