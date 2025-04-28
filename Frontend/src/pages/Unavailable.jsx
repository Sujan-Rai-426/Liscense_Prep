import React from 'react'

function Unavailable(props) {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" style={props.mode}>
            <div className="text-center p-5 shadow-lg rounded bg-light" style={{ maxWidth: '400px', width: '100%'}}>
                <h2 className="text-danger mb-4">Feature Unavailable</h2>
                <p className="text-muted">This feature will be available soon. Stay tuned!</p>
            </div>
        </div>
    )
}

export default Unavailable