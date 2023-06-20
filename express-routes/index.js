import express from "express";

const router = express.Router();

router.get("/status", function (req, res) {
  let responseObject = {};
  responseObject.statusCode = 200;
  res.json(responseObject);
});

router.post("/weather", function (req, res) {
  console.log("Got WEATHER body:", req.body);
  if (req.body.location !== undefined) {
    let responseObject = {};
    responseObject.weather = [];
    responseObject.weather.push(`Finna be hot AF in ${req.body.location}`);
    res.json(responseObject);
  } else {
    let responseObject = {};
    responseObject.statusCode = 200;
    res.json(responseObject);
  }
});

router.post("/forecast", function (req, res) {
  console.log("Got FORECAST body:", req.body);
  if (req.body.location !== undefined) {
    let responseObject = {};
    responseObject.weather = [];
    responseObject.weather.push(`Finna be hot AF in ${req.body.location}`);
    res.json(responseObject);
  } else {
    let responseObject = {};
    responseObject.statusCode = 200;
    res.json(responseObject);
  }
});

export default router;
