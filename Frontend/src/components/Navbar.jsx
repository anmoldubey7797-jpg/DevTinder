import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { removerUser } from '../utils/userSlice'

const Navbar = () => {
  const user=useSelector((store)=>store.user)
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogout=async()=>{
    try{
      await axios.post(BASE_URL +"/logout",{withCredentials:true})
     dispatch(removerUser())
     return navigate("/login")
    }
    catch(error){
      console.log(error)
    }
  }
  
 return (
  <div className="navbar bg-gray-500 shadow-sm px-3 md:px-6">
    
    {/* LEFT */}
    <div className="navbar-start">
      <Link
        to="/"
        className="btn btn-ghost text-lg md:text-xl p-0 text-white"
      >
        DevTinder
      </Link>
    </div>

    {/* RIGHT */}
    {user && (
      <div className="navbar-end flex items-center gap-1 md:gap-3">
        
        
        <p className="hidden sm:block mr-2 text-sm md:text-base max-w-[120px] truncate">
          Welcome, {user.firstName}
        </p>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar w-10 h-10 md:w-12 md:h-12"
          >
            <div className="w-full rounded-full">
              <img
                alt="Profile"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-48 md:w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><Link to="/connection">Connections</Link></li>
            <li><Link to="/request">Request</Link></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    )}
  </div>
);
}

export default Navbar