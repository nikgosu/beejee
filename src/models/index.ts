export interface Todo {
  _id?: string
  userName: string
  email: string
  text: string
  isDone: boolean
  isEditedByAdmin: boolean
  __v?: number
}

export interface User {
  userName: string
  password: string
}


export interface TodosState {
  isAuth: boolean
  authError: string
  todos: Todo[]
  todosPage: Todo[]
  update: boolean
  updatedTodo: Todo
  sort: number
  limit: number
  currentIndex: number
  nextButton: boolean
  prevButton: boolean
}