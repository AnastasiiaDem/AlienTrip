import { Box, Grid, TextField, Button, Paper, Typography, MenuItem } from "@mui/material";
import React, { useState } from "react";
import Axios from "../config/axiosConfig";
import Autocomplete from "@mui/material/Autocomplete";

import { useAuthContext } from "../context/AuthProvider";

const categories = ["Їжа", "Матеріали", "Засоби гігієни", "Одяг", "Техніка", "Меблі"];

interface IPost {
  _id: string;
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
  const [result, setResult] = useState<Array<IPost> | null>();

  const [email, setEmail] = useState<string>("");

  const { auth } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setResult(null);
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

  const getUserData = async (post: any) => {
    try {
      setEmail("");
      console.log("post", post);
      const res = await Axios.get(`/api/user/${post.name.userId}`);

      setEmail(res.data.user[0].email);
    } catch (error: any) {
      console.log(error);
      setError(error?.message);
    }
  };

  function ContactsButton(post: any) {
    const [open, setOpen] = useState<boolean>(false);

    console.log(post);

    return (
      <>
        <Button
          onClick={(e) => {
            e.preventDefault();
            getUserData(post);
            setOpen(!open);
          }}
          size="small"
          variant="outlined"
        >
          {" "}
          Відкрити контакти
        </Button>
        {open ? (
          auth?.accessToken ? (
            <Box>
              <Typography variant="body2">email:{email}</Typography>
              {post.linkContacts?.instagram && (
                <Typography variant="body2">instagram: {post.linkContacts?.instagram}</Typography>
              )}
              {post.linkContacts?.telegram && (
                <Typography variant="body2">telegram: {post.linkContacts?.telegram}</Typography>
              )}
            </Box>
          ) : (
            <Typography variant="caption">Ця опція доступна авторизованим користувачам</Typography>
          )
        ) : null}
      </>
    );
  }

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
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
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
            <TextField
              id="city"
              name="city"
              label="City"
              fullWidth
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              select
              id="type"
              name="type"
              label="Type"
              onChange={(e) => {
                setType(e.target.value);
              }}
              fullWidth
              required
              defaultValue={""}
            >
              <MenuItem key="needHelp" value="needHelp">
                Можу допомогти
              </MenuItem>
              <MenuItem key="help" value="help">
                Потребую допомоги
              </MenuItem>
            </TextField>
          </Grid>

          <Grid item>
            <Button variant="outlined" type="submit">
              Пошук
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box display={"flex"} alignItems="center" flexDirection={"column"}>
        {result ? (
          result.map((post) => {
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
                        <ContactsButton name={post} />
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
        ) : error ? (
          <Typography marginTop={5} variant="h5" color={"grey"}>
            За Вашим запитом результатів не знайдено
          </Typography>
        ) : null}
      </Box>
    </>
  );
}
