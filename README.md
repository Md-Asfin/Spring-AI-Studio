<p align="center">
  <img src="Frontend/public/branding/spring-ai-studio-wordmark.png" alt="Spring AI Studio" width="460" />
</p>

<h1 align="center">Spring AI Studio</h1>

<p align="center">
  <strong>A professional LLM Comparison Workspace built with Spring Boot, Spring AI, and React.</strong><br>
  Compare and evaluate multiple Large Language Models side-by-side using the same prompt.
</p>

<p align="center">
  <a href="https://dev.java/"><img src="https://img.shields.io/badge/Java-21-orange.svg?logo=java" alt="Java"></a>
  <a href="https://spring.io/projects/spring-boot"><img src="https://img.shields.io/badge/Spring_Boot-3.4.3-green.svg?logo=springboot" alt="Spring Boot"></a>
  <a href="https://spring.io/projects/spring-ai"><img src="https://img.shields.io/badge/Spring_AI-1.0.0--M6-blue.svg?logo=spring" alt="Spring AI"></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-blue.svg?logo=react" alt="React"></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-6.2-yellow.svg?logo=vite" alt="Vite"></a>
</p>

---

## ✨ Features
- **Side-by-Side Comparison**: Submit a single prompt and watch OpenAI, Anthropic, and Ollama respond simultaneously.
- **Performance Benchmarking**: Automatically tracks response times and highlights the fastest model.
- **Provider Support**: Seamlessly switch between Cloud APIs (OpenAI, Claude) and Local Models (DeepSeek via Ollama).
- **Graceful Error Handling**: Intelligently catches missing API keys or offline local models with a polished UI rather than crashing.
- **Dark & Light Mode**: Native theme toggling saved via `localStorage`.

---

## 🏗️ Architecture

```mermaid
graph TD
    UI[React + Vite Frontend]
    API[Spring Boot Backend]
    Client[Spring AI ChatClient]
    
    UI -- "HTTP POST JSON" --> API
    API --> Client
    
    Client -->|API| OpenAI[OpenAI GPT-4o]
    Client -->|API| Anthropic[Anthropic Claude]
    Client -->|Local| Ollama[Ollama DeepSeek]
```

---

## 📂 Project Structure

```text
Spring-AI-Studio/
├── Backend/                 # Spring Boot Application
│   ├── src/main/java/       # Java source files (Controllers, Configurations)
│   ├── src/main/resources/  # application.properties & environment configs
│   └── pom.xml              # Maven dependencies
├── Frontend/                # React Application
│   ├── src/                 # React components (App.jsx) and assets
│   ├── public/              # Static assets (branding/spring-ai-studio-logo.png, favicon.png)
│   ├── package.json         # Node dependencies
│   └── .env.example         # Frontend environment configuration
└── README.md
```

---

## ⚙️ Prerequisites

1. **Java 21** or higher
2. **Node.js** (v18+)
3. **Maven** (optional, wrapper included)
4. **Ollama** installed locally (if testing local models like DeepSeek)
5. Provider API Keys (OpenAI / Anthropic)

---

## 🔐 Environment Configuration

### Backend Setup
In `Backend/src/main/resources/application.properties` or via system environment variables, configure your keys:
```properties
SPRING_AI_OPENAI_API_KEY=your-openai-api-key
SPRING_AI_ANTHROPIC_API_KEY=your-anthropic-api-key
```

### Frontend Setup
In `Frontend/.env`:
```env
# Point this to your backend server URL
VITE_API_BASE_URL=http://localhost:8080
```

---

## ▶️ How to Run Locally

### 1. Start the Backend
```bash
cd "Backend"
mvn clean compile
mvn spring-boot:run
```
*The Spring Boot server will start on port `8080`.*

### 2. Start the Frontend
```bash
cd "Frontend"
npm install
npm run dev
```
*The Vite dev server will start on port `5173`. Open `http://localhost:5173` in your browser.*

---

## ☁️ Deploy Frontend to Vercel

The React frontend is optimized for deployment on Vercel.

1. **Push your repository** to GitHub.
2. **Import the project** into Vercel.
3. Select the `Frontend` directory as the **Root Directory**.
4. Set the **Build Command** to `npm run build` and **Output Directory** to `dist`.
5. **Environment Variables**: Add `VITE_API_BASE_URL` pointing to your deployed Spring Boot backend URL.
6. Click **Deploy**.

> **Note**: Vercel hosts the React frontend. The Spring Boot backend must be deployed separately to a Java-compatible hosting environment (e.g., AWS Elastic Beanstalk, Heroku, Railway).

---

## 🔗 API Endpoints

The backend exposes stateless endpoints consuming JSON payloads.
- `POST /api/openai/ask`
- `POST /api/anthropic/ask`
- `POST /api/ollama/ask`

**Payload Format:**
```json
{
  "prompt": "Explain Spring Boot dependency injection"
}
```

---

## 📝 License
This project is open-source. Feel free to use, modify, and distribute.
