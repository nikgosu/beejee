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
