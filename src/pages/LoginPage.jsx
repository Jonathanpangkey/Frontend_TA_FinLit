import React, {useState} from "react";
import {login} from "../api/Auth";
import {useNavigate} from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    try {
      await login(email, password);
      const role = localStorage.getItem("role");
      navigate(role === "ADMIN" ? "/admin" : "/");
    } catch (error) {
      setError("Login gagal. Silakan periksa kredensial Anda.");
    } finally {
      setLoading(false); // Set loading to false after the process is complete
    }
  };

  return (
    <div className='container auth-container'>
      <div className='auth-head'>
        <h3>Selamat datang kembali, silakan masuk</h3>
      </div>
      <div className='form-container'>
        <img src='img/registerilustration.png' alt='' />
        <div className='form-links'>
          <form onSubmit={handleSubmit}>
            <div className={`error ${error ? "open" : ""}`}>
              <p>{error}</p>
            </div>
            <input type='email' name='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div className='password-container'>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                placeholder='Kata Sandi'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type='button' className='show-hide-btn' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <i className='fa-regular fa-eye'></i> : <i className='fa-regular fa-eye-slash'></i>}
              </button>
            </div>
            <button className='btn auth-btn' type='submit' disabled={loading}>
              {loading ? "Loading..." : "Masuk"}
            </button>
            <div>
              <p>
                Belum punya akun? <a href='/register'>Daftar</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
