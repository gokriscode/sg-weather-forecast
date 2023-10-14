
var debug = require('debug')('api:routes:weathertraffic');
var express = require('express');
const { WeatherTrafficController } = require('../controllers/weather_traffic_controller');

const router = express.Router();

var event = {
  stageVariables: {
    'env': process.env.ENV
  }
}
var controllerWeatherTraffic = new WeatherTrafficController();

router.get('/locations',  function (req, res) {
  event.headers = req.headers;
  event.queryParameters =req.query;
  event.pathParameters = req.params;
  controllerWeatherTraffic.getLocations(event, {
    done: function (rescode, resmsg) {
      res.header(resmsg.headers);
      res.status(resmsg.statusCode)
      res.send(resmsg.body)
    }
  })
})


module.exports = router;