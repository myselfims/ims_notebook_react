import React, { useEffect } from "react";
import Note from "./Noteitem";
import noteContext from "../context/notes/NoteContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Notes = (props) => {
  const { notes, setNotes, getNote, setLoader } = useContext(noteContext);
  const navigate = useNavigate();
  useEffect(() => {
    setLoader(true)
    if (localStorage.getItem("token")) {
      async function fetchData() {
        let check = await getNote();
        if (check) {
          navigate("/authuser/login");
          setLoader(false)
          localStorage.setItem('username','')
          localStorage.setItem('token','')
        }
    }
    fetchData();
    setLoader(false)
  } else {
        setLoader(false)
        localStorage.setItem('username','')
        localStorage.setItem('token','')
        navigate("/authuser/login");
    }
  }, []);
  return (
    <div>
      <div className="row m-1 d-flex justify-content-center">
        <h1 className="text-center">Your notes</h1>
        {notes.length>0? notes.map((note) => {
          return <Note key={note.id} note={note} />;
        }):'Notes not found'}

      <div className="create-floating-btn">
      <Link to="/addnew"><button className='btn'><i className="fa-solid fa-circle-plus"></i></button></Link>
      </div>
      </div>
    </div>
  );
};

export default Notes;
