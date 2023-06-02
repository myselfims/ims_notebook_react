import React, { useEffect, useState,useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const Alert = () => {
  const {alert,setAlert} = useContext(noteContext)
  const [type,setType] = useState(alert.type)
  const cap = () =>{
    let first = String(type).at(0)
    let out = first.toUpperCase()+String(type).slice(1)
    setType(out)
  }
  useEffect(()=>{
    cap()
    console.log(alert)
    setTimeout(() => {
      setAlert({alert:false,type:null,message:null})
    }, 1500);
  },[])
  return (
    <div className="alert-container">
      <div className={`alert position-absolute alert-${alert.type} alert-dismissible fade show my-2`} role="alert">
        <strong>{type==='Danger'?'Error':type} !</strong> {alert.message}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default Alert;
