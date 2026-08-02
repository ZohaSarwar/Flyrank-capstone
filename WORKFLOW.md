# Workflow Comparison: Vague vs. Precise Prompting

## Overview
This document compares two approaches to building a React user settings form: Round 1 (a vague, single-sentence prompt) versus Round 2 (a precise, constrained prompt with explicit verification requirements).

## 1. Diffs & Structural Comparison
* **Round 1 (Vague Prompt):** 
  * Prompt: *"Make a settings form component with validation."*
  * Result: The AI over-architected the project by generating an entire unrequested Next.js file layout (`app/`, `components/`, `lib/validation/`, and full configuration files).
  * Quality & Edge Cases: It relied on external dependencies (Zod + React Hook Form) without checking project setup, omitted accessible aria-labels, and failed to output test coverage.

* **Round 2 (Precise Prompt):** 
  * Prompt: *"Build a lightweight React settings form component in components/SettingsForm.tsx using HTML5 constraint validation and Tailwind CSS..."*
  * Result: The AI produced clean, isolated component code strictly within `components/SettingsForm.tsx` alongside targeted tests in `components/__tests__/SettingsForm.test.tsx`.
  * Quality & Edge Cases: It explicitly handled minimum character thresholds, inline HTML5 validity checks, success feedback banners, and proper ARIA field pairing.

## 2. Review Effort & Time Analysis
* **Round 1 (Vague):** Generation was fast (~10 seconds), but review and cleanup took significantly longer (~15 minutes). I had to inspect unneeded files, audit third-party library imports, and manually rewrite missing error states.
* **Round 2 (Precise):** Drafting the prompt took 2 minutes, but review and integration took under 2 minutes. End-to-end task completion was faster because the output matched project constraints on the first pass.

## 3. AI Mistakes & Lessons Learned
* **Mistake Caught:** In Round 1, the model assumed standard external validation libraries without configuring necessary schema files properly, creating potential runtime import errors.
* **Key Takeaway:** Unconstrained prompts force the AI to make wild architectural assumptions. Defining exact file targets, zero extra dependencies, and verification criteria eliminates boilerplate bloat.