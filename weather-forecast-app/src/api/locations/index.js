import { TRAFFIC_IMAGE_URL, LOCATIONS_URL } from '../constants';
import axios from 'axios';

class LocationApi {
  
  getLocations(request = {}) {
       
    return new Promise((resolve, reject) => {
      axios.get(LOCATIONS_URL+`?date_time=${request.dateTime}`).then(response => {
        resolve(response.data);
      }).catch(err => {
        reject(err);
      })
    })
  }

  getTrafficImages(request = {}) {
       
    return new Promise((resolve, reject) => {
      axios.get(TRAFFIC_IMAGE_URL+`?date_time=${request.dateTime}&location_name=${request.locationName}`).then(response => {
        resolve(response.data);
      }).catch(err => {
        reject(err);
      })
    })
  }

}

export const locationApi = new LocationApi();
