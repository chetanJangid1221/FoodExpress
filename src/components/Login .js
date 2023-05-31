import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    let navigate = useNavigate()
    const [Credential, setCredential] = useState({ email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const response = await fetch("http://localhost:5000/LoginUser", {
        const response = await fetch("https://foodexp.onrender.com/LoginUser", {

            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                email: Credential.email,
                password: Credential.password,
            })

        });
        // console.log(response.status);
        // if (response.status !== 200) {
        //     alert("Enter valid credential")
        // }
        // if (response.status === 200) {
        //     navigate("/")
        // }
        const json = await response.json()
        console.log(json);
        if(!json.success){
            alert("Enter valid credential")
        }
        if (json.success) {
            localStorage.setItem("UserEmail",Credential.email)
            localStorage.setItem("authToken",json.authToken)
            console.log("------------------authToken generated successgfully---------------------------------------------------------")
            console.log(localStorage.getItem("authToken"))
            navigate("/")
        }

    }
    const handleChange = (ex) => {
        setCredential({ ...Credential, [ex.target.name]: ex.target.value })

    }
    return (
        <div>
            <div className='container mt-5'>
                <form onSubmit={handleSubmit}>
                <div id="emailHelp" className="form-text">Plese use the Below given credential to Login</div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        
                        <input type="email" className="form-control" name='email' value={Credential.email} onChange={handleChange} />
                        <div id="emailHelp" className="form-text">DemoUser : user@user.com</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={Credential.password} onChange={handleChange} />
                        <div id="emailHelp" className="form-text">DemoPassword : user123</div>

                    </div>

                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link nk className='btn btn btn-danger m-3' to={"/CreateUser"}>Creat account</Link>
                </form>


            </div>
        </div>
    )
}