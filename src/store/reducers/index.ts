import { combineReducers } from '@reduxjs/toolkit';

import engineers from './engineers';
import sites from './sites';

export * from './engineers';
export * from './sites';

const rootReducer = combineReducers({
  engineers,
  sites,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
