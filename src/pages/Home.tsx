import React, {FC, useEffect} from 'react';
import {Container} from "@mui/material";
import CreateTodoFrom from "../components/CreateTodoFrom";
import {nanoid} from "nanoid";
import TodoItem from "../components/TodoItem";
import SortSelect from "../components/SortSelect";
import {useAppSelector} from "../hooks/redux";
import PageNavigation from "../components/PageNavigation";
import {useFetchIsAuthMutation, useFetchTodosQuery} from "../store/redusers/todo.api";
import {Todo} from "../models";
import {useActions} from "../hooks/actions";

const getId = () => {
  return nanoid()
}



const Home:FC = () => {
  const {todosPage} = useAppSelector(state => state.todo)
  const {login, setTodos} = useActions()
  const {data: todos} = useFetchTodosQuery()
  const [getIsAuth, {data: isAuth}] = useFetchIsAuthMutation()

  useEffect(() => {
    getIsAuth('admin')
    isAuth && login(true)

    // const intervalId = setInterval(() => {
    //   getIsAuth('admin')
    // }, 5000)
    //
    // return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    isAuth && login(true)
  }, [isAuth])

  useEffect(() => {
    todos && setTodos(todos)
  }, [todos])

  return (
    <>
      <CreateTodoFrom/>
      <Container style={{
        marginTop: '40px',
        width: '90%'
      }}>
        <SortSelect/>
        {todosPage.length > 0 ?
          todosPage.map((todo: Todo) => (
            <TodoItem key={getId()} todo={todo}/>
          ))
          :
          <div className={'empty_cards'}>Cards not found</div>
        }
      </Container>
      <PageNavigation/>
    </>
  );
};

export default Home;