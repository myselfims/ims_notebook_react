import React,{useContext, useState} from 'react'
import { Link,useNavigate,useParams } from 'react-router-dom'
import noteContext from '../context/notes/NoteContext'

const AddNoteEditor = (props) => {
  const navigate = useNavigate()
    const [note,setNote] = useState('')
    const {addNote,setAlert, bookmarkNote} = useContext(noteContext)
    const [copy, setCopy] = useState(false)

    const handlChange = (e)=>{
        setNote(e.target.value)
    }

    const add = ()=>{
      if(note!==''){
        console.log(String(note).length)
        addNote(note) 
        navigate('/')
      }else{
        setAlert({alert:true,type:'warning',message:'Please type something!'})
      }
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
 
            <h3 htmlFor="exampleFormControlTextarea1" className="form-label">Add new note</h3>

            <div className="d-flex flex-row">
              <button onClick={copyText} className="btn" >
                <i className={`fa-solid fa-${copy===true?'check':'copy'}`}></i>
              </button>
              <button onClick={() => { bookmarkNote(note.id,note.bookmark); }} className="btn" > 
                <i className={`fa-${note.bookmark ? 'solid':'regular'} fa-star`}></i>
              </button>
            </div>
        </div>

        <textarea rows={10} onChange={handlChange} value={note} className="textarea shadow form-control" id="exampleFormControlTextarea1" placeholder='Type your note here'></textarea>
      </div>
      <button onClick={add} className='btn btn-success'><i className='fa-solid fa-cloud-arrow-up'></i> Save</button>
    </div>
  )
}

export default AddNoteEditor;
