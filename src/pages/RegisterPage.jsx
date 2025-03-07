import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {register, login} from "../api/Auth";

function RegisterPage() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true); // Set loading to true when the form is submitted
    const userData = {
      firstname,
      lastname,
      email,
      password,
    };

    try {
      await register(userData);
      await login(email, password); // Automatically log the user in after registration
      navigate("/"); // Redirect to dashboard
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the process is complete
    }
  };

  return (
    <div className='container auth-container'>
      <div className='auth-head'>
        <h3>Selamat Datang!!</h3>
        <p className='muted'>Bergabunglah dengan kami dan tingkatkan pengetahuan finansial Anda!!</p>
      </div>
      <div className='form-container'>
        <img className='regis-img' src='img/registerilustration.png' alt='' />
        <div className='form-links'>
          <form onSubmit={handleSubmit}>
            <div className={`error ${error ? "open" : ""}`}>
              <p>{error}</p>
            </div>
            <input type='text' name='firstName' placeholder='Nama Depan' value={firstname} onChange={(e) => setFirstName(e.target.value)} required />
            <input type='text' name='lastName' placeholder='Nama Belakang' value={lastname} onChange={(e) => setLastName(e.target.value)} required />
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
            <div className='password-container'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name='confirmPassword'
                placeholder='Konfirmasi Kata Sandi'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type='button' className='show-hide-btn' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <i className='fa-regular fa-eye'></i> : <i className='fa-regular fa-eye-slash'></i>}
              </button>
            </div>
            <button className='btn auth-btn' type='submit' disabled={loading}>
              {loading ? "Loading..." : "Daftar"}
            </button>
            <div>
              <p>
                Sudah punya akun? <a href='/login'>Masuk</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
