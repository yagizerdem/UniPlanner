import React, { useState } from 'react';
import Timer from './components/Timer';
import Notes from './components/Notes';
import EventPlanner from './components/EventPlanner';
import './styles/App.css';

function App() {
  const [activeTab, setActiveTab] = useState('timer');

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎓 UniPlanner</h1>
        <p>Your University Productivity Companion</p>
      </header>
      
      <nav className="app-nav">
        <button 
          className={activeTab === 'timer' ? 'active' : ''}
          onClick={() => setActiveTab('timer')}
        >
          ⏱️ Timer
        </button>
        <button 
          className={activeTab === 'notes' ? 'active' : ''}
          onClick={() => setActiveTab('notes')}
        >
          📝 Notes
        </button>
        <button 
          className={activeTab === 'events' ? 'active' : ''}
          onClick={() => setActiveTab('events')}
        >
          📅 Events
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'timer' && <Timer />}
        {activeTab === 'notes' && <Notes />}
        {activeTab === 'events' && <EventPlanner />}
      </main>
    </div>
  );
}

export default App;
