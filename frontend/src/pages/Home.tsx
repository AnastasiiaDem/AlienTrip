import {Box, Button} from '@mui/material';
import {Link} from 'react-router-dom';
import Header from '../components/Header';
import {useAuthContext} from '../context/AuthProvider';

export default function Home() {
  const {auth} = useAuthContext();
  console.log(auth);
  
  return (
    <>
      <Header/>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Box marginTop={10}>
          <Link color="green" to={'/admin'}>Admin</Link>
          <Link to={'/moderator'}>Moderator</Link>
          <Link to={'/info'}>Info</Link>
        </Box>
        <Button sx={{marginTop: '10px'}} color="inherit" component={Link} to={'/create'}>
          Create Post
        </Button>
      </Box>
    </>
  );
}
