# OnFly Image Optimization

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/gambhirsharma/OnFly-Image-Optimization)
![GitHub last commit](https://img.shields.io/github/last-commit/gambhirsharma/OnFly-Image-Optimization)
![GitHub issues](https://img.shields.io/github/issues/gambhirsharma/OnFly-Image-Optimization)
![License](https://img.shields.io/github/license/gambhirsharma/OnFly-Image-Optimization)
![Vercel](https://img.shields.io/vercel/deployment/your-vercel-project)


![image](https://github.com/user-attachments/assets/e979cc6c-b0f9-4155-9380-0f9e38da5d67)

<!--
  Replace the placeholders (e.g. YOUR-REPO, YOUR-VERCEL-URL) and remove any sections you don’t need.
-->

<!-- PROJECT BADGES: commit-activity, last-commit, issues, license, deploy -->



A **Next.js + Supabase** image-optimization service that dynamically compresses and serves your images on the fly.

Live demo: [your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)

---

## 📖 Table of Contents

1. [About](#about)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
   - [Running Locally](#running-locally)  
5. [Usage](#usage)  
6. [Deployment](#deployment)  
7. [Contributing](#contributing)  
8. [Commits & Changelog](#commits--changelog)  
9. [License](#license)  
10. [Contact](#contact)  

---

## 📌 About

This project hooks into Supabase Storage and intercepts image requests to automatically optimize (resize/compress/format-convert) images at request time. Perfect for blogs, storefronts, or any site that needs on-the-fly image performance gains.

---

## ✨ Features

- Automatic resize, compression, WebP/AVIF conversion  
- Caching with edge headers (via Vercel)  
- Supabase Storage integration (S3-compatible)  
- Zero-configuration for most use cases  
- Extensible middleware for custom processing  

---

## 🛠 Tech Stack

- **Next.js** – Server-Side Rendering & API routes  
- **TypeScript** – Static types  
- **Supabase** – Storage & Auth  
- **Tailwind CSS** – Utility-first styling  
- **Node.js** – Server runtime  

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 16  
- A Supabase project (free tier works)  

### Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/gambhirsharma/OnFly-Image-Optimization.git
   cd OnFly-Image-Optimization
   ```
   
2. **Install dependencies**
    ```bash
    npm install
    # or
    pnpm install
    ```
