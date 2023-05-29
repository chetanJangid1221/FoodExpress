import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from './Card';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
export default function NavBar() {
    const [cartView, setCartView] = useState(false)
    let data=useCart();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">FoodExpress </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav ">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/myOrder">My Orders</Link>
                                </li>
                                : ""}
                            {(!localStorage.getItem("authToken")) ?
                                <div className='d-flex'>
                                    <li className="nav-item">
                                        <Link className="nav-link " to="login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="CreateUser">Sign Up</Link>
                                    </li>
                                </div>
                                :
                                <div className='d-flex'>
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={() => { setCartView(true) }}>My Cart<span class="badge badge-pill text-danger">{data.length}</span></Link>
                                    </li>
                                    {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : null}
                                    <li className="nav-item">
                                        <Link className="nav-link " onClick={handleLogout}>Log Out</Link>
                                    </li>
                                </div>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}