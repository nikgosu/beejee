
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


// interface TodosState {
//   isAuth: boolean
//   authError: string
//   todos: Todo[]
//   todosPage: Todo[]
//   update: boolean
//   updatedTodo: Todo
//   sort: number
//   limit: number
//   currentIndex: number
//   isLoading: boolean
//   error: string
//   nextButton: boolean
//   prevButton: boolean
// }
//
// const initialState: TodosState = {
//   isAuth: false,
//   authError: '',
//   todos: [],
//   todosPage: [],
//   update: false,
//   updatedTodo: <Todo>{},
//   sort: 0,
//   limit: 3,
//   currentIndex: 0,
//   isLoading: false,
//   error: '',
//   nextButton: false,
//   prevButton: true
// }
//
// export const TodoSlice = createSlice({
//   name: 'card',
//   initialState,
//   reducers: {
//     todosFetching(state) {
//       state.isLoading = true
//     },
//     todosFetchingSuccess(state, action: PayloadAction<Todo[]>) {
//       state.isLoading = false
//       state.error = ''
//       state.todos = action.payload
//       if (state.currentIndex === 0) {
//         state.todosPage = state.todos.slice(state.currentIndex, state.currentIndex + state.limit)
//         state.currentIndex = state.currentIndex + state.limit
//       }
//       state.todosPage = state.todos.slice(0, state.currentIndex)
//     },
//     todosFetchingError(state, action: PayloadAction<string>) {
//       state.isLoading = false
//       state.error = action.payload
//     },
//     login(state, action: PayloadAction<boolean>) {
//       state.isAuth = action.payload;
//     },
//     logout(state, action: PayloadAction<string>) {
//       if (!action.payload) state.isAuth = false
//     },
//     setDone(state) {
//       state.todosPage = state.todos.slice(state.currentIndex - state.limit, state.currentIndex)
//     },
//     deleteTodo(state, action: PayloadAction<string>) {
//       state.todos = state.todos.filter(todo => todo._id !== action.payload)
//       state.todosPage = state.todos.slice(state.currentIndex - state.limit, state.currentIndex)
//     },
//     setUpdateForm(state, action: PayloadAction<boolean>) {
//       state.update = action.payload
//     },
//     setUpdateTodo(state, action: PayloadAction<Todo>) {
//       state.updatedTodo = action.payload
//     },
//     setSort(state, action: PayloadAction<number>) {
//       state.sort = action.payload
//       if (action.payload === 10) {
//         state.todos = state.todos.sort((a, b) => a.userName.localeCompare(b.userName))
//         state.todosPage = state.todos.slice(0, 3)
//         state.currentIndex = 3
//       }
//       if (action.payload === 20) {
//         state.todos = state.todos.sort((a, b) => b.userName.localeCompare(a.userName))
//         state.todosPage = state.todos.slice(0, 3)
//         state.currentIndex = 3
//       }
//       if (action.payload === 30) {
//         state.todos = state.todos.sort((a, b) => a.email.localeCompare(b.email))
//         state.todosPage = state.todos.slice(0, 3)
//         state.currentIndex = 3
//       }
//       if (action.payload === 40) {
//         state.todos = state.todos.sort((a, b) => b.email.localeCompare(a.email))
//         state.todosPage = state.todos.slice(0, 3)
//         state.currentIndex = 3
//       }
//       if (action.payload === 50) {
//         state.todos = state.todos.sort((a) => a.isDone === true ? -1 : 1)
//         state.todosPage = state.todos.slice(0, 3)
//         state.currentIndex = 3
//       }
//     },
//     setNextPage(state) {
//         if (state.currentIndex > (state.todos.length - 1)) {
//           state.nextButton = true
//           return
//         }
//         state.todosPage = state.todos.slice(state.currentIndex, state.currentIndex + state.limit)
//         state.currentIndex = state.currentIndex + state.limit
//         state.prevButton = false
//     },
//     setPreviousPage(state) {
//       state.nextButton = false
//
//       if (state.currentIndex === 3) return
//       if (state.currentIndex >= state.todos.length) state.prevButton = true
//
//       state.todosPage = state.todos.slice(state.currentIndex - (state.limit + state.limit), state.currentIndex - state.limit)
//       state.currentIndex = state.currentIndex - state.limit
//     }
//   }
// })
//
// export default TodoSlice.reducer