# Deployment Guide

This project is configured for **Dynamic Deployment** (Vercel recommended) to support the Chatbot feature.

> [!WARNING]
> The **Chatbot** feature requires server-side API routes. It will **NOT** work if deployed to GitHub Pages (Static Export).
> If you must use GitHub Pages, you will need to disable the Chatbot or use an external backend.

---

## 🚀 Option 1: GitHub Pages (Recommended)

Since we have already set up the workflow file (`.github/workflows/deploy.yml`), deployment is 90% automated.

### 1. Push Code to GitHub
Ensure your code is pushed to your GitHub repository (main branch).
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Configure Repository Settings
1.  Go to your GitHub Repository page.
2.  Click on **Settings** in the top navigation bar.
3.  On the left sidebar, click on **Pages**.
4.  Under **"Build and deployment"**, find the **Source** dropdown.
5.  Change it from **"Deploy from a branch"** to **"GitHub Actions"**.

### 3. Check Deployment
1.  Click on the **Actions** tab in your repository.
2.  You should see a workflow named "Deploy to GitHub Pages" running.
3.  Once green (success), click on the workflow run.
4.  Under the "deploy" job, you will see the link to your live site!

### ⚠️ IMPORTANT: Subdirectory Issue
If your repository name is **NOT** `username.github.io` (e.g., if it is `my-portfolio`), your site will be hosted at `username.github.io/my-portfolio`.

**You MUST update `next.config.ts`:**
1.  Open `web/next.config.ts`.
2.  Uncomment the `basePath` line.
3.  Replace `/repo-name` with your actual repository name (e.g., `/my-portfolio`).

```typescript
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/my-portfolio", // <--- Add this if repo is not username.github.io
};
```
4.  Push the changes.

---

## ⚡ Option 2: Vercel (Easiest)

Vercel is the creator of Next.js and offers zero-configuration deployment.

1.  Go to [Vercel.com](https://vercel.com) and Sign Up/Login.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.
4.  **Framework Preset**: It should auto-detect "Next.js".
5.  **Root Directory**: **IMPORTANT!** Click "Edit" and select the `web` folder (since your app is inside the `web` subdirectory).
6.  Click **Deploy**.

*Note: Vercel handles the build process automatically. You don't need to change `next.config.ts` for Vercel, but keeping `output: 'export'` works fine too.*
