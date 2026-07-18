import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import PrivateRoute from "./pages/PrivateRoute";
import Login from "./pages/admin/Login";
import HomeAdmin from "./pages/admin/HomeAdmin";
import { ToastContainer } from "react-toastify";
import Home from "./pages/public/Home";
import Rent from "./pages/public/Rent";
import Sale from "./pages/public/Sale";
import Header from "./components/public/Header";
import Footer from "./components/public/Footer";
import { AnimatePresence } from "motion/react";
import { PageTransition } from "./components/PageTransition";
function PublicLayout() {
  const location = useLocation();
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </>
  );
}

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={2000} />
      <Routes>
        {/* Rotas públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/alugueis-temporada" element={<Rent />} />
          <Route path="/venda" element={<Sale />} />
          <Route path="/admin" element={<Login />} />
        </Route>

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
