import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const statusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
} as const;

export type StatusFilter = (typeof statusFilters)[keyof typeof statusFilters]; // 'all' | 'active' | 'completed'

export interface FiltersState {
  status: StatusFilter;
  colors: string[];
}

const initialState: FiltersState = {
  status: statusFilters.All,
  colors: [],
};

interface ColorFilter {
  color: string;
  changeType: 'added' | 'removed';
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChanged: (state, action: PayloadAction<StatusFilter>) => {
      state.status = action.payload;
    },
    colorFilterChanged: {
      reducer: (state, action: PayloadAction<ColorFilter>) => {
        const { color, changeType } = action.payload;
        const { colors } = state;

        switch (changeType) {
          case 'added':
            if (!colors.includes(color)) {
              colors.push(color);
            }
            break;
          case 'removed':
            state.colors = colors.filter((existingColor) => existingColor !== color);
        }
      },
      prepare: (color: string, changeType: 'added' | 'removed') => {
        return {
          payload: {
            color,
            changeType,
          },
        };
      },
    },
  },
});

export const { colorFilterChanged, statusFilterChanged } = filtersSlice.actions;
export default filtersSlice.reducer;