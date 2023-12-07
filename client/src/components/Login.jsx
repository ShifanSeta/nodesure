import { useState } from "react"
import { useRef } from "react";
import Api from "../API/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const userRef = useRef();
    const navigate = useNavigate();
    const passwordRef = useRef();
    const [message, setMessage] = useState(undefined);
    const [status, setStatus] = useState(undefined);
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(userRef.current.value && passwordRef.current.value){
          // try {
            let body = {
              username: userRef.current.value,
              password: passwordRef.current.value,
            }
            Api.login(body)
            .then((resp) => {
              if(resp && resp.data && resp.data.status){
                // toast.success(resp.data.message);
                setMessage(resp.data.message);
                setStatus(resp.data.status);
                localStorage.setItem('username',resp.data.username);
                localStorage.setItem('name',resp.data.name);
                localStorage.setItem('_id',resp.data._id);
                localStorage.setItem('dob',resp.data.dob);
                localStorage.setItem('mobile',resp.data.mobile);
                setTimeout(() => {
                  navigate("/dashboard");                  
                }, 1000);
              }else{
                setMessage(resp.data.message);
                setStatus(resp.data.status);
              }
            })
            .catch((error) => {
              setMessage(error.response.data.message);
                setStatus(false);
              
            })    
        }else{
          toast.error("Please fill all required fields.");
        }
  
      };
  return (
    <div className="bg-light h-100 min-vh-100">
        <form onSubmit={handleSubmit} className="container d-flex min-vh-100 justify-content-center">
            <div className="min-vh-100 row d-flex justify-content-center align-items-center text-center w-100 h-100">
                <div className="col-lg-4 col-md-8 col-sm-12 col-xs-12 bg-white rounded shadow p-4">
                    <h1 className="pb-5 pt-3">SignIn as User</h1>
                    <div className="pb-3">
                        <div className="form-floating mb-3">
                            <input type="email" ref={userRef} className="form-control bg-light shadow-sm" id="floatingInput" placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Username <span className="text-danger">*</span></label>
                        </div>
                        <div className="form-floating">
                            <input type="password" ref={passwordRef} className="form-control bg-light shadow-sm" id="floatingPassword" placeholder="Password" />
                            <label htmlFor="floatingPassword">Password <span className="text-danger">*</span></label>
                        </div>
                        <div className="error-container my-2">
                            <div className={"alert p-2 " + (status === true ? "alert-success" : status === false ? "alert-danger" : '') } role="alert">
                            {message}
                            </div>
                        </div>
                        
                        <button className="btn btn-primary my-3" type="submit">SignIn</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Login