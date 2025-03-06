import logo from "./logo.svg";
//import { Button, DatePicker, version } from "antd";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Items from "./pages/Items";
import CartPage from "./pages/CartPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Customers from "./pages/Customers";
import Bills from "./pages/Bills";
import Admin from "./pages/Admin";
import Categories from "./pages/Categories";
import Business from "./pages/Setup";
import ImportCSV from "./pages/importCSV";
import "antd/dist/reset.css"; //Importar los estilos de antd

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/items"
            element={
              <ProtectedRoute>
                <Items />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bills"
            element={
              <ProtectedRoute>
                <Bills />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <ProtectedRoute>
                <Customers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route
            path="/import"
            element={
              <AdminRoute>
                <ImportCSV />
              </AdminRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <AdminRoute>
                <Categories />
              </AdminRoute>
            }
          />
          <Route
            path="/setup"
            element={
              <AdminRoute>
                <Business />
              </AdminRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  if (localStorage.getItem("status") && localStorage.getItem("alias")) {
    {
      return children;
    }
  } else {
    return <Navigate to="/login" />;
  }
}

export function AdminRoute({ children }) {
  const userStatus = localStorage.getItem("status");
  console.log("Status:", userStatus); // Renombrar la variable
  if (userStatus === "admin") {
    return children;
  } else {
    return <Navigate to="/home" />;
  }
}
