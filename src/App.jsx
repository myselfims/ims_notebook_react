import { useEffect, useState,useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import React from "react";
import NoteState from "./context/notes/NoteState";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import Editor from "./components/Editor";
import AddNoteEditor from "./components/AddNoteEditor"
import Notes from "./components/Notes";
import Authform from "./components/Authform";
import Loader from "./components/Loader";
import noteContext from "./context/notes/NoteContext";
  

const App = ()=> {
  const {loader,alert} = useContext(noteContext)
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          {loader?<Loader />:''}
          <div className="container  my-4">
            <Routes>
              <Route exact path="/" element={<Notes />} />
              <Route exact path="/editor/:id" element={<Editor />} />
              <Route exact path="/addnew" element={<AddNoteEditor />} />
              <Route exact path="/authuser/login" element={<Authform  key='login' formType='Login' />} />
              <Route exact path="/authuser/signup" element={<Authform  key='signup' formType='Signup' />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
