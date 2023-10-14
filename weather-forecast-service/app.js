const { SendResponse, format_headers_body } = require('./common/app_utils');


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const moment = require('moment-timezone');

const routeWeatherTraffic  = require('./lib/routes/weather_traffic_route');

var debug = require('debug')('api:weathertraffic:app');

var event = {
  stageVariables: {
    'env': process.env.ENV
  }
}

function getHealthStatus(event, context) {
  var query = event.queryParameters;
  var today = new Date();
  var date = moment(today).utc().format("YYYY-MM-DD HH:mm:ss");
  format_headers_body(event.headers, event.body)
      .then(function (_response) {
          var response = {
              "Service": "Weather Forecast & Traffic Cam",
              "Status": "Active",
              "Version": "v1.0.0",
              "Release Time": date,
              "Query Time": date
          }
          context.done(null, SendResponse(200, response));
      })
      .catch(function (err) {
          context.done(null, SendResponse(400, err));
      })
}

// heartbeat
app.get('/heartbeat', function (req, res) {
  event.queryParameters = aqp(req.query);
  event.headers = req.headers;
  debug("event :", event);
  getHealthStatus(event, {
      done: function (rescode, resmsg) {
          res.header(resmsg.headers);
          res.status(resmsg.statusCode)
          res.send(resmsg.body)
      }
  })
})

// weather routing
app.use("/api/weather-traffic", routeWeatherTraffic);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});



module.exports = app;