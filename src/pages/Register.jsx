import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {register, login} from "../api/Auth";

function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const userData = {
      firstname,
      lastname,
      email,
      password,
    };

    try {
      await register(userData);
      await login(email, password); // Automatically log the user in after registration
      navigate("/home"); // Redirect to dashboard
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className='container auth-container'>
      <div className='auth-head'>
        <h3>Welcome!!</h3>
        <p className='muted'>Join us and improve your financial knowledge!!</p>
      </div>
      <div className='form-container'>
        <img className='regis-img' src='img/registerilustration.png' alt='' />
        <div className='form-links'>
          <form onSubmit={handleSubmit}>
            <div className={`error ${error ? "open" : ""}`}>
              <p>{error}</p>
            </div>
            <input type='text' name='firstName' placeholder='First Name' value={firstname} onChange={(e) => setFirstName(e.target.value)} required />
            <input type='text' name='lastName' placeholder='Last Name' value={lastname} onChange={(e) => setLastName(e.target.value)} required />
            <input type='email' name='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type='password' name='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button className='btn auth-btn' type='submit'>
              Register
            </button>
            <div>
              <p>
                Already have an account? <a href='/login'>Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
