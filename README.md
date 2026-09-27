# 🚀 Spring AI Studio

![Java](https://img.shields.io/badge/Java-21-orange.svg)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4.3-green.svg)
![Spring AI](https://img.shields.io/badge/Spring_AI-1.0.0--M6-blue.svg)
![Maven](https://img.shields.io/badge/Maven-3.x-red.svg)
![React](https://img.shields.io/badge/React-19.0.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.2.0-yellow.svg)

## 📌 Overview

**Spring AI Studio** is a modern, full-stack web application designed to help you explore, evaluate, and compare multiple Large Language Models (LLMs) side-by-side. 
Built with the latest **Spring AI** framework, this studio provides a stunning unified interface to send prompts to models like OpenAI (GPT-4o), Anthropic (Claude), and Ollama (DeepSeek), instantly showing which model is fastest and providing the best response.

---

## ✨ Features

- **Side-by-Side Model Comparison**: Send a single prompt and watch three LLMs stream responses simultaneously.
- **Speed Benchmarking**: Automatically highlights the fastest model.
- **Modern UI/UX**: A gorgeous, fully responsive React interface with professional animations and clean typography.
- **Spring AI Integration**: Cleanly utilizes `ChatClient` from Spring AI `1.0.0-M6` for all LLM providers.
- **Local AI Support**: Fully integrates with Ollama for running models locally (like `deepseek-r1:14b`).

---

## 🏗️ Architecture

The application operates as a decoupled frontend and backend:
1. **Frontend**: React application built with Vite, providing a fast, interactive user interface.
2. **Backend**: Spring Boot REST API that uses Spring AI to orchestrate prompt routing and communication with various AI providers.
3. **AI Models**: Connected to external APIs (OpenAI, Anthropic) and local instances (Ollama).

---

## 📂 Project Structure

```text
Spring AI/
│
├── Backend/                    # Spring Boot Application
│   ├── src/main/java/...       # Java Source Code
│   ├── src/main/resources/     # Configuration (.properties)
│   ├── pom.xml                 # Maven dependencies
│   └── .env.example            # Example Environment Variables
│
├── Frontend/                   # React Application
│   ├── src/                    # React Components, Hooks, and Styles
│   ├── package.json            # Node.js dependencies
│   └── vite.config.js          # Vite build configuration
│
└── README.md                   # Project Documentation
```

---

## 🛠️ Technology Stack

| Layer | Technology |
| --- | --- |
| **Language** | Java 21, JavaScript |
| **Backend** | Spring Boot 3.4.3 |
| **AI Framework** | Spring AI 1.0.0-M6 |
| **Build Tool** | Maven (Backend), Vite (Frontend) |
| **Frontend** | React 19 |
| **Styling** | Vanilla CSS (Modern Custom Properties) |
| **API** | REST (POST endpoints) |
| **AI Providers**| OpenAI, Anthropic, Ollama (Local) |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Java Development Kit (JDK) 21](https://adoptium.net/)
- [Apache Maven 3.8+](https://maven.apache.org/)
- [Node.js (v18 or higher) and npm](https://nodejs.org/)
- [Ollama](https://ollama.com/) (Optional: for local deepseek evaluation)

To verify your installations:
```bash
java -version
mvn -version
node -v
npm -v
```

---

## ⚙️ Backend Setup

The backend handles API requests and securely connects to the AI providers.

1. **Navigate to the Backend directory:**
   ```bash
   cd "D:\Java Full Stack\Spring AI\Backend"
   ```

2. **Clean and Install Dependencies:**
   ```bash
   mvn clean install -DskipTests
   ```
   *This command tells Maven to download all required Java libraries (defined in `pom.xml`) and build the `.jar` package, bypassing unit tests to speed up the process.*

3. **Run the Spring Boot Application:**
   ```bash
   mvn spring-boot:run
   ```

The backend server will start on `http://localhost:8080`.

---

## 🎨 Frontend Setup

The frontend is a lightweight React client designed for speed.

1. **Navigate to the Frontend directory:**
   ```bash
   cd "D:\Java Full Stack\Spring AI\Frontend"
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
   *This command reads the `package.json` file and downloads all required JavaScript libraries (like React and Vite) into the `node_modules` folder.*

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```

The frontend application will typically be accessible at `http://localhost:5173`.

---

## 🔐 Environment Variables

The backend relies on sensitive API keys. **Never commit real API keys to GitHub.**

Create a system environment variable or create a `.env` file in the Backend directory with the following variables:

```properties
SPRING_AI_OPENAI_API_KEY=your_openai_api_key_here
SPRING_AI_ANTHROPIC_API_KEY=your_anthropic_api_key_here
SPRING_AI_OLLAMA_BASE_URL=http://localhost:11434
SPRING_AI_OLLAMA_MODEL=deepseek-r1:14b
```

A `.env.example` file has been provided in the Backend directory for reference.

---

## ▶️ How to Run

1. Clone or open the project folder `D:\Java Full Stack\Spring AI`.
2. Open a terminal and run the backend (`cd Backend && mvn spring-boot:run`).
3. Open a separate terminal and run the frontend (`cd Frontend && npm run dev`).
4. Access the studio in your browser at `http://localhost:5173`.
5. Enter a prompt and see all models compete!

---

## 🔄 Application Flow

1. **User Input:** User types a prompt in the React interface and clicks "Compare Models".
2. **HTTP Request:** The frontend makes three parallel `POST` requests to the Spring Boot backend (`/api/{model}/ask`).
3. **Backend Orchestration:** Spring AI intercepts the requests and translates them into model-specific API calls.
4. **AI Generation:** OpenAI, Anthropic, and Ollama process the prompts and return responses.
5. **UI Update:** The React app receives the responses, dynamically displays them, and highlights the model that responded fastest.

---

## 🔌 API Documentation

The backend exposes the following REST APIs. All APIs accept a JSON payload with a `prompt` key.

### 1. OpenAI Chat
- **URL**: `/api/openai/ask`
- **Method**: `POST`
- **Request Body**: `{"prompt": "Tell me a joke"}`
- **Response**: `(String) The generated response text.`
- **Errors**: `400 Bad Request` if empty, `500 Internal Server Error` on API failure.

### 2. Anthropic Chat
- **URL**: `/api/anthropic/ask`
- **Method**: `POST`
- **Request Body**: `{"prompt": "Tell me a joke"}`
- **Response**: `(String) The generated response text.`

### 3. Ollama (Local) Chat
- **URL**: `/api/ollama/ask`
- **Method**: `POST`
- **Request Body**: `{"prompt": "Tell me a joke"}`
- **Response**: `(String) The generated response text.`

---

## 🤖 Spring AI Integration

Spring AI makes it incredibly simple to integrate different AI models using a unified API interface. 

Instead of writing provider-specific code, this project utilizes the `ChatClient` builder:
```java
// Example from OpenAIController
this.chatClient = ChatClient.create(chatModel);
String response = chatClient.prompt(message).call().content();
```
This guarantees consistent behavior, easy model swapping, and clean architecture without worrying about the underlying REST templates or network connections specific to OpenAI or Anthropic.

---

## 🐛 Troubleshooting

- **CORS Errors:** Ensure your frontend is running on an authorized port (or that the backend `@CrossOrigin("*")` is correctly applied).
- **Ollama Connection Refused:** Make sure Ollama is installed and actively running on your machine on port `11434`. Pull the model first using `ollama run deepseek-r1:14b`.
- **401 Unauthorized:** Your `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` is missing or invalid. Check your environment variables.
- **Node Modules Error:** If the frontend fails to build, delete the `node_modules` folder and run `npm install` again.

---

## 🧹 Code Quality

- **Global Handling:** Exceptions are caught safely in controllers and returned as valid `500` error strings so the frontend won't crash.
- **Secure Configuration:** Hardcoded keys have been removed and replaced with standard `application.properties` property injection via ENV variables.
- **Clean Structure:** Code is neatly separated by providers (`OpenAIController`, `AnthropicController`, etc.) inside `com.springai.studio`.

---

## 👨💻 Author
Maintained and updated for optimal performance, stability, and UI aesthetics.

---

## ⭐ Future Improvements
- Add persistent conversation history (Memory) using Spring AI Chat Memory.
- Enable streaming responses via Server-Sent Events (SSE) for faster perceived load times.
- Implement a global `@RestControllerAdvice` for standardized JSON error handling.
- Expand support to include more local models and Google Vertex AI.
