import React, {FC, useId} from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {useActions} from "../hooks/actions";
import {
  useFetchDeleteTodoMutation,
  useFetchUpdateTodoMutation,
  useLazyFetchTodosQuery
} from "../store/redusers/todo.api";
import {Todo} from "../models";

interface Props {
  todo: Todo
}

const TodoItem:FC<Props> = ({todo}: Props) => {

  const {isAuth} = useAppSelector(state => state.todo)
  const {setUpdateForm, setUpdateTodo, deleteTodo, setDone} = useActions()

  const [fetchTodos] = useLazyFetchTodosQuery()
  const [fetchDeleteTodo] = useFetchDeleteTodoMutation()
  const [fetchUpdateTodo] = useFetchUpdateTodoMutation()

  const handleUpdateTodo = () => {
    if (isAuth) {
      setUpdateForm(true)
      setUpdateTodo(todo)
    }
  }

  const handleDelete = () => {
    fetchTodos()
    if (todo._id) {
      fetchDeleteTodo(todo._id)
      deleteTodo(todo._id)
    }
  }

  const handleSetDone = () => {
    fetchUpdateTodo({...todo, isDone: !todo.isDone})
    setDone()
    fetchTodos()
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