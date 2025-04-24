import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./EditNote.scss";
import { db } from "../../firebase/index"; // Adjust path as needed
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAuth } from "../../Context/UserContext"; // Import useAuth hook

function EditNote() {
  const { noteId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [isContentChanged, setIsContentChanged] = useState(false);
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const contentInputRef = useRef(null);
  const { currentUser } = useAuth(); // Get currentUser from AuthContext

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      setSaveError(null);

      try {
        if (!currentUser?.uid || !noteId) {
          console.error("User ID or Note ID not found.");
          setSaveError("Could not load note.");
          setLoading(false);
          return;
        }

        const noteDocRef = doc(db, `users/${currentUser.uid}/notes`, noteId); // Use currentUser.uid
        const docSnap = await getDoc(noteDocRef);

        if (docSnap.exists()) {
          const noteData = docSnap.data();
          setTitle(noteData.title);
          setContent(noteData.content);
          setOriginalTitle(noteData.title);
          setOriginalContent(noteData.content);
          setLoading(false);
        } else {
          console.error("Note not found.");
          setSaveError("Note not found.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching note:", error);
        setSaveError("Failed to load note.");
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId, currentUser?.uid]); // зависимость от noteId и currentUser.uid

  useEffect(() => {
    setIsContentChanged(title !== originalTitle || content !== originalContent);
  }, [title, content, originalTitle, originalContent]);

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
    if (title === originalTitle && content === originalContent) {
      showCustomNotification("No changes detected.", "warning");
      return;
    }

    setIsSaving(true);
    setSaveError(null);
    setShowNotification(false);

    try {
      if (!currentUser?.uid || !noteId) {
        console.error("User ID or Note ID not found.");
        setSaveError("Could not save note.");
        setIsSaving(false);
        return;
      }

      const noteDocRef = doc(db, `users/${currentUser.uid}/notes`, noteId); // Use currentUser.uid
      const updatedAt = new Date().toISOString();

      await updateDoc(noteDocRef, {
        title: title,
        content: content,
        updatedAt: updatedAt,
      });

      console.log(
        "Note updated successfully for user:",
        currentUser.uid,
        "noteId:",
        noteId
      );
      setIsSaving(false);
      showCustomNotification("Note updated successfully!", "success");
      setTimeout(() => navigate("/notes"), 1500);
    } catch (error) {
      console.error("Error updating note:", error);
      setSaveError("Failed to update note. Please try again.");
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (isContentChanged) {
      if (window.confirm("Are you sure you want to discard unsaved changes?")) {
        navigate("/notes");
      }
    } else {
      navigate("/notes");
    }
  };

  if (loading) {
    return (
      <div className="edit-note-container">
        <header className="edit-note-header">
          <h1>
            <Link to="/notes">
              <IoMdArrowRoundBack />
            </Link>
            Edit Note
          </h1>
        </header>
        <div className="loading-spinner-centered">
          <div className="loading-spinner-circular"></div>
        </div>
      </div>
    );
  }

  if (saveError) {
    return (
      <div className="edit-note-container">
        <header className="edit-note-header">
          <h1>
            <Link to="/notes">
              <IoMdArrowRoundBack />
            </Link>
            Edit Note
          </h1>
        </header>
        <p className="error-message">{saveError}</p>
      </div>
    );
  }

  return (
    <div className="edit-note-container">
      <header className="edit-note-header">
        <h1>
          <Link to="/notes">
            <IoMdArrowRoundBack />
          </Link>
          Edit Note
        </h1>
      </header>
      <div className="edit-note-form">
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
            ref={contentInputRef}
            id="note-content"
            className="form-control"
            value={content}
            onChange={handleContentChange}
            placeholder="Write your note here..."
            rows="8"
          />
        </div>

        {saveError && <p className="error-message">{saveError}</p>}
        {showNotification && (
          <div className={`notification ${notificationType}`}>
            {notificationMessage}
          </div>
        )}

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

export default EditNote;
