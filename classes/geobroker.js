import { ConfigurationData } from "../config/index.js";
import axios from "axios";

class GeoBroker {
  constructor() {}

  async getLatLong(location) {
    try {
      const geoResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${ConfigurationData.googlemap.key}`
      );
      return geoResponse.data.results[0].geometry.location;
    } catch (error) {
      console.error(error);
      return {};
    }
  }
}

export { GeoBroker };
