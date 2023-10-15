import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' })
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password } = credentials

    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirect 
      localStorage.setItem('token', json.authtoken)
      navigate("/login");
      props.showAlert("Account created Successfully","success")
    } else {
      props.showAlert("Invalid Credentials","danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='container mt-2'>
      <h2>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" minLength={5} required id="password" name='password' onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" minLength={5} required id="cpassword" name='cpassword' onChange={onChange} />
        </div>
        <button disabled={
          credentials.name.length < 3 ||
          credentials.email.length < 5 ||
          credentials.password.length < 5 ||
          credentials.cpassword.length < 5
        } type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  )
}

export default Signup