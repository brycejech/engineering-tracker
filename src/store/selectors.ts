import { RootState } from './reducers';

export const sitesSelector = (state: RootState): Site[] => state.sites;
export const engineersSelector = (state: RootState): Engineer[] => state.engineers;
