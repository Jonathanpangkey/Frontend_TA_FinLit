import React from "react";

function Register() {
  return (
    <div className='container auth-container'>
      <div className='auth-head'>
        <h3>Selamat datang !!</h3>
        <p className='muted'>Yuk belajar finansial Lorem ipsum dolor sit amet.</p>
      </div>
      <div className='form-container'>
        <img className='regis-img' src='img/registerilustration.png' alt='' />
        <div className='form-links'>
          <form>
            <input type='text' name='nama_lengkap' placeholder='Nama Lengkap' required />
            <input type='email' name='email' placeholder='Email' required />
            <input type='text' name='username' placeholder='Username' required />
            <input type='password' name='password' placeholder='Password' required />
            <input type='password' name='konfirmasi_password' placeholder='Konfirmasi Password' required />
            <button className='btn auth-btn' type='submit'>
              Register
            </button>
            <div>
              <p>
                Sudah punya akun? <a href='#'>Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
