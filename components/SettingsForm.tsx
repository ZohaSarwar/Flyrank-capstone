"use client";

import { FormEvent, useRef, useState } from "react";

type FieldErrors = {
  displayName?: string;
  email?: string;
};

function getInputError(input: HTMLInputElement): string | undefined {
  if (input.validity.valid) return undefined;

  if (input.validity.valueMissing) {
    return input.name === "displayName"
      ? "Display name is required."
      : "Email is required.";
  }

  if (input.validity.tooShort) {
    return "Display name must be at least 2 characters.";
  }

  if (input.validity.typeMismatch) {
    return "Please enter a valid email address.";
  }

  return input.validationMessage;
}

export default function SettingsForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const form = formRef.current;
    if (!form) return false;

    const displayName = form.elements.namedItem(
      "displayName",
    ) as HTMLInputElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;

    displayName.checkValidity();
    email.checkValidity();

    const nextErrors: FieldErrors = {
      displayName: getInputError(displayName),
      email: getInputError(email),
    };

    setErrors(nextErrors);
    return !nextErrors.displayName && !nextErrors.email;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowSuccess(false);

    if (!validateForm()) return;

    setShowSuccess(true);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto w-full max-w-lg space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      aria-labelledby="settings-form-heading"
    >
      <header>
        <h2
          id="settings-form-heading"
          className="text-xl font-semibold text-slate-900"
        >
          Settings
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Update your profile and notification preferences.
        </p>
      </header>

      {showSuccess && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
        >
          Settings saved successfully.
        </div>
      )}

      <div>
        <label
          htmlFor="displayName"
          className="block text-sm font-medium text-slate-700"
        >
          Display Name
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          required
          minLength={2}
          autoComplete="name"
          aria-invalid={errors.displayName ? "true" : "false"}
          aria-describedby={
            errors.displayName ? "displayName-error" : undefined
          }
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 aria-invalid:border-red-500 aria-invalid:focus:border-red-500 aria-invalid:focus:ring-red-500/20"
          placeholder="Jane Doe"
        />
        {errors.displayName && (
          <p
            id="displayName-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.displayName}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 aria-invalid:border-red-500 aria-invalid:focus:border-red-500 aria-invalid:focus:ring-red-500/20"
          placeholder="jane@example.com"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        <div>
          <p
            id="emailNotifications-label"
            className="text-sm font-medium text-slate-700"
          >
            Email Notifications
          </p>
          <p className="text-sm text-slate-500">
            Receive updates about your account activity.
          </p>
        </div>
        <button
          id="emailNotifications"
          name="emailNotifications"
          type="button"
          role="switch"
          aria-checked={emailNotifications}
          aria-labelledby="emailNotifications-label"
          onClick={() => setEmailNotifications((current) => !current)}
          className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            emailNotifications ? "bg-indigo-600" : "bg-slate-200"
          }`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ${
              emailNotifications ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Save changes
      </button>
    </form>
  );
}
