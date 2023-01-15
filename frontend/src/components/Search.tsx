import { Box, Grid, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import Axios from "../config/axiosConfig";
import Autocomplete from "@mui/material/Autocomplete";

const postType = ["Потребую допомоги", "Можу допомогти"];
const categories = ["Їжа", "Матеріали", "Засоби гігієни", "Одяг", "Техніка", "Меблі"];
const cities = ["Київ", "Одеса"];

interface IPost {
  title: string;
  type: string;
  categories: Array<string>;
  city: string;
}

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<Array<IPost>>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submit");
    e.preventDefault();

    try {
      const res: Array<IPost> = await Axios.get("/api/search", {
        title: search,
        //category: category,
        postType: type,
        //city: city,
      });

      setResult(res);
    } catch (error: any) {
      setError(error?.message);
    }
  };
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Grid
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
              setSearch(e.target.value);
            }}
          ></TextField>
        </Grid>

        <Grid item xs={2}>
          <Autocomplete
            id="category"
            options={categories}
            onChange={(e: any) => {
              setCategory(e.target.value);
            }}
            renderInput={(params) => <TextField {...params} label="Категорія" />}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            id="city"
            options={cities}
            onChange={(e: any) => {
              setCity(e.target.value);
            }}
            renderInput={(params) => <TextField {...params} label="Місто" />}
          />
        </Grid>

        <Grid item xs={2}>
          <Autocomplete
            id="type"
            options={postType}
            onChange={(e: any) => {
              setType(e.target.value);
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
  );
}
