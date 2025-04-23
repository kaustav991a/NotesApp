import React from "react";
import { Link } from "react-router-dom";
import "./NoteCard.scss";
import { RiCloseCircleFill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";

function NoteCard({ note, onDelete, onNoteClick }) {
  const handleDelete = (event) => {
    event.preventDefault();
    if (onDelete) {
      onDelete(note.id);
    }
  };

  const handleNoteClick = () => {
    if (onNoteClick) {
      onNoteClick(note); // Call the function passed from NotesApp, passing the note data
    }
  };

  return (
    <li className="note-item">
      <div className="note-link" onClick={handleNoteClick}>
        {" "}
        {/* Make the note content clickable */}
        <h3>{note.title}</h3>
        <p>{note.content.substring(0, 100)}...</p>
      </div>
      <button className="delete-button" onClick={handleDelete}>
        <RiCloseCircleFill />
      </button>
      <Link className="edit-button" to={`/edit-note/${note.id}`}>
        <MdModeEdit />
      </Link>
    </li>
  );
}

export default NoteCard;
