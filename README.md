<p align="center">
  <img src="Frontend/public/branding/spring-ai-studio-wordmark.png" alt="Spring AI Studio Wordmark" width="480" />
</p>

<h1 align="center">🤖 Spring AI Studio</h1>

<p align="center">
  <strong>A full-stack LLM comparison and benchmarking workspace built with Spring Boot, Spring AI, and React.</strong><br>
  Submit a single prompt and evaluate real-time responses, latency metrics, and outputs from OpenAI, Anthropic Claude, and local Ollama / DeepSeek models side-by-side.
</p>

<p align="center">
  <a href="https://spring-ai-studio-psi.vercel.app/"><img src="https://img.shields.io/badge/Live%20Demo-Vercel-000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"></a>
  <a href="https://github.com/Mohammad-Asfin/Spring-AI-Studio"><img src="https://img.shields.io/badge/GitHub-Repository-181717.svg?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Java-21-ED8B00.svg?style=flat-square&logo=openjdk&logoColor=white" alt="Java 21">
  <img src="https://img.shields.io/badge/Spring%20Boot-3.4.3-6DB33F.svg?style=flat-square&logo=springboot&logoColor=white" alt="Spring Boot 3.4.3">
  <img src="https://img.shields.io/badge/Spring%20AI-1.0.0--M6-6DB33F.svg?style=flat-square&logo=spring&logoColor=white" alt="Spring AI 1.0.0-M6">
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB.svg?style=flat-square&logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/Vite-6.2.0-646CFF.svg?style=flat-square&logo=vite&logoColor=white" alt="Vite 6.2">
  <img src="https://img.shields.io/badge/OpenAI-GPT--4o-412991.svg?style=flat-square&logo=openai&logoColor=white" alt="OpenAI GPT-4o">
  <img src="https://img.shields.io/badge/Anthropic-Claude-D97757.svg?style=flat-square&logo=anthropic&logoColor=white" alt="Anthropic Claude">
  <img src="https://img.shields.io/badge/Ollama-DeepSeek-6366F1.svg?style=flat-square&logo=ollama&logoColor=white" alt="Ollama DeepSeek">
  <img src="https://img.shields.io/badge/License-Open%20Source-blue.svg?style=flat-square" alt="License">
</p>

---

