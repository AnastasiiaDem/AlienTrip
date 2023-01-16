import { Box, Grid, TextField, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import Axios from "../config/axiosConfig";
import Autocomplete from "@mui/material/Autocomplete";
import { padding } from "@mui/system";

const postType = ["Потребую допомоги", "Можу допомогти"];
const categories = ["Їжа", "Матеріали", "Засоби гігієни", "Одяг", "Техніка", "Меблі"];
const cities = ["Київ", "Одеса"];

interface IPost {
  title: string;
  type: string;
  categories: Array<string>;
  description: string;
  city: string;
}

export default function Search() {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string | null>("");
  const [type, setType] = useState<string | null>("");
  const [city, setCity] = useState<string | null>("");
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<Array<IPost>>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submit");
    e.preventDefault();

    try {
      const res = await Axios.get("/api/search", {
        params: {
          title: title,
          category: category,
          postType: type,
          city: city,
        },
      });

      setResult(res.data.posts);
    } catch (error: any) {
      setError(error?.message);
    }
  };
  return (
    <>
      {" "}
      <Box display={"flex"} justifyContent={"center"}>
        <Grid
          maxWidth={900}
          container
          display={"flex"}
          component={"form"}
          onSubmit={(e) => handleSubmit(e)}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item xs={4}>
            <TextField
              id="seach"
              name="search"
              label="Пошук"
              fullWidth
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></TextField>
          </Grid>

          <Grid item xs={2}>
            <Autocomplete
              id="category"
              options={categories}
              onChange={(e: any, newValue: string | null) => {
                setCategory(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Категорія" />}
            />
          </Grid>
          <Grid item xs={2}>
            <Autocomplete
              id="city"
              options={cities}
              onChange={(e: any, newValue: string | null) => {
                setCity(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Місто" />}
            />
          </Grid>

          <Grid item xs={2}>
            <Autocomplete
              id="type"
              options={postType}
              onChange={(e: any, newValue: string | null) => {
                setType(newValue);
              }}
              renderInput={(params) => <TextField {...params} label="Тип" />}
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" type="submit">
              Пошук
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box display={"flex"} alignItems="center" flexDirection={"column"}>
        {result
          ? result.map((post) => {
              return (
                <Box width={"50%"} marginTop={3}>
                  <Paper elevation={5} sx={{ padding: 5 }}>
                    <Grid container display={"flex"}>
                      <Grid item xs={4}>
                        <Typography variant="h5" component={"h2"} color="primary">
                          {post.title}
                        </Typography>

                        <Typography variant="h6" color={"pink"}>
                          {post.city}
                        </Typography>
                        <Box marginTop={5}>
                          {" "}
                          <Button size="small" variant="outlined">
                            {" "}
                            Відкрити контакти
                          </Button>
                        </Box>
                      </Grid>
                      <Grid item xs={8}>
                        {" "}
                        <Typography width={"70%"} variant="body1" marginTop={2}>
                          {post.description}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
              );
            })
          : null}
      </Box>
    </>
  );
}
