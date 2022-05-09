import React, {useEffect} from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchLogOut} from "../store/redusers/ActionCreators";

const NavBar = () => {

  const {isAuth} = useAppSelector(state => state.TodoReducer)
  const dispatch = useAppDispatch()

  const handleLogOut = () => {
    dispatch(fetchLogOut('admin'))
  }

  useEffect(() => {

  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography className='logo' variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Awesome TODO app
          </Typography>
          <Link className='link' style={{ flexGrow: 1 }} to="/beejee">
            <Typography variant="h6" component="div" >
              Home
            </Typography>
          </Link>
          <Link className='link' style={{ flexGrow: 40 }} to="/about">
            <Typography variant="h6" component="div" >
              About
            </Typography>
          </Link>
          {!isAuth
            ?
            <Link className='link' to="/login">
              <Typography variant="h6" component="div" >
                Sign in
              </Typography>
            </Link>
            :
            <Button onClick={handleLogOut} color="inherit">
              <Typography sx={{fontSize: '1rem'}} variant="h6" component="div" >
                Log out
              </Typography>
            </Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;