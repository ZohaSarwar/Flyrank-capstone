import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SettingsForm from "../SettingsForm";

describe("SettingsForm", () => {
  it("shows error states on empty submission", async () => {
    const user = userEvent.setup();

    render(<SettingsForm />);

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(screen.getByText("Display name is required.")).toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
    expect(
      screen.queryByText("Settings saved successfully."),
    ).not.toBeInTheDocument();
  });
});
