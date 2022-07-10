import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from './firebase-config'
import logo from '../ICON.png'
import './login.css'

const theme = createTheme();

export default function Login() {
  const [loginEmail,setLoginEmail] = React.useState("")
  const [user,setUser] = React.useState({})
  const [Email,setEmail] = React.useState("")
  const [Password,setPassword] = React.useState("")

  const login = async () =>{
    try{
      const user = await signInWithEmailAndPassword(
        auth,
        Email,
        Password
      );
      console.log(user)
      window.location ='/home'
      localStorage.setItem('token',user.user.accessToken) 
    } catch (error){
      console.log(error.message)
      
    }

  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div style={{backgroundColor:'rgb(244, 242, 233);'}}>
  
      <Container component="main"  style={{backgroundColor:' rgb(244, 242, 233);',height:1000}}>
        <CssBaseline  style={{backgroundColor:' rgb(244, 242, 233);'}} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor:' rgb(244, 242, 233);'
          }}
        >
      
           <img src={logo} alt="" />
 
          <Typography component="h1" variant="h5">
            ระบบจัดการข้อมูล
          </Typography>
          <Box  style={{backgroundColor:' rgb(244, 242, 233);'}} component="form" onSubmit={handleSubmit} noValidate >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              style={{color:'#867A3C'}}
              inputProps={{ style: { fontFamily: 'nunito',focused: '#867A3C'}}}
              autoFocus
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              style={{color:'#867A3C'}}
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
            />
    
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={login}
              style={{backgroundColor:'#867A3C'}}
            >
              เข้าสู่ระบบ
            </Button>
       
          </Box>
        </Box>
      
      </Container>
  
    </div>
  );
}