import React, {FC, useId} from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {Todo} from "../types/types";
import {fetchDeleteTodo, fetchTodos, fetchUpdateTodo} from "../store/redusers/ActionCreators";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {TodoSlice} from "../store/redusers/TodoSlice";

interface Props {
  todo: Todo
}

const TodoItem:FC<Props> = ({todo}: Props) => {

  const dispatch = useAppDispatch()
  const {isAuth} = useAppSelector(state => state.TodoReducer)

  const handleUpdateTodo = () => {
    if (isAuth) {
      dispatch(TodoSlice.actions.setUpdateForm(true))
      dispatch(TodoSlice.actions.setUpdateTodo(todo))
    }
  }

  const handleDelete = () => {
    dispatch(fetchTodos())
    if (todo._id) dispatch(fetchDeleteTodo(todo._id))
  }

  const handleSetDone = () => {
    dispatch(fetchTodos())
    dispatch(fetchUpdateTodo({...todo, isDone: !todo.isDone}))
  }

  return (
    <Card key={useId()} sx={{
      width: '100%',
      marginTop: '20px',
    }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {todo.userName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {todo.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {todo.text}
        </Typography>
        {todo.isEditedByAdmin ? <Typography variant="body2" color="text.secondary">
          * edited by admin
        </Typography> : <></>}
      </CardContent>
      <CardActions>
        <Button
          onClick={handleUpdateTodo}
          disabled={'disabled' && todo.isDone || !isAuth}
          variant='contained'
          size="medium"
        >Update TODO
        </Button>
        <Button
          onClick={handleDelete}
          variant="outlined" size="medium" color="error"
        >Delete TODO
        </Button>
        <Button
          disabled={'disabled' && !isAuth}
          onClick={handleSetDone}
          variant='contained'
          size="small"
          color={todo.isDone ? 'error' : "success"}
        >{todo.isDone ? 'Not done' : 'Done'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default TodoItem;