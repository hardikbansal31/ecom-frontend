import { useState } from "react";

import Nav from "./components/navbar.jsx";
import Carous from "./components/feat-carousel.jsx";

function App() {
  function print() {
    console.log("jello");
  }

  return (
    <>
      <Nav />
      <Carous />
    </>
  );
}

export default App;
