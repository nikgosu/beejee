import React, {FC, useEffect, useState} from 'react';
import {Alert, Button, Container, Grid, Snackbar, TextField} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {Navigate} from "react-router-dom";
import {Todo} from "../models";
import {
  useFetchCreateTodoMutation, useFetchTodosQuery,
  useFetchUpdateTodoMutation,
  useLazyFetchTodosQuery
} from "../store/redusers/todo.api";
import {useActions} from "../hooks/actions";

const validateEmail = (email: string) => {
  const re = /[a-z\d!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?/;
  return re.test(String(email).toLowerCase());
}

const CreateTodoFrom:FC = () => {

  const {update, updatedTodo, isAuth, todos, currentIndex} = useAppSelector(state => state.todo)

  const [todo, setTodo] = useState<Todo>()
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')
  const [isEmpty, setIsEmpty] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [isCreate, setIsCreate] = useState(true)
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [open, setOpen] = React.useState(false);
  const [logout, setLogout] = useState(false)

  const [fetchCreateTodo] = useFetchCreateTodoMutation()
  const [fetchUpdateTodo] = useFetchUpdateTodoMutation()

  const {setUpdateForm, setNextPage} = useActions()

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleCreateByEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCreateCard()
  }

  const handleCreateCard = () => {
    if (userName !== '' && email !== '' && text !== '' && validateEmail(email)) {
      setTodo({
        userName: userName,
        email: email,
        text: text,
        isDone: false,
        isEditedByAdmin: false
      })
      setIsCreate(true)
      setUserName('')
      setEmail('')
      setText('')
      setIsEmpty(false)
      setIsValidEmail(true)
      setOpen(true)
    } else {
      setIsEmpty(true)
    }
  }

  const handleUpdateCard = () => {
    if (userName !== '' && email !== '' && text !== '' && validateEmail(email) && isAuth) {
      setTodo({...updatedTodo, userName: userName, email: email, text: text, isEditedByAdmin: true})
      setIsUpdated(true)
      setIsCreate(false)
      setUserName('')
      setEmail('')
      setText('')
      setIsEmpty(false)
      setIsValidEmail(true)
      setUpdateForm(false)
    } else if (!isAuth) {
      setUserName('')
      setEmail('')
      setText('')
      setIsEmpty(false)
      setIsValidEmail(true)
      setLogout(true)
    }
    else {
      setIsEmpty(true)
    }
  }

  const handleChangeEmail = (e:  React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  useEffect(() => {
    if (!validateEmail(email) && email !== '') setIsValidEmail(false)
    else setIsValidEmail(true)
  }, [email])

  useEffect(() => {
    if (update) {
      setUserName(updatedTodo.userName)
      setEmail(updatedTodo.email)
      setText(updatedTodo.text)
    }
  }, [update])

  useEffect(() => {
    if (todo && !update && !isUpdated && isCreate) {
      fetchCreateTodo(todo)
      if (todos.length > currentIndex) setNextPage()
    }
  }, [todo, isUpdated, isCreate])

  useEffect(() => {
    if (todo && isUpdated) {
      setIsUpdated(false)
      fetchUpdateTodo(todo)
    }
  }, [todo, isUpdated])

  if (logout) return <Navigate to={"/login"}/>

  return (
    <Container style={{
      marginTop: '40px',
      width: '90%'
    }}>
      <Grid style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <TextField
          onKeyDown={handleCreateByEnter}
          value={userName}
          error={isEmpty}
          id={isEmpty ? 'outlined-error' : ''}
          onChange={(e) => setUserName(e.target.value)}
          placeholder='User name'
          style={{width: '100%'}}/>
      </Grid>
      <Grid style={{
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <TextField
          onKeyDown={handleCreateByEnter}
          value={email}
          label={isValidEmail ? 'Email' : 'Email is not valid'}
          error={isEmpty}
          onChange={handleChangeEmail}
          placeholder={'Email'}
          style={{width: '100%'}}/>
      </Grid>
      <Grid style={{
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <TextField
          onKeyDown={handleCreateByEnter}
          value={text}
          error={isEmpty}
          onChange={(e) => setText(e.target.value)}
          placeholder='Text'
          style={{width: '100%'}}/>
      </Grid>
      <Grid style={{
        marginTop: '20px',
      }}>
        <Button onClick={update ? handleUpdateCard : handleCreateCard} variant='contained'>{update ? 'Update' : 'Create'} TODO</Button>
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Todo added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateTodoFrom;