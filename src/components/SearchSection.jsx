import React from "react";

function SearchSection({searchTerm, setSearchTerm}) {
  return (
    <div className='search-box'>
      <div className='search-header'>
        <div>
          <h2 className='search-title'>
            <i>🚀</i> Mulai Belajar
          </h2>
          <p className='search-description'>Temukan materi yang sesuai dan mulai tingkatkan pengetahuan Anda!</p>
        </div>
        <img
          src='img/ilustrasilearning.png' // Replace with the actual path to your image
          alt='Start Learning'
          className='search-image'
        />
      </div>
      <input
        type='text'
        placeholder='Cari submodule materi...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='search-input'
      />
    </div>
  );
}

export default SearchSection;
