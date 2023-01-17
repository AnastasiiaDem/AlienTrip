import React, { useState } from "react";
import { Container, Grid, Paper, Typography, Box, TextField, Button, CardActions, Link } from "@mui/material";
import Axios from "../config/axiosConfig";
import useForm from "../hooks/useForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from 'react-router-dom';

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { errors, handleChange } = useForm();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss();

    const id = toast.loading("Pending...");

    try {
      if (!(JSON.stringify(errors) === "{}")) throw Error("Entered values must be correct");

      const res = await Axios.post(
        "/api/register",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.update(id, {
        render: res.data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
      });
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    } catch (error: any) {
      const err = error?.response?.data?.message || error.message;
      toast.update(id, { render: err, type: "error", isLoading: false, autoClose: 3000, closeOnClick: true });
    }
  };
  
  return (
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
                Sign Up
              </Typography>

              <Box
                component="form"
                onSubmit={(e) => handleSubmit(e)}
                padding={5}
                sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, width: "80%" }}
              >
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  fullWidth
                  required
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    handleChange(e.target.name, e.target.value);
                  }}/>
                {errors?.firstName && (
                  <Paper variant="elevation" sx={{ width: "100%", bgcolor: "text.disabled" }}>
                    <Typography variant="body2" padding={1} sx={{ color: "white" }}>
                      {" "}
                      {errors.firstName}
                    </Typography>
                  </Paper>
                )}
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  required
                  onChange={(e) => {
                    setLastName(e.target.value);
                    handleChange(e.target.name, e.target.value);
                  }}/>
                {errors?.lastName && (
                  <Paper variant="elevation" sx={{ width: "100%", bgcolor: "text.disabled" }}>
                    <Typography variant="body2" padding={1} sx={{ color: "white" }}>
                      {" "}
                      {errors.lastName}
                    </Typography>
                  </Paper>
                )}
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleChange(e.target.name, e.target.value);
                  }}/>
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
                  }}/>
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
                    Sign up
                  </Button>
                  <Link href="login" variant="body2">
                    Already have an account?
                  </Link>
                </CardActions>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
