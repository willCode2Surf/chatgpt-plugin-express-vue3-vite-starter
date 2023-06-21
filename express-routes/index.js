import express from "express";
import { GeoBroker } from "../classes/geobroker.js";
import { WeatherBroker } from "../classes/weatherbroker.js";

const router = express.Router();

const geoBroker = new GeoBroker();
const weatherBroker = new WeatherBroker();

router.get("/status", function (req, res) {
  let responseObject = {};
  responseObject.statusCode = 200;
  res.json(responseObject);
});

router.post("/weather", async (req, res) => {
  if (req.body.location !== undefined) {
    const locationResults = await geoBroker.getLatLong(req.body.location);
    const weatherResults = await weatherBroker.getWeather(locationResults);
    res.json(weatherResults);
  } else {
    let responseObject = {};
    responseObject.statusCode = 200;
    res.json(responseObject);
  }
});

router.post("/forecast", function (req, res) {
  if (req.body.location !== undefined) {
    let responseObject = {};
    responseObject.weather = ["No results could be found."];
    res.json(responseObject);
  } else {
    let responseObject = {};
    responseObject.statusCode = 200;
    res.json(responseObject);
  }
});

export default router;
