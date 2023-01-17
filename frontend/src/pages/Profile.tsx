import Header from '../components/Header';
import {Box, Button, Grid, Paper, Typography} from '@mui/material';
import React, {useState} from 'react';
import Axios from '../config/axiosConfig';
import {useAuthContext} from '../context/AuthProvider';

interface IPost {
  title: string;
  postType: string;
  categories: Array<string>;
  description: string;
  city: string;
}

export default function Profile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<Array<IPost> | null>();
  
  const { auth } = useAuthContext();
  
  React.useEffect(() => {
    try {
      Axios.get(`/api/profile`, {withCredentials: true}).then((response) => {
        setEmail(response.data.user.email);
        setFirstName(response.data.user.name.firstName);
        setLastName(response.data.user.name.lastName);
        const id = response.data.user._id;
        
        return Axios.get(`/api/profile/${id}`, {withCredentials: true}).then((response) => {
          setResult(response.data.posts);
          return
        });
      });
    } catch (error: any) {
      console.log(error);
    }
  }, []);
  
  console.log(result)
  
  return (
    <>
      <Header/>
      
      <Box>
        <Box marginTop={10}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: '"Roboto","Helvetica","Arial",sans-serif', color: '#4c4c4c'}}>
              <img src="./public/icons8-test-account-96.png" alt=""/>
              <h1 style={{margin: '10'}}>{firstName} {lastName}</h1>
              <p style={{margin: '0'}}>{email}</p>
              {/*{post.linkContacts?.instagram && (*/}
              {/*  <Typography variant="body2">instagram: {post.linkContacts?.instagram}</Typography>*/}
              {/*)}*/}
              
              {/*{post.linkContacts?.telegram && (*/}
              {/*  <Typography variant="body2">telegram: {post.linkContacts?.telegram}</Typography>*/}
              {/*)}*/}
              <Box display={"flex"} alignItems="center" flexDirection={"column"} style={{margin: '50px'}}>
                <h3>Мої дописи</h3>
                {result ? (
                  result.map((post) => {
                    return (
                      <Box width={"50%"} marginTop={3}>
                        <Paper elevation={5} sx={{ padding: 5 }}>
                          <Grid container display={"flex"}>
                            <Grid item xs={4}>
                              <Typography sx={{fontSize: '12px', margin: "-20px 0 20px -20px"}} color={"green"}>
                                {post.postType == "needHelp" ? "потребую допомоги" : "можу допомогти"}
                              </Typography>
                              <Typography variant="h4" component={"h2"} color="primary">
                                {post.title}
                              </Typography>
                              <Typography variant="h6" color={"pink"}>
                                {post.city}
                              </Typography>
                            </Grid>
                            <Grid item xs={8}>
                              {" "}
                              <Typography width={"90%"} variant="body1" marginTop={2}>
                                {post.description}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box>
                    );
                  })
                ) : (
                  <Typography marginTop={5} variant="h5" color={"grey"}>
                    У вас поки немає створених постів
                  </Typography>
                )}
              </Box>
  
            </Box>
        </Box>
      </Box>
    </>
  );
}
