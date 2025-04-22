import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateNote.scss";
import { db } from "../../firebase/index"; // Adjust path as needed
import { collection, addDoc } from "firebase/firestore";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // TEMPORARY USER ID FOR TESTING - REPLACE WITH AUTHENTICATION LATER
  const tempUserId = "test-user-id-123";

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSaveNote = async () => {
    setIsSaving(true);
    setSaveError(null);

    try {
      if (!tempUserId) {
        console.error("Temporary user ID not set.");
        setSaveError("Temporary user ID not set.");
        setIsSaving(false);
        return;
      }

      const notesCollectionRef = collection(db, `users/${tempUserId}/notes`);
      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;

      await addDoc(notesCollectionRef, {
        title: title,
        content: content,
        createdAt: createdAt,
        updatedAt: updatedAt,
      });

      console.log("Note saved successfully for user:", tempUserId);
      setIsSaving(false);
      navigate("/notes");
    } catch (error) {
      console.error("Error saving note:", error);
      setSaveError("Failed to save note. Please try again.");
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/notes");
  };

  return (
    <div className="create-note-container">
      <header className="create-note-header">
        <h1>Create New Note</h1>
      </header>
      <div className="create-note-form">
        <div className="form-group">
          <label htmlFor="note-title">Title</label>
          <input
            type="text"
            id="note-title"
            className="form-control"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="note-content">Content</label>
          <textarea
            id="note-content"
            className="form-control"
            value={content}
            onChange={handleContentChange}
            placeholder="Write your note here..."
            rows="8"
          />
        </div>

        {saveError && <p className="error-message">{saveError}</p>}

        <div className="form-actions">
          <button
            className="btn btn-primary"
            onClick={handleSaveNote}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleCancel}
            disabled={isSaving}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNote;
