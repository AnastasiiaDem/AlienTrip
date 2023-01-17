import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Moderator from "./pages/Moderator";
import Info from "./pages/Info";

import ProtectedRoutes from "./components/ProtectedRoutes";
import { ALLOWED_ROLES } from "./config/allowedRolesConfig";
import Unauthorized from "./pages/Unauthorized";
import CheckToken from "./components/CheckToken";
import CreatePost from "./components/CreatePost";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<SignUp />} />
        <Route element={<CheckToken />}>
          <Route path="home" element={<Home />} />
          <Route path="unauthorized" element={<Unauthorized />} />
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
            <Route path="create" element={<CreatePost />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
