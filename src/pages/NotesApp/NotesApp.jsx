import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NotesApp.scss";
import NoteCard from "../../components/NoteCard/NoteCard";
import { FaList, FaTh } from "react-icons/fa";
import { db, auth } from "../../firebase/index"; // Import Firebase
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../../Context/UserContext"; // Correct import path

function NotesApp() {
  const [layout, setLayout] = useState("list");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth(); // Get currentUser from AuthContext

  const toggleLayout = (newLayout) => {
    setLayout(newLayout);
  };

  // TEMPORARY USER IDs FOR TESTING
  // const tempUser1Id = "test-user-id-123";
  // const tempUser2Id = "another-test-user-456";

  const getCurrentUserId = () => {
    return currentUser === "user1" ? tempUser1Id : tempUser2Id;
  };

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!currentUser) {
          console.log("No user logged in.");
          setNotes([]);
          setLoading(false);
          return;
        }

        const notesCollectionRef = collection(
          db,
          `users/${currentUser.uid}/notes`
        ); // Use currentUser.uid
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
  }, [currentUser]); // Re-fetch when currentUser changes

  const handleDeleteNote = async (noteId) => {
    if (!currentUser?.uid) {
      setError("No user logged in.");
      return;
    }

    try {
      const noteDocRef = doc(db, `users/${currentUser.uid}/notes`, noteId);
      await deleteDoc(noteDocRef);

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));

      console.log(
        `Note with ID ${noteId} deleted successfully for user ${currentUser.uid}.`
      );
    } catch (err) {
      setError("Failed to delete note. Please try again.");
      console.error("Error deleting note:", err);
    }
  };

  if (loading) {
    return (
      <div className={`notes-list-container ${layout}`}>
        <header className="notes-list-header">
          <h1>Your Notes</h1>
          <div className="changelayout">
            <button className="layout-toggle-btn skeleton" disabled>
              <FaList />
            </button>
            <button className="layout-toggle-btn skeleton" disabled>
              <FaTh />
            </button>
            <div className="btn skeleton">Create New Note</div>
          </div>
        </header>
        <ul style={{ opacity: 0.1 }} className={`notes-list ${layout}`}>
          {Array.from({ length: 3 }).map((_, index) => (
            <li key={index} className="note-item skeleton-item">
              <div className="note-link">
                <h3 className="skeleton skeleton-title"></h3>
                <p className="skeleton skeleton-content"></p>
              </div>
            </li>
          ))}
        </ul>
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
            {/* <div className="changeuserbtn">
              <button className="btn" onClick={() => switchUser("user1")}>
                Switch to User 1
              </button>
              <button className="btn" onClick={() => switchUser("user2")}>
                Switch to User 2
              </button>
            </div> */}
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

            <div className="profileimg">
              <img src="" alt="" />
            </div>
          </div>
        </header>

        {notes.length > 0 ? (
          <ul className={`notes-list ${layout}`}>
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} />
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
