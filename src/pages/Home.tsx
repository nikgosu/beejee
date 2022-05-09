import React, {FC, useEffect} from 'react';
import {Container} from "@mui/material";
import CreateTodoFrom from "../components/CreateTodoFrom";
import {Todo} from "../types/types";
import {nanoid} from "nanoid";
import TodoItem from "../components/TodoItem";
import SortSelect from "../components/SortSelect";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchIsAuth, fetchTodos} from "../store/redusers/ActionCreators";
import PageNavigation from "../components/PageNavigation";

const getId = () => {
  return nanoid()
}



const Home:FC = () => {
  const dispatch = useAppDispatch()
  const {todosPage} = useAppSelector(state => state.TodoReducer)

  useEffect(() => {
    dispatch(fetchIsAuth('admin'))
    const intervalId = setInterval(() => {
      dispatch(fetchIsAuth('admin'))
    }, 5000)
    dispatch(fetchTodos())
    return () => clearInterval(intervalId)
  }, [])

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