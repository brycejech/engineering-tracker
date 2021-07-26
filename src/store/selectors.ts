import { RootState } from './reducers';

export const sitesSelector = (state: RootState): Site[] => state.sites;
export const siteSelector = function (id: number): (state: RootState) => Site | undefined {
  return function (state: RootState) {
    return state.sites.find((s) => s.id === id);
  };
};
export const engineersSelector = (state: RootState): Engineer[] => state.engineers;
export const engineerSelector = function (id: number): (state: RootState) => Engineer | undefined {
  return function (state: RootState) {
    return state.engineers.find((e) => e.id === id);
  };
};
