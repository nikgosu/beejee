import {Todo, TodosState} from "../../models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export const initialState: TodosState = {
  isAuth: false,
  authError: '',
  todos: [],
  todosPage: [],
  update: false,
  updatedTodo: <Todo>{},
  sort: 0,
  limit: 3,
  currentIndex: 0,
  nextButton: false,
  prevButton: true
}

export const TodoSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload
      if (state.currentIndex === 0) {
        state.todosPage = state.todos.slice(state.currentIndex, state.currentIndex + state.limit)
        state.currentIndex = state.currentIndex + state.limit
      }
      state.todosPage = state.todos.slice(0, state.currentIndex)
      if (state.todos.length < 3) state.nextButton = true
    },
    login(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    logout(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    },
    setDone(state) {
      state.todosPage = state.todos.slice(state.currentIndex - state.limit, state.currentIndex)
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter(todo => todo._id !== action.payload)
      state.todosPage = state.todos.slice(state.currentIndex - state.limit, state.currentIndex)
    },
    setUpdateForm(state, action: PayloadAction<boolean>) {
      state.update = action.payload
    },
    setUpdateTodo(state, action: PayloadAction<Todo>) {
      state.updatedTodo = action.payload
    },
    setSort(state, action: PayloadAction<number>) {
      state.sort = action.payload
      if (action.payload === 10) {
        state.todos = state.todos.sort((a, b) => a.userName.localeCompare(b.userName))
        state.todosPage = state.todos.slice(0, 3)
        state.currentIndex = 3
      }
      if (action.payload === 20) {
        state.todos = state.todos.sort((a, b) => b.userName.localeCompare(a.userName))
        state.todosPage = state.todos.slice(0, 3)
        state.currentIndex = 3
      }
      if (action.payload === 30) {
        state.todos = state.todos.sort((a, b) => a.email.localeCompare(b.email))
        state.todosPage = state.todos.slice(0, 3)
        state.currentIndex = 3
      }
      if (action.payload === 40) {
        state.todos = state.todos.sort((a, b) => b.email.localeCompare(a.email))
        state.todosPage = state.todos.slice(0, 3)
        state.currentIndex = 3
      }
      if (action.payload === 50) {
        state.todos = state.todos.sort((a) => a.isDone === true ? -1 : 1)
        state.todosPage = state.todos.slice(0, 3)
        state.currentIndex = 3
      }
    },
    setNextPage(state) {
      if (state.currentIndex > (state.todos.length - 1)) {
        state.nextButton = true
        return
      }
      state.todosPage = state.todos.slice(state.currentIndex, state.currentIndex + state.limit)
      state.currentIndex = state.currentIndex + state.limit
      state.prevButton = false
    },
    setPreviousPage(state) {
      state.nextButton = false

      if (state.currentIndex === 3) return
      if (state.currentIndex >= state.todos.length) state.prevButton = true

      state.todosPage = state.todos.slice(state.currentIndex - (state.limit + state.limit), state.currentIndex - state.limit)
      state.currentIndex = state.currentIndex - state.limit
    }
  }
})

export const todoActions = TodoSlice.actions
export const todoReducer = TodoSlice.reducer