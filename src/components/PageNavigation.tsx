import React, {FC} from 'react';
import {Button, Grid} from "@mui/material";
import {TodoSlice} from "../store/redusers/TodoSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux";

const PageNavigation:FC = () => {

  const dispatch = useAppDispatch()
  const {prevButton, nextButton} = useAppSelector(state => state.TodoReducer)

  const handleNextPage = () => {
    dispatch(TodoSlice.actions.setNextPage())
  }

  const handlePreviousPage = () => {
    dispatch(TodoSlice.actions.setPreviousPage())
  }

  return (
    <Grid
      container
      mt={2}
      mb={3}
      spacing={2}
      rowSpacing={2}
      sx={{justifyContent: 'space-between'}}
    >
      <Grid sx={{alignSelf: 'start'}} item>
        <Button
          disabled={prevButton}
          onClick={handlePreviousPage}
          size={"small"}
          variant={"outlined"}
        >Previous page</Button>
      </Grid>
      <Grid sx={{alignSelf: 'end'}} item>
        <Button
          disabled={nextButton}
          onClick={handleNextPage}
          size={"small"}
          variant={"outlined"}
        >Next page</Button>
      </Grid>
    </Grid>
  );
};

export default PageNavigation;