import React from "react";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import useRefreshToken from "../hooks/useRefreshToken";
import { useAuthContext } from "../context/AuthProvider";

export default function CheckToken() {
  const [loading, setLoading] = useState(true);
  const { auth } = useAuthContext();
  const refresh = useRefreshToken();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setLoading(false);
  }, []);

  return <>{loading ? <p>Loading ...</p> : <Outlet />}</>;
}
