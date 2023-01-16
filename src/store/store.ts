import { configureStore } from "@reduxjs/toolkit";
import { articleReducer } from './articles/slice';
import { filterReducer } from './filters/slice';

export const store = configureStore({
    reducer: {
        articles: articleReducer, 
        filter: filterReducer, 
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch