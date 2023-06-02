import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const Authform = (props) => {
  const { host,setLoader,alert,setAlert } = useContext(noteContext);
  const [formType, setFormType] = useState(
    String(props.formType).toLowerCase()
  );
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfPassword = (e) => {
    setConfPassword(e.target.value);
  };

  const authUser = async () => {
    if (username != "" && password != "") {
      setLoading(true)
      if (formType === "signup") {
        if(confpassword===password){
          let request = await fetch(`${host}register/`, {
            method: "POST",
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
            }),
          });
          let resp = await request.json();
          if(request.status === 201){
            setLoading(false)
            setAlert({alert:true,type:'success',message:'Registered successfully please login!'})
            navigate('/authuser/login')
          }else if(request.status===400){
            setLoading(false)
            setAlert({alert:true,type:'danger',message:'Please enter correct details or try another username!'})
            
          }
        }else{
          setLoading(false)
          setAlert({alert:true,type:'danger',message:'Password not matched!'})
        }
      } else if (formType === "login") {
        try{
        let request = await fetch(`${host}token/`, {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        let resp = await request.json();
        if (request.status === 200){
          setLoading(false)
          localStorage.setItem("token", resp.access);
          localStorage.setItem("username", username);
          navigate("/");
        }else if(request.status === 401){
          setAlert({alert:true,type:'danger',message:'User not found please check credentials or signup!'})
        }
        }
        catch{
          setLoading(false)
          setAlert({alert:true,type:'danger',message:'Something went wrong!'})
        }
      }
    } else {
      setAlert({alert:true,type:'danger',message:'Please enter valid details!'})
    }
  };

  return (
    <div className="auth-container container">
      <div className="user-logo-div d-flex justify-content-center">
        <i className="fa-solid fa-user"></i>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Username
        </label>
        <input
          type="email"
          className={`form-control ${username.length>0?'border-green':'border-red'}`}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={handleUsername}
          value={username}
        />
        <i className="bi bi-check"></i>
        {formType === "signup" ? (
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${email.length>0?'border-green':'border-red'}`}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleEmail}
              value={email}
            />
          </div>
          
          
        ) : (
          ""
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className={`form-control ${formType==='signup'?(confpassword===password&&password.length>0?'border-green':'border-red'):password.length>0?'border-green':'border-red'}`}
          id="exampleInputPassword1"
          onChange={handlePassword}
          value={password}
        />
      </div>
      {formType === "signup" ? (
          <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className={`form-control ${formType==='signup'?(confpassword===password&&password.length>0?'border-green':'border-red'):''}`}
            id="confirm-password"
            onChange={handleConfPassword}
            value={confpassword}
          />
        </div>
          
          
        ) : (
          ""
        )}
      {formType === "login" ? (
        <div className="mb-3 form-check">
          <label className="form-check-label" htmlFor="exampleCheck1">
            Don't have any account ? <Link to="/authuser/signup">Signup</Link>
          </label>
        </div>
      ) : (
        <div className="mb-3 form-check">
          <label className="form-check-label" htmlFor="exampleCheck1">
            Already have an account ? <Link to="/authuser/login">Login</Link>
          </label>
        </div>
      )}

      <div className="d-grid gap-2">
        <button className="btn btn-primary" key={"submitbtn"} disabled={loading?true:false} onClick={authUser} >
          {props.formType+' '}
          {loading?
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>:''}
        </button>
      </div>
    </div>
  );
};

export default Authform;
