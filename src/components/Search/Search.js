import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../features/search/searchSlice';

export const Search = () => {
  const [searchTermLocal, setSearchTermLocal] = useState('');
  const searchTerm = useSelector((state) => state.search.searchTerm);
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchTermLocal(searchTerm);
  }, [searchTerm]);

  const onSearchTermChange = (e) => {
    setSearchTermLocal(e.target.value);
  }

  const onSearchTermSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchTermLocal));
    history.push("/search");
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

