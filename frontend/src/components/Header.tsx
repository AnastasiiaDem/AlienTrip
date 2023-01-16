import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

export default function Header() {
  const { auth } = useAuthContext();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/home");
  };

  return (
    <Box>
      <AppBar>
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Logo
          </Typography>
          <Box gap={2}>
            {!auth?.accessToken ? (
              <>
                <Button color="inherit" component={Link} to={"/login"}>
                  Sign In
                </Button>
                <Button color="inherit" component={Link} to={"/register"}>
                  Sign Up
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
