import React from 'react'
import { Link } from 'react-router-dom'
 
function Navbar(props) {
   return (
       <nav className="navbar" role="navigation" aria-label="main navigation">
           <div id="navbarBasicExample" className="navbar-menu">
               <div className="navbar-start">
               <Link to ="/add">
                <button className="button is-light">Home</button>
                </Link>
                <Link to ="/about">
                <button className="button is-light">Developer</button>
                </Link>
               </div>
               <div className="navbar-end">
                   <div className="navbar-item">
                       <div className="buttons">
                           <h3 className="navbar-item">
                               {props.username}
                           </h3>
                           <Link to ="/history">
                                <button className="button is-light">
                                History
                           </button>
                           </Link>
                           <Link to ="/setting">
                                <button className="button is-light">
                               Edit
                           </button>
                           </Link>
                           <button className="button is-light" onClick={props.logout}>
                               Logout
                           </button>
                       </div>
                   </div>
               </div>
           </div>
       </nav>
 
   )
    
}
 
export default Navbar