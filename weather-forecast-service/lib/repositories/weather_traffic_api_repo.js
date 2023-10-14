
var debug = require('debug')('api:repository:db:weathertraffic');
const axios = require('axios');

class WeatherTrafficApiRepo {
    getTrafficImages(searchdatetime) {
        return new Promise(async(resolve, reject) => {
            try {
                axios.get(process.env.GOV_DATA_URL+ '/transport/traffic-images?date_time='+searchdatetime).
                then(resp => {
                    console.log(resp.data);
                    resolve(resp.data)
                })
                .catch( (err) => {
                    debug("Traffic images API Failed", err)
                    reject(err)
                })
            }
            catch (err) {
              var err_code = { status: 500, code: 5001, message: "Sorry, Internal Server Error!.", developerMessage:"Sorry, Internal Server Error!." };
              debug("Get Traffic images Error :", err);
              return reject(err_code);
            }

        })
    }

    getWeatherData(searchdatetime) {
        return new Promise(async(resolve, reject) => {
            try {
                axios.get(process.env.GOV_DATA_URL+ '/environment/2-hour-weather-forecast?date_time='+searchdatetime).
                then(resp => {
                    console.log(resp.data);
                    resolve(resp.data)
                })
                .catch( (err) => {
                    debug("Weather Data API Failed", err)
                    reject(err)
                })
            }
            catch (err) {
              var err_code = { status: 500, code: 5001, message: "Sorry, Internal Server Error!.", developerMessage:"Sorry, Internal Server Error!." };
              debug("Get Weather Data API  Error :", err);
              return reject(err_code);
            }

        })
    }
}

module.exports = {
    WeatherTrafficApiRepo
}