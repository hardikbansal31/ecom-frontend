import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/navbar.jsx";
import Home from "./components/Home.jsx";
import Cart from './components/Cart.jsx';
import ProductPg from "./components/ProductPg.jsx";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductPg />} />
      </Routes>
    </>
  );
}

export default App;
