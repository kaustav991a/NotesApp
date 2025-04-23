import React from "react";
import "./NotePopup.scss"; // Create CSS for the popup
import { IoClose } from "react-icons/io5";

function NotePopup({ note, onClose }) {
  if (!note) {
    return null;
  }

  return (
    <div className="note-popup-overlay">
      <div className="note-popu">
        <button className="close-button" onClick={onClose}>
          <IoClose />
        </button>
        <h2>{note.title}</h2>
        <p className="full-content">{note.content}</p>
        <p className="created-at">
          Created At: {new Date(note.createdAt).toLocaleString()}
        </p>
        {note.updatedAt && (
          <p className="updated-at">
            Updated At: {new Date(note.updatedAt).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}

export default NotePopup;
