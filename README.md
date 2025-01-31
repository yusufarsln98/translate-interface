# 🌍 Translate Interface

A Next.js-based translation interface with Docker support.

---

## 🚀 Getting Started

### Run the Development Server

Use one of the following commands to start the development server:

```bash
npm run dev  # Using npm
yarn dev     # Using Yarn
pnpm dev     # Using pnpm
bun dev      # Using Bun
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

You can start editing the project by modifying `app/page.tsx`. The page auto-updates as you edit the file.

---

## 🐳 Docker Installation & Setup

### 1️⃣ Build the Docker Image

```bash
# Build from the project root
docker build -t translate-interface .
```

### 2️⃣ Run the Container

```bash
# Run on port 3000
docker run -p 3000:3000 translate-interface
```

### 3️⃣ Run with Environment Variables

```bash
docker run -p 3000:3000 \
  -e GEMINI_API_KEY=your_api_key \
  translate-interface
```

### 4️⃣ Development Mode (Hot Reloading)

```bash
docker run -p 3000:3000 \
  -v ${PWD}:/app \
  translate-interface npm run dev
```

---

## ⚡ Using Docker Compose (Alternative Setup)

### `docker-compose.yml`

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}
    volumes:
      - .:/app
```

### Start the App with Docker Compose

```bash
docker-compose up
```

---

## 📜 License

This project is licensed under the MIT License.

---

### 💡 Need Help?

For any questions, feel free to open an issue or reach out!

🎉 **Happy Coding!** 🚀
