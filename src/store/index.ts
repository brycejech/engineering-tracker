import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './reducers';
export * from './selectors';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
