import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Moderator from "./pages/Moderator";
import Info from "./pages/Info";
import Initial from "./pages/Initial";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ALLOWED_ROLES } from "./config/allowedRolesConfig";
import Unauthorized from "./pages/Unauthorized";
import CheckToken from "./components/CheckToken";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<SignUp />} />
        <Route path="home" element={<Home />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<CheckToken />}>
          <Route element={<ProtectedRoutes allowedRoles={[ALLOWED_ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route element={<ProtectedRoutes allowedRoles={[ALLOWED_ROLES.Moderator]} />}>
            <Route path="moderator" element={<Moderator />} />
          </Route>
          <Route
            element={
              <ProtectedRoutes allowedRoles={[ALLOWED_ROLES.Admin, ALLOWED_ROLES.Moderator, ALLOWED_ROLES.User]} />
            }
          >
            <Route path="info" element={<Info />} />
          </Route>
        </Route>

        <Route path="*" element={<Initial />} />
      </Route>
    </Routes>
  );
}

export default App;
