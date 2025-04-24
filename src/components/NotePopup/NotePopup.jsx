import React from "react";
import "./NotePopup.scss"; // Create CSS for the popup
import { IoClose } from "react-icons/io5";
import { Col, Row } from "react-bootstrap";

function NotePopup({ note, onClose }) {
  if (!note) {
    return null;
  }

  return (
    <div className="note-popup-overlay">
      <div className="note-popup">
        <button className="close-button" onClick={onClose}>
          <IoClose />
        </button>
        <h2>{note.title}</h2>
        <p className="full-content">{note.content}</p>
        <div className="updating">
          <div className="row">
            <div className="col-md-6">
              <p className="created-at">
                Created At: {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="col-md-6">
              {note.updatedAt && (
                <p className="updated-at">
                  Updated At: {new Date(note.updatedAt).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotePopup;
