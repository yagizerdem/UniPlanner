import React, { useState, useEffect } from 'react';
import '../styles/EventPlanner.css';

function EventPlanner() {
  const [events, setEvents] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'class',
  });
  const [filterType, setFilterType] = useState('all');

  // Load events from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem('uniPlanner_events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save events to localStorage
  useEffect(() => {
    localStorage.setItem('uniPlanner_events', JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      alert('Please fill in at least the title and date');
      return;
    }

    const event = {
      id: Date.now(),
      ...newEvent,
      createdAt: new Date().toISOString(),
    };

    setEvents([...events, event].sort((a, b) => {
      const dateA = new Date(a.date + ' ' + (a.time || '00:00'));
      const dateB = new Date(b.date + ' ' + (b.time || '00:00'));
      return dateA - dateB;
    }));

    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: 'class',
    });
    setShowAddForm(false);
  };

  const deleteEvent = (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const toggleEventComplete = (id) => {
    setEvents(events.map(event =>
      event.id === id ? { ...event, completed: !event.completed } : event
    ));
  };

  const getEventTypeColor = (type) => {
    const colors = {
      class: '#4CAF50',
      exam: '#f44336',
      assignment: '#FF9800',
      study: '#2196F3',
      other: '#9C27B0',
    };
    return colors[type] || colors.other;
  };

  const filteredEvents = filterType === 'all' 
    ? events 
    : events.filter(event => event.type === filterType);

  const getEventStatus = (event) => {
    const eventDateTime = new Date(event.date + ' ' + (event.time || '00:00'));
    const now = new Date();
    
    if (event.completed) return 'completed';
    if (eventDateTime < now) return 'past';
    
    const daysDiff = Math.ceil((eventDateTime - now) / (1000 * 60 * 60 * 24));
    if (daysDiff <= 1) return 'today';
    if (daysDiff <= 7) return 'upcoming';
    return 'future';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="events-container">
      <div className="events-header">
        <h2>📅 Event Planner</h2>
        <button className="add-event-btn" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? '✖️ Cancel' : '➕ Add Event'}
        </button>
      </div>

      {showAddForm && (
        <div className="event-form">
          <h3>Create New Event</h3>
          <div className="form-group">
            <label>Title *</label>
            <input 
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              placeholder="e.g., Math Exam, Project Due"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Date *</label>
              <input 
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input 
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Type</label>
            <select 
              value={newEvent.type}
              onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
            >
              <option value="class">Class</option>
              <option value="exam">Exam</option>
              <option value="assignment">Assignment</option>
              <option value="study">Study Session</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input 
              type="text"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              placeholder="e.g., Room 301, Online"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              placeholder="Additional details..."
              rows="3"
            />
          </div>

          <button className="submit-btn" onClick={addEvent}>
            Create Event
          </button>
        </div>
      )}

      <div className="events-filters">
        {['all', 'class', 'exam', 'assignment', 'study', 'other'].map(type => (
          <button 
            key={type}
            className={filterType === type ? 'active' : ''}
            onClick={() => setFilterType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="events-list">
        {filteredEvents.length === 0 ? (
          <div className="empty-state">
            <p>No events scheduled. Add your first event!</p>
          </div>
        ) : (
          filteredEvents.map(event => {
            const status = getEventStatus(event);
            return (
              <div 
                key={event.id}
                className={`event-card ${status}`}
                style={{ borderLeftColor: getEventTypeColor(event.type) }}
              >
                <div className="event-card-header">
                  <div className="event-checkbox">
                    <input 
                      type="checkbox"
                      checked={event.completed || false}
                      onChange={() => toggleEventComplete(event.id)}
                    />
                  </div>
                  <div className="event-info">
                    <h3 className={event.completed ? 'completed' : ''}>
                      {event.title}
                    </h3>
                    <span className="event-type">{event.type}</span>
                  </div>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteEvent(event.id)}
                  >
                    🗑️
                  </button>
                </div>
                
                <div className="event-details">
                  <p className="event-datetime">
                    📅 {formatDate(event.date)}
                    {event.time && ` at ${event.time}`}
                  </p>
                  {event.location && (
                    <p className="event-location">📍 {event.location}</p>
                  )}
                  {event.description && (
                    <p className="event-description">{event.description}</p>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default EventPlanner;
