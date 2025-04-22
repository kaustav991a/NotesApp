// NoteCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./NoteCard.scss"; // Optional: Create a CSS/SCSS file for NoteCard
import { RiCloseCircleFill } from "react-icons/ri"; // Import the close circle icon

function NoteCard({ note, onDelete }) {
  const handleDelete = (event) => {
    event.preventDefault(); // Prevent the Link from being followed
    if (onDelete) {
      onDelete(note.id);
    }
  };

  return (
    <li className="note-item">
      <Link to={`/edit-note/${note.id}`} className="note-link">
        <h3>{note.title}</h3>
        <p>{note.content.substring(0, 50)}...</p>
      </Link>
      <button className="delete-button" onClick={handleDelete}>
        <RiCloseCircleFill />
      </button>
    </li>
  );
}

export default NoteCard;
