import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search for a video..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button className="search-button" type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
