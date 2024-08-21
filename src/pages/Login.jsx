import React from "react";

function Login() {
  return (
    <div className='container auth-container'>
      <div className='auth-head'>
        <h3>Selamat datang kembali, silahkan login</h3>
      </div>
      <div className='form-container'>
        <img src='img/registerilustration.png' alt='' />
        <div className='form-links'>
          <form>
            <input type='email' name='email' placeholder='Email' required />
            <input type='password' name='password' placeholder='Password' required />
            <p>
              <a href='#'>Forget password?</a>
            </p>
            <button className='btn auth-btn' type='submit'>
              Login
            </button>
            <div>
              <p>
                Belum punya akun? <a href='#'>Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
