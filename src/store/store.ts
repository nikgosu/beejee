import {configureStore, combineReducers} from "@reduxjs/toolkit";
import TodoReducer from './redusers/TodoSlice'

export const rootReducer = combineReducers({
  TodoReducer: TodoReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']