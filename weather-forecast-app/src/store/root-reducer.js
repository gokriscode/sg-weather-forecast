import { combineReducers } from '@reduxjs/toolkit';

import { reducer as locationReducer } from '../slices/locations';

export const rootReducer = combineReducers({
  locations: locationReducer
});
