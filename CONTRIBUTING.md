# Contributing to OnFly Image Optimization

Thank you for considering contributing to OnFly Image Optimization! We appreciate any and all contributions that help improve the project. Please take a moment to review this guide to make the contribution process smooth and consistent.

---

## Table of Contents

1. [How to Report an Issue](#how-to-report-an-issue)
2. [How to Suggest a Feature](#how-to-suggest-a-feature)
3. [Commit Message Guidelines](#commit-message-guidelines)
4. [Code Style Guidelines](#code-style-guidelines)
5. [Pull Request Process](#pull-request-process)
6. [Issue Templates](#issue-templates)

---

## How to Report an Issue

When you encounter a bug or unexpected behavior, please:

1. **Search existing issues** to see if it’s already been reported.
2. If no existing issue matches, open a new one and include:

   * **Title**: A short summary of the problem.
   * **Description**: Detailed steps to reproduce the issue.
   * **Expected vs. Actual Behavior**: What you expected to happen, and what actually happened.
   * **Environment**: OS, Node.js version, browser (if applicable).
   * **Reproduction**: Code snippet or link to a minimal repo demonstrating the issue.
   * **Screenshots** (if helpful): Visual context.

---

## How to Suggest a Feature

We welcome new ideas:

1. **Create a new issue** labeled **`enhancement`**.
2. Provide:

   * **Title**: Clear and concise feature name.
   * **Motivation**: Why is this feature needed?
   * **Proposal**: How it might work (API changes, endpoints, UI/UX).
   * **Alternatives**: Other solutions you considered.

---

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) spec:

```text
<type>(<scope>): <description>

[optional body]

[optional footer]
```

* **type**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`
* **scope**: A noun describing a section of the codebase (e.g., `api`, `config`, `middleware`).
* **description**: A short imperative statement of the change.
* **body**: More detailed explanatory text, if necessary.
* **footer**: Issue references (`Closes #123`) or breaking changes (`BREAKING CHANGE: ...`).

**Examples**:

* `feat(api): add support for AVIF image format`
* `fix(middleware): correct cache header typo`
* `docs: update README with deployment instructions`

---

## Code Style Guidelines

* **TypeScript**: Use strict typing. Avoid `any` whenever possible.
* **Linting**: Run `npm run lint` before submitting. We use **ESLint** with the Next.js and Prettier integrations.
* **Formatting**: Use **Prettier** for code formatting. Run `npm run format` to auto-format.
* **Imports**: Group imports in the following order, separated by a blank line:

  1. Node.js built-ins
  2. External packages
  3. Absolute imports (e.g., `@/components`)
  4. Relative imports
* **CSS**: Tailwind classes only; avoid custom CSS unless necessary. Keep utility classes in logical order.
* **Testing**: Write unit tests for new features or bug fixes. Run `npm run test` to ensure all tests pass.

---

## Pull Request Process

1. Fork the repository.
2. Create a new branch: `git checkout -b feat/your-feature`.
3. Commit your changes following the commit guidelines.
4. Push to your fork: `git push origin feat/your-feature`.
5. Open a Pull Request against `main` and include:

   * What and why you changed.
   * Screenshots or gifs (if UI-related).
   * Link to any related issues.
6. Address review comments. Once approved, your PR will be merged.

---

## Issue Templates

When opening a new issue, please choose one of the following templates and fill in all fields.

### 🐛 Bug Report

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment (please complete the following information):**

* OS: \[e.g. iOS]
* Node.js version: \[e.g. 16.14.0]
* Browser \[e.g. chrome, safari]

**Additional context**
Add any other context about the problem here.

---

### ✨ Feature Request

**Is your feature request related to a problem? Please describe.**
A clear and concise description of the problem.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.

---

Thank you for contributing! 🙏 We look forward to your PRs and issues. For any questions, feel free to reach out via GitHub Discussions or open an issue labeled **`question`**.
