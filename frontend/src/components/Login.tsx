import React, { useState } from "react";
import { Link as LinkR, useLocation, useNavigate } from "react-router-dom";
import { Container, Grid, Paper, Typography, Box, TextField, Button, CardActions, Link } from "@mui/material";
import Axios from "../config/axiosConfig";
import { useAuthContext } from "../context/AuthProvider";
import useForm from "../hooks/useForm";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { auth, setAuth } = useAuthContext();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";
  console.log(from);

  const { errors, handleChange } = useForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss();

    const id = toast.loading("Pending...");

    try {
      console.log(errors);
      if (!(JSON.stringify(errors) === "{}")) throw Error("Entered values must be correct");

      const res = await Axios.post(
        "/api/login",
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = res?.data?.accessToken;

      const roles = res?.data?.roles;

      setAuth({ email: email, password: password, accessToken: accessToken, roles: roles });

      toast.update(id, {
        render: res?.data?.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });

      navigate(from, { replace: true });
    } catch (error: any) {
      let message;
      if (axios.isAxiosError(error)) message = error.response?.data?.message || "Error";
      else message = error.message;

      toast.update(id, { render: message, type: "error", isLoading: false, autoClose: 3000, closeOnClick: true });
    }
  };

  return (
    <div>
      <>
        <Container>
          <ToastContainer autoClose={5000} />
          <Grid container justifyContent={"center"}>
            <Grid item xs={10} sm={8} md={6} sx={{ marginTop: 20 }}>
              <Paper
                elevation={8}
                sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
              >
                <Typography color={"primary"} component="h2" variant="h5" textAlign={"center"}>
                  Sign In
                </Typography>

                <Box
                  component="form"
                  onSubmit={(e) => handleSubmit(e)}
                  padding={5}
                  sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, width: "80%" }}
                >
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                      handleChange(e.target.name, e.target.value);
                    }}
                  ></TextField>
                  {errors?.email && (
                    <Paper variant="elevation" sx={{ width: "100%", bgcolor: "text.disabled" }}>
                      <Typography variant="body2" padding={1} sx={{ color: "white" }}>
                        {" "}
                        {errors.email}
                      </Typography>
                    </Paper>
                  )}
                  <TextField
                    type={"password"}
                    id="password"
                    name="password"
                    label="Password"
                    fullWidth
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                      handleChange(e.target.name, e.target.value);
                    }}
                  ></TextField>
                  {errors?.password && (
                    <Paper variant="elevation" sx={{ width: "100%", bgcolor: "text.disabled" }}>
                      <Typography variant="body2" padding={1} sx={{ color: "white" }}>
                        {" "}
                        {errors.password}
                      </Typography>
                    </Paper>
                  )}

                  <CardActions sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <Button type="submit" variant="contained" size="medium">
                      Sign in
                    </Button>

                    <Link href="/register" variant="body2">
                      Don`t have an account?
                    </Link>
                  </CardActions>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </>
    </div>
  );
}
