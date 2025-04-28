import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Admin_Signup(props) {
    return (
        
            <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#f8f9fa", ...props.mode }}>
                <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%", backgroundColor: "white" , ...props.mode }}>
                    <h2 className="text-center mb-4">Admin Signup</h2>
                    <div className="alert alert-info text-center" role="alert">
                        Need to contact the team to become part of the Admin team.
                    </div>
                    <Link to='https://www.sujan140.com.np/contact' className="btn btn-primary w-100 mt-3" > Contact Team </Link>
                </div>
            </div>
        
    );
}

export default Admin_Signup;
