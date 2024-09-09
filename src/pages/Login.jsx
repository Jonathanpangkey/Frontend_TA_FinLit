import React, {useState} from "react";
import {login} from "../api/Auth";
import {useNavigate} from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/home"); // Redirect to dashboard after successful login
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className='container auth-container'>
      <div className='auth-head'>
        <h3>Welcome back, please log in</h3>
      </div>
      <div className='form-container'>
        <img src='img/registerilustration.png' alt='' />
        <div className='form-links'>
          <form onSubmit={handleSubmit}>
            <div className={`error ${error ? "open" : ""}`}>
              <p>{error}</p>
            </div>
            <input type='email' name='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type='password' name='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <p>
              <a href='#'>Forgot password?</a>
            </p>
            <button className='btn auth-btn' type='submit'>
              Login
            </button>
            <div>
              <p>
                Don't have an account? <a href='/register'>Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
