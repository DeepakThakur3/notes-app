import React, { useState, useEffect } from 'react';

function App() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [notes, setNotes] = useState({});
  const [newGroupName, setNewGroupName] = useState('');
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || {};
    setGroups(savedGroups);
    setNotes(savedNotes);
  }, []);

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      const updatedGroups = [...groups, newGroupName];
      setGroups(updatedGroups);
      localStorage.setItem('groups', JSON.stringify(updatedGroups));
      setNewGroupName('');
    }
  };

  const handleAddNote = () => {
    if (newNote.trim() && selectedGroup) {
      const updatedNotes = { ...notes };
      const noteData = { content: newNote, date: new Date().toLocaleString() };
      if (updatedNotes[selectedGroup]) {
        updatedNotes[selectedGroup].push(noteData);
      } else {
        updatedNotes[selectedGroup] = [noteData];
      }
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNewNote('');
    }
  };

  return (
    <div>
      <h1>Notes App</h1>
      <div>
        <input
          type="text"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder="New Group Name"
        />
        <button onClick={handleAddGroup}>Add Group</button>
      </div>
      <div>
        <select onChange={(e) => setSelectedGroup(e.target.value)} value={selectedGroup || ''}>
          <option value="" disabled>Select a Group</option>
          {groups.map((group, index) => (
            <option key={index} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>
      {selectedGroup && (
        <div>
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write a note"
          />
          <button onClick={handleAddNote}>Save Note</button>
          <div>
            <h2>Notes for {selectedGroup}</h2>
            {notes[selectedGroup] && notes[selectedGroup].map((note, index) => (
              <div key={index}>
                <p>{note.content}</p>
                <p><small>{note.date}</small></p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
