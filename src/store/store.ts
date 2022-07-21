import {configureStore} from "@reduxjs/toolkit";
import {todoReducer} from "./redusers/todo.slice";
import {todoApi} from "./redusers/todo.api";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    todo: todoReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todoApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>