import {Box, Button} from '@mui/material';
import {Link} from 'react-router-dom';
import Header from '../components/Header';
import {useAuthContext} from '../context/AuthProvider';
import Search from '../components/Search';

export default function Home() {
  const {auth} = useAuthContext();
  console.log(auth);
  
  return (
    <>
      <Header/>
      <Box>
        <Box marginTop={10}>
          <Link color="green" to={'/admin'}>Admin</Link>
          <Link to={'/moderator'}>Moderator</Link>
          <Link to={'/info'}>Інформаційна сторінка</Link>
        </Box>
        <Button sx={{display: 'block', margin: '10px auto 30px auto', height: '30px', width: '170px'}} color="inherit" component={Link} to={'/create'} variant="contained">
          Створити допис
        </Button>
      </Box>
      
      <Search/>
    </>
  );
}
