import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateNote.scss";
import { db } from "../../firebase/index"; // Adjust path as needed
import { collection, addDoc } from "firebase/firestore";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAuth } from "../../Context/UserContext"; // Import useAuth hook

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const { currentUser } = useAuth(); // Get currentUser from AuthContext

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const showCustomNotification = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleSaveNote = async () => {
    if (!title.trim() && !content.trim()) {
      showCustomNotification(
        "Note cannot be empty. Please enter a title or content.",
        "error"
      );
      return;
    }

    setIsSaving(true);
    setShowNotification(false); // Reset notification

    try {
      if (!currentUser?.uid) {
        console.error("User not authenticated.");
        showCustomNotification("User not authenticated.", "error");
        setIsSaving(false);
        return;
      }

      const notesCollectionRef = collection(
        db,
        `users/${currentUser.uid}/notes`
      ); // Use currentUser.uid
      const createdAt = new Date().toISOString();
      const updatedAt = createdAt;

      await addDoc(notesCollectionRef, {
        title: title,
        content: content,
        createdAt: createdAt,
        updatedAt: updatedAt,
      });

      console.log("Note saved successfully for user:", currentUser.uid);
      setIsSaving(false);
      navigate("/notes");
    } catch (error) {
      console.error("Error saving note:", error);
      showCustomNotification("Failed to save note. Please try again.", "error");
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/notes");
  };

  return (
    <div className="create-note-container">
      <header className="create-note-header">
        <h1>
          <Link to="/notes">
            <IoMdArrowRoundBack />
          </Link>
          Create New Note
        </h1>
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

        {showNotification && (
          <div className={`notification ${notificationType}`}>
            {notificationMessage}
          </div>
        )}

        <div className="form-actions">
          <button
            className="btn btn-primary"
            onClick={handleSaveNote}
            disabled={isSaving || (!title.trim() && !content.trim())}
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
