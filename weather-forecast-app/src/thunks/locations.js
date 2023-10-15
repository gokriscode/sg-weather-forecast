import { locationApi } from '../api/locations';
import { slice } from '../slices/locations';

const getLocations = (params) => async (dispatch) => {
  const response = await locationApi.getLocations(params);

  dispatch(slice.actions.getLocations(response));
};

export const thunks = {
  getLocations,
};
