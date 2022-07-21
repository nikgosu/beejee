import React, {useEffect} from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppSelector} from "../hooks/redux";
import {useLogoutMutation} from "../store/redusers/todo.api";
import {useActions} from "../hooks/actions";

const NavBar = () => {

  const {isAuth} = useAppSelector(state => state.todo)
  const [fetchLogOut, {isLoading, isError, data: logoutData}] = useLogoutMutation()
  const {logout} = useActions()

  const handleLogOut = () => {
    fetchLogOut('admin')
  }

  useEffect(() => {
    if (!logoutData && logoutData !== undefined) logout(logoutData)
  }, [logoutData])

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