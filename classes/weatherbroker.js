import { ConfigurationData } from "../config/index.js";
import axios from "axios";

class WeatherBroker {
  constructor() {}

  async getWeather(location) {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&exclude=minutely,hourly&units=imperial&appid=${ConfigurationData.openweather.key}`
      );
      //console.log(weatherResponse.data);
      let responseObject = {};
      responseObject.weather = [];
      responseObject.weather.push(
        `The current temp is ${weatherResponse.data.current.temp}`
      );
      responseObject.weather.push(
        `It feels like ${weatherResponse.data.current.feels_like}`
      );
      if (weatherResponse.data.current.rain !== undefined)
        responseObject.weather.push(
          `The chance of rain is ${weatherResponse.data.current.rain} percent`
        );
      responseObject.weather.push(
        `The UV Index is at a level  ${weatherResponse.data.current.uvi}`
      );
      return responseObject;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  async getForecast(location) {
    try {
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lng}&exclude=minutely,hourly&units=imperial&appid=${ConfigurationData.openweather.key}`
      );
      console.log(forecastResponse.data);
      return forecastResponse.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  }
}

export { WeatherBroker };