## 📌 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [📖 Project Overview](#-project-overview)
- [✨ Key Features](#-key-features)
- [🏗️ System Architecture](#️-system-architecture)
- [📂 Project Structure](#-project-structure)
- [🛠️ Technology Stack](#️-technology-stack)
- [⚙️ Prerequisites](#️-prerequisites)
- [📥 Installation & Setup](#-installation--setup)
- [🔐 Environment Configuration](#-environment-configuration)
- [▶️ Running Locally](#️-running-locally)
- [🤖 AI Provider Setup](#-ai-provider-setup)
- [🔌 API Documentation](#-api-documentation)
- [📊 LLM Benchmarking & Telemetry](#-llm-benchmarking--telemetry)
- [🖥️ Frontend UI & User Experience](#️-frontend-ui--user-experience)
- [🧪 Testing & Verification](#-testing--verification)
- [☁️ Deployment Guide](#️-deployment-guide)
- [🌐 Deployment Architecture](#-deployment-architecture)
- [🔒 Security & Best Practices](#-security--best-practices)
- [🐛 Troubleshooting Guide](#-troubleshooting-guide)
- [🧩 Common Use Cases & Prompts](#-common-use-cases--prompts)
- [📈 Performance & Benchmark Notes](#-performance--benchmark-notes)
- [🔮 Future Roadmap](#-future-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🔗 Important Links](#-important-links)

---

## 🚀 Quick Start

Get the entire application running locally in under 3 minutes:

```bash
# 1. Clone the repository
git clone https://github.com/Mohammad-Asfin/Spring-AI-Studio.git
cd Spring-AI-Studio

# 2. Configure Backend Environment
# (Set your API keys or run with default fallbacks for local Ollama testing)
export SPRING_AI_OPENAI_API_KEY=your_openai_api_key
export SPRING_AI_ANTHROPIC_API_KEY=your_anthropic_api_key

# 3. Start Backend (Terminal 1)
cd Backend
mvn spring-boot:run

# 4. Start Frontend (Terminal 2)
cd ../Frontend
npm install
npm run dev
```

Open **`http://localhost:5173`** in your browser.

---

## 📖 Project Overview

### What is Spring AI Studio?
**Spring AI Studio** is an open-source, full-stack LLM evaluation and benchmarking platform. It allows engineers, researchers, and developers to input **one prompt** and concurrently broadcast it across multiple AI providers:
1. **OpenAI** (`GPT-4o` cloud model)
2. **Anthropic** (`Claude` cloud model)
3. **Ollama** (`deepseek-r1:14b` local inference engine)

### The Problem It Solves
When evaluating Large Language Models for application development, developers face several challenges:
- **Provider Fragmentation**: Different SDKs, distinct request formats, and disparate authentication protocols for every AI provider.
- **Inconsistent Quality Evaluation**: Manually copy-pasting prompts across ChatGPT, Claude, and local terminal interfaces leads to subjective and unscientific comparisons.
- **Lack of Latency Benchmarking**: Comparing cloud APIs against local self-hosted models requires accurate, concurrent latency measurements under identical network conditions.

### The Solution: Spring AI & Unified Client Architecture
Spring AI Studio leverages the **Spring AI `ChatClient` abstraction** in Spring Boot 3.4. By encapsulating different model drivers behind a unified Spring AI API, the backend provides consistent REST endpoints to the React 19 frontend. The frontend fires **parallel asynchronous requests**, tracks exact round-trip response times using high-resolution browser timers (`performance.now()`), flags the fastest responding provider with a **First Response** indicator, and calculates real-time aggregated benchmark statistics.

---

## ✨ Key Features

- **Side-by-Side LLM Comparison**: Submit a single prompt to simultaneously query OpenAI GPT-4o, Anthropic Claude, and Ollama DeepSeek.
- **Hybrid Cloud & Local Model Support**: Evaluate hosted commercial frontier models alongside self-hosted privacy-focused local models running on your own GPU/CPU.
- **Parallel Asynchronous Dispatch**: Non-blocking client-side request orchestration ensures slow or offline models never block fast responses.
- **Race-Condition-Safe First-Response Detection**: Utilizes React `useRef` tracking to reliably capture and highlight the exact first successful model (`⚡ First Response`) across concurrent execution streams.
- **High-Resolution Response Timing**: Measures execution latency for each model card down to two decimal places in seconds.
- **Aggregated Benchmark Statistics Bar**: Displays live counts for Models Tested, Successful Responses, Failed Responses, the First Responding Provider, and Average Response Time.
- **Active Running & Loading Visuals**: Features pulsing multi-dot loading indicators and active state locks to prevent duplicate submissions during execution.
- **One-Click Clipboard Copy**: Instantly copy any individual model's Markdown/text response with status feedback.
- **Graceful Error Handling & Guided Diagnostics**: Missing API keys or offline local daemons display polite, color-coded diagnostic hints instead of throwing unhandled exceptions.
- **Interactive Preset Prompt Library**: One-click prompt chips covering core engineering topics (Dependency Injection, REST vs GraphQL, Java Streams, Spring AI ChatClient).
- **Dual-Theme Engine (Dark / Light Mode)**: Seamless theme switching powered by CSS custom properties with automatic `localStorage` persistence.
- **Decoupled Architecture**: Independent Vite-powered React single-page application and Spring Boot 3.4 REST backend ready for independent horizontal scaling.

---

## 🏗️ System Architecture

### High-Level Component Architecture

```mermaid
flowchart TD
    subgraph Client["Frontend Client (React 19 + Vite 6.2)"]
        UI["Prompt Workspace & UI Components"]
        Theme["Theme Engine (Light / Dark)"]
        Benchmark["Benchmark & Telemetry Tracker"]
    end

    subgraph Server["Backend Server (Spring Boot 3.4.3 on Port 8080)"]
        C_OpenAI["OpenAIController\n/api/openai/ask"]
        C_Anthropic["AnthropicController\n/api/anthropic/ask"]
        C_Ollama["OllamaController\n/api/ollama/ask"]
        
        ChatClient["Spring AI ChatClient Layer"]
    end

    subgraph Providers["AI Provider Ecosystem"]
        P_OpenAI["OpenAI API\n(GPT-4o)"]
        P_Anthropic["Anthropic API\n(Claude)"]
        P_Ollama["Local Ollama Daemon\n(deepseek-r1:14b :11434)"]
    end

    UI -->|"Parallel HTTP POST (JSON Payload)"| C_OpenAI
    UI -->|"Parallel HTTP POST (JSON Payload)"| C_Anthropic
    UI -->|"Parallel HTTP POST (JSON Payload)"| C_Ollama

    C_OpenAI --> ChatClient
    C_Anthropic --> ChatClient
    C_Ollama --> ChatClient

    ChatClient -->|"HTTPS / v1/chat/completions"| P_OpenAI
    ChatClient -->|"HTTPS / v1/messages"| P_Anthropic
    ChatClient -->|"HTTP /api/chat (localhost)"| P_Ollama

    P_OpenAI -.->|"Text Output"| C_OpenAI
    P_Anthropic -.->|"Text Output"| C_Anthropic
    P_Ollama -.->|"Text Output"| C_Ollama

    C_OpenAI -.->|"Response + Latency"| Benchmark
    C_Anthropic -.->|"Response + Latency"| Benchmark
    C_Ollama -.->|"Response + Latency"| Benchmark
    Benchmark --> UI
```

### Request & Telemetry Data Flow Sequence

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant React as React 19 Frontend
    participant Boot as Spring Boot 3.4
    participant SpringAI as Spring AI ChatClient
    participant LLMs as LLM Providers (OpenAI, Claude, Ollama)

    User->>React: Enter Prompt & Click "Compare Models"
    Note over React: 1. Set all model cards to LOADING<br/>2. Start performance.now() timers<br/>3. Reset First Response tracker
    
    par Parallel Dispatch
        React->>Boot: POST /api/openai/ask { "prompt": "..." }
        React->>Boot: POST /api/anthropic/ask { "prompt": "..." }
        React->>Boot: POST /api/ollama/ask { "prompt": "..." }
    end

    Boot->>SpringAI: chatClient.prompt(msg).call()
    SpringAI->>LLMs: Provider-specific API Call
    
    LLMs-->>SpringAI: Return Stream / Text Content
    SpringAI-->>Boot: Return Content String / ChatResponse
    
    par Asynchronous Return
        Boot-->>React: 200 OK (OpenAI Response)
        Note over React: Calculate Latency (s)<br/>Lock First Response Ref<br/>Render OpenAI Card
    and
        Boot-->>React: 200 OK (Claude Response)
        Note over React: Calculate Latency (s)<br/>Render Claude Card
    and
        Boot-->>React: 200 OK (Ollama Response)
        Note over React: Calculate Latency (s)<br/>Render Ollama Card
    end

    Note over React: Compute Aggregated Metrics (Tested, Success, Failed, Avg Time)
    React->>User: Display Completed Side-by-Side Comparison & Stats Bar
```

---

## 📂 Project Structure

```text
Spring-AI-Studio/
├── Backend/
│   ├── .mvn/wrapper/
│   │   ├── maven-wrapper.jar
│   │   └── maven-wrapper.properties     # Maven Wrapper configuration
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/springai/studio/
│   │   │   │   ├── AnthropicController.java      # REST Controller for Anthropic Claude
│   │   │   │   ├── OllamaController.java         # REST Controller for Ollama / DeepSeek
│   │   │   │   ├── OpenAIController.java         # REST Controller for OpenAI GPT-4o
│   │   │   │   └── SpringAiStudioApplication.java# Spring Boot Main Entry Point
│   │   │   └── resources/
│   │   │       └── application.properties       # Core backend config & fallback keys
│   │   └── test/
│   │       └── java/com/springai/studio/
│   │           └── SpringAiStudioApplicationTests.java # Context loading integration tests
│   ├── .env.example                             # Backend environment variable template
│   ├── .gitignore                               # Git ignore rules for Maven & IDE files
│   ├── mvnw                                     # Linux/macOS Maven wrapper script
│   ├── mvnw.cmd                                 # Windows Maven wrapper script
│   └── pom.xml                                  # Maven dependencies (Spring Boot 3.4.3, Spring AI)
│
├── Frontend/
│   ├── public/
│   │   ├── branding/
│   │   │   ├── favicon.png                     # Application browser tab icon
│   │   │   ├── spring-ai-studio-logo.png       # High-resolution emblem logo
│   │   │   └── spring-ai-studio-wordmark.png   # Full horizontal logo wordmark
│   ├── src/
│   │   ├── assets/                             # Frontend static assets
│   │   ├── App.css                             # Complete responsive UI styles & design tokens
│   │   ├── App.jsx                             # Main workspace, state management, parallel fetch
│   │   ├── index.css                           # Base CSS resets & font bindings
│   │   └── main.jsx                            # React 19 DOM bootstrap
│   ├── .env.example                             # Frontend environment variable template
│   ├── .gitignore                               # Git ignore rules for node_modules & dist
│   ├── eslint.config.js                         # ESLint configuration rules
│   ├── index.html                               # SPA HTML template
│   ├── package.json                             # NPM scripts & dependencies (React 19, Vite 6.2)
│   ├── package-lock.json                        # Exact dependency lockfile
│   └── vite.config.js                           # Vite bundler & React plugin config
│
├── README.md                                    # Comprehensive project documentation
└── ...
```

### Key Source Files & Responsibilities

| File Path | Description / Responsibility |
| :--- | :--- |
| `Backend/.../OpenAIController.java` | Instantiates a Spring AI `ChatClient` using `OpenAiChatModel`, exposes `POST /api/openai/ask`, validates prompts, and returns OpenAI responses. |
| `Backend/.../AnthropicController.java` | Instantiates a Spring AI `ChatClient` using `AnthropicChatModel`, exposes `POST /api/anthropic/ask`, and handles Claude communication. |
| `Backend/.../OllamaController.java` | Connects to the local Ollama daemon via `OllamaChatModel`, invokes `POST /api/ollama/ask`, logs model metadata, and handles fallback errors. |
| `Backend/.../SpringAiStudioApplication.java` | Standard Spring Boot `@SpringBootApplication` bootstrap file. |
| `Backend/.../application.properties` | Defines port `8080`, environment variable placeholders for API keys, and default Ollama model parameters (`deepseek-r1:14b`). |
| `Frontend/src/App.jsx` | Orchestrates parallel asynchronous fetch dispatches, race-condition-safe first-response tracking with `useRef`, benchmark telemetry aggregation, and UI rendering. |
| `Frontend/src/App.css` | Implements glassmorphism, responsive CSS Grid layout, light/dark mode color tokens, micro-animations, loading spinners, and winner card badges. |

---

## 🛠️ Technology Stack

| Technology | Verified Version | Purpose & Rationale |
| :--- | :--- | :--- |
| **Java** | `21` (LTS) | Modern Java runtime featuring virtual threads, modern switch expressions, and long-term enterprise support. |
| **Spring Boot** | `3.4.3` | Production-ready Java backend framework providing auto-configuration, embedded Tomcat, and production metrics. |
| **Spring AI** | `1.0.0-M6` | Portable AI abstraction layer that standardizes client creation across disparate LLM provider APIs without vendor lock-in. |
| **Maven** | `3.9+` (Wrapper) | Deterministic dependency management and build automation. |
| **React** | `19.0.0` | Declarative user interface library with optimal reconciliation performance for real-time benchmark updates. |
| **Vite** | `6.2.0` | Ultra-fast next-generation frontend bundler and development server with instant HMR (Hot Module Replacement). |
| **Vanilla CSS** | Modern CSS3 | Custom design system utilizing CSS variables, CSS Grid, Flexbox, glassmorphism, and smooth transitions without Tailwind overhead. |
| **OpenAI GPT-4o** | Cloud API | Industry-standard multimodal frontier model used for reasoning, logic, and general knowledge evaluation. |
| **Anthropic Claude** | Cloud API | Frontier LLM recognized for strong coding capabilities, thoughtful safety boundaries, and nuanced analysis. |
| **Ollama** | Local Engine | Local inference runtime enabling zero-cost, private, on-device model execution without sending data to third parties. |
| **DeepSeek-R1** | `deepseek-r1:14b` | High-performance open reasoning model running locally via Ollama for edge vs cloud benchmarking. |

---

## ⚙️ Prerequisites

Before installing and running the project locally, ensure you have the following tools installed:

### Required Dependencies
- **Java Development Kit (JDK)**: Version `21` or higher ([Download JDK 21](https://www.oracle.com/java/technologies/downloads/#java21) or use [Eclipse Temurin](https://adoptium.net/temurin/releases/?version=21))
- **Node.js**: Version `18.0.0` or higher ([Download Node.js](https://nodejs.org/))
- **NPM**: Version `9.0.0` or higher (bundled with Node.js)
- **Git**: Version `2.30+` ([Download Git](https://git-scm.com/))

### Optional Dependencies (For Live AI Execution)
- **OpenAI API Key**: Required for live GPT-4o responses ([OpenAI Platform](https://platform.openai.com/api-keys))
- **Anthropic API Key**: Required for live Claude responses ([Anthropic Console](https://console.anthropic.com/))
- **Ollama**: Required for running DeepSeek locally ([Download Ollama](https://ollama.com/))

> [!NOTE]
> The backend contains fallback dummy keys by default. The application will start successfully without API keys; any model without valid credentials or an active daemon will gracefully report a diagnostic error in its UI card without crashing the server.

---

## 📥 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/Mohammad-Asfin/Spring-AI-Studio.git
cd Spring-AI-Studio
```

### 2. Configure Backend Environment
Create a `.env` file or export the required environment variables in your terminal:

```bash
# Windows (PowerShell)
$env:SPRING_AI_OPENAI_API_KEY="sk-proj-your-openai-key-here"
$env:SPRING_AI_ANTHROPIC_API_KEY="sk-ant-your-anthropic-key-here"
$env:SPRING_AI_OLLAMA_BASE_URL="http://localhost:11434"
$env:SPRING_AI_OLLAMA_MODEL="deepseek-r1:14b"

# Linux / macOS (Bash)
export SPRING_AI_OPENAI_API_KEY="sk-proj-your-openai-key-here"
export SPRING_AI_ANTHROPIC_API_KEY="sk-ant-your-anthropic-key-here"
export SPRING_AI_OLLAMA_BASE_URL="http://localhost:11434"
export SPRING_AI_OLLAMA_MODEL="deepseek-r1:14b"
```

### 3. Install Frontend Dependencies
```bash
cd Frontend
npm install
cd ..
```

---

## 🔐 Environment Configuration

### Backend Environment Variables (`Backend/.env.example`)

| Variable Name | Default / Fallback | Description | Required? |
| :--- | :--- | :--- | :--- |
| `SPRING_AI_OPENAI_API_KEY` | `dummy-openai-key` | Secret API key for OpenAI GPT-4o endpoints. | Optional (for OpenAI) |
| `SPRING_AI_ANTHROPIC_API_KEY` | `dummy-anthropic-key` | Secret API key for Anthropic Claude endpoints. | Optional (for Anthropic) |
| `SPRING_AI_OLLAMA_BASE_URL` | `http://localhost:11434` | Base HTTP URL where the local Ollama daemon is running. | Optional (for Local LLM) |
| `SPRING_AI_OLLAMA_MODEL` | `deepseek-r1:14b` | Tag name of the model installed in Ollama. | Optional (for Local LLM) |
| `server.port` | `8080` | HTTP port where the Spring Boot server listens. | Built-in |

### Frontend Environment Variables (`Frontend/.env.example`)

| Variable Name | Default Value | Description |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `http://localhost:8080` | Base URL pointing to the Spring Boot REST API. |

> [!CAUTION]
> **Security Rules:**
> 1. ❌ **Never commit `.env` files** containing live API keys to GitHub.
> 2. ❌ **Never inject secret API keys into `Frontend/.env`** (Vite embeds `VITE_` variables directly into public client JavaScript bundles).
> 3. ✅ Always maintain API keys solely inside the Spring Boot backend environment.

---

## ▶️ Running Locally

Because this project is developed on Windows, the exact step-by-step commands for Windows PowerShell / Command Prompt and Unix shells are provided below.

### Step 1: Start the Spring Boot Backend

Open your first terminal window:

```powershell
# Navigate to the Backend directory
cd "d:\Java Full Stack\Spring AI\Backend"

# Build and start the Spring Boot application
mvn spring-boot:run
```

*The backend initializes on port `8080` (`http://localhost:8080`).*

### Step 2: (Optional) Start the Ollama Daemon

If testing local inference, ensure Ollama is active in another window:

```powershell
# Start Ollama service
ollama serve

# Verify model is available (in another terminal)
ollama run deepseek-r1:14b
```

### Step 3: Start the React Frontend

Open your next terminal window:

```powershell
# Navigate to the Frontend directory
cd "d:\Java Full Stack\Spring AI\Frontend"

# Start Vite development server
npm run dev
```

*The Vite dev server initializes on port `5173`. Open **`http://localhost:5173`** in your browser.*

---

## 🤖 AI Provider Setup

### 1. OpenAI Integration
- **Model**: `GPT-4o` (configured through Spring AI OpenAI starter)
- **Authentication**: `SPRING_AI_OPENAI_API_KEY`
- **Behavior**: If the key is omitted or invalid, the backend returns an error message and the frontend card displays: `Set SPRING_AI_OPENAI_API_KEY`.

### 2. Anthropic Integration
- **Model**: `Claude 3.5 Sonnet / Claude` (configured through Spring AI Anthropic starter)
- **Authentication**: `SPRING_AI_ANTHROPIC_API_KEY`
- **Behavior**: If the key is omitted or invalid, the card displays: `Set SPRING_AI_ANTHROPIC_API_KEY`.

### 3. Ollama / DeepSeek Local Integration
- **Default Model**: `deepseek-r1:14b`
- **Base URL**: `http://localhost:11434`
- **Installation Steps**:
  1. Download and install Ollama from [ollama.com](https://ollama.com/).
  2. Pull the DeepSeek model:
     ```bash
     ollama pull deepseek-r1:14b
     ```
     *(Note: If running on systems with lower VRAM, you can also pull `deepseek-r1:8b` or `deepseek-r1:1.5b` and set `SPRING_AI_OLLAMA_MODEL=deepseek-r1:8b` in your backend properties).*
  3. Ensure Ollama is running on `http://localhost:11434`.

---

## 🔌 API Documentation

The Spring Boot backend exposes three lightweight, stateless HTTP REST endpoints. All endpoints accept a JSON payload and return plain text responses.

### Summary Table

| HTTP Method | Endpoint | Controller | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/openai/ask` | `OpenAIController` | Dispatches prompt to OpenAI `ChatClient`. |
| `POST` | `/api/anthropic/ask` | `AnthropicController` | Dispatches prompt to Anthropic `ChatClient`. |
| `POST` | `/api/ollama/ask` | `OllamaController` | Dispatches prompt to Ollama `ChatClient`. |

---

### Endpoint Specifications

#### 1. OpenAI Ask
`POST /api/openai/ask`

**Request Headers:**
```http
Content-Type: application/json
```

**Request Body:**
```json
{
  "prompt": "Explain Spring Boot dependency injection in 2 sentences."
}
```

**Response (200 OK):**
```text
Dependency injection in Spring Boot is a design pattern where the Spring IoC container automatically provides required objects (dependencies) to a class rather than the class instantiating them itself. This decouples component creation from business logic, making applications modular, maintainable, and easily testable.
```

**Error Responses:**
- `400 Bad Request`: `"Prompt cannot be empty"` (if prompt is blank or missing).
- `500 Internal Server Error`: `"Error from OpenAI: <details>"` (if API key is missing or quota is exceeded).

---

#### 2. Anthropic Ask
`POST /api/anthropic/ask`

**Request Body:**
```json
{
  "prompt": "Compare REST vs GraphQL in one sentence."
}
```

**Response (200 OK):**
```text
REST uses fixed multiple endpoints returning predetermined data structures, while GraphQL provides a single endpoint allowing clients to query exactly the fields they need.
```

---

#### 3. Ollama Ask
`POST /api/ollama/ask`

**Request Body:**
```json
{
  "prompt": "Write a Java Stream API example to filter even numbers."
}
```

**Response (200 OK):**
```text
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);
List<Integer> evens = numbers.stream()
                             .filter(n -> n % 2 == 0)
                             .toList();
```

---

### cURL Testing Example

```bash
curl -X POST http://localhost:8080/api/openai/ask \
  -H "Content-Type: application/json" \
  -d "{\"prompt\": \"Explain Spring AI ChatClient in one line.\"}"
```

---

## 📊 LLM Benchmarking & Telemetry

Spring AI Studio is engineered to measure runtime performance accurately under real-world conditions.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 BENCHMARK TELEMETRY                                    │
│  Models Tested: 3  │  Successful: 3  │  Failed: 0  │  ⚡ First Response: OpenAI  │  Avg: 1.42s  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Telemetry Mechanics
1. **Parallel Invocations**: When the user clicks **Compare Models**, `App.jsx` immediately triggers all three `fetch()` requests asynchronously without awaiting them sequentially.
2. **High-Precision Timing**: Each request captures its start time via `performance.now()` before sending the HTTP payload and computes `((performance.now() - startTime) / 1000).toFixed(2)` upon completion.
3. **Race-Condition Safety**: To determine the fastest model without race conditions across state updates, the application utilizes a React `useRef` tracker (`firstModelRef`). The first request to resolve with a `200 OK` locks the ref and tags the winning card with the **`⚡ First Response`** gold badge.
4. **Aggregate Statistics**:
   - **Models Tested**: Total models registered in the comparison matrix ($N=3$).
   - **Successful**: Count of models that returned valid text.
   - **Failed**: Count of models that returned non-200 status or network errors.
   - **Average Response Time**: Arithmetic mean of latency across all successful responses:
     $$\text{Avg Response Time} = \frac{\sum_{i=1}^{k} \text{Latency}_i}{k}$$

> [!NOTE]
> Benchmark results reflect real runtime latency influenced by network transit, token generation size, server queue times, and local hardware capacity.

---

## 🖥️ Frontend UI & User Experience

The user interface is designed with a modern glassmorphic aesthetic, subtle gradients, and focused typography:

- **Navigation Header**: Contains the official Spring AI Studio logo, project links, and an instant theme toggle.
- **Hero Area**: Features clear branding and workspace subtext.
- **Prompt Workspace**:
  - Auto-expanding textarea with validation.
  - Interactive **Example Chips** for instant prompt insertion.
  - Action buttons: **Clear / Reset** and **Compare Models**.
- **Model Comparison Grid**:
  - **OpenAI Card** (Emerald Green accent `#10a37f` / Cloud badge)
  - **Anthropic Claude Card** (Warm Terra Cotta accent `#d97757` / Cloud badge)
  - **Ollama DeepSeek Card** (Indigo accent `#6366f1` / Local badge)
- **Card States**:
  - `IDLE`: Displays prerequisite requirements (API key needed or Ollama URL needed).
  - `LOADING`: Displays a three-dot pulsing animation with provider-matching theme colors and `"Generating..."` text.
  - `SUCCESS`: Displays green completion badge, generated text, response duration (e.g., `1.24s`), and a **Copy** button.
  - `ERROR`: Displays red failure alert with actionable troubleshooting hints.
- **Winner Highlighting**: The model with the fastest successful response is outlined in a glowing golden border with an animated `⚡ First Response` badge.

---

## 🧪 Testing & Verification

### 1. Frontend Build Verification
Verify that the React production bundle compiles without syntax errors or missing dependencies:

```bash
cd Frontend
npm run build
```

**Expected Output:**
```text
✓ 30 modules transformed.
dist/index.html                   0.50 kB
dist/assets/index-*.css          12.30 kB
dist/assets/index-*.js          199.57 kB
✓ built in ~1.0s
```

### 2. Backend Build & Context Verification
Verify that the Spring Boot application and test context compile cleanly:

```bash
cd Backend
mvn test
```

### 3. Verification Distinctions

| Verification Level | Scope | Status in CI/Clean Env |
| :--- | :--- | :--- |
| **Build Tested** | Maven compile, test context load, Vite bundle creation. | ✅ Pass (100% automated) |
| **Live Provider Tested** | Live OpenAI, Anthropic, or Ollama API round-trips. | 🔑 Requires valid API keys / running local daemon |

---

## ☁️ Deployment Guide

### Frontend Deployment on Vercel
The React single-page application is deployed live at:
**`https://spring-ai-studio-psi.vercel.app/`**

To deploy your own fork to Vercel:
1. Push your repository to GitHub.
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your `Spring-AI-Studio` repository.
4. In the configuration screen:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL`: URL of your deployed Spring Boot backend (e.g. `https://api.yourdomain.com`).
6. Click **Deploy**.

---

### Backend Deployment (Java Hosting)
> [!IMPORTANT]
> Vercel is a serverless static and Node.js frontend platform. The Spring Boot backend must be deployed to a Java 21-compatible hosting provider such as:
> - **Railway** / **Render** (via Dockerfile or Maven buildpack)
> - **AWS Elastic Beanstalk** / **Amazon ECS**
> - **Self-hosted VPS / Docker Container**

**Sample Backend Dockerfile:**
```dockerfile
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

## 🌐 Deployment Architecture

```mermaid
flowchart LR
    subgraph Users["End Users"]
        Browser["User Web Browser"]
    end

    subgraph CDN["Edge CDN / Vercel"]
        VercelSPA["Vercel Edge Network\nReact 19 SPA (HTML/CSS/JS)"]
    end

    subgraph Cloud["Backend Hosting (Java 21 Environment)"]
        BootAPI["Spring Boot 3.4 Backend\n(REST API on Port 8080)"]
    end

    subgraph External["AI Providers"]
        OpenAIApi["OpenAI API"]
        AnthropicApi["Anthropic API"]
        LocalOllama["Ollama Daemon (Edge/Local)"]
    end

    Browser -->|"1. Load Static Assets (HTTPS)"| VercelSPA
    Browser -->|"2. POST /api/*/ask (HTTPS with CORS)"| BootAPI
    BootAPI -->|"3. Spring AI ChatClient"| OpenAIApi
    BootAPI -->|"3. Spring AI ChatClient"| AnthropicApi
    BootAPI -->|"3. Spring AI ChatClient"| LocalOllama
```

---

## 🔒 Security & Best Practices

- **Zero Client Credential Leakage**: API keys for OpenAI and Anthropic are never exposed to client-side JavaScript or the browser network inspector. All external AI interactions are proxied through the Spring Boot backend.
- **Environment Isolation**: Sensitive credentials are read from host environment variables or local properties files that are ignored by `.gitignore`.
- **CORS Configuration**: Controllers currently declare `@CrossOrigin("*")` to facilitate seamless local cross-port development (`5173` to `8080`). For production deployments, it is recommended to restrict allowed origins to your specific frontend domain:
  ```java
  @CrossOrigin(origins = "https://spring-ai-studio-psi.vercel.app")
  ```
- **Input Validation**: Controllers validate incoming prompt payloads to prevent empty or malformed requests from consuming upstream AI credits.

---

## 🐛 Troubleshooting Guide

| Issue | Potential Cause | Solution |
| :--- | :--- | :--- |
| **Backend fails to start (`Port 8080 already in use`)** | Another local service (Tomcat, Docker, or previous instance) is occupying port 8080. | Change `server.port=8081` in `application.properties` and update `VITE_API_BASE_URL` in frontend. |
| **OpenAI / Anthropic card displays `401 Unauthorized`** | Missing or incorrect API key. | Ensure `SPRING_AI_OPENAI_API_KEY` or `SPRING_AI_ANTHROPIC_API_KEY` is set in your environment before launching Maven. |
| **Ollama card displays `Requires Ollama` / Connection Refused** | The Ollama daemon is not running on `localhost:11434`. | Run `ollama serve` in a terminal and confirm accessibility at `http://localhost:11434`. |
| **Ollama returns model not found error** | The configured model (`deepseek-r1:14b`) has not been pulled. | Run `ollama pull deepseek-r1:14b` in your terminal. |
| **Frontend displays `Failed to fetch` / Network Error** | Backend is offline or blocked by CORS. | Verify backend is running on `http://localhost:8080` and inspect browser DevTools Network tab. |
| **Windows Maven Wrapper path error (`'C:\Users\MD' is not recognized`)** | Space in Windows user directory path. | Use `mvn spring-boot:run` directly instead of `./mvnw`. |

---

## 🧩 Common Use Cases & Prompts

Try these prompts to test how different LLMs reason, format code, and structure technical answers:

1. **Architecture & Design**:
   > *"Explain the difference between Dependency Injection and Inversion of Control in Spring Boot with a concrete code snippet."*
2. **API Comparison**:
   > *"Compare REST APIs with GraphQL across performance, over-fetching, caching, and client flexibility."*
3. **Functional Programming**:
   > *"Write a Java 21 Stream pipeline to group a list of transactions by currency and calculate the total sum for each."*
4. **Spring AI Framework**:
   > *"How does the Spring AI ChatClient abstraction simplify switching between OpenAI and Anthropic compared to raw HTTP clients?"*

---

## 📈 Performance & Benchmark Notes

When benchmarking models with Spring AI Studio, keep in mind that observed latency depends on several independent factors:

1. **Network Distance & Transit**: Physical distance between your client/backend and provider cloud servers (e.g. OpenAI US-East vs Anthropic).
2. **Provider Queue & Load**: Cloud API traffic fluctuations during peak hours.
3. **Local Hardware Capabilities**: Ollama inference speed depends directly on local GPU VRAM bandwidth and quantization levels.
4. **Output Token Volume**: Models that generate longer, more verbose explanations naturally require more time to complete.

---

## 🔮 Future Roadmap

- [ ] **Server-Sent Events (SSE) / Streaming**: Token-by-token real-time streaming using Spring AI reactive streaming endpoints.
- [ ] **Dynamic Model Selector**: Dropdown menu to switch between models (e.g. GPT-4o-mini, Claude 3.5 Haiku, Llama 3.3, Mistral).
- [ ] **Token Usage & Cost Calculator**: Display input/output token counts and calculated cost estimates per prompt.
- [ ] **Benchmark Export**: Export comparison sessions and latency metrics to JSON, CSV, or Markdown summaries.
- [ ] **Prompt History & Pinning**: Local storage history allowing users to re-run and compare historical benchmarks.

---

## 🖼️ Screenshots

<p align="center">
  <img src="Frontend/public/branding/spring-ai-studio-wordmark.png" alt="Spring AI Studio Interface" width="600" />
</p>

> *Tip: Additional interface screenshots and side-by-side benchmark recordings can be saved to `Frontend/public/branding/` and linked here.*

---

## 🤝 Contributing

Contributions are welcome! To contribute to Spring AI Studio:

1. **Fork the Repository**: Click the `Fork` button on GitHub.
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/awesome-feature
   ```
3. **Commit Your Changes**:
   ```bash
   git commit -m "feat: add token streaming support"
   ```
4. **Push to Your Branch**:
   ```bash
   git push origin feature/awesome-feature
   ```
5. **Open a Pull Request**: Submit a PR to `Mohammad-Asfin/Spring-AI-Studio` with a detailed description of your changes.

---

## 📄 License

This project is open-source and free to use for educational, research, and commercial exploration. Feel free to use, modify, and distribute with attribution.

---

## 🔗 Important Links

- **Live Application**: [https://spring-ai-studio-psi.vercel.app/](https://spring-ai-studio-psi.vercel.app/)
- **GitHub Repository**: [https://github.com/Mohammad-Asfin/Spring-AI-Studio](https://github.com/Mohammad-Asfin/Spring-AI-Studio)
- **Spring AI Documentation**: [https://docs.spring.io/spring-ai/reference/](https://docs.spring.io/spring-ai/reference/)
- **Spring Boot 3.4 Documentation**: [https://docs.spring.io/spring-boot/index.html](https://docs.spring.io/spring-boot/index.html)
- **React 19 Documentation**: [https://react.dev/](https://react.dev/)
- **Vite Documentation**: [https://vite.dev/](https://vite.dev/)
- **Ollama Documentation**: [https://ollama.com/](https://ollama.com/)
- **OpenAI API Documentation**: [https://platform.openai.com/docs/](https://platform.openai.com/docs/)
- **Anthropic API Documentation**: [https://docs.anthropic.com/](https://docs.anthropic.com/)

---

<p align="center">
  <strong>Spring AI Studio</strong> • Developed by <a href="https://github.com/Mohammad-Asfin">Mohammad Asfin</a>
</p>
