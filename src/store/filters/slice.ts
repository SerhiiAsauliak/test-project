import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterState } from '../../@types/filter';

const initialState: FilterState = {
    searchValue: '', 
    sort: {},
};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {state.searchValue = action.payload},
    },
});

export const { setSearchValue } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;