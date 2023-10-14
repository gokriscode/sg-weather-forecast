const app = require("./main");

var list = app.listen(process.env.HOST_PORT, async function  () {
  console.log("Weather Forecast & Forecast & Traffic Cam Service listening on port " + process.env.HOST_PORT);
})