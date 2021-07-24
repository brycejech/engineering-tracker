import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { engineers } from '../data';
import { createCounter } from '../../common';

const highestId: number = engineers.reduce((acc, e) => {
  return e.id > acc ? e.id : acc;
}, 0);

const engineerIdCounter = createCounter(highestId);

type EngineerState = Engineer[];

const engineerSlice = createSlice({
  name: 'engineers',
  initialState: engineers as EngineerState,
  reducers: {
    addEngineer(state, action: PayloadAction<NewEngineer>) {
      const newEngineer = {
        ...action.payload,
        id: engineerIdCounter(),
      };
      return [...state, newEngineer];
    },
    updateEngineer(state, action: PayloadAction<Engineer>) {
      const updatedEngineer = action.payload;
      return state.map((e) => {
        return e.id === updatedEngineer.id ? updatedEngineer : e;
      });
    },
    deleteEngineer(state, action: PayloadAction<Engineer>) {
      return state.filter((e) => e.id !== action.payload.id);
    },
  },
});

export const { addEngineer, updateEngineer, deleteEngineer } = engineerSlice.actions;

export default engineerSlice.reducer;
