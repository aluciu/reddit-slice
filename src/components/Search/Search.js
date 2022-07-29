import React, { useState } from "react";
import { useHistory } from "react-router-dom";


export const Search = () => {
  const [searchTermLocal, setSearchTermLocal] = useState('');
  let history = useHistory();

  const onSearchTermChange = (e) => {
    setSearchTermLocal(e.target.value);
  }

  const onSearchTermSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${searchTermLocal}`);
  };

  return (
    <div>
      <form onSubmit={onSearchTermSubmit}>
        <input
          type="text"
          placeholder="Search and hit enter"
          value={searchTermLocal}
          onChange={onSearchTermChange}
          aria-label="Search"
        />
      </form>
    </div>
  );
}

