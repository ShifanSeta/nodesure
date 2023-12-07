import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Navbar = () => {
  const navigate = useNavigate();

  const doLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('_id');
    localStorage.removeItem('dob');
    localStorage.removeItem('mobile');
    toast.success('Logout successful.')
    setTimeout(() => {
      navigate("/");                  
    }, 500);
  }
  return (
    <div>
        <nav className="navbar bg-body-tertiary">
        <div className="container">
            <Link to='/' className="navbar-brand" >DashBoard</Link>
            <button type="button" className="btn btn-primary btn-sm" onClick={()=>{doLogout()}} >Logout</button>
        </div>
        </nav>
    </div>
  )
}

export default Navbar