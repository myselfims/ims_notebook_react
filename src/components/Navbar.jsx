import React, { useState } from 'react'
import {Link,useLocation, useNavigate} from 'react-router-dom';
import { useContext,useEffect } from 'react';
import noteContext from '../context/notes/NoteContext';
import Alert from './Alert';
import Notes from './Notes';

export default function Navbar() {
  const {searchNote,alert,notes,setNotes,bookmarks,getNote} = useContext(noteContext)
  const [query,setQuery] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  const handleSearch = (e)=>{
    setQuery(e.target.value)
    searchNote(String(query).toLowerCase())
  }

  const logout = ()=>{
    localStorage.setItem('username','')
    localStorage.setItem('token','')
    navigate('/authuser/login')
  }

  const handleHome = ()=>{
    setNotes(getNote())
    navigate('/')
  }
  const handleBookmark = ()=>{
    setNotes(notes.filter((note)=>note.bookmark===true))
    navigate('/')
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">IMS-Notebook</Link>

    {localStorage.getItem('username')!==''?
    <button className="navbar-toggler" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
      <span className="navbar-toggler-icon"></span>
    </button>:''}

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav d-flex align-items-center me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?'active':''}`} aria-current="page" to="/">Home</Link>
        </li>
        {localStorage.getItem('username')!==''?
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/addnew'?'active':''}`} to="/addnew"><button className='btn btn-outline-primary'>Create</button></Link>
        </li>:''}
        
      </ul>
      {localStorage.getItem('username')!==''?
      <div className="d-flex search-container text-light">
          <input onChange={handleSearch} value={query} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      </div>
      :''}

      {localStorage.getItem('username')!==''?
      <div className='profile-div text-light'>
        <div className="profilepic">
          {/* {localStorage.getItem('username')!==null? localStorage.getItem('username').slice(0,1).toUpperCase():""} */}
        </div>
        <select onChange={logout} className="form-select" aria-label="Default select example">
          <option defaultChecked >{localStorage.getItem('username')}</option>
          <option value="1">Logout</option>
        </select>
      </div>:''}
    </div>
    {localStorage.getItem('username')!==''?
      <div id='mobile-search-container' >
        <div className="d-flex my-2 search-container text-light">
            <input onChange={handleSearch} value={query} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        </div>
      </div>:''}

  </div>
</nav>

<div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header bg-dark">
  <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>

    <div className="sidebar-head text-light">
      <div className="profilepic text-dark shadow">
            {localStorage.getItem('username').slice(0,1).toUpperCase()}
      </div>
      <h3>{localStorage.getItem('username')}</h3>
    </div>
  </div>
  <div className="offcanvas-body">
    <div className="my-4 container">
      <ul className='p-0'>
        <li data-bs-dismiss="offcanvas" aria-label="Close" className='card my-2'><button onClick={handleHome} className='btn btn-outline-primary' ><i className="fa-solid fa-home"></i> Home</button></li>

        <li data-bs-dismiss="offcanvas" aria-label="Close" className='card my-2'><button onClick={handleBookmark} className='btn btn-outline-primary'><i className="fa-solid fa-star"></i> Bookmarks</button></li>

        <li data-bs-dismiss="offcanvas" aria-label="Close" className='card my-2'><button onClick={logout} className='btn btn-outline-primary'><i className="fa-solid fa-right-from-bracket"></i> Logout</button></li>
      </ul>
    </div>
  </div>
</div>
    {alert.alert ? <Alert /> : ""}
    </div>
  )
}
