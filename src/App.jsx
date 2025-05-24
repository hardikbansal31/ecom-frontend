import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/navbar.jsx";
import Home from "./components/Home.jsx";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Other routes like product details or cart */}
      </Routes>
    </Router>
  );
}

export default App;
