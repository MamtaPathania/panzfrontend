
import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './Slice'

const store = configureStore({
  reducer: {
    video: videoReducer,
  },
});

export default store;