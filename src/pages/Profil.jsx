import React from "react";
import Navbar from "../components/Navbar";

function Profil() {
  return (
    <>
      <Navbar />
      <div className='container'>
        <h3 className='profil-head'>Profil</h3>
        <form className='profil-form'>
          <div class='input-container'>
            <label htmlFor='name_lengkap'>Nama: </label>
            <div class='input-wrapper'>
              <input type='text' name='nama_lengkap' required />
              <span class='icon'>
                <i class='fas fa-pen'></i>
              </span>
            </div>
          </div>

          <div class='input-container'>
            <label htmlFor='email'>Email:</label>
            <div class='input-wrapper'>
              <input type='email' name='email' required />
              <span class='icon'>
                <i class='fas fa-pen'></i>
              </span>
            </div>
          </div>

          <div class='input-container'>
            <label htmlFor='username'>Username:</label>
            <div class='input-wrapper'>
              <input type='text' name='username' required />
              <span class='icon'>
                <i class='fas fa-pen'></i>
              </span>
            </div>
          </div>

          <div>
            <a href='#'>Ganti password ?</a>
          </div>
        </form>
      </div>
    </>
  );
}

export default Profil;
