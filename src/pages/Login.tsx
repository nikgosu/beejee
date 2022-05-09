import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchLogin} from "../store/redusers/ActionCreators";
import {Navigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Alert, Snackbar} from "@mui/material";

const Login = () => {

  const dispatch = useAppDispatch()
  const {isAuth, error} = useAppSelector(state => state.TodoReducer)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isEmpty, setIsEmpty] = useState(false)
  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userName === '' && password === '' ) {
      setIsEmpty(true)
      return
    }
    const data = {
      userName,
      password
    }
    dispatch(fetchLogin(data))
  }

  useEffect(() => {
    if (error) setOpen(true)
  }, [error])

  if (isAuth) return  <Navigate to={"/beejee"}/>

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="Login"
            label="Login"
            name="Login"
            autoComplete="Login"
            autoFocus
            onChange={(e) => setUserName(e.target.value)}
            error={isEmpty}
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
            onChange={(e) => setPassword(e.target.value)}
            error={isEmpty}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Incorrect access credentials!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;