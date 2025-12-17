# Shashwat Pandey | AI/ML Engineer Portfolio

A cutting-edge, 3D-enhanced web portfolio designed for an AI/ML Engineer. This project features a "Neural Network" aesthetic with interactive particle systems, floating vector logos, and smooth glassmorphism UI.

![Portfolio Preview](/src/app/icon.svg) *Note: Run the app to see the live 3D background.*

## 🚀 Features

### 🌌 Immersive 3D Background
-   **Neural Network Cloud**: A rotating system of interconnected nodes representing a deep learning model.
-   **Infinite Resolution Logos**: Technology stack icons (Python, TensorFlow, React, etc.) rendered as **3D Vector SVGs**. They remain razor-sharp at any zoom level.
-   **Interactive Particles**: Background elements respond to mouse movement and camera rotation.

### 💼 Portfolio Sections
-   **Experience Timeline**: Vertical glassmorphism timeline displaying work history at **BiltzenTech**, **Red Panda Games**, and **Streamly**.
-   **Project Grid**: Interactive cards showcasing key AI projects like **Recipe Generator**, **Dialogue Generator**, and **Fraud Detection**.
-   **Skills Matrix**: Categorized display of technical skills (Languages, Frameworks, Tools).
-   **Contact**: Direct email integration and social links.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **3D Rendering**: [React Three Fiber](https://r3f.docs.pmnd.rs/) & [Drei](https://github.com/pmndrs/drei)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Simple Icons](https://simpleicons.org/) (CDN)

## 🏃‍♂️ Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/portfolio.git
    cd portfolio/web
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open locally:**
    Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design Philosophy

The design is centered around **"Neural/Deep Learning"**:
-   **Dark Mode**: Deep space/void background.
-   **Neon Accents**: Cyan (#00f0ff) and Purple (#7000ff) highlights.
-   **Connectivity**: Lines connecting floating nodes symbolize neural weights and connections.

## ⚠️ Notes

-   **SVGs in 3D**: We use the `Svg` component from `@react-three/drei` to render icons as actual geometry rather than textures. This ensures zero pixelation.
-   **Optimization**: Each 3D node is wrapped in a `Suspense` boundary to handle concurrent loading of 50+ vector assets without stalling the main thread.

---
Built by [Shashwat Pandey](https://github.com/NeuralNomad081)
