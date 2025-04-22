// NoteCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./NoteCard.scss"; // Optional: Create a CSS/SCSS file for NoteCard

function NoteCard({ note }) {
  return (
    <li className="note-item">
      <Link to={`/edit-note/${note.id}`} className="note-link">
        <h3>{note.title}</h3>
        <p>{note.content.substring(0, 50)}...</p>
      </Link>
    </li>
  );
}

export default NoteCard;
