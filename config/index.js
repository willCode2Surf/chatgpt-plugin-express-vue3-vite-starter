import dotenv from "dotenv";
dotenv.config();

// place to handle external key vault/secrets binding

export const ConfigurationData = {
  bus: {
    channel: process.env.BUS_CHANNEL || "bf871406-d2fa-4252-9edf-4920924f2a48",
  },
  openweather: {
    key: process.env.OPEN_WEATHER_KEY || "",
  },
  googlemap: {
    key: process.env.MAPS_KEY || "",
  },
  server: {
    port: process.env.SERVER_PORT || 6909,
  },
};
