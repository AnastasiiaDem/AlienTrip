import React from "react";
import { initialAuthState, useAuthContext } from "../context/AuthProvider";
import Axios from "../config/axiosConfig";

export default function useLogout() {
  const { setAuth } = useAuthContext();

  const logout = async () => {
    setAuth(initialAuthState);

    try {
      await Axios.get("/logout", { withCredentials: true });
    } catch (error: any) {
      console.log(error);
    }
  };

  return logout;
}
