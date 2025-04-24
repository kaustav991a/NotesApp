import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NotesApp.scss";
import NoteCard from "../../components/NoteCard/NoteCard";
import NotePopup from "../../components/NotePopup/NotePopup";
import { FaList, FaTh, FaStar, FaRegStar } from "react-icons/fa"; // Import star icons
import maleProfile from "../../assets/images/profile-male.png";
import femaleProfile from "../../assets/images/profile-female.png";
import { db } from "../../firebase/index";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../../Context/UserContext";
import { IoMdArrowRoundBack } from "react-icons/io";

function NotesApp() {
  const [layout, setLayout] = useState("list");
  const [saveError, setSaveError] = useState(null);
  const [active, setActive] = useState(false);
  const [currentUserGender, setCurrentUserGender] = useState("male");
  const [userLayout, setUserLayout] = useState("list");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();

  const toggleClick = () => {
    setActive(!active);
  };

  const handleLogout = async () => {
    setError(null);
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
      setError(error.message);
    }
  };

  const toggleLayout = async (newLayout) => {
    setLayout(newLayout);
    setUserLayout(newLayout);
    if (currentUser?.uid) {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, {
          layout: newLayout,
        });
        console.log("User layout preference updated in Firestore.");
      } catch (error) {
        console.error("Error updating user layout preference:", error);
        setError("Failed to save layout preference.");
      }
    }
  };

  useEffect(() => {
    const fetchUserGenderAndLayout = async () => {
      if (currentUser?.uid) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData.gender) {
              setCurrentUserGender(userData.gender);
            }
            if (userData.layout) {
              setUserLayout(userData.layout);
              setLayout(userData.layout);
            }
          } else {
            console.log("User document does not exist");
            setCurrentUserGender("male");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
          setError("Failed to fetch user data.");
          setCurrentUserGender("male");
        }
      } else {
        setCurrentUserGender("male");
      }
    };
    fetchUserGenderAndLayout();
  }, [currentUser?.uid]);

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
              isStarred: doc.data().isStarred || false, // Ensure isStarred exists
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

  const toggleStar = async (noteId) => {
    if (!currentUser?.uid) {
      setError("No user logged in.");
      return;
    }

    try {
      const noteDocRef = doc(db, `users/${currentUser.uid}/notes`, noteId);
      const currentNote = notes.find((n) => n.id === noteId);
      if (!currentNote) return; //prevent error if note doesnt exist
      const newStarValue = !currentNote.isStarred;
      await updateDoc(noteDocRef, {
        isStarred: newStarValue,
      });

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? { ...note, isStarred: newStarValue } : note
        )
      );
      console.log(`Note with ID ${noteId} starred status toggled.`);
    } catch (err) {
      setError("Failed to update star status.");
      console.error("Error updating star status:", err);
    }
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isStarred && !b.isStarred) return -1;
    if (!a.isStarred && b.isStarred) return 1;
    return 0;
  });

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
    <>
      <div className={`notes-list-container ${layout}`}>
        <header className="notes-list-header">
          <h1>Your Notes</h1>
          <div className="changelayout">
            <div className="activestatus">
              <span className="status active" title={currentUser?.email || ""}>
                active
              </span>
            </div>
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
              <button onClick={toggleClick}>
                <img
                  src={
                    currentUserGender === "male" ? maleProfile : femaleProfile
                  }
                  alt="Profile"
                />
              </button>
            </div>

            <div className={`dropdown ${active ? "active" : ""}`}>
              <ul>
                <li>
                  <Link to="#!">My Account</Link>
                </li>
                <li className="logout">
                  <Link onClick={handleLogout}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </header>

        {notes.length > 0 ? (
          <ul className={`notes-list ${layout}`}>
            {sortedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
                onNoteClick={openNotePopup}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click when starring
                    toggleStar(note.id);
                  }}
                  className="star-button"
                  title={note.isStarred ? "Unstar Note" : "Star Note"}
                >
                  {note.isStarred ? (
                    <FaStar className="star-icon starred" />
                  ) : (
                    <FaRegStar className="star-icon" />
                  )}
                </button>
              </NoteCard>
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
