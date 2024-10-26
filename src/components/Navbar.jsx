import React, {useState} from "react";
import {fetchUserInfo} from "../api/User";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

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

  const handleToHandson = () => {
    Swal.fire({
      title: "Apakah Anda sudah menyelesaikan modul pengelolaan keuangan?",
      text: "Pastikan Anda telah menyelesaikan semua materi dan quiz sebelum melanjutkan ke hands-on.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, saya sudah selesai",
      cancelButtonText: "Belum",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("submodule/5/handson");
      }
    });
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
            <li onClick={handleToHandson}>Kelola Uang</li>
            <li onClick={logout}>Logout</li>
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
