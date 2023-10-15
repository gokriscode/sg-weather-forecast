import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  locations: [],
  location: null,
};

const reducers = {
  getLocations(state, action) {
    state.locations = action.payload;
    state.location = null;
  },
  getTrafficImages(state, action) {
    state.location = action.payload;
    // state.locations = [];
  },
  
};

export const slice = createSlice({
  name: 'locations',
  initialState,
  reducers
});

export const { reducer } = slice;
