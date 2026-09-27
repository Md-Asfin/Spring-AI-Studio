import { useState, useCallback, useEffect } from 'react';
import './App.css';

const EXAMPLES = [
  "Explain Spring Boot dependency injection",
  "Compare REST vs GraphQL",
  "Write a Java Stream API example",
  "Explain Spring AI ChatClient"
];

function App() {
  const [prompt, setPrompt] = useState('');
  
  // Theme state with localStorage persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  
  const [responses, setResponses] = useState({
    openai: { status: 'idle', data: null, error: null, time: 0 },
    anthropic: { status: 'idle', data: null, error: null, time: 0 },
    ollama: { status: 'idle', data: null, error: null, time: 0 }
  });

  const models = [
    { 
      id: 'openai', 
      provider: 'OpenAI',
      name: 'GPT-4o', 
      type: 'Cloud',
      color: 'var(--accent-green)',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
          <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"></path>
        </svg>
      )
    },
    { 
      id: 'anthropic', 
      provider: 'Anthropic',
      name: 'Claude', 
      type: 'Cloud',
      color: 'var(--accent-orange)',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <path d="M4 4h16v16H4z"></path>
          <path d="M9 9h6v6H9z"></path>
        </svg>
      )
    },
    { 
      id: 'ollama', 
      provider: 'Ollama',
      name: 'DeepSeek', 
      type: 'Local',
      color: 'var(--accent-blue)',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
          <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
          <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      )
    }
  ];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const fetchModelResponse = async (model, promptText) => {
    const startTime = performance.now();
    try {
      const res = await fetch(`http://localhost:8080/api/${model}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText })
      });
      
      const data = await res.text();
      const endTime = performance.now();
      const timeSec = ((endTime - startTime) / 1000).toFixed(2);
      
      if (!res.ok) {
        throw new Error(data || `Error ${res.status}`);
      }
      
      return { data, time: timeSec, error: null };
    } catch (error) {
      const endTime = performance.now();
      const timeSec = ((endTime - startTime) / 1000).toFixed(2);
      
      let errMsg = "This provider could not generate a response. Please check your API configuration.";
      if (error.message.includes("401") || error.message.includes("Incorrect API key")) {
        errMsg = "API credentials have not been configured yet.\n\nConfigure:\nSPRING_AI_" + model.toUpperCase() + "_API_KEY";
      } else if (model === 'ollama') {
        errMsg = "Start Ollama and make sure the configured model is installed.";
      }
      
      return { data: null, time: timeSec, error: errMsg };
    }
  };

  const handleSubmit = useCallback(async () => {
    if (!prompt.trim()) return;
    
    const newResponses = {};
    models.forEach(m => {
      newResponses[m.id] = { status: 'loading', data: null, error: null, time: 0 };
    });
    setResponses(newResponses);
    
    models.forEach(model => {
      fetchModelResponse(model.id, prompt)
        .then(res => {
          setResponses(prev => ({
            ...prev,
            [model.id]: { 
              status: res.error ? 'error' : 'success', 
              data: res.data, 
              error: res.error, 
              time: res.time 
            }
          }));
        });
    });
  }, [prompt]);

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  const isLoading = Object.values(responses).some(r => r.status === 'loading');
  const hasResults = Object.values(responses).some(r => r.status === 'success' || r.status === 'error');
  const successfulModels = Object.entries(responses).filter(([_, r]) => r.status === 'success');
  
  const fastestModel = successfulModels.length > 0 
    ? successfulModels.reduce((min, curr) => parseFloat(curr[1].time) < parseFloat(min[1].time) ? curr : min)
    : null;

  const averageTime = successfulModels.length > 0
    ? (successfulModels.reduce((sum, curr) => sum + parseFloat(curr[1].time), 0) / successfulModels.length).toFixed(2)
    : 0;

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <div className="logo-container">
            <img src="/logo.svg" alt="Logo" className="logo-img" />
            <div className="logo-text">
              <h1>Spring AI <span>Studio</span></h1>
            </div>
          </div>
          <nav className="main-nav">
            <a href="#" className="active">Home</a>
            <a href="#compare">Compare</a>
            <a href="https://spring.io/projects/spring-ai" target="_blank" rel="noreferrer">Docs</a>
          </nav>
        </div>
        <div className="header-right">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? (
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            )}
          </button>
        </div>
      </header>

      <main className="main-content">
        {/* HERO SECTION */}
        <section className="hero">
          <h2>Compare and evaluate multiple LLM models side-by-side</h2>
        </section>

        {/* PROMPT WORKSPACE */}
        <section className="prompt-workspace" id="compare">
          <div className="prompt-card">
            <div className="prompt-input-wrapper">
              <textarea
                placeholder="Type your prompt here to challenge the AI models..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
                className="prompt-textarea"
                aria-label="Prompt input"
              />
            </div>
            
            <div className="prompt-footer">
              <div className="examples-section">
                <span className="examples-label">Try an example:</span>
                <div className="examples-list">
                  {EXAMPLES.map((ex, i) => (
                    <button 
                      key={i} 
                      className="example-btn" 
                      onClick={() => setPrompt(ex)}
                      disabled={isLoading}
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>

              <div className="prompt-actions">
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setPrompt('')}
                  disabled={isLoading || !prompt}
                >
                  Clear
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={handleSubmit}
                  disabled={isLoading || !prompt.trim()}
                >
                  {isLoading ? 'Comparing...' : 'Compare Models →'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON SUMMARY */}
        <section className="summary-section">
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Models Tested</span>
              <span className="summary-value">{models.length}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Successful</span>
              <span className="summary-value">
                {hasResults ? `${successfulModels.length} / ${models.length}` : '—'}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Fastest Model</span>
              <span className="summary-value fastest" style={{color: fastestModel ? models.find(m=>m.id===fastestModel[0]).color : 'inherit'}}>
                {fastestModel ? models.find(m=>m.id===fastestModel[0]).provider : '—'}
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Average Response</span>
              <span className="summary-value">{averageTime > 0 ? `${averageTime}s` : '—'}</span>
            </div>
          </div>
        </section>

        {/* MODEL CARDS */}
        <section className="models-grid">
          {models.map(model => {
            const res = responses[model.id];
            
            return (
              <div key={model.id} className="model-card" style={{ '--accent': model.color }}>
                
                <div className="card-header">
                  <div className="card-title-group">
                    <div className="card-icon" style={{ color: model.color }}>
                      {model.icon}
                    </div>
                    <div>
                      <h3 className="provider-name">{model.provider}</h3>
                      <span className="model-name">{model.name}</span>
                    </div>
                  </div>
                  <div className="card-tags">
                    <span className="tag type-tag">{model.type}</span>
                  </div>
                </div>

                <div className="card-status-bar">
                  {res.status === 'idle' && <span className="status status-ready">● Ready</span>}
                  {res.status === 'loading' && <span className="status status-loading">● Loading...</span>}
                  {res.status === 'success' && <span className="status status-success">✓ Completed</span>}
                  {res.status === 'error' && <span className="status status-error">⚠ Unavailable</span>}
                </div>
                
                <div className="card-body">
                  {res.status === 'idle' && (
                    <div className="empty-state">Response will appear here...</div>
                  )}

                  {res.status === 'loading' && (
                    <div className="loading-state">
                      <div className="dot-pulse"></div>
                    </div>
                  )}
                  
                  {res.status === 'success' && (
                    <div className="response-content">{res.data}</div>
                  )}

                  {res.status === 'error' && (
                    <div className="error-content">
                      <h4>Provider unavailable</h4>
                      <p>{res.error}</p>
                    </div>
                  )}
                </div>

                <div className="card-footer">
                  <div className="response-time">
                    Response time: {res.time > 0 ? `${res.time}s` : '—'}
                  </div>
                  <button 
                    className="copy-btn" 
                    onClick={() => copyToClipboard(res.data)}
                    disabled={res.status !== 'success'}
                    aria-label="Copy response"
                    title="Copy response"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Copy
                  </button>
                </div>

              </div>
            );
          })}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">Spring AI Studio</span>
          </div>
          <div className="footer-links">
            <span className="footer-text">Built with Spring Boot • Spring AI • React</span>
            <a href="https://github.com/Mohammad-Asfin/Spring-AI-Studio" target="_blank" rel="noopener noreferrer" className="footer-github">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;