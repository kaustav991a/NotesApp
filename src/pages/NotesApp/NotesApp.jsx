import React from "react";
import { Link } from "react-router-dom";
import "./NotesApp.scss";

function NotesApp() {
  const sampleNotes = [
    // { id: "1", title: "Grocery List", content: "Milk, Eggs, Bread, Cheese" },
    // {
    //   id: "2",
    //   title: "Ideas for Project",
    //   content: "Brainstorming session on Tuesday...",
    // },
    // {
    //   id: "3",
    //   title: "Book to Read",
    //   content: '"The Hitchhiker\'s Guide to the Galaxy"',
    // },
  ];
  return (
    <>
      <div className="notes-list-container">
        <header className="notes-list-header">
          <h1>Your Notes</h1>
          <Link to="/create-note" className="btn">
            Create New Note
          </Link>
        </header>

        {sampleNotes.length > 0 ? (
          <ul className="notes-list">
            {sampleNotes.map((note) => (
              <li key={note.id} className="note-item">
                <Link to={`/edit-note/${note.id}`} className="note-link">
                  <h3>{note.title}</h3>
                  <p>{note.content.substring(0, 50)}...</p>{" "}
                  {/* Show a preview */}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-notes">
            No notes yet. Click "Create New Note" to add one!
          </p>
        )}
      </div>
    </>
  );
}

export default NotesApp;
