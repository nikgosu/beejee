import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {Todo, User} from "../../models";

export const todoApi = createApi({
  reducerPath: 'todo/api',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://express-mongo-heroku.herokuapp.com/api//'
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    fetchTodos: build.query<Todo[], void>({
      query: () => ({
        url: '/todos/'
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ _id }) => ({ type: 'Todos' as const, _id })),
            { type: 'Todos', id: 'LIST' },
          ]
          : [{ type: 'Todos', id: 'LIST' }],
    }),
    login: build.mutation<boolean, User>({
      query: (user: User) => ({
        url: '/login/',
        method: 'POST',
        body: user
      })
    }),
    logout: build.mutation<boolean, string>({
      query: (userName: string) => ({
        url: '/logout/',
        method: 'POST',
        body: {userName}
      })
    }),
    fetchIsAuth: build.mutation<boolean, string>({
      query: (userName: string) => ({
        url: '/isAuth/',
        method: 'POST',
        body: {userName}
      })
    }),
    fetchCreateTodo: build.mutation<Todo, Todo>({
      query: (todo: Todo) => ({
        url: '/todos/',
        method: 'POST',
        body: todo
      }),
      invalidatesTags: [{type: 'Todos', id: 'LIST'}]
    }),
    fetchDeleteTodo: build.mutation<Todo, string>({
      query: (id: string) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
        body: id
      })
    }),
    fetchUpdateTodo: build.mutation<Todo, Todo>({
      query: (todo: Todo) => ({
        url: `/todos/`,
        method: 'PUT',
        body: todo
      }),
      invalidatesTags: [{type: 'Todos', id: 'LIST'}]
    }),
  })
})

export const {useLoginMutation, useLogoutMutation, useFetchIsAuthMutation, useFetchCreateTodoMutation, useFetchDeleteTodoMutation, useFetchUpdateTodoMutation, useLazyFetchTodosQuery, useFetchTodosQuery} = todoApi