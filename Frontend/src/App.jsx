import { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [sharedPrompt, setSharedPrompt] = useState('');
  const [responses, setResponses] = useState({
    ollama: '',
    anthropic: '',
    openai: ''
  });
  const [loading, setLoading] = useState({
    ollama: false,
    anthropic: false,
    openai: false
  });
  const [responseOrder, setResponseOrder] = useState([]);

  const models = [
    { id: 'openai', name: 'OpenAI (GPT-4o)', color: '#10a37f' },
    { id: 'anthropic', name: 'Anthropic (Claude)', color: '#d97757' },
    { id: 'ollama', name: 'Ollama (DeepSeek)', color: '#333333' }
  ];

  const handlePromptChange = useCallback((value) => {
    setSharedPrompt(value);
  }, []);

  const fetchModelResponse = useCallback(async (model, prompt) => {
    try {
      const response = await fetch(`http://localhost:8080/api/${model}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: prompt })
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.text();
      return data;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!sharedPrompt.trim()) return;
    
    // Reset the response order
    setResponseOrder([]);
    
    // Set all models to loading
    setLoading({
      ollama: true,
      anthropic: true,
      openai: true
    });
    
    // Initialize all responses as loading
    setResponses({
      ollama: '',
      anthropic: '',
      openai: ''
    });
    
    // Process each model independently
    models.forEach(model => {
      fetchModelResponse(model.id, sharedPrompt)
        .then(response => {
          setResponses(prev => ({ ...prev, [model.id]: response }));
          setResponseOrder(prev => [...prev, model.id]);
          setLoading(prev => ({ ...prev, [model.id]: false }));
        })
        .catch(error => {
          setResponses(prev => ({ ...prev, [model.id]: `Error: ${error.message}` }));
          setLoading(prev => ({ ...prev, [model.id]: false }));
        });
    });
  }, [sharedPrompt, fetchModelResponse, models]);

  const isLoading = Object.values(loading).some(status => status);
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Spring AI Studio</h1>
        <p className="subtitle">Evaluate and compare multiple LLM models side-by-side</p>
      </header>
      
      <div className="prompt-section">
        <div className="prompt-card">
          <textarea
            placeholder="Type your prompt here to challenge the AI models..."
            value={sharedPrompt}
            onChange={(e) => handlePromptChange(e.target.value)}
            disabled={isLoading}
            className="prompt-textarea"
          />
          <div className="prompt-actions">
            <button 
              onClick={handleSubmit}
              disabled={isLoading || !sharedPrompt.trim()}
              className="submit-btn"
            >
              {isLoading ? (
                <span className="loading-content">
                  <span className="spinner"></span> Processing...
                </span>
              ) : 'Compare Models'}
            </button>
          </div>
        </div>
      </div>
      
      {responseOrder.length > 0 && (
        <div className="results-meta">
          <p>
            <strong>Fastest response:</strong>{' '}
            <span style={{ color: models.find(m => m.id === responseOrder[0])?.color, fontWeight: 600 }}>
              {models.find(m => m.id === responseOrder[0])?.name}
            </span>
          </p>
        </div>
      )}
      
      <div className="model-grid">
        {models.map(model => (
          <div 
            key={model.id} 
            className={`model-card ${responseOrder[0] === model.id ? 'fastest-card' : ''}`}
            style={{ '--model-color': model.color }}
          >
            <div className="card-header" style={{ borderBottomColor: model.color }}>
              <h2 style={{ color: model.color }}>
                {model.name}
              </h2>
              {responseOrder.includes(model.id) && (
                <span className="rank-badge" style={{ backgroundColor: model.color }}>
                  #{responseOrder.indexOf(model.id) + 1}
                </span>
              )}
            </div>
            
            <div className="card-body">
              {loading[model.id] ? (
                <div className="loading-state">
                  <div className="bouncing-dots">
                    <div style={{backgroundColor: model.color}}></div>
                    <div style={{backgroundColor: model.color}}></div>
                    <div style={{backgroundColor: model.color}}></div>
                  </div>
                  <p>Generating response...</p>
                </div>
              ) : responses[model.id] ? (
                <div className="response-text">{responses[model.id]}</div>
              ) : (
                <div className="empty-state">
                  <p>Awaiting prompt...</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;