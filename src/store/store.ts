import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import filtersReducer from './filterSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;