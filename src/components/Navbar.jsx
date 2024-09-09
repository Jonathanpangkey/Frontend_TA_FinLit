import React, {useState} from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    window.location.href = "/login";
  };

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='navbar-toggle' onClick={toggleMenu}>
          <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </div>
        <div className='navbar-logo'>FINANCESTUDY</div>
        <div className={`navbar-menu ${isOpen ? "open" : ""}`}>
          <ul>
            <li>Profil</li>
            <li>Favorit/Bookmark</li>
            <li>Tentang</li>
            <li>Deskripsi</li>
            <li onClick={logout} style={{cursor: "pointer"}}>
              Logout
            </li>
          </ul>
        </div>
        <div className='navbar-profile'>
          <i className='fa-solid fa-user'></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
