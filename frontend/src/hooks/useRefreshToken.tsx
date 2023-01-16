import Axios from "../config/axiosConfig";
import { useAuthContext } from "../context/AuthProvider";

export default function useRefreshToken() {
  const { auth, setAuth } = useAuthContext();

  const refresh = async () => {
    try {
      const res = await Axios.get("/api/refresh", { withCredentials: true });

      const accessToken = res.data.accessToken;
      const roles = res.data.roles;
      const email = res.data.email;
      console.log(email);

      const newAuth = { ...auth, email: email, roles: roles, accessToken: accessToken };
      setAuth(newAuth);

      return res.data.accessToken;
    } catch (error) {
      console.log(error);
    }
  };

  return refresh;
}
