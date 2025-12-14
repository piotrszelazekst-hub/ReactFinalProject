import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { client } from 'api/client';
import { RootState } from './store';
import { statusFilters } from './filterSlice';
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  color: string;
}

export interface TodosState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  entities: Record<string, Todo>;
  ids: string[];
  error?: string;
}

interface ColorSelected {
  todoId: string;
  color: string;
}

/*
Adapter utworzony przez createEntityAdapter<Todo> umożliwia zarządzanie listą zadań (todos) w postaci znormalizowanej
przechowując nasze todo jako obiekt { id --> encja - czyli zgodnie z typem Record<string, Todo>} oraz tablicę identyfikatorów

Dzięki temu łatwo jest dodawać / usuwać / aktualizować / odczytywać (operacje CRUD) i tworzyć selektory (czyli tzw. getter'y)

Przykładowo, taki adapter udostępnia m.in. metody:
- .addOne, .addMany (do dodawania nowego elementu / wielu elementów),
- .removeOne, .removeMany (do usuwania elementu / wielu elementów),
- .updateOne, .updateMany (do aktualizowania encji)

*/
const todosAdapter = createEntityAdapter<Todo>();

const initialState: TodosState = todosAdapter.getInitialState({
  status: 'idle',
  entities: {},
  ids: [],
});

// Docelowo tworzymy warstwę services (która odpowiada za komunikację z API backendowym (BFF)) - najlepiej utworzyć osobny
// katalog do tego w przypadku większych projektów.

// pobieranie todos z BE
export const fetchTodos = createAsyncThunk<Todo[]>('todos/fetchTodos', async () => {
  const response = await client.get('/fakeApi/todos');
  return response.todos;
});

// dodawanie nowego todo
export const saveNewTodo = createAsyncThunk<Todo, string>('/todos/saveNewTodo', async (text) => {
  const initialTodo = {
    text,
  };
  const response = await client.post('/fakeApi/todos', { todo: initialTodo });
  return response.todo;
});

// Praca domowa: zapytanie do usuwania danego todo z listy

// Stworzenie slice
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoToggled: (state, action: PayloadAction<string>) => {
      const todoId = action.payload;
      const todo = state.entities[todoId]; // pobieramy wybrany id z obiektu entities (todoId --> todo)

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    todoColorSelected: {
      reducer: (state, action: PayloadAction<ColorSelected>) => {
        const { color, todoId } = action.payload;
        const todo = state.entities[todoId];

        if (todo) {
          todo.color = color;
        }
      },
      prepare: (todoId: string, color: string) => {
        return {
          payload: {
            todoId,
            color,
          },
        };
      },
    },
    todoDeleted: todosAdapter.removeOne, // todoDeleted(id)
    allTodosCompleted: (state) => {
      Object.values(state.entities).forEach((todo) => {
        if (todo) {
          todo.completed = true;
        }
      });
    },
    completedTodosCleared: (state) => {
      // W completedIds będzie lista ids elementów, które mają todo.completed === true
      const completedIds = Object.values(state.entities)
        .filter((todo) => todo.completed)
        .map((todo) => todo.id);
      // Używamy wbudowanej w adapter metody .removeMany celem usunięcia wielu encji ze stora
      todosAdapter.removeMany(state, completedIds);
    },
  },
  // extraReducers umożliwia obsługę akcji nieopisanych w sekcji 'reducers'
  // (najczęściej asynchronicznych, stworzonych np. przez createAsyncThunk)
  // Dzięki temu możemy reagować na stany pending, fulfilled i rejected w pracy z API backendowym
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        todosAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(saveNewTodo.fulfilled, todosAdapter.addOne);
  },
});

export const {
  allTodosCompleted,
  completedTodosCleared,
  todoColorSelected,
  todoDeleted,
  todoToggled,
} = todosSlice.actions;

export default todosSlice.reducer;

// Selektory - umożliwiają nam "wyciąganie" danych ze stora w wygodny sposób
// 1 sposób - wykorzystujemy adapter
export const { selectAll: selectTodos, selectById: selectTodoById } = todosAdapter.getSelectors(
  (state: RootState) => state.todos
);

// 2 sposób - "na piechotę", bez wykorzystywania adaptera
// Jak zrobić to samo, ale bez wykorzystania adaptera
// export const selectTodos = (state: RootState) => {
//   const { ids, entities } = state.todos;
//   return ids.map((id) => entities[id]);
// };

// export const selectTodoById = (state: RootState, todoId: string) => {
//   return state.todos.entities[todoId];
// };

// selektor, który zwraca nam idki elementów, które spełniają oba kryteria:
// a) są w określonym statusie (all lub completed lub active)
// b) pasują do filtru z kolorami

export const selectFilteredTodoIds = createSelector(
  // 1. pobieramy listę WSZYSTKICH elementów (todos)
  selectTodos,
  // 2. pobieramy cały obiekt filtrów (status i colors)
  (state: RootState) => state.filters,
  // 3. zwracamy przefiltrowane ID zadań
  (todos, { status, colors }) => {
    const isAllStatusSelected = status === statusFilters.All; // true, jeżeli wybrany jest status 'All'
    const isCompletedStatusSelected = status === statusFilters.Completed; // true, jeżeli wybrany jest status 'Completed'

    return todos
      .filter((todo) => {
        const isStatusMatched = isAllStatusSelected || todo.completed === isCompletedStatusSelected;
        const isColorMatched = !colors.length || colors.includes(todo.color);

        return isStatusMatched && isColorMatched;
      })
      .map((todo) => todo.id);
  }
);