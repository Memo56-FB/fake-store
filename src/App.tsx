import { Route, Routes } from "react-router";
import { Home } from "./features/products/Home"
import { Login } from "./features/auth/Login";
import { Cart } from "./features/cart/Cart";
import { ProductDetail } from "./features/products/ProductDetail";
import { Register } from "./features/auth/Register";
import { NotFound } from "./components/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuthStore } from "./features/auth/authStore";
import { useStore } from 'zustand';

function App() {
  const token = useStore(useAuthStore, (state) => state.token)
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute token={token} />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
