import React, {FC} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useAppSelector} from "../hooks/redux";
import {useActions} from "../hooks/actions";


const SortSelect:FC = () => {

  const {sort} = useAppSelector(state => state.todo)
  const {setSort} = useActions()

  const handleChangeSort = (e: SelectChangeEvent<number>) => {
    setSort(+e.target.value)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Сортировка</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sort}
        label="Сортировка"
        onChange={handleChangeSort}
      >
        <MenuItem value={0}>Select sort</MenuItem>
        <MenuItem value={10}>User name A-Z</MenuItem>
        <MenuItem value={20}>User name Z-A</MenuItem>
        <MenuItem value={30}>Email A-Z</MenuItem>
        <MenuItem value={40}>Email Z-A</MenuItem>
        <MenuItem value={50}>By status</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelect;