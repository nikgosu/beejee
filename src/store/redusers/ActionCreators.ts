import {AppDispatch} from "../store";
import axios from "axios";
import {Todo, User} from "../../types/types";
import {TodoSlice} from "./TodoSlice";

export const fetchLogin = (user: User) => async (dispatch: AppDispatch) => {
  try {
    await axios.post(
      'https://express-mongo-heroku.herokuapp.com/api//login/',
      user
    ).then(response => {
      dispatch(TodoSlice.actions.login(response.data))
    })
  } catch (e: any) {
    dispatch(TodoSlice.actions.todosFetchingError(e.message))
  }
}

export const fetchLogOut = (userName: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.post('https://express-mongo-heroku.herokuapp.com/api//logout/', {userName}).then(response => {
      dispatch(TodoSlice.actions.logout(response.data))
    })
  } catch (e: any) {
    dispatch(TodoSlice.actions.todosFetchingError(e.message))
  }
}

export const fetchIsAuth = (userName: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.post('https://express-mongo-heroku.herokuapp.com/api//isAuth/', {userName}).then(response => {
      dispatch(TodoSlice.actions.login(response.data))
    })
  } catch (e: any) {
    dispatch(TodoSlice.actions.todosFetchingError(e.message))
  }
}

export const fetchTodos = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(TodoSlice.actions.todosFetching())
    const response = await axios.get<Todo[]>('https://express-mongo-heroku.herokuapp.com/api//todos/'
    )
    dispatch(TodoSlice.actions.todosFetchingSuccess(response.data))
  } catch (e: any) {
    dispatch(TodoSlice.actions.todosFetchingError(e.message))
  }
}

export const fetchCreateTodo = (todo: Todo) => async (dispatch: AppDispatch) => {
  try {
    await axios.post(
      'https://express-mongo-heroku.herokuapp.com/api//todos/',
      todo
    )
    await dispatch(fetchTodos())
  } catch (e: any) {
    dispatch(TodoSlice.actions.todosFetchingError(e.message))
  }
}

export const fetchDeleteTodo = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(
      `https://express-mongo-heroku.herokuapp.com/api//todos/${id}`
    )
    dispatch(TodoSlice.actions.deleteTodo(id))
  } catch (e: any) {
    dispatch(TodoSlice.actions.todosFetchingError(e.message))
  }
}

export const fetchUpdateTodo = (todo: Todo) => async (dispatch: AppDispatch) => {
  try {
    await axios.put(
      `https://express-mongo-heroku.herokuapp.com/api//todos/`,
      todo
    )
    await dispatch(fetchTodos())
    await dispatch(TodoSlice.actions.setDone())
  } catch (e: any) {
    dispatch(TodoSlice.actions.todosFetchingError(e.message))
  }
}