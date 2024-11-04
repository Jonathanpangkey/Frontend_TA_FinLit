import React, {useState} from "react";
import {login} from "../api/Auth";
import {useNavigate} from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      const role = localStorage.getItem("role");
      navigate(role === "ADMIN" ? "/admin" : "/");
    } catch (error) {
      setError("Login gagal. Silakan periksa kredensial Anda.");
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
            <input type='password' name='password' placeholder='Kata Sandi' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <p>
              <a href='#'>Lupa kata sandi?</a>
            </p>
            <button className='btn auth-btn' type='submit'>
              Masuk
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
