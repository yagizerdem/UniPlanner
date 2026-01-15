import React, { useState, useEffect } from 'react';
import '../styles/Notes.css';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ title: '', content: '' });
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('uniPlanner_notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('uniPlanner_notes', JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
    setCurrentNote({ title: newNote.title, content: newNote.content });
  };

  const saveNote = () => {
    if (selectedNoteId) {
      setNotes(notes.map(note => 
        note.id === selectedNoteId 
          ? { ...note, ...currentNote, updatedAt: new Date().toISOString() }
          : note
      ));
    }
  };

  const deleteNote = (id) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== id));
      if (selectedNoteId === id) {
        setSelectedNoteId(null);
        setCurrentNote({ title: '', content: '' });
      }
    }
  };

  const selectNote = (note) => {
    setSelectedNoteId(note.id);
    setCurrentNote({ title: note.title, content: note.content });
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="notes-container">
      <div className="notes-sidebar">
        <div className="notes-header">
          <button className="new-note-btn" onClick={createNewNote}>
            ➕ New Note
          </button>
          <input 
            type="text"
            placeholder="🔍 Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="notes-list">
          {filteredNotes.length === 0 ? (
            <div className="empty-state">
              <p>No notes yet. Create your first note!</p>
            </div>
          ) : (
            filteredNotes.map(note => (
              <div 
                key={note.id}
                className={`note-item ${selectedNoteId === note.id ? 'active' : ''}`}
                onClick={() => selectNote(note)}
              >
                <div className="note-item-header">
                  <h3>{note.title || 'Untitled'}</h3>
                  <button 
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                  >
                    🗑️
                  </button>
                </div>
                <p className="note-preview">{note.content.slice(0, 60)}...</p>
                <span className="note-date">{formatDate(note.updatedAt)}</span>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="notes-editor">
        {selectedNoteId ? (
          <>
            <input 
              type="text"
              className="note-title-input"
              value={currentNote.title}
              onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
              onBlur={saveNote}
              placeholder="Note title..."
            />
            <textarea 
              className="note-content-input"
              value={currentNote.content}
              onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
              onBlur={saveNote}
              placeholder="Start writing your note..."
            />
            <div className="editor-info">
              <p>💾 Auto-saves when you stop typing</p>
            </div>
          </>
        ) : (
          <div className="editor-empty-state">
            <h2>📝 Select a note or create a new one</h2>
            <p>Your notes are automatically saved locally</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
