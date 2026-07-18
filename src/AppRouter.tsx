import { BrowserRouter, Route, Routes } from "react-router-dom";
import UploadImages from "./pages/admin/UploadImages";
import PrivateRoute from "./pages/PrivateRoute";
import Login from "./pages/admin/Login";
import HomeAdmin from "./pages/admin/HomeAdmin";
import { ToastContainer } from "react-toastify";
import Home from "./pages/public/Home";
import Rent from "./pages/public/Rent";
import Sale from "./pages/public/Sale";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={2000} />
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/alugueis-temporada" element={<Rent />} />
        <Route path="/venda" element={<Sale />} />
        <Route path="/admin" element={<Login />} />

        {/* rotas protegidas */}
        <Route
          path="/admin/home"
          element={
            <PrivateRoute>
              <HomeAdmin />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
