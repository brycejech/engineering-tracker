import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { sites } from '../data';
import { createCounter } from '../../common';

const highestId: number = sites.reduce((acc, s) => {
  return s.id > acc ? s.id : acc;
}, 0);

const siteIdCounter = createCounter(highestId);

type SiteState = Site[];

const siteSlice = createSlice({
  name: 'sites',
  initialState: sites as SiteState,
  reducers: {
    addSite(state, action: PayloadAction<NewSite>) {
      const newSite = {
        ...action.payload,
        id: siteIdCounter(),
      };
      return [...state, newSite];
    },
    updateSite(state, action: PayloadAction<Site>) {
      const updatedSite = action.payload;
      return state.map((l) => {
        return l.id === updatedSite.id ? updatedSite : l;
      });
    },
    deleteSite(state, action: PayloadAction<Site>) {
      return state.filter((l) => l.id !== action.payload.id);
    },
  },
});

export const { addSite, updateSite, deleteSite } = siteSlice.actions;

export default siteSlice.reducer;
