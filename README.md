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

3. **Configure environment**
   Create a Supabase project and add the API keys

   Copy .env.example → .env.local and fill in your Supabase URL/Key:
   ```bash 
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

### Running Locally
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
   Open http://localhost:3000 to see it in action.

# 💡 Usage

Once deployed, request any image via:

```url
https://your-deploy-url/api/optimize?url=https://your-bucket.s3.supabase.co/path/to/image.jpg&width=800
```
The middleware will:

1. Fetch the original from Supabase Storage
2. Resize & compress (using Sharp)
3. Respond with optimized image + cache headers

For full API details, see [API_REFERENCE.md](API_REFERENCE.md) 

# 📦 Deployment
Hosted on Vercel (automatic GitHub integration)

Branch: main → auto-deploy on push

> Current Deploy:
> https://your-vercel-url.vercel.app

# 🤝 Contributing
Contributions are welcome! Please read below:

0. Fork the project
0. Create your feature branch (git checkout -b feat/YourFeature)
0. Commit your changes (git commit -m 'feat: add amazing feature')
0. Push to the branch (git push origin feat/YourFeature)
0. Open a Pull Request

Check [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines on commit messages, code style, and issue templates.

# 📝 Commits & Changelog
We use Conventional Commits.
See CHANGELOG.md for a full history.

# 📄 License
Distributed under the MIT License. See [LICENSE](LICENSE) for details.

# 📬 Contact
Created by Gambhir Sharma – feel free to reach out!

* Email: gambhir786191ss@gmail[dot]com
* Twitter: [@gambhir_sharma](https://www.x.comgambhir_sharma)
* Website: https://gambhir.dev
