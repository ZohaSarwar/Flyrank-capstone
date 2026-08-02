"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultSettingsValues,
  settingsSchema,
  themeOptions,
  type SettingsFormValues,
} from "@/lib/validation/settingsSchema";

type SettingsFormProps = {
  initialValues?: Partial<SettingsFormValues>;
  onSubmit: (values: SettingsFormValues) => void | Promise<void>;
};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="mt-1 text-sm text-red-600" role="alert">
      {message}
    </p>
  );
}

export default function SettingsForm({
  initialValues,
  onSubmit,
}: SettingsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isSubmitSuccessful },
    reset,
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { ...defaultSettingsValues, ...initialValues },
    mode: "onBlur",
  });

  const handleFormSubmit = handleSubmit(async (values) => {
    await onSubmit(values);
    reset(values);
  });

  return (
    <form
      onSubmit={handleFormSubmit}
      noValidate
      className="mx-auto w-full max-w-lg space-y-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
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
          Update your profile and preferences.
        </p>
      </header>

      <section className="space-y-4" aria-labelledby="profile-section-heading">
        <h3
          id="profile-section-heading"
          className="text-sm font-medium uppercase tracking-wide text-slate-500"
        >
          Profile
        </h3>

        <div>
          <label
            htmlFor="displayName"
            className="block text-sm font-medium text-slate-700"
          >
            Display name
          </label>
          <input
            id="displayName"
            type="text"
            autoComplete="name"
            aria-invalid={errors.displayName ? "true" : "false"}
            aria-describedby={
              errors.displayName ? "displayName-error" : undefined
            }
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            placeholder="Jane Doe"
            {...register("displayName")}
          />
          <FieldError
            id="displayName-error"
            message={errors.displayName?.message}
          />
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
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            placeholder="jane@example.com"
            {...register("email")}
          />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>

        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-slate-700"
          >
            Bio{" "}
            <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <textarea
            id="bio"
            rows={3}
            aria-invalid={errors.bio ? "true" : "false"}
            aria-describedby={errors.bio ? "bio-error" : undefined}
            className="mt-1 block w-full resize-y rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            placeholder="A short bio about you"
            {...register("bio")}
          />
          <FieldError id="bio-error" message={errors.bio?.message} />
        </div>
      </section>

      <section
        className="space-y-4"
        aria-labelledby="preferences-section-heading"
      >
        <h3
          id="preferences-section-heading"
          className="text-sm font-medium uppercase tracking-wide text-slate-500"
        >
          Preferences
        </h3>

        <div>
          <label
            htmlFor="theme"
            className="block text-sm font-medium text-slate-700"
          >
            Theme
          </label>
          <select
            id="theme"
            aria-invalid={errors.theme ? "true" : "false"}
            aria-describedby={errors.theme ? "theme-error" : undefined}
            className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            {...register("theme")}
          >
            {themeOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
          <FieldError id="theme-error" message={errors.theme?.message} />
        </div>

        <div className="flex items-start gap-3">
          <input
            id="emailNotifications"
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            {...register("emailNotifications")}
          />
          <div>
            <label
              htmlFor="emailNotifications"
              className="block text-sm font-medium text-slate-700"
            >
              Email notifications
            </label>
            <p className="text-sm text-slate-500">
              Receive updates about your account activity.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6">
        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Saving…" : "Save changes"}
        </button>

        <button
          type="button"
          disabled={isSubmitting || !isDirty}
          onClick={() => reset()}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset
        </button>

        {isSubmitSuccessful && !isDirty && (
          <p className="text-sm text-green-600" role="status">
            Settings saved successfully.
          </p>
        )}
      </div>
    </form>
  );
}
