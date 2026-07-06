import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./components/admin/test";
import UploadImages from "./pages/admin/UploadImages";
import PrivateRoute from "./pages/PrivateRoute";
import Login from "./pages/admin/Login";
import { Testando } from "./pages/admin/Testando";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/testando" element={<Testando />} />

        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <UploadImages />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
