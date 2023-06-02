import React,{useContext, useEffect, useState} from 'react'
import { Link,useParams, useResolvedPath } from 'react-router-dom'
import noteContext from '../context/notes/NoteContext'

const Editor = (props) => {
  const {id} = useParams()
  const [note,setNote] = useState('')
  const [newNote, setNewNote] = useState('')
  const {getNote,notes,updateNote,deleteNote,bookmarkNote,setAlert} = useContext(noteContext)
  const date = new Date(String(note.date).slice(0,10))
  const [savebtn,setSaveBtn] = useState('Save')
  const [copy,setCopy] = useState(false)
  
  useEffect(()=>{
    const n = notes.filter((note)=>note.id==Number(id))
    setNewNote(n[0].note)
    setNote(n[0])
    console.log(n[0].bookmark)
    console.log(note)
  },[])

  const handleNote = (e)=>{
    setSaveBtn('Save')
    setNewNote(e.target.value)
  }

  const saveNote = ()=>{
    setSaveBtn('Saving...')
    updateNote(newNote,note.id)
    setSaveBtn('Saved')
  }

  const copyText = ()=>{
    if (note!==''){
      setCopy(true)
      navigator.clipboard.writeText(note.note)
      setTimeout(() => {
        setCopy(false)
      }, 1000);

    }else{
      setAlert({alert:true,type:'warning',message:'Nothing to copy'})
    }
  }
  
  return (
    <div>
        <Link to={'/'}><button className='btn btn-outline-primary'><i className="fa-solid fa-arrow-left"></i></button></Link>
      <div className="mb-3">
        <div className="card d-flex flex-row shadow justify-content-between bg-light p-2 my-4">

        <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-primary">
        {`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}
        <span className="visually-hidden">unread messages</span>
      </span>
 
            <h3 htmlFor="exampleFormControlTextarea1" className="form-label">Edit note</h3>

            <div className="d-flex flex-row">
              <button onClick={copyText} className="btn" >
                <i className={`fa-solid fa-${copy===true?'check':'copy'}`}></i>
              </button>
              <button onClick={() => { deleteNote(note.id); }} className="btn" >
                <i className="fa-solid fa-trash"></i>
              </button>
              <button onClick={() => { bookmarkNote(note.id,note.bookmark); }} className="btn" > 
                <i className={`fa-${note.bookmark ? 'solid':'regular'} fa-star`}></i>
              </button>
            </div>
        </div>
    
        <textarea rows={10} onChange={handleNote} value={newNote} className="textarea shadow form-control" id="exampleFormControlTextarea1" placeholder='Type your note here'></textarea>
      </div>
      <button onClick={saveNote} className='btn btn-success'><i className={`fa-solid fa-${savebtn==='Saved'?'check':'cloud-arrow-up'}`}></i> {savebtn}</button>
    </div>
  )

  }
export default Editor
