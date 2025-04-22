import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NotesApp.scss";
import NoteCard from "../../components/NoteCard/NoteCard";
import { FaList, FaTh } from "react-icons/fa";
import { db, auth } from "../../firebase/index"; // Import Firebase
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

function NotesApp() {
  const [layout, setLayout] = useState("list");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleLayout = (newLayout) => {
    setLayout(newLayout);
  };

  // TEMPORARY USER ID FOR TESTING - REPLACE WITH AUTHENTICATION LATER
  const tempUserId = "test-user-id-123";

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!tempUserId) {
          console.error("Temporary user ID not set.");
          setError("Temporary user ID not set.");
          setLoading(false);
          return;
        }

        const notesCollectionRef = collection(db, `users/${tempUserId}/notes`);

        // Order the notes by createdAt in descending order
        const q = query(notesCollectionRef, orderBy("createdAt", "desc"));

        // Use onSnapshot with the ordered query for real-time updates
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

        // If you only need to fetch once:
        /*
        const querySnapshot = await getDocs(q);
        const fetchedNotes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(fetchedNotes);
        setLoading(false);
        */
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to fetch notes.");
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

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
              <NoteCard key={note.id} note={note} />
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
