import { z } from "zod";

export const themeOptions = ["light", "dark", "system"] as const;

export const settingsSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Display name must be at least 2 characters")
    .max(50, "Display name must be 50 characters or fewer"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  bio: z
    .string()
    .trim()
    .max(280, "Bio must be 280 characters or fewer")
    .optional()
    .or(z.literal("")),
  theme: z.enum(themeOptions, {
    required_error: "Select a theme",
  }),
  emailNotifications: z.boolean(),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;

export const defaultSettingsValues: SettingsFormValues = {
  displayName: "",
  email: "",
  bio: "",
  theme: "system",
  emailNotifications: true,
};
