import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/navbar.jsx";
import Home from "./components/Home.jsx";
import Cart from "./components/Cart.jsx";
import ProductPg from "./components/ProductPg.jsx";
import Footer from "./components/footer.jsx";
import Register from "./components/register.jsx";
import Login from "./components/login.jsx";
import Orders from "./components/Orders.jsx";
import CheckOut from "./components/CheckOut.jsx";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductPg />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout/:productId" element={<CheckOut />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
