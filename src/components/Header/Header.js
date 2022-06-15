import React from "react";
import { Link, useParams } from "react-router-dom";


export const Header = () => {
  return (
    <header>
      <h1><Link to="/">Reddit//Slice</Link></h1>
    </header>
  );
}

