import { Route, Routes } from "react-router";
import { Layout } from "./Layout"
import { Home } from "./features/products/Home"
import { Login } from "./features/auth/Login";
import { Cart } from "./features/cart/Cart";
import { ProductDetail } from "./features/products/ProductDetail";
import { Register } from "./features/auth/Register";
import { NotFound } from "./components/NotFound";

function App() {

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
