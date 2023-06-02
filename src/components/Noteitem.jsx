import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const Note = (props) => {
  const note = props.note;
  const { deleteNote, bookmarkNote } = useContext(noteContext);
  const date = new Date(String(note.date).slice(0, 10));

  return (
    <div className="card col-md-3 m-2 d-flex shadow justify-content-between">
      <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-primary">
        {`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}
        <span className="visually-hidden">unread messages</span>
      </span>
      <div className="card-body d-flex justify-content-between flex-row p-0 ">
        <Link to={`/editor/${note.id}`}>
          <h5 className="card-title p-2">
            {String(note.note).length > 10
              ? `${String(note.note).slice(0, 27)}...`
              : note.note}
          </h5>
        </Link>

        <div className="d-flex flex-row">
          <button
            onClick={() => {
              deleteNote(note.id);
            }}
            className="btn"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
          <button
            onClick={() => {
              bookmarkNote(note.id, note.bookmark);
            }}
            className="btn"
          >
            <i
              className={`fa-${note.bookmark ? "solid" : "regular"} fa-star`}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
