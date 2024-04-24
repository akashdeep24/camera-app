import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Welcome to the Camera App!</h1>
            <div className='buttons-view'>
                <button onClick={()=> navigate("/Gallery")}>
                    <h2>Checkout Gallery</h2>
                </button>
                <button onClick={()=> navigate("/Camera")}>
                    <h2>Click Photos</h2>
                </button>
            </div>
        </div>
    )
}

export default Home
