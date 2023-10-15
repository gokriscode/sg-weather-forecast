import { locationApi } from '../api/locations';
import { slice } from '../slices/locations';

const getLocations = (params) => async (dispatch) => {
  const response = await locationApi.getLocations(params);

  dispatch(slice.actions.getLocations(response));
};

const getTrafficImages = (params) => async (dispatch) => {
  const response = await locationApi.getTrafficImages(params);

  dispatch(slice.actions.getTrafficImages(response));
};

export const thunks = {
  getLocations,
  getTrafficImages
};
