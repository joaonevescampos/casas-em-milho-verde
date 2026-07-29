import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import PrivateRoute from "./pages/PrivateRoute";
import Login from "./pages/admin/Login";
import HomeAdmin from "./pages/admin/HomeAdmin";
import { ToastContainer } from "react-toastify";
import Home from "./pages/public/Home";
import Header from "./components/public/Header";
import Footer from "./components/public/Footer";
import { AnimatePresence } from "motion/react";
import PageTransition from "./components/PageTransition";
import Cataloge from "./pages/public/Cataloge";
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
          <Route path="/alugueis-temporada" element={<Cataloge />} />
          <Route path="/venda" element={<Cataloge />} />
        </Route>

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
