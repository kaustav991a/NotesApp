import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NotesApp.scss";
import NoteCard from "../../components/NoteCard/NoteCard";
import NotePopup from "../../components/NotePopup/NotePopup"; // Import the new popup component
import { FaList, FaTh } from "react-icons/fa";
import { db } from "../../firebase/index";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../../Context/UserContext";

function NotesApp() {
  const [layout, setLayout] = useState("list");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const [selectedNote, setSelectedNote] = useState(null); // State for the selected note to show in the popup

  const toggleLayout = (newLayout) => {
    setLayout(newLayout);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!currentUser?.uid) {
          console.log("No user logged in.");
          setNotes([]);
          setLoading(false);
          return;
        }

        const notesCollectionRef = collection(
          db,
          `users/${currentUser.uid}/notes`
        );
        const q = query(notesCollectionRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const fetchedNotes = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setNotes(fetchedNotes);
            setLoading(false);
          },
          (err) => {
            console.error("Error fetching notes:", err);
            setError("Failed to fetch notes.");
            setLoading(false);
          }
        );

        return unsubscribe;
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to fetch notes.");
        setLoading(false);
      }
    };

    fetchNotes();
  }, [currentUser?.uid]);

  const handleDeleteNote = async (noteId) => {
    if (!currentUser?.uid) {
      setError("No user logged in.");
      return;
    }

    try {
      const noteDocRef = doc(db, `users/${currentUser.uid}/notes`, noteId);
      await deleteDoc(noteDocRef);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      console.log(`Note with ID ${noteId} deleted successfully.`);
    } catch (err) {
      setError("Failed to delete note. Please try again.");
      console.error("Error deleting note:", err);
    }
  };

  const openNotePopup = (note) => {
    setSelectedNote(note);
  };

  const closeNotePopup = () => {
    setSelectedNote(null);
  };

  if (loading) {
    return (
      <div className={`notes-list-container ${layout}`}>
        {/* ... (loading indicator) ... */}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`fullpage notes-list-container ${layout}`}>
        <p className="error-message">Error: {error}</p>;
      </div>
    );
  }

  return (
    <>
      <div className={`notes-list-container ${layout}`}>
        <header className="notes-list-header">
          <h1>Your Notes</h1>
          <div className="changelayout">
            {currentUser?.email && <p>Logged in as: {currentUser.email}</p>}
            <button
              className={`layout-toggle-btn ${
                layout === "list" ? "active" : ""
              }`}
              onClick={() => toggleLayout("list")}
              title="List View"
            >
              <FaList />
            </button>
            <button
              className={`layout-toggle-btn ${
                layout === "grid" ? "active" : ""
              }`}
              onClick={() => toggleLayout("grid")}
              title="Grid View"
            >
              <FaTh />
            </button>
            <Link to="/create-note" className="btn">
              Create New Note
            </Link>
          </div>
        </header>

        {notes.length > 0 ? (
          <ul className={`notes-list ${layout}`}>
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
                onNoteClick={openNotePopup} // Pass the openPopup function to NoteCard
              />
            ))}
          </ul>
        ) : (
          <p className="empty-notes">
            No notes yet. Click "Create New Note" to add one!
          </p>
        )}
      </div>

      {selectedNote && (
        <NotePopup note={selectedNote} onClose={closeNotePopup} />
      )}
    </>
  );
}

export default NotesApp;
