import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./components/admin/test";
import UploadImages from "./pages/admin/UploadImages";
import PrivateRoute from "./pages/PrivateRoute";
import Login from "./pages/admin/Login";
import { Testando } from "./pages/admin/Testando";
import HomeAdmin from "./pages/admin/HomeAdmin";
import { ToastContainer } from "react-toastify";
import Home from "./pages/public/Home";
import Rent from "./pages/public/Rent";
import Sale from "./pages/public/Sale";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alugueis-temporada" element={<Rent />} />
        <Route path="/venda" element={<Sale />} />
        <Route path="/test" element={<Test />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/testando" element={<Testando />} />
        {/* rotas protegidas */}
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <UploadImages />
            </PrivateRoute>
          }
        />
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
