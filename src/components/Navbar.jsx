import React, {useState} from "react";
import {fetchUserInfo} from "../api/User";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    window.location.href = "/login";
  };

  const handleFetchUserInfo = async () => {
    try {
      const data = await fetchUserInfo();
      setUserInfo(data);
      setIsPopupOpen(true);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='navbar-toggle' onClick={toggleMenu}>
          <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </div>
        <div className='navbar-logo'>
          <img className='logo' src='/img/logonav.png' alt='' /> <p>FinLit</p>
        </div>
        <div className={`navbar-menu ${isOpen ? "open" : ""}`}>
          <ul>
            <li>Tentang</li>
            <li>Deskripsi</li>
            <li onClick={logout} style={{cursor: "pointer"}}>
              Logout
            </li>
          </ul>
        </div>
        <div className='navbar-profile' onClick={handleFetchUserInfo}>
          <i className='fa-solid fa-user'></i>
        </div>
      </div>
      {isPopupOpen && (
        <div className='popup-overlay'>
          <div className='popup-content'>
            <button className='close-button' onClick={() => setIsPopupOpen(false)}>
              &times;
            </button>
            <h2>Informasi Pengguna</h2>
            {userInfo ? (
              <div>
                <p>Nama Depan: {userInfo.firstname}</p>
                <p>Nama Belakang: {userInfo.lastname}</p>
                <p>Email: {userInfo.email}</p>
              </div>
            ) : (
              <p>Memuat...</p>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
