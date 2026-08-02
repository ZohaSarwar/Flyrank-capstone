# FlyRank Frontend AI Capstone - Rules & Guidelines

## Tech Stack
- Framework: React / Next.js
- Styling: Tailwind CSS
- Tooling: Node.js, Git, Cursor / Claude Code

## Commit Conventions
All commits follow Conventional Commits standard:
- `feat:` for new features
- `docs:` for documentation updates
- `chore:` for setup and structural maintenance
- `fix:` for bug fixes

## Coding Standards
- Use modern ES6+ functional React components.
- Rely on Tailwind utility classes for responsive UI.
- Keep component structure clean, modular, and accessible.

## AI Collaboration Rules Learned
1. **Form Handling:** Forms must use native HTML5 constraint validation and explicit inline error banners—do not add unrequested schema validation libraries.
2. **File Scope:** AI code generation must target specific, isolated files (e.g., `components/SettingsForm.tsx`) and avoid altering top-level directory configurations unless explicitly requested.
3. **Verification First:** Every UI component request must include a corresponding unit test file in `components/__tests__/` verifying state validation before code approval.