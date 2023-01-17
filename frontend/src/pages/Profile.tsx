import Header from '../components/Header';
import {Box, Button, CardActions, Grid, MenuItem, Paper, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import Axios from '../config/axiosConfig';
import {useAuthContext} from '../context/AuthProvider';
import Modal from '@mui/material/Modal';
import useForm from '../hooks/useForm';
import {useLocation, useNavigate} from 'react-router-dom';
import {categories} from '../components/CreatePost';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IPost {
  title: string;
  postType: string;
  categories: Array<string>;
  description: string;
  city: string;
}

export default function Profile() {
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<Array<IPost> | null>();
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const [postType, setPostType] = useState('');
  const [category, setCategory] = useState<string | null>('');
  const [city, setCity] = useState('');
  
  const {errors} = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/home';
  
  const {auth} = useAuthContext();
  
  React.useEffect(() => {
    try {
      Axios.get(`/api/profile`, {withCredentials: true}).then((response) => {
        setEmail(response.data.user.email);
        setFirstName(response.data.user.name.firstName);
        setLastName(response.data.user.name.lastName);
        setUserId(response.data.user._id);
        const id = response.data.user._id;
        return Axios.get(`/api/profile/${id}`, {withCredentials: true}).then((response) => {
          setResult(response.data.posts);
          return;
        });
      });
    } catch (error: any) {
      console.log(error);
    }
  }, []);
  
  
  const handleEdit = async (post: any) => {
    console.log('edited');
    try {
      await Axios.put(
        `/api/update/${post._id}`,
        {
          title: title,
          description: description,
          
          postType: postType,
          category: category,
          city: city,
        },
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true,
        }
      );
      
      console.log('edited');
      //setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDelete = async (post: any) => {
    try {
      await Axios.delete(`/api/delete/${post._id}`, {withCredentials: true})
        .then((response) => {
          return Axios.get(`/api/profile/${userId}`, {withCredentials: true}).then((response) => {
            setResult(response.data.posts);
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  
  
  return (
    <>
      <Header/>
      
      <Box>
        <Box marginTop={10}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
              color: '#4c4c4c',
            }}
          >
            <img src="/icons8-test-account-96.png" alt=""/>
            <h1 style={{margin: '10'}}>
              {firstName} {lastName}
            </h1>
            <p style={{margin: '0'}}>{email}</p>
            {/*{post.linkContacts?.instagram && (*/}
            {/*  <Typography variant="body2">instagram: {post.linkContacts?.instagram}</Typography>*/}
            {/*)}*/}
            
            {/*{post.linkContacts?.telegram && (*/}
            {/*  <Typography variant="body2">telegram: {post.linkContacts?.telegram}</Typography>*/}
            {/*)}*/}
            <Box display={'flex'} alignItems="center" flexDirection={'column'} style={{margin: '50px'}}>
              <h3>Мої дописи</h3>
              {result ? (
                result.map((post) => {
                  return (
                    <>
                    <Box width={'100%'} marginTop={3}>
                      <Paper elevation={5} sx={{padding: 5}}>
                        <Grid container display={'flex'}>
                          <Grid item xs={3}>
                            <Typography sx={{
                              fontSize: '12px',
                              margin: '-20px 0 20px -20px',
                              width: 'fit-content',
                              padding: '0 10px 0 10px',
                              textAlign: 'center',
                              background: '#07bc0c36',
                              borderRadius: '10px'
                            }} color={'green'}>
                            {post.postType == 'needHelp' ? 'потребую допомоги' : 'можу допомогти'}
                          </Typography>
                          <Typography variant="h5" component={'h2'} color="primary">
                            {post.title}
                          </Typography>
                          <Typography variant="h6" color={'pink'}>
                            {post.city}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={7}>
                          {' '}
                          <Typography width={'90%'} variant="body1" marginTop={2}>
                            {post.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} justifySelf="flex-end" alignSelf="center">
                          <Button color="primary" size="small" onClick={handleOpen}>
                            Edit
                          </Button>
                          <Button color="error" size="small" onClick={(e: any) => handleDelete(post)}>
                            Delete
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                    </Box>
                  
                  <div>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Grid item xs={10} sm={8} md={6} sx={{marginTop: 3, marginBottom: 3}}>
                          <Paper
                            elevation={8}
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Typography color={'primary'} component="h2" variant="h5" textAlign={'center'}>
                              Змінити допис
                            </Typography>
                            <Box
                              component="form"
                              onSubmit={(post: any) => handleEdit(post)}
                              padding={5}
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 2,
                                width: '80%',
                              }}
                            >
                              <TextField
                                select
                                id="type"
                                name="type"
                                label="Тип"
                                onChange={(e) => {
                                  setPostType(e.target.value);
                                }}
                                fullWidth
                                required
                                defaultValue={''}
                                sx={{marginBottom: '30px'}}
                              >
                                <MenuItem key="help" value="help">
                                  Можу допомогти
                                </MenuItem>
                                <MenuItem key="needHelp" value="needHelp">
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
                                }}
                              />
                              <TextField
                                id="description"
                                name="description"
                                label="Опис"
                                fullWidth
                                required
                                multiline
                                onChange={(e) => {
                                  setDescription(e.target.value);
                                }}
                              />
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
                                {categories.map((option) => (
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
                                }}
                              />
                              <CardActions
                                sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}
                              >
                                <Button type="submit" variant="contained" size="medium">
                                  Змінити
                                </Button>
                              </CardActions>
                            </Box>
                          </Paper>
                        </Grid>
                      </Box>
                    </Modal>
                  </div>;
                </>
                )
                  ;
                })
              ) : (
                <Typography marginTop={5} variant="h5" color={'grey'}>
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
