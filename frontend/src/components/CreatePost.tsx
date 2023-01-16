import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  CardActions,
  Link,
  MenuItem,
  TextareaAutosize
} from '@mui/material';
import Axios from "../config/axiosConfig";
import useForm from "../hooks/useForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useLocation, useNavigate} from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';

const categories = ["Їжа", "Матеріали", "Засоби гігієни", "Одяг", "Техніка", "Меблі"];

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  
  const { errors } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.dismiss();
    
    const id = toast.loading("Pending...");
    
    try {
      if (!(JSON.stringify(errors) === "{}")) throw Error("Entered values must be correct");
      debugger
      const res = await Axios.post(
        "/api/create",
        {
          title: title,
          description: description,
          type: type,
          category: category,
          city: city
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
        navigate('/home', {replace: true});
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
          <Grid item xs={10} sm={8} md={6} sx={{ marginTop: 3, marginBottom: 3 }}>
            <Paper
              elevation={8}
              sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}
            >
              <Button color="inherit" sx={{margin: '0 0 0 auto', minWidth: '40px'}} onClick={() => {navigate('/home', {replace: true})}}>
                x
              </Button>
              <Typography color={"primary"} component="h2" variant="h5" textAlign={"center"}>
                Новий допис
              </Typography>
              <Box
                component="form"
                onSubmit={(e) => handleSubmit(e)}
                padding={5}
                sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, width: "80%" }}
              >
  
                <TextField
                  select
                  id="type"
                  name="type"
                  label="Тип"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  fullWidth
                  required
                  defaultValue={''}
                  sx={{marginBottom: '30px'}}
                >
                  <MenuItem key='help' value='0'>
                    Можу допомогти
                  </MenuItem>
                  <MenuItem key='needHelp' value='1'>
                    Потребую допомоги
                  </MenuItem>
                </TextField>
                
                <TextField
                  id="title"
                  name="title"
                  label="Заголовок"
                  fullWidth
                  required
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}/>
                <TextField
                  id="description"
                  name="description"
                  label="Опис"
                  fullWidth
                  required
                  multiline
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}/>
                <TextField
                  select
                  id="category"
                  name="category"
                  label="Категорія"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  fullWidth
                  required
                  defaultValue={''}
                >
                  {categories.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="city"
                  name="city"
                  label="Місто"
                  fullWidth
                  required
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}/>
                <CardActions sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <Button type="submit" variant="contained" size="medium">
                    Створити
                  </Button>
                </CardActions>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
