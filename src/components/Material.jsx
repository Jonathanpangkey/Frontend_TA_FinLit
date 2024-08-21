import React, {useState} from "react";

function Material({title, completed, total}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='material-box'>
      <div className='material-header' onClick={toggleOpen}>
        <div className='material-title'>
          <h3>{title}</h3>
          <p>
            {completed}/{total} Completed
          </p>
        </div>
        <div className='material-toggle'>
          <i className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
        </div>
      </div>
      {isOpen && (
        <div className='material-content'>
          <p>More details about this material...</p>
        </div>
      )}
    </div>
  );
}

export default Material;
