import { LOCATIONS } from '../constants';
import axios from 'axios';

class LocationApi {
  
  getLocations(request = {}) {
       
    return new Promise((resolve, reject) => {
      axios.get(LOCATIONS+`?date_time=${request.dateTime}`).then(response => {
        resolve(response.data);
      }).catch(err => {
        reject(err);
      })
    })
  }

}

export const locationApi = new LocationApi();
