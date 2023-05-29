import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { post } from '../../backend/Routes/CreateUser';

export default function Signup() {
    let navigate = useNavigate()
    const [Credential, setCredential] = useState({ name: "", email: "", password: "", geoloaction: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/CreateUser", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                name: Credential.name,
                email: Credential.email,
                password: Credential.password,
                location: Credential.geoloaction
            })
        });
        console.log(response.status);
        const json = await response.json();
        console.log("response for signUp page is "+json);
        // if(!json.failure){
        //     alert("Enter valid credential")
        // }
        // console.log(response.status);
        // if (response.status !== 200) {
        //     alert("Enter valid credential")
        // }
        if (json.success) {
            navigate("/")
        }

    }
    const handleChange = (ex) => {
        setCredential({ ...Credential, [ex.target.name]: ex.target.value })

    }
    return (
        <div className='container mt-5'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={Credential.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={Credential.email} onChange={handleChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={Credential.password} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="Location" className="form-label">Location</label>
                    <input type="text" className="form-control" name='geoloaction' value={Credential.geoloaction} onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-success">Submit</button>
                <Link className='btn btn btn-danger m-3' to={"/login"}>Already a User</Link>
            </form>


        </div>
    )
}
