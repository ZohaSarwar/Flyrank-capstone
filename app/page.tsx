"use client";

import SettingsForm from "@/components/SettingsForm";
import type { SettingsFormValues } from "@/lib/validation/settingsSchema";

export default function HomePage() {
  const handleSave = async (values: SettingsFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Settings saved:", values);
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <SettingsForm onSubmit={handleSave} />
    </main>
  );
}
