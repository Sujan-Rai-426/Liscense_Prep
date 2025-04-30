import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/Navbar.css'; 

function Navbar(props) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                <div className="container-fluid">

                    {/* Triggre button to toggle the mode */}
                    <Link onClick={props.toggleMode} className='px-10'> 
                        <b>
                            {props.mode.backgroundColor === '#f5f7fa' ? (
                                <i className="bi bi-brightness-high-fill mx-3 fs-3"></i>
                            ) : (
                                <i className="bi bi-brightness-low-fill mx-3 fs-3"></i>
                            )}
                        </b>
                    </Link>

                    <Link className="navbar-brand" to="/admin">
                        <b>Er.Liscense <sup>MCQ</sup></b>
                    </Link>
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/"> <b>Home</b> </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin"> <b>Add-Questions</b> </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dummy_exam"> <b>Dummy-Exam</b> </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Visit
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><Link className="dropdown-item" to="https://www.sujan140.com.np/">Developer</Link></li>
                                    <li><Link className="dropdown-item" to="/unavailable"> BCT Notes </Link></li>
                                    <li><Link className="dropdown-item" to="/unavailable"> BCT License Notes </Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
