import React, {FC} from 'react';
import {Button, Grid} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {useActions} from "../hooks/actions";

const PageNavigation:FC = () => {

  const {prevButton, nextButton, currentIndex, todos} = useAppSelector(state => state.todo)
  const {setNextPage, setPreviousPage} = useActions()

  const handleNextPage = () => {
    setNextPage()
  }

  const handlePreviousPage = () => {
    setPreviousPage()
  }

  console.log(currentIndex)
  console.log(todos.length, 'lenth')

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