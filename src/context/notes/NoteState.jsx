import noteContext from "./NoteContext";
import { useEffect, useState } from "react";


const NoteState = (props) => {
  const notesInit = [];
  const host  = 'https://imsnotebook.onrender.com/api/v1/'
  const [token,setToken] = useState(`Bearer ${localStorage.getItem('token')}`)
  const [notes, setNotes] = useState(notesInit);
  const [alert,setAlert] = useState({alert:false,type:null,message:null})
  const [loader, setLoader] = useState(false)

  useEffect(()=>{
    setToken(`Bearer ${localStorage.getItem('token')}`)
  })

  const getNote = async (id = null) => {
    if (id!=null){
      let request = await fetch(`${host}notes/${id}`, {
        method: "GET",
        headers: {
          'Accept': "*/*",
          'Content-Type' : 'application/json',
          'Authorization': token,
        },
      });
      let resp = await request.json();
      return resp;
    }else{
      let request = await fetch(`${host}notes`, {
        method: "GET",
        headers: {
          'Accept': "*/*",
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      let resp = await request.json();
      if (request.status === 401){
        return true
      }else{
        setNotes(resp)
        return false
      }

    }
  };

  const addNote = async (note) => {
    let request = await fetch(`${host}notes/`, {
      method: "POST",
      headers: {
        'Accept': "*/*",
        'Content-Type' : 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ note: note }),
    });
    let resp = await request.json();
    setAlert({alert:true,type:'success',message:'Note added.'})
    console.log(alert)
    if (request.status === 201){
    }
    return resp;
  };

  const updateNote = async (note , id) => {
    setLoader(true)
    let request = await fetch(`${host}notes/${id}/`, {
      method: "PUT",
      headers: {
        'Accept': "*/*",
        'Content-Type' : 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ note : note }),
    });
    let resp = await request.json();
    setAlert({alert:true,type:'success',message:'Note updated.'})
    setLoader(false)
    return resp;
  };

  const deleteNote = async (id) => {
    let request = await fetch(`${host}notes/${id}`, {
      method: "DELETE",
      headers: {
        'Accept': "*/*",
        'Content-Type' : 'application/json',
        'Authorization': token,
      },
    });
    if (request.status === 204){
      const newNotes = notes.filter((note)=>note.id!==id)
      setNotes(newNotes)
      return true
    }else{
      return request;
    }

  };

  const bookmarkNote = async (id,marked) => {
    console.log(!marked)
    let request = await fetch(`${host}notes/${id}/`, {
      method: "PATCH",
      headers: {
        'Accept': "*/*",
        'Content-Type' : 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({
        bookmark : !marked
      })
    });
    console.log(request.status)
    if (request.status === 200){
      getNote()
    }else{
      return request;
    }

  };

  const searchNote = (query)=>{
    const allNotes = notes
    if (String(query).length!==1){
      const searched = notes.filter((note)=>String(note.note).toLowerCase().includes(query))
      setNotes(searched)
    }else{
      getNote()
    }
    
    // setNotes(searched)
  }

  return (
    <noteContext.Provider value={{host, notes, setNotes, getNote , addNote, deleteNote, updateNote,alert,setAlert, bookmarkNote, searchNote,loader,setLoader}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
