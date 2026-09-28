<p align="center">
  <img src="Frontend/public/branding/spring-ai-studio-wordmark.png" alt="Spring AI Studio Wordmark" width="480" />
</p>

<h1 align="center">🤖 Spring AI Studio</h1>

<p align="center">
  <strong>A full-stack LLM comparison and benchmarking workspace built with Spring Boot, Spring AI, and React.</strong><br>
  Broadcast a single prompt to multiple frontier and local AI models concurrently, evaluate side-by-side outputs, and measure real-time latency and first-response performance.
</p>

<p align="center">
  <a href="https://spring-ai-studio-psi.vercel.app/"><img src="https://img.shields.io/badge/Live%20Frontend-Vercel-000000.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"></a>
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

## 📑 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🧠 Why Spring AI?](#-why-spring-ai)
- [🏗️ System Architecture](#️-system-architecture)
- [🔄 Request / Response Lifecycle](#-request--response-lifecycle)
- [⚡ Parallel LLM Execution & Latency Dynamics](#-parallel-llm-execution--latency-dynamics)
- [🏁 First Response Detection](#-first-response-detection)
- [📊 LLM Benchmarking & Telemetry](#-llm-benchmarking--telemetry)
- [📂 Project Structure](#-project-structure)
- [☕ Backend Architecture](#-backend-architecture)
- [🎨 Frontend Architecture](#-frontend-architecture)
- [🛠️ Technology Stack](#️-technology-stack)
- [🔌 API Documentation](#-api-documentation)
- [🔐 Environment Variables](#-environment-variables)
- [💻 Local Development Guide](#-local-development-guide)
- [🤖 AI Provider Setup](#-ai-provider-setup)
- [🚀 Backend Deployment Guide](#-backend-deployment-guide)
- [☁️ Frontend Vercel Deployment](#️-frontend-vercel-deployment)
- [🌐 End-to-End Production Wiring](#-end-to-end-production-wiring)
- [🔒 Security & Best Practices](#-security--best-practices)
- [🧪 Testing & Verification](#-testing--verification)
- [🐛 Troubleshooting Guide](#-troubleshooting-guide)
- [🧩 Common Use Cases & Prompts](#-common-use-cases--prompts)
- [📈 Performance Considerations](#-performance-considerations)
- [🗺️ Future Roadmap](#️-future-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🔗 Important Links](#-important-links)

---

## 🎯 Project Overview

### What is Spring AI Studio?
**Spring AI Studio** is a full-stack, developer-focused LLM comparison workspace and benchmarking platform. It enables engineers, AI practitioners, and architects to submit a **single prompt** and simultaneously compare outputs from frontier cloud LLMs and locally hosted open-weight models:
1. **OpenAI** (`GPT-4o` cloud model)
2. **Anthropic** (`Claude` cloud model)
3. **Ollama / DeepSeek** (`deepseek-r1:14b` local inference engine)

### Why Does This Project Exist?
Modern generative AI development requires evaluating trade-offs between model intelligence, reasoning style, response latency, operational cost, and data privacy:
- **Cloud vs. Local Trade-Offs**: Commercial APIs provide cutting-edge reasoning but introduce latency and token pricing; local self-hosted models offer zero API cost and strict data privacy but rely on local GPU/CPU compute.
- **Provider Fragmentation**: Every AI provider traditionally requires proprietary client SDKs, unique request formatting, and custom error handling.
- **Subjective vs. Empirical Benchmarking**: Manually querying multiple web portals makes side-by-side comparison tedious and unscientific.

### The Solution: A Unified Full-Stack Architecture
Spring AI Studio bridges the frontend user experience with Spring Boot backend services:

```text
React 19 (Vite)
       │
       │ HTTP POST (JSON Payload: { "prompt": "..." })
       ▼
Spring Boot 3.4 REST Controllers
       │
       ▼
Spring AI ChatClient Unified Abstraction
       │
   ┌───┴───────────────┬──────────────────────┐
   ▼                   ▼                      ▼
OpenAI API       Anthropic API          Local Ollama Daemon
(GPT-4o)            (Claude)            (deepseek-r1:14b)
   │                   │                      │
   └───────────────────┼──────────────────────┘
                       ▼
           Asynchronous Text Responses
                       │
                       ▼
   Real-Time Benchmark UI & Latency Telemetry
```

---

## ✨ Features

- **Side-by-Side Multi-LLM Evaluation**: Broadcast one prompt across OpenAI, Anthropic Claude, and local Ollama simultaneously.
- **Unified Spring AI Backend**: Clean Spring Boot 3.4 architecture utilizing the official `spring-ai-bom` (`1.0.0-M6`) with zero provider-specific boilerplate in controllers.
- **Non-Blocking Parallel Client Dispatch**: React dispatches concurrent HTTP requests; slow, queuing, or failing models never block responses from faster providers.
- **Individual Model Lifecycle States**: Every model card independently transitions through `IDLE`, `LOADING` (with provider-themed pulsing animations), `SUCCESS`, and `ERROR` states.
- **Race-Condition-Safe First Response Winner**: Uses React `useRef` to reliably capture the first successful response (`⚡ First Response`) across concurrent execution streams.
- **High-Resolution Response Timing**: Browser `performance.now()` measures elapsed time to two decimal places in seconds.
- **Live Aggregated Benchmark Statistics**: Instant header dashboard displaying:
  - *Models Tested* ($N=3$)
  - *Successful Responses*
  - *Failed Responses*
  - *First Response Provider*
  - *Average Response Time* (calculated across successful runs)
- **Actionable Diagnostic Error Handling**: Missing API keys or an offline Ollama daemon render helpful diagnostic badges (e.g. `Set SPRING_AI_OPENAI_API_KEY` or `Run on http://localhost:11434`) instead of crashing.
- **One-Click Markdown/Text Copying**: Quick clipboard export on all generated model cards with visual confirmation.
- **Curated Prompt Preset Library**: Pre-configured chips for instant testing of technical concepts (Dependency Injection, REST vs GraphQL, Java Streams, Spring AI).
- **Dual-Theme Engine**: Native Light and Dark modes built with CSS custom properties and persisted in `localStorage`.
- **Decoupled Deployment Architecture**: React single-page frontend ready for Vercel edge CDN and Spring Boot backend ready for JVM container platforms (Railway, Render, AWS).

---

## 🧠 Why Spring AI?

Prior to [Spring AI](https://docs.spring.io/spring-ai/reference/), integrating multiple LLM providers in Java applications required adding disparate third-party libraries, managing inconsistent API client specifications, and manually transforming request/response POJOs for each vendor.

### 1. Portable AI Abstraction Layer
Spring AI introduces a standardized abstraction over artificial intelligence models, similar to how Spring Data abstracts relational and NoSQL databases. The core abstraction is the **`ChatClient`** and **`ChatModel`** interface.

```java
// Common unified pattern across OpenAI, Anthropic, and Ollama
String response = chatClient.prompt(userPrompt)
                            .call()
                            .content();
```

### 2. Elimination of Provider Lock-In
Whether connecting to OpenAI, Anthropic, or an on-premise Ollama instance, the business logic remains uniform. Switching or adding new AI models (e.g. Mistral, Google Gemini, Amazon Bedrock) requires minimal configuration changes rather than refactoring the codebase.

### 3. Declarative Auto-Configuration
Spring AI starter dependencies (`spring-ai-openai-spring-boot-starter`, `spring-ai-anthropic-spring-boot-starter`, `spring-ai-ollama-spring-boot-starter`) automatically wire API credentials, base URLs, and HTTP client pooling via standard Spring Boot `application.properties`.

---

## 🏗️ System Architecture

### High-Level Architecture Diagram

```mermaid
flowchart TD
    subgraph Client["Frontend Client (React 19 + Vite 6.2)"]
        UI["Prompt Workspace & Interactive UI"]
        Theme["Theme Engine (Light / Dark)"]
        Tracker["Latency & First-Response Telemetry Engine"]
    end

    subgraph Server["Spring Boot 3.4.3 REST Backend (Port 8080)"]
        OpenAICtrl["OpenAIController\nPOST /api/openai/ask"]
        AnthropicCtrl["AnthropicController\nPOST /api/anthropic/ask"]
        OllamaCtrl["OllamaController\nPOST /api/ollama/ask"]
        
        ChatClientLayer["Spring AI ChatClient Layer"]
    end

    subgraph External["AI Providers & Local Daemons"]
        OpenAISvc["OpenAI API\n(GPT-4o)"]
        AnthropicSvc["Anthropic API\n(Claude)"]
        OllamaDaemon["Local Ollama Daemon\n(deepseek-r1:14b on :11434)"]
    end

    UI -->|"Parallel HTTP POST { prompt }"| OpenAICtrl
    UI -->|"Parallel HTTP POST { prompt }"| AnthropicCtrl
    UI -->|"Parallel HTTP POST { prompt }"| OllamaCtrl

    OpenAICtrl --> ChatClientLayer
    AnthropicCtrl --> ChatClientLayer
    OllamaCtrl --> ChatClientLayer

    ChatClientLayer -->|"HTTPS API Call"| OpenAISvc
    ChatClientLayer -->|"HTTPS API Call"| AnthropicSvc
    ChatClientLayer -->|"HTTP localhost:11434"| OllamaDaemon

    OpenAISvc -.->|"Generated Text"| OpenAICtrl
    AnthropicSvc -.->|"Generated Text"| AnthropicCtrl
    OllamaDaemon -.->|"Generated Text"| OllamaCtrl

    OpenAICtrl -.->|"Text + Latency"| Tracker
    AnthropicCtrl -.->|"Text + Latency"| Tracker
    OllamaCtrl -.->|"Text + Latency"| Tracker
    Tracker --> UI
```

### Architectural Layers Explained

1. **Presentation Layer (React 19 + Vite 6.2)**: Handles user interaction, theme switching, prompt validation, concurrent network orchestration, and real-time benchmark calculations.
2. **API & Routing Layer (Spring Boot Web)**: Exposes stateless REST endpoints mapped under `/api/*`, accepts JSON payloads, and handles HTTP status codes.
3. **AI Orchestration Layer (Spring AI 1.0.0-M6)**: Uses `ChatClient.create(chatModel)` to inject provider-specific drivers (`OpenAiChatModel`, `AnthropicChatModel`, `OllamaChatModel`) into unified execution pipelines.
4. **Inference Layer**:
   - **OpenAI / Anthropic**: External cloud infrastructure over secure HTTPS.
   - **Ollama**: Self-hosted local daemon running on `http://localhost:11434`.

---

## 🔄 Request / Response Lifecycle

The following sequence illustrates the complete end-to-end lifecycle of a comparison request:

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant React as React 19 Frontend
    participant Boot as Spring Boot 3.4
    participant SpringAI as Spring AI ChatClient
    participant Providers as AI Providers (OpenAI, Claude, Ollama)

    User->>React: Enters prompt and clicks "Compare Models"
    Note over React: 1. Set all cards to LOADING<br/>2. Start performance.now() timers<br/>3. Reset firstModelRef = null
    
    par Parallel HTTP Requests
        React->>Boot: POST /api/openai/ask { "prompt": "..." }
        React->>Boot: POST /api/anthropic/ask { "prompt": "..." }
        React->>Boot: POST /api/ollama/ask { "prompt": "..." }
    end

    Boot->>SpringAI: chatClient.prompt(prompt).call()
    SpringAI->>Providers: Execute provider-specific HTTP call
    
    Providers-->>SpringAI: Return raw model text response
    SpringAI-->>Boot: Extract content string / ChatResponse
    
    par Independent Asynchronous Responses
        Boot-->>React: 200 OK (OpenAI Response Body)
        Note over React: 1. Calculate OpenAI elapsed time<br/>2. Check firstModelRef: Lock OpenAI as ⚡ First Response<br/>3. Transition OpenAI card to SUCCESS
    and
        Boot-->>React: 200 OK (Claude Response Body)
        Note over React: 1. Calculate Claude elapsed time<br/>2. firstModelRef already locked (skip)<br/>3. Transition Claude card to SUCCESS
    and
        Boot-->>React: 200 OK (Ollama Response Body)
        Note over React: 1. Calculate Ollama elapsed time<br/>2. Transition Ollama card to SUCCESS
    end

    Note over React: Compute aggregate benchmark metrics (Tested: 3, Success: 3, Failed: 0, Avg Time: ~1.45s)
    React->>User: Render side-by-side cards with latency metrics and gold winner badge
```

### Detailed Step-by-Step Flow:
1. **User Submission**: The user enters a prompt or clicks an example chip and clicks **Compare Models**.
2. **Frontend Initialization**:
   - Resets the `firstModelRef` to `null`.
   - Transitions all three model cards into the `loading` state.
   - Captures execution timestamps via `performance.now()`.
3. **Parallel Dispatch**: The browser fires three independent asynchronous `fetch()` requests without awaiting one before initiating the next.
4. **Backend Ingestion**: Spring Boot `@RestController` classes receive the JSON payload `{"prompt": "..."}` and validate that the string is non-empty.
5. **Spring AI Invocation**: The controller invokes `chatClient.prompt(message).call().content()`.
6. **Inference**: Each provider executes prompt tokenization, inference generation, and returns the response.
7. **Backend Response**: The controller returns a `200 OK` containing the raw string response, or catches exceptions and returns an HTTP `500` error message.
8. **Client Telemetry & Resolution**: As each response resolves independently:
   - Elapsed latency is computed: `((performance.now() - startTime) / 1000).toFixed(2)`.
   - If the response succeeded and `firstModelRef.current === null`, the current model is permanently recorded as the first responder for this run.
   - The corresponding model card renders the generated text and latency.
9. **Benchmark Bar Computation**: Derived metrics (total models, success count, failure count, average time, winner) are calculated and displayed.

---

## ⚡ Parallel LLM Execution & Latency Dynamics

Spring AI Studio intentionally dispatches model requests **in parallel** rather than sequentially:

```text
Sequential Execution (Slow):
[ Prompt ] ──> [ OpenAI (1.8s) ] ──> [ Anthropic (2.4s) ] ──> [ Ollama (3.7s) ] ──> Total: 7.9s

Parallel Execution (Spring AI Studio):
             ┌──> [ OpenAI (1.8s) ]    ──> Resolves in 1.8s ──┐
[ Prompt ] ──┼──> [ Anthropic (2.4s) ] ──> Resolves in 2.4s ──┼──> Benchmark Completed in 3.7s
             └──> [ Ollama (3.7s) ]    ──> Resolves in 3.7s ──┘
```

### What Affects Model Latency?
The application measures real runtime latency. Observed times will vary based on:
- **Network Round-Trip Latency**: Physical geographic distance to cloud provider datacenters.
- **Provider API Queueing**: Cloud load during high-traffic periods.
- **Local Compute Hardware**: For Ollama, CPU vs GPU VRAM bandwidth and quantization levels.
- **Output Token Count**: Longer, more verbose explanations naturally take longer to stream and complete.

---

## 🏁 First Response Detection

Determining which model responds first in a concurrent browser environment requires avoiding **React stale state closures** and **race conditions**.

### Implementation Mechanics
In [Frontend/src/App.jsx](file:///d:/Java%20Full%20Stack/Spring%20AI/Frontend/src/App.jsx):
```javascript
// 1. Ref ensures an immutable synchronous reference across concurrent async callbacks
const firstModelRef = useRef(null);
const [firstModel, setFirstModel] = useState(null);

// 2. In parallel callback handler:
fetchModelResponse(model.id, prompt).then(result => {
  const finalStatus = result.error ? 'error' : 'success';

  // 3. Atomically lock the first SUCCESSFUL responder
  if (finalStatus === 'success' && firstModelRef.current === null) {
    firstModelRef.current = model.id;
    setFirstModel(model.id);
  }
  
  // Update individual card state
  setResponses(prev => ({ ...prev, [model.id]: { ... } }));
});
```

### Core Rules of First-Response Tracking:
- **Failed Requests Do Not Win**: If a provider fails immediately with a `401 Unauthorized` or network failure, it is ignored by the first-response tracker.
- **Set Exactly Once**: Once `firstModelRef.current` is set, subsequent successful responses cannot overwrite the winner for that prompt submission.
- **Visual Distinction**: The winning card receives the gold `.card-first` border styling and the `⚡ First Response` badge.

---

## 📊 LLM Benchmarking & Telemetry

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 BENCHMARK TELEMETRY                                    │
│  Models Tested: 3  │  Successful: 3  │  Failed: 0  │  ⚡ First Response: OpenAI  │  Avg: 1.42s  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

The benchmark dashboard derives statistics dynamically from the state of all three model cards:

1. **Models Tested**: Count of registered models in the matrix ($N=3$).
2. **Successful Models**: Count of cards with `status === 'success'`.
3. **Failed Models**: Count of cards with `status === 'error'` (hidden if 0).
4. **First Response**: Provider name associated with `firstModel` state.
5. **Average Response Time**: Arithmetic mean of response times across **successful responses only**:
   $$\text{Avg Response Time} = \frac{\sum_{i=1}^{k} \text{Latency}_i}{k} \quad (\text{where } k = \text{Successful Models})$$
   *Note: Failed models are excluded from the average calculation so unconfigured keys or offline daemons do not skew latency metrics.*

---

## 📂 Project Structure

```text
Spring-AI-Studio/
├── Backend/
│   ├── .mvn/wrapper/
│   │   ├── maven-wrapper.jar
│   │   └── maven-wrapper.properties     # Maven wrapper configuration
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/springai/studio/
│   │   │   │   ├── AnthropicController.java      # REST Controller for Anthropic Claude
│   │   │   │   ├── OllamaController.java         # REST Controller for Ollama / DeepSeek
│   │   │   │   ├── OpenAIController.java         # REST Controller for OpenAI GPT-4o
│   │   │   │   └── SpringAiStudioApplication.java# Spring Boot Bootstrap Entry Point
│   │   │   └── resources/
│   │   │       └── application.properties       # Port, API key fallbacks, Ollama model config
│   │   └── test/
│   │       └── java/com/springai/studio/
│   │           └── SpringAiStudioApplicationTests.java # Context loading integration tests
│   ├── .env.example                             # Backend environment variable template
│   ├── .gitignore                               # Git ignore rules for Maven & IDE files
│   ├── mvnw                                     # Unix Maven wrapper script
│   ├── mvnw.cmd                                 # Windows Maven wrapper script
│   └── pom.xml                                  # Maven dependencies (Spring Boot 3.4.3, Spring AI)
│
├── Frontend/
│   ├── public/
│   │   ├── branding/
│   │   │   ├── favicon.png                     # Browser tab icon
│   │   │   ├── spring-ai-studio-logo.png       # High-resolution branding logo
│   │   │   └── spring-ai-studio-wordmark.png   # Full horizontal logo wordmark
│   ├── src/
│   │   ├── assets/                             # Frontend static assets
│   │   ├── App.css                             # Complete UI stylesheet, themes & responsive grid
│   │   ├── App.jsx                             # Main workspace, state orchestration & parallel fetch
│   │   ├── index.css                           # CSS reset & typography rules
│   │   └── main.jsx                            # React 19 DOM root bootstrap
│   ├── .env.example                             # Frontend environment variable template
│   ├── .gitignore                               # Git ignore rules for node_modules & dist
│   ├── eslint.config.js                         # ESLint configuration
│   ├── index.html                               # HTML5 entry page
│   ├── package.json                             # React 19, Vite 6.2 dependencies & scripts
│   ├── package-lock.json                        # Exact NPM lockfile
│   └── vite.config.js                           # Vite build configuration with React plugin
│
├── README.md                                    # Complete project documentation
└── ...
```

---

## ☕ Backend Architecture

The backend is built as a modular Spring Boot 3.4.3 application in package `com.springai.studio`.

```text
Spring Boot Application Context
│
├── OpenAIController.java
│   └── Injects: OpenAiChatModel ──> Creates: ChatClient
│       └── Endpoint: POST /api/openai/ask
│
├── AnthropicController.java
│   └── Injects: AnthropicChatModel ──> Creates: ChatClient
│       └── Endpoint: POST /api/anthropic/ask
│
└── OllamaController.java
    └── Injects: OllamaChatModel ──> Creates: ChatClient
        └── Endpoint: POST /api/ollama/ask
```

### Controller Responsibilities

#### 1. `OpenAIController.java`
- **Path**: `Backend/src/main/java/com/springai/studio/OpenAIController.java`
- **Annotations**: `@RestController`, `@RequestMapping("/api/openai")`, `@CrossOrigin("*")`
- **Constructor Injection**: Takes `OpenAiChatModel` and creates a local `ChatClient`.
- **Method**: `POST /api/openai/ask`
- **Logic**: Validates prompt presence, calls `chatClient.prompt(message).call().content()`, and returns the string response or an error.

#### 2. `AnthropicController.java`
- **Path**: `Backend/src/main/java/com/springai/studio/AnthropicController.java`
- **Annotations**: `@RestController`, `@RequestMapping("/api/anthropic")`, `@CrossOrigin("*")`
- **Constructor Injection**: Takes `AnthropicChatModel` and creates a local `ChatClient`.
- **Method**: `POST /api/anthropic/ask`
- **Logic**: Handles prompt execution for Claude and returns response text.

#### 3. `OllamaController.java`
- **Path**: `Backend/src/main/java/com/springai/studio/OllamaController.java`
- **Annotations**: `@RestController`, `@RequestMapping("/api/ollama")`, `@CrossOrigin("*")`
- **Constructor Injection**: Takes `OllamaChatModel` and creates a local `ChatClient`.
- **Method**: `POST /api/ollama/ask`
- **Logic**: Dispatches prompt to local Ollama daemon, logs model metadata via SLF4J, extracts generated text from `chatResponse.getResult().getOutput().getText()`, and handles connection errors.

---

## 🎨 Frontend Architecture

The frontend is a lightweight Single-Page Application (SPA) built with React 19 and Vite.

### Key Components & State Structure

- **`prompt` (`string`)**: Controlled state bound to the main textarea.
- **`theme` (`'light' | 'dark'`)**: Synchronized with `document.documentElement[data-theme]` and persisted in `localStorage`.
- **`responses` (`object`)**: State map holding each model's progress:
  ```json
  {
    "status": "idle | loading | success | error",
    "data": "Generated text response...",
    "error": "Error message if failed",
    "reqMsg": "Diagnostic hint if failed",
    "time": "1.82"
  }
  ```
- **`firstModelRef` (`useRef`)**: Immediate synchronous lock preventing race conditions in first-response calculation.
- **`firstModel` (`string | null`)**: Re-renders UI to attach the winner badge and golden border.

---

## 🛠️ Technology Stack

| Technology | Verified Version | Layer / Purpose | Rationale |
| :--- | :--- | :--- | :--- |
| **Java** | `21` (LTS) | Backend Runtime | LTS release with virtual threads and modern switch syntax. |
| **Spring Boot** | `3.4.3` | Backend Framework | Robust, enterprise-grade REST architecture with auto-configuration. |
| **Spring AI** | `1.0.0-M6` | AI Abstraction | Unified ChatClient interface eliminating vendor lock-in. |
| **Maven** | `3.9+` (Wrapper) | Build Automation | Deterministic dependency resolution and reproducible builds. |
| **React** | `19.0.0` | UI Library | Declarative UI rendering with optimal reconciliation performance. |
| **Vite** | `6.2.0` | Frontend Bundler | Instant HMR and optimized production ES-module bundling. |
| **Vanilla CSS** | Modern CSS3 | Styling Engine | Custom design tokens, glassmorphism, responsive grid without Tailwind bloat. |
| **OpenAI GPT-4o** | Cloud API | AI Model | Multimodal flagship reasoning model. |
| **Anthropic Claude** | Cloud API | AI Model | Frontier model renowned for nuanced writing and code analysis. |
| **Ollama** | Local Engine | Inference Engine | Zero-cost, privacy-first local LLM execution. |
| **DeepSeek-R1** | `deepseek-r1:14b` | AI Model | Open-weights reasoning model running on local hardware. |

---

## 🔌 API Documentation

All backend endpoints are stateless HTTP POST handlers accepting JSON payloads and returning plain text strings.

### Endpoints Overview

| HTTP Method | Endpoint | Controller | Request Body | Response Body |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/openai/ask` | `OpenAIController` | `{"prompt": "<string>"}` | Plain text string |
| `POST` | `/api/anthropic/ask` | `AnthropicController` | `{"prompt": "<string>"}` | Plain text string |
| `POST` | `/api/ollama/ask` | `OllamaController` | `{"prompt": "<string>"}` | Plain text string |

---

### Endpoint Details

#### 1. OpenAI Endpoint
- **URL**: `POST /api/openai/ask`
- **Request Headers**: `Content-Type: application/json`
- **Request Payload**:
  ```json
  {
    "prompt": "Explain dependency injection in Spring Boot"
  }
  ```
- **Success Response (200 OK)**:
  ```text
  Dependency injection in Spring Boot is a pattern where the Spring IoC container provides required dependencies to classes at runtime, decoupling component creation from business logic.
  ```
- **Error Responses**:
  - `400 Bad Request`: `"Prompt cannot be empty"`
  - `500 Internal Server Error`: `"Error from OpenAI: 401 Unauthorized / Invalid API Key"`

#### 2. Anthropic Endpoint
- **URL**: `POST /api/anthropic/ask`
- **Request Payload**:
  ```json
  {
    "prompt": "Compare REST vs GraphQL"
  }
  ```
- **Success Response (200 OK)**:
  ```text
  REST uses fixed endpoints and standard HTTP methods, whereas GraphQL allows clients to request exact fields from a single endpoint.
  ```

#### 3. Ollama Endpoint
- **URL**: `POST /api/ollama/ask`
- **Request Payload**:
  ```json
  {
    "prompt": "Write a Java Stream example"
  }
  ```
- **Success Response (200 OK)**:
  ```text
  List<Integer> evens = numbers.stream().filter(n -> n % 2 == 0).toList();
  ```
- **Error Responses**:
  - `500 Internal Server Error`: `"Error from Ollama: Connection refused"`

---

## 🔐 Environment Variables

### Backend Environment Variables (`Backend/.env.example`)

| Variable Name | Default / Fallback | Description | Required? |
| :--- | :--- | :--- | :--- |
| `SPRING_AI_OPENAI_API_KEY` | `dummy-openai-key` | OpenAI API Secret Key (`sk-...`). | Optional (for OpenAI) |
| `SPRING_AI_ANTHROPIC_API_KEY` | `dummy-anthropic-key` | Anthropic API Secret Key (`sk-ant-...`). | Optional (for Anthropic) |
| `SPRING_AI_OLLAMA_BASE_URL` | `http://localhost:11434` | Ollama daemon base URL. | Optional (for Local LLM) |
| `SPRING_AI_OLLAMA_MODEL` | `deepseek-r1:14b` | Tag name of the installed Ollama model. | Optional (for Local LLM) |
| `server.port` | `8080` | Spring Boot HTTP listening port. | Built-in |

### Frontend Environment Variables (`Frontend/.env.example`)

| Variable Name | Local Development Value | Production Example | Description |
| :--- | :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `http://localhost:8080` | `https://api.yourdomain.com` | Base URL pointing to the Spring Boot REST API. |

> [!WARNING]
> In production deployments, `VITE_API_BASE_URL` in the frontend must point to your deployed backend domain (e.g. `https://spring-ai-backend.railway.app`). Never leave it as `http://localhost:8080` in production!

---

## 💻 Local Development Guide

Follow these exact commands for Windows PowerShell or Unix terminals:

### Step 1: Clone the Repository
```bash
git clone https://github.com/Mohammad-Asfin/Spring-AI-Studio.git
cd Spring-AI-Studio
```

### Step 2: Configure Environment Variables
```powershell
# Windows (PowerShell)
$env:SPRING_AI_OPENAI_API_KEY="sk-your-openai-api-key"
$env:SPRING_AI_ANTHROPIC_API_KEY="sk-ant-your-anthropic-api-key"

# Linux / macOS (Bash)
export SPRING_AI_OPENAI_API_KEY="sk-your-openai-api-key"
export SPRING_AI_ANTHROPIC_API_KEY="sk-ant-your-anthropic-api-key"
```

### Step 3: Run the Spring Boot Backend (Terminal 1)
```powershell
# Navigate to Backend
cd "d:\Java Full Stack\Spring AI\Backend"

# Start Spring Boot application
mvn spring-boot:run
```
*Backend initializes on `http://localhost:8080`.*

### Step 4: Run the React Frontend (Terminal 2)
```powershell
# Navigate to Frontend
cd "d:\Java Full Stack\Spring AI\Frontend"

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
*Frontend initializes on `http://localhost:5173`.*

---

## 🤖 AI Provider Setup

### 1. OpenAI Setup
1. Obtain an API key from [platform.openai.com/api-keys](https://platform.openai.com/api-keys).
2. Set the environment variable `SPRING_AI_OPENAI_API_KEY`.
3. If omitted, the backend falls back to `dummy-openai-key` to allow Spring context loading; the UI card will display diagnostic guidance.

### 2. Anthropic Claude Setup
1. Obtain an API key from [console.anthropic.com](https://console.anthropic.com/).
2. Set the environment variable `SPRING_AI_ANTHROPIC_API_KEY`.
3. Missing keys display an actionable card error.

### 3. Ollama / DeepSeek Local Setup
1. Download and install Ollama from [ollama.com](https://ollama.com/).
2. Pull the configured model in your terminal:
   ```bash
   ollama pull deepseek-r1:14b
   ```
3. Start the Ollama daemon:
   ```bash
   ollama serve
   ```
4. Verify accessibility at `http://localhost:11434`.

---

## 🚀 Backend Deployment Guide

> [!IMPORTANT]
> **Understanding the Deployment Architecture**:
> - **Frontend**: The React application is deployed to **Vercel** (`https://spring-ai-studio-psi.vercel.app/`).
> - **Backend**: Spring Boot is a Java 21 application that requires a JVM-capable runtime (e.g., Railway, Render, AWS, Docker).
>
> *Note: The sections below describe recommended production deployment workflows.*

```text
┌─────────────────────────┐          HTTPS API Requests          ┌───────────────────────────┐
│     Vercel Edge CDN     │ ───────────────────────────────────> │     Railway / Render      │
│  React 19 Frontend SPA  │                                      │  Spring Boot 3.4 Backend  │
│                         │ <─────────────────────────────────── │                           │
└─────────────────────────┘          JSON Response Payload       └───────────────────────────┘
```

### Recommended Option A: Deploying on Railway (GitHub-Based)
[Railway](https://railway.com/) natively detects and builds Spring Boot applications from GitHub repositories.

1. Create an account on [Railway.app](https://railway.app/).
2. Click **New Project** → **Deploy from GitHub repo**.
3. Select `Mohammad-Asfin/Spring-AI-Studio`.
4. In Project Settings:
   - **Root Directory**: Set to `Backend`.
   - **Build Command**: Leave default or `mvn clean package -DskipTests`.
   - **Start Command**: `java -jar target/*.jar`.
5. Under **Variables**, add:
   - `SPRING_AI_OPENAI_API_KEY`: Your production OpenAI key.
   - `SPRING_AI_ANTHROPIC_API_KEY`: Your production Anthropic key.
   - `PORT`: `8080`.
6. Under **Networking**, click **Generate Public Domain** (e.g. `https://spring-ai-backend.up.railway.app`).
7. Copy this URL for frontend configuration.

---

### Recommended Option B: Container Deployment via Docker

*(Recommended Future Improvement: Add a `Dockerfile` to the `Backend/` directory)*

**Sample `Backend/Dockerfile`:**
```dockerfile
# Stage 1: Build JAR using Maven and JDK 21
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
COPY .mvn ./.mvn
COPY mvnw .
RUN ./mvnw clean package -DskipTests

# Stage 2: Minimal JRE Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENV PORT=8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

## ☁️ Frontend Vercel Deployment

The React single-page application is deployed live at:
**`https://spring-ai-studio-psi.vercel.app/`**

### Steps to Deploy Frontend to Vercel:
1. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
2. Select your `Spring-AI-Studio` GitHub repository.
3. Configure Project Settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_BASE_URL`: The public URL of your deployed backend (e.g. `https://spring-ai-backend.up.railway.app`).
5. Click **Deploy**.

---

## 🌐 End-to-End Production Wiring

To connect the deployed frontend with the deployed backend:

1. **Deploy Backend**: Deploy Spring Boot on Railway or Render and obtain the public HTTPS URL.
2. **Update Frontend Environment Variable**: In Vercel Project Settings → Environment Variables, set:
   ```env
   VITE_API_BASE_URL=https://your-deployed-backend-url.com
   ```
3. **Trigger Vercel Redeploy**: Redeploy the frontend so Vite compiles the updated API base URL into the bundle.
4. **Configure CORS**: Ensure the backend allows requests from your Vercel domain.

---

## 🔒 Security & Best Practices

### Current Implementation vs. Production Recommendations

| Security Aspect | Current Codebase Implementation | Recommended Production Hardening |
| :--- | :--- | :--- |
| **API Key Isolation** | ✅ Keys stored in backend environment variables only. Zero keys in client bundles. | Use cloud secret managers (AWS Secrets Manager, Railway Secrets). |
| **CORS Policy** | ⚠️ `@CrossOrigin("*")` on all controllers for seamless local multi-port development. | Restrict origins: `@CrossOrigin(origins = "https://spring-ai-studio-psi.vercel.app")`. |
| **Error Masking** | Returns `e.getMessage()` for debugging. | Sanitize internal stack traces before returning HTTP 500 to clients. |
| **Transport Security** | HTTP on `localhost`. | Enforce HTTPS via TLS termination at the edge/load balancer. |

---

## 🧪 Testing & Verification

### 1. Build Verification

#### Frontend Build
```bash
cd Frontend
npm run build
```
*Expected: `✓ built in ~1.0s` producing `dist/` bundle.*

#### Backend Build & Unit Tests
```bash
cd Backend
mvn test
```
*Expected: `BUILD SUCCESS` with context loading verified.*

### 2. Live API Provider Verification

| Level | Scope | Status in CI / Clean Environment |
| :--- | :--- | :--- |
| **Build Tested** | Maven compile, test context load, Vite bundle compilation. | ✅ Verified (100% automated passing) |
| **Live Provider Tested** | Live OpenAI, Anthropic, or Ollama round-trips. | 🔑 Requires valid live API keys & local daemon |

---

## 🐛 Troubleshooting Guide

| Symptom | Probable Cause | Diagnostic & Solution |
| :--- | :--- | :--- |
| **Backend fails on startup (`Port 8080 already in use`)** | Another process is occupying port 8080. | Change `server.port=8081` in `application.properties` and update `VITE_API_BASE_URL=http://localhost:8081`. |
| **OpenAI card displays `Failed` / `401 Unauthorized`** | Missing or expired OpenAI API key. | Set `SPRING_AI_OPENAI_API_KEY="sk-..."` in environment before starting the backend. |
| **Anthropic card displays `Failed`** | Missing or invalid Anthropic API key. | Set `SPRING_AI_ANTHROPIC_API_KEY="sk-ant-..."` in environment. |
| **Ollama card displays `Requires Ollama`** | Ollama daemon is not running on port 11434. | Open terminal, run `ollama serve`, and verify `http://localhost:11434`. |
| **Ollama returns `model not found`** | The `deepseek-r1:14b` model has not been downloaded. | Run `ollama pull deepseek-r1:14b` in terminal. |
| **Frontend displays `Failed to fetch` / Network Error** | Backend is offline or blocked by CORS. | Ensure backend is active on `8080` and check browser DevTools Network tab. |
| **Windows Maven Wrapper error (`'C:\Users\MD' is not recognized`)** | Space in Windows user folder path. | Run `mvn spring-boot:run` directly instead of `./mvnw`. |

---

## 🧩 Common Use Cases & Prompts

Try these prompts to benchmark reasoning styles across models:

1. **System Architecture**:
   > *"Explain the difference between Dependency Injection and Inversion of Control in Spring Boot with a concrete code snippet."*
2. **API Design Trade-offs**:
   > *"Compare REST APIs with GraphQL across performance, over-fetching, caching, and client flexibility."*
3. **Modern Java Syntax**:
   > *"Write a Java 21 Stream pipeline to group a list of transactions by currency and calculate the total sum for each."*
4. **Spring AI Internals**:
   > *"How does the Spring AI ChatClient abstraction simplify switching between OpenAI and Anthropic compared to raw HTTP clients?"*

---

## 📈 Performance Considerations

Observed benchmarking latency is governed by:
1. **Model Architecture**: Frontier models (`GPT-4o`) balance reasoning depth and speed; dense reasoning models (`deepseek-r1`) perform step-by-step chain-of-thought token generation.
2. **Local Hardware Constraints**: Local Ollama token generation speed depends directly on available GPU VRAM bandwidth.
3. **Geographic Network Latency**: Cloud API response times include TLS handshakes and physical network hops.

---

## 🗺️ Future Roadmap

- [ ] **Streaming Token Generation**: Implement Server-Sent Events (SSE) / WebSockets using Spring AI reactive streaming.
- [ ] **Dynamic Model Selector**: UI dropdown to select alternate models (e.g. `gpt-4o-mini`, `claude-3-5-haiku`, `llama3.3`).
- [ ] **Token Count & Cost Tracking**: Live estimation of input/output token usage and approximate API cost per prompt.
- [ ] **Health & Actuator Endpoint**: Add `spring-boot-starter-actuator` with `/actuator/health` for cloud deployment monitoring.
- [ ] **Benchmark Export**: Export comparison sessions and timing metrics to JSON, CSV, or Markdown summaries.
- [ ] **Containerization**: Commit official multi-stage `Dockerfile` and `docker-compose.yml`.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository** on GitHub.
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/streaming-support
   ```
3. **Commit Your Changes**:
   ```bash
   git commit -m "feat: add token streaming via SSE"
   ```
4. **Push to Your Branch**:
   ```bash
   git push origin feature/streaming-support
   ```
5. **Open a Pull Request** describing your additions.

---

## 📄 License

This project is open-source. Feel free to use, modify, and distribute for educational, research, and commercial purposes with attribution.

---

## 🔗 Important Links

- **Live Frontend Application**: [https://spring-ai-studio-psi.vercel.app/](https://spring-ai-studio-psi.vercel.app/)
- **GitHub Repository**: [https://github.com/Mohammad-Asfin/Spring-AI-Studio](https://github.com/Mohammad-Asfin/Spring-AI-Studio)
- **Spring AI Official Documentation**: [https://docs.spring.io/spring-ai/reference/](https://docs.spring.io/spring-ai/reference/)
- **Spring Boot 3.4 Documentation**: [https://docs.spring.io/spring-boot/index.html](https://docs.spring.io/spring-boot/index.html)
- **React 19 Documentation**: [https://react.dev/](https://react.dev/)
- **Vite Documentation**: [https://vite.dev/](https://vite.dev/)
- **Ollama Documentation**: [https://ollama.com/](https://ollama.com/)
- **Railway Spring Boot Deployment Guide**: [https://docs.railway.com/guides/spring-boot](https://docs.railway.com/guides/spring-boot)
- **Render Docker Deployment Guide**: [https://render.com/docs/docker](https://render.com/docs/docker)

---

<p align="center">
  <strong>Spring AI Studio</strong> • Developed by <a href="https://github.com/Mohammad-Asfin">Mohammad Asfin</a>
</p>
