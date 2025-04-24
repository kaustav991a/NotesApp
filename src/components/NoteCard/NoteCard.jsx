import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./NoteCard.scss";
import { RiCloseCircleFill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { motion, useMotionValue, useTransform } from "framer-motion";

function NoteCard({ note, onDelete, onNoteClick, children }) {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0.5, 1, 0.5]);

  const handleDelete = (event) => {
    event.preventDefault();
    if (onDelete) {
      onDelete(note.id);
    }
  };

  const handleNoteClick = (event) => {
    let target = event.target;
    while (target && target !== event.currentTarget) {
      if (target.classList.contains("star-button")) {
        return;
      }
      target = target.parentNode;
    }
    if (onNoteClick) {
      onNoteClick(note);
    }
  };

  const ref = useRef(null);

  return (
    <motion.li
      ref={ref}
      className={`note-item ${note.isStarred ? "starred" : ""}`}
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0, x: 0 }} // Reset x to 0 in animate
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      style={{ opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDrag={(event, info) => {
        x.set(info.offset.x);
      }}
      onDragEnd={() => {
        x.set(0);
      }}
    >
      <div className="note-link" onClick={handleNoteClick}>
        <h3>{note.title}</h3>
        <p>{note.content.substring(0, 100)}...</p>
      </div>
      {children}
      <button className="delete-button" onClick={handleDelete}>
        <RiCloseCircleFill />
      </button>
      <Link className="edit-button" to={`/edit-note/${note.id}`}>
        <MdModeEdit />
      </Link>
    </motion.li>
  );
}

export default NoteCard;
