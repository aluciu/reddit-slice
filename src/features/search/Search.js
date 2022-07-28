import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { loadSearchResults } from "./searchSlice";

const Search = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const searchTerm = queryParams.get('term');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSearchResults(searchTerm));
  });

  return (
    <div>
      Search {searchTerm}
    </div>
  );
};

export default Search;